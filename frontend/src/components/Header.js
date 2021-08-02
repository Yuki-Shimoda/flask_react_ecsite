import {useHistory, BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { deleteUserInfo } from "../actions/index";
import { ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const Header =(props) => {
  const classes = useStyles();
  const history = useHistory();
  const handleLink = path => history.push(path);
  const dispatch = useDispatch()

  console.log(props.login_user)

  const toOrderHistory = ()=>{
    Axios.get('http://127.0.0.1:5000/order_history')
    .then(function(res){
        console.log(res)
    })
    handleLink('/order_history')
}
  const logout =()=>{
    console.log('ログアウトします')
    console.log('DELETE_USER_INFO発動')
    dispatch(deleteUserInfo())
    // console.log(userIdState)
    localStorage.removeItem('uid');
    localStorage.removeItem('password');
    console.log('ローカルストレージからユーザー情報削除完了')
    handleLink('/')
  }

  const LoginOrLogout = (props) => {
    // if(props.user !==undefined){
      if (props.userInfo.login_user === true ) {
        return(
          <>
            <Button color="inherit" onClick={() => handleLink('/cart')}>カート</Button>
            <Button color="inherit" onClick={() => toOrderHistory()}>注文履歴</Button>
            <p>{props.userInfo.name}</p>
            <Button color="inherit" onClick={logout}>ログアウト</Button>
          </>
        )
      }else {
        return (
          <>
          <Button color="inherit" onClick={()=>handleLink('/login')}>ログイン</Button>
          <Button color="inherit" onClick={()=>handleLink('/signup')}>新規登録</Button>
          </>
        )
      }
    // }
    
  }  


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            KANI TOWN
          </Typography>
          <React.Fragment>
            <Router>
              <Button onClick={() => handleLink('/')}>Home</Button>
            </Router>
          </React.Fragment>
          {/* <p>{userName}</p> */}
          <LoginOrLogout userInfo={props.login_user}/>
          {/* <Button onClick={()=>handleLink('/login')}>Login</Button>
          <Button onClick={logout}>Logout</Button>
          <Button onClick={()=>handleLink('/signup')}>新規登録</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header