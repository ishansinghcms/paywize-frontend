import React, { useState } from "react";
import Modal from "../Modal/Modal";
import classes from "./style.module.css";

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={classes.dropdown}>
      <button onClick={toggleDropdown} className={classes.dropdownToggle}>
        {selectedOption ? selectedOption.label : "Select a website"}
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ul className={classes.dropdownMenu}>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={classes.dropdownItem}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default Dropdown;
