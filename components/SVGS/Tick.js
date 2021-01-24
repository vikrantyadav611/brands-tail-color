import React from "react";

export default function Tick({class_Name}) {
  return (
    <React.Fragment>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${class_Name}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </React.Fragment>
  );
}
