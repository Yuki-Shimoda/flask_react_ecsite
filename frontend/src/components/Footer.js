import React from "react";
import { makeStyles } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles({
  footer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    textAlign: "center"
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
});

const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
            <div className={classes.footer}>Copyright &copy; YourName</div>
        </Toolbar>
    </AppBar>    
  )
};

export default Footer;