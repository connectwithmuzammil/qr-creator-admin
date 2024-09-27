import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const VideoUpload = ({ onVideoUpload }) => {
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    if (file.size > 2048 * 1024) {
      // 2MB in bytes
      toast.error("The video is too large. Maximum size is 2MB.");
      return;
    }
    if (file) {
      const newVideoUrl = URL.createObjectURL(file);
      setVideo(file);
      setVideoUrl(newVideoUrl);
      createThumbnail(newVideoUrl);

      onVideoUpload(file);
    }
  };

  const createThumbnail = (videoUrl) => {
    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;
    videoElement.currentTime = 1; // Capture the thumbnail at 1 second

    videoElement.onloadeddata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL(); // Get the base64 image data
      setThumbnail(dataUrl);
      URL.revokeObjectURL(videoUrl); // Revoke the object URL to release memory
    };
  };

  const handleVideoRemove = () => {
    setVideo(null);
    setThumbnail(null);
    URL.revokeObjectURL(videoUrl); // Revoke URL for the uploaded video
    setVideoUrl(null);
    document.getElementById("video-upload").value = ""; // Clear input value
  };

  return (
    <div className="video-upload-container">
      <input
        type="file"
        accept="video/*"
        id="video-upload"
        onChange={handleVideoUpload}
        style={{ display: "none" }}
      />
      {!video ? (
        <button
          className="upload-btn"
          onClick={() => document.getElementById("video-upload").click()}
        >
          Upload Video
        </button>
      ) : (
        <div className="video-info">
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Video thumbnail"
              className="video-thumbnail"
            />
          )}
          <div className="video-details">
            <span>{video.name}</span>
            <FaTrash className="delete-icon" onClick={handleVideoRemove} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
