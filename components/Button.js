import React, { useEffect, useState } from "react";

const Button = ({ children, name, color, onClicked, id_, href }) => {
  const [buttonClick, setbuttonClick] = useState(false);

  useEffect(() => {
    let timer;

    function focusListener(e) {
      const hasClassCTA = Array.from(e.target.classList).some(
        (item) => item === "cta"
      );

      if (e && e.target && hasClassCTA) {
        timer = setTimeout(() => {
          document.activeElement.blur();
        }, 600);
      }
    }

    document.addEventListener("focus", focusListener, true);

    return () => {
      clearTimeout(timer);
      removeEventListener("focus", focusListener, true);
    };
  }, [buttonClick]);

  return (
    <React.Fragment>
      <a 
      className="w-full sm:w-auto"
      href={href}
      >
        <button
          className={` cta flex justify-center py-2.5 px-5 w-full transform hover:-translate-y-0.5 transition-all duration-150 shadow 
        outline-none hover:shadow-lg  space-x-2 items-center bg-opacity-80 focus:ring-white focus:ring-opacity-40
        ${color} focus:ring
        focus:outline-none  rounded-lg text-white  hover:bg-opacity-90`}
          onClick={() => {
            onClicked(id_);
            setbuttonClick((prevState) => !prevState);
          }}
          id={id_}
        >
          <span>{children}</span>
          <p>{name}</p>
        </button>
      </a>
    </React.Fragment>
  );
};

export default Button;
