import React from 'react';
import SideAndNavbar from '../components/SideAndNavbar';
import AssignedPersonnel2 from '../components/AssignedPersonnel2';
import '../css/projectUserAssign.css';
import { useHistory } from "react-router-dom";
import AssignUser from '../components/AssignUser';

function ProjectUserAssign(props) {
    const history = useHistory();
    console.log("props", props)
    var value =  props.history.location.state.index;
   
 return (
<body>
    <SideAndNavbar/>
  
  <div class="container">
   <div class="row1">
   <AssignUser index={value}/>
   </div>

   <div class="row2">
   <AssignedPersonnel2 index={value}/>
   </div>
   </div>
  
</body>
 )
}


export default ProjectUserAssign;
