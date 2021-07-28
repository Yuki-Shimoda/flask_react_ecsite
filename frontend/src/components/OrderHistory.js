import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import {List, Divider, ListItem, ListItemAvatar, ListItemText, Button, Grid} from '@material-ui/core';
import { setItem, ordered, orderCancel } from "../actions/index";

const useStyles = makeStyles((theme) => ({
  orderList: {
    background: theme.palette.grey["100"],
    margin: '0 auto',
    padding: 32,
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: 768
    }
  },
  list: {
    background: '#fff',
    height: 'auto'
  },
  image: {
    objectFit: 'cover',
    margin: '8px 16px 8px 0',
    height: 96,
    width: 96
  },
  text: {
    width: '100%'
  },
  title: {
    flexGrow: 1,
  }
}))

const OrderHistory = () => {
  console.log('renndar')
  const selector = useSelector(state => state)
  let items = selector.item.items
  let order = selector.ordered.orders
  console.log(order)

  console.log(order)
  const classes = useStyles();
  const dispatch = useDispatch();

useEffect(() => {
  dispatch(setItem())
  dispatch(ordered())
  // dispatch(orderCancel())
}, [dispatch]);

const CancelBtn = (order) => {
  // console.log(order.order_id)
  dispatch(orderCancel(order.order_id))
}
const orderNum = order.length

return (
  <React.Fragment>
    <h1 align="center">注文履歴</h1>
    { orderNum > 0 ? (
      <section className="c-section-wrapin">
        {order.filter((order) => {
          return order.status === 1
          }).map((order) => (
              <List className={classes.orderList} key={order.order_id}>
                <div className="module-spacer--small" />
              <div>注文日時：</div>
              {order.item_list.map((data, index) => ( //data = {item_id: 2, quantity: 3 }
                <List key={index}>
                  {items.filter((item) => {
                    return data.item_id === item.id
                  }).map((item) => (

                    <ListItem className={classes.list} key={index}>
                      <ListItemAvatar>
                        <img src={`${process.env.PUBLIC_URL}/static/images/${item.image}`} width="200" height="200" style={{objectFit: "cover"}}　alt='画像'></img>
                      </ListItemAvatar>
                      <div className={classes.text} />
                      <div className={classes.text}>
                      <ListItemText primary={item.name} />
                      <ListItemText secondary={"単価：" + Number(item.price).toLocaleString() + "円"}/>
                      <ListItemText secondary={"数量：" + data.quantity + "杯"}/>
                      </div>
                    </ListItem>
                  )
                  )}
                </List>
              ))}
              <div className="module-spacer--extra-extra-small" />
              <Grid container justifyContent="flex-end">
              <Button variant="outlined" onClick={() => CancelBtn(order)}>キャンセル</Button>
              </Grid>
              <p></p>
              <Divider />
              </List>
            ))}
          
          {/* 支払い済、キャンセル済の時 */}
          {order.filter((order) => {
            return order.status === 9
          }).map((order) => (
        // {order.map((order) => (
            <List className={classes.orderList} key={order.orderId}>
              <div className="module-spacer--small" />
            <div>注文日時：</div>
            {order.item_list.map((data, index) => (
              <List key={index}>
                {items.filter((item) => {
                  return data.item_id === item.id
                }).map((item) => (
                  <ListItem className={classes.list} key={index}>
                  <ListItemAvatar>
                  <img src={`${process.env.PUBLIC_URL}/static/images/${item.image}`} width="200" height="200" style={{objectFit: "cover"}} alt='画像'></img>
                  </ListItemAvatar>
                  <div className={classes.text} />
                  <div className={classes.text}>
                  <ListItemText primary={item.name} />
                  <ListItemText secondary={"単価：" + Number(item.price).toLocaleString() + "円"}/>
                    <ListItemText secondary={"数量：" + data.quantity + "杯"}/>
                    </div>
                  </ListItem>
                ))}
              </List>
                )
            )}
          <div className="module-spacer--extra-extra-small" />
          <Grid container justifyContent="flex-end">
          <span>キャンセル済み</span>
          </Grid>
          <p></p>
          <Divider />
          </List>
        )
      )}
      </section>
    ):(
      <p align="center">注文履歴がありません</p>
    )} 
      </React.Fragment>
    );
}

export default OrderHistory; 