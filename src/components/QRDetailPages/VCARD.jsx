import React, { useEffect, useState } from "react";
import { AccordianComponent } from "../AccordianComponent";
import { InputComponent } from "../InputComponent";
import CutsomColorPickerComp from "../CutsomColorPickerComp";
import SocialIconsComp from "../SocialIconComp";
import {
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
} from "../../Helper/SocialSvgIcons";
import ImageUploadComponent from "../ImageUploadComp";
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

const VCARD = ({ localQrData, setLocalQrData, errors, setErrors }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.qrData) {
      const qrDataFromLocation = location.state.qrData.data;
      setLocalQrData(qrDataFromLocation);

      if (qrDataFromLocation.color) {
        setLocalQrData((prevQrData) => ({
          ...prevQrData,
          color: qrDataFromLocation.color,
        }));
      }
    }
  }, [location.state, setLocalQrData]);

  const handleImageUpload = (mediaData, name, file) => {
    console.log("Received file name", file); // file

    setLocalQrData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };
  const handleImageDelete = (fieldName) => {
    console.log("Image deleted");
    // dispatch(resetField({ field: fieldName }));
    setLocalQrData((prevData) => ({
      ...prevData,
      [fieldName]: "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalQrData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // console.log("UPDATEDQRCODEVCARD", localQrData);
  return (
    <>
      <div className="vcard-page">
        <div className="containerr">
          <div className="left">
            <AccordianComponent title={"Enter the name of your QR code"}>
              <InputComponent
                placeholder="e.g My QR code"
                onChange={handleInputChange}
                name="qr_name"
                value={localQrData.qr_name}
              />
            </AccordianComponent>
            <AccordianComponent title={"Choose your design"}>
              <CutsomColorPickerComp
                colors={colors}
                qrData={localQrData}
                setQrData={setLocalQrData}
              />
            </AccordianComponent>
            <AccordianComponent title={"Add vCard information"}>
              <ImageUploadComponent
                defaultImage={"/assets/images/default-img.png"}
                onImageUpload={handleImageUpload}
                onImageDelete={handleImageDelete}
                label="Profile picture"
                name="vcard_image"
                onEditImagePreview={localQrData?.vcard_image}
              />
              <div className="wrap-inp-cmp">
                <InputComponent
                  label={"Full name*"}
                  name={"vcard_full_name"}
                  placeholder={"e.g. Johana Smith"}
                  onChange={handleInputChange}
                  value={localQrData?.vcard_full_name}
                  error={errors?.vcard_full_name}
                />
                <InputComponent
                  label={"Email"}
                  name={"vcard_email"}
                  placeholder={"e.g. youremail@domain.com"}
                  onChange={handleInputChange}
                  value={localQrData?.vcard_email}
                />
              </div>
              <div className="wrap-inp-cmp">
                <InputComponent
                  label={"Mobile phone"}
                  name={"vcard_mobile_phone"}
                  placeholder={"e.g. (123)-123-123-123"}
                  onChange={handleInputChange}
                  value={localQrData?.vcard_mobile_phone}
                />
                <InputComponent
                  label={"Landline"}
                  name={"vcard_landline_phone"}
                  placeholder={"e.g. (123)-123-123-123"}
                  onChange={handleInputChange}
                  value={localQrData?.vcard_landline_phone}
                />
                <InputComponent
                  label={"Fax"}
                  name={"vcard_fax"}
                  placeholder={"e.g. (123)-123-123-123"}
                  onChange={handleInputChange}
                  value={localQrData?.vcard_fax}
                />
              </div>
              <div className="wrap-inp-cmp">
                <InputComponent
                  label={"Website"}
                  name={"vcard_website"}
                  placeholder={"e.g. www.yourwebsite.com"}
                  onChange={handleInputChange}
                  value={localQrData?.vcard_website}
                />
                <InputComponent
                  label={"Company name"}
                  name={"vcard_company_name"}
                  placeholder={"e.g. Workplace Yoga"}
                  onChange={handleInputChange}
                  value={localQrData?.vcard_company_name}
                />
                <InputComponent
                  label={"Profession"}
                  name={"vcard_profession"}
                  placeholder={"e.g. Yoga teacher"}
                  onChange={handleInputChange}
                  value={localQrData?.vcard_profession}
                />
              </div>
              <div className="wrap-inp-cmp">
                <InputComponent
                  label={"Summary"}
                  name={"vcard_summary"}
                  placeholder={
                    "e.g. I offer on-site yoga classes to promote wellness, and reduce stress and improve productivity. "
                  }
                  onChange={handleInputChange}
                  value={localQrData?.vcard_summary}
                />
              </div>
            </AccordianComponent>
            <AccordianComponent title={"Location"}>
              <div className="wrap-inp-cmp">
                <InputComponent
                  label={"Address"}
                  name={"vcard_address"}
                  placeholder={"e.g. High Street"}
                  onChange={handleInputChange}
                  value={localQrData?.vcard_address}
                />
                <InputComponent
                  label={"Number"}
                  name={"vcard_numeration"}
                  placeholder={"e.g. 10"}
                  onChange={handleInputChange}
                  value={localQrData?.vcard_numeration}
                />
                <InputComponent
                  label={"Zip code"}
                  name={"vcard_zip_code"}
                  placeholder={"e.g. 12548"}
                  onChange={handleInputChange}
                  value={localQrData?.vcard_zip_code}
                />
              </div>
              <div className="wrap-inp-cmp">
                <InputComponent
                  label={"City"}
                  name={"vcard_city"}
                  placeholder={"e.g. New York"}
                  onChange={handleInputChange}
                  value={localQrData?.vcard_city}
                />
                <InputComponent
                  label={"State"}
                  name={"vcard_state"}
                  placeholder={"e.g. 10"}
                  onChange={handleInputChange}
                  value={localQrData?.vcard_state}
                />
                <InputComponent
                  label={"Country"}
                  name={"vcard_country"}
                  placeholder={"e.g. USA"}
                  onChange={handleInputChange}
                  value={localQrData?.vcard_country}
                />
              </div>
            </AccordianComponent>
            <AccordianComponent title={"Social networks"}>
              <p className="social-con-content">Add Link to...</p>
              <SocialIconsComp
                icons={icons}
                localQrData={localQrData}
                setLocalQrData={setLocalQrData}
                dataKey={"vcard_social"}
              />
            </AccordianComponent>
          </div>

          <div className="right">
            <img src="/assets/images/phone-vcard.png" alt="phone-vcard" />
          </div>
        </div>
      </div>
    </>
  );
};

export default VCARD;
