import React from "react";
import { AccordianComponent } from "../AccordianComponent";
import { InputComponent } from "../InputComponent";
import CutsomColorPickerComp from "../CutsomColorPickerComp";
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
import FacilitiesIconComp from "../FacilitiesIconComp";
import EventSchedularComp from "../EventSchedularComp";

const colors = [
  { id: "blue", background: "#d1e5fa", button: "#1466b8" },
  { id: "green", background: "#e8fce8", button: "#0e8b70" },
  { id: "yellow", background: "#fff9cc", button: "#998600" },
  { id: "red", background: "#fecdd6", button: "#b00223" },
];

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

const EVENT = ({ qrData, setQrData }) => {
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

  const handleFacilitiesIconChange = (iconName, isSelected) => {
    setQrData((prevQrData) => ({
      ...prevQrData,
      event_facilities: {
        ...prevQrData.event_facilities,
        [iconName]: isSelected,
      },
    }));
  };
  return (
    <div className="event-page">
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
          <AccordianComponent title={"Event information"}>
            <ImageUploadComponent
              defaultImage={"/assets/images/default-img.png"}
              onImageUpload={handleImageUpload}
              //   onImageDelete={handleImageDelete}
              label="Cover"
              name="event_image"
            />
            <InputComponent
              label={"Title"}
              name={"event_title"}
              placeholder={"e.g. End of Summer Festival"}
              onChange={handleInputChange}
              value={qrData?.event_title}
            />
            <InputComponent
              label={"Description"}
              name={"event_description"}
              placeholder={
                "e.g. If you would like to keep up on the latest content, come by and follow us"
              }
              onChange={handleInputChange}
              value={qrData?.event_description}
            />
            <div className="wrap-inp-cmp">
              <InputComponent
                label={"Button text"}
                name={"event_btn_text"}
                placeholder={"e.g. Get tickets"}
                onChange={handleInputChange}
                value={qrData?.event_btn_text}
              />
              <InputComponent
                label={"URL"}
                name={"event_action_url"}
                placeholder={"e.g. https://www.yourwebsite.com"}
                onChange={handleInputChange}
                value={qrData?.event_action_url}
              />
            </div>
          </AccordianComponent>
          <AccordianComponent title={"Event time & date"}>
            <EventSchedularComp
              qrData={qrData}
              setQrData={setQrData}
              onChangeTime={handleInputChange}
            />
          </AccordianComponent>
          <AccordianComponent title={"Location"}>
            <div className="wrap-inp-cmp">
              <InputComponent
                label={"Address"}
                name={"event_location_address"}
                placeholder={"e.g. High Street"}
                onChange={handleInputChange}
                value={qrData?.event_location_address}
              />
              <InputComponent
                label={"Number"}
                name={"event_location_numeration"}
                placeholder={"e.g. 10"}
                onChange={handleInputChange}
                value={qrData?.event_location_numeration}
              />
              <InputComponent
                label={"Zip code"}
                name={"event_location_postal_code"}
                placeholder={"e.g. 12548"}
                onChange={handleInputChange}
                value={qrData?.event_location_postal_code}
              />
            </div>
            <div className="wrap-inp-cmp">
              <InputComponent
                label={"City"}
                name={"event_location_city"}
                placeholder={"e.g. New York"}
                onChange={handleInputChange}
                value={qrData?.event_location_city}
              />
              <InputComponent
                label={"State"}
                name={"event_location_state"}
                placeholder={"e.g. 10"}
                onChange={handleInputChange}
                value={qrData?.event_location_state}
              />
              <InputComponent
                label={"Country"}
                name={"event_location_country"}
                placeholder={"e.g. USA"}
                onChange={handleInputChange}
                value={qrData?.event_location_country}
              />
            </div>
          </AccordianComponent>
          <AccordianComponent title={"Organizer information"}>
            <div className="wrap-inp-cmp">
              <InputComponent
                label={"Contact Name"}
                name={"event_organizer_name"}
                placeholder={"e.g. Jane Doe"}
                onChange={handleInputChange}
                value={qrData?.event_organizer_name}
              />
              <InputComponent
                label={"Phone"}
                name={"event_organizer_phone"}
                placeholder={"e.g. (123)-123-123-123"}
                onChange={handleInputChange}
                value={qrData?.event_organizer_phone}
              />
            </div>
            <div className="wrap-inp-cmp">
              <InputComponent
                label={"Email"}
                name={"event_organizer_email"}
                placeholder={"e.g. info@yourevent.com"}
                onChange={handleInputChange}
                value={qrData?.event_organizer_email}
              />
              <InputComponent
                label={"Website"}
                name={"event_organizer_website"}
                placeholder={"e.g. https://www.yourevent.com"}
                onChange={handleInputChange}
                value={qrData?.event_organizer_website}
              />
            </div>
            <InputComponent
              label={"About Us"}
              name={"event_organizer_about"}
              placeholder={
                "e.g. We organize the biggest outdoor music events..."
              }
              onChange={handleInputChange}
              value={qrData?.event_organizer_about}
            />
          </AccordianComponent>
          <AccordianComponent title={"Facilities"}>
            <FacilitiesIconComp
              icons={FacilitiesIcon}
              onIconClick={handleFacilitiesIconChange}
            />
          </AccordianComponent>
        </div>
        <div className="right">
          <img src="/assets/images/phone-event.png" alt="phone-event" />
        </div>
      </div>
    </div>
  );
};

export default EVENT;
