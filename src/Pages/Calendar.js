import { toBeRequired } from "@testing-library/jest-dom/matchers";
import React, { useState, useEffect } from "react";
import { isDOMComponent } from "react-dom/test-utils";
import styled from "styled-components";
// Importing images using require
const Drug_1 = require("../Img/Calendar/drug-1.png");
const Drug_2 = require("../Img/Calendar/drug-2.png");
const Drug_3 = require("../Img/Calendar/drug-3.png");
const Drug_4 = require("../Img/Calendar/drug-4.png");

const Delete = require("../Img/Calendar/delete.png");
const DONE = require("../Img/Calendar/done.png");
const NOT_DONE = require("../Img/Calendar/not-done.png");
// Styled component for drug container
const DrugContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 1rem;
  box-sizing: border-box;
  .title {
    font-size: 2rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }
  .calendar-list {
    overflow-x: auto;
    width: 100%;
    .calendar {
      display: flex;
      margin-bottom: 1rem;
      height: 4.875rem;
      justify-content: space-between;
      width: 100%;
      flex-wrap: nowrap;
      .date {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0 0 calc(100% / 7);
        /* width: 13%; */
        border-radius: 0.5rem;
      }
      .active {
        background-color: #007cee;
        color: #fff;
      }
      .no-active {
        background-color: #fff;
        color: #001;
        .week {
          color: #99999999;
        }
      }
      .active,
      .no-active {
        .week {
          font-size: 0.875rem;
          margin-bottom: 0.3rem;
        }
        .day {
          font-weight: bold;
          font-size: 1.75rem;
        }
      }
    }
  }

  .other {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 0.5rem;
    .title {
      font-size: 1.375rem;
      font-weight: 600;
      color: #000;
    }
    .btn {
      color: #fff;
      background-color: #007cee;
      border-radius: 0.5rem;
      font-size: 1.25rem;
      padding: 0.5rem;
      border: none;
      cursor: pointer;
    }
    .add {
      background-color: #007cee;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      font-size: 2.5rem;
      color: #fff;
      text-align: center;
      line-height: 1.8rem;
    }
  }
  .detail {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    .list {
      display: flex;
      flex-direction: column;
      .item {
        display: flex;
        padding: 1.5rem 0rem;
        box-sizing: border-box;
        border-bottom: 2px dashed #007cee;
        border-image: repeating-linear-gradient(
            to right,
            transparent,
            transparent 5px,
            /* 虚线间隔 */ #007cee 8px,
            /* 虚线颜色 */ #007cee 20px /* 虚线长度 */
          )
          1;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 5px;
          height: 5px;
          background-color: #007cee;
          border-radius: 50%;
        }
        .detail-list {
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 1rem;
          .detail-content {
            position: relative;
            .detail {
              width: 100%;
              padding: 0.8rem 0.5rem;
              box-sizing: border-box;
              border-radius: 0.5rem;
              box-shadow: 8px 11.4px 6.9px rgba(0, 0, 0, 0.035),
                64px 91px 55px rgba(0, 0, 0, 0.07);
              border: 1px solid red;
              display: flex;
              align-items: center;
              gap: 0.5rem;
              .picture {
                width: 75px;
                height: 75px;
                background-size: 100% 100%;
                background-repeat: no-repeat;
              }
              .desc {
                flex: 1;
                display: flex;
                flex-direction: column;
                font-size: 0.75rem;
                font-weight: 300;
                gap: 0.3rem;
                .drugName {
                  font-size: 1.2rem;
                  font-weight: bold;
                  margin-bottom: 0.5rem;
                }
              }
              .done {
                width: 2.4rem;
                height: 2.4rem;
                background-size: cover;
                background-repeat: no-repeat;
                cursor: pointer;
              }
            }
          
          }
            .delete {
              position: absolute;
              right: 0.5rem;
              top: -0.8rem;
              width: 1.6rem;
              height: 1.6rem;
              cursor: pointer;
              background-size: cover;
              background-repeat: no-repeat;
              background-image: url("./image/delete.svg");
            }
          }
        }
      }
    }
  }
