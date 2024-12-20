import React, { useEffect, useRef, useState } from "react";
// import {
//   BottomWrapperStages,
//   ColorPickerComponent,
//   Header,
// } from "../../components";

import Accordion from "react-bootstrap/Accordion";

// import { HexColorPicker } from "react-colorful";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CanvaFrame1,
  CanvaFrame10,
  CanvaFrame11,
  CanvaFrame2,
  CanvaFrame3,
  CanvaFrame4,
  CanvaFrame5,
  CanvaFrame6,
  CanvaFrame7,
  CanvaFrame8,
  CanvaFrame9,
  Frame1,
  Frame10,
  Frame11,
  Frame2,
  Frame3,
  Frame4,
  Frame5,
  Frame6,
  Frame7,
  Frame8,
  Frame9,
  NotSelected,
  NotSelectedFrameCanvas,
  QRDesignCenter1,
  QRDesignCenter2,
  QRDesignCenter3,
  QRDesignCenter4,
  QRDesignCenter5,
  QRDesignCenter6,
  QRDesignCorner1,
  QRDesignCorner2,
  QRDesignCorner3,
  QRDesignCorner4,
  QRDesignCorner5,
  QRDesignCorner6,
  QRDesignDetailIcon,
} from "./SVGIcon";
import ColorPickerComponent from "./ColorPicker";
import BottomWrapperStages from "./QrBottomStages";
import { AccordianComponent } from "./AccordianComponent";
// import apis from "../../services";

