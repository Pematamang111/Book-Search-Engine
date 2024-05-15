const { Book, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth')

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
        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
    
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          try {
            console.log("email", email)
            console.log("email", email)
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
          } catch(err) {
            console.log(err)
          }
        },
    
        // Add a third argument to the resolver to access data in our `context`
        //authors:[String]!, description: String!, title: String!, bookId: String!, image: String!, link: String!
        addBook: async (parent, { title }, context) => {
          // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
          if (context.user) {
            return User.findOneAndUpdate(
              { _id: profileId },
              {
                $addToSet: { savedbook: {title} },
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
        // removeUser: async (parent, args, context) => {
        //   if (context.user) {
        //     return User.findOneAndDelete({ _id: context.user._id });
        //   }
        //   throw AuthenticationError;
        // },
        // Make it so a logged in user can only remove a skill from their own profile

        saveBook: async (parent, { bookData }, context) => {
          if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { savedBooks: bookData } },
              { new: true }
            );
    
            return updatedUser;
          }
    
          throw AuthenticationError;
        },

        removeBook: async (parent, { bookId }, context) => {
          if (context.user) {
            return User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: bookId } },
              { new: true }
            );
          }
          throw AuthenticationError;
        },
      },
    };
    
    module.exports = resolvers;
    

