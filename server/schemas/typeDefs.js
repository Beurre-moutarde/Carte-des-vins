const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Vin {
        vinId: String!
        vin_name: String!
        millesime: Int!
        producteur: String!
    }

    type User {
        _id: ID!
        username: String
        email: String!
        vinCount: Int
        savedVins: [Vin]
    }
    
    type Data {
        _id: ID
        params: String!
    }

    type Auth {
        token: ID
        user: User
    }

    type Params {
        params: String!
    }  

    input VinInput {
        vinId: String!
        vin_name: String!
        millesime: Int
        producteur: String
    }

    input DataObj {
        params: String!
    }

    type Query {
        me: User
        params: [Data]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        createUser(username: String! email: String!, password: String!): Auth
        saveVin(input: VinInput): User
        deleteVin(input: VinInput): User
        saveData(input: DataObj): User
        deleteData(dataID: ID): User
    }
`;

module.exports = typeDefs;
