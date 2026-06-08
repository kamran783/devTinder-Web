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
    if (feedItems) return;

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

  return (
    <div className="flex flex-col items-center my-2">
      {feedItems &&
        feedItems.map((item, index) => <UserCard key={index} user={item} />)}
    </div>
  );
};

export default Feed;
