import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
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
  NotSelectedFrameCanvas,
} from "../components/SVGIcon";
import QRCodeStyling from "qr-code-styling";

const QRIMAGESHOW = () => {
  const location = useLocation();
  const QRres = location.state || {};
  console.log("QRres", QRres?.singleViewDetail);

  const qrCode = useRef(null);

  const [selectedFrame, setSelectedFrame] = useState(
    QRres?.singleViewDetail?.[0]?.style?.frameName
  );
  console.log("selectedFrame", selectedFrame);

  let data = QRres?.singleViewDetail?.[0]?.outcome;
  console.log("QRres?.singleViewDetail?.outcome", data);
  let dotColor = QRres?.singleViewDetail?.[0]?.style?.dotsColor;
  let CornerbgColor =
    QRres?.singleViewDetail?.[0]?.style?.cornerBackgroundColor;
  let cornerBorderColor =
    QRres?.singleViewDetail?.[0]?.style?.cornerBorderColor;
  let cornerDotColor = QRres?.singleViewDetail?.[0]?.style?.cornerDotColor;
  let selectedDotStyle = QRres?.singleViewDetail?.[0]?.style?.dotsStyle;
  let selectedCornerStyle = QRres?.singleViewDetail?.[0]?.style?.cornerStyle;
  //FRAME
  let frameColor = QRres?.singleViewDetail?.[0]?.style?.frameColor;
  let frameBgColor = QRres?.singleViewDetail?.[0]?.style?.backgroundColor;
  let frameText = QRres?.singleViewDetail?.[0]?.style?.frameText;
  let frameTextColor = QRres?.singleViewDetail?.[0]?.style?.frameTextColor;

  console.log("datta", data);

  const qrCodeOptions = {
    width: 130,
    height: 130,
    data: data,
    dotsOptions: {
      color: dotColor,
      type: selectedDotStyle,
    },
    cornersSquareOptions: {
      color: "#000000",
      type: selectedCornerStyle, // This will dynamically change
    },
    cornersDotOptions: {
      color: cornerDotColor, // Customize if needed
    },
    backgroundOptions: {
      color: CornerbgColor, // Background color of the QR code
    },
    cornersSquareOptions: {
      color: cornerBorderColor,
      type: selectedCornerStyle, // Update corner style on change
    },
  };

  useEffect(() => {
    qrCode.current = new QRCodeStyling(qrCodeOptions);
    qrCode.current.append(document.getElementById("qrCode"));
  }, []);

  const renderFrame = () => {
    switch (selectedFrame) {
      case "notSelctedFrame":
        console.log("INSIDE notSelctedFrame CASE");
        return (
          <NotSelectedFrameCanvas
            CornerbgColor={CornerbgColor}
            dotColor={dotColor}
            cornerBorderColor={cornerBorderColor}
            cornerDotColor={cornerDotColor}
            selectedCornerStyle={selectedCornerStyle}
            selectedDotStyle={selectedDotStyle}
            data={data}
          />
        );
      case "frame1":
        console.log("INSIDE CASE 1");
        return (
          <CanvaFrame1
            frameColor={frameColor}
            frameBorderColor={frameBgColor}
            frameText={frameText}
            frameTextColor={frameTextColor}
            CornerbgColor={CornerbgColor}
            dotColor={dotColor}
            cornerBorderColor={cornerBorderColor}
            cornerDotColor={cornerDotColor}
            selectedCornerStyle={selectedCornerStyle}
            selectedDotStyle={selectedDotStyle}
            data={data}
          />
        );
      case "frame2":
        return (
          <CanvaFrame2
            frameColor={frameColor}
            frameBorderColor={frameBgColor}
            frameText={frameText}
            frameTextColor={frameTextColor}
            CornerbgColor={CornerbgColor}
            dotColor={dotColor}
            cornerBorderColor={cornerBorderColor}
            cornerDotColor={cornerDotColor}
            selectedCornerStyle={selectedCornerStyle}
            selectedDotStyle={selectedDotStyle}
            data={data}
          />
        );
      case "frame3":
        return (
          <CanvaFrame3
            frameColor={frameColor}
            frameBorderColor={frameBgColor}
            frameText={frameText}
            frameTextColor={frameTextColor}
            CornerbgColor={CornerbgColor}
            dotColor={dotColor}
            cornerBorderColor={cornerBorderColor}
            cornerDotColor={cornerDotColor}
            selectedCornerStyle={selectedCornerStyle}
            selectedDotStyle={selectedDotStyle}
            data={data}
          />
        );
      case "frame4":
        return (
          <CanvaFrame4
            frameColor={frameColor}
            frameBorderColor={frameBgColor}
            frameText={frameText}
            frameTextColor={frameTextColor}
            CornerbgColor={CornerbgColor}
            dotColor={dotColor}
            cornerBorderColor={cornerBorderColor}
            cornerDotColor={cornerDotColor}
            selectedCornerStyle={selectedCornerStyle}
            selectedDotStyle={selectedDotStyle}
            data={data}
          />
        );
      case "frame5":
        return (
          <CanvaFrame5
            frameColor={frameColor}
            frameBorderColor={frameBgColor}
            frameText={frameText}
            frameTextColor={frameTextColor}
            CornerbgColor={CornerbgColor}
            dotColor={dotColor}
            cornerBorderColor={cornerBorderColor}
            cornerDotColor={cornerDotColor}
            selectedCornerStyle={selectedCornerStyle}
            selectedDotStyle={selectedDotStyle}
            data={data}
          />
        );
      case "frame6":
        return (
          <CanvaFrame6
            frameColor={frameColor}
            frameBorderColor={frameBgColor}
            frameText={frameText}
            frameTextColor={frameTextColor}
            CornerbgColor={CornerbgColor}
            dotColor={dotColor}
            cornerBorderColor={cornerBorderColor}
            cornerDotColor={cornerDotColor}
            selectedCornerStyle={selectedCornerStyle}
            selectedDotStyle={selectedDotStyle}
            data={data}
          />
        );
      case "frame7":
        return (
          <CanvaFrame7
            frameColor={frameColor}
            frameBorderColor={frameBgColor}
            frameText={frameText}
            frameTextColor={frameTextColor}
            CornerbgColor={CornerbgColor}
            dotColor={dotColor}
            cornerBorderColor={cornerBorderColor}
            cornerDotColor={cornerDotColor}
            selectedCornerStyle={selectedCornerStyle}
            selectedDotStyle={selectedDotStyle}
            data={data}
          />
        );
      case "frame8":
        return (
          <CanvaFrame8
            frameColor={frameColor}
            frameBorderColor={frameBgColor}
            frameText={frameText}
            frameTextColor={frameTextColor}
            CornerbgColor={CornerbgColor}
            dotColor={dotColor}
            cornerBorderColor={cornerBorderColor}
            cornerDotColor={cornerDotColor}
            selectedCornerStyle={selectedCornerStyle}
            selectedDotStyle={selectedDotStyle}
            data={data}
          />
        );
      case "frame9":
        return (
          <CanvaFrame9
            frameColor={frameColor}
            frameBorderColor={frameBgColor}
            frameText={frameText}
            frameTextColor={frameTextColor}
            CornerbgColor={CornerbgColor}
            dotColor={dotColor}
            cornerBorderColor={cornerBorderColor}
            cornerDotColor={cornerDotColor}
            selectedCornerStyle={selectedCornerStyle}
            selectedDotStyle={selectedDotStyle}
            data={data}
          />
        );
      case "frame10":
        return (
          <CanvaFrame10
            frameColor={frameColor}
            frameBorderColor={frameBgColor}
            frameText={frameText}
            frameTextColor={frameTextColor}
            CornerbgColor={CornerbgColor}
            dotColor={dotColor}
            cornerBorderColor={cornerBorderColor}
            cornerDotColor={cornerDotColor}
            selectedCornerStyle={selectedCornerStyle}
            selectedDotStyle={selectedDotStyle}
            data={data}
          />
        );
      case "frame11":
        return (
          <CanvaFrame11
            frameColor={frameColor}
            frameBorderColor={frameBgColor}
            frameText={frameText}
            frameTextColor={frameTextColor}
            CornerbgColor={CornerbgColor}
            dotColor={dotColor}
            cornerBorderColor={cornerBorderColor}
            cornerDotColor={cornerDotColor}
            selectedCornerStyle={selectedCornerStyle}
            selectedDotStyle={selectedDotStyle}
            data={data}
          />
        );
      // ... Add cases for other frames
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // flexDirection: "column",
        height: "100vh",
        padding: "50px",
      }}
      className="qr-image-show-delete"
    >
      <div className="qr-preview">
        <div className="img-con">
          {renderFrame()}
          <div className="frame-overlay" style={{ position: "static" }}></div>
        </div>
      </div>
    </div>
  );
};

export default QRIMAGESHOW;
