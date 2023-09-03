import { useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../../Utils/ApiRequest";
import { BASE_URL, GET_CALL_ID, SAVE_CALL_ID } from "../../Utils/ApiEndPoints";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import Messenger from "./Messenger";
import MessageListReducer from "../../Reducer/MessageListRecucer";
import Alert from "./Alert";
import MeetingInfo from "./MeetingInfo";
import CallPageFooter from "./CallPageFooter";
import CallPageHeader from "./CallPageHeader";

let peer = null;
const socket = io("http://localhost:5000");
const initialState = [];

const CallPage = () => {
  // socket = io.connect();
  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id);
  //user is  admin or not
  console.log(window.location.hash);
  const isAdmin = window.location.hash === "#init" ? true : false;
  //url without hash
  const url = `${window.location.origin}${window.location.pathname}`;
  let alertTimeout = null;

  const [messageList, messageListReducer] = useReducer(
    MessageListReducer,
    initialState
  );

  const [streamObj, setStreamObj] = useState();
  const [screenCastStream, setScreenCastStream] = useState();
  const [meetInfoPopup, setMeetInfoPopup] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);
  const [isMessenger, setIsMessenger] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const [isAudio, setIsAudio] = useState(true);
  // const [peer, setPeer] = useState(null);

  // Declare the socket variable using useState hook
  // const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (isAdmin) {
      setMeetInfoPopup(true);
    }
    initWebRTC();

    // const socket = io.connect(process.env.REACT_APP_SOCKET_URL);
    // setSocket(newSocket);
    socket.on("code", (data) => {
      if (data.url === url) {
        peer.signal(data.code);
        console.log("finally socket is on")
      }
    });
    // Clean up the socket connection when the component unmounts
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  //if user is not admin
  const getRecieverCode = async () => {
    const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
    console.log(response);
    if (response.code) {
      peer.signal(response.code);
    }
  };

  const initWebRTC = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setStreamObj(stream);
        console.log(stream);
        peer = new Peer({
          initiator: isAdmin,
          trickle: false,
          stream: stream,
        });
        console.log("peer : " + peer);

        if (!isAdmin) {
          getRecieverCode();
        }
        peer.on("stream", (stream) => {
          // got remote video stream, now let's show it in a video tag
          let video = document.querySelector("#webrtcvideo");
          console.log("video : " + video);
          console.log(stream);
          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream); // for older browsers
          }

          video.play();
        });
        // Only one event listener for "stream" is needed
        // peer.on("stream", (remoteStream) => {
        //   // got remote video stream, now let's show it in a video tag
        //   let video = document.querySelector("#webrtcvideo");
        //   console.log("video: " + video);
        //   console.log(remoteStream);
        //   // Use srcObject property if supported
        //   if ("srcObject" in video) {
        //     video.srcObject = remoteStream;
        //   } else {
        //     // Fallback for older browsers (not recommended for modern browsers)
        //     video.src = window.URL.createObjectURL(remoteStream);
        //   }
        //   video.play();
        // });
        peer.on("signal", async (data) => {
          if (isAdmin) {
            let payload = {
              id,
              signalData: data,
            };
            console.log("anikey");
            await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, payload);
            // console.log("hi"+ res)
          } else {
            socket.emit("code", { code: data, url }, (cbData) => {
              console.log("code sent");
            });
          }
        });
        peer.on("connect", () => {
          // wait for 'connect' event before using the data channel
          console.log("connected");
        });
        peer.on("data", (data) => {
          clearTimeout(alertTimeout);
          messageListReducer({
            type: "addMessage",
            payload: {
              user: "other",
              msg: data.toString(),
              time: Date.now(),
            },
          });
          setMessageAlert({
            alert: true,
            isPopup: true,
            payload: {
              user: "other",
              msg: data.toString(),
            },
          });

          alertTimeout = setTimeout(() => {
            setMessageAlert({
              ...messageAlert,
              isPopup: false,
              payload: {},
            });
          }, 10000);
        });
        peer.on("stream", (stream) => {
          // got remote video stream, now let's show it in a video tag
          let video = document.querySelector("#webrtcvideo");
          console.log("video : " + video);
          console.log(stream);
          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream); // for older browsers
          }

          video.play();
        });
      })
      .catch(() => {});
  };
  // const initWebRTC = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({
  //       video: true,
  //       audio: true,
  //     })
  //     .then((stream) => {
  //       setStreamObj(stream);

  //       peer = new Peer({
  //         initiator: isAdmin,
  //         trickle: false,
  //         stream: stream,
  //       });

  //       if (!isAdmin) {
  //         getRecieverCode();
  //       }

  //       peer.on("signal", async (data) => {
  //         if (isAdmin) {
  //           let payload = {
  //             id,
  //             signalData: data,
  //           };
  //           await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, payload);
  //           // console.log("hi" + res);
  //         } else {
  //           socket.emit("code", { code: data, url }, (cbData) => {
  //             console.log("code sent");
  //           });
  //         }
  //       });

  //       peer.on("connect", () => {
  //         // wait for 'connect' event before using the data channel
  //       });

  //       peer.on("data", (data) => {
  //         clearTimeout(alertTimeout);
  //         messageListReducer({
  //           type: "addMessage",
  //           payload: {
  //             user: "other",
  //             msg: data.toString(),
  //             time: Date.now(),
  //           },
  //         });
  //         setMessageAlert({
  //           alert: true,
  //           isPopup: true,
  //           payload: {
  //             user: "other",
  //             msg: data.toString(),
  //           },
  //         });
  //         alertTimeout = setTimeout(() => {
  //           setMessageAlert({
  //             ...messageAlert,
  //             isPopup: false,
  //             payload: {},
  //           });
  //         }, 10000);
  //       });
  //       peer.on("stream", (stream) => {
  //         // got remote video stream, now let's show it in a video tag
  //         let video = document.querySelector("#webrtcvideo");
  //         if ("srcObject" in video) {
  //           video.srcObject = stream;
  //         } else {
  //           video.src = window.URL.createObjectURL(stream); // for older browsers
  //         }
  //         video.play();
  //       });
  //     })
  //     .catch(() => {});
  // };

  const sendMsg = (msg) => {
    peer.send(msg);
    messageListReducer({
      type: "addMessage",
      payload: {
        user: "you",
        msg: msg,
        time: Date.now(),
      },
    });
  };

  const screenShare = () => {
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        peer.replaceTrack(
          streamObj.getVideoTracks()[0],
          screenStream.getVideoTracks()[0],
          streamObj
        );
        setScreenCastStream(screenStream);
        screenStream.getTracks()[0].onended = () => {
          peer.replaceTrack(
            screenStream.getVideoTracks()[0],
            streamObj.getVideoTracks()[0],
            streamObj
          );
        };
        setIsPresenting(true);
      });
  };

  const stopScreenShare = () => {
    screenCastStream.getVideoTracks().forEach(function (track) {
      track.stop();
    });
    peer.replaceTrack(
      screenCastStream.getVideoTracks()[0],
      streamObj.getVideoTracks()[0],
      streamObj
    );
    setIsPresenting(false);
  };

  const toggleAudio = (value) => {
    streamObj.getAudioTracks()[0].enabled = value;
    setIsAudio(value);
  };

  const disconnectCall = () => {
    peer.destroy();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="callpage-container">
      <video
        className="h-screen w-full object-cover absolute z-[-1]"
        src=""
        autoPlay=''
        id="webrtcvideo"
      ></video>
      <CallPageHeader
        isMessenger={isMessenger}
        setIsMessenger={setIsMessenger}
        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
      />
      <CallPageFooter
        isPresenting={isPresenting}
        stopScreenShare={stopScreenShare}
        screenShare={screenShare}
        isAudio={isAudio}
        toggleAudio={toggleAudio}
        disconnectCall={disconnectCall}
      />
      {isAdmin && meetInfoPopup && (
        <MeetingInfo setMeetInfoPopup={setMeetInfoPopup} url={url} />
      )}
      {isMessenger ? (
        <Messenger
          setIsMessenger={setIsMessenger}
          sendMsg={sendMsg}
          messageList={messageList}
        />
      ) : (
        messageAlert.isPopup && <Alert messageAlert={messageAlert} />
      )}
    </div>
  );
};
export default CallPage;
