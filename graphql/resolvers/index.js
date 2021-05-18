const usersResolvers = require ('./users');
const projectsResolvers = require ('./projects');
const ticketsResolvers = require ('./tickets');
const commentsResolvers = require ('./comments');

module.exports = {
    Mutation: {
        ...usersResolvers.Mutation,
        ...projectsResolvers.Mutation,
        ...ticketsResolvers.Mutation,
        ...commentsResolvers.Mutation,
    },
    Query: {
        ...usersResolvers.Query,
        ...projectsResolvers.Query,
        ...ticketsResolvers.Query,
        ...commentsResolvers.Query,
    }
};