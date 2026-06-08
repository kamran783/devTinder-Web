import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setfirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [Image, setImage] = useState(user?.Image || "");
  const [error, setError] = useState("");
  const [about, setAbout] = useState(user?.about || "");
  const [sucess, setSucess] = useState(false);
  if (!user) return null;

  const saveChanges = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          Image,
          about,
        },
        { withCredentials: true },
      );
      setError("");
      
      dispatch(addUser(res.data));
      setSucess(true);
      setTimeout(() => {
        setSucess(false);
      }, 3000);
      console.log(res)
    } catch (err) {
      if (err.response.status === 400) {
        setError(err.response.data);
      }
      console.log(err.response);
    }
  };

  return (
    <>
      <div className="flex justify-center items-start gap-8 mt-8">
        <div className="card bg-base-100 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title mx-auto">Edit Profile</h2>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="number"
                className="input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                className="input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">About:</legend>
              <textarea
                className="textarea w-full"
                rows="4"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                className="input"
                value={Image}
                onChange={(e) => setImage(e.target.value)}
              />
            </fieldset>
            {error && <p className="text-red-600">{error}</p>}
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary" onClick={saveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <UserCard
          user={{
            firstName,
            lastName,
            age,
            gender,
            Image,
            about,
          }}
        />
      </div>
      <div>
        {sucess && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile updated successfully.</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
