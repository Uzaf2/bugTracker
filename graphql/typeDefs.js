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

type Project {
    id: ID!
    name: String!
    description: String!
    users: [ID]
    tickets: [ID]
}

type Ticket {
    id: ID !
    title: String !
    description : String !
    assignedProject:   [ID] 
    assignedDeveloper: [ID] 
    priority: String 
    status: String
    type: String
    createdAt: String
    updatedAt: String
}

input userInput {
    name: String 
}

type Query {
    getUsers: [User]!
    getProjects: [Project]!
    getUser(userId: String!): User!
    getUserMultiple(users: [userInput]): [User]!
    getProjectsAndUsers(name: String!): [User]
    getTickets: [Ticket]
}

type Mutation {
    register(registerInput:RegisterInput): User !
    login(username: String!, password: String!): User !
    createProject(name: String!, description: String): Project!
    assignUser(projectId: String !, userId: String ! ): Project!
    createTicket(title: String!, description: String!, assignedProjectInput: String!, assignedDeveloperInput: String!, priority: String!, type: String!, status: String!): Ticket!
    assignRole (name: String!, role: String !): String !
}
`;