import React, { useEffect, useState } from "react";
import { AccordianComponent } from "../AccordianComponent";
import CutsomColorPickerComp from "../CutsomColorPickerComp";
import { InputComponent } from "../InputComponent";
import {
  FacilitiesAccommodationIcon,
  DribbleSocial,
  FacebookSocial,
  FlikrSocial,
  GithubSocial,
  InstagramSocial,
  LineSocial,
  LinkedinSocial,
  RedditSocial,
  SkypeSocial,
  SnapchatSocial,
  TiktokSocial,
  TripadvisorSocial,
  TumblrSocial,
  TwitterSocial,
  VimeoSocial,
  VkontakteSocial,
  WebSocial,
  XingSocial,
  FacilitiesBarIcon,
  FacilitiesCafeIcon,
  FacilitiesChildFriendlyIcon,
  FacilitiesParkingIcon,
  FacilitiesPetFriendlyIcon,
  FacilitiesRestaurantIcon,
  FacilitiesRestroomIcon,
  FacilitiesSeatingIcon,
  FacilitiesNearPublicTransportIcon,
  FacilitiesTaxiIcon,
  FacilitiesWheelChairAccessIcon,
  FacilitiesWifiIcon,
} from "../../Helper/SocialSvgIcons";
import ImageUploadComponent from "../ImageUploadComp";
import SocialIconsComp from "../SocialIconComp";
import FacilitiesIconComp from "../FacilitiesIconComp";
import { useLocation } from "react-router-dom";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeClock } from "@mui/x-date-pickers/TimeClock";
import dayjs from "dayjs";
import { Add as AddIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MdErrorOutline } from "react-icons/md";

const colors = [
  { id: "blue", background: "#d1e5fa", button: "#1466b8" },
  { id: "green", background: "#e8fce8", button: "#0e8b70" },
  { id: "yellow", background: "#fff9cc", button: "#998600" },
  { id: "red", background: "#fecdd6", button: "#b00223" },
];
const icons = {
  facebook: <FacebookSocial />,
  instagram: <InstagramSocial />,
  twitter: <TwitterSocial />,
  dribble: <DribbleSocial />,
  flickr: <FlikrSocial />,
  github: <GithubSocial />,
  line: <LineSocial />,
  linkedin: <LinkedinSocial />,
  reddit: <RedditSocial />,
  skype: <SkypeSocial />,
  snapchat: <SnapchatSocial />,
  tiktok: <TiktokSocial />,
  tripadvisor: <TripadvisorSocial />,
  tumblr: <TumblrSocial />,
  vimeo: <VimeoSocial />,
  vkontakte: <VkontakteSocial />,
  web: <WebSocial />,
  xing: <XingSocial />,
};
const FacilitiesIcon = {
  Accommodation: <FacilitiesAccommodationIcon />,
  Bar: <FacilitiesBarIcon />,
  Cafe: <FacilitiesCafeIcon />,
  ChildFriendly: <FacilitiesChildFriendlyIcon />,
  Parking: <FacilitiesParkingIcon />,
  PetFriendly: <FacilitiesPetFriendlyIcon />,
  Restaurant: <FacilitiesRestaurantIcon />,
  Restroom: <FacilitiesRestroomIcon />,
  Seating: <FacilitiesSeatingIcon />,
  NearPublicTransport: <FacilitiesNearPublicTransportIcon />,
  Taxi: <FacilitiesTaxiIcon />,
  WheelChairAccess: <FacilitiesWheelChairAccessIcon />,
  Wifi: <FacilitiesWifiIcon />,
};

