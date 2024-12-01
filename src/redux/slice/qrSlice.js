import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  qr_name: "",
  id: "",
  //URL
  field_url: "",
  //WIFI
  network_name: "",
  network_password: "",
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
  app_social: {},
  //LANDING
  landing_action_url: "",
  landing_company: "",
  landing_logo: "",
  landing_title: "",
  landing_subtitle: "",
  landing_social: {},
  landing_btn_text: "",
  //SOCIAL
  media_social: {},
  media_headline: "",
  media_description: "",
  social_logo: "",

  //image_gallery
  // gallery_image: "",
  gallery_title: "",
  gallery_description: "",
  gallery_website: "",
  gallery_url: "",
  gallery_btn_text: "",
  gallery_image: [],

  //LINKS
  linkslogo: "",
  links_title: "",
  links_description: "",
  all_links: [],
  links_social: {},

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
  business_btn_text: "", //
  business_address: "", //
  business_city: "", //
  business_country: "", //
  business_numeration: "", //
  business_postalcode: "", //
  business_state: "", //
  business_about: "", //

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
  business_logo: "",

  //VIDEO
  video_path: null,
  video_name: "",
  video_description: "",
  video_button: "",
  video_url: "",
  video_social: {},

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
  event_time_end: "",
  event_time_start: "",
  event_time_timezone: "",
  event_image: "",
  event_facilities: "",
  event_btn_text: "",

  //ELABELS
  //BEER
  wine: true,
  beer: false,
  cigars: false,
  coffee: false,
  food: false,
  product: false,

  product_name: "",
  sku: "",
  description: "",
  alcohol_percentage: 0,
  ipa: "",
  brewed: "",
  website: "",
  where_it_is_made: "",
  wrapper: "",
  binder: "",
  filler: "",
  strength: "",
  body: "",
  size: "",
  flavour_profile: "",
  best_paired_with: "",
  origin: "",
  farm: "",
  altitude: 0,
  roast: "",
  flavour: "",
  ingredients: "",
  storage: "",
  grape_variety: "",
  task_notes: "",
  free_trade: false,
  organic: false,
  clories: "",
  cuisine: "",
  directions: "",
  brand: "",
  warning: "",
  category: "",
  price: 0,

  nutritional_image: "",
  food_image: "",
  coffee_image: "",
  cigar_image: "",
  wine_image: "",
  product_image: "",
  nutrition_image: "",
  beer_image: "",

  type: "",
  style: {
    dotsStyle: "", //square
    dotsColor: "#000000",
    cornerStyle: "",
    cornerBackgroundColor: "#ffffff",
    cornerBorderColor: "",
    cornerDotColor: "",
    backgroundColor: "#ffffff",
    frameStyle: "#ffffff",
    frameColor: "", //#404040
    frameText: "",
    frameTextColor: "",
    frameName: "",
  },
  color: {
    background: "#d1e5fa",
    button: "#1466b8",
  },
  social: {},
  qrDesignLogo: "",
  is_rating: false,
  is_question: false,
  questions: [],
  only_question: [],
};
const qrSlice = createSlice({
  name: "qrData",
  initialState,

  reducers: {
    setsQrData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetQrData: () => initialState,

    resetField: (state, action) => {
      // const { field } = action.payload;
      // if (field in state) {
      //   return {
      //     ...state,
      //     [field]: "",
      //   };
      // }
      // return state;
    },

    clearField: (state, action) => {
      const fieldName = action.payload;
      if (fieldName in state) {
        state[fieldName] = null;
      }
    },
    deleteField: (state, action) => {
      const field = action.payload;
      // console.log("field logggg", field);
      if (state.hasOwnProperty(field)) {
        state[field] = "";
      }
    },
  },
});

export const { setsQrData, resetQrData, resetField, clearField, deleteField } =
  qrSlice.actions;

export default qrSlice.reducer;
