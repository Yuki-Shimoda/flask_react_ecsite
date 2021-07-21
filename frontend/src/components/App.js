import React from 'react';
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
import Home1 from './Home1.js'

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Switch> 
          <Route path='/item_detail/:Id' exact component={ItemDetail}></Route>
          <Route path='/item_detail' component={ItemDetail}></Route>
          <Route path='/home1/item_detail' component={ItemDetail}></Route>
          <Route path='/cart' component={Cart}></Route>
          <Route path='/order_history' component={OrderHistory}></Route>
          <Route path='/complete' component={Complete}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/signup' component={Signup}></Route>
          <Route path='/home1' component={Home1}></Route>
          <Route path='/' component={Home}></Route>


        </Switch>
      </BrowserRouter>
        <Footer />
    </React.Fragment>
  );
}

export default App;
