import React, { useEffect, useState } from "react";
import { AccordianComponent } from "../AccordianComponent";
import CutsomColorPickerComp from "../CutsomColorPickerComp";
import { InputComponent } from "../InputComponent";
import {
  FacilitiesAccommodationIcon,
  DribbleSocial,
  FacebookSocial,
  FlikrSocial,
  GithubSocial,
  InstagramSocial,
  LineSocial,
  LinkedinSocial,
  RedditSocial,
  SkypeSocial,
  SnapchatSocial,
  TiktokSocial,
  TripadvisorSocial,
  TumblrSocial,
  TwitterSocial,
  VimeoSocial,
  VkontakteSocial,
  WebSocial,
  XingSocial,
  FacilitiesBarIcon,
  FacilitiesCafeIcon,
  FacilitiesChildFriendlyIcon,
  FacilitiesParkingIcon,
  FacilitiesPetFriendlyIcon,
  FacilitiesRestaurantIcon,
  FacilitiesRestroomIcon,
  FacilitiesSeatingIcon,
  FacilitiesNearPublicTransportIcon,
  FacilitiesTaxiIcon,
  FacilitiesWheelChairAccessIcon,
  FacilitiesWifiIcon,
} from "../../Helper/SocialSvgIcons";
import ImageUploadComponent from "../ImageUploadComp";
import SocialIconsComp from "../SocialIconComp";
import FacilitiesIconComp from "../FacilitiesIconComp";
import TimeInputComponent from "../TimeInputComponent";
import { useLocation } from "react-router-dom";

const colors = [
  { id: "blue", background: "#d1e5fa", button: "#1466b8" },
  { id: "green", background: "#e8fce8", button: "#0e8b70" },
  { id: "yellow", background: "#fff9cc", button: "#998600" },
  { id: "red", background: "#fecdd6", button: "#b00223" },
];
const icons = {
  facebook: <FacebookSocial />,
  instagram: <InstagramSocial />,
  twitter: <TwitterSocial />,
  dribble: <DribbleSocial />,
  flickr: <FlikrSocial />,
  github: <GithubSocial />,
  line: <LineSocial />,
  linkedin: <LinkedinSocial />,
  reddit: <RedditSocial />,
  skype: <SkypeSocial />,
  snapchat: <SnapchatSocial />,
  tiktok: <TiktokSocial />,
  tripadvisor: <TripadvisorSocial />,
  tumblr: <TumblrSocial />,
  vimeo: <VimeoSocial />,
  vkontakte: <VkontakteSocial />,
  web: <WebSocial />,
  xing: <XingSocial />,
};
const FacilitiesIcon = {
  Accommodation: <FacilitiesAccommodationIcon />,
  Bar: <FacilitiesBarIcon />,
  Cafe: <FacilitiesCafeIcon />,
  ChildFriendly: <FacilitiesChildFriendlyIcon />,
  Parking: <FacilitiesParkingIcon />,
  PetFriendly: <FacilitiesPetFriendlyIcon />,
  Restaurant: <FacilitiesRestaurantIcon />,
  Restroom: <FacilitiesRestroomIcon />,
  Seating: <FacilitiesSeatingIcon />,
  NearPublicTransport: <FacilitiesNearPublicTransportIcon />,
  Taxi: <FacilitiesTaxiIcon />,
  WheelChairAccess: <FacilitiesWheelChairAccessIcon />,
  Wifi: <FacilitiesWifiIcon />,
};

