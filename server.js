const express = require('express');
const db = require('./config/connection');
// const routes = require('./routes');

// Import the ApolloServer class
const { ApolloServer } = require('apollo-server-express');

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas');


const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for final project running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
})
};