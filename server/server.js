const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const fetch = require("node-fetch");
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// new endpoint for searching plants using Trefle API
app.get("/api/plants/search", async (req, res) => {
  const { q } = req.query;
  const token = process.env.TREFLE_API_TOKEN;
  console.log("TREFLE_API_TOKEN", token)
  try {
    const response = await fetch(`https://trefle.io/api/v1/plants/search?token=${token}&q=${q}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      mode: 'cors'
    });
    if (!response.ok) {
      throw new Error("something went wrong!");
    }
    const data = await response.json();
    console.log('search endpoint called');
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Methods", "GET, POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);