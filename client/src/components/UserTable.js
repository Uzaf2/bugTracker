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

const useStyles = makeStyles({
  root: {
    width: '100%',

  },
  banner:{
    backgroundColor: '#262B40',
    height: '5%',
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
});

const columns = [
  { id: 'username', label: 'Username', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  {
    id: 'role',
    label: 'Role',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },

];

function createData(username, email, role) {
  return { username, email, role };
}

 function UserTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { loading, data } = useQuery(FETCH_USERS_QUERY);

  var rows = [];
  if (loading) 
    return <p>Loading...</p>;
  else {
    var length = data.getUsers.length;
    for(var i=0;i<length; i++)
    {
      rows[i] = createData(data.getUsers[i].username,data.getUsers[i].email, data.getUsers[i].role)
    }
  }

 //const rows = [createData('India', 'IN', 1324171354)  ];
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
      <div className={classes.banner}>
          <h3 className={classes.heading}>Users</h3>
          <p className={classes.heading}>Users and their roles</p>
          </div>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={classes.header}>
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
                        {column.format && typeof value === 'number' ? column.format(value) : value}
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
  );
}


const FETCH_USERS_QUERY = gql `
{
  getUsers{
  username
  id
  email
  creationTime
  role
  access
}
}`;

export default UserTable;