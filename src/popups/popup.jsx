import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="success-popup-container">
      <button className="open-popup-button" onClick={openPopup}>
        Show Success Message
      </button>
      {isOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <FaCheckCircle className="popup-icon" />
            <h2>Success!</h2>
            <p>Your action was completed successfully.</p>
            <button className="close-popup-button" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        .success-popup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .open-popup-button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border: none;
          background-color: #28a745;
          color: white;
          border-radius: 5px;
        }

        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          position: relative;
        }

        .popup-icon {
          color: #28a745;
          font-size: 40px;
          margin-bottom: 10px;
        }

        .close-popup-button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
