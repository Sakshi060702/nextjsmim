'use client';
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAuthCheck from "@/app/Hooks/useAuthCheck";

import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/dropdown.css";
import "../../Styles/Frontend/css/Notification.css";



const Notificationpage = ({ setHasNotifications }) => {
  const token = useSelector((state) => state.auth.token);
  const [notification, setNotification] = useState([]);

  const isAuthenticated = useAuthCheck();

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/Notification/BailIconnotification",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              // Add any other headers you might need here
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setNotification(data.notification);

        setHasNotifications(data.notification.length > 0);
      } catch (error) {
        console.error("Error fetching Notification:", error);
      }
    };
    if (isAuthenticated) {
      fetchNotification();
    }
  }, [token, setHasNotifications]);

  return (
    <>
      <div
        className="notification1 notificationdekstoppage"
        style={{ marginTop: "16px" }}
      >
        <div>
          <div className="notificationheader">
            <h5>Notification</h5>
            {/* <a onClick={toggleNotificationMenu}>View All</a>  */}
          </div>
          <div className="notify_body">
            <div>
              <div className="list_general like-listing">
                <ul>
                  {notification.length === 0 ? (
                    <li>No notifications available</li>
                  ) : (
                    notification.map((notification, index) => (
                      <li key={index} className="notification-item">
                        <div
                          className="notification-list"
                          style={{ display: "flex" }}
                        >
                          <div className="notification-image">
                            <div>
                              {notification.profileImage ? (
                                <img
                                  src={`https://apidev.myinteriormart.com${notification.profileImage}`}
                                  alt={`${notification.companyName} profile`}
                                  style={{
                                    height: "34px",
                                    width: "34px",
                                    margin: "3px 0px 0px -19px",
                                    position: "absolute",
                                    borderRadius: "50%",
                                  }}
                                />
                              ) : (
                                <img
                                  alt="default"
                                  style={{
                                    height: "48px",
                                    width: "48px",
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          <div className="notification-content">
                            {/* <div className="notificationcontent">
                              <span
                                className="visit-date"
                                style={{
                                  textAlign: "right",
                                  margin: "2px 1px -4px 2px",
                                }}
                              >
                                {notification.visitDate}
                              </span>
                            </div> */}
                            <div
                              className="notification-content"
                              style={{ marginLeft: "40px" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  className="activity-text"
                                  style={{ paddingRight: "6px" }}
                                >
                                  {notification.gender}
                                </span>
                                <span
                                  className="activity-text"
                                  style={{ paddingLeft: "6px" }}
                                >
                                  {notification.userName}
                                </span>
                                <span
                                  
                                  style={{ paddingLeft: "6px",fontSize:'10px',color:'gray' }}
                                >
                                  {notification.timeAgo}
                                </span>
                              </div>

                              {/* Activity Details */}
                              {/* {["Bookmarked", "Liked", "Subscribed"].includes(notification.activityText) && (
                    <div style={{ marginTop: "4px" }}>
                      <span className="activity-text">{notification.activityText}</span>
                      <span className="activity-text"> Your Listing <p style={{float:"inline-start"}}>{notification.companyName}</p></span>
                    </div>
                  )} */}

                              {notification.activityText === "Bookmarked" && (
                                <div style={{ marginTop: "4px" }}>
                                  <span className="activity-text">
                                    Bookmarked
                                  </span>
                                  <span
                                    className="activity-text"
                                    style={{
                                      whiteSpace: "nowrap",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    Your Listing{" "}
                                    <span style={{ float: "inline-start" }}>
                                      {notification.companyName}
                                    </span>
                                  </span>
                                </div>
                              )}

                              {notification.activityText === "Liked" && (
                                <div style={{ marginTop: "4px" }}>
                                  <span
                                    className="activity-text"
                                    style={{ float: "inline-start" }}
                                  >
                                    Liked
                                  </span>
                                  <span
                                    className="activity-text"
                                    style={{
                                      // whiteSpace: "nowrap",
                                      marginLeft: "-23px",
                                    }}
                                  >
                                    Your Listing{" "}
                                    <span style={{ float: "inline-start" }}>
                                      {notification.companyName}
                                    </span>
                                  </span>
                                </div>
                              )}

                              {notification.activityText === "Subscribed" && (
                                <div style={{ marginTop: "4px" }}>
                                  <span className="activity-text">
                                    Subscribed
                                  </span>
                                  <span
                                    className="activity-text"
                                    style={{
                                      whiteSpace: "nowrap",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    Your Listing{" "}
                                    <span style={{ float: "inline-start" }}>
                                      {notification.companyName}
                                    </span>
                                  </span>
                                </div>
                              )}

                              {/* Review Comment */}

                              {notification.activityText === "Review" && (
                                <div style={{ marginTop: "4px" }}>
                                  <span className="activity-text" style={{marginLeft:'-31px'}}>
                                    Review
                                  </span>
                                  <span
                                    className="activity-text"
                                    style={{
                                      whiteSpace: "nowrap",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    Your Listing{" "}
                                    <span style={{ float: "inline-start" }}>
                                      {notification.companyName}
                                    </span>
                                  </span>
                                </div>
                              )}


                              {/* {notification.activityText === "Review" && (
                                <div
                                  style={{
                                    marginTop: "4px",
                                    textAlign: "start",
                                    width: "100%",
                                  }}
                                >
                                  <span
                                    className="activity-text"
                                    style={{
                                      display: "inline-block",
                                      marginLeft: "0px",
                                      wordWrap: "break-word", // Allows long words to wrap onto the next line
                                      overflow: "visible",
                                    }}
                                  >
                                    {notification.reviewComment}
                                  </span>
                                </div>
                              )} */}

                              {/* Enquiry Comment */}
                              {notification.activityText === "Enquiry" && (
                                <div
                                  style={{
                                    marginTop: "4px",
                                    float: "inline-start",
                                  }}
                                >
                                  <span
                                    className="activity-text"
                                    style={{ marginLeft: "5px" }}
                                  >
                                    {notification.enquiryComment}
                                  </span>
                                </div>
                              )}
                            </div>
                            {/* <div>
                              <div
                                style={{
                                  marginLeft: "-28px",
                                  marginTop: "16px",
                                }}
                              >
                                {["Bookmarked", "Liked", "Subscribed"].includes(
                                  notification.activityText
                                ) && (
                                  <>
                                    <span className="activity-text">
                                      {notification.activityText}
                                    </span>
                                    <span className="activity-text">
                                      {" "}
                                      Your Listing {notification.companyName}
                                    </span>
                                  </>
                                )}
                              </div>

                              <div
                                style={{
                                  marginLeft: "-55px",
                                  marginTop: "16px",
                                }}
                              >
                                {["Review", "Enquiry"].includes(
                                  notification.activityText
                                ) && (
                                  <span className="activity-text">
                                    {" "}
                                    {notification.activityText === "Review" &&
                                      notification.reviewComment}
                                    {notification.activityText === "Enquiry" &&
                                      notification.enquiryComment}
                                  </span>
                                )}
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* for mobile view  */}

      <div className="notification1 notificationmobilepage">
        <div>
          <div className="notificationheader">
            <h5>Notifications</h5>
            {/* <a onClick={toggleNotificationMenu}>View All</a>  */}
          </div>
          <div className="notify_body">
            <div>
              <div className="list_general like-listing">
              <ul>
                  {notification.length === 0 ? (
                    <li>No notifications available</li>
                  ) : (
                    notification.map((notification, index) => (
                      <li key={index} className="notification-item">
                        <div
                          className="notification-list"
                          style={{ display: "flex",backgroundColor:'#efefef' }}
                        >
                          <div className="notification-image">
                            <div>
                              {notification.profileImage ? (
                                <img
                                  src={`https://apidev.myinteriormart.com${notification.profileImage}`}
                                  alt={`${notification.companyName} profile`}
                                  style={{
                                    height: "34px",
                                    width: "34px",
                                    margin: "3px 0px 0px -19px",
                                    position: "absolute",
                                    borderRadius: "50%",
                                  }}
                                />
                              ) : (
                                <img
                                  alt="default"
                                  style={{
                                    height: "48px",
                                    width: "48px",
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          <div className="notification-content">
                            {/* <div className="notificationcontent">
                              <span
                                className="visit-date"
                                style={{
                                  textAlign: "right",
                                  margin: "2px 1px -4px 2px",
                                }}
                              >
                                {notification.visitDate}
                              </span>
                            </div> */}
                            <div
                              className="notification-content"
                              style={{ marginLeft: "40px" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  className="activity-text"
                                  style={{ paddingRight: "6px" }}
                                >
                                  {notification.gender}
                                </span>
                                <span
                                  className="activity-text"
                                  style={{ paddingLeft: "6px" }}
                                >
                                  {notification.userName}
                                </span>
                                <span
                                  
                                  style={{ paddingLeft: "6px",fontSize:'10px',color:'gray' }}
                                >
                                  {notification.timeAgo}
                                </span>
                              </div>

                              {/* Activity Details */}
                              {/* {["Bookmarked", "Liked", "Subscribed"].includes(notification.activityText) && (
                    <div style={{ marginTop: "4px" }}>
                      <span className="activity-text">{notification.activityText}</span>
                      <span className="activity-text"> Your Listing <p style={{float:"inline-start"}}>{notification.companyName}</p></span>
                    </div>
                  )} */}

                              {notification.activityText === "Bookmarked" && (
                                <div style={{ marginTop: "4px" }}>
                                  <span className="activity-text" style={{marginLeft:'-27px'}}>
                                    Bookmarked
                                  </span>
                                  <span
                                    className="activity-text"
                                    style={{
                                      whiteSpace: "nowrap",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    Your Listing{" "}
                                    <span style={{ float: "inline-start" }}>
                                      {notification.companyName}
                                    </span>
                                  </span>
                                </div>
                              )}

                              {notification.activityText === "Liked" && (
                                <div style={{ marginTop: "4px" }}>
                                  <span
                                    className="activity-text"
                                    style={{ float: "inline-start" }}
                                  >
                                    Liked 
                                  </span>
                                  <span
                                    className="activity-text"
                                    style={{
                                      // whiteSpace: "nowrap",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    Your Listing{" "}
                                    <span style={{ float: "inline-start" }}>
                                      {notification.companyName}
                                    </span>
                                  </span>
                                </div>
                              )}

                              {notification.activityText === "Subscribed" && (
                                <div style={{ marginTop: "4px" }}>
                                  <span className="activity-text" style={{marginLeft:'-33px'}}>
                                    Subscribed
                                  </span>
                                  <span
                                    className="activity-text"
                                    style={{
                                      whiteSpace: "nowrap",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    Your Listing{" "}
                                    <span style={{ float: "inline-start" }}>
                                      {notification.companyName}
                                    </span>
                                  </span>
                                </div>
                              )}

{notification.activityText === "Review" && (
                                <div style={{ marginTop: "4px" }}>
                                  <span className="activity-text" style={{marginLeft:'-13px'}}>
                                  Review
                                  </span>
                                  <span
                                    className="activity-text"
                                    style={{
                                      whiteSpace: "nowrap",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    Your Listing{" "}
                                    <span style={{ float: "inline-end" }}>
                                      {notification.companyName}
                                    </span>
                                  </span>
                                </div>
                              )}

                              {/* Review Comment */}
                              {/* {notification.activityText === "Review" && (
                                <div
                                  style={{
                                    marginTop: "4px",
                                    textAlign: "start",
                                    width: "100%",
                                  }}
                                >
                                  <span
                                    className="activity-text"
                                    style={{
                                      display: "inline-block",
                                      marginLeft: "0px",
                                      wordWrap: "break-word", // Allows long words to wrap onto the next line
                                      overflow: "visible",
                                    }}
                                  >
                                    {notification.reviewComment}
                                  </span>
                                </div>
                              )} */}

                              {/* Enquiry Comment */}
                              {notification.activityText === "Enquiry" && (
                                <div
                                  style={{
                                    marginTop: "4px",
                                    float: "inline-start",
                                  }}
                                >
                                  <span
                                    className="activity-text"
                                    style={{ marginLeft: "5px" }}
                                  >
                                    {notification.enquiryComment}
                                  </span>
                                </div>
                              )}
                            </div>
                            {/* <div>
                              <div
                                style={{
                                  marginLeft: "-28px",
                                  marginTop: "16px",
                                }}
                              >
                                {["Bookmarked", "Liked", "Subscribed"].includes(
                                  notification.activityText
                                ) && (
                                  <>
                                    <span className="activity-text">
                                      {notification.activityText}
                                    </span>
                                    <span className="activity-text">
                                      {" "}
                                      Your Listing {notification.companyName}
                                    </span>
                                  </>
                                )}
                              </div>

                              <div
                                style={{
                                  marginLeft: "-55px",
                                  marginTop: "16px",
                                }}
                              >
                                {["Review", "Enquiry"].includes(
                                  notification.activityText
                                ) && (
                                  <span className="activity-text">
                                    {" "}
                                    {notification.activityText === "Review" &&
                                      notification.reviewComment}
                                    {notification.activityText === "Enquiry" &&
                                      notification.enquiryComment}
                                  </span>
                                )}
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notificationpage;
