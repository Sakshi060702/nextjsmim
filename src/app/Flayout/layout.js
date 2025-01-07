// /app/Flayout/layout.js
import React from 'react';
import Link from 'next/link';
import { ReactNode } from 'react';
import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/dropdown.css";

export default function Flayout({ children }) {
  return (
    <main>
      <div className="container margin_60_35">
        <div className="row">
          {/* Left Sidebar */}
          <div className="col-lg-3" id="desktop_view">
            <div
              className="nav profile-side-menu flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <Link href="/Flayout/selectcategory">Select Category</Link>
              <Link href="/Flayout/addcompany">
                <img
                  src='/img/business-listing.jpeg'
                  alt="Business Listing"
                  style={{ height: "45px" }}
                />{" "}
                Business Listing
              </Link>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="col-lg-9 px_remove" id="create_listing" style={{ paddingBottom: '13px' }}>
            <div
              className="tab-content profile-sidebar-content"
              id="v-pills-tabContent"
            >
              {children} {/* This is where the selected page will render */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
