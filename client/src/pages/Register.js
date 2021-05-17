import { React, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';
import '../css/register.css';

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

}));

const font = "'Merriweather', serif";
function Register(props) {

    const [errors, setErrors] = useState({});
    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data }) {
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function registerUser() {
        addUser();
    }
    const styles = useStyles();

    return (
        <Container component="main" maxWidth="xs" className={useStyles.container} class="background">
            <CssBaseline />
            <div className="formRegister">
                <div className={useStyles.paper} class="innerForm">
                    <Typography component="h1" variant="h5" className={styles.fontType} style={{ marginBottom: "10px" }}>
                    </Typography>
                    <form className={useStyles.form} class="formContainer1" onSubmit={onSubmit}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    id="username"
                                    label="Name"
                                    error={errors.username ? true : false}
                                    value={values.username}
                                    type="text"
                                    name="username"
                                    autoComplete="username"
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    type="text"
                                    error={errors.email ? true : false}
                                    value={values.email}
                                    name="email"
                                    autoComplete="email"
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    type="password"
                                    error={errors.password ? true : false}
                                    value={values.password}
                                    name="password"
                                    autoComplete="password"
                                    onChange={onChange}
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
                                    error={errors.confirmPassword ? true : false}
                                    value={values.confirmPassword}
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
                            style={{ marginTop: "10px" }}>
                            <Typography component="h1" variant="h5" className={styles.fontType}>
                                Register
                    </Typography>
                        </Button>
                    </form>
                    <div className="ui error message">
                        <ul className="list">
                            {Object.values(errors).map(value => (
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