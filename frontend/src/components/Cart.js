import React, { useEffect, useState } from 'react';
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

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [flag, setFlag] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

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
                cart.length === 0 ? <p>カートに商品はありません</p> :
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
                cart.length === 0 ? <></> : <button onClick={() => setFlag(true)}>お届け先情報入力</button>
            }
            {
                flag === false ? <></> :<Form />
            }
        </React.Fragment>
    );
}

export default Cart