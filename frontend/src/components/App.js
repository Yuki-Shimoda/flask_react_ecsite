import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Header from './Header'
// import Router from '../Router'
import Home from './Home'
import ItemDetail from './ItemDetail.js'
import Cart from './Cart'
import Complete from './Complete'
import OrderHistory from './OrderHistory';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Switch> 
          <Route path='/item_detail/:Id' exact component={ItemDetail}></Route>
          <Route path='/item_detail' component={ItemDetail}></Route>
          <Route path='/cart' component={Cart}></Route>
          <Route path='/order_history' component={OrderHistory}></Route>
          <Route path='/complete' component={Complete}></Route>
          <Route path='/' component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
