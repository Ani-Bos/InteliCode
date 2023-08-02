import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
const Alert = ({ messageAlert }) => {
  return (
    <div className="message-alert-popup absolute bottom-10 right-4 bg-white rounded-lg px-4 py-3 min-w-[250px] max-w-[250px]">
      <div className="alert-header flex items-center mb-1 text-green-600">
        <FontAwesomeIcon className="icon mr-2" icon={faCommentAlt} />
        <h3 className="text-base font-medium">{messageAlert.payload.user}</h3>
      </div>
      <p className="alert-msg text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
        {messageAlert.payload.msg}
      </p>
    </div>
  );
};

export default Alert;
