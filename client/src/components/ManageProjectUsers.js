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
import { gql, useQuery } from '@apollo/client';
import SideAndNavbar from './SideAndNavbar';
import { useHistory } from "react-router-dom";
import '../css/manageProjectUsers.css';
import Spinner from 'react-spinner-material';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '15px'
  },
  banner:{
    backgroundColor: '#262B40',
    height: '10%',
    width:'93%',
    padding: '1%',
    marginLeft:'1%',
    borderRadius: '5px'
    },
    heading:{
      color: 'white',
      fontSize: '16px'
    },
    subHeading: {
      fontSize: '14px',
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
  },
  spinner: {
    marginLeft: '50%',
    marginTop: '25%'
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

function ManageProjectUsers() {

  var i;
  var valueNumber = 0;
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { loading, data } = useQuery(FETCH_PROJECTS_QUERY);
  var rows = [];
  if (loading)
    return (<div className={classes.spinner}>
    <Spinner  radius={60} color={"#4B0082"} stroke={5} visible={true} />
    </div>); 
  else {
    var length = data.getProjects.length;
    for (var i = 0; i < length; i++) {
      rows[i] = createData(data.getProjects[i].name, data.getProjects[i].description, 'Manage Users')
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
      pathname: '/ProjectUserAssign',
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

  function RenderElement(value, value2, value3) {
    var one = "CreateProject";
    
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
          <Paper className={classes.root}>
          <div className={classes.banner}>
          <h3 className={classes.heading}>Your Projects</h3>
          <p className={classes.heading}>Manage the users for your Projects</p>
          </div>
         
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}>
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



export default ManageProjectUsers;