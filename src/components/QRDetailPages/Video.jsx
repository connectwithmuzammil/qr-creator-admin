import React, { useEffect, useState } from "react";
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
import VideoUpload from "../VideoUploadComp";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearField } from "../../redux/slice/qrSlice";
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
const Video = ({ localQrData, setLocalQrData, errors, setErrors }) => {
  const dispatch = useDispatch();

  //EDIT
  const location = useLocation();
  // console.log("LOCATIONURLSOCAPP", location);

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
    }
  }, [location.state, setLocalQrData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalQrData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVideoUpload = (video) => {
    console.log("VIDEO UPLOAD", video);
    // const videoUrl = URL.createObjectURL(video);
    setLocalQrData((prevData) => ({
      ...prevData,
      video_path: video,
    }));
  };
  const handleVideoRemove = () => {
    dispatch(clearField("video_path"));
    setLocalQrData((prevData) => ({
      ...prevData,
      video_path: null,
    }));
  };

  console.log("oneditcheckLocal", localQrData?.video_path);

  return (
    <>
      <div className="video-page">
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
            <AccordianComponent title={"Video"}>
              {/* <div
              className="wrap-inp-cmp"
              style={{ alignItems: "center", display: "none" }}
            >
              <InputComponent
                label={"Video URL"}
                name={"video_company_name"}
                placeholder={"e.g. https://www.myweb.com/video2"}
                onChange={handleInputChange}
                value={localQrData?.video_company_name}
              />
              <Button title={"Add Video"} width={"200px"} />
            </div> */}
              <p className="social-con-content">
                If you prefer, you can upload your video
              </p>
              <div className="wrapper-img-upload-dashed">
                {localQrData?.video_path ? (
                  localQrData?.video_path instanceof File ? (
                    <div className="video-url-display">
                      <div
                        style={{
                          margin: "0",
                          padding: "10px",
                          position: "relative",
                        }}
                      >
                        <video
                          src={URL.createObjectURL(localQrData?.video_path)}
                          controls
                          style={{
                            width: "100%",
                            maxWidth: "500px",
                            border: "2px solid #007BFF",
                            borderRadius: "8px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <button
                          onClick={() => handleVideoRemove()}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            backgroundColor: "#FF4D4F",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="video-url-display"
                      style={{ position: "relative" }}
                    >
                      <p
                        style={{
                          margin: "0",
                          color: "#007BFF",
                          fontWeight: "500",
                          fontSize: "14px",
                          padding: "10px",
                        }}
                      >
                        Video URL: &nbsp;
                        <a
                          href={localQrData?.video_path}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            color: "#007BFF",
                            fontWeight: "bold",
                            wordBreak: "break-all",
                          }}
                        >
                          {localQrData?.video_path}
                        </a>
                        <button
                          onClick={() => handleVideoRemove()}
                          style={{
                            marginLeft: "10px",
                            backgroundColor: "#FF4D4F",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </p>
                    </div>
                  )
                ) : (
                  <VideoUpload
                    onVideoUpload={handleVideoUpload}
                    localQrData={localQrData}
                    setLocalQrData={setLocalQrData}
                  />
                )}
              </div>

              {errors?.video_path && (
                <div className="error-message">
                  <MdErrorOutline className="error-icon" />
                  {errors.video_path}
                </div>
              )}
            </AccordianComponent>
            <AccordianComponent title={"Video Information"}>
              <InputComponent
                label={"Company name"}
                name={"video_name"}
                placeholder={"e.g. Furniture Store"}
                onChange={handleInputChange}
                value={localQrData?.video_name}
              />
              <InputComponent
                label={"Video title"}
                name={"video_title"}
                placeholder={"e.g. Assemble your flat-pack wardrobe"}
                onChange={handleInputChange}
                value={localQrData?.video_title}
              />
              <InputComponent
                label={"Description"}
                name={"video_description"}
                placeholder={
                  "e.g. A video guide to putting together your new furniture store wardrobe"
                }
                onChange={handleInputChange}
                value={localQrData?.video_description}
              />
              <InputComponent
                // value={localQrData?.video_button}

                label={"Button text"}
                name={"video_button"}
                placeholder={"e.g. Watch now"}
                onChange={handleInputChange}
                value={localQrData?.video_button}
              />
              {console.log(
                "localQrData?.video_button",
                localQrData?.video_button
              )}
              <InputComponent
                label={"URL"}
                name={"video_url"}
                placeholder={"e.g. https://www.myvideo..."}
                onChange={handleInputChange}
                value={localQrData?.video_url}
              />
            </AccordianComponent>
            <AccordianComponent title={"Social networks"}>
              <p className="social-con-content">Add Link to...</p>
              <SocialIconsComp
                icons={icons}
                localQrData={localQrData}
                setLocalQrData={setLocalQrData}
                dataKey={"video_social"}
                // onIconClick={handleSocialIconChange}
                // initialLinks={localQrData?.video_social}
                // isEditing={!!location.state?.qrData}
              />
            </AccordianComponent>
          </div>
          <div className="right">
            <img src="/assets/images/phone-video.png" alt="phone-video" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Video;
