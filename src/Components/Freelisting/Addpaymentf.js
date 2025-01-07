'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import withAuthh from "@/app/Hoc/withAuth";
import Popupalert from "./Popupalert";
import useAuthCheck from "@/app/Hooks/useAuthCheck";
import Paymentpopup from "./Paymentpopup";

import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/dropdown.css";
import "../../Styles/Frontend/css/Businesslisting.css";
import "../../Styles/Frontend/css/Popupnotification.css";


function Addpaymentf() {
  const [payment, setPayment] = useState({
    selectAll: false,
    cash: false,
    cheque: false,
    rtgsNeft: false,
    debitCard: false,
    creditCard: false,
    netBanking: false,
  });

 const router=useRouter();
  const token = useSelector((state) => state.auth.token);

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentPopupMessage, setPaymentPopupMessage] = useState("");
  const isAuthenticated=useAuthCheck();

  useEffect(() => {
    const fetchPaymentmode = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/BinddetailsListing/GetPaymentmodeDetailslisting",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPayment((prevState) => ({
          ...prevState,
          ...data,
        }));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if(isAuthenticated){
      fetchPaymentmode();
    }
  
  }, [token]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPayment((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const handleSelectAll = () => {
    const allSelected = !payment.selectAll;
    const updatedPayment = Object.fromEntries(
      Object.keys(payment).map((key) => [key, allSelected])
    );
    setPayment(updatedPayment);
  };

  const checkStatusNavigate = async () => {
    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/ManageListingFromStatus/GetManageListingFromStatus",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 1) {
        // navigate("/Uploadimage");
        setSuccessMessage("Your Listing Updated Successfully.");
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          // navigate("/Uploadimage");
        }, 2000);
      } else {
        setPaymentPopupMessage(
          "Your Listing Created Successfully."
        );
        setShowPaymentPopup(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async () => {


    const isAnyCheckboxSelected = Object.keys(payment).some(
      (key) => payment[key] === true
    );
  
    if (!isAnyCheckboxSelected) {
      setErrorMessage("Please select at least one payment mode.");
      setSuccessMessage(""); // Clear any existing success message
      setShowPopup(true);
      return; // Prevent form submission
    }

    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/PaymentMode/CreatePaymentMode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payment),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);
      // console.log("Payment token", token);

      checkStatusNavigate();

      // setSuccessMessage("Payment Details Saved Successfully");
      // setErrorMessage("");
      // setShowPopup(true);

      // setTimeout(() => {
      //   setShowPopup(false);
      //   checkStatusNavigate();
      // }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        "Failed to save Payment details. Please try again later."
      );
      setSuccessMessage(""); // Clear any existing success message
      setShowPopup(true);
      // Handle error (e.g., show an error message)
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
      <div>
        <div>
          <div>
            <div>
              <h4>Add Payment Mode</h4>
              <p className="add-lidting-title-from">
                Add Listing / Add Payment Mode
              </p>
              <div className="row">
                <div className="col-md-12 add_bottom_15">
                  <button
                    className="btn btn-primary"
                    style={{ backgroundColor: "#fb830d" }}
                    onClick={handleSelectAll}
                  >
                    Select All
                  </button>
                </div>
              </div>
              <div className="row">
                {Object.keys(payment)
                  .filter(
                    (key) =>
                      ![
                        "selectAll",
                        "listingID",
                        "ownerGuid",
                        "ipAddress",
                        "payTM",
                        "phonePay",
                        "paypal",
                      ].includes(key)
                  )
                  .map((key, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="clearfix add_bottom_15">
                        <div className="checkboxes float-left">
                          <label className="container_check">
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                            <input
                              type="checkbox"
                              id={key}
                              name={key}
                              checked={payment[key]}
                              onChange={handleCheckboxChange}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                <div
                  className="text-left col-12 mt-3"
                  style={{ display: "flex" }}
                >
                  <button
                    type="submit"
                    className="btn_1 freelistingpagebtn"
                   
                    onClick={handleSubmit}
                  >
                    Save & Continue
                  </button>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                      paddingTop: "10px",
                    }}
                  >
                    <Link href="/addworkinghours">
                      <img src='/img/Backarrow.png' style={{ height: "30px" }} />
                    </Link>
                    {/* <Link to="/Uploadimage">
                      <img src={nextarrowimg} style={{ height: "30px" }} />
                    </Link> */}
                  </div>
                </div>

                {showPopup && (
                  <Popupalert
                    message={successMessage || errorMessage}
                    type={successMessage ? "success" : "error"}
                    onClose={handleClosePopup}
                  />
                )}

{showPaymentPopup && (
            <Paymentpopup
              isOpen={showPaymentPopup}
              onClose={() => setShowPaymentPopup(false)}
              message={paymentPopupMessage}
            />
          )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addpaymentf;
