import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Messages from "./Messages";

const socket = io.connect("http://localhost:5001");

function App() {
  const [stream, setStream] = useState([]);

  const messagesListRef = useRef(null);

  function scrollToBottom() {
    messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
  }

  useEffect(() => {
    socket.on("dataStream", (data) => {
      console.log(data);
      setStream((stream) => [...stream, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [stream]);

  return (
    <div>
      <h1>Syook Project : Encrypted Time-Series</h1>
      <div ref={messagesListRef} className="container">
        {stream.length !== 0
          ? stream.map((messages, index) => {
              return <Messages key={index} messages={messages} index={index} />;
            })
          : "Stream empty"}
      </div>
    </div>
  );
}

export default App;
