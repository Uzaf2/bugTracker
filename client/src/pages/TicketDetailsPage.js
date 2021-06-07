import React from 'react';
import SideAndNavbar from '../components/SideAndNavbar';
import '../css/ticketDetailsPage.css';
import TicketDetailsComponent from '../components/TicketDetailsComponent';
import AddComment from '../components/AddComment';
import DisplayComments from '../pages/DisplayComments';


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
    <DisplayComments index= {props}/>
  </div>
 
  </div>
  </div>
    
   </body>
 )
}


export default TicketDetailsPage;