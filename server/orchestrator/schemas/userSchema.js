const axios = require("axios");
const redis = require("../redisConfig/config");
const basedUserUrl = `https://jaringflix-challengep3-2.herokuapp.com/users`;
const { GraphQLError } = require("graphql");

const typeDefs = `#graphql
    type User {
        _id : String,
        username : String,
        role : String,
        email : String,
        address : String,
        phoneNumber : String
    }

    input inputUser {
        username : String,
        email : String,
        password : String,
        address : String,
        phoneNumber : String
    }
    type Query {
        getUsers : [User],
        getUser(id : String) : User
    }
    type Message {
        msg : String
    }
    type Mutation {
        createUser(newUser : inputUser ) : Message
        deleteUser(id : String!) : Message
    }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const usersCache = await redis.get("app:users");
        if (usersCache) {
          return JSON.parse(usersCache);
        } else {
          const { data } = await axios({
            url: basedUserUrl,
          });
          await redis.set("app:users", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        return error;
      }
    },
    getUser: async (_, args) => {
      try {
        const { id } = args;
        const userCache = await redis.get(`app:user/${id}`);

        if (userCache) {
          return JSON.parse(userCache);
        } else {
          const { data } = await axios({
            url: basedUserUrl + `/${id}`,
          });
          await redis.set(`app:user/${id}`, JSON.stringify(data));
          return data;
        }
      } catch (error) {
        return new GraphQLError(error.response.data.message, {});
      }
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        const { newUser } = args;

        const { data } = await axios({
          url: basedUserUrl,
          method: "post",
          data: newUser,
        });

        await redis.del("app:users");
        return data;
      } catch (error) {
        return new GraphQLError(error.response.data.msg, {});
      }
    },

    deleteUser: async (_, args) => {
      try {
        const { id } = args;

        const { data } = await axios({
          url: basedUserUrl + `/${id}`,
          method: "delete",
        });

        await redis.del("app:users");
        await redis.del(`app:users/${id}`);
        return data;
      } catch (error) {
        return new GraphQLError(error.response.data.msg, {});
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
