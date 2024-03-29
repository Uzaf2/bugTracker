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
import '../css/ticketsTable.css';
import Spinner from 'react-spinner-material';

const useStyles = makeStyles({
  root: {
    width: '1000px',
    marginLeft: '5.5%',
    marginTop:'5%'
  },
  banner:{
  backgroundColor: '#262B40',
  height: '15%',
  width:'93%',
  padding: '1%',
  marginLeft:'1%',
  borderRadius:'5px'
  },
  
  heading:{
    color: 'white',
    fontSize: '16px'
  },
  subHeading:{
    color: 'white',
    fontSize: '14px'
  },
  container: {
    maxHeight: 440,
  },
  main:{
    display: 'inline-block',
    textAlign:'left',
    marginLeft:'20%'
  },
  spinner:{
    marginLeft: '50%',
    marginTop: '20%'
  }
});

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 100 },
  { id: 'priority', label: 'Priority', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'created', label: 'Creation Time and Date', minWidth: 100 },
  { id: 'editDetails', label: 'Edit Ticket', minWidth: 100 },
];

function createData(name, description, priority, status, created, editDetails) {
  return { name, description, priority, status, created, editDetails };
}

function TicketsTable() {

  var valueNumber = 0;
  const history = useHistory();
  const classes = useStyles();
  var ticketsArray = [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { loading, data } = useQuery(FETCH_ALL_TICKETS_QUERY);

  var rows = [];
  if (loading)
  {
  return (
 <div className={classes.spinner}>
  <Spinner  radius={120} color={"#4B0082"} stroke={5} visible={true} />
  </div>);
  }

  else {
    var length = data.getTickets.length;
    ticketsArray = data;
    
    for (var i = 0; i < length; i++) {
     var time = data.getTickets[i].createdAt.split('T')[1];
     var date = data.getTickets[i].createdAt.substring(0, data.getTickets[i].createdAt.indexOf("T"));
     time = time.slice(0, -5); 
     var dateTime = date+ "\t\t"+time;
    rows[i] = createData(data.getTickets[i].title, data.getTickets[i].description 
    ,data.getTickets[i].priority, data.getTickets[i].status, dateTime, 'Edit Details');
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
      pathname: '/TicketDetailsPage',
      search: '?update=true',  // query string
      state: {  // location state
        index: props, 
        array: rowsArray
      },
    }); 

  }

  function RenderElement(value, value2, value3) {
    if (value2.id === "editDetails") {
      return <a  onClick={() => HandleOnClick(value3, ticketsArray)} className="link"> {value} </a>;
    }
    else {
      return value;
    }
  }

  return (
    <body>
      <div>
        <SideAndNavbar></SideAndNavbar>
        <div id="main" class="main" className={classes.main}>
          <Paper className={classes.root}>
          <div className={classes.banner}>
          <h3 className={classes.heading}>Tickets Table</h3>
          <p className={classes.subHeading}>All the tickets you have in the database</p>
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

const FETCH_ALL_TICKETS_QUERY = gql`
{
  getTickets{
    id
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

export default TicketsTable;
