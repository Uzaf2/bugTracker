import React, { useState } from 'react';
import SideAndNavbar from '../components/SideAndNavbar';
import ProjectTable2 from '../components/ProjectTable2';
import AssignedPersonnel from '../components/AssignedPersonnel';
import TicketsTable2 from '../components/TicketsTable2';
import '../css/projectDetails.css';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {useContext} from 'react';
import { AuthContext } from '../context/auth';
import jwtDecode from 'jwt-decode';

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
    firstDiv: {
      marginLeft: '60px'
    },
    bottomDiv: {
      height:'10%',
      marginLeft:'20%',
      marginTop: '20px'
    }, btn1: {
      marginTop: '20px'
    },
    btn2: {
      marginTop: '20px'
    }
  });


function ProjectDetails(props) {
  var {user, logout} = useContext(AuthContext);

  if (user!=null)
  {
    var count = Object.keys(user).length;
    console.log("count",count);

    if (count == 2)
    {
      user  = jwtDecode (localStorage.getItem('jwtToken'));
    }
    else if (count > 2)
    {
      
    }
  }

const classes = useStyles();
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
  history.push({
    pathname: '/CreateTicket',
    search: '?update=true',  // query string
    state: {  // location state
      index: value, 
    },
  }); 
}

 return (
<body>
    <SideAndNavbar/>
      
    <div class="test1">
    <div class="wrapper1">
    <div class="box1 a1">

    {user && user.role === 'Demo Admin' && (
    <Button variant="contained" color="primary" onClick={AssignUser} className={classes.btn1}>Assign User</Button>
    )}
    {user && user.role === 'Demo Manager' && (
    <Button variant="contained" color="primary" onClick={AssignUser} className={classes.btn1}>Assign User</Button>
    )}
    <Button variant="contained" color="primary" onClick={CreateTicket} className={classes.btn2} >Create Ticket</Button>
    </div>
  <div class="box1 b1">
  <ProjectTable2 index={value}/> 
  </div>
  <div class="box1 c1">
  <AssignedPersonnel index={value}/>
  </div>
  <div class="box1 d1">
  <TicketsTable2 className="ticketsTable" index={value}/>
  </div>
  </div>
  </div>
  </body>
 )
}


export default ProjectDetails;