const { ApolloServer, PubSub} = require ('apollo-server');
const mongoose = require ('mongoose');
const { MONGODB } = require('./config');
const pubsub = new PubSub();

const typeDefs = require ('./graphql/typeDefs');
const resolvers = require ('./graphql/resolvers');
const PORT = process.env.port || 5000;

const server = new ApolloServer ({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubsub})
});

mongoose
    .connect (MONGODB, { useNewUrlParser: true,  useUnifiedTopology: true})
    .then (()=>{
        console.log('MONGODB Connected');
        return server.listen((process.env.PORT || 5000));
    })
    .then((res)=> {
    console.log(`Server running at ${res.url}`);
    })
    .catch(err =>{
        console.error(err)
    })