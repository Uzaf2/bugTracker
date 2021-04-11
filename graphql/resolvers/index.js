const usersResolvers = require ('./users');
const projectsResolvers = require ('./projects');
const ticketsResolvers = require ('./tickets');

module.exports = {
    Mutation: {
        ...usersResolvers.Mutation,
        ...projectsResolvers.Mutation,
        ...ticketsResolvers.Mutation
    },
    Query: {
        ...usersResolvers.Query,
        ...projectsResolvers.Query,
        ...ticketsResolvers.Query
    }
};