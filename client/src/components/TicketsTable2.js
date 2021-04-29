import React, {useState} from 'react';
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
import { useHistory } from "react-router-dom";
import '../css/projectTable.css';

const useStyles = makeStyles({
  banner:
  {
  backgroundColor: '#262B40',
  height: '5%',
  width:'93%',
  padding: '2%',
  marginLeft:'1%'
  },
  heading:{
    color: 'white'
  },
  root: {
    width: '100%',
    minHeight: '300px'
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: 'name', label: 'Name', minWidth: 60 },
  { id: 'description', label: 'Description', minWidth: 60 },
  { id: 'developer', label: 'Developer', minWidth: 60 },
  { id: 'status', label: 'Status', minWidth: 60 },
  { id: 'created', label: 'Created', minWidth: 60 },
];

function createData(name, description, developer, status, created) {
  return { name, description, developer, status, created };
}


function TicketsTable(props) {

  const [errors, setErrors]= useState({});
  const index = props.index;
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10); 

const {loading:loading1, data:data1} = useQuery (FETCH_TICKETS_QUERY,{
  variables: { id: String(index)}
});

var rows = [];
if (loading1)
    return <p>Loading...</p>;
  else {

    if(data1.getTicketsByProjectId!=null)
    {
      if (data1.getTicketsByProjectId.length > 0)
    {

      if (data1.getTicketsByProjectId[0]!=null)
      {
        for (var i=0;i<data1.getTicketsByProjectId.length;i++)
        {
          rows[i] = createData(data1.getTicketsByProjectId[i].title, data1.getTicketsByProjectId[i].description,
            data1.getTicketsByProjectId[i].description,data1.getTicketsByProjectId[i].status,
            data1.getTicketsByProjectId[i].createdAt);
        }
      }
    }
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
        <div id="main" class="main">
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <div className={classes.banner}>
            <h3 className={classes.heading}>Tickets for the Project</h3>
            </div>
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



const FETCH_TICKETS_QUERY =  gql `
query
  getTicketsByProjectId($id: String!){
    getTicketsByProjectId (id: $id) {
      id
      title
      description
      priority
      status
      type
      createdAt
    }
  }
`;


export default TicketsTable;