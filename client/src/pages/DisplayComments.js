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
import Spinner from 'react-spinner-material';

const useStyles = makeStyles({
    root: {
    width: '55s0px',
    marginLeft: '0%',
    height: "100%",
    marginTop: '10%',
    marginLeft:'2%'
    },
    banner:{
      backgroundColor: '#262B40',
      height: '4%',
      width:'93%',
      padding: '1%',
      marginLeft:'1%',
      borderRadius: '5px'
      },
      heading:{
        color: 'white',
        fontSize: '16px'
      },
      paragraph: {
        color: 'white'
      },
    container: {
      maxHeight: 440,
    },
    displayComments: 
    {
      color: 'black'
    },
    spinner: {
      marginLeft: '30%',
      marginTop: '10%'
    }
  });

  const columns = [
   
    {
      id: 'message',
      label: 'Message',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'commenter', label: 'Commenter', minWidth: 170 },
    { id: 'createdAt', label: 'Created At', minWidth: 100 },
  ];
  
  function createData(message, createdAt, commenter) {
    return { message, createdAt, commenter};
  }


function DisplayComments(props) {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  var idValue = props.index.history.location.state.index;

  const { loading, data} = useQuery(DISPLAY_COMMENTS,{
        variables: { id: String(idValue)}
       });

       var rows =[];
    
  if (loading) 
  return (<div className={classes.spinner}>
    <Spinner  radius={60} color={"#4B0082"} stroke={5} visible={true} />
    </div>);
  else {

    var length = data.getCommentsByTicketId.length
    if (length > 0)
    {

      var length = data.getCommentsByTicketId.length;
    for(var i=0;i<length; i++)
    {
      console.log("Data", data);
      var time = data.getCommentsByTicketId[i].createdAt.split('T')[1];

      var date = data.getCommentsByTicketId[i].createdAt.substring(0, data.getCommentsByTicketId[i].createdAt.indexOf("T"));
      time = time.slice(0, -5); 
      var dateTime = date+ "\t\t"+time;

      rows[i] = createData(data.getCommentsByTicketId[i].message,dateTime, data.getCommentsByTicketId[i].commenter)
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
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
      <div className={classes.banner}>
          <p className={classes.heading}>Comments</p>
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

const DISPLAY_COMMENTS =  gql `
query 
    getCommentsByTicketId($id: String! ){
    getCommentsByTicketId(id:$id) {
        id
        message
        createdAt
        commenter
     }
  } `;
  



export default DisplayComments;