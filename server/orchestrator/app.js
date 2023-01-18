if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const PORT = process.env.PORT || 4000;
const movieSchema = require("./schemas/movieSchema");
const userSchema = require("./schemas/userSchema");
const server = new ApolloServer({
  typeDefs: [movieSchema.typeDefs, userSchema.typeDefs],
  resolvers: [movieSchema.resolvers, userSchema.resolvers],
  playground: true,
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }) => {
  console.log(`Server ready at: ${url}`);
});
