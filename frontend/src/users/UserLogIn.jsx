import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux_store/userSlice";

function UserLogIn(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        email : "",
        password : ""
    });

    function handleChange(e){
        const { name, value } = e.target;
        setData(prevValue => ({
            ...prevValue,
            [name] : value,
        }));
    }

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    // let UserLoginUrl = "http://localhost:5380/base/userLogin";
    let UserLoginUrl = `${backendURL}/base/userLogin`;
    
    async function handleSubmit(e){

        e.preventDefault();

        setLoading(true);
        try{
            let response = await fetch(UserLoginUrl, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(data),
            });
            let result = await response.json();
            if(result.success){
                // alert("Log In Successful");

                dispatch(userLogin({
                    userId : result.User._id,
                    userDetails : result.User
                }));

                // localStorage.setItem("User_Details", JSON.stringify(result.User));
                // localStorage.setItem("User_Name", JSON.stringify(result.User.name));
                // localStorage.setItem("User_Email", JSON.stringify(result.User.email));
                // localStorage.setItem("User_Token", JSON.stringify(result.Token));
                // localStorage.setItem("User_Id", JSON.stringify(result.User._id));
                navigate("/dashboard");
                console.log(result);
            }
            else{
                alert("Error");
            }
        }

        catch(error){
            console.log("Error in Logging In", error);
        }

        finally{
            setLoading(false);
        }

    }



    return (
        <>
            <form onSubmit={handleSubmit} className="signup-login-form">

                <label htmlFor="email">Email</label>
                <br />
                <input className="signup-login-form-input" type="email" name="email" value={data.email} onChange={handleChange} placeholder="Enter your Email" required />

                <br />
                <br />

                <label htmlFor="password">Password</label>
                <br />
                <input className="signup-login-form-input" type="password" name="password" value={data.password} onChange={handleChange} placeholder="Enter your Password" required />

                <br />
                <br />

                <button className="signup-login-form-button" type="submit">Log In</button>

                {loading && <div className="spinner"></div>}

            </form>
        </>
    )
}


export default UserLogIn;