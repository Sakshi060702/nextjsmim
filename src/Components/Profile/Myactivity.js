'use client';
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import withAuthh from "../../Hoc/withAuthh";
import Link from "next/link";

import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/Businesslisting.css";
import "../../Styles/Frontend/css/Register.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/dropdown.css";
import "../../Styles/Frontend/css/Businesslisting.css";


function Myactivity() {

  const token = useSelector((state) => state.auth.token);

  const [counts, setCounts] = useState({
    bookmarksCount: 0,
    likesCount: 0,
    reviewsCount: 0,
    subscribersCount: 0,
  });

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const response = await fetch("https://apidev.myinteriormart.com/api/ListingActivityDashboard/GetListingMyActivityCounts", {
          method: "GET", // Specify the GET method
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}` , // Include the token in the headers
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCounts(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [token]);


  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        <div className="add-review">
          <h5>My Activity</h5>
          <div className="row">
            <div className="col-md-4 col-6 mb-3">
            <Link href='/MyBookmark'>
                <div className="add_listing_card d-flex align-items-center justify-content-start">
                  <div className="add_listing_card_title">Bookmarks</div>
                  <div className="this_count">{counts.bookmarksCount}</div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6 mb-3">
              <Link href='/MyLike'>
                <div className="add_listing_card d-flex align-items-center justify-content-start">
                  <div className="add_listing_card_title">Likes</div>
                  <div className="this_count">{counts.likesCount}</div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6 mb-3">
              <Link href='/MyReview'>
                <div className="add_listing_card d-flex align-items-center justify-content-start">
                  <div className="add_listing_card_title">Reviews</div>
                  <div className="this_count">{counts.reviewsCount}</div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6 mb-3">
              <Link href='/Mysubscribe'>
                <div className="add_listing_card d-flex align-items-center justify-content-start">
                  <div className="add_listing_card_title">Subscribe</div>
                  <div className="this_count">{counts.subscribersCount}</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Myactivity;
