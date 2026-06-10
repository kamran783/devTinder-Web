import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((con) => con.connections);
  const dispatch = useDispatch();
  const connection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/users/connections", {
        withCredentials: true,
      });

      console.log(res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    connection();
  }, []);

  return (
    <div className="mx-auto max-w-2xl text-center my-4">
      <p className="font-bold text-2xl">My connections</p>
      {connections && (
        <div className="border-black-600 text-left my-2">
          {connections.map((connection) => {
            const { _id, firstName, lastName, Image, gender, age, about } =
              connection;
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
                  <button className="btn btn-info my-3">Message</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Connections;
