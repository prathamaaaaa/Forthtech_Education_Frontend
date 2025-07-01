import React from "react";

const SelectedMediaModal = ({ selectedMedia, setSelectedMedia }) => {
  if (!selectedMedia) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
         onClick={() => setSelectedMedia(null)}>
      {selectedMedia.type === 'image' ? (
        <img src={selectedMedia.url} alt="Preview" className="max-h-[90%] max-w-[90%] rounded" />
      ) : (
        <video controls autoPlay className="max-h-[90%] max-w-[90%] rounded">
          <source src={selectedMedia.url} type="video/mp4" />
          Your browser does not support video.
        </video>
      )}
    </div>
  );
};

export default SelectedMediaModal;
