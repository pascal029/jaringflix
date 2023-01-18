const axios = require("axios");
const redis = require("../redisConfig/config");
const basedMoviesUrl = `http://localhost:4002`;
const basedUserUrl = `http://localhost:4001`;
const { GraphQLError } = require("graphql");

const typeDefs = `#graphql
    type Movie{
        id : ID,
        title : String,
        slug : String,
        synopsis : String,
        trailerUrl : String,
        imgUrl : String,
        rating : Int,
        genreId : Int,
        mongoId : String,
        Casts : [Cast],
        Genre : Genre,
        user : user
    }

    input inputMovie {
        title : String,
        synopsis : String,
        trailerUrl : String,
        imgUrl : String,
        rating : Int,
        genreId : Int,
        mongoId : String
    }

    input inputCastsMovie {
        name : String,
        profilePict : String
    }

    input inputEditMovie {
        title : String,
        synopsis : String,
        trailerUrl : String,
        imgUrl : String,
        rating : Int,
        genreId : Int,
    }

    type Genre {
        id : ID,
        name : String
    }
    type Cast {
        id : ID,
        name : String,
        profilePict : String,
        movieId : Int
    }

    type user {
        username : String
    }
    type Message {
        msg : String
    }
    type Query{
        getMovies : [Movie]
        getMovie(id : ID) : Movie
    }
    type Mutation {
        createMovie(newMovie: inputMovie!, casts : [inputCastsMovie]!) : Message
        editMovie(movieEdit : inputEditMovie!, id : ID! ) : Message
        deleteMovie(id: ID!) : Message
    }
`;

const resolvers = {
  Query: {
    getMovies: async () => {
      try {
        const moviesCache = await redis.get("app:movies");
        if (moviesCache) {
          return JSON.parse(moviesCache);
        } else {
          const { data } = await axios({
            url: basedMoviesUrl,
            method: "get",
          });

          await redis.set("app:movies", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        return new GraphQLError({});
      }
    },

    getMovie: async (_, args) => {
      try {
        const { id } = args;
        const movieCache = await redis.get(`app:movies/${id}`);
        if (movieCache) {
          return JSON.parse(movieCache);
        } else {
          const { data } = await axios({
            url: basedMoviesUrl + `/${id}`,
          });
          const user = await axios({
            url: basedUserUrl + `/${data.mongoId}`,
          });
          data.user = user.data;
          await redis.set(`app:movies/${id}`, JSON.stringify(data));
          return data;
        }
      } catch (error) {
        return new GraphQLError(error.response.data.msg);
      }
    },
  },
  Mutation: {
    createMovie: async (_, args) => {
      try {
        const { newMovie, casts } = args;

        const body = {
          title: newMovie.title,
          synopsis: newMovie.synopsis,
          trailerUrl: newMovie.trailerUrl,
          imgUrl: newMovie.imgUrl,
          rating: newMovie.rating,
          genreId: newMovie.genreId,
          mongoId: newMovie.mongoId,
          casts: casts,
        };
        const { data } = await axios({
          url: basedMoviesUrl,
          method: "post",
          data: body,
        });
        await redis.del("app:movies");
        return data;
      } catch (err) {
        return new GraphQLError(err.response.data.msg);
      }
    },

    editMovie: async (_, args) => {
      try {
        const { movieEdit, id } = args;
        const { data } = await axios({
          url: basedMoviesUrl + `/${id}`,
          method: "put",
          data: movieEdit,
        });
        await redis.del("app:movies");
        await redis.del(`app:movies/${id}`);
        return data;
      } catch (error) {
        return new GraphQLError(error.response.data.msg, {});
      }
    },

    deleteMovie: async (_, args) => {
      try {
        const { id } = args;

        const { data } = await axios({
          url: basedMoviesUrl + `/${id}`,
          method: "delete",
        });
        await redis.del("app:movies");
        await redis.del(`app:movies/${id}`);
        return data;
      } catch (error) {
        return new GraphQLError(error.response.data.msg, {});
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
