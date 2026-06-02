import { useState } from "react";
import axios from "axios";
import {useDispatch} from "react-redux"
import {addUser} from "../utils/userSlice"
const Login = () => {
  const [email, setEmail] = useState("Rohit@gmail.com");
  const [password, setpassword] = useState("Rohit@123");
  const dispatch = useDispatch();

  const handleclick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1234/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data)
      dispatch(addUser(response.data))
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm mt-8 mx-auto ">
        <div className="card-body">
          <h2 className="card-title mx-auto">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter Email</legend>
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter Password</legend>
              <input
                type="text"
                className="input"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleclick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
