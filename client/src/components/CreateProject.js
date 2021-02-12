import React from 'react';
import '../css/createProject.css';
import { makeStyles } from '@material-ui/core/styles';
import '../css/main.css';
import UserTable from './UserTable';
import grid from '../icons/grid-outline.svg';
import homeIcon from '../icons/home-outline.svg';
import layers from '../icons/layers-outline.svg';
import list from '../icons/list-outline.svg';
import peopleCirle from '../icons/people-circle-outline.svg';
//import peopleOutline from '../icons/people-outline.svg';
import personAddOutline from '../icons/person-add-outline.svg';
import personCircleOutline from '../icons/person-circle-outline.svg';
//import personOutline from 'person-outline.svg';
import reorderFourOutline from '../icons/reorder-four-outline.svg';
//import users from 'users.svg';
import UserList from './UserList';
import gql from 'graphql-tag';
import SideAndNavbar from './SideAndNavbar';

function CreateProject(props) {

 return (
<body>
      <div>
        <SideAndNavbar/>
          <form class="inputForm">
            <label for="fname">Project Name</label>
            <input type="text" id="fname" name="firstname" placeholder="Project name.." />
            <label for="lname">Project Description</label>
            <textarea className="description" type="text" id="lname" name="lastname" placeholder="Project desc.." required></textarea>
            <input type="submit" value="Create Project" />
          </form>
   </div>
   </body>

 )

     

}

const CREATE_PROJECT =  gql `
mutation register(
    $name: String !
    $description: String !
){
    register(
        registerInput: {
            name: $name
            description: $description
        }
    ){
        name description
    }
}`

export default CreateProject;