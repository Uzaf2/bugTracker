import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../css/main.css';
import UserTable from '../components/UserTable';
import SideAndNavbar from '../components/SideAndNavbar';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

function ManageUserRoles(props) {

  const [errors, setErrors]= useState({});
  const [usersValue, setUserValue] = useState({});

  const {onChange, onSubmit, values}= useForm(assignRole, {
      name:'',
      role: ''
  });
  
  const { loading, data } = useQuery(FETCH_USERS_QUERY);
  
  const [assign, {loading:assignLoading}] = useMutation (ASSIGN_ROLE,{
      update(_,  {data}){
     
      },
      onError(err) {
          //.graphQLErrors[0].extensions.exception.errors
         // setErrors(err);
          console.log("Errors from create tickets", err);
      },
      variables:values
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
      <div id="main" class="main">
        <div class="grid-item">
          <p>Manage User Roles</p>
          <div class="custom-select">
            <label for="cars" class="heading" className="part1">Select 1 or more Users:</label>
            <br />
            <select id="name" name="name" onChange={onChange} value={values.name}>
         {rows.map(time => {
           return (
             <option value={time}> {time} </option>
           )
         })}
      </select>
          </div>
          
          <div class="custom-select2">
            <label for="cars" class="heading" className="part2">Select the Role to assign:</label>
            <br />
            <select id="role" name="role" onChange={onChange} value={values.role}>
              <option value="0">--Select Role/None--:</option>
              <option value="1">Admin</option>
              <option value="2">Demo_Admin</option>
              <option value="3">Demo_Developer</option>
              <option value="4">Demo_Project Manager</option>
            </select>
          </div>

          <Button variant="contained" color="primary" type="submit">
          Assign
          </Button>
        </div>
       
        <div class="grid-item">
          <div class="table">
            <UserTable class="userTable" />
          </div>
        </div>
      </div>

      </form>

    </body>
  );
}

const ASSIGN_ROLE = gql`
  mutation  assignRole ($name: String! $role: String!){
    assignRole (name: $name role: $role) 
  }`;

  const FETCH_USERS_QUERY = gql`
{
  getUsers {
  username
  id
  email
  creationTime
  role
  access
}
}`;

export default ManageUserRoles;