// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// const ImageUploadComponent = ({ defaultImage, onImageUpload, onImageDelete, label }) => {
//   const [image, setImage] = useState(null);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//         if (onImageUpload) {
//           onImageUpload(reader.result);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageDelete = () => {
//     setImage(null);
//     if (onImageDelete) {
//       onImageDelete();
//     }
//   };

//   return (
//     <div className="img-upload-comp">
//       <div className="wrap">
//         <p>{label}</p>
//         <div className="img-wrapper">
//           <img
//             src={image || defaultImage}
//             alt="Uploaded"
//             className="uploaded-img"
//           />
//           <div className="icon-overlay">
//             <label htmlFor="file-upload" className="upload-icon">
//               <h3>+</h3>
//               <input
//                 type="file"
//                 id="file-upload"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//               />
//             </label>
//           </div>
//         </div>
//       </div>
//       {image && (
//         <button className="delete-icon" onClick={handleImageDelete}>
//           Delete
//         </button>
//       )}
//     </div>
//   );
// };

// ImageUploadComponent.propTypes = {
//   defaultImage: PropTypes.string.isRequired,
//   onImageUpload: PropTypes.func,
//   onImageDelete: PropTypes.func,
//   label: PropTypes.string.isRequired,
// };

// export default ImageUploadComponent;

import React, { useState } from "react";
import PropTypes from "prop-types";

const ImageUploadComponent = ({
  defaultImage,
  onImageUpload,
  onImageDelete,
  label,
  name,
}) => {
  const [image, setImage] = useState(null);

  // Generate a unique id for each instance of the component
  const uniqueId = `file-upload-${label.replace(/\s+/g, "-")}-${Math.random()}`;

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {

  //       setImage(reader.result);
  //       if (onImageUpload) {
  //         onImageUpload(reader.result,name,file);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Generate a local URL for the file
      setImage(imageUrl);

      if (onImageUpload) {
        // Pass the name (identifier), imageUrl, and file object to the parent handler
        onImageUpload(imageUrl, name, file);
      }
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    if (onImageDelete) {
      onImageDelete();
    }
  };

  return (
    <div className="img-upload-comp">
      <div className="wrap">
        <p>{label}</p>
        <div className="img-wrapper">
          <img
            src={image || defaultImage}
            alt="Uploaded"
            className="uploaded-img"
          />
          <div className="icon-overlay">
            <label htmlFor={uniqueId} className="upload-icon">
              <h3>+</h3>
              <input
                type="file"
                id={uniqueId} // Use the unique id here
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
      </div>
      {image && (
        <button className="delete-icon" onClick={handleImageDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

ImageUploadComponent.propTypes = {
  defaultImage: PropTypes.string.isRequired,
  onImageUpload: PropTypes.func,
  onImageDelete: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default ImageUploadComponent;

// import React, { useState } from "react";
// import PropTypes from "prop-types";

// const MediaUploadComponent = ({
//   defaultImage,
//   onMediaUpload,
//   onMediaDelete,
//   label,
//   acceptType = "image/*", // Default is image, but can be changed to 'video/*' or 'image/*,video/*'
//   name,
// }) => {
//   const [media, setMedia] = useState(null);

//   // Generate a unique id for each instance of the component
//   const uniqueId = `file-upload-${label.replace(/\s+/g, "-")}-${Math.random()}`;

//   const handleMediaUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const mediaData = {
//           name, // Include the name in the media data
//           media: reader.result,
//         };

//         setMedia(reader.result);
//         console.log("mediaDatamediaData", mediaData);
//         if (onMediaUpload) {
//           console.log("onMediaUpload", onMediaUpload);
//           onMediaUpload(mediaData); // Pass the name and media data to the parent component
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleMediaDelete = () => {
//     setMedia(null);
//     if (onMediaDelete) {
//       onMediaDelete();
//     }
//   };

//   console.log("mediamedia", media);

//   return (
//     <div className="img-upload-comp">
//       <div className="wrap">
//         <p>{label}</p>
//         <div className="img-wrapper">
//           {acceptType.includes("image") && (media || defaultImage) && (
//             <img
//               src={media || defaultImage}
//               alt="Uploaded"
//               className="uploaded-img"
//             />
//           )}
//           {acceptType.includes("video") && media && media.includes("video") && (
//             <video src={media} controls className="uploaded-img" />
//           )}
//           <div className="icon-overlay">
//             <label htmlFor={uniqueId} className="upload-icon">
//               <h3>+</h3>
//               <input
//                 type="file"
//                 id={uniqueId}
//                 accept={acceptType}
//                 onChange={handleMediaUpload}
//               />
//             </label>
//           </div>
//         </div>
//       </div>
//       {media && (
//         <button className="delete-icon" onClick={handleMediaDelete}>
//           Delete
//         </button>
//       )}
//     </div>
//   );
// };

// MediaUploadComponent.propTypes = {
//   defaultImage: PropTypes.string.isRequired,
//   onMediaUpload: PropTypes.func,
//   onMediaDelete: PropTypes.func,
//   label: PropTypes.string.isRequired,
//   acceptType: PropTypes.string, // Can be 'image/*', 'video/*', or 'image/*, video/*'
//   name: PropTypes.string,
// };

// export default MediaUploadComponent;
