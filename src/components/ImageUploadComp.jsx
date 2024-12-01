import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ImageUploadComponent = ({
  defaultImage,
  onImageUpload,
  onImageDelete,
  label,
  name,
  localQrData,
  onEditImagePreview,
}) => {
  const [image, setImage] = useState(null);
  // console.log("localQrDataImagetesttt", localQrData);

  // Generate a unique id for each instance of the component
  const uniqueId = `file-upload-${label.replace(/\s+/g, "-")}-${Math.random()}`;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Generate a local URL for the file
      setImage(imageUrl);

      event.target.value = null;
      if (onImageUpload) {
        onImageUpload(imageUrl, name, file);
      }
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    if (onImageDelete) {
      onImageDelete(name);
    }
  };

  console.log("onEditImagePreview", onEditImagePreview);
  return (
    <div className="img-upload-comp">
      <div className="wrap">
        <p>{label}</p>
        <div className="img-wrapper">
          <img
            src={
              image ||
              (onEditImagePreview instanceof File
                ? URL.createObjectURL(onEditImagePreview)
                : onEditImagePreview) ||
              defaultImage
            }
            alt="Uploaded"
            className="uploaded-img"
          />
          <div className="icon-overlay">
            <label htmlFor={uniqueId} className="upload-icon">
              <h3>+</h3>
              <input
                type="file"
                id={uniqueId}
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
