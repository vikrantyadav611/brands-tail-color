import React, { useEffect,useState } from "react";


const Button=({ children, name, color , onClicked, id_ }) =>{

  const [buttonClick, setbuttonClick] = useState(false);

  useEffect(() => {
    let timer;

    function focusListener(e){

      const hasClassCTA=Array.from(e.target.classList).some(item=>item==='cta');

      if (e && e.target && hasClassCTA) {
        
        timer=setTimeout(() => {
          document.activeElement.blur();
        }, 600);
      }
    }

   document.addEventListener("focus",focusListener,true) //true because of event bubbling since button is a child of current document

    return()=>{
      clearTimeout(timer);
      removeEventListener("focus",focusListener,true);
    }

  },[buttonClick])


  return (
    <React.Fragment>
      <button
        className={` cta py-2.5 px-5 transform hover:-translate-y-0.5 transition-all duration-150 shadow 
        outline-none hover:shadow-lg flex space-x-2 items-center bg-opacity-80 focus:ring-white focus:ring-opacity-40
        ${color} focus:ring
        focus:outline-none  rounded-lg text-white  hover:bg-opacity-90`}

        onClick={(e)=>{
          e.preventDefault();

          onClicked(id_)
          setbuttonClick(prevState=>!prevState)
        }}
        id={id_}
      >
        <span>{children}</span>
        <p>{name}</p>
      </button>
    </React.Fragment>
  );
}

export default Button;