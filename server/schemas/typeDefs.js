const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Region {
        _id: ID!
        region_name: String!
        vin: [Vin]
    }

    type Vin {
        _id: ID!
        vin_name: String!
        millesime: Int!
        producteur: String!
        regions: [Region]
    }

    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        vins: [Vin]
    }

    type Auth {
        token: ID
        user: User
      }

    type Query {
        regions: [Region!]
        vins: [Vin!]
        users: [User!]
    }

    type Mutation {
        createRegion(region_name: String!): Region
        createVin(vin_name: String!, millesime:Int!, producteur: String!): Vin
        createUser(firstname: String!, lastname: String! email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(firstName: String, lastName: String, email: String, password: String): User
    }
`;

module.exports = typeDefs;