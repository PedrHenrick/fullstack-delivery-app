class SallesService {
    constructor(salles,products, saleProduct) { 
      this.sallesModel = salles,
      this.productsModel = products,
      this.sallesProdutsModel = saleProduct
     }
    
    async createSeller(products) {   
      const salle = await this.sallesModel.create({...products});
      return salle;
    }

    async getSeller(id) {   
      const salle = await this.model.findOne({where:id});
      return salle;
    }
  }
  
  module.exports = { SallesService };