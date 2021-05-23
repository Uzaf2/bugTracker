import { React, useContext, useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AccountsImg from '../icons/images.svg';
import AccountsImg2 from '../icons/userImage.png';
import AccountsImg3 from '../icons/userImage1.png';
import '../css/accounts.css';
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import gql from 'graphql-tag';

const useStyles = makeStyles((theme) => ({
    inputType:{
        width: '100%'
    },
    root: {
        flexGrow: 1,
        marginTop: 300,
        alignContent: "center"
    },
    fontType: {
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
        height: '100%'
    },
    submit: {
        margin: theme.spacing(5, 0, 4),
    },
    container: {
        width: '100%',
        height: '100%',
        alignItems: "center",
        justify: "center",
    },
    logo: {
        width: '10%'
    }

}));

const font = "'Merriweather', serif";
function Accounts(props) {

    const [ errors, setErrors ] = useState({});
    const context = useContext (AuthContext);
    const history = useHistory();
    const [ role, setRole ] = useState('');

    useEffect(() => {
        if (role === "")
        {

        }
        else if (role==="Demo Admin" ||  role==="Demo Manager" ||  role==="Demo Developer" ||  role==="Demo Submitter")
        {
        
          console.log("Demo Login Called !!!");
          demoLogin();
        }
        
    }, [role]);


    const [demoLogin, {loading} ] = useMutation(DEMO_LOGIN, {
        update(_, { data: { demoLogin: userData2 }}){
        context.login(userData2);
        props.history.push('/Dashboard');
        },
        onError(err){
        console.log(err);
        setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: { role: String(role)}
    });

    function adminClick() {
        setRole('Demo Admin');
        demoLogin();
    }

    function projectManagerClick() {
        setRole('Demo Manager');
        demoLogin();
    }

    function developerClick() {
        setRole('Demo Developer');
        demoLogin();
    }

    function submitterClick() {
        setRole('Demo Submitter');
        demoLogin();
    }

    function handleClickDemo() {
      //  demoLogin();
        //props.history.push('/Accounts');
    }
    
    const styles = useStyles();

    return (
        <Container component="main" maxWidth="xs" className={useStyles.container} class="background">
            <CssBaseline />
            <div class="accountsForm">
                    <Typography component="h1" variant="h5" className={styles.fontType} style={{ marginBottom: "10px" }}>
                    </Typography>
                      <p class="paragraph1">Demo User Login</p>
                    <form  class="formContainer" >
                         
                        <div class="grid-item">

                        <div class="article">
                        <img title="Title Tag Goes Here" alt="Image of Seal" class="img1" src={AccountsImg3} 
                        
                        onClick={() => adminClick()}/>
                        <p class="paragraph" class="img1" onClick={() => adminClick()} >Admin</p>
                        </div>

                        </div>
                        <div class="grid-item">
                        <div class="article">
                        <img alt="Image of Seal" class="img2"  src={AccountsImg3} onClick={() => projectManagerClick()}/>
                        <p class="paragraph" class="img2" onClick={() => projectManagerClick()}>Project Manager</p>
                        </div>
                        </div>
                        <div class="grid-item">
                        <div class="article">
                        <img alt="Image of Seal"  class="img3" src={AccountsImg3} onClick={() => developerClick()}/>
                        <p class="paragraph" class="img3" onClick={() => developerClick()}>Developer</p>
                        </div>
                        </div>
                        <div class="grid-item">
                        <div class="article">
                        <img alt="Image of Seal"  class="img4" src={AccountsImg3} onClick={() => submitterClick()}/>
                        <p class="paragraph" class="img4" onClick={() => submitterClick()}>Submitter</p>
                        </div>
                        </div>
                    </form>
            </div>
        </Container>
    )
}


const DEMO_LOGIN = gql `
mutation  
    demoLogin ($role: String!){
        demoLogin (role: $role) 
        {
            token
        }
    }`; 


export default Accounts;