`;
// Calendar component
const Calendar = (props) => {  
    // State variables using useState hook
  const [items, setItems] = useState(props.location.state.items);

  const [curDate, setCurDate] = useState("4");
  const [date, setDate] = useState([
    { week: "Sun", day: "1" },
    { week: "Mon", day: "2" },
    { week: "Tue", day: "3" },
    { week: "Wed", day: "4" },
    { week: "Thu", day: "5" },
    { week: "Fri", day: "6" },
    { week: "Sat", day: "7" },
    { week: "Sun", day: "8" },
    { week: "Mon", day: "9" },
    { week: "Tue", day: "10" },
    { week: "Wed", day: "11" },
    { week: "Thu", day: "12" },
    { week: "Fri", day: "13" },
    { week: "Sat", day: "14" },
    { week: "Sun", day: "15" },
  ]);

  const picObj = {
    0: Drug_4,
    1: Drug_1,
    2: Drug_2,
    3: Drug_3,
  };


  const [isManage, setIsManage] = useState(false);
  const [isDone, setIsDone] = useState(true);
  const allData = {
    3: [
      {
        startTime: "08:00",
        endTime: "09:00",
        item: [
          {
            drugName: "Ashwagandha",
            done: true,
            capsule: "450 mg 1 capsule",
            time: "8：30 am",
            id: 1,
            num: 1,
            hour: 8,
            minute: 30,
          },
        ],
      },
      
    ],
    4: [
      {
        startTime: "18:00",
        endTime: "19:00",
        item: [
          {
            drugName: "Ashwagandha",
            done: true,
            capsule: "450 mg 1 capsule",
            time: "18：30 am",
            id: 6,
            num: 6,
            hour: 18,
            minute: 30,
          },
        ],
      },
    ],
  };
  // Sample data for detail
  const [detail, setDetail] = useState([
    {
      startTime: "08:00",
      endTime: "09:00",
      item: [
        {
          drugName: "Ashwagandha",
          done: true,
          capsule: "450 mg 1 capsule",
          time: "8：30 am",
          id: 1,
          num: 1,
          hour: 8,
          minute: 30,
        },
      ],
    },
    {
      startTime: "12:00",
      endTime: "13:00",
      item: [
        {
          drugName: "Ashwagandha",
          done: true,
          capsule: "450 mg 1 capsule",
          time: "12：30 pm",
          id: 2,
          num: 2,
          hour: 12,
          minute: 30,
        },
        {
          drugName: "Ashwagandha",
          done: true,
          capsule: "450 mg 1 capsule",
          time: "18：30 pm",
          id: 3,
          num: 3,
          hour: 18,
          minute: 30,
        },
      ],
    },
    {
      startTime: "15:00",
      endTime: "18:00",
      item: [
        {
          drugName: "Ashwagandha",
          done: false,
          capsule: "450 mg 1 capsule",
          time: "18：30 am",
          id: 4,
          num: 4,
          hour: 18,
          minute: 30,
        },
      ],
    },
  ]);
// useEffect hook to update detail based on curDate
 // Update detail based on curDate
  useEffect(() => {
    setDetail(allData[curDate] ?? []);
  }, [curDate]);
// Handler to delete an item from detail
  const handleDelete = (id) => {
     // Logic to delete an item based on id
    let newDetail = detail.map((timeSlot) => ({
      ...timeSlot,
      item: timeSlot.item.filter((drug) => drug.id !== id),
    })).filter((timeSlot) => timeSlot.item.length > 0);
  
    setDetail(newDetail);
  };
// Handler to toggle the done state
  const handleDone = () => {
      setIsDone(!isDone);
  }
  
  // const handleDelete = (id) => {
  //   let newDetail = detail.filter((timeSlot) => {
  //     timeSlot.item = timeSlot.item.filter((drug) => drug.id !== id);
  //     return timeSlot.item.length > 0;
  //   });
  //   setDetail(newDetail);
  // };
  
  
  return (
    <DrugContainer>
        {/* Render the calendar and details */}
      <div className="title">Calendar</div>
      <div className="calendar-list">
        <div className="calendar">
          {date.map(({ week, day }, index) => {
            return (
              <div
                key={`${week}-${day}-${index}`}
                className={`date ${curDate === day ? "active" : "no-active"}`}
                onClick={() => {
                  setCurDate(day);
                }}
              >
                <span className="week">{week}</span>
                <span className="day">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
  {/* Render the manage button */}
      <div className="other">
        <div className="title">Today</div>
        {!isManage ? (
          <div className="btn" onClick={() => setIsManage(true)}>
            Manage
          </div>
        ) : (
          <span
            className="btn"
            style={{ backgroundColor: "red" }}
            onClick={() => setIsManage(false)}
          >
            Cancel
          </span>
        )}
  
        
      </div>
      <div className="detail">
        <div className="list">
          {/* {detail.map(({ startTime, endTime, item }, index) => { */}

              <div className="item">
                {/* <div className="timeline">
                  <div className="time">{startTime}</div>
                  <div className="vertical-line"></div>
                  <div className="time">{endTime}</div>
                </div> */}
                  {/* Render the detail-list*/}
                <div className="detail-list">
                  {items.map(
                    (item, index) => {
                      return (
                        <div
                          className="detail-content"
                          key={item.id}
                        >
                          <div className="detail">
                            <img
                              className="picture"
                              src={item.image}
                            ></img>
                            <div className="desc">
                              <div className="drugName">{item.drugName}</div>
                              <div className="capsule">{item.capsule}</div>
                              <div className="time">{item.hour + ":" + item.minute+" "+item.isAM}</div>
                            </div>
                            <div
          className="done"
          onClick={handleDone}
          style={{
            backgroundImage: `url('${isDone ? DONE : NOT_DONE}')`,
          }}
        ></div>



                          </div>
                            {/* Render the delete function */}
                          <div
                            className="delete"
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                            style={{
                              backgroundImage: `url('${Delete}')`,
                              display: isManage ? "block" : "none",
                            }}
                          ></div>
                 
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
        </div>
      </div>
    </DrugContainer>
  );
};

export default Calendar;
