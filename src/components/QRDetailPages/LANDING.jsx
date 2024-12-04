import React, { useEffect } from "react";
import { AccordianComponent } from "../AccordianComponent";
import { InputComponent } from "../InputComponent";
import CutsomColorPickerComp from "../CutsomColorPickerComp";
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
import SocialIconsComp from "../SocialIconComp";
import ImageUploadComponent from "../ImageUploadComp";
import { useLocation } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
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
const LANDING = ({ localQrData, setLocalQrData, errors, setErrors }) => {
  //EDIT
  const location = useLocation();
  console.log("LANDINGDATAEDITT", location);
  console.log("localQrData", localQrData);

  useEffect(() => {
    if (location.state?.qrData) {
      const localQrDataFromLocation = location?.state?.qrData?.data;
      console.log("localQrDataFromLocation", localQrDataFromLocation);
      setLocalQrData(localQrDataFromLocation);

      // If there's color data in localQrData, ensure it's set correctly
      if (localQrDataFromLocation?.color) {
        setLocalQrData((prevlocalQrData) => ({
          ...prevlocalQrData,
          color: localQrDataFromLocation?.color,
        }));
      }
    }
  }, [location?.state, setLocalQrData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalQrData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (mediaData, name, file) => {
    setLocalQrData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };
  const handleImageDelete = (fieldName) => {
    // dispatch(resetField({ field: fieldName }));
    setLocalQrData((prevData) => ({
      ...prevData,
      [fieldName]: "",
    }));
  };

  return (
    <>
      <div className="landing-page">
        <div className="containerr">
          <div className="left">
            <AccordianComponent title={"Enter the name of your QR code"}>
              <InputComponent
                placeholder="e.g My QR code"
                onChange={handleInputChange}
                name="qr_name"
                value={localQrData?.qr_name}
              />
            </AccordianComponent>
            <AccordianComponent title={"Choose your design"}>
              <CutsomColorPickerComp
                colors={colors}
                qrData={localQrData}
                setQrData={setLocalQrData}
              />
            </AccordianComponent>
            <AccordianComponent title={"Website information"}>
              <ImageUploadComponent
                defaultImage={"/assets/images/default-img.png"}
                onImageUpload={handleImageUpload}
                onImageDelete={handleImageDelete}
                label="Logo"
                name="landing_logo"
                localQrData={localQrData}
                onEditImagePreview={localQrData?.landing_logo}
              />
              <InputComponent
                label={"Company"}
                name={"landing_company"}
                placeholder={"e.g. Summer Store"}
                onChange={handleInputChange}
                value={localQrData?.landing_company}
              />
              <InputComponent
                label={"Title"}
                name={"landing_title"}
                placeholder={"e.g. Summer Collection"}
                onChange={handleInputChange}
                value={localQrData?.landing_title}
              />
              <InputComponent
                label={"Subtitle"}
                name={"landing_subtitle"}
                placeholder={"e.g. Shop for summer essentials at great prices"}
                onChange={handleInputChange}
                value={localQrData?.landing_subtitle}
              />
              <InputComponent
                label={"Button text"}
                name={"landing_btn_text"}
                placeholder={"e.g. Browse the collection"}
                onChange={handleInputChange}
                value={localQrData?.landing_btn_text}
              />
              <InputComponent
                label={"URL"}
                name={"landing_action_url"}
                type="url"
                placeholder={"e.g. https://www.yourclothesshop.com/summer"}
                onChange={handleInputChange}
                value={localQrData?.landing_action_url}
              />
            </AccordianComponent>
            <AccordianComponent title={"Social networks"}>
              <p className="social-con-content">Add Link to...</p>
              <SocialIconsComp
                icons={icons}
                localQrData={localQrData}
                setLocalQrData={setLocalQrData}
                dataKey={"landing_social"}
              />
              {errors?.landing_social && (
                <div className="error-message">
                  <MdErrorOutline className="error-icon" />
                  {errors.landing_social}
                </div>
              )}
            </AccordianComponent>
          </div>
          <div className="right">
            <img src="/assets/images/phone-website.png" alt="phone-website" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LANDING;
