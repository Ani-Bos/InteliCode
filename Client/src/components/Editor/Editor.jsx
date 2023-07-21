import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { useEffect } from "react";
import queryString from "query-string";
import Landing from "./Landing";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Editor() {
  let location = useLocation();
  const { qid } = queryString.parse(location.search);
  const [windowinfo, setWindowinfo] = useState({
    questionName: "",
    question: "",
    category: "",
    difficulty: "",
  });
  const [testcase, setTestcase] = useState([]);
  const [result, setResult] = useState([]);
  const getQuestion = async () => {
    const url = "http://localhost:5000";
    const res = await axios.get(`${url}/api/question/getQuestion/${qid}`);
    const data = res.data;
    // console.log(data);
    setWindowinfo({
      questionName: data.questionName,
      question: data.question,
      category: data.category,
      difficulty: data.difficulty,
    });
    setTestcase(data.testcase);
    setResult(data.result);
  };
  useEffect(() => {
    getQuestion();
  }, []);

  const [sizes, setSizes] = useState(["50%", "50%"]);

  const layoutCSS = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className="h-[100vh]">
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane>
          <div>
            <div className="font-bold py-2 px-5">{windowinfo.questionName}</div>
            <div className="p-5">
              <div className="grid grid-cols-2">
                <div>
                  <span
                    className={`${
                      windowinfo.difficulty === "easy"
                        ? "bg-green-500"
                        : windowinfo.difficulty === "medium"
                        ? "bg-yellow-600"
                        : "bg-red-500"
                    } py-1 px-2 rounded-md font-bold`}
                  >
                    {windowinfo.difficulty}
                  </span>
                </div>
                <div>
                  <span className={` py-1 px-2 rounded-md font-bold`}>
                    {windowinfo.category}
                  </span>
                </div>
              </div>
              <div className="my-6">
                <div>
                  <div>
                    {" "}
                    <pre> {windowinfo.question}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Pane>
        <Pane>
          <div>
            <Landing testcase={testcase} result={result} />
          </div>
        </Pane>
      </SplitPane>
    </div>
  );
}

export default Editor;
