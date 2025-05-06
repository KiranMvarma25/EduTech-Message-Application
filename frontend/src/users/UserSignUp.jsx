import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux_store/userSlice";

function UserSignUp(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        name : "",
        email : "",
        password : "",
        mobile : "",
    });

    function handleChange(e){
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name] : value
        }))
    }

    let SignUpUrl = "http://localhost:5380/base/createUsers";

    async function handleSubmit(e){

        e.preventDefault();

        setLoading(true);
        try{
            let response = await fetch(SignUpUrl, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(data),
            });
            let result = await response.json();
            if(result.success){
                // alert("Successful");
                
                dispatch(userLogin({
                    userId : result.User._id,
                    userDetails : result.User
                }));

                // localStorage.setItem("user", JSON.stringify(result.User));
                navigate("/dashboard");
                console.log(result);
            }
            else{
                alert("Error");
            }
        }

        catch(error){
            console.log("Error While Signing Up", error);
        }

        finally{
            setLoading(false);
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit} className="signup-login-form">
                <label htmlFor="name">Name</label>
                <br />
                <input className="signup-login-form-input" type="text" name="name" value={data.name} onChange={handleChange} placeholder="Enter your Name" required />

                <br />
                <br />

                <label htmlFor="email">Email</label>
                <br />
                <input className="signup-login-form-input" type="email" name="email" value={data.email} onChange={handleChange} placeholder="Enter Your Email" required />

                <br />
                <br />

                <label htmlFor="password">Password</label>
                <br />
                <input className="signup-login-form-input" type="password" name="password" value={data.password} onChange={handleChange} placeholder="Enter Your Password" required />

                <br />
                <br />

                <label htmlFor="mobile">Mobile Number</label>
                <br />
                <input className="signup-login-form-input" type="number" name="mobile" value={data.mobile} onChange={handleChange} placeholder="Enter Your Mobile Number" required />

                <br />
                <br />

                <button className="signup-login-form-button" type="submit">Sign Up</button>
                {loading && <div className="spinner"></div>}

            </form>
        </>
    )
}


export default UserSignUp;