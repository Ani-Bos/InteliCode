import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

const AllProblems = () => {
  const [problems, setProblems] = useState([]);
  const [solved, setSolved] = useState("");
  const navigate = useNavigate();
  const getproblem = async () => {
     try {
       const url = "http://localhost:5000/api/question";
       const resp = await axios.get(`${url}/getallQuestions`);
       const res = resp.data;
       setProblems(res.data);
     } catch (error) {
       console.error(error);
     }
  }
  useEffect(() => {
    getproblem()
  }, [])
  
  return (
    <div>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Title of Problem
              </th>
              <th scope="col" class="px-6 py-3">
                Difficulty
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr
                key={problem._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={`/editor/${problem._id}`}>{problem.title}</Link>
                  {/* <div onClick={() => {
                    navigate(`/editor/${problem._id}`);
                  }}>{problem.title}</div> */}
                </td>
                <td className="px-6 py-4">
                  <div
                    className={`text-olive bg-olive inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
                  >
                    {problem.difficulty}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {" "}
                  {problem.solved === 0 ? "solved" : "UnSolved"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllProblems