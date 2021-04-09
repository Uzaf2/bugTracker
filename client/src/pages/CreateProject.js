import React, { useState } from 'react';
import '../css/createProject.css';
import '../css/main.css';
import gql from 'graphql-tag';
import SideAndNavbar from '../components/SideAndNavbar';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';

function CreateProject(props) {

    const [errors, setErrors]= useState({});
    const {onChange, onSubmit, values}= useForm(createProject, {
        name:'',
        description: ''
    });
    
    const [create, {loading}] = useMutation (CREATE_PROJECT,{
        update(_,  {data}){
            //console.log("In the update function of the create Project page");
            console.log("Data from login",data);
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables:values
    });
    
    function createProject () {
        create();
    }

 return (
<body>

        <SideAndNavbar/>
          <form onSubmit={onSubmit} class="inputForm">
            <label for="name">Project Name</label>
            <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Project name.." 
            autoComplete="name"
            error={errors.name ? true:false}
            value={values.name}
            onChange={onChange}/>
            <label for="description">Project Description</label>
            <textarea 
            className="description" 
            type="text" 
            id="description" 
            name="description" 
            placeholder="Project desc.." required
            error={errors.description}
            value={values.description}
            onChange={onChange}></textarea>
            <input type="submit" value="Create Project" />
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

const CREATE_PROJECT =  gql `
mutation createProject($name: String! $description: String!) {
    createProject(name:$name description: $description) {
        name description
    }     
}`;

export default CreateProject;