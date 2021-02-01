import React, { useState } from "react";
import Copy from "../components/SVGS/Copy";
import Tick from "../components/SVGS/Tick";

export default function Code({
  currentPaletteList,
  ifFavExist,
  removeFavPalette,
  setFavPallette,
  handleColor
}) {
  const [SVGIndex, setSVGIndex] = useState(null);

  const [colorIndex, setColorIndex] = useState(null);

  return (
    <React.Fragment>
      <ul className="font-medium p-4 lg:pt-7 lg:pb-7 lg:pl-7 lg:pr-0 lg:w-4/6 text-coolGray-800 grid gap-1 sm:gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {currentPaletteList.map((palette, i) => (
          <li
            key={`${palette["name"]}${i}`}
            className={`relative group  py-2 border hover:shadow border-gray-200
            
            ${!ifFavExist(palette["name"],true)?"cursor-pointer":"cursor-not-allowed"}              
            
            hover:border-gray-400  hover:bg-gray-100 rounded-sm`}          

            onClick={() => {
              // check if current onClicked pallette is in fav list or not
              if (ifFavExist(palette["name"])) {
                removeFavPalette(palette["name"]);
                return;
              }
              if (ifFavExist(palette["name"],true)) {
                return;
              }
              setFavPallette([palette]);
            }}
            onMouseEnter={() => setSVGIndex(i)}
            onMouseLeave={() => setSVGIndex(null)}
          >
            {ifFavExist(palette["name"]) && (
              <span className="absolute top-0 right-0">
                <Tick class_Name="h-5 w-5 text-green-500 border-l border-b border-gray-200 group-hover:border-gray-400" />
              </span>
            )}
            <div className="flex flex-col space-y-4 p-0.5">
              {/* Brand Name */}
              <div className="text-center"> <p className="lineclamp"> {palette["name"]} </p></div>
              {/* Brand Colors (Array) */}
                <ul className="flex space-x-1 justify-center flex-wrap">
                  {palette["colors"].map((color, in_) => (
                    <li
                      key={`${color}${in_}`}
                      className={`flex justify-center items-center text-white w-14 h-7 ${in_===0?"ml-1":""} rounded-sm mt-2 ${ifFavExist(palette["name"])?"cursor-not-allowed":"cursor-pointer"}`}
                      style={{ background: color }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          ifFavExist(
                            `${palette["name"]}-${in_ + 1}`
                          )
                        ) {
                          removeFavPalette(`${palette["name"]}-${in_ + 1}`);
                          return;
                        }
                        handleColor(e, {
                          brandName: palette["name"],
                          color: color,
                          colorIndex: in_,
                        });
                      }}
                      onMouseEnter={() => setColorIndex(in_)}
                      onMouseLeave={() => setColorIndex(null)}
                    >
                      {ifFavExist(
                        `${palette["name"]}-${in_ + 1}`
                      ) && <Tick class_Name="h-5 w-5 text-white" />}
                      {SVGIndex === i &&
                        colorIndex === in_ &&
                        !ifFavExist(
                          `${palette["name"]}-${in_ + 1}`
                        ) &&
                        !ifFavExist(palette["name"]) && <Copy />}
                    </li>
                  ))}
                </ul>
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
