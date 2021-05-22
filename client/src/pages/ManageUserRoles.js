import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserTable from '../components/UserTable';
import SideAndNavbar from '../components/SideAndNavbar';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { FETCH_USERS_QUERY } from '../util/graphql';

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
  width: '50%',
  marginLeft: "20%",
  fontSize: 18,
  fontWeight: '800',
  fontFamily: 'sans-serif'
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
      }
  });
  
  
  var rows= ['Select the user'];
  if (loading) 
       return <p>Loading...</p>;
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

  return (
    <body>
    <SideAndNavbar/>
   
    <form onSubmit={onSubmit} class="inputForm">
   
      <div id="main" class="container">
        <div class="leftSide">
        
          <div class="custom-select1">
          <h2 className={classes.title}>Manage User Roles</h2>
            <label for="cars" className={classes.label}>Select 1 or more Users:</label>
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
            <label for="cars" class="label2" className={classes.label}>Select the Role to assign:</label>
            <br/>
            <select className={classes.input} id="role" name="role" onChange={onChange} value={values.role}>
              <option value="0">--Select Role/None--:</option>
              <option value="Admin">Admin</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Developer">Developer</option>
              <option value="Submitter">Submitter</option>
            </select>
          </div>

          <Button className={classes.submit} variant="contained" color="primary" onClick={assignRole()}>
          Assign
          </Button>
         </div>
       
          <div class="rightSide">
            <UserTable class="userTable" />
          </div>
      </div>
      </form>
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
