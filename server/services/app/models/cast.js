'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cast.belongsTo(models.Movie, { foreignKey : 'movieId', onDelete : 'cascade', onUpdate : 'cascade'})
    }
  }
  Cast.init({
    movieId: DataTypes.INTEGER,
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : `Cast name can't be empty`
        },
        notEmpty : {
          msg : `Cast name can't be empty`
        }
      }
    },
    profilePict: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cast',
  });
  return Cast;
};