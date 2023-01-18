const { Movie, Cast, Genre, sequelize } = require("../models");

class MovieController {
  static async getAll(req, res, next) {
    try {
      const movies = await Movie.findAll({
        include: [
          {
            model: Cast,
            attributes: ["id", "name", "profilePict"],
          },
          {
            model: Genre,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const movie = await Movie.findOne({
        where: { id },
        include: [
          {
            model: Cast,
            attributes: ["id", "name", "profilePict"],
          },
          {
            model: Genre,
            attributes: ["name"],
          },
        ],
      });

      if (!movie) {
        throw { name: "data_not_found" };
      }
      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  }

  static async createMovie(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        mongoId,
        casts,
      } = req.body;
      const postMovie = await Movie.create(
        {
          title,
          synopsis,
          trailerUrl,
          imgUrl,
          rating: Number(rating),
          genreId,
          mongoId,
        },
        { transaction: t }
      );
      const castsInput = casts.map((el) => {
        return {
          ...el,
          movieId: postMovie.id,
        };
      });
      const postCasts = await Cast.bulkCreate(castsInput, { transaction: t });
      t.commit();
      res.status(201).json({ msg: "success to add movie" });
    } catch (error) {
      t.rollback();
      next(error);
    }
  }

  static async editMovie(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;

      const updateMovie = await Movie.update(
        { title, synopsis, trailerUrl, imgUrl, rating, genreId },
        { where: { id }, transaction: t }
      );
      if (updateMovie[0] == 0) throw { name: "fail_edit_movie" };
      t.commit();
      res.status(200).json({ msg: "success to edit movie" });
    } catch (error) {
      t.rollback();
      next(error);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;
      const delMovie = await Movie.destroy({ where: { id } });

      if (delMovie == 0) throw { name: "fail_destroy_movie" };
      res.status(200).json({ msg: `Success to delete movie` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
