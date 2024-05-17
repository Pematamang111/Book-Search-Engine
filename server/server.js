const express = require('express');
const { ApolloServer } = require('@apollo/server');//import appolo server
const { expressMiddleware } = require('@apollo/server/express4');//import expressMiddleware
const path = require('path');
const { authMiddleware } = require('./utils/auth');//import authentication
const db = require('./config/connection');
const routes = require('./routes');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');

const app = express();
const PORT = process.env.PORT || 3001;

// Create a new instance of an Apollo server with the GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const startApolloServer = async () => {
  await server.start();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/graphql', expressMiddleware(server, {
  context: authMiddleware
}));

// if we're in production, serve client/dist as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req,res) => {
    res.sendFile(path.join(_dirname, '../client/dist/index.html'));
  })
}


app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`🌍 Now listening on localhost:${PORT}/graphql`);
  });
});
}

//call the async function to start the function
startApolloServer();