import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setItem, ordered, orderCancel,} from "../actions/index";
import {List, Divider, ListItem, ListItemAvatar, ListItemText, Button, Grid, makeStyles} from '@material-ui/core';

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
  console.log('order')
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state)
  const items = selector.item.items
  const order = selector.ordered.orders
  console.log(order)
  const orderNum = order.length

  useEffect(() => {
    dispatch(setItem())
  }, [dispatch]);

  useEffect(() => {
    dispatch(ordered())
  }, [dispatch]);
  
  const CancelBtn = (e, order) => {
    dispatch(orderCancel(order.order_id))
    alert('注文をキャンセルしますか？')
    e.target.textContent = "キャンセル済み"
  }

  return (
    <React.Fragment>
      <h1 align="center">注文履歴</h1>
      { orderNum > 0 ? (
        <section className="c-section-wrapin">
          {order.filter((order) => {
            return order.status === 1
              }).map((order) => (
                  <List className={classes.orderList} key={order.order_id}>
                    <div>注文日：{order.ordered_date}</div>
                    {order.item_list.map((data) => ( //data = {item_id: 2, quantity: 3 }
                      <List key={data.item_id}>
                        {items.filter((item) => {
                          return data.item_id === item.id
                            }).map((item) => (
                              <ListItem className={classes.list} key={data.item_id}>
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
                    <Grid container justifyContent="flex-end">
                      <Button variant="outlined" id="cancelBtn" onClick={(e) => CancelBtn(e, order)}>キャンセル</Button>
                    </Grid>
                    <p/>
                    <Divider />
                  </List>
                )
              )}
          {order.filter((order) => {
            return order.status === 9
              }).map((order) => (
                <List className={classes.orderList} key={order.orderId}>
                    {order.item_list.map((data) => (
                      <List key={data.item_id}>
                        {items.filter((item) => {
                          return data.item_id === item.id
                            }).map((item) => (
                              <ListItem className={classes.list} key={item.id}>
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
                    ))}
                  <Grid container justifyContent="flex-end">
                    <span>キャンセル済</span>
                  </Grid>
                  <p/>
                  <Divider />
                </List>
              ))
          }
        </section>
      ):(
        <p align="center">注文履歴がありません</p>
      )} 
    </React.Fragment>
  )
}

export default OrderHistory; 