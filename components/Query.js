import React, { useEffect, useRef } from "react";

export default function Query({ query, setQuery }) {
  const inputRef = useRef(null);

  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  useEffect(() => {
    function handleKeyEvent(event) {
      const isSearchKeyPressed =
        event.keyCode === 27 ||
        event.key === "Escape" ||  //Escape Key
        event.key === "/" ||  // "/" Key
        ((event.ctrlKey || event.metaKey) &&
          (event.keyCode === 75 || event.key === "k"));  //ctrl+k Key

      if (!isSearchKeyPressed) {
        return;
      }

      if (document.activeElement != inputRef.current) {
        event.preventDefault();

        inputRef.current.focus();
      } else if (event.keyCode === 27 || event.key === "Escape") {
        event.preventDefault();
        setQuery("");
      }
    }
    document.addEventListener("keydown", handleKeyEvent);

    return () => document.removeEventListener("keydown", handleKeyEvent);
  }, [query]);

  return (
    <React.Fragment>
      <form className="sticky top-0 flex items-center bg-white  px-8 shadow z-50" onSubmit={(e)=>e.preventDefault()}>
        <div className="relative w-full h-full">
          <input
            className="h-full w-full py-5 px-10 text-lg placeholder-gray-400 focus:placeholder-gray-300 text-coolGray-600 tracking-tighter focus:outline-none"
            ref={inputRef}
            placeholder={`Search (Press "/" to focus)`}
            type="text"
            value={query}
            onChange={(e) => handleChange(e)}
          />
          <span className="absolute top-4 left-0">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
      </form>
    </React.Fragment>
  );
}
