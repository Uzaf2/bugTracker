import React, { useState, useEffect } from 'react';
import SideAndNavbar from '../components/SideAndNavbar';
import { useForm } from '../util/hooks';
import { makeStyles } from '@material-ui/core/styles';
import { gql, useMutation, useQuery } from '@apollo/client';
import swal from 'sweetalert';


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    label: {
        fontSize: 12,
        marginLeft: '30%',
        fontFamily: 'sans-serif',
        fontStyle:'italic',
        fontWeight:'600'
    },
    input:{
        width: '40%',
        padding: '12px 20px',
        margin: '8px 0',
        display: 'inline-block',
        borderWidth: '1px',
        borderColor: '#ddd',
        borderRadius: '4px', 
        boxSizing: 'border-box',
        marginLeft: '30%',
        marginRight: '30%'
    },
    submit:{
        width: '40%',
        backgroundColor: '#262B40',
        color: 'white',
        padding: '14px 20px',
        margin: '8px 0',
        display: 'inline-block',
        borderRadius: '4px', 
        marginLeft: '30%',
        marginRight: '30%',
        '&:hover': {
            background: "#047857",
         },
    },
 description: {
    width: '39.5%',
    height: '200px',
    marginLeft: '30%',
    marginRight: '30%'
  },
  title: {
      marginTop: '10%',
      paddingTop: '100px',
      marginLeft: "43%",
      fontSize: 18,
      fontWeight: '800',
      fontFamily: 'sans-serif'
  }
});

function CreateTicket(props) {

    const classes = useStyles();

    const index = props.history.location.state.index;
    const [errors, setErrors]= useState({});
    const {onChange, onSubmit, values}= useForm(createTicket, {
        
        title:'',
        description: '',
        assignedProjectInput: '',
        assignedDeveloperInput: '',
        priority: '',
        type: '',
        status: ''
    });
    
    const { loading:loading1, data} = useQuery(FETCH_TICKETS_QUERY,{
          variables: { id: String(index)}
         });

         const {loading:usersloading, data: users} = useQuery (GET_USERS);
         const {loading:projectsloading, data:projects} = useQuery (GET_PROJECTS);

    const [create, {loading}] = useMutation (CREATE_TICKET,{
        update(proxy,  result){
        const data = proxy.readQuery({ query: FETCH_TICKETS_QUERY,
          variables: { id: String(index)}
         });

          proxy.writeQuery({ query: FETCH_TICKETS_QUERY, data:{getTicketsByProjectId:[result.data.createTicket, ...data.getTicketsByProjectId],},
          variables: { id: String(index)}});
           success();
        },
        onError(err) {
            console.log("Error:::", err.graphQLErrors[0]);

        },
        variables:values
    });

   
    
     useEffect(() => {
    if (users!=null)
    {
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
    }
    }, [users]);

    useEffect(() => {
    if (projects!=null)
    {       
        const length = projects.getProjects.length; 

        var projectsArray = [];
        projectsArray.push("--Please choose an option--");
        for (var i=0;i<projects.getProjects.length; i++)
        {
            
            projectsArray.push(projects.getProjects[i].name);
        }
    
        var select = document.getElementById("assignedProjectInput");   
        
        if (select!= null)
        {
            if (select.length < length)
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
    }
    }, [projects]);

    function success() {
        swal({
            title: "Done!",
            text: "new ticket created",
            icon: "success",
            timer: 2000,
            button: false
          })
    }

    function createTicket () {
        create();
    }
 return (
<body>

        <SideAndNavbar/>
          <form onSubmit={onSubmit} class="inputForm">
            <label className={classes.label}
            for="title">Ticket Title</label>
            <input 
            type="text" 
            id="title" 
            name="title" 
            className={classes.input}
            placeholder="Ticket Title.." 
            autoComplete="title"
            error={errors.title ? true:false}
            value={values.title}
            onChange={onChange}/>
            <label className={classes.label} for="description">Ticket Description</label>
            <textarea 
            className={classes.description} 
            type="text" 
            id="description" 
            name="description" 
            placeholder="Project desc.." required
            error={errors.description}
            value={values.description}
            onChange={onChange}
            />
            <label className={classes.label} for="">Assigned Project</label>
            <select className={classes.input} id="assignedProjectInput" name="assignedProjectInput"
            value={values.assignedProjectInput} onChange={onChange}>
            </select>
            <label className={classes.label} for="assignedDeveloperInput">Assigned Developer</label>
            <select className={classes.input} id="assignedDeveloperInput" name="assignedDeveloperInput"
            value={values.assignedDeveloperInput} onChange={onChange}>
            </select>
            <label className={classes.label} for="priority">Priority</label>
            <select id="priority"
            value={values.priority}
            name="priority"
            className={classes.input}
            onChange={onChange}>
            <option value="">--Please choose an option--</option>
            <option value="Low" >Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            </select>
            <label className={classes.label} for="type">Ticket Type</label>
            <select id="type" name="type"
            value={values.type}
            className={classes.input}
            id="type"
            name="type"
            onChange={onChange}>
            <option value="">--Please choose an option--</option>
            <option value="Bugs/Error">Bugs/Error</option>
            <option value="Feature Requests">Feature Requests</option>
            <option value="Other Comments">Other Comments</option>
            <option value="Training/Document Requests">Training/Document Requests</option>
            </select>
            <label className={classes.label} for="ticketStatus">Ticket Status</label>
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
            <input className={classes.submit} type="submit" value="Create Ticket"/>
          </form>
          <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map(value=>(
                        <li key={value}>{value}</li>
                    ))}
                </ul>
          </div>
   </body>
 )
}

const CREATE_TICKET =  gql `
mutation createTicket($title: String! $description: String! $assignedProjectInput: String!
    $assignedDeveloperInput: String! $priority: String!  $status: String! $type: String!) {
    
    createTicket(title:$title description: $description assignedProjectInput: $assignedProjectInput 
    assignedDeveloperInput: $assignedDeveloperInput priority:$priority status: $status type: $type) {
    
    id
    title
    description
    priority 
    status
    type
    createdAt
    updatedAt
}     
}`;

const GET_USERS = gql`
{
    getUsers {
        id 
        username
        email
        creationTime
        role 
        access
    }
}
`;

const GET_PROJECTS = gql` 
{
    getProjects {
        id 
        name
        description
        users
        tickets 
    }
}  `;

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
export default CreateTicket;