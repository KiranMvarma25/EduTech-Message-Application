import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MessagesInterface({ selectedUser }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const currentUserId = useSelector((store) => store.user.userId);

    async function fetchMessages(){
        try{
            const response = await fetch(`http://localhost:5380/message/getMessages/${currentUserId}/${selectedUser._id}`);
            const result = await response.json();

            if(result.success){
                setMessages(result.Messages);
            }
        } 
        catch(error){
            console.log("Error fetching messages:", error);
        }
    }

    async function sendMessage(){
        if(newMessage.trim() === "" || messageType === "") 
            return;

        try{
            const response = await fetch("http://localhost:5380/message/create_send_Message",{
                    method : "POST",
                    headers : {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        messageFrom : currentUserId,
                        messageTo : selectedUser._id,
                        message : newMessage,
                        messageType : messageType,
                    }),
                }
            );

            const result = await response.json();

            if(result.success){
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        messageFrom : currentUserId,
                        messageTo : selectedUser._id,
                        message : newMessage,
                        messageType : messageType,
                        messagedAt : new Date().toISOString(), 
                    },
                ]);

                setNewMessage("");
                setMessageType("");

                fetchMessages();
            }
        } 
        catch(error){
            console.log("Error sending message:", error);
        }
    }

    useEffect(() => {
        if(!selectedUser)
            return
        
        fetchMessages();

        const intervalId = setInterval(() => {
            fetchMessages();
        } ,1000);
        return () => clearInterval(intervalId);
        
    }, [selectedUser]);

    return (
        <div>
            {/* <h2>Chat with {selectedUser.name}</h2> */}

            <div
                className="chatContainer"
                style={{ border: "0px solid black", boxShadow: "2px 2px 1px", borderRadius: "5px", padding: "10px", height: "76.5vh", overflowY: "scroll", backgroundColor: "#f9f9f9" }}>

                <div className="chatMessages"  style={{ flex: 1, overflowY: "auto", padding: "0px 10px 10px 10px", }}>
                    <h2 className="chatUserName">Chatting with {selectedUser.name}</h2>
                    {messages.length > 0 ? (
                        messages.map((msg, index) => {
                            const formattedTime = new Date(msg.messagedAt).toLocaleString("en-US", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            });

                            return (
                                <p key={index} style={{ textAlign: msg.messageFrom === currentUserId ? "right" : "left", backgroundColor: msg.messageFrom === currentUserId ? "#DCF8C6" : "#ECECEC",
                                        padding: "5px", borderRadius: "5px", margin: "5px", }} >
                                    {msg.message} ({msg.messageType}) <br />
                                    <span style={{ fontSize: "12px", color: "gray" }}>{formattedTime}</span>
                                </p>
                            );
                        })
                    ) : (
                        <p>No messages yet. Start a conversation!</p>
                    )}
                </div>
                
                <div className="chatInputFixed">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..."
                        style={{ width: "60%", padding: "8px", margin: "10px 5px", borderRadius: "5px", border: "1px solid gray" }}/>

                    <select value={messageType} onChange={(e) => setMessageType(e.target.value)}
                        style={{ padding: "8px", margin: "10px 5px", borderRadius: "5px", border: "1px solid gray" }}>
                        <option value="">Select Type</option>
                        <option value="Theory">Theory</option>
                        <option value="Coding">Coding</option>
                        <option value="ProjectAssignment">Project/Assignment</option>
                    </select>

                    <button onClick={sendMessage} style={{ padding: "8px 15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }} >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MessagesInterface;