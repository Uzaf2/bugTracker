import React from 'react';
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'

function Users () {
    const { loading, data: { getUsers:users } } = useQuery(FETCH_USERS_QUERY);
    return (
       <div>
       </div>
        );
}

const FETCH_USERS_QUERY = gql `
{
  getUsers{
  id
  creationTime
  username
  role
  access
}
}

`;

export default Users;
