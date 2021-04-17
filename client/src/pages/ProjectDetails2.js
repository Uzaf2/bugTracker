import React, { useState } from 'react';
import '../css/createProject.css';
import Paper from '@material-ui/core/Paper';



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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: '100%',
  
    },
    banner:{
      backgroundColor: '#262B40',
      height: '5%',
      width:'93%',
      padding: '2%',
      marginLeft:'1%'
      },
      heading:{
        color: 'white'
      },
    container: {
      maxHeight: 440,
    },
  });

function ProjectDetails2(props) {
    const classes = useStyles();
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

  console.log("Value from index", value);
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
    <div className="assignedPersonnel">
    <AssignedPersonnel index={value}/>
    </div>
    <div className="secondMain" class="secondMain">
    <TicketsTable2 className="ticketsTable"/>
    </div>
    </div>
    
    
   </body>
 )
}


export default ProjectDetails2;