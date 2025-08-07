
import { useState, useRef } from "react";

function Welcome() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  const imgRef = useRef(null);
  const containerRef = useRef(null);

  const resetEditing = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setIsUploaded(false);
    resetEditing();

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    setIsUploaded(true);
    alert("Image uploaded successfully!");
  };

  const startDrag = (e) => {
    if (isUploaded) return;

    setDragging(true);
    const bounds = containerRef.current.getBoundingClientRect();
    const relX = e.clientX - bounds.left - position.x;
    const relY = e.clientY - bounds.top - position.y;
    setRel({ x: relX, y: relY });
  };

  const onDrag = (e) => {
    if (!dragging) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - bounds.left - rel.x;
    const newY = e.clientY - bounds.top - rel.y;
    setPosition({ x: newX, y: newY });
  };

  const stopDrag = () => setDragging(false);

  return (
    <div className="container mt-5 text-center" onMouseMove={onDrag} onMouseUp={stopDrag} onMouseLeave={stopDrag}>
      <p className="fs-5 text-muted mb-4 text-primary"><i className="bi bi-emoji-smile me-2 text-warning fs-3"></i>Here you can update your profile picture.</p>

      <div className="d-flex justify-content-center">
        <div
          ref={containerRef}
          className={`rounded-circle overflow-hidden d-flex align-items-center justify-content-center border position-relative`}
          style={{
            width: "160px",
            height: "160px",
            borderColor: isUploaded ? "#17c1ae" : "#dee2e6",
            boxShadow: isUploaded
              ? "0 0 30px 12px rgba(23, 193, 174, 0.7)"
              : "0 0 8px rgba(0,0,0,0.1)",
            transition: "all 0.4s ease-in-out",
            backgroundColor: "#fff",
            cursor: isUploaded ? "default" : "grab",
          }}
          onMouseDown={startDrag}
        >
          <img
            ref={imgRef}
            src={
              previewImage ||
              "https://ui-avatars.com/api/?name=Profile&background=0D8ABC&color=fff&rounded=true&size=150"
            }
            alt="Profile"
            style={{
              width: `${zoom * 160}px`,
              height: `${zoom * 160}px`,
              transform: `translate(${position.x}px, ${position.y}px)`,
              objectFit: "cover",
              transition: dragging ? "none" : "transform 0.2s ease",
              userSelect: "none",
              pointerEvents: "none",
            }}
            draggable="false"
          />
        </div>
      </div>

      {/* Zoom Control (only before upload) */}
      {!isUploaded && previewImage && (
        <div className="mt-3">
          <label className="form-label me-2">Zoom:</label>
          <input
            type="range"
            min="1"
            max="1.8"
            step="0.05"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="form-range w-50 mx-auto"
          />
        </div>
      )}

      {/* File input and Upload button (always visible) */}
      <div className="mt-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="form-control w-auto d-inline-block"
        />
      </div>

      <div className="mt-2">
        <button className="btn btn-primary" onClick={handleUpload}>
          Update
        </button>
      </div>
    </div>
  );
}

export default Welcome;
