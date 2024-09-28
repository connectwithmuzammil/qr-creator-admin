import React, { useState, useEffect } from "react";

const FacilitiesIconComp = ({ icons, onIconClick, initialSelectedIcons }) => {
  const [selectedIcons, setSelectedIcons] = useState([]); // Track selected icons

  useEffect(() => {
    // Initialize selected icons from props when component mounts
    const initializedIcons = initialSelectedIcons 
      ? Object.keys(initialSelectedIcons).filter(key => initialSelectedIcons[key]) 
      : [];
    setSelectedIcons(initializedIcons);
  }, [initialSelectedIcons]);

  const handleIconClick = (iconKey) => {
    // Toggle selection state
    setSelectedIcons((prevSelectedIcons) => {
      const isSelected = prevSelectedIcons.includes(iconKey);

      if (isSelected) {
        // Remove from selected icons
        const updatedIcons = prevSelectedIcons.filter((key) => key !== iconKey);
        onIconClick(iconKey, false); // Notify parent that it's deselected
        return updatedIcons;
      } else {
        // Add to selected icons
        const updatedIcons = [...prevSelectedIcons, iconKey];
        onIconClick(iconKey, true); // Notify parent that it's selected
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
