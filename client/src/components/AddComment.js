import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';


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
      }
  }));



function AddComment(props) {

  var index = props.index.history.location.state.index;
  var array = props.index.history.location.state.array;

  console.log("Index", index);
  console.log("Array", array);
    
    const classes = useStyles();
    const [values, setValues] = React.useState({
      message: '',
    });
  
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

  
  return (
    <body>
      <div>
      <FormControl fullWidth className={clsx(classes.margin, classes.textField)}  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Comment</InputLabel>
          <OutlinedInput
            id="message"
            value={values.message}
            onChange={handleChange('message')}
            labelWidth={60}
          />
        </FormControl>
        <Button variant="contained" color="primary"  className={classes.btn1}>Create Project</Button>

      </div>
    </body>
  );
}



export default AddComment;