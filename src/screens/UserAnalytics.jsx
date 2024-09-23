import React, { useEffect, useState } from "react";
import {
  BarChartAnalytics,
  LineChartComp,
  Loader,
  Sidebar,
} from "../components";
import apis from "../services";
import { useQuery } from "@tanstack/react-query";

const UserAnalytics = () => {
  const [dataOS, setDataOS] = useState([]);
  const [dataCountry, setDataCountry] = useState([]);
  const [dataCity, setDataCity] = useState([]);

  const { isLoading : isLoadingQrCount, data: { data: getQrCount } = {} } =
  useQuery({
    queryKey: ["getToalQrCount"],
    queryFn: () => apis.getQrCount(),
    onError: (error) => {
      console.error("Error geting QRStats:", error);
      // toast.error("Failed to fetch products. Please try again later.");
    },
  });
  // console.log("getQrCount",getQrCount)

  const { isLoading: isLoadingStats, data: { data: getQRStats } = {} } =
    useQuery({
      queryKey: ["getQRStats"],
      queryFn: () => apis.getQrStats(),
      onError: (error) => {
        console.error("Error geting QRStats:", error);
        // toast.error("Failed to fetch products. Please try again later.");
      },
    });
  // console.log("getQRStats", getQRStats);

  useEffect(() => {
    if (getQRStats?.data) {
      const { os = [], countries = [], cities = [] } = getQRStats.data;

      // Format the data for each category
      setDataOS(os.map(({ name, scans }) => ({ name, scans })));
      setDataCountry(countries.map(({ name, scans }) => ({ name, scans })));
      setDataCity(cities.map(({ name, scans }) => ({ name, scans })));
    }
  }, [getQRStats]);

  const [scanActivityFilter, setScanActivityFilter] = useState("monthly");
  // console.log("scanActivityFilter", scanActivityFilter);
  const {
    isLoading: isLoadingScanActivity,
    data: { data: getQrScanActivity } = {},
    refetch,
  } = useQuery({
    queryKey: ["getQrScanActivity", scanActivityFilter],
    queryFn: () => apis.getQrScanActivity(scanActivityFilter),
    onError: (error) => {
      console.error("Error geting QRStats:", error);
      // toast.error("Failed to fetch products. Please try again later.");
    },
  });
  // console.log("getQrScanActivity", getQrScanActivity);

  // useEffect(() => {
  //   refetch();
  // }, [scanActivityFilter, refetch]);

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
  const formattedData = getQrScanActivity?.data?.map((item) => ({
    name: monthNames[item.month - 1], // Convert month number to month name
    scans: item.scans,
  }));

  // Handle filter change and refetch data
  const handleFilterChange = (newFilter) => {
    console.log("newFilter", newFilter);
    if (newFilter !== scanActivityFilter) {
      setScanActivityFilter(newFilter);
      refetch();
    }
  };

  return (
    <div className="qr-main-page user-analytics-page">
      <div className="userDashboard">
        <Sidebar />
        <div className="content-page">
          <h1>User Analytics</h1>

          <div className="analytics-con">
            <div className="cardd">
              <div className="wrap">
                <img src="/assets/images/icons/eye.png" alt="eye" />
                <p>Number of QR codes</p>
              </div>
              <h3>{getQrCount?.total_qr}</h3>
            </div>
            <div className="cardd">
              <div className="wrap">
                <img src="/assets/images/icons/eye.png" alt="eye" />
                <p>Number of scans</p>
              </div>
              <h3>{getQrCount?.total_scan}</h3>
            </div>
          </div>

          <div className="graph-con" style={{ width: "100%", height: "400px" }}>
            <div className="main-filter-con">
              <p>Scans Activity ({scanActivityFilter})</p>

              <div className="filter-buttons">
                <button
                  className={scanActivityFilter === "daily" ? "selected" : ""}
                  onClick={() => handleFilterChange("daily")}
                >
                  Daily
                </button>
                <button
                  className={scanActivityFilter === "weekly" ? "selected" : ""}
                  onClick={() => handleFilterChange("weekly")}
                >
                  Weekly
                </button>
                <button
                  className={scanActivityFilter === "monthly" ? "selected" : ""}
                  onClick={() => handleFilterChange("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={scanActivityFilter === "yearly" ? "selected" : ""}
                  onClick={() => handleFilterChange("yearly")}
                >
                  Yearly
                </button>
              </div>
            </div>

            {isLoadingScanActivity ? (
              <h4>Loading...</h4>
            ) : (
              <>
                {formattedData && formattedData.length > 0 ? (
                  <LineChartComp data={formattedData} />
                ) : (
                  <h4 className="stats-txt">
                    Need more data to show statistics
                  </h4>
                )}
              </>
            )}
          </div>

          <div className="all-card-con">
            <div className="cardd">
              <p>Scans per operating system</p>
              {isLoadingStats ? (
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
              {isLoadingStats ? (
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
              {isLoadingStats ? (
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
      </div>
    </div>
  );
};

export default UserAnalytics;
