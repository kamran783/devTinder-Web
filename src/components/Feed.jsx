import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
const Feed = () => {
  const dispatch = useDispatch();
  const feedItems = useSelector((item) => item.feed);
  const fetchfeed = async () => {
    if (feedItems) return;
    try{let res = await axios.get(BASE_URL + "/user/feed", {
      withCredentials: true,
    });
    dispatch(addFeed(res.data));
    console.log(res.data);}catch(err){
      console.log(err)
    }
  };

  useEffect(() => {
    fetchfeed();
  }, []);
  return (
    <div>
      {feedItems && feedItems.map((item, index)=>{
        return (
          <div key={index}><UserCard user={item}/></div>
        )
      })}
    </div>
  )
};
export default Feed;
