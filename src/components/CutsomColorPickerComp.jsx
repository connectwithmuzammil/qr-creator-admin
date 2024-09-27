import React, { useState, useEffect } from "react";
import ColorPickerComponent from "./ColorPicker";

const CutsomColorPickerComp = ({ colors, qrData, setQrData }) => {
  const [activeColor, setActiveColor] = useState(null); // Start with no active color
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Function to check if the color exists in predefined colors
  const findMatchingColor = () => {
    return colors.find(
      (color) =>
        color.background === qrData.color?.background &&
        color.button === qrData.color?.button
    );
  };

  useEffect(() => {
    // Check if the qrData has a color that matches predefined colors
    const matchingColor = findMatchingColor();
    if (matchingColor) {
      setActiveColor(matchingColor.id);
    } else {
      setActiveColor("custom"); // Set to custom if no predefined match
    }
  }, [qrData, colors]);

  // Handle color selection from predefined options
  const handleColorSelect = (colorId) => {
    const color = colors.find((c) => c.id === colorId);
    if (color) {
      setQrData({
        ...qrData,
        color: {
          background: color.background,
          button: color.button,
        },
      });
      setActiveColor(colorId);
    }
  };

  // Handle custom color selection from color picker
  const handleCustomColorChange = (colorType, color) => {
    setQrData({
      ...qrData,
      color: {
        ...qrData.color,
        [colorType]: color,
      },
    });
  };

  const handleColorPickerToggle = () => {
    setShowColorPicker(!showColorPicker);
    if (!showColorPicker) {
      // Set activeColor to 'custom' when opening the color picker
      setActiveColor("custom");
    }
  };

  return (
    <div
      data-testid="ThemePicker"
      data-qa="qr-pdf-theme-picker"
      className="ThemePicker"
    >
      <div className="ThemePicker__wrapper">
        <div className="ThemePicker__item ThemePicker__labels">
          <span className="ThemePicker__label ThemePicker__label--first">
            Background
          </span>
          <span className="ThemePicker__label">Button</span>
        </div>
        {colors.map((color) => (
          <div
            key={color.id}
            className={`ThemePicker__item ${
              activeColor === color.id ? "ThemePicker--active" : ""
            }`}
            onClick={() => handleColorSelect(color.id)}
            data-qa={`theme-picker-color-${color.id}-button`}
          >
            <span
              className="ThemePicker__swatch ThemePicker__swatch--first"
              style={{ backgroundColor: color.background }}
            />
            <span
              className="ThemePicker__swatch"
              style={{ backgroundColor: color.button }}
            />
          </div>
        ))}
        <div
          className="ThemePicker__item ThemePicker__item--center"
          onClick={handleColorPickerToggle}
        >
          <span className="ThemePicker__swatch">
            <div
              id="theme-picker-color-custom-button"
              className="ThemePicker__add"
              data-qa="theme-picker-color-add-button"
            >
              <div>+</div>
            </div>
          </span>
        </div>
      </div>
      {showColorPicker && (
        <div className="color-picker-con bg-custom-color">
          <ColorPickerComponent
            label="Background Color"
            color={qrData.color.background}
            setColor={(color) => handleCustomColorChange("background", color)}
          />
          <ColorPickerComponent
            label="Button Color"
            color={qrData.color.button}
            setColor={(color) => handleCustomColorChange("button", color)}
          />
        </div>
      )}
    </div>
  );
};

export default CutsomColorPickerComp;
