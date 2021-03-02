import React, { useState } from 'react';
import '../css/createProject.css';
import '../css/main.css';
import gql from 'graphql-tag';
import SideAndNavbar from '../components/SideAndNavbar';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';
import ProjectTable2 from '../components/ProjectTable2';
import AssignedPersonnel from '../components/AssignedPersonnel';
import TicketsTable2 from '../components/TicketsTable2';
import '../css/projectDetails.css';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

function ProjectDetails(props) {
  const history = useHistory();
//console.log("Props", props.history.location.state.indexValue);
//console.log("Props 2:", props.history.location.state.index);
var value =  props.history.location.state.index;
//console.log("Props", props.history.location.state.array[value - 1]);

function AssignUser() {
  //history.push('/AssignUser');
  history.push({
    pathname: '/AssignUser',
    search: '?update=true',  // query string
    state: {  // location state
      index: value, 
    },
  }); 
}

function CreateTicket() {
  history.push('/CreateTicket');
}

 return (
<body>
    <SideAndNavbar/>
    <div className="firstDiv">
    <ProjectTable2 index={value}/> 
    </div>
    <div className="main">
    <div classsName="firstmain">
    <AssignedPersonnel index={value}/>
    </div>
    <div className="secondMain">
    <TicketsTable2 className="ticketsTable"/>
    </div>
    </div>
    <div className="bottomDiv">
      <Button variant="contained" color="primary" onClick={AssignUser} className="btn1">Assign User</Button>
      <Button variant="contained" color="primary" onClick={CreateTicket} className="btn2">Create Ticket</Button>
    </div>
   </body>
 )
}


export default ProjectDetails;