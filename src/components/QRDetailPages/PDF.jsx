import React, { useEffect, useState } from "react";
import { AccordianComponent } from "../AccordianComponent";
import { FaTrash } from "react-icons/fa";
import { InputComponent } from "../InputComponent";
import CutsomColorPickerComp from "../CutsomColorPickerComp";
import { useLocation } from "react-router-dom";

import { MdErrorOutline } from "react-icons/md";

const PDF = ({ localQrData, setLocalQrData, errors, setErrors }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.qrData) {
      const qrDataFromLocation = location.state.qrData.data;
      setLocalQrData(qrDataFromLocation);

      if (qrDataFromLocation.pdf_file) {
        setFile(qrDataFromLocation.pdf_file);
      }

      if (qrDataFromLocation.color) {
        setLocalQrData((prevQrData) => ({
          ...prevQrData,
          color: qrDataFromLocation.color,
        }));
      }
    }
  }, [location.state, setLocalQrData]);

  const [file, setFile] = useState(localQrData.pdf_file || null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setLocalQrData((prevData) => ({
        ...prevData,
        pdf_file: selectedFile, // Store the selected PDF file
      }));
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleDelete = () => {
    setFile(null);
    setLocalQrData((prevData) => ({
      ...prevData,
      pdf_file: null, // Reset the PDF file in the state
    }));
  };

  const formatFileSize = (size) => {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalQrData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const colors = [
    { id: "blue", background: "#d1e5fa", button: "#1466b8" },
    { id: "green", background: "#e8fce8", button: "#0e8b70" },
    { id: "yellow", background: "#fff9cc", button: "#998600" },
    { id: "red", background: "#fecdd6", button: "#b00223" },
  ];

  console.log("file", file);

  console.log("updatedQRData", localQrData);
  return (
    <>
      <div className="pdf-page">
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
            <AccordianComponent title={"Upload your PDF file"}>
              <div className="pdf-uploader-container">
                {!file ? (
                  <>
                    <label htmlFor="pdfUpload" className="upload-button">
                      Upload your PDF file
                    </label>
                    <input
                      id="pdfUpload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <p className="file-size-text">Max-size: 20MB</p>
                  </>
                ) : (
                  <div className="file-info">
                    {typeof file === "string" ? (
                      <>
                        <p>{file}</p>
                        <a
                          href={file}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View PDF
                        </a>
                        {/* <iframe
                        src={file}
                        width="100%"
                        height="500px"
                        title="PDF Preview"
                      ></iframe> */}
                      </>
                    ) : (
                      <>
                        {file.name ? (
                          <>
                            <p>{file.name}</p>
                            <p>{formatFileSize(file.size)}</p>
                          </>
                        ) : (
                          <p>No file name available</p>
                        )}
                      </>
                    )}
                    <FaTrash className="delete-icon" onClick={handleDelete} />
                  </div>
                )}
              </div>

              {errors?.pdf_file && (
                <div className="error-message">
                  <MdErrorOutline className="error-icon" />
                  {errors.pdf_file}
                </div>
              )}
            </AccordianComponent>
            <AccordianComponent title={"Choose your design"}>
              <CutsomColorPickerComp
                colors={colors}
                qrData={localQrData}
                setQrData={setLocalQrData}
              />
            </AccordianComponent>
            <AccordianComponent title={"Enter the PDF details"}>
              <InputComponent
                label={"Company"}
                placeholder={"e.g. Pizza Palace"}
                name={"pdf_company"}
                value={localQrData.pdf_company}
                onChange={handleInputChange}
              />
              <InputComponent
                label={"PDF name/title"}
                placeholder={"e.g. Pizza   Menu"}
                name={"pdf_title"}
                value={localQrData.pdf_title}
                onChange={handleInputChange}
              />
              <InputComponent
                label={"Description"}
                placeholder={"e.g. Over 50 topping to choose from!="}
                name={"pdf_description"}
                value={localQrData?.pdf_description}
                onChange={handleInputChange}
              />
              <InputComponent
                label={"Website"}
                placeholder={"e.g. https://www.pizzapalace.com"}
                name={"pdf_website"}
                value={localQrData?.pdf_website}
                onChange={handleInputChange}
              />
            </AccordianComponent>
          </div>
          <div className="right">
            <img src="/assets/images/phone-pdf.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PDF;
