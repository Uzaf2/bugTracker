import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useQuery, gql } from '@apollo/client';
import { Collapse } from '@material-ui/core';

import '../css/testUserTable.css';

 function UserTable() {

  return (
    <table class="styled-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Name</th>
            <th>Points</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Dom</td>
            <td>6000</td>
            <td>Dom</td>
            <td>6000</td>
        </tr>
        <tr class="active-row">
            <td>Melissa</td>
            <td>5150</td>
            <td>Melissa</td>
            <td>5150</td>
        </tr>
        <tr>
        <td>Dom</td>
            <td>6000</td>
            <td>Dom</td>
            <td>6000</td>
        </tr>
        <tr class="active-row">
            <td>Melissa</td>
            <td>5150</td>
            <td>Melissa</td>
            <td>5150</td>
        </tr>
    </tbody>
</table>
  );
}


const FETCH_USERS_QUERY = gql `
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

export default UserTable;