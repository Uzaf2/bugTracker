import React from 'react';
import '../css/main.css';
import {useContext} from 'react';
import grid from '../icons/grid-outline.svg';
import homeIcon from '../icons/home-outline.svg';
import layers from '../icons/layers-outline.svg';
import peopleCirle from '../icons/people-circle-outline.svg';
import personAddOutline from '../icons/person-add-outline.svg';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../context/auth';
import jwtDecode from 'jwt-decode';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import { Home } from '@material-ui/icons';
/*
        <a className="section" href="#section" onClick={openNav}>
          Open Sidebar
        </a>
        <a className="section" href="#section" onClick={closeNav}>
          Close Sidebar
          </a>
          */
function SideAndNavbar(props) {  
  var {user, logout} = useContext(AuthContext);
  var activeBar = "";

  if (user!=null)
  {
    var count = Object.keys(user).length;
    if (count == 2)
    {
      user  = jwtDecode (localStorage.getItem('jwtToken'));
      console.log("User :", user);
    }
    else if (count > 2)
    {
      user  = jwtDecode (localStorage.getItem('jwtToken'));
      console.log("User :", user);
    }
  }

  console.log(" User: ", user);
  const history = useHistory();
 
  function openNav(e) {
    document.getElementById("mySidebar").style.width = "20%";
    document.getElementById("main").style.marginLeft = "20%";
    document.getElementById('navName').style.fontSize = '0.75rem';
    document.getElementById('navName1').style.fontSize = '0.75rem';
    document.getElementById('navName2').style.fontSize = '0.75rem';
    document.getElementById('navName3').style.fontSize = '0.75rem';
    document.getElementById('navName4').style.fontSize = '0.75rem';
    document.getElementById('navName5').style.fontSize = '';
    document.getElementById('grid').style.width = '2.4%';
    document.getElementById('grid1').style.width = '2.4%';
    document.getElementById('grid2').style.width = '2.4%';
    document.getElementById('grid3').style.width = '2.4%';
    document.getElementById('grid4').style.width = '2.4%';
    document.getElementById('grid5').style.width = '2.4%';
  }

  function closeNav(e) {
    document.getElementById('mySidebar').style.width = '4.8%';
    document.getElementById('main').style.marginLeft = '4.8%';
    document.getElementById('navName').style.fontSize = '0%';
    document.getElementById('navName1').style.fontSize = '0%';
    document.getElementById('navName2').style.fontSize = '0%';
    document.getElementById('navName3').style.fontSize = '0%';
    document.getElementById('navName4').style.fontSize = '0%';
    document.getElementById('navName5').style.fontSize = '0%';
    document.getElementById('grid').style.width = '2.4%';
    document.getElementById('grid1').style.width = '2.4%';
    document.getElementById('grid2').style.width = '2.4%';
    document.getElementById('grid3').style.width = '2.4%';
    document.getElementById('grid4').style.width = '2.4%';
    document.getElementById('grid5').style.width = '2.4%';
  }
  
  function HandleOnClickDashboard (){
    history.push('/Dashboard');
  }

  function HandleOnManageProjectUsers (){
    history.push('/ManageProjectUsers');
  }
  function HandleOnClickProjectTable() {
    history.push('/ProjectTable');
  }

  function HandleOnClickTicketsTable() {
    history.push('/TicketsTable');
  }
  
  function HandleOnClickManageUserRoles() {
    history.push('/ManageUserRoles');
  }

  function HandleOnClickAssignUser(){
     history.push('/AssignUser');
  }

  function HandleOnClickUserProfile(){
    history.push('/UserProfile');
 }

  function handleClick(){
    history.push('./Dashboard');
  }

  return (
    <body>
      <div id="mySidebar" class="sidebar">
        <a href="#" className="section" onClick={HandleOnClickDashboard}>
          <img class="grid" id="grid" src={grid} alt="image al" />
          <span class="navName" id="navName">Dashboard Home</span>
        </a>
      
        {user && user.role === "Demo Admin" && (
          <React.Fragment>
          <a href="#" className="section" onClick={HandleOnClickManageUserRoles}>
          <img class="grid" id="grid1" src={homeIcon} alt="image al" />
          <span class="navName" id="navName1">Manage Role Assignment</span>
        </a>
        <a href="#" className="section" onClick={HandleOnManageProjectUsers}>
          <img class="grid" id="grid2" src={peopleCirle} alt="image al" />
          <span class="navName" id="navName2">Manage Project Users</span>
        </a>
        </React.Fragment>
        )}

         {user && user.role === "Project Manager" && (
            <React.Fragment>
          <a href="#" className="section" onClick={HandleOnClickManageUserRoles}>
          <img class="grid" id="grid1" src={homeIcon} alt="image al" />
          <span class="navName" id="navName1">Manage Role Assignment</span>
        </a>
        <a href="#" className="section" onClick={HandleOnManageProjectUsers}>
          <img class="grid" id="grid2" src={peopleCirle} alt="image al" />
          <span class="navName" id="navName2">Manage Project Users</span>
        </a>
        </React.Fragment>
        )}

         {user && user.role === "Admin" && (
            <React.Fragment>
          <a href="#" className="section" onClick={HandleOnClickManageUserRoles}>
          <img class="grid" id="grid1" src={homeIcon} alt="image al" />
          <span class="navName" id="navName1">Manage Role Assignment</span>
        </a>
        <a href="#" className="section" onClick={HandleOnManageProjectUsers}>
          <img class="grid" id="grid2" src={peopleCirle} alt="image al" />
          <span class="navName" id="navName2">Manage Project Users</span>
        </a>
        </React.Fragment>
        )}

        {user && user.role === 'Demo Manager' && (
            <React.Fragment>
          <a href="#" className="section" onClick={HandleOnClickManageUserRoles}>
          <img class="grid" id="grid1" src={homeIcon} alt="image al" />
          <span class="navName" id="navName1">Manage Role Assignment</span>
        </a>
        <a href="#" className="section" onClick={HandleOnManageProjectUsers}>
          <img class="grid" id="grid2" src={peopleCirle} alt="image al" />
          <span class="navName" id="navName2">Manage Project Users</span>
        </a>
        </React.Fragment>
        )}  
      
        <a href="#" className="section" onClick={HandleOnClickProjectTable}>
          <img class="grid" id="grid3" src={layers} alt="image al" />
          <span class="navName" id="navName3">My Projects</span>
        </a>
        <a href="#" className="section" onClick={HandleOnClickTicketsTable}>
          <img class="grid" id="grid4" src={layers} alt="image al" />
          <span class="navName" id="navName4">My Tickets</span>
        </a>
        <a href="#" className="section" onClick={HandleOnClickUserProfile}>
          <img class="grid" id="grid5" src={personAddOutline} alt="image al" />
          <span class="navName" id="navName5">User Profile</span>
        </a>
        </div>
        
        <div class="topnav">
        
        <span class="activeArea" id="activeArea"></span>

        <a onClick={handleClick} href="#home" text="Home" name="HHOME">
        <HomeIcon></HomeIcon>
        <span class="homeDiv">Home</span>
        </a>

        <a href="#about" onClick={logout}>
        <ExitToAppIcon></ExitToAppIcon>   
        <span class="logoutDiv">Logout</span>    
        </a>

      </div>
    </body>
  );
}

export default SideAndNavbar;