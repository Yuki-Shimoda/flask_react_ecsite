import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './Form';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
    const fetchCart = async () => {
      const result = await axios(
        `http://127.0.0.1:5000/cart`
      )
      setCart(result.data);
    };
    fetchCart();
  }, [])

    return (
        <React.Fragment>
            {
                <React.Fragment>
                    <ul>
                        {
                            cart.map(item => {
                                return (
                                    <li key={item.id}>
                                        {item.title}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <button onClick={() => { setFlag(true) }}>お届け先情報入力</button>
                    {
                        flag === true ? <Form setFlag={setFlag} /> :<></>
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Cart