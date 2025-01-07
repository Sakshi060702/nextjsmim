'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
function Dashboard() {

  const token = useSelector((state) => state.auth.token);

  const [counts, setCounts] = useState({
    bookmarksCount: 0,
    likesCount: 0,
    reviewsCount: 0,
    subscribersCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://apidev.myinteriormart.com/api/ListingActivityDashboard/GetListingActivityDashboardCounts", {
          method: "GET", // Specify the GET method
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in the headers
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
          <h5>Dashboard</h5>
          <div className="row">
            <div className="col-md-4 col-6 mb-3">
              <Link href='/AllBookmark'>
                <div className="add_listing_card d-flex align-items-center justify-content-start">
                  <div className="add_listing_card_title">Bookmarks</div>
                  <div className="this_count">{counts.bookmarksCount}</div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6 mb-3">
              <Link href='/AllLike'>
                <div className="add_listing_card d-flex align-items-center justify-content-start">
                  <div className="add_listing_card_title">Likes</div>
                  <div className="this_count">{counts.likesCount}</div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6 mb-3">
              <Link href='/AllReviews'>
                <div className="add_listing_card d-flex align-items-center justify-content-start">
                  <div className="add_listing_card_title">Reviews</div>
                  <div className="this_count">{counts.reviewsCount}</div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6 mb-3">
              <Link href='/AllSubscribe'>
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
export default Dashboard;

