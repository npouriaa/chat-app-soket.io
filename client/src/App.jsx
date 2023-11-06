import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Input from "./components/Input";
import ChatPage from "./components/ChatPage";
const socket = io.connect("http://localhost:5174");

const App = () => {
  const [userId, setUserId] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
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
      <ChatPage messageList={messageList} userId={userId} />
      <Input socket={socket} userId={userId} setMessageList={setMessageList} />
    </div>
  );
};

export default App;
