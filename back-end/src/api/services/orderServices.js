const Sequelize = require('sequelize');
const config = require('../../database/config/config');
// const Users = require('../../database/models/user');

const Environment = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[Environment]);

class SalesService {
    constructor(sales, products, saleProduct) { 
      this.salesModel = sales;
      this.productsModel = products;
      this.salesProdutsModel = saleProduct;
    }
    
    async createSale(sale) {
      try {
        const result = await sequelize.transaction(async (t) => {
          const saleCreated = await this.salesModel.create({
            userId: sale.userId,
            sellerId: sale.sellerId,
            totalPrice: sale.totalPrice,
            deliveryAddress: sale.deliveryAddress,
            deliveryNumber: sale.deliveryNumber,
            status: sale.status,
          }, { transaction: t });

          await Promise.all(sale.productsIds.map(async (product) => {
            const productExist = await this.productsModel
              .findOne({ where: { id: product.id } }, { transaction: t });
            await this.salesProdutsModel.create({
              saleId: saleCreated.id,
              productId: productExist.id,
              quantity: product.quantity,
            }, { transaction: t });
          }))
          return {
            message: 'Venda adicionada com sucesso',
            id: saleCreated.id,
          };
        });
        return result;
      } catch (error) {
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

      // const sale = await this.salesModel.findOne({ where: { id } });
      // const SalesProducts = await this.salesProdutsModel.findAll({ where: { saleId: sale.id } });

      // const finalSalesObject = { ...sale.dataValues, productsSold: SalesProducts }
      // return finalSalesObject;

      return { message: `faça sua escolha nobre guerreiro, e apartir dela receba o objeto do id: ${id}`}
      
      // outros exemplos:

      // const userSale = await Users.findAll({
      //   include: [
      //     { model: this.salesModel, as: 'salle' },
      //   ],
      //   where: { id },
      // });

      // return userSale

      // const saleUser = await this.salesModel.findAll({
      //   include: [
      //     { model: Users, as: 'user' },
      //   ],
      //   where: { id },
      // });

      // return saleUser
    }
  }
  
  module.exports = { SalesService };
