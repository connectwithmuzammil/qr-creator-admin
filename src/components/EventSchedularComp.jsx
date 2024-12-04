import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { InputComponent } from "./InputComponent";

const EventSchedularComp = ({ qrData, setQrData, onChangeTime, isEdit }) => {
  console.log("qrDataOnEdit",qrData)
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    qrData.event_time_timezone || moment.tz.guess()
  );
  const [timeFormat, setTimeFormat] = useState("24h"); // New state to manage time format (AM/PM or 24-hour)

  // Get all time zone names and format them with offsets
  const timeZones = moment.tz.names().map((zone) => {
    const offset = moment.tz(zone).format("Z"); // Format the offset (e.g., +05:00)
    return `${zone} (GMT${offset})`;
  });

  useEffect(() => {
    setQrData((prev) => ({
      ...prev,
      event_time_timezone: selectedTimeZone,
    }));
  }, [selectedTimeZone, setQrData]);

  const handleTimeFormatChange = (format) => {
    setTimeFormat(format);
    // You could also trigger further changes based on the format here (e.g., converting times)
  };

  const handleStartDateChange = (e) => {
    setQrData((prev) => ({
      ...prev,
      event_time_start: e.target.value,
    }));
  };

  const handleEndDateChange = (e) => {
    setQrData((prev) => ({
      ...prev,
      event_time_end: e.target.value,
    }));
  };

  const handleAllDayChange = (e) => {
    setQrData((prev) => ({
      ...prev,
      event_time_all_day: e.target.checked,
    }));
  };

  const handleTimeZoneChange = (e) => {
    setSelectedTimeZone(e.target.value);
  };

  return (
    <div className="eventScheduleComp">
      <div className="top">
        <p
          className={`time-format-option ${
            timeFormat === "am/pm" ? "active" : ""
          }`}
          onClick={() => handleTimeFormatChange("am/pm")}
        >
          AM/PM
        </p>
        <p
          className={`time-format-option ${
            timeFormat === "24h" ? "active" : ""
          }`}
          onClick={() => handleTimeFormatChange("24h")}
        >
          24 Hours
        </p>
      </div>
      <div className="bottom">
        <div className="input-con">
          <div className="input-wrap">
            <label>Start</label>
            <input
              type="date"
              value={qrData.event_time_start.split("T")[0]} 
              onChange={handleStartDateChange}
            />
          </div>
          {!isEdit && (
            <input
              type="time"
              onChange={(e) =>
                setQrData((prev) => ({
                  ...prev,
                  event_time_start: `${qrData.event_time_start.split("T")[0]}T${
                    e.target.value
                  }:00.000Z`,
                }))
              }
              // Display time based on selected format
              step={timeFormat === "am/pm" ? 60 : 1} // Adjust step depending on format
            />
          )}
        </div>
        <div className="input-con">
          <div className="input-wrap">
            <label>End</label>
            <input
              type="date"
              value={qrData.event_time_end.split("T")[0]}
              onChange={handleEndDateChange}
            />
          </div>
          {!isEdit && (
            <input
              type="time"
              onChange={(e) =>
                setQrData((prev) => ({
                  ...prev,
                  event_time_end: `${qrData.event_time_end.split("T")[0]}T${
                    e.target.value
                  }:00.000Z`,
                }))
              }
              // Display time based on selected format
              step={timeFormat === "am/pm" ? 60 : 1} // Adjust step depending on format
            />
          )}
        </div>
        <div className="timezone-con">
          <label className="label-allday">
            <input
              type="checkbox"
              checked={qrData.event_time_all_day}
              onChange={handleAllDayChange}
            />
            All day
          </label>
          <div className="timezone-main">
            <label htmlFor="timezone">Time Zone:</label>
            <select
              id="timezone"
              value={selectedTimeZone}
              onChange={handleTimeZoneChange}
            >
              {timeZones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>
        </div>
        <InputComponent
          label={"Add to calendar button text"}
          placeholder={"e.g. Add to calendar"}
          name="event_time_action_title"
          value={qrData?.event_time_action_title}
          onChange={onChangeTime}
        />
        <p className="allow-guest-txt">
          Allow guests to add your event directly to their calendars.
        </p>
      </div>
    </div>
  );
};

export default EventSchedularComp;
