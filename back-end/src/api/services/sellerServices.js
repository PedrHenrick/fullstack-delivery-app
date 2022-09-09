class SellerService {
  constructor(sales, products, saleProduct) { 
    this.salesModel = sales;
    this.productsModel = products;
    this.salesProdutsModel = saleProduct;
  }
  
  async allSellerOrders(sellerId) {
    const orders = await this.salesModel.findAll({ where: { sellerId } });
    return orders;
  }

  async sellerOrderDetails(id, sellerId) {
    const orderDetails = await this.salesModel.findOne({ where: { id, sellerId } });

    const SalesProducts = await this.salesProdutsModel.findAll({ 
      where: { saleId: id }, raw: true,
    });

    const products = await Promise.all(SalesProducts.map(async ({ productId, quantity }) => {
      const oneProduct = await this.productsModel.findOne({ 
        where: { id: productId }, 
        attributes: { exclude: 'urlImage' }, 
        raw: true,
      });

      return { ...oneProduct, quantity };
    }));
    
    return { ...orderDetails, products };
  }
}

module.exports = SellerService;
