import React,{useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import ItemDetail from './ItemDetail.js'
import Cart from './Cart'
import Complete from './Complete'
import OrderHistory from './OrderHistory';
import Login from './Login';
import Signup from './Signup';
import Error from './Error';
import { useSelector, useDispatch } from "react-redux";
import { login, setCart } from "../actions/index";

const getState = state => state.userIdState; // userIdState uid,name,login_user

const App=()=> {
  console.log('App.js発動')
  const userIdState = useSelector((state) => state.userIdState)
  // const stateContent = useSelector(getState);
  const [loginUser, setLoginUser] = useState(false);
  const dispatch = useDispatch();
  let current_uid = localStorage.getItem('uid')
  let current_password = localStorage.getItem('password')


  //初期画面でstrageにデータがあればそのデータをdispatchし認証させる
  //認証OKだったら一致したidとpassをDBから取得しSET_USER_INFOにdispatch
  //user.jsでstateを書き換える　OK
  useEffect(()=>{
     const fetchUser = () =>  {
      if(current_uid){
        dispatch(login(current_uid,current_password))
        // dispatch(setCart())
        console.log(userIdState)
        console.log(`ログイン中のユーザーは${current_uid}`)
      }else{
        console.log('誰もログインしていません')
      }
    }
    fetchUser();
  },[])
    // console.log('App.jsのuseEffect発動')
    // // console.log(current_uid)
    // if(current_uid){
    //   dispatch(login(current_uid,current_password))
    //   console.log(userIdState)
    //   console.log(`ログイン中のユーザーは${current_uid}`)
    // }else{
    //   console.log('誰もログインしていません')


  // console.log(loginUser)


  return (
    <React.Fragment>
      <Router>
        <Header login_user={userIdState} />
        { userIdState.login_user ?
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

      </Router>
        
    </React.Fragment>
  );
}

export default App;
