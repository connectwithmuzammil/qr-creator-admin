import React, { useState } from "react";
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
  ELabels,
} from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { resetQrData, setsQrData } from "../redux/slice/qrSlice";
const QRDetail = () => {
  const dispatch = useDispatch();
  const { type } = useParams();

  const qrDataVar = useSelector((state) => state.qrData);
  const [localQrData, setLocalQrData] = useState(qrDataVar);
  const [errors, setErrors] = useState({});
  // console.log("qrDataVarr", qrDataVar);
  // console.log("localQrDataDetail", localQrData);

  const validateField = (type, name, value) => {
    console.log("valuetest", value);
    switch (type) {
      case "url":
        if (name === "field_url") {
          if (!value) return "Please enter a URL.";
          const urlRegex = /^(https:\/\/)/;
          if (!urlRegex.test(value)) return "URL must start with 'https://'.";
        }
        break;
      case "youtube":
        if (name === "youtube_url") {
          if (!value) return "Please enter a YouTube URL.";
          const youtubeRegex = /^(https:\/\/www\.youtube\.com\/watch\?v=)/;
          if (!youtubeRegex.test(value))
            return "YouTube URL must start with 'https://www.youtube.com/watch?v='.";
          return "";
        }
        break;
      case "vcard":
        if (name === "vcard_full_name") {
          if (!value) return "Required field";
        }

        break;
      case "social_media":
        if (name === "media_headline") {
          if (!value) return "Enter at least 1 character";
        }
        if (name === "media_social") {
          if (!value || Object.keys(value).length === 0) {
            return " Please add at least one social media link.";
          }
          for (const [key, link] of Object.entries(value)) {
            if (!link) {
              return `Please provide a valid link for ${key}.`;
            }
            const urlRegex = /^(https:\/\/)/;
            if (!urlRegex.test(link)) {
              return `${key} link must start with 'https://'.`;
            }
          }
        }
        break;
      case "landing":
        if (name === "landing_social") {
          if (!value || Object.keys(value).length === 0) {
            return " Please add at least one social media link.";
          }
          for (const [key, link] of Object.entries(value)) {
            if (!link) {
              return `Please provide a valid link for ${key}.`;
            }
            const urlRegex = /^(https:\/\/)/;
            if (!urlRegex.test(link)) {
              return `${key} link must start with 'https://'.`;
            }
          }
        }
        break;
      case "pdf":
        if (name === "pdf_file") {
          if (!value) return "Please upload a PDF file.";
          const pdfRegex = /\.pdf$/i;
          // if (!pdfRegex.test(value.name)) return "File must be a PDF.";
        }
        break;
      case "image_gallery":
        if (name === "gallery_image") {
          if (!value || value.length === 0)
            return "Please upload at least one image.";
        }
        break;
      case "links":
        if (name === "all_links") {
          if (!value || value.length === 0)
            return "Please Add at least one Link.";
        }
        break;
      case "business_page":
        if (name === "opening_hours_days") {
          if (!value || Object.keys(value).length === 0) {
            return "Opening hours must be provided.";
          }

          const days = Object.values(value);
          const isAnyDayEnabled = days.some((day) => day.enabled);
          if (!isAnyDayEnabled) {
            return "At least one day must be enabled.";
          }

          for (const [day, data] of Object.entries(value)) {
            if (data.enabled) {
              if (!data.times || data.times.length === 0) {
                return `Please provide time slots for ${day}.`;
              }

              for (const timeSlot of data.times) {
                if (!timeSlot.start || !timeSlot.end) {
                  return `Invalid time slot for ${day}: start and end times are required.`;
                }

                const startTime = new Date(`1970-01-01T${timeSlot.start}:00`);
                const endTime = new Date(`1970-01-01T${timeSlot.end}:00`);

                if (startTime >= endTime) {
                  return `Invalid time slot for ${day}: start time must be before end time.`;
                }
              }
            }
          }
        }
        break;
      case "apps":
        if (name === "app_name") {
          if (!value) return "Required field";
        }
        if (name === "app_website") {
          if (!value) return "Required field";
          const urlRegex =
            /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/;
          if (!urlRegex.test(value)) {
            return "App website must be a valid URL.";
          }
        }
        break;
      case "video":
        if (name === "video_path") {
          if (!value) return "Video is required.";

          const validVideoExtensions = [".mp4", ".avi", ".mov", ".mkv"];
          const fileName = value?.name || "";
          const fileSize = value?.size || 0;

          // Check file extension
          // const isValidExtension = validVideoExtensions.some((ext) =>
          //   fileName.toLowerCase().endsWith(ext)
          // );
          // if (!isValidExtension) {
          //   return `Invalid file type. Accepted formats are: ${validVideoExtensions.join(
          //     ", "
          //   )}`;
          // }

          // Check file size (example: max 50MB)
          const maxFileSize = 50 * 1024 * 1024; // 50MB
          if (fileSize > maxFileSize) {
            return "File size must not exceed 50MB.";
          }
        }
        break;
      default:
        return "";
    }
    return "";
  };

  const handleSubmit = () => {
    let errorFound = false;
    let newErrors = { ...errors };

    // Validate `media_social`
    // const socialError = validateField(
    //   type,
    //   "media_social",
    //   localQrData.media_social
    // );
    // if (socialError) {
    //   newErrors.media_social = socialError;
    //   errorFound = true;
    // } else {
    //   newErrors.media_social = "";
    // }

    // for (const field in localQrData) {
    //   const error = validateField(type, field, localQrData[field]);
    //   if (error) {
    //     newErrors[field] = error;
    //     errorFound = true;
    //   } else {
    //     newErrors[field] = "";
    //   }
    // }

    // Validate each field in `localQrData`
    for (const field in localQrData) {
      const value = localQrData[field];
      const error = validateField(type, field, value);
      if (error) {
        newErrors[field] = error;
        errorFound = true;
      } else {
        newErrors[field] = "";
      }

      // Special handling for nested `media_social`
      // if (field === "landing_social" && typeof value === "object") {
      const socialError = validateField(type, field, value);
      if (socialError) {
        newErrors[field] = socialError;
        errorFound = true;
      } else {
        newErrors[field] = "";
      }
      // }
    }

    setErrors(newErrors);

    return !errorFound;
  };

  const navigate = useNavigate();

  const handleNextClick = async () => {
    const isValid = handleSubmit();
    console.log("isValiddd", isValid);
    console.log("localqrdataio", localQrData);

    if (!isValid) {
      const errorMessages = Object.values(errors).filter(Boolean);
      if (errorMessages.length) {
        toast.error(errorMessages[0]); // Display the first error
      } else {
        toast.error("Please correct the highlighted errors before proceeding.");
      }
      return;
    }

    // if (!isValid) {
    //   if (errors?.media_social) {
    //     toast.error(errors.media_social);
    //   } else {
    //     toast.error("Please correct the highlighted errors before proceeding.");
    //   }
    //   return;
    // }
    try {
      const dataToSend = {
        type: type,
        style: localQrData?.style,
        editID: localQrData?.id,
        qrDesignLogo: localQrData?.qrDesignLogo,
        ...(type === "url"
          ? { field_url: localQrData?.field_url, qr_name: localQrData?.qr_name }
          : {}),
        ...(type === "wifi"
          ? {
              qr_name: localQrData.qr_name,
              network_name: localQrData.network_name,
              network_password: localQrData.network_password,
              network_security_type: localQrData.network_security_type,
            }
          : {}),
        ...(type === "youtube"
          ? {
              qr_name: localQrData.qr_name,
              youtube_url: localQrData.youtube_url,
            }
          : {}),
        ...(type === "pdf"
          ? {
              qr_name: localQrData?.qr_name,
              pdf_file: localQrData?.pdf_file,
              pdf_company: localQrData?.pdf_company,
              pdf_title: localQrData?.pdf_title,
              pdf_description: localQrData?.pdf_description,
              pdf_website: localQrData?.pdf_website,
              color: localQrData?.color,
            }
          : {}),
        ...(type === "apps"
          ? {
              qr_name: localQrData?.qr_name,
              app_name: localQrData?.app_name,
              app_company: localQrData?.app_company,
              app_description: localQrData?.app_description,
              app_website: localQrData?.app_website,
              app_social: localQrData?.app_social,
              app_logo: localQrData?.app_logo,
              color: localQrData.color,
            }
          : {}),
        ...(type === "landing"
          ? {
              qr_name: localQrData?.qr_name,
              landing_action_url: localQrData?.landing_action_url,
              landing_company: localQrData?.landing_company,
              landing_logo: localQrData?.landing_logo,
              landing_title: localQrData?.landing_title,
              landing_subtitle: localQrData?.landing_subtitle,
              landing_btn_text: localQrData?.landing_btn_text,
              landing_social: localQrData?.landing_social,
              color: localQrData.color,
            }
          : {}),
        ...(type === "social_media"
          ? {
              qr_name: localQrData?.qr_name,
              media_headline: localQrData.media_headline,
              color: localQrData.color,
              media_social: localQrData.media_social,
              social_logo: localQrData.social_logo,
              media_description: localQrData.media_description,
            }
          : {}),
        ...(type === "image_gallery"
          ? {
              qr_name: localQrData?.qr_name,
              color: localQrData.color,
              gallery_image: localQrData.gallery_image,
              gallery_title: localQrData.gallery_title,
              gallery_btn_text: localQrData.gallery_btn_text,
              gallery_description: localQrData.gallery_description,
              gallery_website: localQrData.gallery_website,
              gallery_url: localQrData.gallery_url,
            }
          : {}),
        ...(type === "links"
          ? {
              qr_name: localQrData?.qr_name,
              color: localQrData.color,
              linkslogo: localQrData.linkslogo,
              links_title: localQrData.links_title,
              links_description: localQrData.links_description,
              all_links: localQrData.all_links,
              links_social: localQrData.links_social,
            }
          : {}),
        ...(type === "vcard"
          ? {
              qr_name: localQrData?.qr_name,
              color: localQrData.color,
              vcard_address: localQrData?.vcard_address ,
              vcard_city: localQrData?.vcard_city ,
              vcard_company_name: localQrData?.vcard_company_name ,
              vcard_country: localQrData?.vcard_country ,
              vcard_email: localQrData?.vcard_email ,
              vcard_fax: localQrData?.vcard_fax ,
              vcard_full_name: localQrData?.vcard_full_name ,
              vcard_landline_phone: localQrData?.vcard_landline_phone ,
              vcard_mobile_phone: localQrData?.vcard_mobile_phone ,
              vcard_numeration: localQrData?.vcard_numeration ,
              vcard_profession: localQrData?.vcard_profession ,
              vcard_state: localQrData?.vcard_state ,
              vcard_summary: localQrData?.vcard_summary ,
              vcard_website: localQrData?.vcard_website ,
              vcard_zip_code: localQrData?.vcard_zip_code ,
              vcard_social: localQrData?.vcard_social ,
              vcard_image: localQrData?.vcard_image ,
            }
          : {}),
        ...(type === "business_page"
          ? {
              qr_name: localQrData?.qr_name,
              color: localQrData?.color,
              business_email: localQrData?.business_email,
              business_name: localQrData?.business_name,
              business_phone: localQrData?.business_phone,
              business_website: localQrData?.business_website,
              business_action_title: localQrData?.business_action_title,
              business_url: localQrData?.business_url,
              business_company: localQrData?.business_company,
              business_subtitle: localQrData?.business_subtitle,
              business_title: localQrData?.business_title,
              business_address: localQrData?.business_address,
              business_btn_text: localQrData?.business_btn_text,
              business_city: localQrData?.business_city,
              business_country: localQrData?.business_country,
              business_numeration: localQrData?.business_numeration,
              business_postalcode: localQrData?.business_postalcode,
              business_state: localQrData?.business_state,
              business_about: localQrData?.business_about,
              business_facilities: localQrData?.business_facilities,
              business_social: localQrData?.business_social,
              business_logo: localQrData?.business_logo,
              opening_hours_days: localQrData?.opening_hours_days,
              opening_hours_format: localQrData?.opening_hours_format,
            }
          : {}),
        ...(type === "video"
          ? {
              qr_name: localQrData?.qr_name,
              color: localQrData.color,
              video_social: localQrData.video_social,
              video: localQrData?.video_path,
              video_title: localQrData.video_title,
              video_description: localQrData.video_description,
              video_button: localQrData?.video_button,
              video_url: localQrData.video_url,
              video_name: localQrData.video_name,
            }
          : {}),
        ...(type === "events"
          ? {
              qr_name: localQrData?.qr_name,
              color: localQrData.color,
              event_action_title: localQrData?.event_action_title || "",
              event_action_url: localQrData?.event_action_url || "",
              event_description: localQrData?.event_description || "",
              event_title: localQrData?.event_title || "",
              event_location_address: localQrData?.event_location_address || "",
              event_location_city: localQrData?.event_location_city || "",
              event_location_country: localQrData?.event_location_country || "",
              event_location_numeration:
                localQrData?.event_location_numeration || "",
              event_location_postal_code:
                localQrData?.event_location_postal_code || "",
              event_location_state: localQrData?.event_location_state || "",
              event_organizer_about: localQrData?.event_organizer_about || "",
              event_organizer_email: localQrData?.event_organizer_email || "",
              event_organizer_name: localQrData?.event_organizer_name || "",
              event_organizer_phone: localQrData?.event_organizer_phone || "",
              event_organizer_website:
                localQrData?.event_organizer_website || "",
              event_time_action_title:
                localQrData?.event_time_action_title || "",
              event_time_all_day: localQrData?.event_time_all_day || true,
              event_time_start:
                localQrData?.event_time_start || "2024-09-28T19:00:00.000Z",
              event_time_end:
                localQrData?.event_time_end || "2024-09-29T19:00:00.000Z",
              event_time_timezone: localQrData?.event_time_timezone || "",
              event_image: localQrData?.event_image || "",
              event_facilities: localQrData?.event_facilities || "",
              event_btn_text: localQrData?.event_btn_text || "",
            }
          : {}),

        ...(type === "elabels"
          ? {
              wine: localQrData?.wine,
              beer: localQrData?.beer,
              cigars: localQrData?.cigars,
              coffee: localQrData?.coffee,
              food: localQrData?.food,
              product: localQrData?.product,
              product_name: localQrData?.product_name,
              sku: localQrData?.sku,
              description: localQrData?.description,
              alcohol_percentage: localQrData?.alcohol_percentage,
              ipa: localQrData?.ipa,
              brewed: localQrData?.brewed,
              website: localQrData?.website,
              where_it_is_made: localQrData?.where_it_is_made,
              wrapper: localQrData?.wrapper,
              binder: localQrData?.binder,
              filler: localQrData?.filler,
              strength: localQrData?.strength,
              body: localQrData?.body,
              size: localQrData?.size,
              flavour_profile: localQrData?.flavour_profile,
              best_paired_with: localQrData?.best_paired_with,
              origin: localQrData?.origin,
              farm: localQrData?.farm,
              altitude: localQrData?.altitude,
              roast: localQrData?.roast,
              flavour: localQrData?.flavour,
              // tasting_notes: localQrData?.tasting_notes,
              ingredients: localQrData?.ingredients,
              storage: localQrData?.storage,
              free_trade: localQrData?.free_trade,
              organic: localQrData?.organic,
              grape_variety: localQrData?.grape_variety,
              task_notes: localQrData?.task_notes,
              directions: localQrData?.directions,
              warning: localQrData?.warning,
              clories: localQrData?.clories,
              cuisine: localQrData?.cuisine,
              category: localQrData?.category,
              price: localQrData?.price,
              brand: localQrData?.brand,

              beer_image: localQrData?.beer_image,
              nutrition_image: localQrData?.nutrition_image,
              cigar_image: localQrData?.cigar_image,
              coffee_image: localQrData?.coffee_image,
              wine_image: localQrData?.wine_image,
              product_image: localQrData?.product_image,
              food_image: localQrData?.food_image,

              is_question: localQrData?.is_question,
              questions: localQrData?.questions,
              is_rating: localQrData?.is_rating,
              only_question: localQrData?.only_question,
            }
          : {}),
      };
      // sessionStorage.setItem("qrData", JSON.stringify(qrData));
      dispatch(setsQrData(localQrData));
      navigate(`/qr-editor/${type}/design`, { state: { qrData: dataToSend } });
    } catch (error) {
      console.log("error", error);
      toast.error(error.errors[0]);
    }
  };

  const handleCancelClick = () => {
    dispatch(resetQrData());
    navigate(`/qr-list`);
  };

  const renderDetailContent = () => {
    switch (type) {
      case "url":
        return (
          <>
            <URL
              localQrData={localQrData}
              setLocalQrData={setLocalQrData}
              errors={errors}
              setErrors={setErrors}
            />
          </>
        );
      case "vcard":
        return (
          <VCARD
            localQrData={localQrData}
            setLocalQrData={setLocalQrData}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case "pdf":
        return (
          <div>
            <PDF
              localQrData={localQrData}
              setLocalQrData={setLocalQrData}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        );
      case "wifi":
        return (
          <div>
            <WIFI localQrData={localQrData} setLocalQrData={setLocalQrData} />
          </div>
        );
      case "youtube":
        return (
          <div>
            <YOUTUBE
              localQrData={localQrData}
              setLocalQrData={setLocalQrData}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        );
      case "apps":
        return (
          <div>
            <APPS
              localQrData={localQrData}
              setLocalQrData={setLocalQrData}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        );
      case "image_gallery":
        return (
          <div>
            <GALLERY
              localQrData={localQrData}
              setLocalQrData={setLocalQrData}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        );
      case "links":
        return (
          <div>
            <LINKS
              localQrData={localQrData}
              setLocalQrData={setLocalQrData}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        );
      case "landing":
        return (
          <div>
            <LANDING
              localQrData={localQrData}
              setLocalQrData={setLocalQrData}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        );
      case "social_media":
        return (
          <div>
            <Social
              localQrData={localQrData}
              setLocalQrData={setLocalQrData}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        );
      case "video":
        return (
          <div>
            <Video
              localQrData={localQrData}
              setLocalQrData={setLocalQrData}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        );
      case "business_page":
        return (
          <div>
            <BUSINESS
              localQrData={localQrData}
              setLocalQrData={setLocalQrData}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        );
      case "events":
        return (
          <div>
            <EVENT
              localQrData={localQrData}
              setLocalQrData={setLocalQrData}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        );
      case "elabels":
        return (
          <div>
            <ELabels
              localQrData={localQrData}
              setLocalQrData={setLocalQrData}
            />
          </div>
        );
      default:
        return <div>No Form Available</div>;
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div className="qr-editor-detail mobile">
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
