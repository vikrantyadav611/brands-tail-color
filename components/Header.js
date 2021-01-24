import React from "react";
import Button from "./Button";
import GithubLogo from "./SVGS/Github"
import Bug from "./SVGS/Bug"
import Dustbin from "./SVGS/Dustbin";

export default function Header({ onButtonClicked}) {
  
  return (
    <React.Fragment>
      <header className="font-mono p-8 h-auto flex flex-col items-center lg:items-start space-y-5 lg:h-40 bg-gradient-to-r from-blue-600 to-lightBlue-400">
        <div>
          <p className="text-4xl text-white font-semibold">Brands Tail Color</p>
        </div>
        <div className="flex flex-col w-full space-y-5 items-center lg:items-start lg:justify-between lg:flex-row lg:space-y-0 ">
            <span className="flex space-x-5">
                <Button id_={"github"} href="https://github.com/vikrantyadav611/brands-tail-color" onClicked={onButtonClicked} name="View on Github" color="bg-coolGray-400" >
                    <GithubLogo size={{height:"h-6",width:"w-6"}}/>
                </Button>
                
                <Button id_={"issues"} href="https://github.com/vikrantyadav611/brands-tail-color/issues" onClicked={onButtonClicked} name="Report Issues or Bugs" color="bg-yellow-400">
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
