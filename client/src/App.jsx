import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5174");

const App = () => {
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    let time = new Date();
    let currentHour = time.getHours();
    let currentMinute = time.getMinutes();
    if (message !== "") {
      let msgObj = {
        senderId: userId,
        message: message,
        time: `${currentHour}:${currentMinute}`,
      };
      await socket.emit("send_message", msgObj);
      setMessageList((list) => [...list, msgObj]);
      setMessage("");
      console.log(messageList);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setUserId(socket.id);
    });
  }, []);

  return (
    <div className="container">
      <div className="top-bar">
        <span></span>
        <p>Live chat</p>
      </div>
      <div className="messages-con">
        {messageList.map((data, index) => (
          <div
            key={index}
            className="message"
            style={{
              justifyContent: `${data.senderId === userId ? "end" : ""}`,
            }}
          >
            <div
              className={`message-content message-${
                data.senderId === userId ? "yours" : "mine"
              }`}
            >
              <p>{data.message}</p>
              <span>{data.time}</span>
            </div>
          </div>
        ))}

        {/* <div className="message"}>
          <div className="message-content message-yours">
            <p></p>
            <span></span>
          </div>
        </div> */}
      </div>
      <form className="message-input-con" action="">
        <input
          value={message}
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
