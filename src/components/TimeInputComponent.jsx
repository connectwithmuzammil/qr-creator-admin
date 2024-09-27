import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const TimeInputComponent = ({ onTimeDataChange, is24HourFormat, setIs24HourFormat }) => {
  const [timeData, setTimeData] = useState({
    Monday: [{ from: "", to: "", enabled: false }],
    Tuesday: [{ from: "", to: "", enabled: false }],
    Wednesday: [{ from: "", to: "", enabled: false }],
    Thursday: [{ from: "", to: "", enabled: false }],
    Friday: [{ from: "", to: "", enabled: false }],
    Saturday: [{ from: "", to: "", enabled: false }],
    Sunday: [{ from: "", to: "", enabled: false }],
  });

  useEffect(() => {
    onTimeDataChange(timeData);
  }, [timeData, is24HourFormat]);

  const toggleTimeFormat = () => {
    setIs24HourFormat((prev) => !prev);
  };

  const handleCheckboxChange = (day) => {
    const updatedDayTimes = timeData[day].map((timeSlot) => ({
      ...timeSlot,
      enabled: !timeSlot.enabled,
    }));
    setTimeData((prevData) => ({
      ...prevData,
      [day]: updatedDayTimes,
    }));
  };

  const handleTimeChange = (day, index, field, value) => {
    const updatedDayTimes = [...timeData[day]];
    updatedDayTimes[index][field] = value;
    setTimeData((prevData) => ({
      ...prevData,
      [day]: updatedDayTimes,
    }));
  };

  const addTimeSlot = (day) => {
    if (!timeData[day][0].enabled) {
      return;
    }
    setTimeData((prevData) => ({
      ...prevData,
      [day]: [
        ...prevData[day],
        { from: "", to: "", enabled: prevData[day][0].enabled },
      ],
    }));
  };

  const removeTimeSlot = (day, index) => {
    const updatedDayTimes = timeData[day].filter((_, i) => i !== index);
    setTimeData((prevData) => ({
      ...prevData,
      [day]: updatedDayTimes,
    }));
  };

  return (
    <div className="time-input-component">
      <div className="time-format-toggle">
        <button
          className={!is24HourFormat ? "active" : ""}
          onClick={() => setIs24HourFormat(false)}
        >
          AM/PM
        </button>
        <button
          className={is24HourFormat ? "active" : ""}
          onClick={() => setIs24HourFormat(true)}
        >
          24 HOURS
        </button>
      </div>

      <div className="days-time-wrapper">
        {Object.keys(timeData).map((day) => (
          <div key={day} className="day-row">
            <label>
              <input
                type="checkbox"
                checked={timeData[day][0].enabled}
                onChange={() => handleCheckboxChange(day)}
              />
              {day}
            </label>
            <div className="time-slots-container">
              {timeData[day].map((timeSlot, index) => (
                <div key={index} className="time-slot">
                  <div className="time-slot-wrap">
                    <input
                      type="time"
                      value={timeSlot.from}
                      onChange={(e) =>
                        handleTimeChange(day, index, "from", e.target.value)
                      }
                      disabled={!timeSlot.enabled}
                    />
                    <input
                      type="time"
                      value={timeSlot.to}
                      onChange={(e) =>
                        handleTimeChange(day, index, "to", e.target.value)
                      }
                      disabled={!timeSlot.enabled}
                    />
                    {index === 0 && (
                      <button
                        onClick={() => addTimeSlot(day)}
                        className="add-btn"
                        disabled={!timeData[day][0].enabled}
                      >
                        <FaPlus />
                      </button>
                    )}
                    {index > 0 && (
                      <button
                        onClick={() => removeTimeSlot(day, index)}
                        className="remove-btn"
                      >
                        <FaTrash color={"#e0201c"} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeInputComponent;
