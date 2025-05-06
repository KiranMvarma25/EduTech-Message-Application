import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux_store/userSlice";
import Messages from "./Messages";

function Dashboard() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userDetails = useSelector(store => store.user.userDetails);
    const userName = userDetails.name;

    function handleLogOut(){
        dispatch(userLogout());
        navigate('/');   
    }

    return (
        <div className="Dashboard">

            <div className="Header">
                <h1>Welcome - {userName}</h1>
                <button className="logOutButton" onClick={handleLogOut}>Log Out</button>
            </div>
            
            <div>
                <Messages />
            </div>
        
        </div>
    )
}

export default Dashboard;