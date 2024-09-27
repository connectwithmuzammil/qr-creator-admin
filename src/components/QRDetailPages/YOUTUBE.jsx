import React, { useEffect, useState } from "react";
import { AccordianComponent } from "../AccordianComponent";
import { InputComponent } from "../InputComponent";
import Button from "../Button";
import { useLocation } from "react-router-dom";

const YOUTUBE = ({ qrData, setQrData }) => {
  const location = useLocation();
  // console.log("LOCATIONURL",location);

  useEffect(() => {
    if (location.state?.qrData) {
      setQrData(location.state.qrData.data);
    }
  }, [location.state, setQrData]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setQrData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  console.log("updatedQrData",qrData)
  return (
    <div className="youtube-page">
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
          <AccordianComponent title={"YouTube URL *"}>
            <div className="wrap-inp-cmp">
              <InputComponent
                placeholder={"e.g https://www.youtube.com/watch?v=1234"}
                onChange={handleInputChange}
                value={qrData.youtube_url}
                name="youtube_url"
              />
              {/* <Button title={"Upload Video"} width={"200px"} /> */}
            </div>
          </AccordianComponent>
        </div>
        <div className="right">
          <img src="/assets/images/phone-youtube.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default YOUTUBE;
