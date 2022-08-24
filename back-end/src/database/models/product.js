module.exports = (Sequelize, DataTypes) => {
  const Product = Sequelize.define('Products', {
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
      field: 'url_image',
    },
  }, { timestamps: false });

  return Product;
};

