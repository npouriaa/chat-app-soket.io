import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5174");

const App = () => {
  const [message, setMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_message", {
      message: message,
    });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceiveMessage(data.message);
    });
  }, [socket]);

  return (
    <div className="container">
      <div className="messages-con">
        <div className="message">
          <div className="message-content message-mine">
            <p>{message}</p>
          </div>
        </div>
        <div className="message" style={{ justifyContent: "end" }}>
          <div className="message-content message-yours">
            <p>{receiveMessage}</p>
          </div>
        </div>
      </div>
      <form className="message-input-con" action="">
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Message"
        />
        <button onClick={(e) => sendMessage(e)} type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default App;
