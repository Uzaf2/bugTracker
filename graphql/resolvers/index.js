const usersResolvers = require ('./users');
const projectsResolvers = require ('./projects');

module.exports = {
    Mutation: {
        ...usersResolvers.Mutation,
        ...projectsResolvers.Mutation
    },
    Query: {
        ...usersResolvers.Query
    }
};