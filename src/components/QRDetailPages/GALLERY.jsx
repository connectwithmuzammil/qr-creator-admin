import React from "react";
import { InputComponent } from "../InputComponent";
import { AccordianComponent } from "../AccordianComponent";
import CutsomColorPickerComp from "../CutsomColorPickerComp";
import ImageUploadComponent from "../ImageUploadComp";

const colors = [
  { id: "blue", background: "#d1e5fa", button: "#1466b8" },
  { id: "green", background: "#e8fce8", button: "#0e8b70" },
  { id: "yellow", background: "#fff9cc", button: "#998600" },
  { id: "red", background: "#fecdd6", button: "#b00223" },
];
const GALLERY = ({ qrData, setQrData }) => {
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

  return (
    <div className="gallery-page">
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
          <AccordianComponent title={"Add images"}>
            <div className="wrapper-img-upload-dashed">
              <ImageUploadComponent
                defaultImage={"/assets/images/default-img.png"}
                onImageUpload={handleImageUpload}
                // onImageDelete={handleImageDelete}
                label="Upload Image"
                name="gallery_image"
              />
            </div>
          </AccordianComponent>
          <AccordianComponent title={"Information about your images' gallery"}>
            <InputComponent
              label={"Image/photo/album title"}
              name={"gallery_title"}
              placeholder={"e.g. Our wedding album"}
              onChange={handleInputChange}
              value={qrData?.gallery_title}
            />
            <InputComponent
              label={"Description"}
              name={"gallery_description"}
              placeholder={"e.g. Professional photos from our wedding day"}
              onChange={handleInputChange}
              value={qrData?.gallery_description}
            />
            <InputComponent
              label={"Website"}
              name={"gallery_website"}
              placeholder={"e.g. https://www.ourweddingwebsite.com"}
              onChange={handleInputChange}
              value={qrData?.gallery_website}
            />
            <div className="wrap-inp-cmp">
              <InputComponent
                label={"Button text"}
                name={"gallery_btn_text"}
                placeholder={"e.g. Write your link text here..."}
                onChange={handleInputChange}
                value={qrData?.gallery_btn_text}
              />
              <InputComponent
                label={"URL"}
                name={"gallery_url"}
                placeholder={"e.g. https://..."}
                onChange={handleInputChange}
                value={qrData?.gallery_url}
              />
            </div>
          </AccordianComponent>
        </div>
        <div className="right">
          <img src="/assets/images/phone-image.png" alt="phone-image" />
        </div>
      </div>
    </div>
  );
};

export default GALLERY;
