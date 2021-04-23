import React, { useState } from 'react';
import '../css/dashboard.css';
import SideAndNavbar from '../components/SideAndNavbar';
import TicketPriorityBarChart from '../components/TicketPriorityBarChart';
import TicketTypePieChart from '../components/TicketTypePieChart';
import TicketStatusBarChart from '../components/TicketStatusBarChart';
import DeveloperTicketsPieChart from '../components/DeveloperTicketsPieChart';


function Dashboard(props) {

 return (
<body>
        <SideAndNavbar/>
        <div class="container"> 
        <div class="grid-item1"> <TicketPriorityBarChart/></div>
        <div class="grid-item2"><TicketTypePieChart/></div>
        <div class="grid-item3"><TicketStatusBarChart/></div>
        <div class="grid-item4"><DeveloperTicketsPieChart/></div>
        </div>
   </body>
 )
}





export default Dashboard;