const BUSINESS = ({ localQrData, setLocalQrData, errors, setErrors }) => {
 

  //EDIT
  const location = useLocation();

  useEffect(() => {
    if (location.state?.qrData) {
      const qrDataFromLocation = location.state.qrData.data;
      console.log("qrDataFromLocation", qrDataFromLocation);

      // Set the data to local state
      setLocalQrData(qrDataFromLocation);
      setSelectedFormat(qrDataFromLocation?.opening_hours_format);

      if (qrDataFromLocation?.opening_hours_days) {
        const allDays = [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ];
        const updatedOpeningHoursDays = allDays.reduce((acc, day) => {
          acc[day] = qrDataFromLocation.opening_hours_days[day] || {
            enabled: false,
            times: [],
          };
          return acc;
        }, {});

        setLocalQrData((prevState) => ({
          ...prevState,
          opening_hours_days: updatedOpeningHoursDays,
        }));
      }

      if (qrDataFromLocation?.color) {
        setLocalQrData((prevQrData) => ({
          ...prevQrData,
          color: qrDataFromLocation?.color,
        }));
      }
    }
  }, [location.state, setLocalQrData]);

  console.log("updatedQrDataBusiness", localQrData);

  // const [is24HourFormat, setIs24HourFormat] = useState(false);
  const handleImageUpload = (mediaData, name, file) => {
    console.log("Received media data", mediaData); // media data base64
    console.log("Received media name", name); // media name

    setLocalQrData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };
  const handleImageDelete = (fieldName) => {
    console.log("Image deleted");
    // dispatch(resetField({ field: fieldName }));
    setLocalQrData((prevData) => ({
      ...prevData,
      [fieldName]: "",
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalQrData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSocialIconChange = (iconName, url) => {
    console.log("ICONS NAME, URL", iconName, url);
    setLocalQrData((prevData) => ({
      ...prevData,
      business_social: {
        ...prevData.business_social,
        [iconName]: url,
      },
    }));
  };
  const handleFacilitiesIconChange = (iconName, isSelected) => {
    setLocalQrData((prevQrData) => ({
      ...prevQrData,
      business_facilities: {
        ...prevQrData.business_facilities,
        [iconName]: isSelected,
      },
    }));
  };

  //CODE FOR TIMER START
  const [selectedFormat, setSelectedFormat] = React.useState("AM-PM");
  const [openClockData, setOpenClockData] = React.useState({});
  const [clockData, setClockData] = React.useState({
    day: "",
    index: null,
    timeType: "",
    value: dayjs(),
  });

  // Handle time format change
  const handleFormatChange = (format) => {
    setSelectedFormat(format);
    setLocalQrData((prevState) => ({
      ...prevState,
      opening_hours_format: format,
    }));
  };

  // Handle time input click to open clock picker
  const handleInputClick = (day, index, timeType) => {
    setClockData({
      day,
      index,
      timeType,
      value: dayjs(),
    });

    setOpenClockData((prev) => ({
      ...prev,
      [`${day}-${index}-${timeType}`]: true,
    }));
  };

  // Handle time change (start or end)
  const handleTimeChange = (newTime) => {
    const formattedTime = newTime.format(
      selectedFormat === "AM-PM" ? "hh:mm A" : "HH:mm"
    );

    setLocalQrData((prevState) => {
      const { day, index, timeType } = clockData;

      if (day && index !== null && timeType) {
        // Deep clone of the nested state to avoid immutability issues
        const updatedDays = { ...prevState.opening_hours_days };
        const updatedTimes = [...updatedDays[day].times];

        updatedTimes[index] = {
          ...updatedTimes[index],
          [timeType]: formattedTime,
        };

        updatedDays[day] = {
          ...updatedDays[day],
          times: updatedTimes,
        };

        return {
          ...prevState,
          opening_hours_days: updatedDays,
        };
      }

      return prevState; // Return unchanged state if no valid modification
    });

    // Close the time picker after a selection
    setClockData({
      day: "",
      index: null,
      timeType: "",
      value: dayjs(),
    });

    // Close the specific clock in openClockData
    setOpenClockData((prev) => {
      const updated = { ...prev };
      delete updated[
        `${clockData.day}-${clockData.index}-${clockData.timeType}`
      ];
      return updated;
    });
  };

  // Handle day checkbox change (enable/disable time slots)
  const handleDayChange = (day, isChecked) => {
    setLocalQrData((prevState) => ({
      ...prevState,
      opening_hours_days: {
        ...prevState.opening_hours_days,
        [day]: {
          ...prevState.opening_hours_days[day],
          enabled: isChecked,
        },
      },
    }));
  };

  // Add a new time slot for a day
  const addTimeSlot = (day) => {
    setLocalQrData((prevState) => {
      const newTimeSlot = {
        start: dayjs().format(selectedFormat === "AM-PM" ? "hh:mm A" : "HH:mm"),
        end: dayjs().format(selectedFormat === "AM-PM" ? "hh:mm A" : "HH:mm"),
      };

      // Deep clone of the state
      const updatedDays = { ...prevState.opening_hours_days };
      const updatedTimes = [...updatedDays[day].times, newTimeSlot];

      updatedDays[day] = {
        ...updatedDays[day],
        times: updatedTimes,
      };

      return {
        ...prevState,
        opening_hours_days: updatedDays,
      };
    });
  };

  const handleDeleteTimeSlot = (day, index) => {
    setLocalQrData((prevState) => {
      const updatedDays = { ...prevState.opening_hours_days };
      updatedDays[day].times.splice(index, 1); // Remove the time slot at the specified index

      return {
        ...prevState,
        opening_hours_days: updatedDays,
      };
    });
  };
  //CODE FOR TIMER END
  return (
    <>
      <div className="business-page">
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
            <AccordianComponent title={"Choose your design"}>
              <CutsomColorPickerComp
                colors={colors}
                qrData={localQrData}
                setQrData={setLocalQrData}
              />
            </AccordianComponent>
            <AccordianComponent title={"Business information"}>
              <ImageUploadComponent
                defaultImage={"/assets/images/default-img.png"}
                onImageUpload={handleImageUpload}
                onImageDelete={handleImageDelete}
                label="Logo"
                name="business_logo"
                onEditImagePreview={localQrData?.business_logo}
              />
              <InputComponent
                label={"Company name"}
                name={"business_company"}
                placeholder={"e.g. Artisan Bakery"}
                onChange={handleInputChange}
                value={
                  localQrData?.business_company ||
                  localQrData?.business_page?.business_company
                }
              />
              <InputComponent
                label={"Title"}
                name={"business_title"}
                placeholder={"e.g. Fresh Bread and Pastries"}
                onChange={handleInputChange}
                value={
                  localQrData?.business_title ||
                  localQrData?.business_page?.business_title
                }
              />
              <InputComponent
                label={"Subtitle"}
                name={"business_subtitle"}
                placeholder={
                  "e.g. Delicious bread and pastries baked daily. vVsit our bakery or order online."
                }
                onChange={handleInputChange}
                value={
                  localQrData?.business_subtitle ||
                  localQrData?.business_page?.business_subtitle
                }
              />
              <div className="wrap-inp-cmp">
                <InputComponent
                  label={"Button text"}
                  name={"business_btn_text"}
                  placeholder={"e.g. View our products"}
                  onChange={handleInputChange}
                  value={
                    localQrData?.business_btn_text ||
                    localQrData?.business_page?.business_btn_text
                  }
                />
                <InputComponent
                  label={"URL"}
                  name={"business_url"}
                  placeholder={"e.g. https://URL here"}
                  onChange={handleInputChange}
                  type="url"
                  value={
                    localQrData?.business_url ||
                    localQrData?.business_page?.business_url
                  }
                />
              </div>
            </AccordianComponent>
            <AccordianComponent title={"Opening hours"}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    maxWidth: "100%",
                    margin: "0 auto",
                    padding: { xs: 1, sm: 2 },
                  }}
                >
                  {/* Time Format Buttons (AM/PM vs 24-hour) */}
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 2,
                    }}
                  >
                    <Button
                      variant={
                        selectedFormat === "AM-PM" ? "contained" : "outlined"
                      }
                      onClick={() => handleFormatChange("AM-PM")}
                      sx={{ marginRight: 1, width: "100%" }}
                    >
                      AM/PM
                    </Button>
                    <Button
                      variant={
                        selectedFormat === "24-Hour" ? "contained" : "outlined"
                      }
                      onClick={() => handleFormatChange("24-Hour")}
                      sx={{ width: "100%" }}
                    >
                      24-Hour
                    </Button>
                  </Grid>

                  {/* Days of the Week with Checkbox */}
                  {Object.keys(localQrData.opening_hours_days).map((day) => (
                    <Grid
                      item
                      xs={12}
                      key={day}
                      sx={{ borderBottom: "1px solid #ccc", paddingBottom: 2 }}
                    >
                      {/* Checkbox and Time Inputs in One Row */}
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        sx={{ marginTop: 2 }}
                      >
                        <Grid item xs={12} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  localQrData.opening_hours_days[day].enabled
                                }
                                onChange={(e) =>
                                  handleDayChange(day, e.target.checked)
                                }
                                sx={{
                                  "&.Mui-checked": {
                                    color: "primary.main",
                                  },
                                }}
                              />
                            }
                            label={day.charAt(0).toUpperCase() + day.slice(1)}
                            sx={{ marginBottom: 0 }}
                          />
                        </Grid>

                        {/* Start Time Input */}
                        <Grid item xs={12} sm={4} sx={{ position: "relative" }}>
                          <TextField
                            label="Start Time"
                            value={
                              localQrData.opening_hours_days[day].times[0]
                                ?.start || ""
                            }
                            disabled={
                              !localQrData.opening_hours_days[day].enabled
                            } // Ensure input is enabled when checkbox is checked
                            fullWidth
                            onClick={() => handleInputClick(day, 0, "start")}
                            sx={{
                              "& .MuiInputBase-root": {
                                backgroundColor: "#f5f5f5",
                                borderRadius: "8px",
                                padding: "8px 12px",
                                height: "40px", // Reduced input height
                              },
                            }}
                          />
                          {/* Clock Picker for Start Time */}
                          {openClockData[`${day}-0-start`] && (
                            <div
                              style={{
                                position: "fixed",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: 1000,
                                width: "300px",
                                backgroundColor: "white",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                                borderRadius: "8px",
                                padding: "20px",
                                boxSizing: "border-box",
                                height: "360px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <TimeClock
                                value={clockData.value}
                                onChange={handleTimeChange}
                                ampm={selectedFormat === "AM-PM"}
                              />
                            </div>
                          )}
                        </Grid>

                        {/* End Time Input */}
                        <Grid item xs={12} sm={4} sx={{ position: "relative" }}>
                          <TextField
                            label="End Time"
                            value={
                              localQrData.opening_hours_days[day].times[0]
                                ?.end || ""
                            }
                            disabled={
                              !localQrData.opening_hours_days[day].enabled
                            } // Ensure input is enabled when checkbox is checked
                            fullWidth
                            onClick={() => handleInputClick(day, 0, "end")}
                            sx={{
                              "& .MuiInputBase-root": {
                                backgroundColor: "#f5f5f5",
                                borderRadius: "8px",
                                padding: "6px 8px",
                                height: "40px",
                              },
                            }}
                          />
                          {/* Clock Picker for End Time */}
                          {openClockData[`${day}-0-end`] && (
                            <div
                              style={{
                                position: "fixed",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)", // Center the clock picker
                                zIndex: 1000, // Ensure it appears on top of other elements
                                width: "300px", // Set a fixed width for the clock picker
                                backgroundColor: "white", // White background for the modal
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Shadow for better visibility
                                borderRadius: "8px", // Rounded corners for the modal
                                padding: "20px", // Add some padding inside the modal
                                boxSizing: "border-box", // Ensure padding does not overflow
                              }}
                            >
                              <TimeClock
                                value={clockData.value}
                                onChange={handleTimeChange}
                                ampm={selectedFormat === "AM-PM"}
                              />
                            </div>
                          )}
                        </Grid>

                        {/* Add Time Slot Icon */}
                        <Grid
                          item
                          xs={12}
                          sm={2}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <IconButton
                            onClick={() => addTimeSlot(day)}
                            color="primary"
                            disabled={
                              !localQrData.opening_hours_days[day].enabled
                            }
                            sx={{
                              borderRadius: "50%",
                              padding: "10px",
                              "&:hover": {
                                backgroundColor: "#e0e0e0",
                              },
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Grid>
                      </Grid>

                      {/* Additional Time Slots */}
                      {localQrData.opening_hours_days[day].times
                        .slice(1)
                        .map((timeSlot, index) => (
                          <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            key={index}
                            direction="row"
                            sx={{
                              marginTop: 2, // Ensure proper spacing between new slots
                            }}
                          >
                            {/* Start Time */}
                            <Grid
                              item
                              xs={12}
                              sm={4}
                              sx={{ position: "relative" }}
                            >
                              <TextField
                                label="Start Time"
                                value={timeSlot.start}
                                onClick={() =>
                                  handleInputClick(day, index + 1, "start")
                                }
                                fullWidth
                                sx={{
                                  "& .MuiInputBase-root": {
                                    backgroundColor: "#f5f5f5",
                                    borderRadius: "8px",
                                    padding: "8px 12px",
                                    height: "40px", // Reduced input height
                                  },
                                }}
                              />
                              {/* Clock Picker for Start Time */}
                              {openClockData[`${day}-${index + 1}-start`] && (
                                <div
                                  style={{
                                    position: "fixed",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)", // Center the clock picker
                                    zIndex: 1000, // Ensure it appears on top of other elements
                                    width: "300px", // Set a fixed width for the clock picker
                                    backgroundColor: "white", // White background for the modal
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Shadow for better visibility
                                    borderRadius: "8px", // Rounded corners for the modal
                                    padding: "20px", // Add some padding inside the modal
                                    boxSizing: "border-box", // Ensure padding does not overflow
                                  }}
                                >
                                  <TimeClock
                                    value={clockData.value}
                                    onChange={handleTimeChange}
                                    ampm={selectedFormat === "AM-PM"}
                                  />
                                </div>
                              )}
                            </Grid>

                            {/* End Time */}
                            <Grid
                              item
                              xs={12}
                              sm={4}
                              sx={{ position: "relative" }}
                            >
                              <TextField
                                label="End Time"
                                value={timeSlot.end}
                                onClick={() =>
                                  handleInputClick(day, index + 1, "end")
                                }
                                fullWidth
                                sx={{
                                  "& .MuiInputBase-root": {
                                    backgroundColor: "#f5f5f5",
                                    borderRadius: "8px",
                                    padding: "8px 12px",
                                    height: "40px", // Reduced input height
                                  },
                                }}
                              />
                              {/* Clock Picker for End Time */}
                              {openClockData[`${day}-${index + 1}-end`] && (
                                <div
                                  style={{
                                    position: "fixed",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)", // Center the clock picker
                                    zIndex: 1000, // Ensure it appears on top of other elements
                                    width: "300px", // Set a fixed width for the clock picker
                                    backgroundColor: "white", // White background for the modal
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Shadow for better visibility
                                    borderRadius: "8px", // Rounded corners for the modal
                                    padding: "20px", // Add some padding inside the modal
                                    boxSizing: "border-box", // Ensure padding does not overflow
                                  }}
                                >
                                  <TimeClock
                                    value={clockData.value}
                                    onChange={handleTimeChange}
                                    ampm={selectedFormat === "AM-PM"}
                                  />
                                </div>
                              )}
                            </Grid>

                            {/* Delete Button/Icon */}
                            <Grid
                              item
                              xs={12}
                              sm={2}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <IconButton
                                onClick={() =>
                                  handleDeleteTimeSlot(day, index + 1)
                                }
                                color="error"
                                sx={{
                                  "&:hover": {
                                    color: "red",
                                  },
                                  padding: "10px",
                                  borderRadius: "50%",
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        ))}
                    </Grid>
                  ))}
                </Grid>
              </LocalizationProvider>

              {errors?.opening_hours_days && (
                <div className="error-message">
                  <MdErrorOutline className="error-icon" />
                  {errors.opening_hours_days}
                </div>
              )}
            </AccordianComponent>

            <AccordianComponent title={"Location"}>
              <div className="wrap-inp-cmp">
                <InputComponent
                  label={"Address"}
                  name={"business_address"}
                  placeholder={"e.g. High Street"}
                  onChange={handleInputChange}
                  value={
                    localQrData?.business_address ||
                    localQrData?.business_page?.business_address
                  }
                />
                <InputComponent
                  label={"Number"}
                  name={"business_numeration"}
                  placeholder={"e.g. 10"}
                  onChange={handleInputChange}
                  value={
                    localQrData?.business_numeration ||
                    localQrData?.business_page?.business_numeration
                  }
                />
                <InputComponent
                  label={"Zip code"}
                  name={"business_postalcode"}
                  placeholder={"e.g. 12548"}
                  onChange={handleInputChange}
                  value={
                    localQrData?.business_postalcode ||
                    localQrData?.business_page?.business_postalcode
                  }
                />
              </div>
              <div className="wrap-inp-cmp">
                <InputComponent
                  label={"City"}
                  name={"business_city"}
                  placeholder={"e.g. New York"}
                  onChange={handleInputChange}
                  value={
                    localQrData?.business_city ??
                    localQrData?.business_page?.business_city
                  }
                />
                <InputComponent
                  label={"State"}
                  name={"business_state"}
                  placeholder={"e.g. 10"}
                  onChange={handleInputChange}
                  value={
                    localQrData?.business_state ||
                    localQrData?.business_page?.business_state
                  }
                />
                <InputComponent
                  label={"Country"}
                  name={"business_country"}
                  placeholder={"e.g. USA"}
                  onChange={handleInputChange}
                  value={
                    localQrData?.business_country ||
                    localQrData?.business_page?.business_country
                  }
                />
              </div>
            </AccordianComponent>
            <AccordianComponent title={"Facilities"}>
              <FacilitiesIconComp
                icons={FacilitiesIcon}
                onIconClick={handleFacilitiesIconChange}
                initialSelectedIcons={localQrData.business_facilities}
              />
            </AccordianComponent>
            <AccordianComponent title={"Contact information"}>
              <InputComponent
                label={"Name"}
                name={"business_name"}
                placeholder={"e.g. John Smith"}
                onChange={handleInputChange}
                value={
                  localQrData?.business_name ||
                  localQrData?.business_page?.business_name
                }
              />
              <InputComponent
                label={"Phone"}
                name={"business_phone"}
                placeholder={"e.g. (123)-123-123-123"}
                onChange={handleInputChange}
                value={
                  localQrData?.business_phone ||
                  localQrData?.business_page?.business_phone
                }
              />
              <InputComponent
                label={"Email"}
                name={"business_email"}
                placeholder={"e.g. youremail@domain.com"}
                onChange={handleInputChange}
                value={
                  localQrData?.business_email ||
                  localQrData?.business_page?.business_email
                }
              />
              <InputComponent
                label={"Website"}
                name={"business_website"}
                placeholder={"e.g. https://www.artisian-bakery.com"}
                onChange={handleInputChange}
                value={
                  localQrData?.business_website ||
                  localQrData?.business_page?.business_website
                }
              />
            </AccordianComponent>
            <AccordianComponent title={"About the company"}>
              <InputComponent
                name={"business_about"}
                placeholder={
                  "e.g. Indicate your business opening hour and/or any relevant information about it"
                }
                onChange={handleInputChange}
                value={
                  localQrData?.business_about ||
                  localQrData?.business_page?.business_about
                }
              />
            </AccordianComponent>
            <AccordianComponent title={"Social networks"}>
              <p className="social-con-content">Add Link to...</p>
              <SocialIconsComp
                icons={icons}
                localQrData={localQrData}
                setLocalQrData={setLocalQrData}
                dataKey={"business_social"}
              />
            </AccordianComponent>
          </div>

          <div className="right">
            <img src="/assets/images/phone-business.png" alt="phone-business" />
          </div>
        </div>
      </div>
    </>
  );
};

export default BUSINESS;
