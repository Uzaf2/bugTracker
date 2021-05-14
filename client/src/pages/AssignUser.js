import React, { useState, useEffect } from 'react';
import SideAndNavbar from '../components/SideAndNavbar';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';


const useStyles = makeStyles({
  root: {
      width: '100%',
  },
  container: {
      maxHeight: 440,
  },
  label: {
      fontSize: 12,
      marginLeft: '30%',
      fontFamily: 'sans-serif',
      fontStyle:'italic',
      fontWeight:'600'
  },
  input:{
      width: '40%',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      borderWidth: '1px',
      borderColor: '#ddd',
      borderRadius: '4px', 
      boxSizing: 'border-box',
      marginLeft: '30%',
      marginRight: '30%'
  },
  submit:{
      width: '40%',
      backgroundColor: '#262B40',
      color: 'white',
      padding: '14px 20px',
      margin: '8px 0',
      display: 'inline-block',
      borderWidth: '4px',
      borderRadius: '4px', 
      marginLeft: '30%',
      marginRight: '30%',
      '&:hover': {
          background: " #F5A623",
       },
  },
description: {
  width: '530px',
  height: '200px',
  marginLeft: '30%',
  marginRight: '30%'
},
title: {
    marginTop: '10%',
    paddingTop: '100px',
    marginLeft: "43%",
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'sans-serif'
}
});

function AssignUser(props) {
    const history = useHistory();
    const classes = useStyles();
    const [formError,setFormError] = useState(false);
    const [userId, setUserId] = useState("");
    const [projectId, setProjectId] = useState("");
    const index = props.location.state.index - 1;
    const { loading, data } = useQuery(FETCH_USERS_QUERY);
    const projectsQuery = useQuery(FETCH_PROJECTS_QUERY);

    const [ errors, setErrors ] = useState({});

    useEffect(() => {
      assignUser();
  }, [userId, projectId]);

    const [assignUser,{loading1} ] = useMutation(ASSIGN_USER, {
      update(_,{data}){

        success();
      }, 
      onError(err){
          setErrors(err.graphQLErrors[0].extensions.exception.errors)
      }, variables: { userId, projectId }
     
  });
  
    var rows= ['Select the user'];
    if (loading) 
         return <p>Loading...</p>;
    else {
        var length = data.getUsers.length;
        for(var i=0;i<length;i++)
        {
            rows.push(data.getUsers[i].username )
        }    
    }

    /*
    function AssignUser()
    {
      assignUser();
    }
    */

    function success() {
      alert("User assignned to the project");
    }

    function handleOnClick(event) {

        var x = document.getElementById("selectValue");
        const valueMatch = x.value;
        var indexValue;
        const length = data.getUsers.length;
        for(var i=0;i<length;i++)
        {
            if (valueMatch === data.getUsers[i].username)
            {
                indexValue = i;
            }
        } 

        setUserId(data.getUsers[indexValue].id);
        setProjectId(projectsQuery.data.getProjects[index].id);

        //AssignUser();
      }  
      
 return (
<body>
        <SideAndNavbar/>
        <div>
        <label className={classes.label} for="name">Assign Users to Projects</label>
         <select className={classes.input} id="selectValue"  onChange={handleOnClick} >
         {rows.map(time => {
           return (
             <option value={time}>{time}</option>
           )
         })}
    </select>
   
        </div>
   </body>
 )
}

const FETCH_USERS_QUERY = gql`
{
  getUsers{
  username
  id
  email
  creationTime
  role
  access
}
}`;


const FETCH_PROJECTS_QUERY = gql`
{
  getProjects{
  name
  description
  id
}
}`;

const ASSIGN_USER =  gql `
mutation assignUser($projectId: String! $userId: String!) {
  assignUser(projectId:$projectId userId: $userId) {
        name description id
    }     
}`;
export default AssignUser;