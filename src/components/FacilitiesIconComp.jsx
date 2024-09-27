import React, { useState } from "react";

const FacilitiesIconComp = ({ icons, onIconClick }) => {
  const [selectedIcons, setSelectedIcons] = useState([]); // Track selected icons

  const handleIconClick = (iconKey) => {
    // Toggle selection state
    setSelectedIcons((prevSelectedIcons) => {
      const isSelected = prevSelectedIcons.includes(iconKey);

      if (isSelected) {
        // Remove from selected icons
        const updatedIcons = prevSelectedIcons.filter((key) => key !== iconKey);
        onIconClick(iconKey, false); // Pass to parent that it's deselected
        return updatedIcons;
      } else {
        // Add to selected icons
        const updatedIcons = [...prevSelectedIcons, iconKey];
        onIconClick(iconKey, true); // Pass to parent that it's selected
        return updatedIcons;
      }
    });
  };

  return (
    <div className="facilities-comp">
      <ul className="wrapper">
        {Object.keys(icons).map((iconKey) => (
          <li
            key={iconKey}
            className={`icon ${selectedIcons.includes(iconKey) ? "active" : ""}`}
            onClick={() => handleIconClick(iconKey)}
          >
            <span className="tooltip">{iconKey}</span>
            {icons[iconKey]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacilitiesIconComp;
