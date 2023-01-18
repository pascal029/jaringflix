const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const basedUrl = `http://localhost:4001/users`;

class UserController {
  static async getAll(req, res, next) {
    try {
      const usersCache = await redis.get("app:users");
      if (usersCache) {
        res.status(200).json(JSON.parse(usersCache));
      } else {
        const { data } = await axios({
          url: basedUrl,
        });
        await redis.set("app:users", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const userCache = await redis.get(`app:user/${id}`);

      if (userCache) {
        res.status(200).json(JSON.parse(userCache));
      } else {
        const { data } = await axios({
          url: basedUrl + `/${id}`,
        });
        await redis.set(`app:user/${id}`, JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const { data } = await axios({
        url: basedUrl + `${id}`,
        method: "delete",
      });

      await redis.del("app:users");
      await redis.del(`app:user/${id}`);

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const { data } = await axios({
        url: basedUrl,
        method: "post",
        data: { username, email, password, phoneNumber, address },
      });

      await redis.del("app:users");

      redis.status(201).json(this.createMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;
