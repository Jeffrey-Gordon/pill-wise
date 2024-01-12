import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Clock.module.css";
import { useHistory } from 'react-router-dom';
import icon_menu from "../Img/Clock/icon_menu.svg";
import clock from "../Img/Clock/clock.svg";
import add from "../Img/Clock/add.svg";
import substract from "../Img/Clock/substract.svg";

import Dropdown from "../Components/Dropdown";

const Clock = () => {
  const location = useLocation();
  const drugData = location.state?.drug;
  // const options = ["Once a day", "Twice a day", "Three times a day"];
  // An array of options to define how often the medication is taken
  const options = ["before meals", "after meals", "not oral"];

  // Use the useState Hook to define the required state for the component
  const [selectedOption, setSelectedOption] = useState(null);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [num, setNum] = useState(3);
  const [done, setDone] = useState(false);
  // const [frequency, setFrequency] = useState(options[0]);
  const [items, setItems] = useState([]);
  const [isAM, setIsAM] = useState(true);

  const handleHourChange = (e) => {
    const inputValue = e.target.value;
    if (/^[0-9]*$/.test(inputValue) && inputValue >= 0 && inputValue < 24) {
      setHour(inputValue);
    }
  };
  const handleMinuteChange = (e) => {
    const inputValue = e.target.value;
    if (/^[0-9]*$/.test(inputValue) && inputValue >= 0 && inputValue < 60) {
      setMinute(inputValue);
    }
  };

  const handleNumDecrement = () => {
    setNum(num - 1);
  };

  const handleNumIncrement = () => {
    setNum(num + 1);
  };

  const handleAM = () => {
    setIsAM(!isAM);
  }

  const history = useHistory();
// Handle the click event of adding the alarm button
  const handleAddButtonClick = () => {
    //Check if the content of the input box is empty
    if (!hour || !minute || !selectedOption) {
      // If any one is empty, display a prompt box
      alert("Please fill in all required fields.");
      return;
    }
    const newItem = {
      id: drugData.ID,
      drugName: drugData.DrugName,
      image: drugData.Image,
      hour: hour,
      minute: minute,
      num: num,
      done: done,
      isAM: isAM ? "a.m" : "p.m",
      capsule: selectedOption,
      day: 4
    };

    // Retrieve stored strings from localStorage
    const storedItems = localStorage.getItem('calendarItems');
    let items = JSON.parse(storedItems);
    // Parse the stored string into an array, if not, create an empty array
    items = items ? items : [];

    // Add newItem to the array
    items.push(newItem);

    // Convert the updated array to a string and store it back in localStorage
    localStorage.setItem('calendarItems', JSON.stringify(items));

    history.push({
      pathname: '/test',
    });

    // Clear the contents of the input box
    setHour("");
    setMinute("");
    setNum(3);
  };
  return (
    <div className={styles.Clock}>
      <div className={styles.title}>
        <Link to="/"> 
          <img className={styles.menu} src={icon_menu} width="22.8px" height="9.5px" alt="return" />
        </Link>
        <h1 className={styles.h1}>Clock</h1>
      </div>
      <div className={styles.card}>
        <img className={styles.apill} src={drugData.Image} width="119px" height="150px" alt=""/>
      </div>
      <div className={styles.content}>
        <h3 className={styles.h3}>Time</h3>
        <div className={styles.time}>
          <img width="34px" height="34px" src={clock} alt="" />
          <input
            className={styles.input}
            type="datetime"
            name=""
            id=""
            value={hour}
            onChange={handleHourChange}
            maxLength={2}
          />
          <span>:</span>
          <input
            className={styles.input}
            type="datetime"
            name=""
            id=""
            value={minute}
            onChange={handleMinuteChange}
            maxLength={2}
          />
          <span onClick={handleAM} style={{display: "transparent"}}>24h</span>
        </div>
        <h3 className={styles.h3}>Num</h3>
        <div className={styles.time}>
          <img
            width="35px"
            height="35px"
            src={substract}
            alt=""
            onClick={handleNumDecrement}
          />
          <span className={styles.n}>{num}</span>
          <img
            width="35px"
            height="35px"
            src={add}
            alt=""
            onClick={handleNumIncrement}
          />
        </div>
        <h3 className={styles.h3}>With/Without food</h3>
        <div className={`${styles.time} ${styles.fre}`}>
          <Dropdown
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
      </div>
      <button className={styles.button} onClick={handleAddButtonClick}>Add</button>
    </div>
  );
};

export default Clock;
