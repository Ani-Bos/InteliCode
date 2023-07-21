import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './Notes.css'

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const Notes = () => {
  const [value, setValue] = useState("");

  return (
    <div className="quill-container">
        <span className="text-center">Notes for Intelicode</span>
        <div className="quill-wrapper">
          <ReactQuill
            modules={modules}
            theme="snow"
            onChange={setValue}
            placeholder="The content starts here..."
          />
        </div>
      </div>
  );
};

export default Notes;
