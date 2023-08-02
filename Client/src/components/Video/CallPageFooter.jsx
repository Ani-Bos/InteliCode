import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faMicrophone,
  faPhone,
  faAngleUp,
  faClosedCaptioning,
  faDesktop,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

const CallPageFooter = ({
  isPresenting,
  stopScreenShare,
  screenShare,
  isAudio,
  toggleAudio,
  disconnectCall,
}) => {
  return (
    <div className="footer-item absolute bottom-0 left-0 w-full flex items-center justify-center h-20 bg-white z-10">
      <div className="left-item flex items-center h-full w-56">
        <div className="icon-block flex items-center justify-center h-full px-5">
          Meeting details
          <FontAwesomeIcon className="icon ml-2" icon={faAngleUp} />
        </div>
      </div>
      <div className="center-item flex items-center justify-center flex-1">
        <div
          className={`icon-block ${
            !isAudio ? "bg-red-500" : "bg-white"
          } border border-gray-300 w-14 h-14 rounded-full flex items-center justify-center mx-3`}
          onClick={() => toggleAudio(!isAudio)}
        >
          <FontAwesomeIcon
            className={`icon text-2xl ${
              isAudio ? "text-gray-600" : "text-white"
            }`}
            icon={isAudio ? faMicrophone : faMicrophoneSlash}
          />
        </div>
        <div
          className="icon-block bg-white border border-gray-300 w-14 h-14 rounded-full flex items-center justify-center mx-3"
          onClick={disconnectCall}
        >
          <FontAwesomeIcon
            className="icon text-red-500 text-2xl"
            icon={faPhone}
          />
        </div>
        <div className="icon-block bg-white border border-gray-300 w-14 h-14 rounded-full flex items-center justify-center mx-3">
          <FontAwesomeIcon
            className="icon text-2xl text-gray-600"
            icon={faVideo}
          />
        </div>
      </div>
      <div className="right-item flex items-center justify-end h-full w-56">
        <div
          className="icon-block flex flex-col items-center justify-center h-full w-36 text-gray-600"
          onClick={() => console.log("Turn on captions clicked")}
        >
          <FontAwesomeIcon
            className="icon text-2xl"
            icon={faClosedCaptioning}
          />
          <p className="title text-sm font-medium">Turn on captions</p>
        </div>

        {isPresenting ? (
          <div
            className="icon-block flex flex-col items-center justify-center h-full w-36 text-gray-600"
            onClick={stopScreenShare}
          >
            <FontAwesomeIcon
              className="icon text-red-500 text-2xl"
              icon={faDesktop}
            />
            <p className="title text-sm font-medium">Stop presenting</p>
          </div>
        ) : (
          <div
            className="icon-block flex flex-col items-center justify-center h-full w-36 text-gray-600"
            onClick={screenShare}
          >
            <FontAwesomeIcon
              className="icon text-red-500 text-2xl"
              icon={faDesktop}
            />
            <p className="title text-sm font-medium">Present now</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallPageFooter;
