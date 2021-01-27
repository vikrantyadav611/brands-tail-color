import React from "react";
import Button from "./Button";
import GithubLogo from "./SVGS/Github"
import Bug from "./SVGS/Bug"
import Dustbin from "./SVGS/Dustbin";

export default function Header({ onButtonClicked}) {
  
  return (
    <React.Fragment>
      <header className="font-mono pt-5 pb-5 px-8 h-auto flex flex-col items-center md:items-start space-y-5 md:h-40 bg-gradient-to-r from-blue-600 to-lightBlue-400">
        <div>
          <p className="text-4xl text-white border-opacity-60 font-semibold">Brands Tail Color</p>
        </div>
        <div className="flex flex-col w-full space-y-5 items-center md:items-start md:justify-between md:flex-row md:space-y-0 ">
            <span className="flex flex-col space-x-0 items-center space-y-5 md:items-start md:space-y-0 md:space-x-5 md:flex-row">
                <Button id_={"github"} href="https://github.com/vikrantyadav611/brands-tail-color" onClicked={onButtonClicked} name="View on Github" color="bg-coolGray-400" >
                    <GithubLogo size={{height:"h-6",width:"w-6"}}/>
                </Button>
                
                <Button id_={"issues"} href="https://github.com/vikrantyadav611/brands-tail-color/issues" onClicked={onButtonClicked} name="Report for Issues" color="bg-yellow-400">
                    <Bug size={{height:"h-5",width:"w-5"}}/>
                </Button>
            </span>

            <span>
                <Button id_={"removeFav"} href="javascript:void(0);" onClicked={onButtonClicked} name="Delete All" color="bg-red-500">
                    <Dustbin size={{height:"h-5",width:"w-5"}}/>
                </Button>
            </span>
        </div>
      </header>
    </React.Fragment>
  );
}
