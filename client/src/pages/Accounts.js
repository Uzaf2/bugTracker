import { React, useState, useContext } from 'react';
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
import { Input } from 'semantic-ui-react'
import AccountsImg from '../icons/images.svg';
import '../css/accounts.css';

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

    const styles = useStyles();

    return (
        <Container component="main" maxWidth="xs" className={useStyles.container} class="background">
            <CssBaseline />
            <div className="form">
                    <Typography component="h1" variant="h5" className={styles.fontType} style={{ marginBottom: "10px" }}>
                    </Typography>
                    <form  class="formContainer" >
                        <div class="grid-item">

                        <div class="article">
                        <img title="Title Tag Goes Here" alt="Image of Seal" class="img1" src={AccountsImg}/>
                        <p class="paragraph">Admin</p>
                        </div>

                        </div>
                        <div class="grid-item">
                        <div class="article">
                        <img alt="Image of Seal" class="img2"  src={AccountsImg}/>
                        <p class="paragraph">Project Manager</p>
                        </div>
                        </div>
                        <div class="grid-item">
                        <div class="article">
                        <img alt="Image of Seal"  class="img3" src={AccountsImg}/>
                        <p class="paragraph">Developer</p>
                        </div>
                        </div>
                        <div class="grid-item">
                        <div class="article">
                        <img alt="Image of Seal"  class="img4" src={AccountsImg}/>
                        <p class="paragraph">Submitter</p>
                        </div>
                        </div>
                    </form>
            </div>
        </Container>
    )
}

export default Accounts;