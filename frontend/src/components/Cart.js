import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import axios from 'axios';
import Form from './Form';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { setCart, deleteCart, setItem } from '../actions';


const Cart = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    console.log(selector)
    const carts = selector.setCart.cart
    const items = selector.item.items
    console.log(carts)
    // const [cartItem, setCartItem] = useState(carts);
    const [array, setArray] = useState(items);
    // setCartItem(carts)
    // console.log(carts)
    // setCartItem(carts)
    // const history = useHistory()
    // const handleLink = path => history.push(path)
    // const [orderInfo,setOrder]=useState('')
    // // const [orderedDate, setOrderedDate]=useState('')
    // const [destinationName,setDesitinationName]=useState('')
    // const [destinationZipcode,setDesitinationZipcode]=useState('')
    // const [destinationAddress,setDesitinationAddress]=useState('')
    // const [destinationTel,setDesitinationTel]=useState('')

    // const orderComplete =(Info,Name,Zipcode,Address,Tel)=>{
    //     Axios.post(`http://127.0.0.1:5000/cart`, {post_orderInfo:{info:Info, destinationName:Name,destinationZipcode:Zipcode, destinationAddress:Address, destinationTel:Tel}})
    //     handleLink('/complete')
    // }
    
    // const createInfo = e =>{
    //     setOrder(e.target.value)
    //     // console.log(orderInfo)
    // }

    // const [cart, setCart] = useState([]);
    const [flag, setFlag] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    
    const createTotalPrice = () => {
        let total = 0;
        carts.forEach(item => {
            total = total + item.quantity * item.item.price
        })
        setTotalPrice(total); 
    }
    useEffect(() => {
        dispatch(setItem());
      }, [dispatch]);

    useEffect(() => {
        dispatch(setCart())
    }, []);

    useEffect(() => {
        setArray(items);
      }, [dispatch]);

    //   useEffect(() => {
    //     setCartItem(carts);
    //   }, []);

    // useEffect(() => {
    //     dispatch(setCart())
    //     setCartItem(carts)
    //     // console.log(carts)
    //     // console.log(cartItem)
    // },[])
    // useEffect(() => {
    //     const fetchCart = async () => {
    //         const result = await axios(`http://127.0.0.1:5000/cart`);
    //         setCart(result.data);
    //     };
    //     fetchCart();
    // }, []);

    useEffect(() => {
        createTotalPrice();
    })

    const deleteCartItem = (deleteId) => {
        console.log(deleteId)
        dispatch(deleteCart(deleteId))
        console.log('カートからitemを削除');
    }

    return (
        <React.Fragment>
            
            {
                carts.length === 0 ? <p>カートに商品はありません</p> :
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="right">商品</TableCell>
                                    <TableCell align="right">個数</TableCell>
                                    <TableCell align="right">価格</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    carts.map(item => {
                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell component="th" scope="row">
                                                    <img src={`${process.env.PUBLIC_URL}/static/images/${item.item.image}`}　 alt="画像" width="5%"></img>
                                                </TableCell>
                                                <TableCell align="right">{item.item.name}</TableCell>
                                                <TableCell align="right">{item.quantity}</TableCell>
                                                <TableCell align="right">{item.item.price}</TableCell>
                                                <TableCell>
                                                    {
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => deleteCartItem(item.id)}
                                                        >
                                                            カートから削除
                                                            </Button>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
            <p>{totalPrice}</p>
            {
                carts.length === 0 ? <></> : <button onClick={() => setFlag(true)}>お届け先情報入力</button>
            }
            {
                flag === false ? <></> :<Form />
            }
        </React.Fragment>
    );
}

export default Cart