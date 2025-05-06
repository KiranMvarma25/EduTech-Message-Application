// import GoogleOAuth from "./users/GoogleOAuth";
import UserLogIn from "./users/UserLogIn";
import UserSignUp from "./users/UserSignUp";
import { useState } from "react";

function App(){

  const [showSignup, setShowSignup] = useState(true);

  const toggleForm = () => {
    setShowSignup(prev => !prev);
  };
  
  return (
    <div className="main-container">
      <div className={`main-form-container ${showSignup ? "slide-signup" : "slide-login"}`}>
        {showSignup ? <UserSignUp /> : <UserLogIn />}
      </div>
      <button className="toggle-btn" onClick={toggleForm}>
        {showSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
      </button>
      {/* <br />
      <h3>Or login with Google</h3>
      <GoogleOAuth /> */}
    </div>
  )
}


export default App;