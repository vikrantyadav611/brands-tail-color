import React from "react";

export default function Pagination({ pageInfo, changeCurrentPage }) {
  const { pageNumbers, pageDetails } = pageInfo;

  return (
    <React.Fragment>
      <ul className="flex space-x-1 w-full justify-center p-2 flex-wrap">
        {pageNumbers.map((number, i) => (
          <li
            key={`${number}${i}`}
            onClick={() => changeCurrentPage(i + 1)}
            className={`cursor-pointer ${
              pageDetails["currentPage"] === i + 1
                ? "bg-gray-500 text-white"
                : ""
            } hover:bg-gray-400 hover:text-white rounded-sm px-3 py-2`}
          >
            {number + 1}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
