import React, { useRef } from "react";

function Messages({ messages, index }) {
  return (
    <div className="messages-container">
      <div>
        {index + 1} . This stream has {messages.length} messages
      </div>
      <div className="messages">
        {messages.slice(0, 4).map((msg, index) => {
          const { name, origin, destination } = msg;
          return (
            <div key={index} className="message">
              <div>
                <span>Name</span> : {name}
              </div>
              <div>
                <span>Origin</span> : {origin}
              </div>
              <div>
                <span>Destination</span> : {destination}
              </div>
            </div>
          );
        })}
        <div className="remaining-messages">
          ...{messages.length - 4} items more
        </div>
      </div>
    </div>
  );
}

export default Messages;