const QRDesign = () => {
  const [selectedOption, setSelectedOption] = useState("QR Code");
  const handleToggle = (option) => {
    setSelectedOption(option);
  };
  const [showModalPreview, setShowModalPreview] = useState(false);

  const { type } = useParams();
  // const qrDataVar = useSelector((state) => state.qrData);
  const navigate = useNavigate();
  const location = useLocation();
  const { qrData } = location.state || {};
  // const [qrLogoFile, setQrLogoFile] = useState(qrData?.qrDesignLogo || null);
  const [QRLogo, setQRLogo] = useState(qrData?.qrDesignLogo || null);
  // console.log("QRLogotetstt", QRLogo);

  console.log("qrDataStateValueDesignPage", qrData);
  useEffect(() => {
    if (!qrData) {
      navigate("/");
    }
  }, [qrData, navigate]);

  //SELECT QR CODE TYPE
  const cards = [
    {
      id: 1,
      title: "Standard QR code",
      description: "Manually design and customize your QR code",
    },
    // {
    //   id: 2,
    //   title: "AI-generated QR code",
    //   description: "Use AI to design and generate your QR code",
    // },
  ];
  const [SelectQrCode, setSelectQrCode] = useState(cards[0].id);

  // State COLOR PASS IN COLOR PICKER COMPONENT
  const [dotColor, setDotColor] = useState(
    qrData?.style?.dotsColor || "#000000"
  );
  const [cornerBackgroundColor, setCornerBackgroundColor] = useState(
    qrData?.style?.cornerBackgroundColor || "#ffffff"
  );
  const [cornerBorderColor, setCornerBorderColor] = useState(
    qrData?.style?.cornerBorderColor || "#000000"
  );
  const [cornerDotColor, setCornerDotColor] = useState(
    qrData?.style?.cornerDotColor || "#000000"
  );

  //FRAME TOGGLE STATE
  const [selectedFrame, setSelectedFrame] = useState(
    qrData?.style?.frameName || "notSelectedFrame"
  ); //"notSelctedFrame"
  //FRAME FIELD STATE
  const [frameColor, setFrameColor] = useState(
    qrData?.style?.frameColor || "#404040"
  );
  const [backgroundColor, setBackgroundColor] = useState(
    qrData?.style?.backgroundColor
  );
  // console.log("frameBgColor",frameBgColor)
  const [frameText, setFrameText] = useState(
    qrData?.style?.frameText || "Scan Me!"
  );
  const [frameTextColor, setFrameTextColor] = useState(
    qrData?.style?.frameTextColor || "#000000"
  );

  //DOT STYLE STATE
  const [selectedDotStyle, setSelectedDotStyle] = useState(
    qrData?.style?.dotsStyle || "classy-rounded"
  );
  const handleDotStyleClick = (styleId) => {
    setSelectedDotStyle(styleId);
  };

  //LOGO
  // const [qrLogo, setQrLogo] = useState(qrData?.qrDesignLogo || null);
  // console.log("qrData?.qrDesignLogo", qrData?.qrDesignLogo);

  //DOT STYLE STATE
  const [selectedCornerStyle, setSelectedCornerStyle] = useState(
    qrData?.style?.cornerStyle || "rounded"
  );
  const handleCornerStyleClick = (styleId) => {
    setSelectedCornerStyle(styleId);
  };

  // SET QR DATA TO QR CODE STYLING ON EDIT
  useEffect(() => {
    if (qrData && qrData.style) {
      qrData.style.dotsColor = dotColor;
      qrData.style.cornerBackgroundColor = cornerBackgroundColor;
      qrData.style.backgroundColor = backgroundColor;
      qrData.style.cornerBorderColor = cornerBorderColor;
      qrData.style.cornerDotColor = cornerDotColor;
      qrData.style.frameColor = frameColor;
      qrData.style.frameTextColor = frameTextColor;
      qrData.style.frameText = frameText;
      qrData.style.cornerStyle = selectedCornerStyle;
      qrData.style.dotsStyle = selectedDotStyle;
      qrData.style.frameName = selectedFrame;
    }
  }, [
    dotColor,
    cornerBackgroundColor,
    backgroundColor,
    cornerBorderColor,
    frameColor,
    frameTextColor,
    frameText,
    selectedCornerStyle,
    selectedDotStyle,
    qrData,
    selectedFrame,
    cornerDotColor,
  ]);

  // console.log("finalQrData", qrData);
  // console.log("selectedFrame", selectedFrame);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log("fileee", file);
    if (file) {
      setQRLogo(file);
      event.target.value = null;
    }
  };
  const getLogoSrc = () => {
    if (QRLogo instanceof File) {
      return URL.createObjectURL(QRLogo);
    }
    return QRLogo || "/assets/images/default-img.png";
  };
  if (qrData) {
    qrData.qrDesignLogo = QRLogo;
    console.log("qrData with uploaded logo file:", qrData);
  }
  const handleImageDelete = () => {
    setQRLogo(null);
  };

  //Render Frame CANVAS

  const FRAME_COMPONENTS = {
    notSelectedFrame: NotSelectedFrameCanvas,
    frame1: CanvaFrame1,
    frame2: CanvaFrame2,
    frame3: CanvaFrame3,
    frame4: CanvaFrame4,
    frame5: CanvaFrame5,
    frame6: CanvaFrame6,
    frame7: CanvaFrame7,
    frame8: CanvaFrame8,
    frame9: CanvaFrame9,
    frame10: CanvaFrame10,
    frame11: CanvaFrame11,
  };

  const renderFrame = () => {
    const FrameComponent = FRAME_COMPONENTS[selectedFrame] || null;

    const commonProps = {
      frameColor,
      backgroundColor,
      frameText,
      frameTextColor,
      cornerBackgroundColor,
      dotColor,
      cornerBorderColor,
      cornerDotColor,
      selectedCornerStyle,
      selectedDotStyle,
      qrLogo: QRLogo,
    };

    return FrameComponent ? <FrameComponent {...commonProps} /> : null;
  };

  const handleCancelClick = () => {
    navigate(`/qr-editor/${type}`);
  };

  return (
    <>
      {/* <Header /> */}
      <div className="qr-design">
        <div className="top">
          <h1>3. Design your QR code</h1>
        </div>
        <div className="containerr">
          <div className="left">
            <div className="bottom">
              <div className="one">
                <h1>Select the type of QR code you want to create</h1>
                <div className="card-con">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className={`cardd ${
                        SelectQrCode === card.id ? "active" : ""
                      }`}
                      onClick={() => setSelectQrCode(card.id)}
                    >
                      <span />
                      <div className="wrap">
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="two">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>QR code frame</Accordion.Header>
                    <Accordion.Body>
                      <div className="qr-frames-con">
                        <div
                          className={`img-con ${
                            selectedFrame === "notSelectedFrame" ? "active" : ""
                          }`}
                          onClick={() => setSelectedFrame("notSelectedFrame")}
                        >
                          <NotSelected />
                        </div>
                        <div
                          className={`img-con ${
                            selectedFrame === "frame1" ? "active" : ""
                          }`}
                          onClick={() => setSelectedFrame("frame1")}
                        >
                          <Frame1 />
                        </div>
                        <div
                          className={`img-con ${
                            selectedFrame === "frame2" ? "active" : ""
                          }`}
                          onClick={() => setSelectedFrame("frame2")}
                        >
                          <Frame2 width={72} height={96} />
                        </div>
                        <div
                          className={`img-con ${
                            selectedFrame === "frame3" ? "active" : ""
                          }`}
                          onClick={() => setSelectedFrame("frame3")}
                        >
                          <Frame3 />
                        </div>
                        <div
                          className={`img-con ${
                            selectedFrame === "frame4" ? "active" : ""
                          }`}
                          onClick={() => setSelectedFrame("frame4")}
                        >
                          <Frame4 />
                        </div>
                        <div
                          className={`img-con ${
                            selectedFrame === "frame5" ? "active" : ""
                          }`}
                          onClick={() => setSelectedFrame("frame5")}
                        >
                          <Frame5 />
                        </div>
                        <div
                          className={`img-con ${
                            selectedFrame === "frame6" ? "active" : ""
                          }`}
                          onClick={() => setSelectedFrame("frame6")}
                        >
                          <Frame6 />
                        </div>
                        <div
                          className={`img-con ${
                            selectedFrame === "frame7" ? "active" : ""
                          }`}
                          onClick={() => setSelectedFrame("frame7")}
                        >
                          <Frame7 />
                        </div>
                        <div
                          className={`img-con ${
                            selectedFrame === "frame8" ? "active" : ""
                          }`}
                          onClick={() => setSelectedFrame("frame8")}
                        >
                          <Frame8 />
                        </div>
                        <div
                          className={`img-con ${
                            selectedFrame === "frame9" ? "active" : ""
                          }`}
                          onClick={() => setSelectedFrame("frame9")}
                        >
                          <Frame9 />
                        </div>
                        <div
                          className={`img-con ${
                            selectedFrame === "frame10" ? "active" : ""
                          }`}
                          onClick={() => setSelectedFrame("frame10")}
                        >
                          <Frame10 />
                        </div>
                        <div
                          className={`img-con ${
                            selectedFrame === "frame11" ? "active" : ""
                          }`}
                          onClick={() => setSelectedFrame("frame11")}
                        >
                          <Frame11 />
                        </div>
                      </div>
                      {selectedFrame !== "notSelctedFrame" &&
                        selectedFrame !== 0 && (
                          <div className="bottom">
                            <div
                              className="up"
                              style={{ marginBottom: "12px" }}
                            >
                              <div className="color-picker-con">
                                <ColorPickerComponent
                                  label="Frame color"
                                  color={frameColor}
                                  setColor={setFrameColor}
                                />
                                <ColorPickerComponent
                                  label="Background color"
                                  color={backgroundColor}
                                  setColor={setBackgroundColor}
                                />
                              </div>
                            </div>
                            <div className="down">
                              <div className="color-picker-con">
                                <div className="input-text-con">
                                  <label htmlFor="">Frame text</label>
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    defaultValue={frameText}
                                    onChange={(e) =>
                                      setFrameText(e.target.value)
                                    }
                                  />
                                </div>
                                <ColorPickerComponent
                                  label="Text color"
                                  color={frameTextColor}
                                  setColor={setFrameTextColor}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className="three">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>QR Code pattern</Accordion.Header>
                    <Accordion.Body>
                      <div className="choose-contrasting-color">
                        <QRDesignDetailIcon />
                        <p>
                          Choose contrasting colors to make your QR codes easier
                          to read. We recommend using a light and dark color for
                          optimal performance.
                        </p>
                      </div>
                      <div className="dotStylePicker">
                        <ul>
                          <li
                            className={
                              selectedDotStyle === "classy-rounded"
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              handleDotStyleClick("classy-rounded")
                            }
                          >
                            <QRDesignCenter1 />
                          </li>
                          <li
                            className={
                              selectedDotStyle === "rounded" ? "active" : ""
                            }
                            onClick={() => handleDotStyleClick("rounded")}
                          >
                            <QRDesignCenter2 />
                          </li>
                          <li
                            className={
                              selectedDotStyle === "dots" ? "active" : ""
                            }
                            onClick={() => handleDotStyleClick("dots")}
                          >
                            <QRDesignCenter3 />
                          </li>
                          <li
                            className={
                              selectedDotStyle === "extra-rounded"
                                ? "active"
                                : ""
                            }
                            onClick={() => handleDotStyleClick("extra-rounded")}
                          >
                            <QRDesignCenter4 />
                          </li>
                          <li
                            className={
                              selectedDotStyle === "classy" ? "active" : ""
                            }
                            onClick={() => handleDotStyleClick("classy")}
                          >
                            <QRDesignCenter5 />
                          </li>
                          <li
                            className={
                              selectedDotStyle === "extra-rounded"
                                ? "active"
                                : ""
                            }
                            onClick={() => handleDotStyleClick("extra-rounded")}
                          >
                            <QRDesignCenter6 />
                          </li>
                        </ul>
                      </div>
                      <div className="dot-bg-color-con">
                        <div className="color-picker-con">
                          <ColorPickerComponent
                            label="Dot Color"
                            color={dotColor}
                            setColor={setDotColor}
                          />

                          <ColorPickerComponent
                            label="Background Color"
                            color={cornerBackgroundColor}
                            setColor={setCornerBackgroundColor}
                          />
                        </div>
                      </div>

                      {/* CORNER STYLING */}
                      <div className="dotStylePicker">
                        <h3>Corners style</h3>
                        <ul>
                          <li
                            className={
                              selectedCornerStyle === "rounded" ? "active" : ""
                            }
                            onClick={() => handleCornerStyleClick("rounded")}
                          >
                            <QRDesignCorner1 />
                          </li>
                          <li
                            className={
                              selectedCornerStyle === "dot" ? "active" : ""
                            }
                            onClick={() => handleCornerStyleClick("dot")}
                          >
                            <QRDesignCorner2 />
                          </li>
                          <li
                            className={
                              selectedCornerStyle === "extra-rounded"
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              handleCornerStyleClick("extra-rounded")
                            }
                          >
                            <QRDesignCorner3 />
                          </li>
                          <li
                            className={
                              selectedCornerStyle === "rounded-dot"
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              handleCornerStyleClick("rounded-dot")
                            }
                          >
                            <QRDesignCorner4 />
                          </li>
                          <li
                            className={
                              selectedCornerStyle === "square" ? "active" : ""
                            }
                            onClick={() => handleCornerStyleClick("square")}
                          >
                            <QRDesignCorner5 />
                          </li>
                          <li
                            className={
                              selectedCornerStyle === "square-square"
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              handleCornerStyleClick("square-square")
                            }
                          >
                            <QRDesignCorner6 />
                          </li>
                        </ul>
                      </div>
                      <div className="dot-bg-color-con">
                        <div className="color-picker-con">
                          <ColorPickerComponent
                            label="Corner square color"
                            color={cornerBorderColor}
                            setColor={setCornerBorderColor}
                          />
                          <ColorPickerComponent
                            label="Corner dot color"
                            color={cornerDotColor}
                            setColor={setCornerDotColor}
                          />
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className="four">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Add a logo</Accordion.Header>
                    <Accordion.Body>
                      <div className="input-con">
                        <p>Logo</p>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              {/* <AccordianComponent title={"Add a Logo"}>
                <div className="img-upload-comp">
                  <div className="wrap">
                    <p>Logo</p>
                    <div className="img-wrapper">
                      <img
                        // src={QRLogo || "/assets/images/default-img.png"}
                        src={getLogoSrc()}
                        alt="Uploaded"
                        className="uploaded-img"
                      />
                      <div className="icon-overlay">
                        <label
                          className="upload-icon"
                        >
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
              
                </div>
              </AccordianComponent> */}
            </div>
          </div>
          <div className="right">
            <div className="qr-preview design">
              <div className="img-con">
                <img
                  src="/assets/images/phone-frame.jpeg"
                  alt=""
                  className="mobile-frame"
                />
                {renderFrame()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomWrapperStages
        currentStage={3}
        onCancelClick={handleCancelClick}
        showNextButton={true}
        generateQrPayload={qrData}
      />
    </>
  );
};

export default QRDesign;
