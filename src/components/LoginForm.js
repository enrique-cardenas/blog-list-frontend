import React from 'react'
import Notification from '../components/Notification'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: "35px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = ({handleLogin, username, password}) =>  {
  const classes = useStyles();

  return(
    <>
      <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log in to blog app
        </Typography>
        <Notification />
        <form onSubmit={handleLogin} className={classes.form}>
          <TextField
            { ...username.formInput }
            label="username"
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            { ...password.formInput }
            label="password"
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <Button 
            color="primary" 
            type="submit"
            className={classes.submit}
          >
            login
          </Button>
          <Button
            color="primary" 
            className={classes.submit}
          >
            sign up
            </Button>
        </form>
      </Paper>
      </Container>
    </>
  )
}

export default LoginForm