import React, { useCallback, useEffect, useState } from "react";
import { AccordianComponent } from "../AccordianComponent";
import { InputComponent } from "../InputComponent";
import CutsomColorPickerComp from "../CutsomColorPickerComp";
import ImageUploadComponent from "../ImageUploadComp";
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
import Button from "../Button";
import { FaTrash } from "react-icons/fa";
import { debounce } from "lodash";
import { toast } from "react-toastify";
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
const LINKS = ({ localQrData, setLocalQrData, errors, setErrors }) => {
  //EDIT
  const location = useLocation();
  console.log("LINKSDATA", location);

  useEffect(() => {
    if (location.state?.qrData) {
      const qrDataFromLocation = location.state.qrData.data;
      console.log("qrDataFromLocation", qrDataFromLocation);
      setLocalQrData(qrDataFromLocation);

      // If there's color data in localQrData, ensure it's set correctly
      if (qrDataFromLocation?.color) {
        setLocalQrData((prevQrData) => ({
          ...prevQrData,
          color: qrDataFromLocation?.color,
        }));
      }
      if (qrDataFromLocation?.all_links) {
        setLinkData(qrDataFromLocation.all_links);
      }
    }
  }, [location.state, setLocalQrData]);

  const [linkData, setLinkData] = useState({ image: "", text: "", url: "" });
  const [QRLogo, setQRLogo] = useState(null);

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinkData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Custom function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // const imageUrl = URL.createObjectURL(file);
      setQRLogo(file);
      setLinkData((prevData) => ({ ...prevData, image: file }));
      event.target.value = null;
    }
  };

  // Function to handle image delete
  const handleImageDelete = () => {
    setQRLogo(null);
    setLinkData((prevData) => ({ ...prevData, image: "" }));
  };

  // Function to add the link to the array and store it in local storage/redux
  const handleAddLink = () => {
    console.log("Link data before adding:", linkData);
    if (linkData.image && linkData.text && linkData.url) {
      const updatedLinks = [...localQrData.all_links, linkData];
      setLocalQrData({ ...localQrData, all_links: updatedLinks });
      setLinkData({ image: "", text: "", url: "" }); // Reset input fields
      setQRLogo(null); // Reset image preview
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  // Function to delete a link from the array
  const handleDeleteLink = (index) => {
    const updatedLinks = localQrData.all_links.filter((_, i) => i !== index);
    setLocalQrData({ ...localQrData, all_links: updatedLinks });
  };

  // Helper function to get image source
  // const getLogoSrc = () => (QRLogo ? QRLogo : "/assets/images/default-img.png");
  const getLogoSrc = () => {
    if (QRLogo instanceof File) {
      return URL.createObjectURL(QRLogo);
    }
    return QRLogo || "/assets/images/default-img.png";
  };

  console.log("linkdatata", linkData);
  // ----------------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalQrData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSingleImageUpload = (mediaData, name, file) => {
    // console.log("Received media data", mediaData);
    // console.log("Received media name", name);

    setLocalQrData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };
  const handleSingleImageDelete = (fieldName) => {
    // dispatch(resetField({ field: fieldName }));
    setLocalQrData((prevData) => ({
      ...prevData,
      [fieldName]: "",
    }));
    // console.log(`Deleted image for field: ${fieldName}`);
  };

  // console.log("linksLocalQrdata", localQrData);

  return (
    <>
      <div className="link-page">
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
            <AccordianComponent title={"Information about your List of Links"}>
              <ImageUploadComponent
                defaultImage={"/assets/images/default-img.png"}
                onImageUpload={handleSingleImageUpload}
                onImageDelete={handleSingleImageDelete}
                label="Logo"
                name="linkslogo"
                localQrData={localQrData}
                onEditImagePreview={localQrData?.linkslogo}
              />
              <InputComponent
                label={"Title"}
                name={"links_title"}
                placeholder={"e.g. Our sportswear collection"}
                onChange={handleInputChange}
                value={localQrData?.links_title}
              />
              <InputComponent
                label={"Description"}
                name={"links_description"}
                placeholder={
                  "e.g. Our Clothing, footwear, and accessories for athletes"
                }
                onChange={handleInputChange}
                value={localQrData?.links_description}
              />
            </AccordianComponent>
            <AccordianComponent title={"Your links"}>
              <p className="social-con-content">Add one link*</p>

              <div className="links-container">
                <div className="img-upload-comp">
                  <div className="wrap">
                    <div className="img-wrapper">
                      <img
                        src={getLogoSrc()}
                        alt="Uploaded"
                        className="uploaded-img"
                      />
                      <div className="icon-overlay">
                        <label className="upload-icon">
                          <h3>+</h3>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  {QRLogo && (
                    <button className="delete-icon" onClick={handleImageDelete}>
                      Delete
                    </button>
                  )}
                </div>

                <InputComponent
                  label="Text"
                  placeholder="Enter text"
                  name="text"
                  value={linkData.text}
                  onChange={handleChange}
                />
                <InputComponent
                  label="URL"
                  placeholder="Enter URL"
                  name="url"
                  value={linkData.url}
                  onChange={handleChange}
                />
                <Button
                  title={"Add Link"}
                  width={"100%"}
                  onClick={handleAddLink}
                />

                {localQrData.all_links.length > 0 && (
                  <>
                    <h4>All Links</h4>
                    <ul>
                      {localQrData.all_links.map((link, index) => {
                        console.log("linkk", link);
                        const imageUrl =
                          link.image instanceof File
                            ? URL.createObjectURL(link.image)
                            : link.image;

                        return (
                          <li key={index}>
                            <img src={imageUrl} alt={link.text} width="50" />
                            <span>{link.text}</span> -{" "}
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.url}
                            </a>
                            <button onClick={() => handleDeleteLink(index)}>
                              Delete
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>

              {errors?.all_links && (
                <div className="error-message">
                  <MdErrorOutline className="error-icon" />
                  {errors.all_links}
                </div>
              )}
            </AccordianComponent>
            <AccordianComponent title={"Your social networks"}>
              <p className="social-con-content">Add Link to...</p>
              <SocialIconsComp
                icons={icons}
                localQrData={localQrData}
                setLocalQrData={setLocalQrData}
                dataKey={"links_social"}
                // onIconClick={handleSocialIconChange}
                // initialLinks={localQrData?.links_social}
                // isEditing={!!location.state?.qrData}
              />
            </AccordianComponent>
          </div>
          <div className="right">
            <img src="/assets/images/phone-links.png" alt="phone-links" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LINKS;
