import gql from 'graphql-tag';


export const FETCH_USERS_QUERY = gql`
{
  getUsers {
  username
  id
  email
  creationTime
  role
  access
}
}`;


export const FETCH_PROJECT_ASSIGNED_PROSONNEL_QUERY = gql`
  query  getProjectsAndUsers ($name: String!){
    getProjectsAndUsers (name: $name) {
      id 
      username
      email
      creationTime
      role 
      access
  }
  }`;


export const FETCH_PROJECTS_QUERY = gql`
{   
  getProjects{
  name
  description
  id
}
}`;


