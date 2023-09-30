import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
const Question_Upload = () => {
    const [titleValue, setTitleValue] = useState(""); 
    const [difficultyValue, setDifficultyValue] = useState(""); 
    const [contentValue, setContentValue] = useState(""); 
    const [testcase, setTestcase] = useState([]);
    const [testcaseValue, setTestcaseValue] = useState("");
  const [constraintValue, setConstraintValue] = useState(""); 
   const [uploadStatus, setUploadStatus] = useState(null);
  const handleSubmit = async () => {
      const requestData = {
        title: titleValue,
        difficulty: difficultyValue,
        content: contentValue,
        testcase: testcaseValue.split("\n"),
        constraint: constraintValue,
      };
      console.log(titleValue)
      console.log(difficultyValue);
      console.log(contentValue);
       console.log(constraintValue);
    console.log("hoii");
    const url = "http://localhost:5000/api/question";
    const resp = await axios.post(`${url}/addQuestion`, requestData);
    const res = resp.data;
    // console.log(await res.json());
    console.log(res);
  };
  return (
    <section className="absolute w-full h-full">
      <div
        className="absolute top-0 w-full h-full bg-gray-900"
        style={{
          backgroundImage: `url('Images/herobg.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="container mx-auto px-4 h-full mt-2">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div
              className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "5px 5px 30px rgba(0,0,0,0.2)",
                borderTop: "1px solid rgba(255,255,255,0.2)",
                borderLeft: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="rounded-t mb-0 px-6 py-6"></div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-white text-center mb-3 font-regualar">
                  <small>Upload Question Description</small>
                </div>
                <form>
                  <div className="relative w-full mb-3 mt-3">
                    <input
                      type="text"
                      name="title"
                      value={titleValue}
                      onChange={(e) => setTitleValue(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-400 text-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Title of Question"
                      style={{
                        transition: "all .15s ease",
                        background: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "3px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "5px 5px 30px rgba(0,0,0,0.2)",
                        borderTop: "1px solid rgba(255,255,255,0.2)",
                        borderLeft: "1px solid rgba(255,255,255,0.2)",
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3 mt-3">
                    <input
                      type="text"
                      name="difficulty"
                      value={difficultyValue}
                      onChange={(e) => setDifficultyValue(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-400 text-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Category of Question"
                      style={{
                        transition: "all .15s ease",
                        background: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "3px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "5px 5px 30px rgba(0,0,0,0.2)",
                        borderTop: "1px solid rgba(255,255,255,0.2)",
                        borderLeft: "1px solid rgba(255,255,255,0.2)",
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3 mt-3">
                    <textarea
                      type="text"
                      name="content"
                      value={contentValue}
                      onChange={(e) => setContentValue(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-400 text-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Question Description"
                      style={{
                        transition: "all .15s ease",
                        background: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "3px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "5px 5px 30px rgba(0,0,0,0.2)",
                        borderTop: "1px solid rgba(255,255,255,0.2)",
                        borderLeft: "1px solid rgba(255,255,255,0.2)",
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3 mt-3">
                    <textarea
                      type="text"
                      name="testcases"
                      value={testcaseValue}
                      onChange={(e) => setTestcaseValue(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-400 text-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder={`upload Testcases in this form for array [1,2,3] for string "abc"`}
                      style={{
                        transition: "all .15s ease",
                        background: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "3px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "5px 5px 30px rgba(0,0,0,0.2)",
                        borderTop: "1px solid rgba(255,255,255,0.2)",
                        borderLeft: "1px solid rgba(255,255,255,0.2)",
                      }}
                    />
                  </div>

                  
                  <div className="relative w-full mb-3 mt-3">
                    <textarea
                      type="text"
                      name="constraint"
                      value={constraintValue}
                      onChange={(e) => setConstraintValue(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-gray-400 text-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Constraints"
                      style={{
                        transition: "all .15s ease",
                        background: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "3px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "5px 5px 30px rgba(0,0,0,0.2)",
                        borderTop: "1px solid rgba(255,255,255,0.2)",
                        borderLeft: "1px solid rgba(255,255,255,0.2)",
                      }}
                    />
                  </div>

                  <div className="text-center mt-4">
                    <button
                      className="bg-green-500 
                       text-white  text-sm font-bold uppercase px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </form>
                {uploadStatus === "success" && (
                  <div className="text-green-500 mt-4 text-center">
                    Question uploaded successfully!
                  </div>
                )}
                {uploadStatus === "error" && (
                  <div className="text-red-500 mt-4 text-center">
                    Error uploading the question. Please try again.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Question_Upload;