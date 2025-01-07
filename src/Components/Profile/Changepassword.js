'use client';
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Popupalert from "../Freelisting/Popupalert";


function Changepassword() {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = useSelector((state) => state.auth.token);

  const [showPassword, setshowPassword] = useState("false");
  const [successMessage, setSuccessMessage] = useState("");
  const [oldpasswordVisible, setOldPasswordVisible] = useState(false);
  const [newpasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmpasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
 


  const [oldPinVisible, setOldPinVisible] = useState(false);
  const [pinVisible, setPinVisible] = useState(false);
  const [confirmPinVisible, setConfirmPinVisible] = useState(false);

  const [oldPin, setOldPin] = useState(["", "", "", ""]);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);

  const handlePinChange = (e, index) => {
    const { value } = e.target;

    // Check if the input value is a digit
    if (/^\d?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Automatically focus on the next input box if there is a value and index < 3
      if (value && index < 3) {
        document.getElementById(`pin-${index + 1}`).focus();
      }
    }
  };

  const handleOldPinChange = (e, index) => {
    const { value } = e.target;

    // Check if the input value is a digit
    if (/^\d?$/.test(value)) {
      const newPin = [...oldPin];
      newPin[index] = value;
      setOldPin(newPin);

      // Automatically focus on the next input box if there is a value and index < 3
      if (value && index < 3) {
        document.getElementById(`oldpin-${index + 1}`).focus();
      }
    }
  };

  const handleConfirmPinChange = (e, index) => {
    const { value } = e.target;

    // Check if the input value is a digit
    if (/^\d?$/.test(value)) {
      const newPin = [...confirmPin];
      newPin[index] = value;
      setConfirmPin(newPin);

      // Automatically focus on the next input box if there is a value and index < 3
      if (value && index < 3) {
        document.getElementById(`confirm-pin-${index + 1}`).focus();
      }
    }
  };

  const togglelOldPinVisibility = () => {
    setOldPinVisible(!oldPinVisible);
  };

  const togglePinVisibility = () => {
    setPinVisible(!pinVisible);
  };

  const toggleConfirmPinVisibility = () => {
    setConfirmPinVisible(!confirmPinVisible);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      oldPassword:oldPin.join(""),
      newPassword:pin.join(""),
      confirmPassword:confirmPin.join(""),
    };
    if (!data.oldPassword || !data.newPassword || !data.confirmPassword) {
      setErrorMessage("All fields are compulsory.");
      setShowPopup(true);
      return;
  }

  // Check if new PIN and confirm PIN match
  if (data.newPassword !== data.confirmPassword) {
      setErrorMessage("New PIN and Confirm PIN do not match.");
      setShowPopup(true);
      return;
  }
  
    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/ForgotPassword/ForgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      setSuccessMessage("Pin updated Succeessfully");
      setErrorMessage("");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
       
      }, 2000);

      // Reset form fields after successful submission
      setOldPin(["","",""]);
      setPin(["","",""]);
      setConfirmPin(["","",""]);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        "Failed to Submit details. Please try again later."
      );
      setSuccessMessage(""); // Clear any existing success message
      setShowPopup(true);
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        <div className="add-review">
          <h5>Change Password</h5>
          <form className="icon-form-group" onSubmit={handleSubmit}>
          <div className="" >
              <div >  
              {/* style={{paddingLeft:'300px'}} */}
              <div className="pin-group">
                <label htmlFor="pin">Old PIN</label>
                <div className="pin-input-group">
                  {[...Array(4)].map((_, index) => (
                    <input
                      key={index}
                      id={`oldpin-${index}`}
                      type={oldPinVisible ? "text" : "password"}
                      maxLength="1"
                      className="pin-input"
                      value={oldPin[index] || ""}
                      onChange={(e) => handleOldPinChange(e, index)}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          index > 0 &&
                          !oldPin[index]
                        ) {
                          const newPin = [...oldPin];
                          newPin[index - 1] = "";
                          setOldPin(newPin);
                          document.getElementById(`oldpin-${index - 1}`).focus();
                        }
                      }}
                      onFocus={(e) => e.target.select()}
                      required
                    />
                  ))}
                </div>
                <i
                  onClick={togglelOldPinVisibility}
                  className={` changepin1 fa ${oldPinVisible ? "fa-eye" : "fa-eye-slash"}`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "orange",
                    fontSize: "20px",
                 
                    marginTop: "20px",
                  }}
                  aria-hidden="true"
                ></i>
              </div>
              


              <div className="pin-group">
                <label htmlFor="pin">New PIN</label>
                <div className="pin-input-group">
                  {[...Array(4)].map((_, index) => (
                    <input
                      key={index}
                      id={`pin-${index}`}
                      type={pinVisible ? "text" : "password"}
                      maxLength="1"
                      className="pin-input"
                      value={pin[index] || ""}
                      onChange={(e) => handlePinChange(e, index)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && index > 0 && !pin[index]) {
                          const newPin = [...pin];
                          newPin[index - 1] = "";
                          setPin(newPin);
                          document.getElementById(`pin-${index - 1}`).focus();
                        }
                      }}
                      onFocus={(e) => e.target.select()}
                      required
                    />
                  ))}
                </div>
                <i
                  onClick={togglePinVisibility}
                  className={`changepin1 fa ${pinVisible ? "fa-eye" : "fa-eye-slash"}`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "orange",
                    fontSize: "20px",
                   
                    marginTop: "20px",
                  }}
                  aria-hidden="true"
                ></i>
              </div>
              

              

              <div className="pin-group">
                <label htmlFor="confirm-pin">Confirm PIN</label>
                <div className="pin-input-group">
                  {[...Array(4)].map((_, index) => (
                    <input
                      key={index}
                      id={`confirm-pin-${index}`}
                      type={confirmPinVisible ? "text" : "password"}
                      maxLength="1"
                      className="pin-input"
                      value={confirmPin[index] || ""}
                      onChange={(e) => handleConfirmPinChange(e, index)}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          index > 0 &&
                          !confirmPin[index]
                        ) {
                          const newPin = [...confirmPin];
                          newPin[index - 1] = "";
                          setConfirmPin(newPin);
                          document
                            .getElementById(`confirm-pin-${index - 1}`)
                            .focus();
                        }
                      }}
                      onFocus={(e) => e.target.select()}
                      required
                    />
                  ))}
                </div>
                <i
                  onClick={toggleConfirmPinVisibility}
                  className={`changepin1 fa ${
                    confirmPinVisible ? "fa-eye" : "fa-eye-slash"
                  }`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "orange",
                    fontSize: "20px",
                  
                    marginTop: "20px",
                  }}
                  aria-hidden="true"
                ></i>
              </div>
              </div>
              <div className="btn_1">
                <input
                  type="submit"
                  value="Submit"
                  className="btn_1 full-width"
                  style={{height:'25px',
                    padding:'10px'
                  }}
                />
              </div>
            </div>
            {showPopup && (
                  <Popupalert
                    message={successMessage || errorMessage}
                    type={successMessage ? "success" : "error"}
                    onClose={handleClosePopup}
                  />
                )}

          </form>
        </div>
      </div>
    </>
  );
}
export default Changepassword;
