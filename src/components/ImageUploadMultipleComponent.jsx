import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ImageUploadMultipleComponent = ({
  defaultImage,
  onImageUpload,
  onImageDelete,
  label,
  name,
  localQrData,
  onEditImagePreview,
}) => {
  // const [images, setImages] = useState(localQrData?.gallery_image);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (localQrData?.gallery_image) {
      setImages(localQrData?.gallery_image);
      // setImages(
      //   Array.isArray(localQrData.gallery_image)
      //     ? localQrData.gallery_image
      //     : [localQrData.gallery_image]
      // );
    }
  }, [localQrData]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
    event.target.value = null;

    if (onImageUpload) {
      newImages.forEach(({ url, file }) => onImageUpload(url, name, file));
    }
  };

  const handleImageDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    if (onImageDelete) {
      onImageDelete(name, index);
    }
  };

  return (
    <div className="img-upload-comp-multiple">
      <div className="wrap">
        <p className="upload-label">{label}</p>
        <label
          htmlFor={`file-upload-${label.replace(/\s+/g, "-")}`}
          className="file-input-label"
        >
          Choose Files
        </label>
        <input
          type="file"
          id={`file-upload-${label.replace(/\s+/g, "-")}`}
          multiple
          onChange={handleImageUpload}
          accept="image/*"
          className="file-input"
        />
        <div className="img-gallery">
          {images.length > 0 &&
            images.map((img, index) => (
              <div key={index} className="img-item">
                <img
                  // src={img.url || img}
                  src={
                    img.url
                      ? img.url
                      : img instanceof File
                      ? URL.createObjectURL(img)
                      : img
                  }
                  alt={`Uploaded ${index}`}
                  className="uploaded-img"
                />
                {console.log("img", img)}
                <button
                  className="delete-btn"
                  onClick={() => handleImageDelete(index)}
                >
                  &#10005; {/* Unicode for "X" */}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

ImageUploadMultipleComponent.propTypes = {
  defaultImage: PropTypes.string.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  onImageDelete: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  localQrData: PropTypes.object,
  onEditImagePreview: PropTypes.string,
};

export default ImageUploadMultipleComponent;
