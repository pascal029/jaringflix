const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const basedMoviesUrl = `http://localhost:4002/movies`;
const basedUserUrl = `http://localhost:4001/users`;

class MovieController {
  static async getMovies(req, res, next) {
    try {
      const moviesCache = await redis.get("app:movies");
      if (moviesCache) {
        res.status(200).json(JSON.parse(moviesCache));
      } else {
        const { data } = await axios({
          url: basedMoviesUrl,
          method: "get",
        });

        await redis.set("app:movies", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json({ msg: `ISE` });
    }
  }

  static async getMovie(req, res, next) {
    try {
      const { id } = req.params;
      const movieCache = await redis.get(`app:movies/${id}`);
      if (movieCache) {
        res.status(200).json(JSON.parse(movieCache));
      } else {
        const { data } = await axios({
          url: basedMoviesUrl + `/${id}`,
        });
        const user = await axios({
          url: basedUserUrl + `/${data.mongoId}`,
        });
        data.user = user.data;
        await redis.set(`app:movies/${id}`, JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createMovie(req, res, next) {
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
      const { data } = await axios({
        url: basedMoviesUrl,
        method: "post",
        data: {
          title,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
          mongoId,
          casts,
        },
      });
      redis.del("app:movies");
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;

      const { data } = await axios({
        url: basedMoviesUrl + `/${id}`,
        method: "delete",
      });
      await redis.del("app:movies");
      await redis.del(`app:movies/${id}`);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const { id } = req.params.id;
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      const { data } = await axios({
        url: basedMoviesUrl + `/${id}`,
        method: "put",
        data: {
          title,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
        },
      });
      await redis.del("app:movies");
      await redis.del(`app:movies/${id}`);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = MovieController;
