import React, { useState } from "react";

const Input = ({ socket, setMessageList, userId }) => {
  const [message, setMessage] = useState("");

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
    }
  };

  return (
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
  );
};

export default Input;
