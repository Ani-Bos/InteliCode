import axios from "axios";
import React, { useEffect, useState } from "react";
import { languageOptions } from "../../Constant/LanguageOption";
import { classnames } from "../../Utils/General";
import CodeEditorWindow from "./CodeEditorWindow";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useKeyPress from "../../Hooks/UseKeyPress";
import { defineTheme } from "../../Lib/DefineTheme";
import CustomInput from "./CustomInput";
import LanguagesDropdown from "./LanguageDropdown";
import OutputDetails from "./OutputDetails";
import OutputWindow from "./OutputWindow";
import ThemeDropdown from "./ThemeDropdwn";
let once = 1;
// const javascriptDefault = `/**
// * Problem: Binary Search: Search a sorted array for a target value.
// */

// // Time: O(log n)
// const binarySearch = (arr, target) => {
//  return binarySearchHelper(arr, target, 0, arr.length - 1);
// };

// const binarySearchHelper = (arr, target, start, end) => {
//  if (start > end) {
//    return false;
//  }
//  let mid = Math.floor((start + end) / 2);
//  if (arr[mid] === target) {
//    return mid;
//  }
//  if (arr[mid] < target) {
//    return binarySearchHelper(arr, target, mid + 1, end);
//  }
//  if (arr[mid] > target) {
//    return binarySearchHelper(arr, target, start, mid - 1);
//  }
// };

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const target = 5;
// console.log(binarySearch(arr, target));
// `;

const Landing = ({ testcase, result }) => {
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
    <>
      <div>
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
        <div className=" space-x-4 items-start px-4 py-4">
          <div className="flex flex-col w-full h-full justify-start items-end">
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme?.value}
            />
          </div>
          <div className="my-2">
            <button
              onClick={() => {
                setConsol(!consol);
              }}
              className="py-3 px-2 bg-blue-500 rounded-md font-bold"
            >
              Console
            </button>
          </div>
          {consol && (
            <div className="right-container flex flex-shrink-0 flex-col">
              <OutputWindow
                outputDetails={outputDetails}
                isSubmitClick={isSubmitClick}
              />
              <div className="flex flex-col items-end">
                <CustomInput
                  customInput={customInput}
                  setCustomInput={setCustomInput}
                />
                <div className="space-x-2">
                  <button
                    onClick={handleCompile}
                    disabled={!code}
                    className={classnames(
                      "mt-4 border-2 border-black z-10 rounded-md  px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                      !code ? "opacity-50" : ""
                    )}
                  >
                    {processing ? "Processing..." : "Compile and Execute"}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!code}
                    className={classnames(
                      "mt-4 border-2 border-black z-10 rounded-md  px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                      !code ? "opacity-50" : ""
                    )}
                  >
                    {processing1 ? "Processing..." : "Submit"}
                  </button>
                </div>
              </div>
              <div>
                {statuscode && <div>request limit exceeded</div>}
                {!statuscode && wrs && (
                  <>
                    <div>Result</div>
                  </>
                )}
                {!statuscode &&
                  suboutput.map((e, i) => {
                    let index = 0;
                    for (let i = e?.length - 1; i >= 0; i--) {
                      if (e[i] !== "\n" && e[i] !== " ") {
                        index = i;
                        break;
                      }
                    }
                    let mod = e?.slice(0, index + 1);
                    console.log(suboutput, result, mod);
                    if (i === 3)
                      //only three testcase visible
                      return;
                    if (mod !== result[i]) {
                      return (
                        <div className="bg-red-600 py-1 px-2 rounded-md">
                          {" "}
                          <div>Testcase {i} wrong</div>
                        </div>
                      );
                    }

                    return (
                      <div className="my-1">
                        {" "}
                        <div className="bg-green-600 py-1 px-2 rounded-md">
                          Testcase {i} correct
                        </div>{" "}
                      </div>
                    );
                  })}
                <div></div>
              </div>

              {outputDetails && <OutputDetails outputDetails={outputDetails} />}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Landing;
