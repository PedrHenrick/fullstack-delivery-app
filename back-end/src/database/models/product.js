const Product = (Sequelize, DataTypes) => {
  const productTable = Sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false
    },
    urlImage: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, { timestamps: false });

  return productTable;
};

module.exports = Product;
