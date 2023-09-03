import { saveCallId, getCallId } from "../Model/Video.js";
// savecallID--for saving in redis database
export const saveCallIdController = async (req, res) => {
  try {
    //id and signalData from body
    console.log("enterring into saveControllerId")
    const { id, signalData } = req.body;
    //saved id, signalData in redis
    console.log("id is" + id);
    console.log("signal data is" + signalData);
    // const signalType = signalData.type;
    // const sdpData = signalData.sdp;
    // console.log("Signal Type:", signalType);
    // console.log("SDP Data:", sdpData);
    await saveCallId(id, signalData);
    //saved data in redis
    console.log("result in saveIdController is " + saveCallId(id,signalData));
    res.status(200).send(true);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};
//now to get callid from redis database
export const getCallIdController = async (req, res) => {
  try {
    console.log("enterring into getControllerId");
    const { id } = req.params;
    console.log("id" + id);
    //this id will come from params /:id
    const code = await getCallId(id);
    console.log("code in saveIdController is " + { code });
    //model function
    res.status(200).send({ code });
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};
