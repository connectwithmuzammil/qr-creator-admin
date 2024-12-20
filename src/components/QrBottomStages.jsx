import React from "react";
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import apis from "../services";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { resetQrData } from "../redux/slice/qrSlice";

function BottomWrapperStages({
  currentStage,
  onNextClick,
  onCancelClick,
  showNextButton,
  generateQrPayload,
}) {
  const stages = [
    { step: 1, label: "Select QR code" },
    { step: 2, label: "Add content" },
    { step: 3, label: "Customize design" },
  ];

  const isLastStage = currentStage === stages.length;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log("qrDataqrData", generateQrPayload);

  // console.log("generateQrPayload?.business_logo",typeof(generateQrPayload?.business_logo))

  //QR CODE API CALL
  const { mutate: mutateQrCode, isPending: isLoading } = useMutation({
    mutationFn: apis.generateQrCode,
    onError: function ({ message }) {
      toast.error(message);
    },
    onSuccess: ({ data: generateQr, status }) => {
      dispatch(resetQrData());
      navigate("/qr-list");
      toast.success("QR code generated successfully");
    },
  });

  const handleNextClick = async () => {
    if (isLastStage) {
      const formData = new FormData();

      //EDIT IDDDDD
      if (generateQrPayload?.editID) {
        formData.append("id", generateQrPayload.editID);
      }

      if (generateQrPayload?.landing_logo) {
        formData.append("landing_logo", generateQrPayload?.landing_logo);
      }

      // if (generateQrPayload?.gallery_image) {
      //   formData.append("gallery_image", generateQrPayload?.gallery_image);
      // }
      // if (generateQrPayload?.gallery_image && Array.isArray(generateQrPayload.gallery_image)) {
      //   generateQrPayload.gallery_image.forEach((file, index) => {
      //     formData.append(`gallery_image_${index}`, file);
      //   });
      // }
      if (
        generateQrPayload?.gallery_image &&
        Array.isArray(generateQrPayload.gallery_image)
      ) {
        generateQrPayload.gallery_image.forEach((file) => {
          formData.append("gallery_image[]", file);
        });
      }

      if (generateQrPayload?.linkslogo) {
        formData.append("linkslogo", generateQrPayload?.linkslogo);
      }
      if (generateQrPayload?.social_logo) {
        formData.append("social_logo", generateQrPayload?.social_logo);
      }
      if (generateQrPayload?.app_logo) {
        formData.append("app_logo", generateQrPayload?.app_logo);
      }
      if (generateQrPayload?.vcard_image instanceof File) {
        formData.append("vcard_image", generateQrPayload?.vcard_image);
      }
      if (generateQrPayload?.business_logo instanceof File) {
        formData.append("business_logo", generateQrPayload?.business_logo);
      }
      if (generateQrPayload?.event_image) {
        formData.append("event_image", generateQrPayload?.event_image);
      }
      if (generateQrPayload?.qrDesignLogo) {
        formData.append("qrDesignLogo", generateQrPayload?.qrDesignLogo);
      }

      // Handle opening_hours_days
      if (generateQrPayload?.opening_hours_days) {
        Object.keys(generateQrPayload.opening_hours_days).forEach((day) => {
          const dayData = generateQrPayload.opening_hours_days[day];

          // Only include days that are enabled or have non-empty times
          if (
            dayData.enabled ||
            dayData.times.some((timeSlot) => timeSlot.start || timeSlot.end)
          ) {
            formData.append(
              `opening_hours_days[${day}][enabled]`,
              dayData.enabled
            );

            dayData.times.forEach((timeSlot, index) => {
              if (timeSlot.start || timeSlot.end) {
                // Check if timeSlot has valid data
                formData.append(
                  `opening_hours_days[${day}][times][${index}][start]`,
                  timeSlot.start
                );
                formData.append(
                  `opening_hours_days[${day}][times][${index}][end]`,
                  timeSlot.end
                );
              }
            });
          }
        });
      }

      let questions = generateQrPayload?.only_question;

      questions = questions?.map((question) =>
        question.trim().replace(/\s+/g, " ")
      );

      questions?.forEach((question, index) => {
        formData.append(`only_question[${index}]`, question);
      });

      // formData.append("questions", JSON.stringify(generateQrPayload.questions));

      const cleanQuestionsText = (questions) => {
        console.log("questooo", questions);
        return questions?.map((question) => ({
          ...question,
          text: question.text.trim().replace(/\s+/g, " "),
        }));
      };

      const cleanedQuestions = cleanQuestionsText(generateQrPayload.questions);

      formData.append("questions", JSON.stringify(cleanedQuestions));

      // Flatten and append existing payload data except 'landing_logo'
      Object.keys(generateQrPayload).forEach((key) => {
        if (key === "style") {
          // Handle the nested style object separately
          Object.keys(generateQrPayload.style).forEach((styleKey) => {
            formData.append(
              `style[${styleKey}]`,
              generateQrPayload.style[styleKey]
            );
          });
        } else if (key === "color") {
          // Handle the nested color object separately
          Object.keys(generateQrPayload.color).forEach((colorKey) => {
            formData.append(
              `color[${colorKey}]`,
              generateQrPayload.color[colorKey]
            );
          });
        } else if (key === "social") {
          // Handle the social object separately
          Object.keys(generateQrPayload.social).forEach((socialKey) => {
            formData.append(
              `social[${socialKey}]`,
              generateQrPayload.social[socialKey]
            );
          });
        } else if (key === "media_social") {
          // Handle the social object separately
          Object.keys(generateQrPayload.media_social).forEach(
            (media_socialKey) => {
              formData.append(
                `media_social[${media_socialKey}]`,
                generateQrPayload.media_social[media_socialKey]
              );
            }
          );
        } else if (key === "links_social") {
          // Handle the social object separately
          Object.keys(generateQrPayload.links_social).forEach(
            (links_socialKey) => {
              formData.append(
                `links_social[${links_socialKey}]`,
                generateQrPayload.links_social[links_socialKey]
              );
            }
          );
        } else if (key === "vcard_social") {
          // Handle the social object separately
          Object.keys(generateQrPayload.vcard_social).forEach(
            (vcard_socialKey) => {
              formData.append(
                `vcard_social[${vcard_socialKey}]`,
                generateQrPayload.vcard_social[vcard_socialKey]
              );
            }
          );
        } else if (key === "business_social") {
          // Handle the social object separately
          Object.keys(generateQrPayload.business_social).forEach(
            (business_socialKey) => {
              formData.append(
                `business_social[${business_socialKey}]`,
                generateQrPayload.business_social[business_socialKey]
              );
            }
          );
        } else if (key === "business_facilities") {
          // Handle the social object separately
          Object.keys(generateQrPayload.business_facilities).forEach(
            (businessFacilities_socialKey) => {
              formData.append(
                `business_facilities[${businessFacilities_socialKey}]`,
                generateQrPayload.business_facilities[
                  businessFacilities_socialKey
                ]
              );
            }
          );
        } else if (key === "event_facilities") {
          // Handle the social object separately
          Object.keys(generateQrPayload.event_facilities).forEach(
            (event_facilities_socialKey) => {
              formData.append(
                `event_facilities[${event_facilities_socialKey}]`,
                generateQrPayload.event_facilities[event_facilities_socialKey]
              );
            }
          );
        } else if (key === "app_social") {
          // Handle the social object separately
          Object.keys(generateQrPayload.app_social).forEach(
            (video_socialKey) => {
              formData.append(
                `app_social[${video_socialKey}]`,
                generateQrPayload.app_social[video_socialKey]
              );
            }
          );
        } else if (key === "video_social") {
          // Handle the social object separately
          Object.keys(generateQrPayload.video_social).forEach(
            (video_socialKey) => {
              formData.append(
                `video_social[${video_socialKey}]`,
                generateQrPayload.video_social[video_socialKey]
              );
            }
          );
        } else if (key === "landing_social") {
          // Handle the social object separately
          Object.keys(generateQrPayload.landing_social).forEach(
            (landing_socialKey) => {
              formData.append(
                `landing_social[${landing_socialKey}]`,
                generateQrPayload.landing_social[landing_socialKey]
              );
            }
          );
        } else if (
          key !== "landing_logo" &&
          key !== "gallery_image" &&
          key !== "linkslogo" &&
          key !== "vcard_image" &&
          key !== "business_logo" &&
          key !== "business_image" &&
          key !== "opening_hours_days" &&
          key !== "event_image" &&
          key !== "pdf_file" &&
          key !== "app_social" &&
          key !== "video_social" &&
          key !== "landing_social" &&
          key !== "all_links" &&
          key !== "social_logo" &&
          key !== "app_logo" &&
          key !== "questions" &&
          key !== "only_question" &&
          key !== "qrDesignLogo"
        ) {
          formData.append(key, generateQrPayload[key]);
        }
      });

      if (generateQrPayload?.pdf_file) {
        formData.append("pdf_file", generateQrPayload.pdf_file);
      }

      if (generateQrPayload?.all_links) {
        generateQrPayload.all_links.forEach((link, index) => {
          formData.append(`all_links[${index}][text]`, link.text);
          formData.append(`all_links[${index}][url]`, link.url);
          formData.append(`all_links[${index}][image]`, link.image);
        });
      }

 

      mutateQrCode(formData);

    } else {
      onNextClick();
    }
  };

  return (
    <>
      <div className="bottom-wrapper-stages">
        <button className="cancel" onClick={onCancelClick}>
          {currentStage === 1 ? "Cancel" : "Back"}
        </button>
        <div className="stages-con">
          {stages.map((stage) => (
            <div
              key={stage.step}
              className={`select-qr ${
                currentStage === stage.step ? "active" : ""
              }`}
            >
              <div className="wrap">
                <h5 className={currentStage >= stage.step ? "active" : ""}>
                  {stage.step}
                </h5>
                <p className={currentStage >= stage.step ? "active" : ""}>
                  {stage.label}
                </p>
              </div>
              {stage.step !== stages.length && <MdChevronRight />}
            </div>
          ))}
        </div>

        {/*  */}
        {showNextButton && (
          <div className="btn-next">
            <button
              className="next"
              onClick={handleNextClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-content">
                  {/* <AiOutlineLoading3Quarters className="loading-spinner" /> */}
                  <div className="loader"></div>
                  <span>Loading...</span>
                </div>
              ) : isLastStage ? (
                "Finish"
              ) : (
                "Next"
              )}
            </button>
            {!isLoading && <MdChevronRight />}
          </div>
        )}
      </div>

      <div className="stages-con mobile" style={{display:"none"}}>
        {stages.map((stage) => (
          <div
            key={stage.step}
            className={`select-qr ${
              currentStage === stage.step ? "active" : ""
            }`}
          >
            <div className="wrap">
              <h5 className={currentStage >= stage.step ? "active" : ""}>
                {stage.step}
              </h5>
              <p className={currentStage >= stage.step ? "active" : ""}>
                {stage.label}
              </p>
            </div>
            {stage.step !== stages.length && <MdChevronRight />}
          </div>
        ))}
      </div>
    </>
  );
}

export default BottomWrapperStages;
