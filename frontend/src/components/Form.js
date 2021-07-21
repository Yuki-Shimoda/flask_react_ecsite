import React, {
  useState
} from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';


const Form = () => {
    const [values, setValue] = useState({});
    const history = useHistory();
    const handleLink = path => history.push(path);

    const handleInputChange = e => {
      const { name, value } = e.target;
      setValue({
        ...values,
        [name]: value,
      });
    };

    const orderComplete = () => {
      Axios.post(`http://127.0.0.1:5000/cart`, {
        post_orderInfo: {
          destinationName: values.destinationName,
          destinationZipcode: values.destinationZipcode,
          destinationAddress: values.destinationAddress,
          destinationTel: values.destinationTel
        }
      })
        handleLink('/complete')
    }
  
    return (
      <React.Fragment>
        <form>
          <label>宛先</label>
          <input name="destinationName" onChange={handleInputChange}/><br/>
          <label>郵便番号</label>
          <input name="destinationZipcode" onChange={handleInputChange}/><br/>
          <label>住所</label>
          <input name="destinationAddress" onChange={handleInputChange}/><br/>
          <label>電話番号</label>
          <input name="destinationTel" onChange={handleInputChange}/><br/>
        </form>
        <button onClick={orderComplete}>注文！</button>
      </React.Fragment>
    )
}

export default Form