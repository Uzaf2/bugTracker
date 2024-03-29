import React, { useState } from 'react';
import '../css/dashboard.css';
import SideAndNavbar from '../components/SideAndNavbar';
import TicketPriorityBarChart from '../components/TicketPriorityBarChart';
import TicketTypePieChart from '../components/TicketTypePieChart';
import TicketStatusBarChart from '../components/TicketStatusBarChart';
import DeveloperTicketsPieChart from '../components/DeveloperTicketsPieChart';
import TicketTypeNewPieChart from '../components/TicketTypeNewPieChart';


function Dashboard(props) {

 return (
<body>
        <SideAndNavbar/>
        <div class="container"> 
        <div class="grid-item1"> <TicketPriorityBarChart/>
        <div class="low-div-grid-item1">
        <p>Tickets By Priority</p>
        </div>
        </div>
        <div class="grid-item2"><TicketTypePieChart/>
        <div class="low-div-grid-item2">
        <p>Tickets By Type</p>
        </div>
        </div>
        <div class="grid-item3"><TicketStatusBarChart/>
        <div class="low-div-grid-item3">
        <p>Tickets By Progress</p>
        </div>
        </div>
        <div class="grid-item4"><DeveloperTicketsPieChart/>
        <div class="low-div-grid-item4">
        <p>Tickets Assigned By Developer</p>
        </div>
        </div>
        </div>
   </body>
 )
}





export default Dashboard;