const BUSINESS = ({ qrData, setQrData }) => {
  //EDIT
  const location = useLocation();
  console.log("LOCATIONURLBusiness", location);

  useEffect(() => {
    if (location.state?.qrData) {
      const qrDataFromLocation = location.state.qrData.data;
      console.log("qrDataFromLocation",qrDataFromLocation)
      setQrData(qrDataFromLocation);

      // If there's color data in qrData, ensure it's set correctly
      if (qrDataFromLocation?.color) {
        setQrData((prevQrData) => ({
          ...prevQrData,
          color: qrDataFromLocation?.color,
        }));
      }

      // Set initial vcard_social links if present (edit mode)
      if (qrDataFromLocation?.business_social) {
        setQrData((prevQrData) => ({
          ...prevQrData,
          business_social: qrDataFromLocation?.business_social,
        }));
      }
    }
  }, [location.state, setQrData]);

  console.log("updatedQrData",qrData)

  const [is24HourFormat, setIs24HourFormat] = useState(false);
  const handleImageUpload = (mediaData, name) => {
    console.log("Received media data", mediaData); // media data base64
    console.log("Received media name", name); // media name

    setQrData((prevData) => ({
      ...prevData,
      [name]: mediaData,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQrData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSocialIconChange = (iconName, url) => {
    console.log("ICONS NAME, URL", iconName, url);
    setQrData((prevData) => ({
      ...prevData,
      business_social: {
        ...prevData.business_social,
        [iconName]: url,
      },
    }));
  };
  const handleFacilitiesIconChange = (iconName, isSelected) => {
    setQrData((prevQrData) => ({
      ...prevQrData,
      business_facilities: {
        ...prevQrData.business_facilities,
        [iconName]: isSelected,
      },
    }));
  };

  const handleTimeDataChange = (timeData) => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const updatedOpeningHours = {};

    days.forEach((day) => {
      const dayData = timeData[day][0];
      updatedOpeningHours[day.toLowerCase()] = {
        enabled: dayData.enabled,
        times: timeData[day].map((slot) => ({
          start: slot.from,
          end: slot.to,
        })),
      };
    });

    setQrData((prevData) => ({
      ...prevData,
      opening_hours_days: updatedOpeningHours,
      opening_hours_format: is24HourFormat ? "24-Hour" : "AM-PM", // Update format based on toggle
    }));
  };

  return (
    <div className="business-page">
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
          <AccordianComponent title={"Business information"}>
            <ImageUploadComponent
              defaultImage={"/assets/images/default-img.png"}
              onImageUpload={handleImageUpload}
              //   onImageDelete={handleImageDelete}
              label="Logo"
              name="business_image"
            />
            <InputComponent
              label={"Company name"}
              name={"business_company"}
              placeholder={"e.g. Artisan Bakery"}
              onChange={handleInputChange}
              value={qrData?.business_company}
            />
            <InputComponent
              label={"Title"}
              name={"business_title"}
              placeholder={"e.g. Fresh Bread and Pastries"}
              onChange={handleInputChange}
              value={qrData?.business_title}
            />
            <InputComponent
              label={"Subtitle"}
              name={"business_subtitle"}
              placeholder={
                "e.g. Delicious bread and pastries baked daily. vVsit our bakery or order online."
              }
              onChange={handleInputChange}
              value={qrData?.business_subtitle}
            />
            <div className="wrap-inp-cmp">
              <InputComponent
                label={"Button text"}
                name={"business_btn_text"}
                placeholder={"e.g. View our products"}
                onChange={handleInputChange}
                value={qrData?.business_btn_text}
              />
              <InputComponent
                label={"URL"}
                name={"business_url"}
                placeholder={"e.g. https://URL here"}
                onChange={handleInputChange}
                value={qrData?.business_url}
              />
            </div>
          </AccordianComponent>
          <AccordianComponent title={"Opening hours"}>
            <TimeInputComponent
              onTimeDataChange={handleTimeDataChange}
              is24HourFormat={is24HourFormat}
              setIs24HourFormat={setIs24HourFormat}
            />
          </AccordianComponent>
          <AccordianComponent title={"Location"}>
            <div className="wrap-inp-cmp">
              <InputComponent
                label={"Address"}
                name={"business_address"}
                placeholder={"e.g. High Street"}
                onChange={handleInputChange}
                value={qrData?.business_address}
              />
              <InputComponent
                label={"Number"}
                name={"business_numeration"}
                placeholder={"e.g. 10"}
                onChange={handleInputChange}
                value={qrData?.business_numeration}
              />
              <InputComponent
                label={"Zip code"}
                name={"business_postalcode"}
                placeholder={"e.g. 12548"}
                onChange={handleInputChange}
                value={qrData?.business_postalcode}
              />
            </div>
            <div className="wrap-inp-cmp">
              <InputComponent
                label={"City"}
                name={"business_city"}
                placeholder={"e.g. New York"}
                onChange={handleInputChange}
                value={qrData?.business_city}
              />
              <InputComponent
                label={"State"}
                name={"business_state"}
                placeholder={"e.g. 10"}
                onChange={handleInputChange}
                value={qrData?.business_state}
              />
              <InputComponent
                label={"Country"}
                name={"business_country"}
                placeholder={"e.g. USA"}
                onChange={handleInputChange}
                value={qrData?.business_country}
              />
            </div>
          </AccordianComponent>
          <AccordianComponent title={"Facilities"}>
            <FacilitiesIconComp
              icons={FacilitiesIcon}
              onIconClick={handleFacilitiesIconChange}
            />
          </AccordianComponent>
          <AccordianComponent title={"Contact information"}>
            <InputComponent
              label={"Name"}
              name={"business_name"}
              placeholder={"e.g. John Smith"}
              onChange={handleInputChange}
              value={qrData?.business_name}
            />
            <InputComponent
              label={"Phone"}
              name={"business_phone"}
              placeholder={"e.g. (123)-123-123-123"}
              onChange={handleInputChange}
              value={qrData?.business_phone}
            />
            <InputComponent
              label={"Email"}
              name={"business_email"}
              placeholder={"e.g. youremail@domain.com"}
              onChange={handleInputChange}
              value={qrData?.business_email}
            />
            <InputComponent
              label={"Website"}
              name={"business_website"}
              placeholder={"e.g. https://www.artisian-bakery.com"}
              onChange={handleInputChange}
              value={qrData?.business_website}
            />
          </AccordianComponent>
          <AccordianComponent title={"About the company"}>
            <InputComponent
              name={"business_about"}
              placeholder={
                "e.g. Indicate your business opening hour and/or any relevant information about it"
              }
              onChange={handleInputChange}
              value={qrData?.business_about}
            />
          </AccordianComponent>
          <AccordianComponent title={"Social networks"}>
            <p className="social-con-content">Add Link to...</p>
            <SocialIconsComp
              icons={icons}
              onIconClick={handleSocialIconChange}
              initialLinks={qrData?.business_social}
            />
          </AccordianComponent>
        </div>
        <div className="right">
          <img src="/assets/images/phone-business.png" alt="phone-business" />
        </div>
      </div>
    </div>
  );
};

export default BUSINESS;
