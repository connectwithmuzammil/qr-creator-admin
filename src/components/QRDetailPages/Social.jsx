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
import ImageUploadComponent from "../ImageUploadComp";
import SocialIconsComp from "../SocialIconComp";

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

const Social = ({ qrData, setQrData }) => {
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
      media_social: {
        ...prevData.media_social,
        [iconName]: url,
      },
    }));
  };

  return (
    <div className="social-page">
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
          <AccordianComponent title={"Basic information"}>
            <div className="wrapper-img-upload-dashed">
              <ImageUploadComponent
                defaultImage={"/assets/images/default-img.png"}
                //   onImageDelete={handleImageDelete}
                label="Upload Your Own Image"
                onImageUpload={handleImageUpload}
                name="landing_logo"
              />
            </div>
            <InputComponent
              label={"Headline*"}
              name={"media_headline"}
              placeholder={"e.g. Connect with us"}
              onChange={handleInputChange}
              value={qrData.media_headline}
            />
            <InputComponent
              label={"Description"}
              name={"media_description"}
              placeholder={
                "e.g. If you would like to keep up on the latest content, come by and follow us"
              }
              onChange={handleInputChange}
              value={qrData.media_description}
            />
          </AccordianComponent>
          <AccordianComponent title={"Social Media Channels"}>
            <SocialIconsComp
              icons={icons}
              onIconClick={handleSocialIconChange}
            />
          </AccordianComponent>
        </div>
        <div className="right">
          <img src="/assets/images/phone-social.png" alt="phone-social" />
        </div>
      </div>
    </div>
  );
};

export default Social;
