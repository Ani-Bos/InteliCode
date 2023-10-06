import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

const ProblemDescription = () => {
 const [problem, setProblem] = useState({});
  const { id } = useParams()
  const getProblemdata = async () => {
    try {
      const url = `http://localhost:5000/api/question/getQuestion/${id}`;
      const resp = await axios.get(url);
      const question = resp.data;
      setProblem(question);
    }
    catch (error) {
      console.error(error);
    }
  };
  console.log(problem);
  useEffect(() => {
    getProblemdata();
  }, []);
  return (
    <div className="bg-primary h-screen">
      <div className="flex h-11 w-full items-center pt-2 bg-primary-2 text-white overflow-x-hidden">
        <div
          className={
            "bg-primary rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"
          }
        >
          Description
        </div>

        <div
          className={
            "bg-primary rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer mx-2"
          }
        >
          Submissions
        </div>

        <div
          className={
            "bg-primary rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer mx-2"
          }
        >
          Comments
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-25px)] overflow-y-auto">
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem.title}
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div
                className={`text-olive bg-olive inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
              >
                {problem.difficulty}
              </div>
              <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                <BsCheck2Circle />
              </div>
              <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6">
                <AiFillLike />
                <span className="text-xs">120</span>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6">
                <AiFillDislike />
                <span className="text-xs">2</span>
              </div>
              <div className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 ">
                <TiStarOutline />
              </div>
            </div>

            {/* Problem Statement(paragraphs) */}
            <div className="text-white text-sm">
              <p className="mt-3">
               {problem.content}
              </p>
            </div>

            {/* Examples */}

            <div className="mt-4">
              {problem.testcase &&
                problem.testcase.map((testCase, index) => {

                  return (
                    <div key={index}>
                      <p className="font-medium text-white">
                        Test Case {index}:
                      </p>
                        <div className="example-card">
                          <pre className="text-white">
                            <strong className="text-white">Input:</strong>{" "}
                            {`[${testCase?.input}]`} <br />
                            <strong className="text-white">
                              Expected Output:
                            </strong>{" "}
                            {`[${testCase?.output}]`} <br />
                          </pre>
                        </div>
                     
                    </div>
                  );
                })}
            </div>

            {/* Constraints */}
            <div className="my-5">
              <div className="text-white text-sm font-medium">Constraints:</div>
              <ul className="text-white ml-5 list-disc">
                {problem.constraint ? (
                  problem.constraint
                    .split(";")
                    .filter((constraint) => constraint.trim() !== "")
                    .map((constraint, index) => (
                      <li key={index} className="mt-2">
                        <code>{constraint}</code>
                      </li>
                    ))
                ) : (
                  <li className="mt-2">
                    <em>No constraints provided.</em>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProblemDescription;
