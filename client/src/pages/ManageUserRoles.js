import { makeStyles } from '@material-ui/core/styles';
import '../css/main.css';
import BasicTable from '../components/BasicTable';
import grid from '../icons/grid-outline.svg';
import homeIcon from '../icons/home-outline.svg';
import layers from '../icons/layers-outline.svg';
import list from '../icons/list-outline.svg';
import peopleCirle from '../icons/people-circle-outline.svg';
//import peopleOutline from '../icons/people-outline.svg';
import personAddOutline from '../icons/person-add-outline.svg';
import personCircleOutline from '../icons/person-circle-outline.svg';
//import personOutline from 'person-outline.svg';
import reorderFourOutline from '../icons/reorder-four-outline.svg';
//import users from 'users.svg';


function ManageUserRoles(props) {

  function openNav(e) {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";

    document.getElementById('navName').style.fontSize = '0.75rem';
    document.getElementById('navName1').style.fontSize = '0.75rem';
    document.getElementById('navName2').style.fontSize = '0.75rem';
    document.getElementById('navName3').style.fontSize = '0.75rem';
    document.getElementById('navName4').style.fontSize = '0.75rem';
    document.getElementById('navName5').style.fontSize = '';

    
    document.getElementById('grid').style.width = '30px';
    document.getElementById('grid1').style.width = '30px';
    document.getElementById('grid2').style.width = '30px';
    document.getElementById('grid3').style.width = '30px';
    document.getElementById('grid4').style.width = '30px';
    document.getElementById('grid5').style.width = '30px';
  }
  
  function closeNav(e) {
    document.getElementById('mySidebar').style.width = '60px';
    document.getElementById('main').style.marginLeft= '60px';

    document.getElementById('navName').style.fontSize = '0px';
    document.getElementById('navName1').style.fontSize = '0px';
    document.getElementById('navName2').style.fontSize = '0px';
    document.getElementById('navName3').style.fontSize = '0px';
    document.getElementById('navName4').style.fontSize = '0px';
    document.getElementById('navName5').style.fontSize = '0px';

  
    document.getElementById('grid').style.width = '30px';
    document.getElementById('grid1').style.width = '30px';
    document.getElementById('grid2').style.width = '30px';
    document.getElementById('grid3').style.width = '30px';
    document.getElementById('grid4').style.width = '30px';
    document.getElementById('grid5').style.width = '30px';

  }
 
  return (

    <body>
      <div id="mySidebar" class="sidebar">
       
        <a href="#"className="section">
        <img class="grid" id="grid" src={grid} alt="image al" />
        <span class="navName" id="navName">Dashboard Home</span>
        </a>
       
        <a href="#"className="section">
        
        <img class="grid" id="grid1" src={homeIcon} alt="image al" />
          <span class="navName" id="navName1">Manage Role Assignment</span>
        </a>
        <a href="#" className="section">
        <img class="grid" id="grid2"  src={peopleCirle} alt="image al" />
          <span class="navName" id="navName2">Manage Project Users</span>
        </a>
        <a href="#" className="section">
        <img class="grid" id="grid3"  src={layers} alt="image al" />
          <span class="navName" id="navName3">My Projects</span>
        </a>
        <a href="#" className="section">
        <img class="grid" id="grid4"  src={layers} alt="image al" />
          <span class="navName" id="navName4">My Tickets</span>
        </a>
        <a href="#" className="section">
          <img class="grid" id="grid5" src={personAddOutline} alt="image al" />
          <span class="navName" id="navName5">User Profile</span>
        </a>
        <a className="section" href="#section"  onClick={openNav}>
          Open Sidebar
          </a>

          <a className="section" href="#section" onClick={closeNav}>
          Close Sidebar
          </a>
      </div>


    <div id="main" class="main">
      
  
 <div class="grid-item">
 <p>Manage User Roles</p>
  <div class="custom-select">
  <label for="cars" class="heading">Select 1 or more Users:</label>
  <br/>
   <select>
    <option value="0">Select User:</option>
    <option value="1">Hanan</option>
    <option value="2">Rizwan</option>
    <option value="3">Usman</option>
  </select>
</div>
<div class="custom-select2">
      <label for="cars" class="heading">Select the Role of assign:</label>
      <br/>
   <select>
    <option value="0">--Select Role/None--:</option>
    <option value="1">Admin</option>
    <option value="2">Demo_Admin</option>
    <option value="3">Demo_Developer</option>
    <option value="4">Demo_Project Manager</option>
  </select>
</div>
</div>

<div class="grid-item">
<div class="table">
<BasicTable class="basicTable"/>
</div>
</div>
</div>
    
</body>
  );
}

export default ManageUserRoles;