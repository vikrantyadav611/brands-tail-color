import React from 'react';
import Copy from './SVGS/Copy';

export default function Code({ copyStatus,onCopyCode,beautifyCode }) {
    return (
        <React.Fragment>
          <span className="pt-6 p-4 lg:pb-8 lg:pr-0 lg:pl-0 overflow-auto lg:w-2/7">
            <pre className="relative">
              <button 
              className="absolute focus:outline-none border border-white transition-colors hover:bg-white hover:text-black rounded-md flex items-center space-x-1 top-0 p-1 right-0 mr-5 mt-4 cursor-pointer"
              onClick={(e)=>onCopyCode(e)}
              >{
                !copyStatus["status"] &&
                <span>
                  <Copy/>
                </span>
                }
                <p>
                  {copyStatus["text"]}
                </p>
              </button>
              <code className="language-js" id="tailwindConfig">
                {beautifyCode}
              </code>
            </pre>
          </span>  
        </React.Fragment>
    )
}