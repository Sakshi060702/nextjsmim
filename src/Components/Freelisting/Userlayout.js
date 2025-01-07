'use client';
import React from 'react';
import { Dropdown } from "react-bootstrap";
import Link from 'next/link';


import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/dropdown.css";

function Userlayout({ children }) {
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
              <Link href="/Flayout/selectcategory">Select Category</Link>
              <Link href="/addcompany">
                {" "}
                <img
                  src='/img/business-listing.jpeg'
                  alt="Business Listing"
                  style={{ height: "45px" }}
                />{" "}
                Business Listing
              </Link>
              
            </div>
          </div>
          <div className="col-lg-3 mb-5 selectoption" id="mob_view">
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-warning"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                Select Options
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: "93%" }}>
                <Dropdown.Item as={Link} href="/selectcategory">
                  Select Category
                </Dropdown.Item>
                <Dropdown.Item as={Link} href="/addcompany">
                  <img
                    src='/img/business-listing.jpeg'
                    alt="Business Listing"
                    style={{ height: "45px" }}
                  />
                  Business Listing
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-lg-9 px_remove" id="create_listing" style={{paddingBottom:'13px'}}>
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

export default Userlayout;