import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './Form';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';



const Cart = () => {
    const [cart, setCart] = useState([]);
    const [flag, setFlag] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [updateId, setUpdateId] = useState(0);
    // const [itemnCount, setItemCount] = useState(0);

    const createTotalPrice = () => {
        let total = 0;
        cart.forEach(item => {
            total = total + item.quantity * item.item.price
        })
        setTotalPrice(total); 
    }

    useEffect(() => {
        const fetchCart = async () => {
            const result = await axios(`http://127.0.0.1:5000/cart`);
            setCart(result.data);
        };
        fetchCart();
    }, []);

    useEffect(() => {
        createTotalPrice();
    })

    // const changeQuantity = (updateId) => {
    //     let num = e.target.value;
    //     axios.post(`http://127.0.0.1:5000/item_quantity/${updateId}`, {post_quantity: num});
    //     // console.log(num,updateId)
    // }

    // const getUpdateId = (id) => {
    //     console.log(id)
    // }

    const deleteCartItem = (deleteId) => {
        axios.post(`http://127.0.0.1:5000/delete_cartitem/${deleteId}`);
        const fetchCart = async () => {
            const result = await axios(`http://127.0.0.1:5000/cart`)
            setCart(result.data);
        };
        fetchCart();
        console.log('カートからitemを削除');
    }

    return (
        <React.Fragment>

            {
                cart.length == 0 ? <p>カートに商品はありません</p> :
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
                                    cart.map(item => {
                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell component="th" scope="row">
                                                    <img src={`${process.env.PUBLIC_URL}/static/images/${item.item.image}`} width="5%"></img>
                                                </TableCell>
                                                <TableCell align="right">{item.item.name}</TableCell>
                                                <TableCell align="right">
                                                    <select name="itemCount"
                                                        // onChange={() => changeQuantity(item.id)}
                                                    >
                                                        <option value={item.quantity} name={item.quantity}>{item.quantity}</option>
                                                        <option value="1" name="1">1</option>
                                                        <option value="2" name="2">2</option>
                                                        <option value="3" name="3">3</option>
                                                        <option value="4" name="4">4</option>
                                                        <option value="5" name="5">5</option>
                                                        <option value="6" name="6">6</option>
                                                        <option value="7" name="7">7</option>
                                                        <option value="8" name="8">8</option>
                                                        <option value="9" name="9">9</option>
                                                    </select>
                                                </TableCell>
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
                cart.length == 0 ? <></> : <button onClick={() => setFlag(true)}>お届け先情報入力</button>
            }
            {
                flag == false ? <></> :<Form />
            }
        </React.Fragment>
    );
}

export default Cart