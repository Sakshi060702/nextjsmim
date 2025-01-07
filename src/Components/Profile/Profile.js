'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/Businesslisting.css";
import "../../Styles/Frontend/css/Register.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/dropdown.css";
import "../../Styles/Frontend/css/Businesslisting.css";

// import editprofile from "../../FrontEnd/img/icon/edit.png";
// import addressimg from "../../FrontEnd/img/icon/map.png";
// import enquiryimg from "../../FrontEnd/img/icon/enquiry.png";
// import bookmarkimg from "../../FrontEnd/img/icon/bookmark.png";
// import likeimg from "../../FrontEnd/img/icon/like.png";
// import subscribeimg from "../../FrontEnd/img/icon/subscribe.png";
// import reviewimg from "../../FrontEnd/img/icon/review.png";
// import chatimg from "../../FrontEnd/img/icon/chat.png";
// import suggestionimg from "../../FrontEnd/img/icon/suggestion.png";
// import complaintimg from "../../FrontEnd/img/icon/Complaint.png";
// import changepassimg from "../../FrontEnd/img/icon/password.png";
// import registerimg from "../../FrontEnd/img/icon/register.png";
// import dashbordimg from "../../FrontEnd/img/Dashboard.png";
// import managlistingimg from "../../FrontEnd/img/icon/manage.png";
// import myactivityimg from "../../FrontEnd/img/myActivity.png";
// import listingicon from "../../FrontEnd/img/business-listing.jpeg";
import { Dropdown } from "react-bootstrap";

