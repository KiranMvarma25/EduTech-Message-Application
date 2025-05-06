import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function GoogleOAuth() {
    const navigate = useNavigate();

    async function handleGoogleLoginSuccess(response) {
        try{
            if(!response.credential){
                console.error("No credential received");
                return;
            }

            const decoded = jwtDecode(response.credential);
            console.log("Google User:", decoded);

            const res = await fetch("http://localhost:5380/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: response.credential }),
            });

            const data = await res.json();

            if(res.ok){
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/dashboard");
            }
            else{
                console.error("Login failed:", data.error);
            }
        } 
        catch(error){
            console.error("Error decoding JWT:", error);
        }
    }

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess} 
                onError={() => console.log("Login Failed")}
            />
        </GoogleOAuthProvider>
    );
}

export default GoogleOAuth;