import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Split from "react-split";
import Landing from "../Editor/Landing";
import "./Split.css";
import TopNav from "./TopNav";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import CodeEditorWindow from "../Editor/CodeEditorWindow";
import { languageOptions } from "../../Constant/LanguageOption";
import { defineTheme } from "../../Lib/DefineTheme";
import { classnames } from "../../Utils/General";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "../../Hooks/UseKeyPress";
import CustomInput from "../Editor/CustomInput";
import LanguagesDropdown from "../Editor/LanguageDropdown";
import OutputDetails from "../Editor/OutputDetails";
import OutputWindow from "../Editor/OutputWindow";
import ThemeDropdown from "../Editor/ThemeDropdwn";


const Playground = ({ testcase, result }) => {
  // const userCode = ""; // Initialize with your desired initial code value
  // const settings = {
  //   fontSize: 14, // Adjust the font size according to your preference
  // };
  const [suboutput, setsuboutput] = useState([]);
  const [consol, setConsol] = useState(false);
  const [code, setCode] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [processing1, setProcessing1] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [wrongtc, setWrongtc] = useState(-1);
  const enterPress = useKeyPress("Enter");
  const [isSubmitClick, setIsSubmitClick] = useState(false);
  const [statuscode, setStatuscode] = useState(false);
  const ctrlPress = useKeyPress("Control");
  const [wrs, setWrs] = useState(false);
  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const urlL = "https://judge0-ce.p.rapidapi.com/submissions";
  const jhost = "judge0-ce.p.rapidapi.com";
  const jkey = "fdf905e00amsh129dca5d5ef50b9p1bf6b5jsnec112dfb068c";

  const submitbuffer = async (e) => {
    console.log(e);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(e),
    };
    const options = {
      method: "POST",
      url: urlL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": jhost,
        "X-RapidAPI-Key": jkey,
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      console.log("res.data", response.data);
      const token = response.data.token;
      const res = await checkStatus(token);
      return res;
    } catch (err) {
      let error = err.response ? err.response.data : err;
      // get error status
      let status = err.response.status;
      console.log("status", status);
      if (status === 429) {
        console.log("too many requests", status);
        setStatuscode(true);
        // showErrorToast(
        //   `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
        //   10000
        // );
      }
      setProcessing1(false);
      console.log("catch block...", error);
    }
    return -1;
  };
  const handleSubmit = async () => {
    setProcessing1(true);

    // const getFile = fruit => {
    //     return suboutput[fruit];
    //     };
    setStatuscode(false);
    setIsSubmitClick(true);
    const arr = await testcase.map(async (e, i) => {
      const res = await submitbuffer(e);
      return res;
    });

    // testcase.map(async(e,i)=>{
    //   // localStorage.setItem("jjj",e);
    // submitbuffer(e);

    // })

    const arr1 = await Promise.all(arr);
    // console.log(arr1);
    // console.log(testcase,result)
    setsuboutput(arr1);

    setWrs(true);
  };
  const handleCompile = () => {
    setProcessing(true);
    setIsSubmitClick(false);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: urlL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": jhost,
        "X-RapidAPI-Key": jkey,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatusc(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);
          setStatuscode(true);
          // showErrorToast(
          //   `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
          //   10000
          // );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatusc = async (token) => {
    const options = {
      method: "GET",
      url: urlL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": jhost,
        "X-RapidAPI-Key": jkey,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatusc(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        // let arr=suboutput;
        // arr.push(response.data);
        // setsuboutput(arr);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };
  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: urlL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": jhost,
        "X-RapidAPI-Key": jkey,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;
      console.log(statusId);
      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else if (statusId === 429) {
        console.log("too many request");
        setStatuscode(true);
      } else {
        setProcessing1(false);
        // setOutputDetails();
        setOutputDetails(response.data);
        // let arr=suboutput;
        // arr.push(response.data);
        // setsuboutput(arr);
        localStorage.setItem("privatetemp", atob(response?.data?.stdout));
        localStorage.setItem("pr", atob(response?.data?.stdin));

        //  arr.push(atob(response?.data?.stdout));
        //  setsuboutput(arr);
        localStorage.setItem(token.toString(), atob(response?.data?.stdout));
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return atob(response?.data?.stdout);
      }
    } catch (err) {
      console.log("err", err);
      setProcessing1(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="flex flex-col bg-primary relative overflow-x-hidden">
      {/* <TopNav /> */}
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <div className="flex flex-row">
            <div className="px-4 py-2 ">
              <LanguagesDropdown onSelectChange={onSelectChange} />
            </div>
            <div className="px-4 py-2">
              <ThemeDropdown
                handleThemeChange={handleThemeChange}
                theme={theme}
              />
            </div>
          </div>
          <div className="flex flex-col w-full h-full justify-start items-end">
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme?.value}
            />
          </div>
        </div>
        <div className="w-full px-5 overflow-auto">
          {/* testcase heading */}
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          <div className="flex">
            (
            <div
              className="mr-2 items-start mt-2 "
              // key={example.id}
              // onClick={() => setActiveTestCaseId(index)}
            >
              <div className="flex flex-wrap items-center gap-y-4">
                <div
                  className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
									
									`}
                >
                  {/* Case {index + 1} */}
                </div>
              </div>
            </div>
            )
          </div>

          <div className="font-semibold my-4">
            <p className="text-sm font-medium mt-4 text-white">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {/* {problem.examples[activeTestCaseId].inputText} */}
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {/* {problem.examples[activeTestCaseId].outputText} */}
            </div>
          </div>
        </div>
      </Split>
      <div className="mb-16">
        <EditorFooter />
      </div>
    </div>
  );
};

export default Playground;
