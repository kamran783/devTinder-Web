import {useSelector} from "react-redux"
import EditProfile from "./EditProfile"
const Profile = ()=>{
    const user = useSelector((u)=>u.user)
    if(!user) return;
    console.log(user)
    return (
        <div>
             <EditProfile user={user}/> 
        </div>
    )
}
export default Profile;