import React, { useState } from 'react';
import '../css/createProject.css';
import '../css/main.css';
import gql from 'graphql-tag';
import SideAndNavbar from '../components/SideAndNavbar';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';

function CreateTicket(props) {

    const [errors, setErrors]= useState({});
    const {onChange, onSubmit, values}= useForm(createProject, {
        name:'',
        description: ''
    });
    
    const [create, {loading}] = useMutation (CREATE_PROJECT,{
        update(_,  {data}){
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
            <label for="name">Ticket Title</label>
            <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Ticket Title.." 
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
            <label for="name">Assigned Developer</label>
            <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Assigned Developer.." 
            autoComplete="name"
            error={errors.name ? true:false}
            value={values.name}
            onChange={onChange}/>
            <label for="name">Submitter</label>
            <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Submitter.." 
            autoComplete="name"
            error={errors.name ? true:false}
            value={values.name}
            onChange={onChange}/>
            <label for="name">Priority</label>
            <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Priority.." 
            autoComplete="name"
            error={errors.name ? true:false}
            value={values.name}
            onChange={onChange}/>
            <label for="name">Status</label>
            <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Status.." 
            autoComplete="name"
            error={errors.name ? true:false}
            value={values.name}
            onChange={onChange}/>
            <label for="name">Type</label>
            <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Type..." 
            autoComplete="name"
            error={errors.name ? true:false}
            value={values.name}
            onChange={onChange}/>
            <label for="name">CreatedAt</label>
            <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Creation Time.." 
            autoComplete="name"
            error={errors.name ? true:false}
            value={values.name}
            onChange={onChange}/>
            <label for="name">Updated Time</label>
            <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Updated Time.." 
            autoComplete="name"
            error={errors.name ? true:false}
            value={values.name}
            onChange={onChange}/>
            
            <input type="submit" value="Create Ticket" />
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

export default CreateTicket;