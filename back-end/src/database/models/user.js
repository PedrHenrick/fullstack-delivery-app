const User = (Sequelize, DataTypes) => {
  const userTable = Sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'cliente',
    },
  }, { timestamps: false });

  userTable.associate = (models) => {
    userTable.hasMany(models.sale, {foreignKey: 'id', as: 'user'})
  }

  return userTable;
};

module.exports = User;
