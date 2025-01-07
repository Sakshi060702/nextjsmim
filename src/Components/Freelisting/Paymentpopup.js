"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/dropdown.css";
import "../../Styles/Frontend/css/Businesslisting.css";
import "../../Styles/Frontend/css/Popupnotification.css";
import "../../Styles/Frontend/css/Paymentmode.css";

const Paymentpopup = ({ isOpen, onClose, message }) => {
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();

  const cityName = localStorage.getItem("cityname");
  const pathlisting = `/ `;

  const handleContinue = () => {
    onClose();
    router.push(pathlisting);
  };

  return (
    <>
      {isOpen && (
        <div className="popup2-overlay" onClick={onClose}>
          <div className="popup2-content" onClick={(e) => e.stopPropagation()}>
            <div>
              <img
                src="/img/mimsuccess.png"
                className="paymentimage"
                style={{ height: "80px", width: "80px", marginBottom: "12px" }}
              ></img>
              <h3
                className="success-message"
                style={{ textAlign: "center", color: "orange" }}
              >
                SUCCESS
              </h3>
              <h6 style={{ textAlign: "center" }}>{message}</h6>
              <h6>
                Congratulation! Your Business Listing has Under review. After
                review your listing has been live within 48 hour's{" "}
              </h6>
              <h6 style={{ textAlign: "right" }}>- My Interior Mart Team.</h6>
            </div>

            <div className="popupbutton-container">
              <button
                onClick={handleContinue}
                style={{
                  color: "white",
                  fontSize: "18px",
                  backgroundColor: "orange",
                  height: "50px",
                  width: "347px",
                  border: "1px solid orange",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Paymentpopup;
