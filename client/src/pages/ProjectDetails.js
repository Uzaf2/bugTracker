import React, { useState } from 'react';
import SideAndNavbar from '../components/SideAndNavbar';
import ProjectTable2 from '../components/ProjectTable2';
import AssignedPersonnel from '../components/AssignedPersonnel';
import TicketsTable2 from '../components/TicketsTable2';
import '../css/projectDetails.css';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

function ProjectDetails(props) {
  const history = useHistory();
var value =  props.history.location.state.index;

function AssignUser() {

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
      
    <div className="bottomDiv">
    <Button variant="contained" color="primary" onClick={AssignUser} className="btn1">Assign User</Button>
      <Button variant="contained" color="primary" onClick={CreateTicket} className="btn2">Create Ticket</Button>
    </div>
     
    <div className="firstDiv">
    
    <ProjectTable2 index={value}/> 
    </div>
    <div className="main">
    <AssignedPersonnel index={value}/>
    <div className="secondMain">
    <TicketsTable2 className="ticketsTable"/>
    </div>
    </div>
    
    
   </body>
 )
}


export default ProjectDetails;