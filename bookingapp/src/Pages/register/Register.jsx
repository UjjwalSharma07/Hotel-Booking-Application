import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    isAdmin:false,
    country:undefined,
    city:undefined,
    phone:undefined,

  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  console.log(credentials);

  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post("https://hotel-booking-application-zqsq.onrender.com/api/v1/auth/register", credentials);
      navigate("/login")
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="login">
      
      <div className="lContainer">
        <h2>Resgiter</h2>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          placeholder="user@gmail.com"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        
        <input
          type="text"
          placeholder="country"
          id="country"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="city"
          id="city"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="number"
          placeholder="phone number"
          id="phone"
          onChange={handleChange}
          className="lInput"
        />
        <label >isAdmin: 
          <label >
            <input onChange={handleChange} id="isAdmin" value={true} name="admin" type="radio" />Yes
          </label>
          <label >
            <input onChange={handleChange} id="isAdmin" value={false} name="admin" type="radio" />No
          </label>
        </label>
        <button disabled={loading} onClick={handleClick} className="lButton">
          Register
        </button>
        <p>You do have an account? <Link to="/login">Login</Link> </p>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;