const UserCard = ({user}) => {
    const{firstName, lastName,Image}=user
    
  return (
    <div className="card bg-base-100 w-96 shadow-sm mx-auto my-4">
      <figure>
        <img
          src={Image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " "}{lastName}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Intrested</button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
