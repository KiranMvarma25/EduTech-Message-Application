import { createSlice } from "@reduxjs/toolkit";

let initialId = JSON.parse(localStorage.getItem("User_Id")) || null;
let initialUserDetails = JSON.parse(localStorage.getItem("User_Details")) || null;


// try{
//     if(user_ID_for_initialStatus && user_Details_for_userDetails){
//         initialId = user_ID_for_initialStatus;
//         initialUserDetails = user_Details_for_userDetails;
//     }
//     else
//         console.log("Store - Error in Getting User ID or User Details");
// }

// catch(error){
//     console.log("Store - Error parsing User Details", error);
//     initialId = null;
//     initialUserDetails = []
// }

const userSlice = createSlice({
    
    name : "user",
    
    initialState : {
        userId : initialId,
        userDetails : initialUserDetails,
        userStatus : initialId ? true : false,
    },

    reducers : {
        
        userLogin : (state, action) => {
            state.userId = action.payload.userId;
            state.userDetails = action.payload.userDetails;
            state.userStatus = true;

            localStorage.setItem("User_Id", JSON.stringify(action.payload.userId));
            localStorage.setItem("User_Details", JSON.stringify(action.payload.userDetails));
        },

        userLogout : (state, action) => {
            state.userId = null;
            state.userDetails = null;
            state.userStatus = false;

            localStorage.removeItem("User_Id");
            localStorage.removeItem("User_Details");
        } 

    }

})

export default userSlice.reducer;
export const { userLogin, userLogout } = userSlice.actions;