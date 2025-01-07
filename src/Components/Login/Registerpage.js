"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import {
  faPhone,
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { loginSuccess, setUserType } from "@/app/Redux/authSlice";
import { useDispatch } from "react-redux";
import {
  validateEmail,
  validateMobile,
  validateEmailOptional,
} from "../Validation";

import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/dropdown.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/Register.css";
import "../../Styles/Frontend/css/Receiveotp2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Registerpage() {
  const [vendorType, setVendorType] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]); // Initialize pin state as an array
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]); // Initialize confirmPin state as an array
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [businesscategory, setBusinessCategory] = useState("");
  const [pinVisible, setPinVisible] = useState(false);
  const [confirmPinVisible, setConfirmPinVisible] = useState(false);

  const [businessCat, setBusinessCat] = useState([]);

  const [emailError, setEmailError] = useState("");

  const router = useRouter();

  // const location = useLocation();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email: contextEmail, mobile: contextMobile } = useUser();

  console.log("contextEmail", contextEmail);
  console.log("contextMobile", contextMobile);

  // useEffect(() => {
  //   if (location.state) {
  //     const { mobile, email } = location.state;
  //     if (mobile) {
  //       setMobile(mobile);
  //     }
  //     if (email) {
  //       setEmail(email);
  //     }
  //   }
  // }, [location.state]);

  useEffect(() => {
    if (contextMobile) {
      setMobile(contextMobile);
    }
    if (contextEmail) {
      setEmail(contextEmail);
    }
  }, [contextMobile, contextEmail]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value && !emailRegex.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleUserTypeChange = (e) => {
    setVendorType(e.target.value);
  };

  const togglePinVisibility = () => {
    setPinVisible(!pinVisible);
  };

  const toggleConfirmPinVisibility = () => {
    setConfirmPinVisible(!confirmPinVisible);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    setError("");

    // const emailError = validateEmailOptional(email);
    const mobileError = validateMobile(mobile);

    if (mobileError) {
      setError(mobileError);
      return;
    }

    // Validate vendor type
    if (!vendorType) {
      setError("Please select a user type.");
      return;
    }

    const payload = {
      vendortype: vendorType,
      email: email,
      mobile: mobile,
      password: pin.join(""), // Convert array to string
      confirmpassword: confirmPin.join(""), // Convert array to string
    };

    const payload1 = {
      vendortype: vendorType,
      email: email,
      mobile: mobile,
      password: pin.join(""), // Convert array to string
      confirmpassword: confirmPin.join(""), // Convert array to string
      businesscategory: businesscategory,
    };

    try {
      let response;
      if (vendorType.toLowerCase() === "business") {
        response = await fetch(
          "https://apidev.myinteriormart.com/api/Register/RegisterPanelBusiness",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "c4NjY4NTMyMTMiLCJhdWQiOiIxOTg0OTgH",
            },
            body: JSON.stringify(payload1),
          }
        );
      } else {
        response = await fetch(
          "https://apidev.myinteriormart.com/api/Register/RegisterPanel",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "c4NjY4NTMyMTMiLCJhdWQiOiIxOTg0OTkz",
            },
            body: JSON.stringify(payload),
          }
        );
      }

      const data = await response.json();

      const cityName = localStorage.getItem("cityname");
      const pathhome = `/`;

      if (response.ok) {
        // console.log('User Registered successfully', data);

        localStorage.setItem("email", email);
        localStorage.setItem("mobile", mobile);
        if (vendorType.toLowerCase() === "business") {
          localStorage.setItem("businessType", businesscategory);
        }

        sessionStorage.setItem("email", email);
        sessionStorage.setItem("mobile", mobile);
        if (vendorType.toLowerCase() === "business") {
          sessionStorage.setItem("businessType", businesscategory);
        }

        document.cookie = `email=${email}; path=/; max-age=3600`;
        document.cookie = `mobile=${mobile}; path=/; max-age=3600`;

        dispatch(loginSuccess({ token: data.token, user: data.user }));
        dispatch(setUserType(vendorType));
        setSuccessMessage("User Registered successfully");
        //  navigate('/');

        //Active User API Cal

        const getLocalISOString = () => {
          const now = new Date();
          const newDate = now.getTimezoneOffset();
          const localDate = new Date(now.getTime() - newDate * 60 * 1000);
          // console.log('now',now);
          // console.log('newDate',newDate);
          // console.log('localDate',localDate);
          return localDate.toISOString().slice(0, 19);
        };

        const activeUserResponse = await fetch(
          "https://apidev.myinteriormart.com/api/TrackActiveUser/TrackActiveUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              UserId: mobile,
              LoginTime: getLocalISOString(),
            }),
          }
        );
        if (!activeUserResponse.ok) {
          console.error("Active User API failed");
        } else {
          console.log("Tracker Api Implementated Successfully");
        }

        if (vendorType.toLocaleLowerCase() === "business") {
          router.push(pathhome, { state: { email: email } });
        } else {
          router.push("/editprofile");
        }
      } else {
        if (data.message) {
          setError(data.message);
        } else {
          console.error("Server Error:", data);
          setError(data.message || "User Registration Failed");
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("An error occurred while sending OTP. Please try again later.");
    }
  };

  //Dynamic business category
  const fetchBusinessCategories = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/BusinessFirstCategory/FirstCategory`
      );
      const data = await response.json();

      if (response.ok && data.categories) {
        setBusinessCat(data.categories);
        console.log("category", data.categories);
      } else {
        console.error("Failed to fetch Business categories");
      }
    } catch (error) {
      console.error("Error in fetch business cat", error);
    }
  };

  useEffect(() => {
    fetchBusinessCategories();
  }, []);

  const businessFields = (
    <div className="form-group">
      <select
        name="business-type"
        className="form-control"
        onChange={(e) => setBusinessCategory(e.target.value)}
      >
        <option value="">Select Business Type</option>
        {businessCat.length > 0 ? (
          businessCat.map((category) => (
            <option
              key={category.firstCategoryID}
              value={category.firstCategoryID}
            >
              {category.name}
            </option>
          ))
        ) : (
          <option disabled>Loading</option>
        )}
        {/* <option value="44">Dealers</option>
                <option value="41">Services</option>
                 <option value="45">Manufacturers</option> */}
        {/*<option value="47">Rental Services</option>
                <option value="46">Labours</option> */}
        {/* <option value="43">Contractors</option> */}
        {/* <option value="40">Repairs</option>
                <option value="39">premium Categories</option>
                <option value="53">wholesalers</option>
                <option value="54 ">distributors</option>
                <option value="48">Labor Contractors</option> */}
        {/* Add more options as needed */}
      </select>
    </div>
  );

  return (
    <div className="container sign_up_container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div id="sign-in-dialog" className="dialog-mfp zoom-anim-dialog">
            <div className="step first">
              <h2 className="text-center pt-3">Register</h2>
              <div className="tab-content checkout">
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-around mt-3">
                      <div className="form-check user_type">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="user-type"
                          value="Consumer"
                          onChange={handleUserTypeChange}
                        />
                        <label className="form-check-label">Consumer</label>
                      </div>
                      <div className="form-check user_type">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="user-type"
                          value="Business"
                          onChange={handleUserTypeChange}
                        />
                        <label className="form-check-label">Business</label>
                      </div>
                    </div>
                    {error && !vendorType && (
                      <div className="text-danger">
                        Please select a user type.
                      </div>
                    )}
                    {vendorType.toLowerCase() === "business" && businessFields}
                    <div className="form-group mb-4">
                      <div className="icon-wrapper" style={{ bottom: "24px" }}>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          style={{ color: "#ccc" }}
                        />
                        {/* <i className="icon_mail_alt"></i> */}
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      {emailError && (
                        <p style={{ color: "red" }}>{emailError}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <div className="icon-wrapper">
                        {/* <i className="icon_phone"></i> */}
                        <FontAwesomeIcon
                          icon={faPhone}
                          style={{ color: "#ccc" }}
                        />
                      </div>
                      <input
                        className="form-control"
                        type="number"
                        name="mobile"
                        placeholder="Mobile no."
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        maxLength={10}
                      />
                      {error.mobile && (
                        <div className="text-danger">{error.mobile}</div>
                      )}
                    </div>
                    <div className="pin-group">
                      <label htmlFor="pin">Enter PIN</label>
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
                              if (
                                e.key === "Backspace" &&
                                index > 0 &&
                                !pin[index]
                              ) {
                                const newPin = [...pin];
                                newPin[index - 1] = "";
                                setPin(newPin);
                                document
                                  .getElementById(`pin-${index - 1}`)
                                  .focus();
                              }
                            }}
                            onFocus={(e) => e.target.select()}
                            required
                          />
                        ))}
                      </div>
                      {/* <i
                        onClick={togglePinVisibility}
                        className={`registereye fa ${
                          pinVisible ? "fa-eye" : "fa-eye-slash"
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
                      ></i> */}

                      <FontAwesomeIcon
                        icon={pinVisible ? faEye : faEyeSlash}
                        onClick={togglePinVisibility}
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
                      />
                    </div>
                    <div className="pin-group">
                      <label htmlFor="confirm-pin">Enter Confirm PIN</label>
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
                      {/* <i
                        onClick={toggleConfirmPinVisibility}
                        className={`registereye fa ${
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
                      ></i> */}

                      <FontAwesomeIcon
                        icon={confirmPinVisible ? faEye : faEyeSlash}
                        onClick={toggleConfirmPinVisibility}
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
                      />
                    </div>
                    <button type="submit" className="btn_1 full-width mb-4">
                      Register
                    </button>
                    <p>
                      Already have an account! <a href="/login">Sign In</a>
                    </p>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && (
                      <div className="alert alert-success">
                        {successMessage}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerpage;
