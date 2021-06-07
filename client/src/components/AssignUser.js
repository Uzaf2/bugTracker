import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { gql, useMutation, useQuery } from '@apollo/client';
import Spinner from 'react-spinner-material';
import swal from 'sweetalert';
import '../css/assignUser.css';

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
  display: 'inline-block',
    marginTop: '10%',
    fontSize: 14,
    marginLeft: '30%',
    fontFamily: 'sans-serif',
    fontStyle:'italic',
    fontWeight:'600'
},
input:{
    marginTop: '10%',
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    borderWidth: '1px',
    borderColor: '#ddd',
    borderRadius: '4px', 
    boxSizing: 'border-box',
    marginLeft: '20%',
    marginRight: '10%'
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
},
spinner:{
  marginLeft: '50%',
  marginTop: '20%'
},
form: {
  width: '50%'
},
error:{
  width: '100px'
}
});

function AssignUser(props) {

    const history = useHistory();
    const classes = useStyles();
    const [formError,setFormError] = useState(false);
    const [userId, setUserId] = useState("");
    const [projectId, setProjectId] = useState("");
    const index = props.index;
    const { loading, data } = useQuery(FETCH_USERS_QUERY);
    const projectsQuery = useQuery(FETCH_PROJECTS_QUERY);

    const [ errors, setErrors ] = useState({});

    useEffect(() => {
      setTimeout(function() { //Start the timer
        //After 1 second, set render to true
         
    }.bind(this), 3000)

    assignUser();
   
    }, [userId, projectId]);

    const [assignUser,{loading1} ] = useMutation(ASSIGN_USER, {
      update(proxy,result){
        console.log("result", result);
        const data = proxy.readQuery({ query: FETCH_PROJECT_ASSIGNED_PERSONNEL_QUERY,
          variables: { name: String(index)}
         });
          var lengthValue = result.data.assignUser.length;
          var element = result.data.assignUser [lengthValue -1 ];
          proxy.writeQuery({ query: FETCH_PROJECT_ASSIGNED_PERSONNEL_QUERY, 
          data:{getProjectsAndUsers:[element, ...data.getProjectsAndUsers],},
          variables: { name: String(index)}});

          success();
      }, 
      onError(err){
          setErrors(err.graphQLErrors[0].extensions.exception.stacktrace[0])
          if(errors.length>0)
          {
            failure();
          }
      }, variables: { userId, projectId, name: String(index) }
     
  });
  
  var rows= ['Select the user'];
  if (loading) 
       return <Spinner  radius={60} color={"#4B0082"} stroke={5} visible={true} />
  else {
      var length = data.getUsers.length;
      for(var i=0;i<length;i++)
      {
          rows.push(data.getUsers[i].username )
      }    
  }

  function success() {
    swal({
      title: "Done!",
      text: "User assignned to the project",
      icon: "success",
      timer: 2000,
      button: false
    })
  }

function failure() {
    swal({
      title: "ERROR !",
      text: String(String(errors).substr(23,errors.length)),
      icon: "error",
      timer: 2000,
      button: false
    })
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
    setProjectId(projectsQuery.data.getProjects[index-1].id);
  }  

      
 return (
<body>
        <div> 
        <label class="label" for="name">Assign User to Project</label>
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
export default AssignUser;