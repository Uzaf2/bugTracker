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
import SideAndNavbar from '../components/SideAndNavbar';

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
function TicketDetails(props) {

const styles = useStyles();

return ( <body>
    <SideAndNavbar/>
   </body>
    )
}



export default TicketDetails;