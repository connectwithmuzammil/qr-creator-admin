import React, { useState, useEffect } from "react";

const SocialIconsComp = ({ title = "Social networks", onIconClick, icons={}, className, initialLinks = {} }) => {

  console.log("initialLinks",initialLinks)
  const [activeIcons, setActiveIcons] = useState([]);
  const [iconLinks, setIconLinks] = useState({});

  // Sync iconLinks and activeIcons with initialLinks when initialLinks change
  useEffect(() => {
    setIconLinks(initialLinks); // Update the iconLinks when initialLinks changes
    setActiveIcons(Object.keys(initialLinks)); // Activate the icons based on the initial links
  }, [initialLinks]);

  const handleIconClick = (iconName) => {
    if (activeIcons.includes(iconName)) {
      setActiveIcons(activeIcons.filter((icon) => icon !== iconName));
      setIconLinks((prevLinks) => {
        const newLinks = { ...prevLinks };
        delete newLinks[iconName];
        return newLinks;
      });
    } else {
      setActiveIcons([...activeIcons, iconName]);
    }
    if (onIconClick) onIconClick(iconName, iconLinks[iconName] || "");
  };

  const handleLinkChange = (iconName, link) => {
    setIconLinks((prevLinks) => ({
      ...prevLinks,
      [iconName]: link,
    }));
    if (onIconClick) onIconClick(iconName, link);
  };

  const handleRemoveIcon = (iconName) => {
    setActiveIcons(activeIcons.filter((icon) => icon !== iconName));
    setIconLinks((prevLinks) => {
      const newLinks = { ...prevLinks };
      delete newLinks[iconName];
      return newLinks;
    });
  };

  return (
    <>
      {activeIcons.map((iconName) => (
        <div className="input-box-wrapper-social" key={iconName}>
          <div className="wrap">
            <div className="icon-selected">{icons[iconName]}</div>
            <input
              type="text"
              placeholder={`Enter your ${iconName} link`}
              value={iconLinks[iconName] || ""}
              onChange={(e) => handleLinkChange(iconName, e.target.value)}
            />
          </div>
          <button
            className="remove-icon"
            onClick={() => handleRemoveIcon(iconName)}
          >
            -
          </button>
        </div>
      ))}
      <div className="social-con-comp">
        <ul className={`wrapper ${className}`}>
          {Object.keys(icons).map((icon) => (
            <li
              key={icon}
              className={`icon ${icon} ${activeIcons.includes(icon) ? "active" : ""}`}
              onClick={() => handleIconClick(icon)}
            >
              <span className="tooltip">
                {icon.charAt(0).toUpperCase() + icon.slice(1)}
              </span>
              {icons[icon]}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SocialIconsComp;
