import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserTable from '../components/UserTable';
import SideAndNavbar from '../components/SideAndNavbar';
import Button from '@material-ui/core/Button';
import { useForm } from '../util/hooks';
import { gql, useMutation, useQuery } from '@apollo/client';
import { FETCH_USERS_QUERY } from '../util/graphql';
import Spinner from 'react-spinner-material';
import swal from 'sweetalert';
import '../css/manageUserRoles.css';

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
    marginLeft: '20%',
    fontFamily: 'sans-serif',
    fontStyle:'italic',
    fontWeight:'600'
},
input:{
    width: '60%',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    borderWidth: '1px',
    borderColor: '#ddd',
    borderRadius: '4px', 
    boxSizing: 'border-box',
    marginLeft: '15%',
    marginRight: '30%'
},
submit:{
    width: '60%',
    height: '7%',
    backgroundColor: '#262B40',
    color: 'white',
    padding: '14px 20px',
    margin: '8px 0',
    display: 'inline-block',
    borderWidth: '4px',
    borderRadius: '10px', 
    marginLeft: '16%',
    marginRight: '30%',
    '&:hover': {
        background: "#F5A623",
        borderRadius: '25px'
     },
},
description: {
width: '530px',
height: '200px',
marginLeft: '30%',
marginRight: '30%'
},
title: {
  width: '80%',
  marginLeft: "20%",
  fontSize: 18,
  fontWeight: '800',
  fontFamily: 'sans-serif'
},
  spinner: {
    marginLeft: '50%',
    marginTop: '25%'
  }
});

function ManageUserRoles(props) {

  const classes = useStyles();
  const [errors, setErrors]= useState({});
  const [usersValue, setUserValue] = useState({});

  const {onChange, onSubmit, values}= useForm(assignRole, {
      name:'',
      role: ''
  });
  
  const { loading, data } = useQuery(FETCH_USERS_QUERY);
  
  const [assign, {loading:assignLoading}] = useMutation (ASSIGN_ROLE,{
    onError(err) {
    },
    variables:values,
      update(proxy,  result ){
        const data = proxy.readQuery({ query: FETCH_USERS_QUERY });
        proxy.writeQuery({ query: FETCH_USERS_QUERY, data});
        success();
      }
  });
  
  var rows= ['Select the user'];
  if (loading) 
  return (<div className={classes.spinner}>
  <Spinner  radius={60} color={"#4B0082"} stroke={5} visible={true} />
  </div>);
  else {
      var length = data.getUsers.length;
      for(var i=0;i<length;i++)
      {
          rows.push(data.getUsers[i].username)
      }    
  }

  function assignRole () {
    assign();
}

function success() {
  swal({
    title: "Done!",
    text: "Role Assigned to the User",
    icon: "success",
    timer: 2000,
    color:"#0000FF",
    button: false
  })
}

  return (
    <body>
    <SideAndNavbar index={"Manage User Roles"}/>
   
      <div id="main" class="container">
        <div class="leftSide">
        <form onSubmit={onSubmit} class="inputForm">
          <div class="custom-select1">
          <h2 class="title">Manage User Roles</h2>
            <label for="cars" class="label1" >Select 1 or more Users:</label>
            <br/>
            <select className={classes.input} id="name" name="name" onChange={onChange} value={values.name}>
         {rows.map(time => {
           return (
             <option value={time}> {time} </option>
           )
         })}
        </select>
          </div>
          
          <div class="custom-select2">
            <label for="cars" class="label2" >Select the Role to assign:</label>
            <br/>
            <select className={classes.input} id="role" name="role" onChange={onChange} value={values.role}>
              <option value="0">--Select Role/None--:</option>
              <option value="Admin">Admin</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Developer">Developer</option>
              <option value="Submitter">Submitter</option>
            </select>
          </div>

          <Button class="btn41-43 btn-41" variant="contained" color="primary"  type="submit">
          Assign
          </Button>

          </form>
         </div>
       
          <div class="rightSide">
            <UserTable class="userTable" />
          </div>
      </div>
      
    </body>
  );
}

const ASSIGN_ROLE = gql`
  mutation  assignRole ($name: String! $role: String!){
    assignRole (name: $name role: $role) 
  {
    username
  id
  email
  creationTime
  role
  access
  }
  }`;

 

export default ManageUserRoles;
