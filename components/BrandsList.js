import React from "react";
import Copy from "../components/SVGS/Copy"
import Tick from "../components/SVGS/Tick";

export default function Code({
    currentPaletteList,
    codeList,
    ifFavExist,
    removeFavPalette,
    setFavPallette,
    setSVGIndex,
    handleColor,
    SVGIndex,
    colorIndex,
    setColorIndex
}) {
  return (
    <React.Fragment>
      <ul className="font-medium p-4 lg:pt-8 lg:pb-8 lg:pl-8 lg:pr-0 lg:w-4/6 text-coolGray-700 grid gap-2 grid-cols-4">
        {currentPaletteList.map((palette, i) => (
          <li
            key={`${palette["name"]}${i}`}
            className={`relative group py-2 border transition-colors duration-300 hover:shadow border-gray-200 cursor-pointer hover:border-gray-400 rounded-sm ${
              codeList.some((list) => list.includes(palette["name"]))
                ? "hover:bg-yellow-100"
                : "hover:bg-coolGray-100"
            }`}
            onClick={() => {
              // check if current onClicked pallette is in fav list or not
              if (ifFavExist(palette["name"])) {
                removeFavPalette(palette["name"]);
                return;
              }
              if (codeList.some((list) => list.includes(palette["name"]))) {
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
            <div className="flex flex-col space-y-4">
              {/* Brand Name */}
              <span className="w-auto text-center">{palette["name"]}</span>
              {/* Brand Colors (Array) */}
              <span>
                <ul className="flex md:space-x-1 justify-center p-0.5 flex-wrap">
                  {palette["colors"].map((color, in_) => (
                    <li
                      key={`${color}${in_}`}
                      className="flex justify-center items-center text-white w-14 h-7 rounded-sm mt-2"
                      style={{ background: color }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (ifFavExist(`${palette["name"]}-${in_ + 1}`)) {
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
                      {ifFavExist(`${palette["name"]}-${in_ + 1}`) && (
                        <Tick class_Name="h-5 w-5 text-white" />
                      )}
                      {SVGIndex === i &&
                        colorIndex === in_ &&
                        !ifFavExist(`${palette["name"]}-${in_ + 1}`) &&
                        !ifFavExist(palette["name"]) && <Copy />}
                    </li>
                  ))}
                </ul>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
