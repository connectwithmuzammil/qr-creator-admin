import React, { useState } from "react";
import { Sidebar } from "../components";
import { useQuery } from "@tanstack/react-query";
import apis from "../services";
import { MdEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
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

const products = ["wine", "beer", "cigars", "coffee", "food", "product"];

const AllQrList = () => {
  const location = useLocation();
  // console.log("singleUserQRCode",location);
  const singleUserQRCode = location?.state?.userQrData;
  console.log("singleUserQRCode", singleUserQRCode);
  const [loadingMap, setLoadingMap] = useState({});

  const navigate = useNavigate();
  const {
    isLoading,
    data: { data: getQrList } = {},
    refetch,
  } = useQuery({
    queryKey: ["getAllQrList"],
    queryFn: () => apis.getQrList(),
    onError: (error) => {
      console.error("Error geting QRStats:", error);
      // toast.error("Failed to fetch products. Please try again later.");
    },
  });
  console.log("getQrList", getQrList);

  const handleViewDetail = async (singleViewDetail) => {
    // console.log("singleViewDetail", singleViewDetail);
    let userQrStats = await apis.getEachUserQRStat(singleViewDetail?.id);
    let statsData = userQrStats?.data;
    let userQrSystem = await apis.getEachUserQRSystem(singleViewDetail?.id);
    let statsDataSystem = userQrSystem?.data;
    let userQrScanActivity = await apis.getEachUserQRScanActivity(
      singleViewDetail?.id
    );
    // console.log("userQrScanActivity",userQrScanActivity?.data);
    let statsDataScanActivity = userQrScanActivity?.data;

    navigate("/qr-image", {
      state: {
        singleViewDetail,
        statsData,
        statsDataSystem,
        statsDataScanActivity,
      },
    });
  };

  const frameComponents = {
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

  const renderFrame = (selectedFrame, qrCodeData, data) => {
    const FrameComponent = frameComponents[selectedFrame];
    return FrameComponent ? (
      <FrameComponent
        {...qrCodeData}
        data={data?.image_path}
        qrLogo={data?.qrDesignLogo}
      />
    ) : null;
  };

  const handleEdit = async (id, type) => {
    // console.log("EDIT IDDD", id);
    setLoadingMap((prev) => ({ ...prev, [id]: true }));
    try {
      let res = await apis.getSingleQr(id);
      let qrData = res.data;
      // console.log("qrDataEdit", qrData);
      navigate(`/qr-editor/${type}`, { state: { qrData } });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingMap((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <div className="loaderr" />
      </div>
    );
  }

  const qrDataToDisplay = singleUserQRCode || getQrList;
  console.log("qrDataToDisplay", qrDataToDisplay?.data[0]?.qrcodes?.length);

  return (
    <div className="qr-main-page all-qrList">
      <div className="userDashboard">
        <Sidebar />
        <div className="content-page">
          <h1>{singleUserQRCode ? "USER QR LIST" : "ALL QR LIST"}</h1>
          {/* Check if there is no QR data */}
          {singleUserQRCode?.data[0]?.qrcodes?.length == 0 && (
            <div className="no-data-message">
              <h3>No QR codes available</h3>
            </div>
          )}
          {qrDataToDisplay?.data?.length > 0 &&
            qrDataToDisplay?.data?.map((qrList) => {
              if (qrList?.qrcodes?.length > 0) {
                // Sort qrcodes by qr_name in alphabetical order (case-insensitive)
                const sortedQRCodes = qrList?.qrcodes?.sort((a, b) => {
                  const nameA = a?.qr_name?.toUpperCase(); // Ignore case
                  const nameB = b?.qr_name?.toUpperCase(); // Ignore case
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                });

                // console.log("isLoading", isLoading);

                return (
                  <div className="result-cardd" key={qrList?.id}>
                    {console.log("qrList", qrList)}
                    {sortedQRCodes.map((qrCode, index) => {
                      const selectedFrame = qrCode?.style?.frameName;
                      const isLoading = loadingMap[qrCode?.id];

                      const matchedProduct = products.find(
                        (product) => qrCode[product] === "true"
                      );
                      return (
                        <div className="result-cardd-wrapper" key={index}>
                          {console.log("QRCOD,mnmE", qrCode)}
                          <div className="one">
                            <div className="img-con">
                              {renderFrame(
                                selectedFrame,
                                qrCode?.style,
                                qrCode
                              )}
                            </div>
                            <div className="content-wrap">
                              <h4>
                                {qrCode?.type === "social_media"
                                  ? "Social Media"
                                  : qrCode?.type === "image_gallery"
                                  ? "Image Gallery"
                                  : qrCode?.type === "business_page"
                                  ? "Business"
                                  : qrCode?.type}
                              </h4>
                              <h3>
                                {qrCode?.type === "elabels"
                                  ? matchedProduct.toUpperCase()
                                  : qrCode?.qr_name}
                              </h3>
                            </div>
                          </div>
                          <div className="two">
                            <div
                              className="modifiedDate-con"
                              bis_skin_checked="1"
                            >
                              <div className="wrap" bis_skin_checked="1">
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  stroke-width="0"
                                  viewBox="0 0 24 24"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path fill="none" d="M0 0h24v24H0z"></path>
                                  <path d="M16.24 11.51l1.57-1.57-3.75-3.75-1.57 1.57-4.14-4.13c-.78-.78-2.05-.78-2.83 0l-1.9 1.9c-.78.78-.78 2.05 0 2.83l4.13 4.13L3 17.25V21h3.75l4.76-4.76 4.13 4.13c.95.95 2.23.6 2.83 0l1.9-1.9c.78-.78.78-2.05 0-2.83l-4.13-4.13zm-7.06-.44L5.04 6.94l1.89-1.9L8.2 6.31 7.02 7.5l1.41 1.41 1.19-1.19 1.45 1.45-1.89 1.9zm7.88 7.89l-4.13-4.13 1.9-1.9 1.45 1.45-1.19 1.19 1.41 1.41 1.19-1.19 1.27 1.27-1.9 1.9zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34c-.47-.47-1.12-.29-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                                </svg>
                                <h6>Created: {qrCode?.created_date}</h6>
                              </div>
                              <div className="wrap" bis_skin_checked="1">
                                <svg
                                  stroke="currentColor"
                                  fill="none"
                                  stroke-width="2"
                                  viewBox="0 0 24 24"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <h6>Modified: {qrCode?.updated_date}</h6>
                              </div>
                            </div>
                          </div>
                          <div className="three">
                            <p>Scans</p>
                            <h1>
                              {qrCode?.scan_count ? qrCode?.scan_count : "0"}
                            </h1>
                          </div>
                          <div className="four">
                            <p>email</p>
                            <h1>{qrList?.email}</h1>
                          </div>
                          <div className="five">
                            <button onClick={() => handleViewDetail(qrCode)}>
                              View
                            </button>
                            <p
                              onClick={() =>
                                handleEdit(qrCode?.id, qrCode.type)
                              }
                            >
                              {isLoading ? (
                                "Loading..."
                              ) : (
                                <>
                                  Edit
                                  <span>
                                    <MdEdit size={14} />
                                  </span>
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default AllQrList;
