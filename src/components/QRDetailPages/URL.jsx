import React, { useEffect } from "react";
import { AccordianComponent, AccordianWithInput } from "../AccordianComponent";
import { InputComponent } from "../InputComponent";
import { useLocation } from "react-router-dom";

const URL = ({ localQrData, setLocalQrData, errors, setErrors }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.qrData) {
      setLocalQrData(location?.state?.qrData?.data);
    }
  }, [location.state, setLocalQrData]);

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
                value={localQrData?.qr_name}
              />
            </AccordianComponent>
            <AccordianComponent
              title={"Type in the URL to link with your QR Code *"}
            >
              <InputComponent
                placeholder={"https://surfershops.com/sale"}
                type={"url"}
                onChange={handleInputChange}
                value={localQrData?.field_url}
                name={"field_url"}
                error={errors.field_url}
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
