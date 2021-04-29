import React, { useState} from 'react';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from "react-router-dom";

function AssignedPersonnelQuery(props) {
  
  
  var index = props.index - 1;
  const history = useHistory();
  const [markersArray, setMarkersArray] = useState([]);
  const { loading, data } = useQuery(FETCH_PROJECTS_QUERY);
  
  var rows = [];
  if (loading)
    return <p>Loading...</p>;
  else {
    var length = data.getProjects.length;
   var length3 = data.getProjects[index].users.length;
   for (var k = 0; k < length3; k++)
    {
      var myName = (data.getProjects[index].users[k]);
          var myName2 = '"' + myName + '"';  
          JSON.stringify(myName2); 
          markersArray.push({
            name: myName2
          });
    }
  }
}

const FETCH_PROJECTS_QUERY = gql`
{
getProjects{
  name
  description
  id
  users
  tickets
}  
}`;


export default AssignedPersonnelQuery;