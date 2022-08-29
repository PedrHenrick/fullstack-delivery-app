class SellerService {
  constructor(model) { this.model = model; }
  
  async allSellerOrders(sellerId) {
    const orders = await this.model.findAll({ where: { sellerId } });
    return orders;
  }

  async sellerOrderDetails(id, sellerId) {
    const orderDetails = await this.model.findOne({ where: { id, sellerId } });
    return orderDetails;
  }
}

module.exports = SellerService;
