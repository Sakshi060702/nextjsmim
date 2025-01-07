'use client'
import React from 'react';

import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/dropdown.css";
import "../../Styles/Frontend/css/Businesslisting.css";
import "../../Styles/Frontend/css/Popupnotification.css";



const Popupalert = ({ message, type,onClose }) => {
  const isSuccess = type === "success";

  return (
    <div className={`popup3 ${type}`}>
      <div className='popup3-overlay'onClick={onClose}>
        <div className="popup3-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}>
            X
          </button>
          <div style={{paddingBottom:'20px', textAlign: 'center'}}>
            <div className={`icon-container ${isSuccess ? 'success-icon-container' : 'error-icon-container'}`} style={{paddingLeft:'10px',paddingBottom:'15px'}}>
              <span className={isSuccess ? 'success-icon' : 'error-icon'} >
                {isSuccess ? '✓' : '✗'}
              </span>
            </div>
            <h3 className={isSuccess ? "success-message" : "error-message"}>
              {isSuccess ? "Success" : "Error"}
            </h3>
            <h5>{message}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popupalert;
