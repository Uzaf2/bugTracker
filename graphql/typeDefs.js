const { gql } = require ('apollo-server');

module.exports = gql `

input RegisterInput  {
    username: String !
    password: String !
    confirmPassword: String !
    email: String !
}

type File {
    filename: String!
    mimetype: String!
    encoding: String!
}

type User{
    id: ID!
    username: String !
    email: String !
    creationTime: String!
    role: String !
    access: String!
    token: String!
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
    comments: [ID]
    priority: String 
    status: String
    type: String
    createdAt: String
    updatedAt: String
}

type Comment {
    id: ID!
    message: String!
    createdAt: String!
    commenter: String!
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
    getTicketsByProjectId(id: String): [Ticket]!
    getTicketById(id: String!): Ticket!
    getCommentsByTicketId(id: String!): [Comment]
}

type Mutation {
    getUser( userId: String! ): User !
    getProject( projectId: String! ): Project !
    register(registerInput:RegisterInput): User !
    login(username: String!, password: String!): User !
    createProject(name: String!, description: String): Project!
    assignUser(projectId: String !, userId: String !, name: String! ): [User]!
    assignRole (name: String!, role: String !): [User] !
    demoLogin (role: String!): User!
    createComment(message: String!, id: String!): Comment!
    createTicket(title: String!, description: String!, assignedProjectInput: String!, assignedDeveloperInput: String!, priority: String!, type: String!, status: String!): Ticket!
    updateTicket(id:String! ,title: String!, description: String!, assignedProjectInput: String!, assignedDeveloperInput: String!, priority: String!, type: String!, status: String!): Ticket!
}
`;