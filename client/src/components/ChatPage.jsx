import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatPage = ({ messageList, userId }) => {
  return (
    <ScrollToBottom className="messages-con">

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
              data.senderId === userId ? "you" : "other"
            }`}
          >
            <p>{data.message}</p>
            <span>{data.time}</span>
          </div>
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default ChatPage;
