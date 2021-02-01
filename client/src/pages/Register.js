import {React, useState, useContext }from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import  gql  from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 300,
      alignContent: "center"
    },
    fontType:{
        fontFamily: font,
        fontSize: 16
    },
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(5, 0, 4),
    },
    container:{
        alignItems:"center",
        justify:"center",
        width: '100%',
        height: '100%',
    },

  }));

  const font =  "'Merriweather', serif";  
  function Register (props) {

    const [ errors, setErrors ] = useState({});
    const { onChange, onSubmit, values} = useForm (registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const [addUser, { loading }] = useMutation (REGISTER_USER,{
        update(_, { data}){
            console.log(data)
            props.history.push('/');
        },
        onError(err){
           setErrors(err.graphQLErrors[0].extensions.exception.errors);
           console.log("setting erorrs:",errors)
        },
        variables: values
    });

    console.log("Adduser", addUser);
    /*
    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData }}){
              console.log(userData)
              props.history.push('/');
          },
          onError(err){
             setErrors(err.graphQLErrors[0].extensions.exception.errors);
          },
          variables: values
      });
      */
    
    function registerUser() {
        addUser();
    }
    const styles = useStyles();

    return (
        <Container component="main" maxWidth="xs" className={useStyles.container} class="background">
            <CssBaseline />
            <div className="form">
            <div className={useStyles.paper} class="innerForm">
            <Typography component="h1" variant="h5" className={styles.fontType} style={{ marginBottom : "10px" }}>
            </Typography>
                <form className={useStyles.form} class="formContainer" onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                       
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="username"
                                label="Name"
                                type="text"
                                error = { errors.username ? true:false }
                                value = { values.username }
                                onChange = { onChange }
                                autoComplete="username"
                                name="username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Email"
                                type="text"
                                id="email"
                                name="email"
                                autoComplete="email"
                                error = { errors.email ? true : false}
                                value = { values.email }
                                onChange= { onChange }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="password"
                                error = { errors.password ? true : false}
                                value = { values.password }
                                onChange = { onChange }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                autoComplete="confirmPassword"
                                error={ errors.confirmPassword ? true:false }
                                value={ values.confirmPassword }
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={useStyles.submit}
                        style={{ marginTop : "10px" }}>
                    <Typography component="h1" variant="h5" className={styles.fontType}>
                    Register
                    </Typography>
                    </Button>
                </form>
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value=>(
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
                
            </div>
            </div>
        </Container>
    )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      username
      email
      creationTime
    }
  }`;

export default Register;