import React, { useState, useEffect, useRef,useCallback } from "react";
import Header from "../components/Header";
import Query from "../components/Query";
import Pagination from "../components/Pagination";
import useQuery from "../components/hooks/useQuery";
import { paletteGenerator } from "../utils";
import jsBeautifier from "pretty-js";
import { CopyToClipboard } from "../utils";
import Code from "../components/Code";
import BrandList from "../components/BrandsList";
import NextHeadTag from "../components/NextHeadTag";

const regex=/(.*)-\d/; //regex to match those keywords/brand-name which hold a numeric digit at last index like algolia-1,algolia-3 etc 

export default function Home() {
  
  const [palettes, setPalettes] = useState([]);

  const [beautifyCode, setBeautifyCode] = useState("");

  const [codeList, setCodeList] = useState([]);

  const [query, setQuery] = useState(""); //brand to look for

  const [newPalettes] = useQuery(query); //return type: Array

  const [favList, setFavList] = useState([]);

  const queryRef = useRef(false);

  const [copyStatus, setCopyStatus] = useState({ status: false, text: "Copy" });

  const [pageDetails, setPageDetails] = useState({
    currentPage: 1,
    palettesPerPage: 24,
  });

  const LastpaletteIndex =
    pageDetails["palettesPerPage"] * pageDetails["currentPage"];

  const firstpaletteIndex = LastpaletteIndex - pageDetails["palettesPerPage"];

  const currentPaletteList = palettes.slice(
    firstpaletteIndex,
    LastpaletteIndex
  );
  const palettesLength = palettes.length;

  const pageNumbers = [];

  for (
    let i = 0;
    i < Math.ceil(palettesLength / pageDetails["palettesPerPage"]);
    i++
  ) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (!favList.length) {
      
      setCodeList([])
      return;
    }

    const newList = favList
      .map((list) => {
        const key = list["name"];
        const prop = list["colors"].map((color, i) => {
          if (list["colors"].length === 1) {
            return `"${key}":"${color}"`;
          } else {
            return `"${key}-${i + 1}":"${color}"`;
          }
        });

        return prop.join(",");
      })
      .join(", \n");


    setCodeList([newList]);
    
  }, [favList]);

  const handleColor = (e, { brandName, color, colorIndex }) => {
    e.stopPropagation(); //stop event bubbling
    e.preventDefault(); //disable browser's default behaviour

    if (!brandName.length && !color.length) {
      return;
    }

    if (ifFavExist(brandName)) {
      return;
    }

    setFavList((prevState) => [
      ...prevState,
      {
        name: `${brandName}-${colorIndex + 1}`,
        colors: [`${color}`],
      },
    ]);

  };

  const changeCurrentPage = (index) => {
    setPageDetails({ ...pageDetails, currentPage: index });
  };

  const setFavPallette = (name) => {
    setFavList((prevState) => [...prevState, ...name]);
  };

  useEffect(() => {
    setPalettes([...paletteGenerator()]);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageDetails["currentPage"]]);

  const removeFavPalette = (name) => {
    const removeCurrentFromFav = favList.filter((list) => list["name"] != name);
    
    setFavList(() => [...removeCurrentFromFav]);

    return;
  };

  const ifFavExist = (name,checkIndividualColor=false) => {
    if (!favList.length) {
      return;
    }
    if (!checkIndividualColor) {

      return favList.some((item) => item["name"] === name);
      
    }

      const filterDigitBasedFavList=favList.filter(item=>item["name"].match(regex))

      return filterDigitBasedFavList.some((item) =>regex.exec(item["name"])[1] === name);
  }


  useEffect(() => {
    if (!queryRef.current) {
      queryRef.current = true;
      return;
    }
    setPageDetails(prevState=>{return {...prevState, currentPage: 1}});

    setPalettes([...newPalettes]);
  }, [newPalettes]);

  const onButtonClicked = (id) => {
    if (id==="removeFav") {
      setCodeList([]);
      setFavList([]);
      return; 
    }
  };

  useEffect(() => {
    setBeautifyCode(
      jsBeautifier(
        `{${
          !codeList.length ? "//colors goes here... \n" : ""
        } ${codeList} }`
      )
    );
  }, [codeList]);

  const onCopyCode = (e) => {
    e.preventDefault();

    CopyToClipboard({
      text: beautifyCode,
      id: "tailwindConfig",
    });

    setCopyStatus((prevState) => {
      return {
        status: !prevState["status"],
        text: "Copied!",
      };
    });
  };

  useEffect(() => {
    let id;

    if (copyStatus["status"]) {
      id = setTimeout(() => {
        setCopyStatus((prevState) => {
          return {
            status: !prevState["status"],
            text: "Copy",
          };
        });
      }, 1500);
    }

    return () => {
      clearTimeout(id);
    };
  }, [copyStatus["status"]]);

  const queriedpaletteslength = newPalettes.length;

  return (
    <React.Fragment>
      {/* Head */}
      <NextHeadTag
        queryLength={query["length"]}
        queriedpaletteslength={queriedpaletteslength}
      />

      {/* Header */}
      <Header {...{
        onButtonClicked
      }
      }/>

      {/* Main */}
      <main className="font-mono">
        {/* Query Search */}
        <Query
          {...{
            query,
            setQuery,
          }}
        />
        <div className="flex flex-col lg:flex-row w-full space-x-2.5">
          {/* Pallettes List */}
          <BrandList
            {...{
              currentPaletteList,
              ifFavExist,
              removeFavPalette,
              setFavPallette,
              handleColor
            }}
          />
          {/* Code */}
          <Code {...{ copyStatus, onCopyCode, beautifyCode }} />
        </div>
        {/* pagination */}
        <Pagination
          pageInfo={{ pageNumbers, pageDetails }}
          changeCurrentPage={changeCurrentPage}
        />
      </main>
    </React.Fragment>
  );
}
