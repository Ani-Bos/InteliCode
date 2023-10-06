import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Split from "react-split";
import "./Split.css";
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
import { useParams } from "react-router-dom";


const Playground = ({ testcase, result }) => {
  const [suboutput, setsuboutput] = useState([]);
  const [consol, setConsol] = useState(false);
  const [code, setCode] = useState("");

  const [testStatus, setTestStatus] = useState([]);
const [helper, setHelper] = useState(false)
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
  const [problem, setProblem] = useState({});
  const { id } = useParams();
  const getProblemdata = async () => {
    try {
      const url = `http://localhost:5000/api/question/getQuestion/${id}`;
      const resp = await axios.get(url);
      const question = resp.data;
      setProblem(question);
    } catch (error) {
      console.error(error);
    }
  };
  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    getProblemdata();
  }, []);
  
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
  // const jkey = "60972d1385msh9924ca6b34704eep10cf7fjsn847f8c7b32b0";
  // const jkey = "b5e72c53c1mshbe98fcc00788cbap183624jsn24b3a07843ad";
  const jkey = "fdf905e00amsh129dca5d5ef50b9p1bf6b5jsnec112dfb068c";
// async function someAsyncFunction(token) {
//   return new Promise((resolve, reject) => {
//     checkStatus(token, resolve, reject);
//   });


  const submitbuffer = async (input, expectedOutput, i) => {
    try {
      const formData = {
        language_id: language.id,
        source_code: btoa(code),
        stdin: btoa(input),
        expected_output: btoa(expectedOutput),
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

      const response = await axios.request(options);
      const token = response.data.token;

      const resok = await checkStatus(token, i);
      return resok;
    } catch (err) {
      // Handle any errors here
      console.error("Error in submitbuffer:", err);
      throw err; // Rethrow the error to be handled in the calling function
    }
  };
  // const handleSubmit = async () => {
  //   setProcessing1(true);

  //   setStatuscode(false);
  //   setIsSubmitClick(true);
  //   const arr = await testcase.map(async (e, i) => {
  //     const res = await submitbuffer(e);
  //     return res;
  //   });

  //   // testcase.map(async(e,i)=>{
  //   //   // localStorage.setItem("jjj",e);
  //   // submitbuffer(e);

  //   // })

  //   const arr1 = await Promise.all(arr);
  //   // console.log(arr1);
  //   // console.log(testcase,result)
  //   setsuboutput(arr1);

  //   setWrs(true);
  // };
const handleSubmit = async () => {
  try {
    setProcessing1(true);
    setStatuscode(false);
    setIsSubmitClick(true);

    if (!problem || !problem.testcase) {
      console.error("Problem or testcase is not defined.");
      return;
    }

    const arr = problem.testcase.map(async (test, i) => {
      const { input, output } = test;
      const res = await submitbuffer(input, output, i);
      return res;
    });

    const arr1 = await Promise.all(arr);
    console.log(arr1);
setTestStatus(arr1)
    // Handle the results as needed
    // ...

    // Set the processing flag to false
    setHelper(!helper)
    setProcessing1(false);
  } catch (error) {
    console.error("Error in handleSubmit:", error);
    // Handle any errors here
  }
};


  const handleCompile = () => {
    setProcessing(true);
    setIsSubmitClick(false);

    if (!problem || !problem.testcase) {
      console.error("Problem or testcase is not defined.");
      return;
    }
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
  const checkStatus = async (token, i) => {
    try {
      const options = {
        method: "GET",
        url: urlL + "/" + token,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "X-RapidAPI-Host": jhost,
          "X-RapidAPI-Key": jkey,
        },
      };

      const response = await axios.request(options);
      const statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        // If still processing, wait for a while and check again
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return checkStatus(token, i);
      } else if (statusId === 429) {
        console.log("Too many requests");
        setStatuscode(true);
      } else {
        // Process the response and return the data
        // ...

        // Set the processing flag to false
        setProcessing1(false);

        let correct = false;
        if (response.data.status.description === "Accepted") {
          correct = true;
        }

     

        return correct;
      }
    } catch (err) {
      // Handle any errors here
      console.error("Error in checkStatus:", err);
      setProcessing1(false);
      showErrorToast();
      throw err; // Rethrow the error to be handled in the calling function
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
            <div className="my-6">
              <button
                onClick={() => {
                  setConsol(!consol);
                }}
                className="mb-8 px-4 py-2 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-3 rounded-lg"
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
                        "mt-4 border-2 border-black z-10 rounded-lg  px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                        !code ? "opacity-50" : ""
                      )}
                    >
                      {processing ? "Processing..." : "Compile and Execute"}
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!code}
                      className={classnames(
                        "mb-8 px-4 py-2 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-3 rounded-lg",
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
                   testStatus.map((e,i) => {
                    
                
                      if (!e) {
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
                </div>

                {outputDetails && (
                  <OutputDetails outputDetails={outputDetails} />
                )}
              </div>
            )}
          </div>
        </div>
      </Split>
      <div className="mb-24"></div>
    </div>
  );
};

export default Playground;
