import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import select from "../Img/Dropdown/select.svg";

//Drop-down menu component
// options - An array of drop-down options
// selectedOption - The currently selected option
// setSelectedOption - Sets the callback function for the selected option
const Dropdown = ({ options, selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownmenu}>
      {/* Displays the currently selected options */}
      <span className={styles.span}>{selectedOption ? selectedOption : "Select an option"}</span>
      {/* The drop-down arrow icon, click to switch the drop-down menu display status */}
      <img
        src={select}
        alt=""
        className={styles.dropdowntoggle}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        // Drop-down menu options list
        <ul className={styles.dropdownlist}>
          {options.map((option, index) => (
            // The handleSelectOption function is triggered when the option is clicked
            <li key={index} onClick={() => handleSelectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
