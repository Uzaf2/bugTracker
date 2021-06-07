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
import { gql, useMutation, useQuery } from '@apollo/client';
import SideAndNavbar from './SideAndNavbar';
import { useHistory } from "react-router-dom";
import '../css/ticketsDetailsComponent.css';
import Spinner from 'react-spinner-material';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '90%'
  },
  banner:{
  backgroundColor: '#262B40',
  height: '10%',
  width:'93%',
  padding: '2%',
  marginLeft:'1%',
  borderRadius: '5px'
  },
  heading:{
    color: 'white',
    fontSize: '16px'
  },
  link:{
    color: 'white',
     textDecoration: 'underline',
     cursor: 'pointer',
     fontSize: '14px'
  },
  main: {
    marginBottom: '0px',
    marginLeft:'0%',
    marginTop:'0px'
  },displayComments: 
  {
    color: 'black'
  },
  table:{
    height: '100%',
    width: '100%'
  },
  spinner: {
    marginLeft: '30%',
    marginTop: '30%'
  }
});

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 100 },
  { id: 'assignedProject', label: 'Assigned Project', minWidth: 100 },
  { id: 'assignedDeveloper', label: 'Assigned Developer', minWidth: 100 },
  { id: 'priority', label: 'Priority', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'type', label: 'type', minWidth: 100 },
  { id: 'created', label: 'Creation Time and Date', minWidth: 100 },
  { id: 'updatedAt', label: 'Updated Time', minWidth: 100 },
];

function createData(name, description, assignedProject, assignedDeveloper, priority, status, type, created, updatedAt) {
  return { name, description,assignedProject, assignedDeveloper, priority, status, type, created, updatedAt };
}

 var counter = 0;

function TicketDetailsComponent(props) {

  var assignedProject = 0;
  var assignedDeveloper = 0;
  var assignedProjectName = "";
  var assignedDeveloperName = "";
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  var index = props.index.history.location.state.index;
  var array = props.index.history.location.state.array;
 
  const {loading, data} = useQuery (FETCH_TICKETS_QUERY,{
    variables: { id: String(index)}
    });

const {loading:loading1, data:data1} = useQuery (FETCH_USERS_QUERY);
const {loading:loading2, data:data2} = useQuery (FETCH_PROJECTS_QUERY);

    var rows= [];

    if (loading)
    return (<div className={classes.spinner}>
      <Spinner  radius={60} color={"#4B0082"} stroke={5} visible={true} />
      </div>);
    else {

      var time = data.getTicketById.createdAt.split('T')[1];
      var date = data.getTicketById.createdAt.substring(0, data.getTicketById.createdAt.indexOf("T"));
       
      time = time.slice(0, -5); 
      var dateTime = date+ "\t\t"+time;
      
      assignedProject = data.getTicketById.assignedProject;
      assignedDeveloper = data.getTicketById.assignedDeveloper;

      if (data1!=null)
      {
        for (var i=0;i< data1.getUsers.length;i++)
        {
          if (data1.getUsers[i].id === assignedDeveloper[0])
          {
            assignedDeveloperName = data1.getUsers[i].username;
           
          }
        }
      }
      if (data2!=null)
      {
        for (var i=0;i< data2.getProjects.length;i++)
        {
          if (data2.getProjects[i].id === assignedProject[0])
          {
            assignedProjectName = data2.getProjects[i].name;
          }
        }
      }

      rows[0] = createData(data.getTicketById.title, data.getTicketById.description, assignedProjectName, assignedDeveloperName
      ,data.getTicketById.priority,data.getTicketById.status, data.getTicketById.type , dateTime, data.getTicketById.updatedAt);
    } 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

function EditTicket() {
    history.push({
      pathname: '/TicketDetails',
      search: '?update=true',  // query string
      state: {  // location state
        update: true, 
        index:index
      },
    }); 
  }

  return (
    <body>
      <div>
        <div id="main" class="main" className={classes.main}>
          <Paper className={classes.root}>
          <div className={classes.banner}>
          <p className={classes.heading}>Ticket Details </p>
           <p className={classes.link} onClick={EditTicket} >Edit Tickets</p>
         
          </div>
          <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Ticket Title</TableCell>
            <TableCell align="right">Ticket Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell align="right">{rows[0].name}</TableCell>
              <TableCell align="right">{rows[0].description}</TableCell>
            </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell align="right">Assigned Project</TableCell>
            <TableCell align="right">Assigned Developer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell align="right">{rows[0].assignedProject}</TableCell>
              <TableCell align="right">{rows[0].assignedDeveloper}</TableCell>
            </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell align="right">Priority</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell align="right">{rows[0].priority}</TableCell>
              <TableCell align="right">{rows[0].status}</TableCell>
            </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Creation Time (Day and Time)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell align="right">{rows[0].type}</TableCell>
              <TableCell align="right">{rows[0].created}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
            
          </Paper>
        </div>
      </div>
    </body>
  );
}

const FETCH_TICKETS_QUERY = gql`
query
    getTicketById($id: String!){
    getTicketById (id: $id) {
    assignedProject
    assignedDeveloper
    title
    description
    priority
    status
    type
    createdAt
    updatedAt
   }
}`;

const FETCH_USERS_QUERY = gql `
{
  getUsers {
    id
    username
    email
    creationTime
    role
    access
}
}`;

const FETCH_PROJECTS_QUERY = gql `
{
  getProjects {
    id
    name
    description
    users
    tickets
}
}`;

export default TicketDetailsComponent;

