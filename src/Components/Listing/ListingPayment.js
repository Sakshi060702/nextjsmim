'use client';
import React, { useEffect, useState } from "react";
// import "../../Pages/Services/Webdevelopment/Website/Services.css";

// Function to fetch specialisations
const fetchPayment = async (companyID) => {
  try {
    const response = await fetch(
      "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetPaymentDetails",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyID }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

function Listingpayment({ companyID }) {
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    const getPayment = async () => {
      const data = await fetchPayment(companyID);
      if (data) {
        const filteredSpecialisations = Object.keys(data).filter(
          (key) => data[key] === true
        );
        setPayment(filteredSpecialisations);
      }
    };

    getPayment();
  }, []);

  return (
    <div className="listing-specialisat box_detail_cus">
      <h6>Payment</h6>
      <ul className="listing-specialisat-list listingspecialisation">
        {payment.map((item, index) => (
          <li key={index}>
            {/* <i className="icon-check-1"></i>{" "} */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{height:'23px',marginRight:'7px'}}>
              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"  style={{fill:'orange'}}/>
            </svg>
            {item.replace(/([A-Z])/g, " $1").trim()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listingpayment;
