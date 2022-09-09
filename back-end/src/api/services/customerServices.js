const Sequelize = require('sequelize');
const config = require('../../database/config/config');
// const Users = require('../../database/models/user');

const Environment = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[Environment]);

const saleObject = (sale) => {
  const object = {
    userId: sale.userId,
    sellerId: sale.sellerId,
    totalPrice: sale.totalPrice,
    deliveryAddress: sale.deliveryAddress,
    deliveryNumber: sale.deliveryNumber,
  };
  return object;
};

class CustomerService {
    constructor(sales, products, saleProduct, users) { 
      this.salesModel = sales;
      this.productsModel = products;
      this.salesProdutsModel = saleProduct;
      this.usersModel = users;
      this.message = 'faça sua escolha nobre guerreiro, e apartir dela receba o objeto do id: ';
    }
    
    async createSale(sale) {
      try {
        const result = await sequelize.transaction(async (t) => {
          const saleCreated = await this.salesModel.create(saleObject(sale), { transaction: t });
          
          await Promise.all(sale.productsIds.map(async (product) => {
            const productExist = await this.productsModel
              .findOne({ where: { id: product.id } }, { transaction: t });

              await this.salesProdutsModel.create({
              saleId: saleCreated.id, productId: productExist.id, quantity: product.quantity,
            }, { transaction: t });
          }));

          return { message: 'Venda adicionada com sucesso', id: saleCreated.id };
        });
        return result;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }

    async getSale({ id }) {
      const sale = await this.salesModel.findOne({ where: { id } });
      const SalesProducts = await this.salesProdutsModel.findAll({ where: { saleId: sale.id } });

      const finalSalesObject = { ...sale.dataValues, productsSold: SalesProducts };
      return finalSalesObject;
    }

    async getOneSale() {
      const oneSale = await this.salesModel.findAll({ 
        attributes: { exclude: ['deliveryAddress', 'sellerId'] } });
      return oneSale;
    }

    async updateSaleStatus({ id }, { status }, { role }) {
      if (status === 'Entregue') {
        const sale = await this.salesModel.findOne({ where: { id } });
        if (!sale) throw new Error('saleIsNotFound');
        await this.salesModel.update({ status }, { where: { id: sale.id } });
      
        return { message: `Venda com o id: ${id}, atualizada com sucesso` };
      } else if (
        (status === 'Preparando' || status === 'Em Trânsito')
        && (role === 'seller' || role === 'administrator')) {
        const sale = await this.salesModel.findOne({ where: { id } });
        if (!sale) throw new Error('saleIsNotFound');
        await this.salesModel.update({ status }, { where: { id: sale.id } });
      
        return { message: `Venda com o id: ${id}, atualizada com sucesso` };
      }
      throw new Error('Unauthorized');
    }

    async getDetailsSale({ id }) {
      const detail = await this.salesModel.findOne({ where: { id }, raw: true });
      
      const user = await this.usersModel.findOne({ 
        where: { id: detail.sellerId }, attributes: ['name'], raw: true,
      });

      const SalesProducts = await this.salesProdutsModel.findAll({ 
        where: { saleId: detail.id }, raw: true,
      });

      const products = await Promise.all(SalesProducts.map(async (product) => {
        const oneProduct = await this.productsModel.findOne({ 
          where: { id: product.productId }, 
          attributes: { exclude: 'urlImage' }, 
          raw: true,
        });

        return { ...oneProduct, quantity: product.quantity };
      }));
      
      return { ...detail, seller: user, products };
    }
  }
  
  module.exports = { CustomerService };
