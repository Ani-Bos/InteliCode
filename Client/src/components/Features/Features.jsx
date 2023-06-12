import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../../hoc/hoc";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import { textVariant } from "../../Utils/Motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import "../Code/prism-vsc-dark-plus.css";
import "../Code/editor.css";
import "./Feature.css";

const codeSnippets = [
  `1  Exciting coding space
2  Some amazing UI
3  Excellent Features
`,
  `function subtract(a, b) {
  return a - b;
}

`,
  `function multiply(a, b) {
  return a * b;
}

`,
  `function divide(a, b) {
  return a / b;
}

`,
];

const Code = () => {
  const [code, setCode] = useState(codeSnippets[0]);

  return (
    <>
      <motion.div
        variants={textVariant()}
        className="Code"
        style={{
          fontFamily: '"Courier New", "Courier", monospace',
          fontSize: 12,
        }}
      >
        <p className="text-[32px] font-extrabold text-center text-white">
          Are you excited 🤩
        </p>
        <p className="mt-5 text-center text-[32px] font-semibold text-white">
          Here's Our Exciting Features 🎉
        </p>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline
          layout="1-column"
          className="vertical-timeline-custom"
        >
          {codeSnippets.map((snippet, index) => (
            <VerticalTimelineElement
              key={`code-${index}`}
              iconStyle={{
                background: "#1d1836",
                color: "#fff",
                marginTop: "-3.5rem",
              }}
              icon={<div className="code-icon">{index + 1}</div>}
              style={{
                fontFamily: '"Courier New", "Courier", monospace',
                fontSize: 12,
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              }}
              contentStyle={{
                background: "#1d1836",
                color: "#fff",
                textAlign: index % 2 === 0 ? "left" : "right",
                width: "50%",
                margin: "auto",
                display: "flex",
                flexDirection: "column", 
                alignItems: "center",
                justifyContent:"center",
                borderBottom: "none",
                padding: "0.5rem",
                margin: "2rem 1rem",
                marginTop: "4rem", 
                minWidth: "280px", 
              }}
            >
              <div className="window">
                <div className="title-bar">
                  <div className="title-buttons">
                    <div className="title-button"></div>
                    <div className="title-button"></div>
                    <div className="title-button"></div>
                  </div>
                </div>
                <div className="editor_wrap">
                  <div className="editor-container">
                    <Editor
                      value={snippet}
                      onValueChange={(code) => setCode(code)}
                      highlight={(code) => highlight(code, languages.js)}
                      padding={10}
                      style={{
                        fontFamily: '"Courier New", "Courier", monospace',
                        fontSize: 12,
                        width: "100%",
                      }}
                      className="editor"
                    />
                  </div>
                </div>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Code, "work");
