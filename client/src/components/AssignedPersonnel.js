import React, {useCallback, useState} from 'react';
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
import SideAndNavbar from './SideAndNavbar';
import { useHistory } from "react-router-dom";
import '../css/projectTable.css';
import { useMutation } from '@apollo/react-hooks';
import query from'./AssignedPersonnelQuery.js';

const useStyles = makeStyles({
  root: {
    width: '500px',
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: 'username', label: 'Username', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'creationTime', label: 'Created', minWidth: 100 },
  { id: 'role', label: 'Role', minWidth: 100 },
  { id: 'access', label: 'Access', minWidth: 100 }
];

function createData(username, email, creationTime, role, access) {
  return { username, email, creationTime, role, access};
}

function AssignedDeveloper(props) {

  var indexVal = ""+props.index -1+"";
  var index = props.index -1; 
  const history = useHistory();
  const classes = useStyles();
  const [ page, setPage ] = React.useState(0);

  const [ markersArray, setMarkersArray] = useState([]);
  const [ rowsPerPage, setRowsPerPage ] = React.useState(10);
  const [ errors, setErrors ] = useState({});
 
 const {loading, data} = useQuery (FETCH_PROJECTS_QUERY,{
  variables: { name: "1"}
});

  var rows = [];
  console.log("Error", errors)
  if (loading)
    return <p>Loading...</p>;
  else {
   
    console.log("Data",data.getProjectsAndUsers);
    console.log("Length",data.getProjectsAndUsers.length);
  
    var length = data.getProjectsAndUsers.length;
    //var length3 = data.getProjectsAndUsers[index].users.length;
   for (var k = 0; k < length; k++)
    {
          console.log("in loop",data.getProjectsAndUsers[k]);
          var name = (data.getProjectsAndUsers[k].username);

          var email = (data.getProjectsAndUsers[k].email);

          var creationTime = (data.getProjectsAndUsers[k].creationTime);

          var role = (data.getProjectsAndUsers[k].role);


          var access = (data.getProjectsAndUsers[k].access);

          JSON.stringify(name); 
          JSON.stringify(email); 
          JSON.stringify(creationTime); 
          JSON.stringify(role); 
          JSON.stringify(access); 

          rows.push({
            username: name,
            email: email,
            creationTime: creationTime,
            role: role,
            access: access
          });
    }
    console.log("MarkersArray", rows);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <body>
      <div>
        <div id="main" class="main">
         
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
            <p>AssignedPersonnel</p>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                                {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </body>
  );
}

const FETCH_PROJECTS_QUERY = gql`
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


export default AssignedDeveloper;