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
    id: ID !
    title: String !
    description : String !
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
    users: [ID]
    tickets: [ID]
}

input userInput {
    name: String 
}
type Query {
    getUsers: [User]
    getProjects: [Project]
    getUser(userId: String!): User!
    getUserMultiple(users: [userInput]): [User]!
    getProjectsAndUsers(name: String!): [User]
}

type Mutation {
    register(registerInput:RegisterInput): User !
    login(username: String!, password: String!): User !
    createProject(name: String!, description: String): Project!
    assignUser(projectId: String !, userId: String ! ): Project!
}
`;