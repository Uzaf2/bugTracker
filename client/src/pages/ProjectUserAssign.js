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
    },
    root: {
      width: '100%',
  },
  container: {
      maxHeight: 440,
  },
  label: {
      fontSize: 12,
      marginLeft: '30%',
      fontFamily: 'sans-serif',
      fontStyle:'italic',
      fontWeight:'600'
  },
  input:{
      width: '40%',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      borderWidth: '1px',
      borderColor: '#ddd',
      borderRadius: '4px', 
      boxSizing: 'border-box',
      marginLeft: '30%',
      marginRight: '30%'
  },
  submit:{
      width: '40%',
      backgroundColor: '#262B40',
      color: 'white',
      padding: '14px 20px',
      margin: '8px 0',
      display: 'inline-block',
      borderWidth: '4px',
      borderRadius: '4px', 
      marginLeft: '30%',
      marginRight: '30%',
      '&:hover': {
          background: " #F5A623",
       },
  },
description: {
  width: '530px',
  height: '200px',
  marginLeft: '30%',
  marginRight: '30%'
},
title: {
    marginTop: '10%',
    paddingTop: '100px',
    marginLeft: "43%",
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'sans-serif'
}
  });

function ProjectUserAssign(props) {
    const classes = useStyles();
    const history = useHistory();
    console.log("Value",props);
    var value =  props.history.location.state.index;
   
 return (
<body>
    <SideAndNavbar/>
      
   <div class="split left">
   <div class="centered1">
   <AssignUser2 index={value}/>
   </div>
   </div>

   <div class="split right">
   <div class="centered2">
   <AssignedPersonnel index={value}/>
   
   </div>
   </div>
  
</body>
 )
}


export default ProjectUserAssign;
