import {useContext, useState} from 'react';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SideAndNavbar from '../components/SideAndNavbar';
import { useHistory } from "react-router-dom";
import '../css/ticketsDetailsComponent.css';
import { AuthContext } from '../context/auth';
import jwtDecode from 'jwt-decode';


const useStyles = makeStyles({
  root: {
    width: '600px',
    height: "280px"
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
  main: {
    marginBottom: '0px',
    marginLeft:'20%',
    marginTop:'2%',
    display: 'inline-block'
  }
});

const columns = [
  { id: 'username', label: 'Name', minWidth: 100 },
  { id: 'email', label: 'Description', minWidth: 100 },
  { id: 'role', label: 'Assigned Project', minWidth: 100 }
];

function createData(username, email, role) {
  return { username, email,role};
}

 var counter = 0;

function UserProfile(props) {

var {user, logout} = useContext(AuthContext);
const [ errors, setErrors ] = useState({});
const context = useContext (AuthContext);
const history = useHistory();
const [ role, setRole ] = useState('');
const classes = useStyles();
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);
var rows= [];

  if (user!=null)
  {
    var count = Object.keys(user).length;
    
    if (count == 2)
    {
      user  = jwtDecode (localStorage.getItem('jwtToken'));
      rows[0] = createData(user.username, user.email, user.role);
    }
    else if (count > 2)
    {
        rows[0] = createData(user.username, user.email, user.role); 
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
      <SideAndNavbar/>
      {user  && (
        <div id="main" class="mainTable" className={classes.main}>
          <Paper className={classes.root}>
          <div className={classes.banner}>
          <p className={classes.heading}>Ticket Details</p>
          </div>
          <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell align="right">{rows[0].username}</TableCell>
              <TableCell align="right">{rows[0].email}</TableCell>
            </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell align="right">Access</TableCell>
            <TableCell align="right"></TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell align="right">{rows[0].role}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
            
          </Paper>
        </div>
      )}
      </div>
    </body>
  );
}


export default UserProfile;

