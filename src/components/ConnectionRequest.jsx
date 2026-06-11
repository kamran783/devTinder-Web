import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addReqConnection, removeRequest } from "../utils/requestsSlice";
import axios from "axios";
const ConnectionRequest = () => {
  const connections = useSelector((con) => con.Requests);
  console.log(connections.length)
  const dispatch = useDispatch();

  const requests = async () => {
    try {
      const req = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      console.log(req.data.data);
      dispatch(addReqConnection(req.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewReq = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  useEffect(() => {
    requests();
  }, []);

  if (connections.length === 0) {
    return (
      <h1 className="font-bold mt-4 mx-auto text-center">
        No connection requests found
      </h1>
    );
  }

  return (
    <div className="mx-auto max-w-2xl text-center my-4">
      <p className="font-bold text-2xl">Connection Requests</p>
      {connections && (
        <div className="border-black-600 text-left my-2">
          {connections.map((connection) => {
            const { _id, firstName, lastName, Image, gender, age, about } =
              connection.sender;
            return (
              <div
                className="my-2  p-4 flex shadow-lg rounded-lg overflow-hidden"
                key={_id}
              >
                <div className="w-1/3 flex-shrink-0">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={Image}
                    alt="profile-photo"
                  />
                </div>
                <div className="ml-2">
                  <p className="text-2xl font-semibold my-2">
                    {firstName + " " + lastName}
                  </p>
                  {age && gender && (
                    <p className="my-2">{age + ", " + gender}</p>
                  )}
                  <p>{about}</p>
                  <button
                    className="btn btn-secondary mx-2 mt-2"
                    onClick={() => reviewReq("accepted", connection._id)}
                  >
                    Accepted
                  </button>
                  <button
                    className="btn btn-accent mt-2"
                    onClick={() => reviewReq("rejected", connection._id)}
                  >
                    Ignore
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ConnectionRequest;
