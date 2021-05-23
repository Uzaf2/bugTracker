import React, {useCallback} from 'react';
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
import Button from '@material-ui/core/Button';
import {useContext} from 'react';
import { AuthContext } from '../context/auth';
import jwtDecode from 'jwt-decode';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '15px'
  },
  banner:{
    backgroundColor: '#262B40',
    height: '15%',
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
  main:{
    display: 'inline-block',
    textAlign:'left',
    marginLeft:'20%'
  },
  btn1: {
    marginTop: '20px'
  }
});

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 100 },
  {
    id: 'details',
    label: 'Details',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(name, description, details) {
  return { name, description, details };
}

function ProjectTable() {
  var {user, logout} = useContext(AuthContext);

  if (user!=null)
  {
    var count = Object.keys(user).length;

    if (count == 2)
    {
      user  = jwtDecode (localStorage.getItem('jwtToken'));
    }
    else if (count > 2)
    {
      
    }
  }

  var i;
  var valueNumber = 0;
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { loading, data } = useQuery(FETCH_PROJECTS_QUERY);
  var rows = [];
  if (loading)
    return <p>Loading...</p>;
  else {
    var length = data.getProjects.length;
    for (var i = 0; i < length; i++) {
      rows[i] = createData(data.getProjects[i].name, data.getProjects[i].description, 'Edit Details')
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function HandleOnClick(props, rowsArray) {
   
    history.push({
      pathname: '/ProjectDetails',
      search: '?update=true',  // query string
      state: {  // location state
        index: props, 
        array: rowsArray
      },
    }); 

  }

  function AssignUser() {
    //history.push('/AssignUser');
    history.push({
      pathname: '/AssignUser',
      search: '?update=true',  // query string
      state: {  // location state
        update: true, 
      },
    }); 
  }

  function CreateTicket() {
    history.push('/CreateTicket');
  }

  function CreateProject() {
    history.push('/CreateProject');
  }

  function RenderElement(value, value2, value3) {
    if (value2.id === "details") {
      return <a  onClick={() => HandleOnClick(value3, rows)} className="link"> {value} </a>;
    }
    else {
      return value;
    }
  }
  return (
    <body>
      <div>
        <SideAndNavbar></SideAndNavbar>
     
        <div id="main" className="main" className={classes.main}>

          <div>
          {user && user.role === 'Demo Admin' && (
        <Button variant="contained" color="primary" onClick={CreateProject} className={classes.btn1}>Create Project</Button>
          )}

         {user && user.role === 'Demo Manager' && (
        <Button variant="contained" color="primary" onClick={CreateProject} className={classes.btn1}>Create Project</Button>
          )}
         </div>
          <Paper className={classes.root}>
          <div className={classes.banner}>
          <h3 className={classes.heading}>Your Projects</h3>
          <p className={classes.heading}>All the Projects you have in the database</p>
          </div>
         
            <TableContainer className={classes.container}>
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
                    valueNumber++;
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {RenderElement(value, column, valueNumber)}
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
{
  getProjects{
  name
  description
  id
}
}`;



export default ProjectTable;