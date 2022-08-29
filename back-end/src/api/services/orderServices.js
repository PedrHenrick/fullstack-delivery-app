const Sequelize = require('sequelize');
const config = require('../../database/config/config');

const Environment = process.env.NODE_ENV;
const sequelize = new Sequelize(config[Environment]);

class SallesService {
    constructor(salles, products, saleProduct) { 
      this.sallesModel = salles;
      this.productsModel = products;
      this.sallesProdutsModel = saleProduct;
    }
    
    async createSaller(salle) {
      try {
        const result = await sequelize.transaction(async (t) => {
          const salleCreated = await this.sallesModel.create({
            userId: salle.userId,
            sellerId: salle.sellerId,
            totalPrice: salle.totalPrice,
            deliveryAddress: salle.deliveryAddress,
            deliveryNumber: salle.deliveryNumber,
            status: salle.status,
          }, { transaction: t });

          await Promise.all(salle.productsIds.map(async (product) => {
            const productExist = await this.productsModel
              .findOne({ where: { id: product.id } }, { transaction: t });
            await this.sallesProdutsModel.create({
              saleId: salleCreated.id,
              productId: productExist.id,
              quantity: product.quantity,
            }, { transaction: t });
          }))
          return 'foi';
        });
        return result;
      } catch (error) {
        throw new Error(error);
      }
    }

    async getSeller({ id }) {   
      const salle = await this.model.findOne({ where: id });
      return salle;
    }
  }
  
  module.exports = { SallesService };
