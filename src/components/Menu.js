import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/currentUserReducer'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  leftGroup: {
    flexGrow: 1,
  }
}));


const Menu = (props) => {
  const classes = useStyles()

  const padding = {
    paddingRight: 5
  }

  const logout = () => {
    window.localStorage.clear()
    props.logout()
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.leftGroup}>
          <Button color="inherit">
            <Link style={padding} to='/'>blogs</Link>
          </Button>
          <Button color="inherit" >
            <Link style={padding} to='/users'>users</Link>
          </Button>
        </div>        
        <div>
          <Typography variant='body1' display="inline">  
            {props.currentUser.name} logged in
          </Typography>
          <Button 
            color="secondary"
            onClick={props.logout}
          >
            logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)