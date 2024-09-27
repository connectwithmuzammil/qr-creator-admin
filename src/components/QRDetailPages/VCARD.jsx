import React, { useEffect } from "react";
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

const VCARD = ({ qrData, setQrData }) => {
  const location = useLocation();
  console.log("LOCATIONURL", location);

  useEffect(() => {
    if (location.state?.qrData) {
      const qrDataFromLocation = location.state.qrData.data;
      setQrData(qrDataFromLocation);

      // If there's color data in qrData, ensure it's set correctly
      if (qrDataFromLocation.color) {
        setQrData((prevQrData) => ({
          ...prevQrData,
          color: qrDataFromLocation.color,
        }));
      }

      // Set initial vcard_social links if present (edit mode)
      if (qrDataFromLocation.vcard_social) {
        setQrData((prevQrData) => ({
          ...prevQrData,
          vcard_social: qrDataFromLocation.vcard_social,
        }));
      }
    }
  }, [location.state, setQrData]);

  const handleImageUpload = (mediaData, name) => {
    console.log("Received media data", mediaData); // media data base64
    console.log("Received media name", name); // media name

    setQrData((prevData) => ({
      ...prevData,
      [name]: mediaData,
    }));
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
  const handleSocialIconChange = (iconName, url) => {
    console.log("ICONS NAME, URL", iconName, url);
    setQrData((prevData) => ({
      ...prevData,
      vcard_social: {
        ...prevData.vcard_social,
        [iconName]: url,
      },
    }));
  };
  console.log("UPDATEDQRCODE", qrData);
  return (
    <div className="vcard-page">
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
          <AccordianComponent title={"Add vCard information"}>
            <ImageUploadComponent
              defaultImage={"/assets/images/default-img.png"}
              onImageUpload={handleImageUpload}
              onImageDelete={handleImageDelete}
              label="Profile picture"
              name="vcard_image"
            />
            <div className="wrap-inp-cmp">
              <InputComponent
                label={"Full name*"}
                name={"vcard_full_name"}
                placeholder={"e.g. Johana Smith"}
                onChange={handleInputChange}
                value={qrData?.vcard_full_name}
              />
              <InputComponent
                label={"Email"}
                name={"vcard_email"}
                placeholder={"e.g. youremail@domain.com"}
                onChange={handleInputChange}
                value={qrData?.vcard_email}
              />
            </div>
            <div className="wrap-inp-cmp">
              <InputComponent
                label={"Mobile phone"}
                name={"vcard_mobile_phone"}
                placeholder={"e.g. (123)-123-123-123"}
                onChange={handleInputChange}
                value={qrData?.vcard_mobile_phone}
              />
              <InputComponent
                label={"Landline"}
                name={"vcard_landline_phone"}
                placeholder={"e.g. (123)-123-123-123"}
                onChange={handleInputChange}
                value={qrData?.vcard_landline_phone}
              />
              <InputComponent
                label={"Fax"}
                name={"vcard_fax"}
                placeholder={"e.g. (123)-123-123-123"}
                onChange={handleInputChange}
                value={qrData?.vcard_fax}
              />
            </div>
            <div className="wrap-inp-cmp">
              <InputComponent
                label={"Website"}
                name={"vcard_website"}
                placeholder={"e.g. www.yourwebsite.com"}
                onChange={handleInputChange}
                value={qrData?.vcard_website}
              />
              <InputComponent
                label={"Company name"}
                name={"vcard_company_name"}
                placeholder={"e.g. Workplace Yoga"}
                onChange={handleInputChange}
                value={qrData?.vcard_company_name}
              />
              <InputComponent
                label={"Profession"}
                name={"vcard_profession"}
                placeholder={"e.g. Yoga teacher"}
                onChange={handleInputChange}
                value={qrData?.vcard_profession}
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
                value={qrData?.vcard_summary}
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
                value={qrData?.vcard_address}
              />
              <InputComponent
                label={"Number"}
                name={"vcard_numeration"}
                placeholder={"e.g. 10"}
                onChange={handleInputChange}
                value={qrData?.vcard_numeration}
              />
              <InputComponent
                label={"Zip code"}
                name={"vcard_zip_code"}
                placeholder={"e.g. 12548"}
                onChange={handleInputChange}
                value={qrData?.vcard_zip_code}
              />
            </div>
            <div className="wrap-inp-cmp">
              <InputComponent
                label={"City"}
                name={"vcard_city"}
                placeholder={"e.g. New York"}
                onChange={handleInputChange}
                value={qrData?.vcard_city}
              />
              <InputComponent
                label={"State"}
                name={"vcard_state"}
                placeholder={"e.g. 10"}
                onChange={handleInputChange}
                value={qrData?.vcard_state}
              />
              <InputComponent
                label={"Country"}
                name={"vcard_country"}
                placeholder={"e.g. USA"}
                onChange={handleInputChange}
                value={qrData?.vcard_country}
              />
            </div>
          </AccordianComponent>
          <AccordianComponent title={"Social networks"}>
            <p className="social-con-content">Add Link to...</p>
            <SocialIconsComp
              icons={icons}
              onIconClick={handleSocialIconChange}
              initialLinks={qrData?.vcard_social}
            />
          </AccordianComponent>
        </div>
        <div className="right">
          <img src="/assets/images/phone-vcard.png" alt="phone-vcard" />
        </div>
      </div>
    </div>
  );
};

export default VCARD;
