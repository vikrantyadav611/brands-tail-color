const brands =require("../public/brands.json")
const brandColorAST =require("../public/brandColorAST.json")

const regex=/r-(.*)-/;

export const paletteGenerator = () => {
    return brands.map((brand) => {
      const rules = brandColorAST.cssRules;
  
      return {
        name: brand.name,
        colors: rules
          .filter((rule) => {
            const brandNamePattern=regex.exec(rule["selectorText"])[1];

            return brand["name"]===brandNamePattern;
          })
          .map((rule) => {
            return rule["style"]["color"];
          }),
      };
    });
  };


export const CopyToClipboard = ({text,id}) => {
    const text_to_copy = document.getElementById(id).innerText;
    
    if (!navigator.clipboard) {  // copy to clipboard pollyfill
      const textArea=document.createElement("textarea");
      textArea.style.display="hidden";
      textArea.value=text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea)
    } else {                    //copy to clipboard native API
      navigator.clipboard
        .writeText(text_to_copy)
        .then(function () {
          return true;
        })
        .catch(function () {
          return false;
        });
    }
  };