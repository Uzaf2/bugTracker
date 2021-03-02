import React, {useCallback, useState} from 'react';
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
import { useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles({
  root: {
    width: '500px',
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: 'username', label: 'Username', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'creationTime', label: 'Created', minWidth: 100 },
  { id: 'role', label: 'Role', minWidth: 100 },
  { id: 'access', label: 'Access', minWidth: 100 }
];

function createData(username, email, creationTime, role, access) {
  return { username, email, creationTime, role, access};
}

function AssignedDeveloper(props) {

  //console.log("props", props.index);
  var index = props.index - 1;
  const history = useHistory();
  const classes = useStyles();
  const [ page, setPage ] = React.useState(0);
  let markers = [];
  const [ users, setUsers ] = useState();
  const [ userId, setUserId ] = useState();
  const [ projectId, setProjectId ] = useState();
  const [ rowsPerPage, setRowsPerPage ] = React.useState(10);
  const { loading, data } = useQuery(FETCH_PROJECTS_QUERY);

  const [ errors, setErrors ] = useState({});
  /*
  const [login, {loading1} ] = useMutation(GET_USERID, {
    update(_,{data}){
        //console.log("In the update function of the login page");
        //console.log("Data from login",data);
        //props.history.push('/ManageUserRoles');
    }, 
    onError(err){
        setErrors(err.graphQLErrors[0].extensions.exception.errors)
    }, variables : values
});
*/
/*
const [assignUser,{loading1} ] = useMutation(GET_USER_MULTIPLE, {
  update(_,{data}){
    console.log("Mutation done")
    //success();
  }, 
  onError(err){
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
  }, //variables: { userId, projectId }
});
*/

//console.log("Users function :",data.getProjects[index].users);


  var rows = [];
  if (loading)
    return <p>Loading...</p>;
  else {
    var length = data.getProjects.length;
   // console.log("Index", index);
   // console.log(data.getProjects[index].users.length)

   
   
   var length3 = data.getProjects[index].users.length;
   for (var k = 0; k < length3; k++)
    {
      var myName = (data.getProjects[index].users[k]);
          console.log("Length", length3);
          var myName2 = '"' + myName + '"';     // "John"abc"
          JSON.stringify(myName2); 
          markers.push({
            name: myName2
          });
    }
  
 //var length2 = data.getProjects[i].users.length;
 //console.log("Length 2", length2);
    //usersFunction(data.getProjects[index].users);
    for (var i = 0; i < length; i++) {

     
      //console.log("Data in the assigned personnel",data.getProjects[i]);
        var length2 = data.getProjects[i].users.length;
        for(var j = 0; j < length2; j++)
        {

          
           /* rows[i] = createData(data.getProjects[i].users[j].username, data.getProjects[i].users[j].email
                ,data.getProjects[i].users[j].creationTime, data.getProjects[i].users[j].role,
                data.getProjects[i].users[j].access);
           */ 
           /* rows[i] = createData(data.getProjects[i].users[j], data.getProjects[i].users[j]
                ,data.getProjects[i].users[j], data.getProjects[i].users[j],
                data.getProjects[i].users[j]);
           */
        }
        
    }
    console.log("Markers", markers);
    //usersFunction();
  }

  function usersFunction()
  {
    console.log("In users function");
    setUsers();
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
  users
  tickets
}  
}`;

const GET_USERID =  gql `
query 
   getUser($userId:String!)
{
  getUser(userId:$userId)
  {
  username
  id
  email
  creationTime
  role
  access
  }
}`;


const GET_USER_MULTIPLE =  gql `
query 
getUserMultiple($userId:String!)
{
  getUserMultiple(userId:$userId)
  {
  username
  id
  email
  creationTime
  role
  access
  }
}


`;

export default AssignedDeveloper;