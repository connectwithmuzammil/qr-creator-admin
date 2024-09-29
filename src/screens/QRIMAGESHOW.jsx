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
import { FaQrcode } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { BarChartAnalytics, LineChartComp } from "../components";

const QRIMAGESHOW = () => {
  const [dataOS, setDataOS] = useState([]);
  const [dataCountry, setDataCountry] = useState([]);
  const [dataCity, setDataCity] = useState([]);

  const location = useLocation();
  const QRres = location.state || {};
  console.log("QRres", QRres);

  const qrCode = useRef(null);

  const [selectedFrame, setSelectedFrame] = useState(
    QRres?.singleViewDetail?.style?.frameName
  );
  // console.log("selectedFrame", selectedFrame);

  let data = QRres?.singleViewDetail?.outcome;
  console.log("QRres?.singleViewDetail?.outcome", data);
  let dotColor = QRres?.singleViewDetail?.style?.dotsColor;
  let CornerbgColor = QRres?.singleViewDetail?.style?.cornerBackgroundColor;
  let cornerBorderColor = QRres?.singleViewDetail?.style?.cornerBorderColor;
  let cornerDotColor = QRres?.singleViewDetail?.style?.cornerDotColor;
  let selectedDotStyle = QRres?.singleViewDetail?.style?.dotsStyle;
  let selectedCornerStyle = QRres?.singleViewDetail?.style?.cornerStyle;
  //FRAME
  let frameColor = QRres?.singleViewDetail?.style?.frameColor;
  let frameBgColor = QRres?.singleViewDetail?.style?.backgroundColor;
  let frameText = QRres?.singleViewDetail?.style?.frameText;
  let frameTextColor = QRres?.singleViewDetail?.style?.frameTextColor;

  // console.log("datta", data);

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
      type: selectedCornerStyle,
    },
    cornersDotOptions: {
      color: cornerDotColor,
    },
    backgroundOptions: {
      color: CornerbgColor,
    },
    cornersSquareOptions: {
      color: cornerBorderColor,
      type: selectedCornerStyle,
    },
  };

  useEffect(() => {
    qrCode.current = new QRCodeStyling(qrCodeOptions);
    qrCode.current.append(document.getElementById("qrCode"));
  }, []);

  useEffect(() => {
    if (QRres?.statsDataSystem?.data) {
      const {
        os = [],
        countries = [],
        cities = [],
      } = QRres?.statsDataSystem?.data;

      // Format the data for each category
      setDataOS(os.map(({ name, scans }) => ({ name, scans })));
      setDataCountry(countries.map(({ name, scans }) => ({ name, scans })));
      setDataCity(cities.map(({ name, scans }) => ({ name, scans })));
    }
  }, [QRres?.statsDataSystem]);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format API data for the chart
  const formattedData = QRres?.statsDataScanActivity?.data?.map((item) => ({
    name: monthNames[item.month - 1], // Convert month number to month name
    scans: item.scans,
  }));

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
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   height: "100vh",
      //   padding: "50px",
      // }}
      // className="qr-image-show-delete"
      className="qrDetailsPage"
    >
      <div className="qr-preview">
        <div className="img-con">
          {renderFrame()}
          <div className="frame-overlay" style={{ position: "static" }}></div>
        </div>
      </div>
      <div className="userAnalyticscon">
        <div className="cardd">
          <FaQrcode />
          <h3>Total QR</h3>
          <p>{QRres?.statsData?.total_qr ? QRres?.statsData?.total_qr : "0"}</p>
        </div>
        <div className="cardd">
          <AiOutlineEye />
          <h3>Total Scan</h3>
          <p>
            {QRres?.statsData?.total_scan ? QRres?.statsData?.total_scan : "0"}
          </p>
        </div>
      </div>

      <div className="graph-con" style={{ width: "100%", height: "400px" }}>
        <div className="main-filter-con">
          <p>Scans Activity </p>
        </div>

        {false ? (
          <h4>Loading...</h4>
        ) : (
          <>
            {formattedData && formattedData.length > 0 ? (
              <LineChartComp data={formattedData} />
            ) : (
              <h4 className="stats-txt">Need more data to show statistics</h4>
            )}
          </>
        )}
      </div>

      <div className="all-card-con">
        <div className="cardd">
          <p>Scans per operating system</p>
          {QRres?.statsDataSystem?.data?.os?.length < 0 ? (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "250px",
              }}
            >
              Loading...
            </p>
          ) : dataOS && dataOS.length > 0 ? (
            <BarChartAnalytics data={dataOS} />
          ) : (
            <h4 className="stats-txt">Need more data to show statistics</h4>
          )}
        </div>

        <div className="cardd">
          <p>Scans per country</p>
          {QRres?.statsDataSystem?.data?.countries?.length < 0 ? (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "250px",
              }}
            >
              Loading...
            </p>
          ) : dataCountry && dataCountry.length > 0 ? (
            <BarChartAnalytics data={dataCountry} />
          ) : (
            <h4 className="stats-txt">Need more data to show statistics</h4>
          )}
        </div>

        <div className="cardd">
          <p>Scans per city/region</p>
          {QRres?.statsDataSystem?.data?.cities?.length < 0 ? (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "250px",
              }}
            >
              Loading...
            </p>
          ) : dataCity && dataCity.length > 0 ? (
            <BarChartAnalytics data={dataCity} />
          ) : (
            <h4 className="stats-txt">Need more data to show statistics</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRIMAGESHOW;
