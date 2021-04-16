
import { React, useState}from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../App.css'; 
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useForm } from '../util/hooks';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

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
    signUp:{
        marginTop:'20px'
    }    

  }));

  const font =  "'Merriweather', serif";
  
  function Login (props) {
    const [ errors, setErrors ] = useState({});
    const { onChange, onSubmit, values } = useForm(loginUser,{
        username: '',
        password: ''
    });

    const [login, {loading} ] = useMutation(LOGIN_USER, {
        update(_,{data}){
            //console.log("In the update function of the login page");
            //console.log("Data from login",data);
            props.history.push('/ManageUserRoles');
        }, 
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        }, variables : values
    });

    function loginUser() {
        login();
    }

    const history = useHistory();
    function handleClick() {
        history.push("/Register");
    }

    function handleClickDemo() {
        history.push("/Accounts");
    }
  
    const styles = useStyles();

    return (
        <Container component="main" maxWidth="xs" className={useStyles.container} class="background">
            <CssBaseline />
            <div class="form">
            <div className={useStyles.paper} class="innerForm">
            <Typography component="h1" variant="h5" className={styles.fontType} style={{ marginBottom : "10px" }}>
            </Typography>
                <form className={useStyles.form} class="formContainer1" onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                       
                        <Grid item xs={12}  >
                        <TextField
                                variant="outlined"
                                fullWidth
                                id="username"
                                label="Username"
                                type="text"
                                autoComplete="username"
                                name="username"
                                error={errors.username ? true: false}
                                value={values.username}
                                onChange={onChange}
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
                                error={errors.password ? true: false}
                                value={values.password}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={useStyles.submit}
                        color="primary"
                        style={{ marginTop : "10px" }}>
                    <Typography component="h1" variant="h5" className={styles.fontType}>
                    Login
                    </Typography>
                    </Button>
                    
                    <a href="#" className="signUp" onClick={handleClick}> Don't have an account? Sign Up ? </a>
                    <p></p>
                    <a href="#" className="signUp" onClick={handleClickDemo}> For Demo Account click here ! </a>
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

const LOGIN_USER = gql `
mutation login($username:String! $password: String!) {
    login(username: $username password: $password) { 
    id
    email
    username
    creationTime
    }
}`;

export default Login;