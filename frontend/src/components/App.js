import React,{useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import ItemDetail from './ItemDetail.js'
import Cart from './Cart'
import Complete from './Complete'
import OrderHistory from './OrderHistory';
import Login from './Login';
import Signup from './Signup';
import Error from './Error';
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/index";

const getState = state => state.userIdState; // userIdState uid,name,login_user

const App=()=> {
  // const userIdState = useSelector((state) => state.userIdState)
  const stateContent = useSelector(getState);
  const login_user = stateContent

  const [loginUser, setLoginUser] = useState(false);

  useEffect(()=>{
    setLoginUser(stateContent.login_user);
  },[stateContent])

  console.log(login_user)
  // const [loginUser, setLoginUser] = useState(false);
  const dispatch = useDispatch();
  let current_uid = localStorage.getItem('uid')
  let current_password = localStorage.getItem('password')

  useEffect(()=>{
    console.log('App.jsのuseEffect発動')
    console.log('ローカルストレージのuidを取得：'+ current_uid)
    if(current_uid){
      dispatch(login(current_uid,current_password))
      console.log(stateContent)
      console.log(`ログイン中のユーザーは${current_uid}`)
    }else{
      console.log('誰もログインしていません')
      console.log(stateContent)
    }
  },[])

  console.log(loginUser)


  return (
    <React.Fragment>
      <Router>
        <Header login_user={login_user} />
        { loginUser ?
        // ログイン時のルーティング
        <Switch> 
          <Route path='/item_detail/:Id' component={ItemDetail}></Route>
          <Route path='/cart' exact component={Cart}></Route>
          <Route path='/order_history' exact component={OrderHistory}></Route>
          <Route path='/complete' exact component={Complete}></Route>
          <Route path='/' exact component={Home}></Route>
          <Route component={Error}></Route>
        </Switch>
        :
        // ログアウト時のルーティング
        <Switch>
          <Route path='/item_detail/:Id' component={ItemDetail}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/signup' exact component={Signup}></Route>
          <Route path='/' exact component={Home}></Route>
          <Route component={Error}></Route>
        </Switch>
         }



        <Footer />
      </Router>
        
    </React.Fragment>
  );
}

export default App;
