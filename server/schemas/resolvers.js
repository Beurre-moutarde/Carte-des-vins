const { AuthenticationError } = require("apollo-server-express");
const { User, Region, Vin } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    regions: async () => {
      return await Region.find();
    },
    vins: async (parent, { region, vin_name, millesime, producteur }) => {
      const params = {};

      if (region) {
        params.region = region;
      }

      if (vin_name) {
        params.vin_name;
      }

      if (millesime) {
        params.millesime;
      }

      if (producteur) {
        params.producteur;
      }

      return await Vin.find(params).populate("region");
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
  },
  Region: {
    vin: async (region) => {
      const vins = await Vin.find({ regions: region._id });
      return vins;
    },
  },
  Vin: {
    regions: async (vin) => {
      const regions = await Region.find({ vin: vin._id });
      return regions;
    },
    producteur: async (vin) => {
      const producteur = await User.findById(vin.producteur);
      return producteur;
    },
  },
  User: {
    vins: async (user) => {
      const vins = await Vin.find({ producteur: user._id });
      return vins;
    },
  },
};