function Profile({ children }) {
  const [status, setStatus] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.auth.userType);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/ManageListingFromStatus/GetManageListingFromStatus",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setStatus(data.status);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchData();
  }, [token]);
  return (
    <main>
      <div className="container margin_60_35">
        <div className="row">
          <div className="col-lg-3" id="desktop_view">
            <div
              className="nav profile-side-menu flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              
              
              {userType === "Consumer" && (
                <>
                  
                  <Link href='/portal/dashboard'>
                    {" "}
                    <img
                      src='/img/myActivity.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    My Activity
                  </Link>
                  <Link href='/editprofile'>
                    {" "}
                    <img
                      src='/img/icon/edit.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Edit Profile
                  </Link>

                  <Link href='/userpersonalinformation'>
                    {" "}
                    <img
                      src='/img/icon/map.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Personal Info
                  </Link>

                  <Link href='/complaint'>
                    {" "}
                    <img
                      src='/img/icon/password.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Complaint
                  </Link>
                  <Link href='/suggestion'>
                    {" "}
                    <img
                      src='/img/icon/suggestion.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Suggestion
                  </Link>
                  <Link href='/chat'>
                    {" "}
                    <img
                      src='/img/icon/chat.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Chat
                  </Link>
                  
                  <Link href='/changepassword'>
                    {" "}
                    <img
                      src='/img/icon/password.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Change Pin
                  </Link>
                </>
              )}

              {userType === "Business" && (
                <>
                  <Link href='/portal/dashboard'>
                    {" "}
                    <img
                      src='/img/Dashboard.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Dashboard
                  </Link>
                  <Link href='/portal/myactivity'>
                    {" "}
                    <img
                      src='/img/myActivity.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    My Activity
                  </Link>
                  {status=== 1 && (
                    <><Link href='/labournakapage'>
                    <img
                      src='/img/icon/manage.png'
                      alt="Manage Listing"
                      style={{ height: "60px" }}
                    />
                    Manage Listing
                  </Link>
                  <Link href='/enquiry'>
                    <img
                      src='/img/icon/enquiry.png'
                      alt="Enquiry"
                      style={{ height: "60px" }}
                    />
                    Enquiry
                  </Link>
                  <Link href='/Package'>
                    <img
                      src='/img/icon/enquiry.png'
                      alt="Enquiry"
                      style={{ height: "60px" }}
                    />
                    Upgrade Listing
                  </Link></>
                  
                  
                  )}
                  
                  <Link href='/complaint'>
                    {" "}
                    <img
                      src='/img/icon/password.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Complaint
                  </Link>
                  <Link href='/suggestion'>
                    {" "}
                    <img
                      src='/img/icon/suggestion.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Suggestion
                  </Link>
                  <Link href='/chat'>
                    {" "}
                    <img
                      src='/img/icon/chat.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Chat
                  </Link>
                  <Link href='/ProfileRegister'>
                    {" "}
                    <img
                      src='/img/icon/register.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Register
                  </Link>

                  <Link href='/changepassword'>
                    {" "}
                    <img
                      src='/img/icon/password.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Change Pin
                  </Link>
                  <Link href='/userdeleteaccount'>
                    {" "}
                    <img
                      src='/img/icon/password.png'
                      alt="Delete User Account"
                      style={{ height: "60px" }}
                    />
                    Delete User Account
                  </Link>
                </>
              )}

              {/* usertype none */}
              {userType === "" && (
                <>
                  <Link href='/dashboard'>
                    {" "}
                    <img
                      src='/img/Dashboard.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Dashboard
                  </Link>
                  <Link href='/Myactivity'>
                    {" "}
                    <img
                      src='/img/myActivity.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    My Activity
                  </Link>
                  {status=== 1 && (
                    <><Link href='/labournakapage'>
                    <img
                      src='/img/icon/manage.png'
                      alt="Manage Listing"
                      style={{ height: "60px" }}
                    />
                    Manage Listing
                  </Link>
                  <Link href='/enquiry'>
                    <img
                      src='/img/icon/enquiry.png'
                      alt="Enquiry"
                      style={{ height: "60px" }}
                    />
                    Enquiry
                  </Link>
                  <Link href='/Package'>
                    <img
                      src='/img/icon/enquiry.png'
                      alt="Enquiry"
                      style={{ height: "60px" }}
                    />
                    Upgrade Listing
                  </Link></>
                  
                  
                  )}
                  
                  <Link href='/complaint'>
                    {" "}
                    <img
                      src='/img/icon/password.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Complaint
                  </Link>
                  <Link href='/suggestion'>
                    {" "}
                    <img
                      src='/img/icon/suggestion.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Suggestion
                  </Link>
                  <Link href='/chat'>
                    {" "}
                    <img
                      src='/img/icon/chat.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Chat
                  </Link>
                  <Link href='/ProfileRegister'>
                    {" "}
                    <img
                      src='/img/icon/register.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Register
                  </Link>

                  <Link href='/changepassword'>
                    {" "}
                    <img
                      src='/img/icon/password.png'
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Change Pin
                  </Link>
                  <Link href='/userdeleteaccount'>
                    {" "}
                    <img
                      src='/img/icon/password.png'
                      alt="Delete User Account"
                      style={{ height: "60px" }}
                    />
                    Delete User Account
                  </Link>

                 
                </>
              )}
            </div>
          </div>

          <div className="col-lg-3 mb-5" id="mob_view">
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-warning"
                id="dropdown-basic"
                style={{ width: "96%" }}
              >
                Select Options
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: "93%",maxHeight:'350px',overflowY:'auto' }}>
                {userType === "Consumer" &&(
                  <>
                   <Dropdown.Item as={Link} href='/Myactivity'>
                  <img
                    src='/img/myActivity.png'
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                 My Activity
                </Dropdown.Item>
                   <Dropdown.Item as={Link} href='/editprofile'>
                  <img
                    src={editprofile}
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                  Edit Profile
                </Dropdown.Item>
                
                <Dropdown.Item as={Link} href='/userpersonalinformation'>
                  <img
                    src='/img/icon/map.png'
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                  Personal Info
                </Dropdown.Item>

                <Dropdown.Item as={Link} href='/complaint'>
                  <img
                    src='/img/icon/password.png'
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                  Complaint
                </Dropdown.Item>

                <Dropdown.Item as={Link} href='/suggestion'>
                  <img
                    src='/img/icon/suggestion.png'
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                  Suggestion
                </Dropdown.Item>

                <Dropdown.Item as={Link} href='/chat'>
                  <img
                    src='/img/icon/chat.png'
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                 Chat
                </Dropdown.Item>
                <Dropdown.Item as={Link} href='/changepassword'>
                  <img
                    src='/img/icon/password.png'
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                 Change Pin
                </Dropdown.Item>
                

                  </>
                )}
                {userType === "Business" &&(
                  <>
                  <Dropdown.Item as={Link} href='/dashboard'>
                  <img
                    src='/img/Dashboard.png'
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                 Dashboard
                </Dropdown.Item>
                <Dropdown.Item as={Link} href='/Myactivity'>
                  <img
                    src='/img/myActivity.png'
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                 My Activity
                </Dropdown.Item>
                {status === 1 && (
                  <>
                    <Dropdown.Item as={Link} href='/labournakapage'>
                      <img
                        src='img/business-listing.jpeg'
                        alt="Edit Profile"
                        style={{ height: "60px" }}
                      />
                      Manage Listing
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} href='/enquiry'>
                      <img
                        src='/img/icon/enquiry.png'
                        alt="Enquiry"
                        style={{ height: "60px" }}
                      />
                      Enquiry
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} href='/Package'>
                      <img
                        src='/img/icon/enquiry.png'
                        alt="Enquiry"
                        style={{ height: "60px" }}
                      />
                      Upgrade Package
                    </Dropdown.Item>
                  </>
                )}

                <Dropdown.Item as={Link} href='/complaint'>
                  <img
                    src='/img/icon/password.png'
                    alt="Address"
                    style={{ height: "60px" }}
                  />
                 Complaint
                </Dropdown.Item>

                <Dropdown.Item as={Link} href='/suggestion'>
                  <img
                    src='/img/icon/suggestion.png'
                    alt="Bookmark"
                    style={{ height: "60px" }}
                  />
                 Suggestion
                </Dropdown.Item>
                {/* <Dropdown.Item as={Link} to="/like">
                  <img src={likeimg} alt="Like" style={{ height: "60px" }} />
                  Like
                </Dropdown.Item> */}
                <Dropdown.Item as={Link} href='/chat'>
                  <img
                    src='/img/icon/chat.png'
                    alt="Subscribe"
                    style={{ height: "60px" }}
                  />
                 Chat
                </Dropdown.Item>
                <Dropdown.Item as={Link} href='/ProfileRegister'>
                  <img
                    src='/img/icon/register.png'
                    alt="Review"
                    style={{ height: "60px" }}
                  />
                  Register
                </Dropdown.Item>
               
               
                <Dropdown.Item as={Link} href='/changepassword'>
                  <img
                    src='/img/icon/password.png'
                    alt="Change Password"
                    style={{ height: "60px" }}
                  />
                  Change Pin
                </Dropdown.Item>

                <Dropdown.Item as={Link} href='/userdeleteaccount'>
                  <img
                    src='/img/icon/password.png'
                    alt="Change Password"
                    style={{ height: "60px" }}
                  />
                  Delete User Account
                </Dropdown.Item>
                  </>
                )}
                
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="col-lg-9 px_remove" id="create_listing">
            <div
              className="tab-content profile-sidebar-content"
              id="v-pills-tabContent"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
