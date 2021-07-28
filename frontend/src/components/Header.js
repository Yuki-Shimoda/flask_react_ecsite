import {useHistory, BrowserRouter as Router} from 'react-router-dom'
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
// const userSelector = state=> state.userIdState.loginuser;
const userSelector = state=> state.userIdState;


const Header =() => {
  const classes = useStyles();
  const history = useHistory();
  const handleLink = path => history.push(path);
  const dispatch = useDispatch()

  const [userName, setUserName] = useState('')

  const userIdState = useSelector(userSelector)
    
  useEffect(()=>{
    console.log('ヘッダーのuseEffect発動')
    // if(userIdState.loginUser){　// ログインしていたら
    //   setUserName(loginUser.name)
    //   console.log('ログイン成功')
    // }else{
    //   console.log('未ログイン')
    // }
  },[])

  const toOrderHistory = ()=>{
    Axios.get('http://127.0.0.1:5000/order_history')
    .then(function(res){
        // console.log(res)
    })
    handleLink('/order_history')
}
  const logout =()=>{
    console.log('ログアウトします')
    console.log('DELETE_USER_INFO発動')
    dispatch(deleteUserInfo())
    console.log(userIdState)
    localStorage.removeItem('uid');
    localStorage.removeItem('password');
    console.log('ローカルストレージからユーザー情報削除完了')
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
            <Button onClick={() => handleLink('/cart')}>カート</Button>
            <Button onClick={() => handleLink('/item_detail')}>商品詳細</Button>
            <Button onClick={() => toOrderHistory()}>注文履歴</Button>
            
            <Button onClick={() => handleLink('/complete')}>完了画面</Button>
            <Button onClick={()=>handleLink('/')}>トップへ戻る</Button>
            </Router>
          </React.Fragment>
          {/* <p>{loginUser}</p> */}
          <p>{userName}</p>
          <Button color="inherit" onClick={()=>handleLink('/login')}>Login</Button>
          <Button color="inherit" onClick={logout}>Logout</Button>
          <Button color="inherit" onClick={()=>handleLink('/signup')}>新規登録</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header