import React from "react";
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
const LANDING = ({ qrData, setQrData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQrData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (mediaData, name) => {
    console.log("Received media data", mediaData); // media data base64
    console.log("Received media name", name); // media name

    setQrData((prevData) => ({
      ...prevData,
      [name]: mediaData,
    }));
  };
  const handleSocialIconChange = (iconName, url) => {
    console.log("ICONS NAME, URL", iconName, url);
    setQrData((prevData) => ({
      ...prevData,
      social: {
        ...prevData.social,
        [iconName]: url,
      },
    }));
  };

  return (
    <div className="landing-page">
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
          <AccordianComponent title={"Website information"}>
            <ImageUploadComponent
              defaultImage={"/assets/images/default-img.png"}
              onImageUpload={handleImageUpload}
              //   onImageDelete={handleImageDelete}
              label="Logo"
              name="landing_logo"
            />
            <InputComponent
              label={"Company"}
              name={"landing_company"}
              placeholder={"e.g. Summer Store"}
              onChange={handleInputChange}
              value={qrData?.landing_company}
            />
            <InputComponent
              label={"Title"}
              name={"landing_title"}
              placeholder={"e.g. Summer Collection"}
              onChange={handleInputChange}
              value={qrData?.landing_title}
            />
            <InputComponent
              label={"Subtitle"}
              name={"landing_subtitle"}
              placeholder={"e.g. Shop for summer essentials at great prices"}
              onChange={handleInputChange}
              value={qrData?.landing_subtitle}
            />
            <InputComponent
              label={"Button text"}
              name={"landing_btn_text"}
              placeholder={"e.g. Browse the collection"}
              onChange={handleInputChange}
              value={qrData?.landing_btn_text}
            />
            <InputComponent
              label={"URL"}
              name={"landing_action_url"}
              placeholder={"e.g. https://www.yourclothesshop.com/summer"}
              onChange={handleInputChange}
              value={qrData?.landing_action_url}
            />
          </AccordianComponent>
          <AccordianComponent title={"Social networks"}>
            <p className="social-con-content">Add Link to...</p>
            <SocialIconsComp
              icons={icons}
              onIconClick={handleSocialIconChange}
            />
          </AccordianComponent>
        </div>
        <div className="right">
          <img src="/assets/images/phone-website.png" alt="phone-website" />
        </div>
      </div>
    </div>
  );
};

export default LANDING;
