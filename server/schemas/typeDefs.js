const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    plantCount: Int
    savedPlants: [Plant]
  }

  type Plant {
    plantId: String!
    authors: [String]
    bibliography: String
    common_name: String
    family: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input PlantInput {
    plantId: String!
    authors: [String]
    bibliography: String
    common_name: String
    family: String
    image: String
    link: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savePlant(input: PlantInput): User
    removePlant(plantId: String!): User
  }
`;

module.exports = typeDefs;
