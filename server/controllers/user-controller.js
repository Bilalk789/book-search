const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getSingleUser: async (_, { id, username }, context) => {
      try {
        const foundUser = await User.findOne({
          $or: [{ _id: id }, { username: username }],
        });
        if (!foundUser) {
          throw new Error("Cannot find a user with this id or username!");
        }
        return foundUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createUser: async (_, { userInput }) => {
      try {
        const user = await User.create(userInput);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error("Something went wrong!");
      }
    },
    login: async (_, { usernameOrEmail, password }) => {
      try {
        const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
        if (!user) {
          throw new Error("Can't find this user");
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new Error("Wrong password!");
        }
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    saveBook: async (_, { bookInput }, { user }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: bookInput } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteBook: async (_, { bookId }, { user }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }
        return updatedUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
