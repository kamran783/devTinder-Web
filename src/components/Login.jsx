import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [islogin, setLogin] = useState(true);
  const [error, setError] = useState("");
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
      setError(err.response?.data);
    }
  };

  const handleSignUp = async () => {
    setError("")
    try {
      const res = await axios.post(
        BASE_URL + "/Signup",
        { firstName, lastName, email, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError(err.response?.statusText)
    }
  };

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm mt-8 mx-auto ">
        <div className="card-body">
          <h2 className="card-title mx-auto">{islogin ? "Login" : "SignUp"}</h2>
          <div>
            {!islogin && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Firstname</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Lastname</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
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
            <button
              className="btn btn-primary"
              onClick={islogin ? handleclick : handleSignUp}
            >
              {islogin ? "Login" : "SignUp"}
            </button>
          </div>
          <p
            className="text-center cursor-pointer underline"
            onClick={() => setLogin(!islogin)}
          >
            {islogin ? "New User? Sign up here" : "Already a User? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
