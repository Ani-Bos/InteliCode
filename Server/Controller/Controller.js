import { saveCallId, getCallId } from "../Model/Video.js";
// savecallID--for saving in redis database
export const saveCallIdController = async (req, res) => {
  try {
    //id and signalData from body
    const { id, signalData } = req.body;
    //saved id, signalData in redis
    console.log(id,signalData)
    let re=await saveCallId(id, signalData);
    //saved data in redis
    console.log(re)
    res.status(200).send(true);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};
//now to get callid from redis database
export const getCallIdController = async (req, res) => {
  try {
    const { id } = req.params;
    //this id will come from params /:id
    const code = await getCallId(id);
    //model function
    res.status(200).send({ code });
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};
