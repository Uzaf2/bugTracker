import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useHistory } from "react-router-dom";
import '../css/assignedpersonnel.css';
import Spinner from 'react-spinner-material';

const useStyles = makeStyles({
  banner:
  {
  backgroundColor: '#262B40',
  height: '90px',
  width:'93%',
  padding: '1%',
  borderRadius: '5px',
  marginLeft:'1%'
  },
  heading:{
    color: 'white',
    fontSize: '16px'
  },
  subHeading:{
    color: 'white',
    fontSize: '14px'
  },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  displayComments: 
    {
      color: 'black'
    },
    spinner:{
      marginLeft: '50%',
      marginTop: '20%'
    },
});

const columns = [
  { id: 'username', label: 'Username', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  //{ id: 'creationTime', label: 'Created', minWidth: 100 },
  { id: 'role', label: 'Role', minWidth: 100 },
  //{ id: 'access', label: 'Access', minWidth: 100 }
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
 
 const {loading, data} = useQuery (FETCH_PROJECT_ASSIGNED_PERSONNEL_QUERY,{
  variables: { name: String(props.index)}
 });

  var rows = [];
  if (loading)
  return (
    <div className={classes.spinner}>
     <Spinner  radius={60} color={"#4B0082"} stroke={5} visible={true} />
     </div>);
   
  else {
   
    var length = data.getProjectsAndUsers.length;
   for (var k = 0; k < length; k++)
    {
          var name = (data.getProjectsAndUsers[k].username);
          var email = (data.getProjectsAndUsers[k].email);
          var role = (data.getProjectsAndUsers[k].role);

          JSON.stringify(name); 
          JSON.stringify(email); 
          JSON.stringify(role); 

          rows.push({
            username: name,
            email: email,
            role: role,
          });
    }
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
        <div>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
            <div className={classes.banner}>
          <p className={classes.heading}>Assigned Personnel</p>
          <p className={classes.subHeading}>Users assigned to this Project</p>
          </div>
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


export default AssignedDeveloper;