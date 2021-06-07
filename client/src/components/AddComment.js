import React, { useState, useEffect }  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { useForm } from '../util/hooks';
import { gql, useMutation, useQuery } from '@apollo/client';
import swal from 'sweetalert';
import '../css/addComment.css';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '40ch',
    },
    btn1: {
        marginTop: '20px',
        marginRight: '100px'
      },
      input:{
        width: "500px",
        marginLeft: "30px"
      },
      comment: {
        padding: '10px',
        marginLeft: '20px'
      },
      submit: {
        marginLeft: "30px"
      }
  }));



function AddComment(props) {

  var index = props.index.history.location.state.index;
  var array = props.index.history.location.state.array;

  var id = array.getTickets[index-1].id;
  const [ticketId, setTicketId] = useState("");
  const [messageValue, setMessage ]= useState("");
  const [ errors, setErrors ] = useState({});

  useEffect(() => {
    create();
  }, [messageValue, ticketId]);

  const classes = useStyles();
  const {onChange, onSubmit, values}= useForm(createProject, {
      
      message:''
  });

  const [create, {loading}] = useMutation (CREATE_COMMENT,{
    update(proxy,  result){  
      const data = proxy.readQuery({ query: DISPLAY_COMMENTS,
        variables: { id: String(index)}
       });
      
      proxy.writeQuery({ query: DISPLAY_COMMENTS, 
      data:{getCommentsByTicketId:[result.data.createComment, ...data.getCommentsByTicketId],},
      variables: { id: String(index)}});
       success();
    },
    onError(err) {
        console.log("Error", err);
    },
    variables: { message: String(messageValue), id: String(ticketId) }
});
  
    function success() {
      swal({
        title: "Done!",
        text: "New Comment Added",
        icon: "success",
        timer: 2000,
        button: false
      })
  }

  function createProject () {
      setMessage(values.message);
      setTicketId(id);
      //create();
  }

  return (
    <body>
      <div>
      <form onSubmit={onSubmit} class="inputForm">
          <InputLabel className={classes.comment} htmlFor="outlined-adornment-amount">Add a Comment</InputLabel>
          <textarea 
            type="text" 
            id="message" 
            name="message" 
            className={classes.input}
            placeholder="" required
            error={errors.message}
            value={values.message}
            onChange={onChange}/>
             <Button class="addComment" variant="contained" color="primary" type="submit">
             Add Comment
            </Button>
          </form>
         
      </div>
    </body>
  );
}

const CREATE_COMMENT =  gql `
mutation
  createComment($message: String! , $id:String!){
  createComment(message: $message, id:$id) {
  id
  commenter
  message
  createdAt
  }
}
`;


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

export default AddComment;