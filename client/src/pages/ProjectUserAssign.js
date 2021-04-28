import React, { useState } from 'react';
import SideAndNavbar from '../components/SideAndNavbar';
import AssignedPersonnel from '../components/AssignedPersonnel';
import '../css/projectUserAssign.css';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AssignUser2 from './AssignUser2';

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


function ProjectUserAssign(props) {
    const classes = useStyles();
    const history = useHistory();

    console.log(props);
    var value =  props.history.location.state.index;



 return (
<body>
    <SideAndNavbar/>
      
    <div className={classes.bottomDiv}>
    </div>
     
    <div className="main">
    <div className="assignedPersonnel">
    <AssignedPersonnel index={value}/>
    <AssignUser2 index={value}/>
    </div>

    <div>
   
    </div>
    
    </div>

  
    
    
   </body>
 )
}


export default ProjectUserAssign;