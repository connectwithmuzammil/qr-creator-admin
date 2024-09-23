import React from "react";
import { Sidebar } from "../components";
import { useQuery } from "@tanstack/react-query";
import apis from "../services";

const AllQrList = () => {
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

  return (
    <div className="qr-main-page all-qrList">
      <div className="userDashboard">
        <Sidebar />
        <div className="content-page">
          <h1>USER QR LIST</h1>
          {getQrList?.data?.length > 0 &&
            getQrList?.data?.map((qrList) => {
              if (qrList?.qrcodes?.length > 0) {
                return (
                  <div className="result-cardd">
                    {console.log("qrList", qrList)}
                    <div className="one"></div>
                    <div className="two">
                      <div class="modifiedDate-con" bis_skin_checked="1">
                        <div class="wrap" bis_skin_checked="1">
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
                          <h6>Created: Sep 22, 2024</h6>
                        </div>
                        <div class="wrap" bis_skin_checked="1">
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
                          <h6>Modified: Sep 22, 2024</h6>
                        </div>
                      </div>
                    </div>
                    <div className="three">
                      <p>Scans</p>
                      <h1>0</h1>
                    </div>
                    <div className="four">
                      <p>email</p>
                      <h1>{qrList?.email}</h1>
                    </div>
                    <div className="five">
                      <button>View</button>
                    </div>
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
