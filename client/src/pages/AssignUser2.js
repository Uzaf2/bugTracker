import React, { useState } from 'react';
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
});

function AssignUser2(props) {

    const history = useHistory();
    const classes = useStyles();
    const [formError,setFormError] = useState(false);
    const [userId, setUserId] = useState("");
    const [projectId, setProjectId] = useState("");
    const index = props.index - 1;
    const { loading, data } = useQuery(FETCH_USERS_QUERY);
    const projectsQuery = useQuery(FETCH_PROJECTS_QUERY);

    const [ errors, setErrors ] = useState({});

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

  function AssignUser()
  {
    assignUser();
  }

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

    AssignUser();
  }  

      
 return (
<body>
        <div>
        <label for="name">Assign Users to Projects</label>
         <select id="selectValue"  onChange={handleOnClick} >
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
export default AssignUser2;