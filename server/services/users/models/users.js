const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongo");

class User {
  static getCollection() {
    const collection = getDB().collection("Users");
    return collection;
  }
  static async findAll() {
    try {
      const users = await this.getCollection()
        .find()
        .project({ password: 0 })
        .toArray();
      return users;
    } catch (error) {
      return error;
    }
  }

  static async findOne(id) {
    try {
      const user = await this.getCollection().findOne(ObjectId(id), {
        projection: { password: 0 },
      });
      return user;
    } catch (error) {
      return error;
    }
  }

  static async createUser(input) {
    try {
      const isRegisteredEmail = await this.getCollection().findOne({
        email: input.email,
      });
      const isRegisteredUsername = await this.getCollection().findOne({
        username: input.username,
      });
      if (isRegisteredEmail) throw { name: "email_registered" };
      if (isRegisteredUsername) throw { name: "username_registered" };
      const created = await this.getCollection().insertOne(input);
      const result = {
        msg: "User with email " + input.email + " has successfully created",
      };
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteOne(id) {
    try {
      const user = await this.findOne(id);
      if (!user) throw { name: "User is not exist" };

      await this.getCollection().deleteOne({ _id: ObjectId(id) });
      return { msg: "success" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
