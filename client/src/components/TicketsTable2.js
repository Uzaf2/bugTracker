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

const useStyles = makeStyles({
  root: {
    width: '500px',
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 100 },
  { id: 'developer', label: 'Developer', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'created', label: 'Created', minWidth: 100 },
];

function createData(name, description, developer, status, created) {
  return { name, description, developer, status, created };
}

function TicketsTable() {

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
        
      /*var length2 = data.getProjects[i].tickets.length;
        for(var j = 0; j < length2; j++)
        {
            rows[i] = createData(data.getProjects[i].tickets[j].title, data.getProjects[i].tickets[j].description
                ,data.getProjects[i].tickets[j].assignedDeveloper, data.getProjects[i].tickets[j].status,
                data.getProjects[i].tickets[j].createdAt);
        }
        */
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
{
getProjects{
  name
  description
  id
}  
}`;

export default TicketsTable;