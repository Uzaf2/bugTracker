import React, { useState } from 'react';
import SideAndNavbar from '../components/SideAndNavbar';
import '../css/ticketDetailsPage.css';
import { makeStyles } from '@material-ui/core/styles';
import TicketDetailsComponent from '../components/TicketDetailsComponent';
import AddComment from '../components/AddComment';
import DisplayComments from '../pages/DisplayComments';

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


function TicketDetailsPage(props) {
  
 return (
<body>
    <SideAndNavbar/>
      
    <div class="test">
    <div class="wrapperOne">
    <div class="boxOne a">
    <TicketDetailsComponent index={props}/>
    </div>
  <div class="boxOne b">
    <AddComment index= {props}/>
  </div>
  <div class="boxOne c">
  <DisplayComments index= {props}/>
  </div>
  <div class="boxOne d">
  </div>
  </div>
    </div>
    
    
   </body>
 )
}


export default TicketDetailsPage;