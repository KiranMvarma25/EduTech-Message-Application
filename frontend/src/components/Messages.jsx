import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MessagesInterface from "./MessagesInterface";

function Messages(){
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentUserId = useSelector((store) => store.user.userId);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function getAllUsers() {
      try{
        // let response = await fetch("http://localhost:5380/base/getUsers");
        let response = await fetch(`${backendURL}/base/getUsers`);
        let result = await response.json();
        if(result.success) 
            setAllUsers(result.User);
      } 
      catch(error){
        console.log("Error fetching users:", error);
      }
    }
    getAllUsers();
  }, []);

  async function fetchAllMessages() {
    try{
      let response = await fetch(`${backendURL}/message/getAllMessages`);
      let result = await response.json();
      if(result.success) 
        setMessages(result.Messages);
      
    } 
    catch(error){
      console.log("Error fetching messages:", error);
    }
  }

  useEffect(() => {
    fetchAllMessages();
  }, []);

  const otherUsers = allUsers.filter((user) => user._id !== currentUserId);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Theory", "Coding", "ProjectAssignment"];

  const filteredCategoryUsers =
    selectedCategory === "All" ? otherUsers : otherUsers.filter((user) => {
                            const userMessages = messages.filter(msg =>
                                (msg.messageFrom === user._id || msg.messageTo === user._id) &&
                                msg.messageType === selectedCategory
                            );
                            return userMessages.length > 0;
    });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="Dashboard">

      <div className="mobileHeader">
        <button className="hamburgerBtn" onClick={toggleMobileMenu}>
          &#9776;
        </button>
      </div>

      <div className="filtersButton">
        {categories.map((category, index) => (
          <button key={index} onClick={() => setSelectedCategory(category)}
            style={{ padding: "8px", margin: "5px", borderRadius: "5px", backgroundColor: selectedCategory === category ? "#0b9e5a" : "#f9f9f9",
              color: selectedCategory === category ? "white" : "black", border: "none", cursor: "pointer", }}>
            {category}
          </button>
        ))}
      </div>

      {isMobileMenuOpen && (
        <div className="mobileModal">
          <div className="modalContent">
            <button className="closeBtn" onClick={closeMobileMenu}>X</button>
            <h3>Users</h3>
            {filteredCategoryUsers.length > 0 ? (
              filteredCategoryUsers.map((user) => (
                <div key={user._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0", borderBottom: "2px solid black" }}>
                  <h4>{user.name}</h4>
                  <button className="messageButton" onClick={() => { setSelectedUser(user); closeMobileMenu()}}>chat</button>
                </div>
              ))
            ) : (
              <p>No users found for this category.</p>
            )}
          </div>
        </div>
      )}

      <div className="messageInterface">
        
        <div className="userNames desktopOnly">
          {filteredCategoryUsers.length > 0 ? (
            filteredCategoryUsers.map((user) => (
              <div key={user._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0", borderBottom: "2px solid black" }}>
                <h3>{user.name}</h3>
                <button className="messageButton" onClick={() => setSelectedUser(user)}>chat</button>
              </div>
            ))
          ) : (
            <p>No users found for this category.</p>
          )}
        </div>

        <div className="userNamesMessages">
          {selectedUser && <MessagesInterface selectedUser={selectedUser} />}
        </div>
      </div>
    </div>
  );
}

export default Messages;