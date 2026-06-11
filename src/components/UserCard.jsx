import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {removeUserfromFeed} from "../utils/feedSlice"
import {useDispatch, useSelector} from "react-redux"
const UserCard = ({ user }) => {
  console.log("user => ",user)
  const selector = useSelector((user) => user.feed)
  console.log(selector)
  const dispatch = useDispatch()
  const handleClick = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + id,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserfromFeed(id))
    } catch (err) {
      console.log(err.response);
    }
  };

  const {_id,firstName, lastName, Image, age, gender, about } = user;

  

  return (
    <div className="card bg-base-100 w-96 shadow-md my-2">
      <figure>
        <img src={Image} alt="userphoto" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <div className="flex">
          {age && <p>Age : {age}</p>}
          {gender && <p> Gender : {gender}</p>}
        </div>

        {about && <p>{about || "No data available"} </p>}

        <div className="card-actions justify-end">
          <button className="btn btn-secondary" onClick={()=>handleClick("intrested", _id)}>Interested</button>
          <button className="btn btn-primary" onClick={() => handleClick("ignore", _id)}>Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
