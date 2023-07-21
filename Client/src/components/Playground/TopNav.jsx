import React, { useState , useEffect} from "react";
import { AiOutlineFullscreen, AiOutlineSetting } from "react-icons/ai";
import LanguagesDropdown from "../Editor/LanguageDropdown";
import ThemeDropdown from "../Editor/ThemeDropdwn";
import { languageOptions } from "../../Constant/LanguageOption";
import { defineTheme } from "../../Lib/DefineTheme";
const TopNav = () => {
  const [showSettingsTooltip, setShowSettingsTooltip] = useState(false);
  const [showFullScreenTooltip, setShowFullScreenTooltip] = useState(false);

  const toggleSettingsTooltip = () => {
    setShowSettingsTooltip(!showSettingsTooltip);
  };

  const toggleFullScreenTooltip = () => {
    setShowFullScreenTooltip(!showFullScreenTooltip);
  };

   const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
    const onSelectChange = (sl) => {
      console.log("selected Option...", sl);
      setLanguage(sl);
    };
   
   function handleThemeChange(th) {
     const theme = th;
     console.log("theme...", theme);

     if (["light", "vs-dark"].includes(theme.value)) {
       setTheme(theme);
     } else {
       defineTheme(theme.value).then((_) => setTheme(theme));
     }
   }
   useEffect(() => {
     defineTheme("oceanic-next").then((_) =>
       setTheme({ value: "oceanic-next", label: "Oceanic Next" })
     );
   }, []);

  return (
    <div className="flex items-center justify-between bg-primary-2 h-11 w-full">
      <div className="flex items-center text-white">
        <div className="px-2 py-2 ">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
        {/* <button className="flex cursor-pointer items-center rounded focus:outline-none bg-primary text-dark-label-2 hover:bg-dark-layer-1 px-2 py-1.5 font-medium">
          <div className="flex items-center px-1">
            <div className="text-xs text-label-2 dark:text-dark-label-2">
              JavaScript
            </div>
          </div>
        </button> */}
      </div>

      <div className="flex items-center m-6">
        <button
          className="preferenceBtn group mr-10"
          onClick={toggleSettingsTooltip}
        >
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            <AiOutlineSetting />
          </div>
          {showSettingsTooltip && (
            <div
              className="absolute w-auto p-2 text-sm m-2  min-w-max translate-x-3  right-0 top-5 z-10 rounded-md shadow-md
		text-dark-layer-2 bg-gray-200  origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100"
            >
              Settings
            </div>
          )}
        </button>

        <button
          className="preferenceBtn group"
          onClick={toggleFullScreenTooltip}
        >
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            <AiOutlineFullscreen />
          </div>
          {showFullScreenTooltip && (
            <div
              className="absolute w-auto p-2 text-sm m-2  min-w-max translate-x-3  right-0 top-5 z-10 rounded-md shadow-md
		text-dark-layer-2 bg-gray-200  origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100"
            >
              Full Screen
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default TopNav;
