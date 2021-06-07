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
import { gql, useMutation, useQuery } from '@apollo/client';
import SideAndNavbar from './SideAndNavbar';
import { useHistory } from "react-router-dom";
import '../css/projectTable.css';
import Spinner from 'react-spinner-material';

const useStyles = makeStyles({
  banner:
  {
  backgroundColor: '#262B40',
  height: '50px',
  width:'93%',
  padding: '2%',
  marginLeft:'1%',
  fontSize: '12',
  borderRadius: '5px'
  },
  heading:{
    color: 'white',
    fontSize: '16px'
  },
  root: {
    width: '100%',
    height: '80%'
  },
  container: {
    maxHeight: 440,
  },
  spinner:{
    marginLeft: '30%',
    marginTop: '5%'
  },
});

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 100 },
];

function createData(name, description) {
  return { name, description };
}

function ProjectTable2(props) {

  const history = useHistory();
  const classes = useStyles();
  const index = props.index-1;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { loading, data } = useQuery(FETCH_PROJECTS_QUERY);

  var rows = [];
  if (loading)
      return (
     <div className={classes.spinner}>
      <Spinner  radius={60} color={"#4B0082"} stroke={5} visible={true} />
      </div>);
  else {
      rows[index] = createData(data.getProjects[index].name, data.getProjects[index].description)
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
          <p className={classes.heading}>Project Details</p>
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


const FETCH_PROJECTS_QUERY = gql`
{
  getProjects{
  name
  description
}
}`;





export default ProjectTable2;