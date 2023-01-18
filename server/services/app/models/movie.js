"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Genre, {
        foreignKey: "genreId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      Movie.hasMany(models.Cast, { foreignKey: "movieId" });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Movie title can't be empty`,
          },
          notEmpty: {
            msg: `Movie title can't be empty`,
          },
        },
      },
      slug: DataTypes.STRING,
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Movie synopsis can't be empty`,
          },
          notEmpty: {
            msg: `Movie synopsis can't be empty`,
          },
        },
      },
      trailerUrl: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: [1],
            msg: `Movie rating minimum 1`,
          },
        },
      },
      genreId: DataTypes.INTEGER,
      mongoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  Movie.beforeCreate((movie, option) => {
    const slug = movie.title
      .toLowerCase()
      .replace(/^-+/, "")
      .replace(/-+$/, "")
      .replace(/\s+/g, "-")
      .replace(/\-\-+/g, "-")
      .replace(/[^\w\-]+/g, "");
    movie.slug = slug;
  });
  return Movie;
};
