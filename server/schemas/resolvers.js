const { Book, User } = require('../models');

const resolvers = {
    Query: {
     book: async () => {
        return Book.find()
     },

     user: async (parent, { userId }) => {
        return User.findOne({ _id: userId });
      },
      // By adding context to our query, we can retrieve the logged in user without specifically searching for them
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id });
        }
        throw AuthenticationError;
      },
    },

    Mutation: {
        addUser: async (parent, { email, password }) => {
          const user = await User.create({ email, password });
          const token = signToken(user);
    
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw AuthenticationError;
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw AuthenticationError;
          }
    
          const token = signToken(user);
          return { token, user };
        },
    
        // Add a third argument to the resolver to access data in our `context`
        addBook: async (parent, { userId, skill }, context) => {
          // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
          if (context.user) {
            return User.findOneAndUpdate(
              { _id: profileId },
              {
                $addToSet: { books: book },
              },
              {
                new: true,
                runValidators: true,
              }
            );
          }
          // If user attempts to execute this mutation and isn't logged in, throw an error
          throw AuthenticationError;
        },
        // Set up mutation so a logged in user can only remove their profile and no one else's
        removeUser: async (parent, args, context) => {
          if (context.user) {
            return User.findOneAndDelete({ _id: context.user._id });
          }
          throw AuthenticationError;
        },
        // Make it so a logged in user can only remove a skill from their own profile
        removeBook: async (parent, { book }, context) => {
          if (context.user) {
            return Book.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { books: book } },
              { new: true }
            );
          }
          throw AuthenticationError;
        },
      },
    };
    
    module.exports = resolvers;
    

