import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faCommentAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../Utils/Helper";

const CallPageHeader = ({
  isMessenger,
  setIsMessenger,
  messageAlert,
  setMessageAlert,
}) => {
  let interval = null;
  const [currentTime, setCurrentTime] = useState(() => {
    return formatDate();
  });

  useEffect(() => {
    interval = setInterval(() => setCurrentTime(formatDate()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="frame-header flex justify-around items-center w-350 absolute top-0 right-0 bg-white rounded-r-lg overflow-hidden">
      <div className="header-items icon-block flex items-center justify-center h-50 w-1/4 border-r border-gray-200 relative">
        <FontAwesomeIcon
          className="icon text-2xl text-gray-600"
          icon={faUserFriends}
        />
      </div>
      <div
        className="header-items icon-block flex items-center justify-center h-50 w-1/4 border-r border-gray-200 relative cursor-pointer"
        onClick={() => {
          setIsMessenger(true);
          setMessageAlert({});
        }}
      >
        <FontAwesomeIcon
          className="icon text-2xl text-gray-600"
          icon={faCommentAlt}
        />
        {!isMessenger && messageAlert.alert && (
          <span className="alert-circle-icon absolute bg-green-600 w-4 h-4 rounded-full border-2 border-white top-10 right-8"></span>
        )}
      </div>
      <div className="header-items date-block flex items-center justify-center h-50 w-1/4 text-base font-normal text-gray-600 border-r border-gray-200">
        {currentTime}
      </div>
      <div className="header-items icon-block flex items-center justify-center h-50 w-1/4 cursor-pointer">
        <FontAwesomeIcon
          className="icon profile text-4xl text-green-600"
          icon={faUserCircle}
        />
      </div>
    </div>
  );
};

export default CallPageHeader;
