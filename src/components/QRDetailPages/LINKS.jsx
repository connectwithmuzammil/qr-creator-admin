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
const LINKS = ({ qrData, setQrData }) => {
  const [links, setLinks] = useState([]);

  // Debounce function to update qrData with a delay of 300ms
  const updateQrDataDebounced = useCallback(
    debounce((updatedLinks) => {

      const sanitizedLinks = updatedLinks.map(({ id, ...rest }) => rest);
      setQrData((prevData) => ({ ...prevData, all_links: sanitizedLinks }));
    }, 300),
    []
  );

  useEffect(() => {
    // Initialize links from qrData when the component mounts
    if (qrData.all_links) {
      setLinks(qrData.all_links);
    }
  }, [qrData]);

  const handleAddLink = () => {
    const newLink = { id: Date.now(), image: "", text: "", url: "" };

    // setLinks([...links, { id: Date.now(), image: "", text: "", url: "" }]);
    setLinks((prevLinks) => {
      const updatedLinks = [...prevLinks, newLink];
      // Update qrData with the new links state
      setQrData((prevData) => ({ ...prevData, all_links: updatedLinks }));
      return updatedLinks;
    });
  };

  const handleRemoveLink = (id) => {
    // setLinks(links.filter((link) => link.id !== id));
    setLinks((prevLinks) => {
      const updatedLinks = prevLinks.filter((link) => link.id !== id);
      // Update qrData with the updated links state
      setQrData((prevData) => ({ ...prevData, all_links: updatedLinks }));
      return updatedLinks;
    });
  };

  const handleLinkInputChange = (id, name, value) => {
    // setLinks(
    //   links.map((link) => (link.id === id ? { ...link, [name]: value } : link))
    // );
    setLinks((prevLinks) => {
      const updatedLinks = prevLinks.map((link) =>
        link.id === id ? { ...link, [name]: value } : link
      );
      // Update qrData with the updated links state
      // setQrData((prevData) => ({ ...prevData, all_links: updatedLinks }));
      updateQrDataDebounced(updatedLinks);

      return updatedLinks;
    });
  };
  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      updateQrDataDebounced.cancel();
    };
  }, [updateQrDataDebounced]);


  const handleImageUpload = (id, imageData) => {
    // setLinks(
    //   links.map((link) =>
    //     link.id === id ? { ...link, image: imageData } : link
    //   )
    // );
    setLinks((prevLinks) => {
      const updatedLinks = prevLinks.map((link) =>
        link.id === id ? { ...link, image: imageData } : link
      );
      // Update qrData with the updated links state
      setQrData((prevData) => ({ ...prevData, all_links: updatedLinks }));
      return updatedLinks;
    });
  };

  const handleImageDelete = (id) => {
    // setLinks(
    //   links.map((link) => (link.id === id ? { ...link, image: "" } : link))
    // );
    setLinks((prevLinks) => {
      const updatedLinks = prevLinks.map((link) =>
        link.id === id ? { ...link, image: "" } : link
      );
      // Update qrData with the updated links state
      setQrData((prevData) => ({ ...prevData, all_links: updatedLinks }));
      return updatedLinks;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQrData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSingleImageUpload = (mediaData, name) => {
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
      links_social: {
        ...prevData.links_social,
        [iconName]: url,
      },
    }));
  };
  return (
    <div className="link-page">
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
          <AccordianComponent title={"Information about your List of Links"}>
            <ImageUploadComponent
              defaultImage={"/assets/images/default-img.png"}
              onImageUpload={handleSingleImageUpload}
              //   onImageDelete={handleImageDelete}
              label="Logo"
              name="links_image"
            />
            <InputComponent
              label={"Title"}
              name={"links_title"}
              placeholder={"e.g. Our sportswear collection"}
              onChange={handleInputChange}
              value={qrData?.links_title}
            />
            <InputComponent
              label={"Description"}
              name={"links_description"}
              placeholder={
                "e.g. Our Clothing, footwear, and accessories for athletes"
              }
              onChange={handleInputChange}
              value={qrData?.links_description}
            />
          </AccordianComponent>
          <AccordianComponent title={"Your links"}>
            <p className="social-con-content">Add one link*</p>

            <div>
              {links.map((link, index) => (
                <div key={link.id} className="show-link-con">
                  <div
                    className="trash-con"
                    onClick={() => handleRemoveLink(link.id)}
                  >
                    <p>Link {index + 1}</p>
                    <FaTrash />
                  </div>

                  <ImageUploadComponent
                    image={"/assets/images/phone-links.png"}
                    defaultImage={"/assets/images/default-img.png"}
                    onImageUpload={(imageUrl) =>
                      handleImageUpload(link.id, imageUrl)
                    }
                    onImageDelete={() => handleImageDelete(link.id)}
                    label="Image"
                  />

                  <InputComponent
                    label={"Link text*"}
                    name={"text"}
                    placeholder={"e.g. Write your link text here"}
                    onChange={(e) =>
                      handleLinkInputChange(link.id, "text", e.target.value)
                    }
                    value={link.text}
                  />

                  <InputComponent
                    label={"URL*"}
                    name={"url"}
                    placeholder={"e.g. https://..."}
                    onChange={(e) =>
                      handleLinkInputChange(link.id, "url", e.target.value)
                    }
                    value={link.url}
                  />
                </div>
              ))}
              <Button
                width={"100%"}
                title={"Add Link"}
                onClick={handleAddLink}
              />
            </div>
          </AccordianComponent>
          <AccordianComponent title={"Your social networks"}>
            <p className="social-con-content">Add Link to...</p>
            <SocialIconsComp
              icons={icons}
              onIconClick={handleSocialIconChange}
            />
          </AccordianComponent>
        </div>
        <div className="right">
          <img src="/assets/images/phone-links.png" alt="phone-links" />
        </div>
      </div>
    </div>
  );
};

export default LINKS;
