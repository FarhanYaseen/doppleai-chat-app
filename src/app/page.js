// "use client";

// import { useState, useEffect } from "react";
// import io from "socket.io-client";

// export default function Home() {
//   const [socket, setSocket] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, sendMessages] = useState([]);

//   useEffect(() => {
//     const newSocket = io("http://localhost:3000");
//     setSocket(newSocket);

//     return () => newSocket.close();
//   }, []);

//   const sendMessage = () => {
//     if (socket && message) {
//       socket.emit("sendMessage", message);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>WebSocket Chat</h1>
//       <div className="message-box">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("newMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      socket.emit("sendMessage", message);
      // Add the message to the local state
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  return (
    <div className="container">
      <h1>WebSocket Chat</h1>
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <div className="message-box">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
