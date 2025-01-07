"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { loginSuccess, setUserType } from "@/app/Redux/authSlice";
import { validateMobile } from "../Validation";
import { validateEmail } from "../Validation";
import { faPhone, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import Loginpopupalert from "../Loginpopupalert";

import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/dropdown.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/Register.css";
import "../../Styles/Frontend/css/Receiveotp2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Loginpage() {
  //   const location = useLocation();
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const router = useRouter();

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //   const { mobile, password } = location.state || { mobile: "", password: "" };
  const [userId, setuserId] = useState("");
  const [userMobile, setuserMobile] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]); // Initialize pin state as an array
  const [userPassword, setuserPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const handleMobileChange = (e) => {
    // setuserMobile(e.target.value);
    const value = e.target.value;

    // Allow only numeric values and restrict to 10 digits
    if (/^\d+$/.test(value)) {
      // Restrict mobile number to 10 digits
      if (value.length <= 10) {
        setuserMobile(value);
      }
    } else {
      // Allow non-numeric input (email)
      setuserMobile(value);
    }
  };
  const handlePasswordChange = (e) => {
    setuserPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!userMobile) {
      setError("Mobile number or email is required.");
      return;
    }

    if (/^\d+$/.test(userMobile)) {
      // Input is numeric, validate as mobile number
      const mobileError = validateMobile(userMobile);
      if (mobileError) {
        setError(mobileError);
        return;
      }
    } else {
      // Input is non-numeric, validate as email
      const emailError = validateEmail(userMobile);
      if (emailError) {
        setError(emailError);
        return;
      }
    }

    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/Auth/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailOrMobile: userMobile,
            password: pin.join(""),
            rememberMe: rememberMe,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      const cityName = localStorage.getItem("cityname");
      const pathhome = `/`;

      if (response.ok) {
        const tokenExpiry = new Date().getTime() + 1440 * 60 * 1000;

        localStorage.setItem("token_startTime", new Date().getTime());
        localStorage.setItem(
          "token_endTime",
          new Date().getTime() + 1440 * 60 * 1000
        );

        dispatch(
          loginSuccess({
            token: data.token,
            // user: data.user,
            tokenExpiry: tokenExpiry,
          })
        );
        console.log("Login Successful");
        dispatch(setUserType(data.userType));
        // dispatch(setUserType(data.user.userType));
        // setSuccess("Login Successful");
        setSuccessMessage("Login Successful");
        setErrorMessage("");
        setShowPopup(true);

        //Call Active User API

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
              UserId: userMobile,
              LoginTime: getLocalISOString(),
            }),
          }
        );
        if (!activeUserResponse.ok) {
          console.error("Active User API failed");
        } else {
          console.log("Tracker Api Implementated Successfully");
        }

        setTimeout(() => {
          setShowPopup(false);
          router.push(pathhome);
        }, 2000);
      } else {
        setErrorMessage("Login Unsuccessful.");
        setSuccessMessage(""); // Clear any existing success message
        setShowPopup(true);
      }
    } catch (error) {
      setErrorMessage("User Login Unsuccessful.");
      setSuccessMessage(""); // Clear any existing success message
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container sign_up_container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div id="sign-in-dialog" className="dialog-mfp zoom-anim-dialog">
            <div className="step first">
              <h2 className="text-center pt-3">Sign In</h2>
              <div className="tab-content checkout">
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group ">
                      <div className="icon-wrapper logininput">
                        <FontAwesomeIcon
                          icon={faPhone}
                          style={{ color: "#ccc" }}
                        />
                        {/* <i className="icon_phone"></i> */}
                      </div>
                      <input
                        className="form-control logininput"
                        type="text"
                        name="mobile"
                        placeholder="Email/Mobile No"
                        value={userMobile}
                        onChange={handleMobileChange}
                        style={{
                          textAlign: "center",
                          paddingRight: "19px",
                          height: "50px",
                          width: "194px",
                          fontSize: "16px",
                        }}
                      />
                      {/* {error && <div className="text-danger">{error}</div>} */}
                    </div>

                    <div className="pin-group">
                      <div
                        className="pin-input-group"
                        style={{
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                      >
                        {[...Array(4)].map((_, index) => (
                          <input
                            key={index}
                            id={`pin-${index}`}
                            type={passwordVisible ? "text" : "password"}
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
                        onClick={togglePasswordVisibility}
                        className={`logineye fa ${
                          passwordVisible ? "fa-eye" : "fa-eye-slash"
                        }`}
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "orange",
                          fontSize: "20px",
                          // marginRight: "40px",
                          // marginTop: '20px'
                        }}
                        aria-hidden="true"
                      ></i> */}

                      <FontAwesomeIcon
                        icon={passwordVisible ? faEye : faEyeSlash}
                        onClick={togglePasswordVisibility}
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "orange",
                          fontSize: "20px",
                        }}
                        aria-hidden="true"
                      />
                    </div>

                    <div
                      className="clearfix add_bottom_15"
                      style={{ display: "flex" }}
                    >
                      <div
                        className="checkboxes float-right"
                        // style={{ marginRight: "124px" }}
                      >
                        <label className="container_check">
                          Remember Me
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div style={{ paddingTop: "5px" }}>
                        {/* <Link
                      className="forgetpassword loginforgetpassword"
                      to={`/Forgetpassword/in-${localStorage.getItem('cityname')}`}
                      style={{ color: "Orange", textDecoration: "none" }}
                      onMouseOver={(e) => (e.target.style.color = "Black")}
                      onMouseOut={(e) => (e.target.style.color = "Orange")}
                    >
                      Forgot Password ?
                    </Link> */}
                      </div>
                    </div>

                    <button type="submit" className="btn_1 full-width mb-4">
                      Log In
                    </button>
                    {success && (
                      <div className="alert alert-success">{success}</div>
                    )}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <p>
                      You don't have an account !
                      <Link
                        href="/register"
                        style={{ color: "Orange", textDecoration: "none" }}
                        onMouseOver={(e) => (e.target.style.color = "Black")}
                        onMouseOut={(e) => (e.target.style.color = "Orange")}
                      >
                        Sign up
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
              {/* {showPopup && (
            <Loginpopupalert 
            message={successMessage || errorMessage} 
            type={successMessage ? 'success' : 'error'} 
            onClose={handleClosePopup}
          />
          )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
