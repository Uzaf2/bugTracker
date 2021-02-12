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
type Ticket {
    title: String !
    description : String !
    assignedDeveloper: String 
    submitter: String 
    priority: String 
    status: String
    type: String
    createdAt: String
    updatedAt: String
}
type Project {
    id: ID!
    name: String!
    description: String!
    users: [User]
    tickets: [Ticket]
}
type Query {
    getUsers: [User]
}

type Mutation {
    register(registerInput:RegisterInput): User !
    login(username: String!, password: String!): User !
    createProject(name: String!, description: String): Project!
}
`;