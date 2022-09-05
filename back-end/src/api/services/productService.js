class ProductService {
  constructor(model) { this.model = model; }
  
  async findProducts() {   
    const products = await this.model.findAll();
    return products;
    }
}

module.exports = { ProductService };