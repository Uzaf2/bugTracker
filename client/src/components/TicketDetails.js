import React, {useEffect} from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SideAndNavbar from '../components/SideAndNavbar';
import { gql, useMutation, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { useForm } from '../util/hooks';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from "react-router-dom";
import '../css/ticketsDetailsComponent.css';
import swal from 'sweetalert';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '90%'
  },
  banner:{
  backgroundColor: '#262B40',
  height: '10%',
  width:'93%',
  padding: '1%',
  marginLeft:'1%',
  borderRadius: '5px'
  },
  heading:{
    color: 'white',
    fontSize: '16px'
  },
  subHeading: {
    color: 'white',
    fontSize: '14px'
  },
  link:{
    color: 'black',
     textDecoration: 'underline',
     cursor: 'pointer'
  },
  main: {
    marginBottom: '0px',
    marginLeft:'20%',
    marginTop:'10px',
    display: 'inline-block'
  },displayComments: 
  {
    color: 'black'
  },
  table:{
    height: '80%',
    border: 'none'
  },
  textField1: {
    width: '400px',
    height: '50px'
  },
  textField2: {
    width: '600px',
    height: '50px'
  }
});


const font = "'Merriweather', serif";
function TicketDetails(props) {

const index = props.history.location.state.index;

if (document.getElementById("textAreaOne")!=null)
{
 var textBoxOne = document.getElementById("textAreaOne").value;  
 var textBoxTwo = document.getElementById("textAreaTwo").value;
 var selectOne = document.getElementById("assignedProjectInput").value;  
 var selectTwo = document.getElementById("assignedDeveloperInput").value;
 
}
   
  const [errors, setErrors]= useState({});
  const history = useHistory();
  const classes = useStyles();

  const {loading, data} = useQuery (FETCH_TICKETS_QUERY,{
    variables: { id: String(index)}
    });
  const {loading:loading1, data:users} = useQuery (FETCH_USERS_QUERY);
  const {loading:loading2, data:projects} = useQuery (FETCH_PROJECTS_QUERY);
  const {loading:loading4, data:allTickets} = useQuery (FETCH_ALL_TICKETS_QUERY);  
  const {onChange, onSubmit, values}= useForm(updateTicketFunction, {
        id: String(index),
        title:'',
        description: '',
        assignedProjectInput: '',
        assignedDeveloperInput:'',
        priority: data.getTicketById.priority,
        type: data.getTicketById.type,
        status: data.getTicketById.status
    });
  
  
  useEffect(() => {
  if (data!= null)
  {
        var input1 = document.getElementById("textAreaOne");
         if (input1!=null)
        {
          if (input1.value ==="")
          {
            input1.value =data.getTicketById.title;
            values.title = data.getTicketById.title;
          }
        }
        var input2 = document.getElementById("textAreaTwo");  
        if (input2!=null)
        {
          if (input2.value ==="")
          {
           input2.value =data.getTicketById.description;
           values.description = data.getTicketById.description;
          }
        }
    }
});


const styles = useStyles();

const [updateTicket, {loading:loading3}] = useMutation (UPDATE_TICKET,{
        update(proxy,  result){
         
         const dataOne = proxy.readQuery({ query: FETCH_TICKETS_QUERY,
          variables: { id: String(index)}
         });

        proxy.writeQuery({ query: FETCH_TICKETS_QUERY, data:{getTicketById:[dataOne]},
        variables: { id: String(index)}}
        );

        const data = proxy.readQuery({query: FETCH_ALL_TICKETS_QUERY});
        var outputArray =  data.getTickets;
        var arrayForSort = [...outputArray]
        var newArray = arrayForSort.splice(index);
        newArray.splice(index-1, 0, result.data.updateTicket);
        proxy.writeQuery({ query: FETCH_ALL_TICKETS_QUERY, data:{getTickets:[newArray]}});
        success();
        },
        onError(err) {
            console.log("Error:::", err);
        },
        variables:values 
    });

    /*
      useEffect(() => {
      if (data!= null)
      {
         var input1 = document.getElementById("textAreaOne");
         if (input1!=null)
        {
          if (input1.value ==="")
          {
            input1.value =data.getTicketById.title; 
            values.title = data.getTicketById.title;
          }
        }
         var input2 = document.getElementById("textAreaTwo");  
        if (input2!=null)
        {
          if (input2.value ==="")
          {
           input2.value =data.getTicketById.description; 
           values.description = data.getTicketById.description;
          }
        }
      }
         
    }, [textBoxOne, textBoxTwo]);
    */

      useEffect(() => {
        if (projects!=null)
      {
        const length = projects.getProjects.length; 
        var projectsArray= [];
        projectsArray.push(" --Please choose an option--");
        for (var i=0;i<projects.getProjects.length; i++)
        {
         
           projectsArray.push(projects.getProjects[i].name);

           if(projects.getProjects[i].id === data.getTicketById.assignedProject[0])
           {
             values.assignedProjectInput = projects.getProjects[i].name;
           }
        }
    
        var select = document.getElementById("assignedProjectInput");
       
        if (select != null)
        {
            if (select.length< length)
            {
                for(var i = 0; i < projectsArray.length; i++) {
                var opt = projectsArray[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
                }
            }
        }

        for (var i=0;i<projects.getProjects.length; i++)
        {
        
           if(projects.getProjects[i].id === data.getTicketById.assignedProject[0])
           {
             values.assignedProjectInput = projects.getProjects[i].name;
             select.value = projects.getProjects[i].name;
           }
        }
    }
       
}, [projects]);

useEffect(() => {
   
 if (users!=null)
    {
      console.log("in users", data);
    console.log("in users", users);
     
        const length = users.getUsers.length; 
        var usernames = [];
        usernames.push(" --Please choose an option--");
        for (var i=0;i<users.getUsers.length; i++)
        {
           usernames.push(users.getUsers[i].username); 
        }
        var select = document.getElementById("assignedDeveloperInput");
        if (select != null)
        {
            if (select.length< length)
            {
                for(var i = 0; i < usernames.length; i++) {
                var opt = usernames[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
                }
            }
        }

        for (var i=0;i<users.getUsers.length; i++)
        {
           if(users.getUsers[i].id === data.getTicketById.assignedDeveloper[0])
           {
             values.assignedDeveloperInput = users.getUsers[i].username;
              select.value = users.getUsers[i].username;
           }
        }
    }

    }, [users]);

/*
if (loading) 
       return <p>Loading...</p>;
else {

        var input1 = document.getElementById("textAreaOne");
         if (input1!=null)
        {

          if (input1.value ==="")
          {
            input1.value =data.getTicketById.title;
            values.title = data.getTicketById.title;
          }

        }
     
      var input2 = document.getElementById("textAreaTwo");  
        if (input2!=null)
        {
          if (input2.value ==="")
          {
           input2.value =data.getTicketById.description;
           values.description = data.getTicketById.description;
          }
        }
}
*/
   function updateTicketFunction () {
       updateTicket();
    }

    function success() {
      swal({
          title: "Done!",
          text: "new project created",
          icon: "success",
          timer: 2000,
          button: false
        })
  }
  
function TicketDetailsPage() {
    history.push({
      pathname: '/TicketsTable',
      search: '?update=true',  // query string
      state: {  // location state
        update: true
      },
    }); 
  }

return ( <body>
        <SideAndNavbar/>
      <div>
        <div id="main" class="main" className={classes.main}>
          <Paper className={classes.root}>
          <div className={classes.banner}>
          <p className={classes.heading}>Ticket Details</p>
           <p className={classes.heading}>Change Ticket Properties</p>
          </div>
            <form onSubmit={onSubmit} class="inputForm">
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
              <TableCell align="right"> 
              <textarea  className={classes.textField1} id="textAreaOne"
              type="text" 
              name="title" 
              error={errors.title ? true:false}
              value={values.title}
              onChange={onChange}
              >
             </textarea>
             
             </TableCell>
              <TableCell align="right">
                <textarea className={classes.textField2} id="textAreaTwo"
                type="text"
                name="description"
                error={errors.description ? true: false}
                value={values.description}
                onChange={onChange}
                >
            </textarea>
        </TableCell>
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
              <TableCell align="right">
               <select className={classes.input} id="assignedProjectInput" name="assignedProjectInput"
            value={values.assignedProjectInput} onChange={onChange}>
            </select>   
              </TableCell>
              <TableCell align="right">
              <select className={classes.input} id="assignedDeveloperInput" name="assignedDeveloperInput"
            value={values.assignedDeveloperInput} onChange={onChange}></select>
              </TableCell>
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
              <TableCell align="right">
               <select id="priority"
            value={values.priority}
            name="priority"
            onChange={onChange}
            className={classes.input}>
            <option value="">--Please choose an option--</option>
            <option value="Low" >Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            </select>
              </TableCell>
             <TableCell align="right">
             <select name="status"
             className={classes.input} 
            value={values.status}          
            id="status" name="status"
            onChange={onChange}>
            <option value="">--Please choose an option--</option>
            <option value="open" >Open</option>
            <option value="completed">Completed</option>
            <option value="in progress">In Progress</option>
            </select>
             </TableCell>
            </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell align="right">
               <select id="type" name="type"
            value={values.type}
            className={classes.input}
            onChange={onChange}
            id="type"
            name="type">
            <option value="">--Please choose an option--</option>
            <option value="Bugs/Error">Bugs/Error</option>
            <option value="Feature Requests">Feature Requests</option>
            <option value="Other Comments">Other Comments</option>
            <option value="Training/Document Requests">Training/Document Requests</option>
            </select>
            </TableCell>
            
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">
                 <p className={classes.link} onClick={TicketDetailsPage}>Back To The Tickets List</p>
              </TableCell>
              <TableCell align="right">
                 <Button class="updateTicket" variant="contained" color="primary" type="submit">
             UPDATE TICKET
            </Button> 
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
       
    </TableContainer> 
   
            </form> 
    
          </Paper>
        </div>
      </div>
    </body>
    )
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

const FETCH_ALL_TICKETS_QUERY = gql`
{
  getTickets {
    id
    title
    description
    assignedProject
    assignedDeveloper
    priority
    status
    type
    createdAt
    updatedAt
}
}
    `;

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

const UPDATE_TICKET =  gql `
mutation updateTicket($id: String!, $title: String! $description: String! $assignedProjectInput: String!
    $assignedDeveloperInput: String! $priority: String!  $status: String! $type: String!) {
    
    updateTicket(id:$id ,title:$title description: $description assignedProjectInput: $assignedProjectInput 
    assignedDeveloperInput: $assignedDeveloperInput priority:$priority status: $status type: $type) {
   
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


export default TicketDetails;