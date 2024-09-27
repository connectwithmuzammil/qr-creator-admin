import React, { useEffect } from "react";
import { AccordianComponent, AccordianWithInput } from "../AccordianComponent";
import { InputComponent } from "../InputComponent";
import { useLocation } from "react-router-dom";

const URL = ({ qrData, setQrData }) => {
  const location = useLocation();
  console.log("LOCATIONURL",location);

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

  console.log("QRDATAUPDATED", qrData);
  return (
    <>
      <div className="url">
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
            <AccordianComponent
              title={"Type in the URL to link with your QR Code *"}
            >
              <InputComponent
                placeholder={"https://surfershops.com/sale"}
                type={"url"}
                onChange={handleInputChange}
                value={qrData.field_url}
                name={"field_url"}
              />
            </AccordianComponent>
          </div>
          <div className="right">
            <img src="/assets/images/phone-url.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default URL;

