import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUserFriends,
  faCommentAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../Utils/Helper";

const Messenger = ({ setIsMessenger, sendMsg, messageList }) => {
  const [msg, setMsg] = useState("");

  const handleChangeMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMsg(msg);
      setMsg("");
    }
  };

  const handleSendMsg = () => {
    sendMsg(msg);
    setMsg("");
  };

  return (
    <div className="messenger-container absolute top-0 right-0 bg-white h-[calc(100vh-90px)] w-80 flex flex-col justify-between">
      <div className="messenger-header px-5 flex items-center justify-between my-2">
        <h3 className="text-base font-normal">Meeting details</h3>
        <FontAwesomeIcon
          className="icon cursor-pointer text-base"
          icon={faTimes}
          onClick={() => {
            setIsMessenger(false);
          }}
        />
      </div>

      <div className="messenger-header-tabs border-b border-gray-300 flex">
        <div className="tab flex items-center justify-center w-full text-gray-700">
          <FontAwesomeIcon className="icon text-base" icon={faUserFriends} />
          <p className="ml-2">People (1)</p>
        </div>
        <div className="tab active flex items-center justify-center w-full text-gray-700 border-b-2 border-green-600">
          <FontAwesomeIcon className="icon text-base" icon={faCommentAlt} />
          <p className="ml-2">Chat</p>
        </div>
      </div>

      <div className="chat-section px-5 flex-1 overflow-y-scroll">
        {messageList.map((item) => (
          <div key={item.time} className="chat-block mb-6">
            <div className="sender font-medium text-base text-gray-700">
              {item.user}{" "}
              <small className="font-normal">{formatDate(item.time)}</small>
            </div>
            <p className="msg text-base text-gray-600">{item.msg}</p>
          </div>
        ))}
      </div>

      <div className="send-msg-section px-5 border-t border-b border-gray-300 flex items-center justify-between text-gray-700">
        <input
          placeholder="Send a message to everyone"
          value={msg}
          onChange={(e) => handleChangeMsg(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          className="py-2 border-none outline-none w-4/5"
        />
        <FontAwesomeIcon
          className="icon cursor-pointer text-base hover:text-green-600"
          icon={faPaperPlane}
          onClick={handleSendMsg}
        />
      </div>
    </div>
  );
};

export default Messenger;
