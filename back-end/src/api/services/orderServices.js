const Sequelize = require('sequelize');
const config = require('../../database/config/config');

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
          return true;
        });
        return result;
      } catch (error) {
        throw new Error(error);
      }
    }

    async getSale({ id }) {
      try {
        const sale = await this.salesModel.findOne({include: [
          // { model: this.salesProdutsModel },
          { model: this.productsModel }
        ], where: { id }});
        return sale;
      }
      catch(err) {
        console.log(err);
      }
    }
  }
  
  module.exports = { SalesService };
