import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});


function UserList() {
    const classes = useStyles();
    const { loading, data } = useQuery(FETCH_USERS_QUERY);
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
    return (
        <div>
         <select>
         {rows.map(time => {
           return (
             <option value={time}> {time} </option>
           )
         })}
    </select>
        </div>
    );
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

export default UserList;