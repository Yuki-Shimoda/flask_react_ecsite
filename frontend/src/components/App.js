import React,{useEffect, useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import ItemDetail from './ItemDetail.js'
import Cart from './Cart'
import Complete from './Complete'
import OrderHistory from './OrderHistory';
import Login from './Login';
import Signup from './Signup';
import { useSelector, useDispatch } from "react-redux";
// import Home1 from './Home1.js'
import { login } from "../actions/index";

const getState = state => state.userIdState; // userIdState uid,name,login_user



const App=()=> {
  const userIdState = useSelector((state) => state.userIdState)
  const stateContent = useSelector(getState);
  const [loginUser, setLoginUser] = useState(false);
  const dispatch = useDispatch();
  let current_uid = localStorage.getItem('uid')
  let current_password = localStorage.getItem('password')

  useEffect(()=>{
    console.log('App.jsのuseEffect発動')
    console.log(current_uid)
    if(current_uid){
      dispatch(login(current_uid,current_password))
      console.log(userIdState)
      console.log(`ログイン中のユーザーは${current_uid}`)
    }else{
      console.log('誰もログインしていません')
    }
  },[userIdState])

  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Switch> 
          <Route path='/item_detail/:Id' exact component={ItemDetail}></Route>
          <Route path='/item_detail' component={ItemDetail}></Route>
          {/* <Route path='/home1/item_detail' component={ItemDetail}></Route> */}
          <Route path='/cart' component={Cart}></Route>
          <Route path='/order_history' component={OrderHistory}></Route>
          <Route path='/complete' component={Complete}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/signup' component={Signup}></Route>
          {/* <Route path='/home1' component={Home1}></Route> */}
          <Route path='/' component={Home}></Route>


        </Switch> 
      </BrowserRouter>
        <Footer />
    </React.Fragment>
  );
}

export default App;
