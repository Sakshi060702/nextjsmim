'use client';
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Popupalert from "./Popupalert";
const PincodePopup = ({ isOpen, localityId, onClose }) => {
  const [formData, setFormData] = useState({
    pinNumber:"",
  });
  const token = useSelector((state) => state.auth.token);

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

 
  // console.log("BRAVOoooooooooooooo ",isOpen, localityId);
  if (!isOpen) return null;

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   console.log(formData,cityId);
      formData['localityId']= localityId;
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/Pincode/CreatePincode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setSuccessMessage("Locality Added  Successfully");
      setErrorMessage("");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        onClose();
      }, 2000);
      // Handle success (e.g., show a success message or close the popup)
      onClose();
    } catch (error) {
      console.error("Error submitting the form:", error);
      setErrorMessage("Pincode already exists.");
      setSuccessMessage("");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      <style>
        {`
          .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .popup-content {
          position:relative;
            background: white;
            padding: 20px;
            border-radius: 5px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
            .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: transparent;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
          }
             
        `}
      </style>
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <h6>Add Locality</h6>
          
          <hr></hr>
          <form >
            <div className="row">
              
              <div className="col-md-12">
                <div className="form-group">
                
                  <input
                    className="form-control"
                    type="number"
                    name="pinNumber"
                    placeholder="Pincode"
                    value={formData.pinNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div style={{display:'flex'}}>
              <div style={{paddingLeft:'10px',marginRight:'11px'}}> 
                <button
                className="btn"
                style={{ backgroundColor: "green" }}
                onClick={handleSubmit}
              >
                Submit
              </button></div>
              <div style={{paddingRight:'292px'}}><button
                className="btn"
                style={{ backgroundColor: "red" }}
                onClick={onClose}
              >
                Cancel
              </button></div>
              </div>
              
              
             
              
            </div>
          </form>
          {showPopup && (
            <Popupalert
              message={successMessage || errorMessage}
              type={successMessage ? "success" : "error"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PincodePopup;