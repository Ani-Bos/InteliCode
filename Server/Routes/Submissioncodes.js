import express from "express";
import Rank from "../Model/Rank.js";
const router = express.Router();
const SECRET_KEY = "NOTESAPI ";
import filter from "../Middleware/Middleware.js";
router.post("/submit/:prob_id", filter, async (req, res) => {
    let userId = req.user.id;
    console.log("went into submitting codes");
    const probid = req.params.prob_id;
    console.log(probid);
  const {  langid, codes } = req.body;
  try {
      await Rank.create({
      user_id:userId,
      problem_id: probid,
      language_id: langid,
      codes_submitted: codes,
    });
    console.log("codes submitted successfully");
    res.status(200).json({
      problem_id: probid,
      language_id: langid,
      codes_submitted: codes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getcodes/:prob_id", filter, async (req, res) => {
  console.log("getting codes");
  let probid = req.params.prob_id;
  try {
    const codes = await Rank.find({ problem_id: probid });
    const arr = codes.map((e) => e.codes_submitted);
    const jsonContent = JSON.stringify(arr);
    console.log(jsonContent);
    res.status(200).send(jsonContent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
