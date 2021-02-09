const { gql } = require ('apollo-server');


module.exports = gql `

input RegisterInput  {
    username: String !
    password: String !
    confirmPassword: String !
    email: String !
}

type User{
    id: ID!
    username: String !
    email: String !
    creationTime: String!
    role: String !
    access: String!
}

type Query {
    getUsers: [User]
}

type Mutation {
    register(registerInput:RegisterInput): User !
    login(username: String!, password: String!): User !
}
`;