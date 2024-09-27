import React, { useEffect } from "react";
import { AccordianComponent } from "../AccordianComponent";
import {
  InputCheckboxComponent,
  InputComponent,
  InputSelectComponent,
} from "../InputComponent";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const WIFI = ({ qrData, setQrData }) => {
  const { user } = useSelector((store) => store.user);
  const location = useLocation();
  useEffect(() => {
    if (location.state?.qrData) {
      setQrData(location.state.qrData.data);
    }
  }, [location.state, setQrData]);

  // console.log("useruser", user);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQrData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log("location", location);

  return (
    <div className="wifi-page">
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
          <AccordianComponent title={"Network information"}>
            <div className="wrap-inp-cmp">
              <InputComponent
                label={"Network name (SSID)*"}
                name={"network_name"}
                placeholder={"e.g. centralcafe"}
                onChange={handleInputChange}
                value={qrData.network_name}
                // disabled
              />
              <InputComponent
                label={"Network password*"}
                name={"network_password"}
                placeholder={"e.g. mypassword"}
                onChange={handleInputChange}
                // value={qrData.network_password}
                value={qrData?.network_password}
                // disabled
              />
            </div>
            <div className="wrap-inp-cmp">
              <InputSelectComponent
                label="Security type*"
                name="network_security_type"
                value={qrData.network_security_type}
                onChange={handleInputChange}
                defaultOption="Select security type"
                options={[
                  { label: "WEP", value: "WEP" },
                  { label: "WPA", value: "WPA" },
                  { label: "WPA2", value: "WPA2" },
                  { label: "WPA3", value: "WPA3" },
                ]}
              />
              {/* <InputComponent
                label={"Security type*"}
                name={"network_security_type"}
              /> */}
              <InputCheckboxComponent label={"Hidden network"} />
            </div>
          </AccordianComponent>
        </div>
        <div className="right">
          <img src="/assets/images/phone-wifi.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default WIFI;
