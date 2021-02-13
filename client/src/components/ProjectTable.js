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
import SideAndNavbar from './SideAndNavbar';
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
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
  return { name, description,details};
}

 function ProjectTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { loading, data } = useQuery(FETCH_PROJECTS_QUERY);

  var rows = [];
  if (loading) 
    return <p>Loading...</p>;
  else {
    var length = data.getProjects.length;
    //console.log(data.getProjects);
    for(var i=0;i<length; i++)
    {
      rows[i] = createData(data.getProjects[i].name,data.getProjects[i].description, 'Edit Details')
    }
  }
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function renderElement (value, value2){
    console.log("In render Element", value2);
        //return value;
         if (value2.id === "details")
         {
           return <a href={value}> {value} </a>;
         }
         else {
          return  value;
         }
       // return  <a href={value}> {value} </a>
  }
  return (
    <body>
 <div>
    <SideAndNavbar></SideAndNavbar>
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
                        {renderElement(value, column)}
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


const FETCH_PROJECTS_QUERY = gql `
{
  getProjects{
  name
  description
}
}`;

export default ProjectTable;