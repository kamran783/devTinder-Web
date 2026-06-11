import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedItems = useSelector((store) => store.feed);

  const fetchfeed = async () => {
    if (feedItems.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchfeed();
  }, []);

  if(feedItems.length === 0){
    return <h1>No users found</h1>
  }

  return (
    <div className="flex flex-col items-center my-2">
      {feedItems && <UserCard user={feedItems?.[0]} />}
    </div>
  );
};

export default Feed;
