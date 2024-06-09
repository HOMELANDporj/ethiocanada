import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PreviewImagesPage.css'; // Import CSS file for styling

const PreviewImagesPage = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/upload-receipt');
  };

  return (
    <div className="preview-images-container">
      <h2>Preview Images</h2>
      <div className="images-wrapper">
        <img src="/images/p.png" alt="document" className="preview-image" />
      </div>
      <button onClick={handleNextClick} className="next-button">Next</button>
    </div>
  );
};

export default PreviewImagesPage;
