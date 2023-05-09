const { AuthenticationError } = require("apollo-server-express");
const { User, Data } = require("../models");
const { signToken } = require("../utils/auth");
const mongoose = require("mongoose");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },

    params: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData.savedData;
      }
    },
  },

  Mutation: {
    saveData: async (parent, { input }, context) => {
      const params = await Data.create(input);
      const user = await User.findByIdAndUpdate(context.user._id, {
        $push: {
          savedData: params,
        },
      });
      return { params, user };
    },

    deleteData: async (parent, { dataID }, context) => {
      console.log(dataID);
      console.log(context.user._id);
      const params = await Data.deleteOne({ _id: dataID });
      const user = await User.findByIdAndUpdate(context.user._id, {
        $pull: {
          savedData: {
            _id: mongoose.Types.ObjectId(dataID),
          },
        },
      });
      return { params, user };
    },

    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { user, token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      // check if user exists with email and credentials
      console.log(user, email);
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPassword = await user.isCorrectPassword(password);

      // check password
      if (!correctPassword) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveVin: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedVins: input } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeVin: async (parent, { vinId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedVinss: { vinId: vinId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
