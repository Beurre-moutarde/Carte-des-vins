const { AuthenticationError } = require("apollo-server-express");
const { User, Region, Vin } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    regions: async () => {
      return await Region.find();
    },
    vins: async () => {
      const vins = await Vin.find();
      return vins.map((vin) => {
        return {
          _id: vin.id,
          vin_name: vin.vin_name,
          millesime: vin.millesime,
          producteur: vin.producteur,
        };
      });
    },
    users: async () => {
      return await User.find();
    },
  },
  Mutation: {
    createRegion: async (parent, { region_name }) => {
      const region = await Region.create({ region_name });
      return region;
    },
    createVin: async (parent, { vin_name, millesime, producteur }) => {
      const vin = await Vin.create({ vin_name, millesime, producteur });
      return vin;
    },
    createUser: async (parent, { firstname, lastname, email }) => {
      const user = await User.create({ firstname, lastname, email });
      return user;
    },
    // login: async (parent, { email, password }) => {
    //   const user = await User.findOne({ email });
    //   // check if user exists with email and credentials
    //   if (!user) {
    //     throw new AuthenticationError("Incorrect credentials");
    //   }
    //   const correctPassword = await user.isCorrectPassword(password);

    //   // check password
    //   if (!correctPassword) {
    //     throw new AuthenticationError("Incorrect credentials");
    //   }

    //   const token = signToken(user);
    //   return { token, user };
    // },
  },
};

module.exports = resolvers;

