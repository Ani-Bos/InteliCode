import React from "react";
import Select from "react-select";
import { customStyles } from "../../Constant/CustomStyles";
import { languageOptions } from "../../Constant/LanguageOption";

const LanguagesDropdown = ({ onSelectChange }) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      styles={customStyles}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;
