import React, { useState, useEffect } from "react";

const SocialIconsComp = ({
  icons = {},
  className,
  localQrData,
  setLocalQrData,
  dataKey,
}) => {
  const [activeIcons, setActiveIcons] = useState([]);

  // Sync activeIcons with the dynamic key in localQrData
  useEffect(() => {
    setActiveIcons(Object.keys(localQrData?.[dataKey] || []));
  }, [localQrData, dataKey]);

  const handleIconClick = (iconName) => {
    if (activeIcons.includes(iconName)) {
      handleRemoveIcon(iconName);
    } else {
      setActiveIcons((prev) => [...prev, iconName]);
      setLocalQrData((prevData) => ({
        ...prevData,
        [dataKey]: {
          ...prevData[dataKey],
          [iconName]: "",
        },
      }));
    }
  };

  const handleLinkChange = (iconName, link) => {
    setLocalQrData((prevData) => ({
      ...prevData,
      [dataKey]: {
        ...prevData[dataKey],
        [iconName]: link,
      },
    }));
  };

  const handleRemoveIcon = (iconName) => {
    setActiveIcons((prev) => prev.filter((icon) => icon !== iconName));
    setLocalQrData((prevData) => {
      const updatedDataKey = { ...prevData[dataKey] };
      delete updatedDataKey[iconName];
      return {
        ...prevData,
        [dataKey]: updatedDataKey,
      };
    });
  };

  return (
    <>
      {/* Render active icons with input fields */}
      {activeIcons.map((iconName) => (
        <div className={`input-box-wrapper-social ${className}`} key={iconName}>
          <div className="wrap">
            <div className="icon-selected">{icons[iconName]}</div>
            <input
              type="text"
              placeholder={`Enter your ${iconName} link`}
              value={localQrData[dataKey]?.[iconName] || ""}
              onChange={(e) => handleLinkChange(iconName, e.target.value)}
            />
          </div>
          <button
            className="remove-icon"
            onClick={() => handleRemoveIcon(iconName)}
          >
            - {/* Button to remove icon */}
          </button>
        </div>
      ))}
      <div className={`social-con-comp ${className}`}>
        <ul className="wrapper">
          {Object.keys(icons).map((icon) => (
            <li
              key={icon}
              onClick={() => handleIconClick(icon)}
              className={`icon ${icon} ${
                activeIcons.includes(icon) ? "active" : ""
              }`}
            >
              {icons[icon]}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SocialIconsComp;
