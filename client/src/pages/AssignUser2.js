import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import {FETCH_PROJECT_ASSIGNED_PROSONNEL_QUERY} from '../util/graphql';


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
    marginLeft: '30%',
    fontFamily: 'sans-serif',
    fontStyle:'italic',
    fontWeight:'600'
},
input:{
    width: '80%',
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

function AssignUser2(props) {

    const history = useHistory();
    const classes = useStyles();
    const [formError,setFormError] = useState(false);
    const [userId, setUserId] = useState("");
    const [projectId, setProjectId] = useState("");
    const index = props.index;
    console.log("Index", index);
    const { loading, data } = useQuery(FETCH_USERS_QUERY);
    const projectsQuery = useQuery(FETCH_PROJECTS_QUERY);

    const [ errors, setErrors ] = useState({});

    useEffect(() => {
      assignUser();
    }, [userId, projectId]);

    const [assignUser,{loading1} ] = useMutation(ASSIGN_USER, {
      update(proxy,result){
        const data = proxy.readQuery({ query: FETCH_PROJECT_ASSIGNED_PERSONNEL_QUERY,
          variables: { name: String(props.index)}
         });
          var lengthValue = result.data.assignUser.length;
          var element = result.data.assignUser [lengthValue -1 ];
          proxy.writeQuery({ query: FETCH_PROJECT_ASSIGNED_PERSONNEL_QUERY, 
          data:{getProjectsAndUsers:[element, ...data.getProjectsAndUsers],},
          variables: { name: String(props.index)}});
      }, 
      onError(err){
          console.log("Errors: ", err);
          //setErrors(err.graphQLErrors[0].extensions.exception.errors)
      }, variables: { userId, projectId, name: String(props.index) }
     
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
    console.log("x", x);
    var indexValue;
    const length = data.getUsers.length;
    for(var i=0;i<length;i++)
    {
        if (valueMatch === data.getUsers[i].username)
        {
            indexValue = i;
        }
    } 

    console.log("IndexValue", indexValue);
    console.log("index", index);
    console.log("ProjectsQuery", projectsQuery);
    setUserId(data.getUsers[indexValue].id);
    setProjectId(projectsQuery.data.getProjects[index-1].id);

    //AssignUser();
  }  

      
 return (
<body>
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
mutation assignUser($projectId: String! $userId: String!, $name: String !) {
  assignUser(projectId:$projectId userId: $userId, name: $name) {
    id 
    username
    email
    creationTime
    role 
    access
    }     
}`;

const FETCH_PROJECT_ASSIGNED_PERSONNEL_QUERY = gql`
  query  getProjectsAndUsers ($name: String!){
    getProjectsAndUsers (name: $name) {
      id 
      username
      email
      creationTime
      role 
      access
  }
  }`;
export default AssignUser2;