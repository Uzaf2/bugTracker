import React, { useState } from 'react';
import gql from 'graphql-tag';
import SideAndNavbar from '../components/SideAndNavbar';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';
import { makeStyles } from '@material-ui/core/styles';
import { FETCH_PROJECTS_QUERY, FETCH_USERS_QUERY } from '../util/graphql';
import '../css/createProject.css';

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
        borderWidth: '4px',
        borderRadius: '4px', 
        marginLeft: '30%',
        marginRight: '30%',
        '&:hover': {
            background: " #F5A623",
         },
    },
 description: {
    width: '620px',
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

function CreateProject(props) {

    const classes = useStyles();
    const [errors, setErrors] = useState([]);
    const {onChange, onSubmit, values} = useForm(createProject, {
        name:'',
        description: ''
    });
    
    const { loading:loading1, data:data1 } = useQuery(FETCH_PROJECTS_QUERY);

    const [create, {loading}] = useMutation (CREATE_PROJECT,{
        update(proxy, result){
        
        const data = proxy.readQuery({ query: FETCH_PROJECTS_QUERY });
    
        proxy.writeQuery({ query: FETCH_PROJECTS_QUERY, data:{getProjects:[result.data.createProject, ...data.getProjects],},});
        success();
        },
        onError(err) {
            console.log("Create Project Error",err.graphQLErrors[0].message);
            setErrors(err.graphQLErrors[0].message);
            console.log("Errors: ",errors);
        },
        variables:values,
       
    });
    
    function createProject () {
        create();
    }

    function success() {
        alert("New Ticket Created");
    }

 return (
<body>
        <SideAndNavbar/>
          <form onSubmit={onSubmit} class="inputForm">
            <label for="name"
            className={classes.label}>Project Name</label>
            <input 
            type="text" 
            id="name" 
            name="name" 
            className={classes.input}
            placeholder="Project name.." 
            autoComplete="name"
            error={errors.name ? true:false}
            value={values.name}
            onChange={onChange}/>
            <label for="description" className={classes.label}>Project Description</label>
            <textarea 
            className={classes.description} 
            type="text" 
            id="description" 
            name="description" 
            placeholder="Project desc.." required
            error={errors.description  ? true:false}
            value={values.description}
            onChange={onChange}></textarea>
            <input class="submitBtn"  className={classes.submit} type="submit" value="Create Project" />
          </form>
          <div class="ui-error-message">
               <p>{errors}</p>
          </div>
   </body>
 )
}

const CREATE_PROJECT =  gql `
mutation createProject($name: String! $description: String!) {
    createProject(name:$name description: $description) {
        name description id
    }     
}`;

export default CreateProject;