import React from "react";
import Copy from "./SVGS/Copy";
import jsCodeBeautifier from "pretty-js";
import HighLight from "react-highlight.js";

export default function Code({ copyStatus, onCopyCode, beautifyCode }) {
  return (
    <React.Fragment>
      <div className="relative pt-6 p-4 lg:pt-7 lg:pb-7 lg:pr-0 lg:pl-0 overflow-auto lg:w-2/7">
        <button
          className="absolute focus:outline-none border border-white text-white transition-colors hover:bg-white hover:text-coolGray-700 rounded-md flex items-center space-x-1 top-0 p-1 right-0 mr-7 mt-9 lg:mr-4 lg:mt-12 cursor-pointer"
          onClick={(e) => onCopyCode(e)}
        >
          {!copyStatus["status"] && (
            <span>
              <Copy />
            </span>
          )}
          <p>{copyStatus["text"]}</p>
        </button>
        <span id="tailwindConfig">
          <HighLight language="javascript">
            {jsCodeBeautifier(
              `// tailwind.config.js \n module.exports = {theme: {extend: {colors:${beautifyCode}}}}`
            )}
          </HighLight>
        </span>
      </div>
    </React.Fragment>
  );
}
