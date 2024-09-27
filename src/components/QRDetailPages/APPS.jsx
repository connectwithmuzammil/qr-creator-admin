import React, { useState } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";
import { AccordianComponent } from "../AccordianComponent";
import { InputComponent } from "../InputComponent";
import CutsomColorPickerComp from "../CutsomColorPickerComp";
import {
  GooglePlaySocial,
  AmazonSocial,
  AppStoreSocial,
} from "../../Helper/SocialSvgIcons";
import SocialIconsComp from "../SocialIconComp";
import ImageUploadComponent from "../ImageUploadComp";

const colors = [
  { id: "blue", background: "#d1e5fa", button: "#1466b8" },
  { id: "green", background: "#e8fce8", button: "#0e8b70" },
  { id: "yellow", background: "#fff9cc", button: "#998600" },
  { id: "red", background: "#fecdd6", button: "#b00223" },
];

const icons = {
  googlePlay: <GooglePlaySocial />,
  appStore: <AppStoreSocial />,
  amazon: <AmazonSocial />,
};

const APPS = ({ qrData, setQrData }) => {
  const handleImageUpload = (image) => {
    console.log("Image uploaded:", image);
  };

  const handleImageDelete = () => {
    console.log("Image deleted");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQrData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="app-page">
      <div className="containerr">
        <div className="left">
          <AccordianComponent title={"Enter the name of your QR code"}>
            <InputComponent
              placeholder="e.g My QR code"
              onChange={handleInputChange}
              name="qr_name"
              value={qrData.qr_name}
            />
          </AccordianComponent>
          <AccordianComponent title={"Choose your design"}>
            <CutsomColorPickerComp
              colors={colors}
              qrData={qrData}
              setQrData={setQrData}
            />
          </AccordianComponent>
          <AccordianComponent title={"App information"}>
            <ImageUploadComponent
              defaultImage={"/assets/images/default-img.png"}
              onImageUpload={handleImageUpload}
              onImageDelete={handleImageDelete}
              label="Logo"
            />
            <InputComponent
              label={"App name*"}
              placeholder={"e.g. FitnessNow"}
              name={"app_name"}
              value={qrData?.app_name}
              onChange={handleInputChange}
            />
            <InputComponent
              label={"Developer/Company"}
              placeholder={"e.g. App Developer PRO"}
              name={"app_company"}
              value={qrData?.app_company}
              onChange={handleInputChange}
            />
            <InputComponent
              label={"Description"}
              placeholder={"e.g. The only fitness app you need"}
              name={"app_description"}
              value={qrData?.app_description}
              onChange={handleInputChange}
            />
            <InputComponent
              label={"Website"}
              placeholder={"e.g. https://www.fitnessnow.com"}
              name={"app_website"}
              value={qrData?.app_website}
              onChange={handleInputChange}
            />
          </AccordianComponent>
          <AccordianComponent title={"Links to platforms"}>
            <p className="social-con-content">Add at least one link to...</p>
            <SocialIconsComp icons={icons} className={"app-social"} />
          </AccordianComponent>
        </div>
        <div className="right">
          <img src="/assets/images/phone-apps.png" alt="phone-apps" />
        </div>
      </div>
    </div>
  );
};

export default APPS;
