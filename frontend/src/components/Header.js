import {useHistory, BrowserRouter as Router} from 'react-router-dom'
import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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

const Header =() => {
  const classes = useStyles();
  const history = useHistory();
  const handleLink = path => history.push(path);

  const [userName, setUserName] = useState('')

  useEffect(()=>{
    console.log('ヘッダーのuseEffect発動')
    Axios.get('http://127.0.0.1:5000/login')
    .then(function(res){
      const firstDbData = res.data
      console.log(firstDbData)
      setUserName(firstDbData)
    })
  },[userName])


  const toOrderHistory = ()=>{
    Axios.get('http://127.0.0.1:5000/order_history')
    .then(function(res){
        console.log(res)
    })
    handleLink('/order_history')
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
            <Button onClick={() => handleLink('/home1')}>Home1</Button>
            <Button onClick={() => handleLink('/cart')}>カート</Button>
            <Button onClick={() => handleLink('/item_detail')}>商品詳細</Button>
            <Button onClick={() => toOrderHistory()}>注文履歴</Button>
            {/* <button onClick={() => handleLink('/order_history')}>履歴</button> */}

            {/* <button onClick={() => handleLink('/complete')}>完了画面</button>
            <button onClick={()=>handleLink('/login')}>ログイン</button>
            <button onClick={()=>handleLink('/signup')}>新規登録</button>
            <button onClick={()=>handleLink('/')}>トップへ戻る</button> */}

            <Button onClick={() => handleLink('/complete')}>完了画面</Button>
            <Button onClick={()=>handleLink('/')}>トップへ戻る</Button>
            <p>{userName}</p>

            </Router>
          </React.Fragment>
          <Button color="inherit" onClick={()=>handleLink('/signup')}>新規登録</Button>
          <Button color="inherit" onClick={()=>handleLink('/login')}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header