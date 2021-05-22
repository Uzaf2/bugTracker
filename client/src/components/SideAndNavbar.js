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
  //console.log("AuthContext user", user);
  //console.log("user role", user.token);

  //    user  = jwtDecode (localStorage.getItem('jwtToken'));
      
  const history = useHistory();
 
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
    document.getElementById('main').style.marginLeft = '60px';

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
      
        {user && user.role === 'Demo Admin' && (
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
        <a href="#" className="section">
          <img class="grid" id="grid5" src={personAddOutline} alt="image al" />
          <span class="navName" id="navName5">User Profile</span>
        </a>
        </div>
      <div class="topnav">
        <a onClick={handleClick} href="#home">Home</a>
        <a href="#about" onClick={logout}>Logout</a>
      </div>
    </body>
  );
}

export default SideAndNavbar;