import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("@gmail.com");
  const [password, setpassword] = useState("@123");
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleclick = async () => {
    setError("");
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(response.data));
      return navigate("/");
    } catch (err) {
      setError(err.response?.data)
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
                type="password"
                className="input"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </fieldset>
          </div>
          {error && <p className="text-red-600">ERROR : {error}</p>}
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
