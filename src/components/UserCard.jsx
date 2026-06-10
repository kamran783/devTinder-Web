const UserCard = ({ user }) => {
  const { firstName, lastName, Image, age, gender, about } = user;
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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
