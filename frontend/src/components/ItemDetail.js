import React,{useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import Axios from 'axios';
import {Box, TextField, Button, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import { setItem, ordered, orderCancel, setCart,} from "../actions/index";

const useStyles = makeStyles({
    grid: {
      margin: "50px 50px 100px 50px",
      width: "200"
    },
  
    form: {
      margin: "20px 0 0 0",
      width: "60%"
    }
  });

const userSelector = state => state.userIdState

const ItemDetail = () => {
  const classes = useStyles();
  const params = useParams();
  const detailId = params.Id;
  const dispatch = useDispatch();
  
  const history = useHistory();
  const handleLink = path => history.push(path);

  const selector = useSelector(state => state);
  const items = selector.item.items;
  const [selectItem, setSelectItem] = useState([]);
  const userIdState = useSelector(userSelector);

  useEffect(() => {
    const fetchItem = () =>
      {
        items.map((item) => {
          if(String(item.id) === detailId){
            setSelectItem(item)
          }
        })
      }
    fetchItem();
  },[dispatch])

  useEffect(() => {
    dispatch(setItem());
  }, []);

  // useEffect(() => {
  //   dispatch(setCart());
  // }, []);


  //個数
  const [buyNum,setNum] = useState(1)
  const handleChangebuyNum = (e) => 
    {
      setNum(e.target.value)
    }
  const quantity = Number(buyNum)

  //合計金額
  let addPrice = selectItem.price
    addPrice = selectItem.price * quantity

  const addCart = () => 
    {
      console.log(detailId)
        if (userIdState.login_user)
          {
            console.log(`ログインの有無:　${userIdState.login_user}`)
            console.log(`ログインuid：　${userIdState.uid}`)
            const uid =userIdState.uid
            Axios.post(`http://127.0.0.1:5000/item_detail/${detailId}`, {post_quantity:quantity, post_userId:uid}).then(()=>dispatch(setCart()))
          } 
        else { console.log('userきてない')}
        handleLink('/cart')
    }

return (
    <React.Fragment>
      <h1 align="center">商品詳細</h1>
          {console.log(selectItem)}
        <div className={classes.grid}>
          <Grid container justifyContent='center'>
            <Box xs={4} sm={5} textAlign="center">
              <img src={`${process.env.PUBLIC_URL}/static/images/${selectItem.image}`} alt='画像'  style={{ width: 400, height: 300 }} ></img>
            </Box>
            <Grid item xs={4} sm={5}>
              <h3>{selectItem.name}</h3> <br />
              <p>{selectItem.description}</p>
            </Grid>
          </Grid>
          <Grid container justifyContent='center'>
            <div className={classes.form}>
              <span style={{ fontWeight: 'bold' }}>数量：</span>
              <span style={{ color: 'red', fontWeight: 'bold' }}>数量を選択してください</span><br/>
              <TextField
                id='outlined-number'
                type='number'
                value={buyNum}
                InputProps={{ inputProps: { min: 1, max: 10 } }}
                onChange={(e) => { handleChangebuyNum(e) }}
              /><p />
            </div>
            <Box textAlign="center" className={classes.form}>
              <h2>ご注文金額合計：{addPrice.toLocaleString()}　円(税込)</h2>
              <Button onClick={addCart} variant='contained' style={{ color: "#fff", backgroundColor: "#CF000D" }}>
              カートに入れる
              </Button>
            </Box>
          </Grid>
        </div>
    </React.Fragment>
  )
}

export default ItemDetail;