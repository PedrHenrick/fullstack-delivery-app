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
    status: sale.status,
  };
  return object;
};

class CustomerService {
    constructor(sales, products, saleProduct) { 
      this.salesModel = sales;
      this.productsModel = products;
      this.salesProdutsModel = saleProduct;
      this.message = 'faça sua escolha nobre guerreiro, e apartir dela receba o objeto do id: ';
    }
    
    async createSale(sale) {
      try {
        const result = await sequelize.transaction(async (t) => {
          const saleCreated = await this.salesModel.create(saleObject(sale), { transaction: t });

          await Promise.all(sale.productsIds.map(async (product) => {
            const productExist = await this.productsModel
              .findOne({ where: { id: product.id } }, { transaction: t });
            console.log(productExist);
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
      // const sale = await this.salesModel.findOne({
      //   include: [
      //     { model: this.productsModel, as: 'productsIds' },
      //   ],
      //   where: { id },
      // });
      // return sale

      const sale = await this.salesModel.findOne({ where: { id } });
      const SalesProducts = await this.salesProdutsModel.findAll({ where: { saleId: sale.id } });

      const finalSalesObject = { ...sale.dataValues, productsSold: SalesProducts }
      return finalSalesObject;
    }

    async getOneSale() {
      const oneSale = await this.salesModel.findAll({ attributes: {exclude: 'deliveryAddress, sellerId'},});
      return oneSale;
    }
  }
  
  module.exports = { CustomerService };
