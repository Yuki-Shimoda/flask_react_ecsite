import React, {
  useState
} from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';


const Form = (props) => {
    const [values, setValue] = useState({
      name: "",
    });
    const history = useHistory();
    const handleLink = path => history.push(path);
    

    const handleInputChange = e => {
      const { name, value } = e.target;
      setValue({
        [name]: value
      });
    };

    const submit = () => {
      console.log(values)
      handleLink('/complete')
    }

    return (
      <React.Fragment>
        <form>
          <label>宛先</label>
          <input name="name" onChange={handleInputChange}/>
        </form>
        <button onClick={() => submit()}>注文！</button>
      </React.Fragment>
    )
}

export default Form