import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

const ColorPickerComponent = ({ label, color, setColor }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="color-picker-wrapper">
      <div className="wrap">
        <label>{label}</label>
        <input type="text" value={color} readOnly />
      </div>
      <div
        className="color-box"
        style={{ backgroundColor: color }}
        onClick={() => setShowColorPicker(!showColorPicker)}
      />

      {showColorPicker && (
        <div className="color-picker-popup">
          <HexColorPicker color={color} onChange={setColor} />
        </div>
      )}
    </div>
  );
};

export default ColorPickerComponent;
