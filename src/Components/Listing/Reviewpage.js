"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { validationReviewlength } from "../Validation";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { NavLink ,Link,useNavigate} from "react-router-dom";
import Popup from "./Popup";

import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/Lisiting.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/Lisiting.css";

function Reviewpage({ listingID }) {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [reviewCount, setReviewCount] = useState([]);

  const [userReviewCount, setUserReviewCount] = useState(0);
  const [userRatinvAverage, setUserRatingAverage] = useState(0);

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentReply, setCurrentReply] = useState("");
  const [currentRatingId, setCurrentRatingId] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [error, setError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [reviewVisible, setReviewVisible] = useState(2);

  //   const navigate=useNavigate();

  const router = useRouter();

  const showMoreReviews = () => {
    setReviewVisible((prevVisible) => prevVisible + 2);
  };
  // useEffect(() => {
  //   fetchListingDetails();
  // }, [listingID]);

  // const fetchListingDetails = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://apidev.myinteriormart.com/api/BindAllReviews/UserReviews`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',

  //         },
  //         body: JSON.stringify({
  //           companyID: listingID.companyID
  //         })
  //       }
  //     );
  //     const data = await response.json();
  //     console.log("API Data:", data);

  //     if (data.length > 0) {
  //       setCompanyDetails({ listingID, ratingCount: data.length }); // Set ratingCount
  //       setReviews(data);
  //     } else {
  //       setCompanyDetails({ listingID, ratingCount: 0 }); // Set ratingCount to 0 if no reviews
  //       console.error(`No reviews found for company with listingID ${listingID}.`);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const fetchRatingCount = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/BindAllReviews/UserReviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyID: listingID.companyID,
          }),
        }
      );
      const data = await response.json();
      console.log("ratingcount", data);
      setUserReviewCount(data.reviewCount);
      setUserRatingAverage(data.averageRating);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchRatingCount();
  }, [listingID]);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError(""); // Clear previous errors
    const reviewError = validationReviewlength(reviewText); // Validate review
    if (reviewError) {
      setError({ comment: reviewError }); // Set error if validation fails
      return; // Stop further execution
    }

    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Ratings/CreateOrUpdateRating`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ratings: rating,
            comment: reviewText,
            companyID: listingID.companyID,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Re-fetch the listing details to get the updated reviews
        await fetchReviews();
        setIsReviewFormOpen(false);
        setReviewCount(data.reviewCount);
        setRating(0);
        setReviewText("");
      } else {
        console.error("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleEditClick = (ratingId, reply) => {
    if (currentRatingId === ratingId) {
      console.log("ratingid", ratingId);
      console.log("currentid", currentRatingId);

      setIsEditMode(false);
      setCurrentRatingId(null);
      setCurrentReply("");
    } else {
      // Otherwise, open the form for the clicked review
      console.log("rating", ratingId);
      console.log("reply", reply);
      setCurrentRatingId(ratingId);
      setCurrentReply(reply);
      setIsEditMode(true);
    }
  };

  const handleReplyChange = (event) => {
    setCurrentReply(event.target.value);
  };

  // const handleReplySubmit = async (event) => {
  //   event.preventDefault();

  //   const currentReview = reviews.find(review => review.ratingId === currentRatingId);

  //   const replyId = currentReview && currentReview.ratingReply ? currentReview.ratingReply.id : 0;
  //   // Submit the edited reply to the API
  //   const response = await fetch(
  //     "https://apidev.myinteriormart.com/api/BindAllReviews/UserReviews",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",

  //       },
  //       body: JSON.stringify({
  //         operation: "UpdateReviewReply",
  //         ratingReply: {
  //           id: replyId,
  //           ratingId: currentRatingId,
  //           reply: currentReply,
  //           companyID: listingID.companyID
  //         },
  //       }),
  //     }
  //   );

  //   if (response.ok) {
  //     // Update the reviews state with the new reply
  //     setReviews((prevReviews) =>
  //       prevReviews.map((review) =>
  //         review.ratingId === currentRatingId
  //           ? {
  //               ...review,
  //               ratingReply: { ...review.ratingReply, reply: currentReply },
  //             }
  //           : review
  //       )
  //     );
  //     console.log(currentRatingId);
  //     console.log(currentReply);

  //     setIsEditMode(true);
  //     setCurrentRatingId(null);
  //     setCurrentReply("");
  //   } else {
  //     console.error("Failed to update reply");
  //   }
  // };

  const fetchReviews = async () => {
    const response = await fetch(
      "https://apidev.myinteriormart.com/api/BindAllReviews/GetUserAllReviews",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation: "GetReviews",
          ratingReply: { reply: "" },
          companyID: listingID.companyID,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("reply", data);
      console.log(data);
      setReviews(data);
    } else {
      console.error("Failed to fetch reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [listingID]);

  //   const handleReviewClick = () => {
  //     const cityName = localStorage.getItem('cityname');
  //     navigate(`/AllReviews/in-${cityName}`);
  //     console.log("Hello");
  // };

  const handleWriteClick = () => {
    if (token) {
      setIsReviewFormOpen(!isReviewFormOpen);
    } else {
      setIsPopupOpen(true);
    }
  };

  return (
    <>
      <div className="company-listing-tab ">
        <div className="step">
          <div className="tab-content checkout">
            <div
              className="tab-pane fade show active"
              id="reviews"
              role="tabpanel"
              aria-labelledby="reviews"
            >
              <div className="review-form mb-3">
                <div className="">
                  <div className="Count_review writereview">
                    <div className="review-form mb-3">
                      <div className="d-flex justify-content-center align-items-center ">
                        <div className="Count_review">
                          {/* {companyDetails && (
                            <span>
                              {companyDetails.ratingCount} Reviews, 100% genuine ratings from My Interior Mart users
                            </span>
                          )} */}
                          <div>
                            <span
                              className="writereviewFont userRatingAverage"
                              style={{ paddingRight: "5px" }}
                            >
                              {userRatinvAverage}.0
                            </span>
                            <span>
                              {Array(5)
                                .fill()
                                .map((_, i) => (
                                  <i
                                    key={i}
                                    className="icon_star rstar"
                                    style={{
                                      color:
                                        i < userRatinvAverage
                                          ? "orange"
                                          : "gray",

                                      paddingRight: "4px",
                                    }}
                                  ></i>
                                ))}
                            </span>

                            <span className="writereviewFont userRatingAverage">
                              {userReviewCount} Ratings
                            </span>
                          </div>
                        </div>
                        <span className="desk_mrg">
                          <a
                            className="btn btn-link writereviewFont"
                            onClick={handleWriteClick}
                            aria-expanded={isReviewFormOpen ? "true" : "false"}
                            aria-controls="WriteReview"
                            style={{ color: "orange" }}
                          >
                            <i className="icon-pencil"></i> Write Review
                          </a>
                        </span>
                      </div>
                    </div>

                    {isReviewFormOpen && (
                      <div className="write-review-form">
                        <h6 className="reviewheading">Leave a Review</h6>
                        <form onSubmit={handleSubmit}>
                          <div className="form-group col-md-6 reviewstar">
                            <div className="stars">
                              {Array(5)
                                .fill()
                                .map((_, i) => (
                                  <i
                                    key={i}
                                    className={`icon_star ${
                                      i < rating ? "active" : ""
                                    }`}
                                    style={{
                                      color: i < rating ? "orange" : "gray",
                                      fontSize: "16px",
                                      marginRight: "5px",
                                    }}
                                    onClick={() => handleRatingChange(i + 1)}
                                  ></i>
                                ))}
                            </div>
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="review_text">Your Review</label>
                            <textarea
                              name="review_text"
                              id="review_text"
                              className="form-control"
                              value={reviewText}
                              onChange={handleReviewTextChange}
                            ></textarea>
                            {error.comment && (
                              <div
                                className="text-danger"
                                style={{ fontSize: "15px" }}
                              >
                                {error.comment}
                              </div>
                            )}
                          </div>
                          <div className="form-group col-md-12">
                            <input
                              type="submit"
                              value="Submit"
                              className="btn_1"
                              id="submit-review"
                            />
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="col-md-12 col-lg-12 review-user">
                    <div className="row">
                      <div className="col-lg-12 reviewpage">
                        <hr />
                        <div
                          className="row"
                          style={{
                            fontSize: "16px",
                            maxHeight: "300px",
                            overflowY: "auto",
                          }}
                        >
                          {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                              <div key={index} className="col-lg-12 mb-3 ">
                                <div className="review-box userreviewbox">
                                  <div className="d-flex">
                                    <div className="col-lg-2 col-3 text-center">
                                      <div className="review_img_sec">
                                        <img
                                          src={`https://apidev.myinteriormart.com${review.userImage}`}
                                          alt={review.userName}
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "30px",
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      className="col-lg-10 col-9 pl-lg-0 "
                                      style={{ paddingRight: "0px" }}
                                    >
                                      <span>
                                        <b>
                                          {review.gender} {review.userName}
                                        </b>
                                      </span>
                                      <div
                                        className="cat-star"
                                        style={{ marginBottom: "9px" }}
                                      >
                                        {Array(review.ratings)
                                          .fill()
                                          .map((_, i) => (
                                            <i
                                              key={i}
                                              className="icon_star active writereviewFont replystarfont"
                                              style={{
                                                color: "orange",
                                                paddingRight: "4px",
                                              }}
                                            />
                                          ))}
                                        <span>
                                          {/* <b>{review.userName}</b>&nbsp;-&nbsp;&nbsp; */}
                                          <b
                                            className="reviewrating"
                                            style={{ fontSize: "13px" }}
                                          >
                                            {review.timeAgo}
                                          </b>
                                        </span>
                                      </div>
                                      <p className="reviewdescrp">
                                        {review.comment}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="owner_reply">
                                    <div>
                                      <span>
                                        <strong>
                                          {" "}
                                          <Link
                                          href='#'
                                            // to={`/AllReviews/in-${localStorage.getItem(
                                            //   "cityname"
                                            // )}`}
                                            style={{
                                              textDecoration: "none",
                                              color: "gray",
                                            }}
                                          >
                                            Reply From Owner
                                          </Link>
                                        </strong>{" "}
                                      </span>
                                      {review.ratingReply && (
                                        <p className="m-0">
                                          {review.ratingReply.reply}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {/* code for reply rating */}
                                  {/* <div className="owner_reply">
                          {review.ratingReply && (
                            <div>
                              <span>
                                <strong>Reply</strong>{" "}
                              </span>
                              <p className="m-0">{review.ratingReply.reply}</p>
                            </div>
                          )}
                        </div>
                        <button
                        className="btn_1 gray mb-3 reply"
                        onClick={() =>
                          handleEditClick(
                            review.ratingId,
                            review.ratingReply ? review.ratingReply.reply : ""
                          )
                        }
                      >
                        Edit Reply
                      </button>
                      {isEditMode && currentRatingId === review.ratingId && (
                        <div className="edit-reply-form">
                          <form onSubmit={handleReplySubmit}>
                            <div className="form-group col-md-12">
                              <label htmlFor="reply_text">Edit Reply</label>
                              <textarea
                                name="reply_text"
                                id="reply_text"
                                className="form-control"
                                style={{ height: "130px" }}
                                value={currentReply}
                                onChange={handleReplyChange}
                              ></textarea>
                            </div>
                            <div className="form-group col-md-12">
                              <input
                                type="submit"
                                value="Submit"
                                className="btn_1"
                                id="submit-reply"
                                style={{backgroundColor:'orange'}}
                              />
                            </div>
                          </form>
                        </div>
                      )} */}
                                </div>
                                <hr />
                              </div>
                            ))
                          ) : (
                            <p>No reviews available.</p>
                          )}
                        </div>
                        {/* {reviewVisible<reviews.length && (
                           <button onClick={showMoreReviews} className="btn btn-primary mt-3">
                           Show More
                         </button>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}

export default Reviewpage;
