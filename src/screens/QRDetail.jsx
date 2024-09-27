import React, { useEffect, useState } from "react";
// import {
//   APPS,
//   BottomWrapperStages,
//   GALLERY,
//   LANDING,
//   LINKS,
//   PDF,
//   Social,
//   URL,
//   VCARD,
//   Video,
//   WIFI,
//   YOUTUBE,
//   BUSINESS,
//   EVENT,
// } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { UrlSchema, youtubeSchema } from "../Helper/QRValidation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  APPS,
  BottomWrapperStages,
  BUSINESS,
  EVENT,
  GALLERY,
  LANDING,
  LINKS,
  PDF,
  Social,
  URL,
  VCARD,
  WIFI,
  YOUTUBE,
  Video,
} from "../components";

const QRDetail = () => {
  const { user } = useSelector((store) => store.user);

  const { type } = useParams();
  const initialState = {
    qr_name: "",
    id: "",
    //URL
    field_url: "",
    //WIFI
    network_name: user?.user?.email || user?.email,
    network_password: user?.user?.password || user?.password,
    network_security_type: "",
    //YOTUBE
    youtube_url: "",
    //PDF
    pdf_file: "",
    pdf_company: "",
    pdf_title: "",
    pdf_description: "",
    pdf_website: "",
    //APPS
    app_name: "",
    app_company: "",
    app_description: "",
    app_logo: "",
    app_website: "",
    //LANDING
    landing_action_url: "",
    landing_company: "",
    landing_logo: "",
    landing_title: "",
    landing_subtitle: "",
    landing_social: "",
    landing_btn_text: "",
    //SOCIAL
    media_social: {},
    media_headline: "",
    media_description: "",

    //image_gallery
    gallery_image: "",
    gallery_title: "",
    gallery_description: "",
    gallery_website: "",
    gallery_url: "",

    //LINKS
    links_image: "",
    links_title: "",
    links_description: "",
    all_links: [],
    links_social: "",

    //VCARD
    vcard_address: "",
    vcard_city: "",
    vcard_company_name: "",
    vcard_country: "",
    vcard_email: "",
    vcard_fax: "",
    vcard_full_name: "",
    vcard_landline_phone: "",
    vcard_mobile_phone: "",
    vcard_numeration: "",
    vcard_profession: "",
    vcard_state: "",
    vcard_summary: "",
    vcard_website: "",
    vcard_zip_code: "",
    vcard_social: "",
    vcard_image: "",

    //BUSINESS
    business_email: "", //
    business_name: "", //
    business_phone: "", //
    business_website: "", //
    business_action_title: "",
    business_url: "", //
    business_company: "", //
    business_subtitle: "", //
    business_title: "", //
    business_address: "", //
    business_city: "", //
    business_country: "", //
    business_numeration: "", //
    business_postalcode: "", //
    business_state: "", //

    opening_hours_days: {
      monday: { enabled: false, times: [] },
      tuesday: { enabled: false, times: [] },
      wednesday: { enabled: false, times: [] },
      thursday: { enabled: false, times: [] },
      friday: { enabled: false, times: [] },
      saturday: { enabled: false, times: [] },
      sunday: { enabled: false, times: [] },
    },
    opening_hours_format: "AM-PM",

    business_facilities: "",
    business_social: "",
    business_image: "",

    //VIDEO
    video: null,
    video_title: "",
    video_description: "",
    video_button: " ",
    video_url: "",
    video_social: "",

    //EVENTS
    event_action_title: "",
    event_action_url: "", //
    event_description: "", //
    event_title: "", //
    event_location_address: "", //
    event_location_city: "", //
    event_location_country: "", //
    event_location_numeration: "", //
    event_location_postal_code: "", //
    event_location_state: "", //
    event_organizer_about: "", //
    event_organizer_email: "", //
    event_organizer_name: "", //
    event_organizer_phone: "", //
    event_organizer_website: "", //
    event_time_action_title: "",
    event_time_all_day: true,
    event_time_end: "2024-09-29T19:00:00.000Z",
    event_time_start: "2024-09-28T19:00:00.000Z",
    event_time_timezone: "",
    event_image: "",
    event_facilities: "",

    type: "",
    style: {
      dotsStyle: "", //square
      dotsColor: "#000000",
      cornerStyle: "",
      cornerBackgroundColor: "#ffffff",
      cornerBorderColor: "",
      cornerDotColor: "",
      backgroundColor: "",
      frameStyle: "",
      frameColor: "", //#404040
      frameText: "",
      frameTextColor: "",
      frameName: "",
    },
    color: {
      background: "",
      button: "",
    },
    social: {},
  };
  const [qrData, setQrData] = useState(initialState);
  // console.log("qrDataqrData",qrData);



  useEffect(() => {
    setQrData((prevState) => ({
      ...prevState,
      type: type,
    }));
  }, [type]);

  console.log("qrData", qrData);

  const navigate = useNavigate();

  const handleNextClick = async () => {
    try {
      if (type === "youtube") {
        await youtubeSchema.validate(qrData);
      } else if (type === "url") {
        await UrlSchema.validate(qrData);
      } else if (type === "wifi") {
        // await WifiSchema.validate(qrData);
      } else if (type === "video") {
        // await videoSchema.validate(qrData);
      }

      const dataToSend = {
        type: qrData.type,
        style: qrData.style,
        id: qrData?.id,
        ...(type === "url"
          ? { field_url: qrData.field_url, qr_name: qrData.qr_name }
          : {}),
        ...(type === "wifi"
          ? {
              qr_name: qrData.qr_name,
              network_name: qrData.network_name,
              network_password: qrData.network_password,
              network_security_type: qrData.network_security_type,
            }
          : {}),
        ...(type === "youtube"
          ? {
              qr_name: qrData.qr_name,
              youtube_url: qrData.youtube_url,
            }
          : {}),
        ...(type === "pdf"
          ? {
              qr_name: qrData.qr_name,
              pdf_file: qrData.pdf_file,
              pdf_company: qrData.pdf_company,
              pdf_title: qrData.pdf_title,
              pdf_description: qrData.pdf_description,
              pdf_website: qrData.pdf_website,
              color: qrData.color,
            }
          : {}),
        ...(type === "apps"
          ? {
              qr_name: qrData?.qr_name,
              app_name: qrData?.app_name,
              app_company: qrData?.app_company,
              app_description: qrData?.app_description,
              app_website: qrData?.app_website,
              color: qrData.color,
            }
          : {}),
        ...(type === "landing"
          ? {
              qr_name: qrData?.qr_name,
              landing_action_url: qrData?.landing_action_url,
              landing_company: qrData?.landing_company,
              landing_logo: qrData?.landing_logo,
              landing_title: qrData?.landing_title,
              landing_subtitle: qrData?.landing_subtitle,
              landing_btn_text: qrData?.landing_btn_text,
              color: qrData.color,
              social: qrData.social,
            }
          : {}),
        ...(type === "social_media"
          ? {
              qr_name: qrData?.qr_name,
              media_headline: qrData.media_headline,
              color: qrData.color,
              media_social: qrData.media_social,
              landing_logo: qrData.landing_logo,
              media_description: qrData.media_description,
            }
          : {}),
        ...(type === "image_gallery"
          ? {
              qr_name: qrData?.qr_name,
              color: qrData.color,
              gallery_title: qrData.gallery_title,
              gallery_description: qrData.gallery_description,
              gallery_website: qrData.gallery_website,
              gallery_url: qrData.gallery_url,
              gallery_image: qrData.gallery_image,
            }
          : {}),
        ...(type === "links"
          ? {
              qr_name: qrData?.qr_name,
              color: qrData.color,
              links_image: qrData.links_image,
              links_title: qrData.links_title,
              links_description: qrData.links_description,
              all_links: qrData.all_links,
              links_social: qrData.links_social,
            }
          : {}),
        ...(type === "vcard"
          ? {
              qr_name: qrData?.qr_name,
              color: qrData.color,
              vcard_address: qrData?.vcard_address || "",
              vcard_city: qrData?.vcard_city || "",
              vcard_company_name: qrData?.vcard_company_name || "",
              vcard_country: qrData?.vcard_country || "",
              vcard_email: qrData?.vcard_email || "",
              vcard_fax: qrData?.vcard_fax || "",
              vcard_full_name: qrData?.vcard_full_name || "",
              vcard_landline_phone: qrData?.vcard_landline_phone || "",
              vcard_mobile_phone: qrData?.vcard_mobile_phone || "",
              vcard_numeration: qrData?.vcard_numeration || "",
              vcard_profession: qrData?.vcard_profession || "",
              vcard_state: qrData?.vcard_state || "",
              vcard_summary: qrData?.vcard_summary || "",
              vcard_website: qrData?.vcard_website || "",
              vcard_zip_code: qrData?.vcard_zip_code || "",
              vcard_social: qrData?.vcard_social || "",
              vcard_image: qrData?.vcard_image || "",
            }
          : {}),
        ...(type === "business_page"
          ? {
              qr_name: qrData?.qr_name,
              color: qrData?.color,
              business_email: qrData?.business_email,
              business_name: qrData?.business_name,
              business_phone: qrData?.business_phone,
              business_website: qrData?.business_website,
              business_action_title: qrData?.business_action_title,
              business_url: qrData?.business_url,
              business_company: qrData?.business_company,
              business_subtitle: qrData?.business_subtitle,
              business_title: qrData?.business_title,
              business_address: qrData?.business_address,
              business_city: qrData?.business_city,
              business_country: qrData?.business_country,
              business_numeration: qrData?.business_numeration,
              business_postalcode: qrData?.business_postalcode,
              business_state: qrData?.business_state,
              business_facilities: qrData?.business_facilities,
              business_social: qrData?.business_social,
              business_image: qrData?.business_image,
              opening_hours_days: qrData?.opening_hours_days,
              opening_hours_format: qrData?.opening_hours_format,
            }
          : {}),
        ...(type === "video"
          ? {
              qr_name: qrData?.qr_name,
              color: qrData.color,
              video_social: qrData.video_social,
              video: qrData.video,
              video_title: qrData.video_title,
              video_description: qrData.video_description,
              video_button: qrData.video_button,
              video_url: qrData.video_url,
            }
          : {}),
        ...(type === "events"
          ? {
              qr_name: qrData?.qr_name,
              color: qrData.color,
              event_action_title: qrData?.event_action_title || "",
              event_action_url: qrData?.event_action_url || "",
              event_description: qrData?.event_description || "",
              event_title: qrData?.event_title || "",
              event_location_address: qrData?.event_location_address || "",
              event_location_city: qrData?.event_location_city || "",
              event_location_country: qrData?.event_location_country || "",
              event_location_numeration:
                qrData?.event_location_numeration || "",
              event_location_postal_code:
                qrData?.event_location_postal_code || "",
              event_location_state: qrData?.event_location_state || "",
              event_organizer_about: qrData?.event_organizer_about || "",
              event_organizer_email: qrData?.event_organizer_email || "",
              event_organizer_name: qrData?.event_organizer_name || "",
              event_organizer_phone: qrData?.event_organizer_phone || "",
              event_organizer_website: qrData?.event_organizer_website || "",
              event_time_action_title: qrData?.event_time_action_title || "",
              event_time_all_day: qrData?.event_time_all_day || true,
              event_time_start:
                qrData?.event_time_start || "2024-09-28T19:00:00.000Z",
              event_time_end:
                qrData?.event_time_end || "2024-09-29T19:00:00.000Z",
              event_time_timezone: qrData?.event_time_timezone || "",
              event_image: qrData?.event_image || "",
              event_facilities: qrData?.event_facilities || "",
            }
          : {}),
      };
      navigate(`/qr-editor/${type}/design`, { state: { qrData: dataToSend } });
    } catch (error) {
      console.log("error", error);
      toast.error(error.errors[0]);
    }
  };

  const handleCancelClick = () => {
    navigate(`/qr-list`);
  };

  const renderDetailContent = () => {
    switch (type) {
      case "url":
        return (
          <>
            <URL qrData={qrData} setQrData={setQrData} />
          </>
        );
      case "vcard":
        return <VCARD qrData={qrData} setQrData={setQrData} />;
      case "pdf":
        return (
          <div>
            <PDF qrData={qrData} setQrData={setQrData} />
          </div>
        );
      case "wifi":
        return (
          <div>
            <WIFI qrData={qrData} setQrData={setQrData} />
          </div>
        );
      case "youtube":
        return (
          <div>
            <YOUTUBE qrData={qrData} setQrData={setQrData} />
          </div>
        );
      case "apps":
        return (
          <div>
            <APPS qrData={qrData} setQrData={setQrData} />
          </div>
        );
      case "image_gallery":
        return (
          <div>
            <GALLERY qrData={qrData} setQrData={setQrData} />
          </div>
        );
      case "links":
        return (
          <div>
            <LINKS qrData={qrData} setQrData={setQrData} />
          </div>
        );
      case "landing":
        return (
          <div>
            <LANDING qrData={qrData} setQrData={setQrData} />
          </div>
        );
      case "social_media":
        return (
          <div>
            <Social qrData={qrData} setQrData={setQrData} />
          </div>
        );
      case "video":
        return (
          <div>
            <Video qrData={qrData} setQrData={setQrData} />
          </div>
        );
      case "business_page":
        return (
          <div>
            <BUSINESS qrData={qrData} setQrData={setQrData} />
          </div>
        );
      case "events":
        return (
          <div>
            <EVENT qrData={qrData} setQrData={setQrData} />
          </div>
        );
      default:
        return <div>No Form Available</div>;
    }
  };

  return (
    <>
      <div className="qr-editor-detail">
        <div className="top">
          <h1>2. Your QR code content</h1>
        </div>
        {renderDetailContent()}
      </div>

      <BottomWrapperStages
        currentStage={2}
        onNextClick={handleNextClick}
        onCancelClick={handleCancelClick}
        showNextButton={true}
        // qrData={qrData}
      />
    </>
  );
};

export default QRDetail;

// let isValid = true;
// let errorMessage = "";

// if (type === "url") {
//   if (!qrData.field_url) {
//     isValid = false;
//     errorMessage = "Please enter the URL";
//   }
// }
// if (!isValid) {

//   toast.error(errorMessage);
//   return;
// }
