"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
// import '../../Styles/Frontend/css/RegistrationMV.css';
// import '../../Styles/Frontend/css/RegistrationMV.css'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  //   const token = useSelector((state) => state.auth.token);
  const [isSociallinkOpen, setIsSociallinkOpen] = useState(false);
  const [socialLink, setSocialLink] = useState({
    facebook: "",
    instagram: "",
    whatsapp: "",
    linkedin: "",
    twitter: "",
    youtube: "",
  });

  //   const navigate = useNavigate();

  // Fetch social links
  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/PortalSetting/GetPortalSetting"
        );
        const data = await response.json();
        const portallink = data.portalSettings[0];
        setSocialLink({
          facebook: portallink.facebook,
          instagram: portallink.instagram,
          whatsapp: portallink.whatsapp,
          linkedin: portallink.linkedin,
          twitter: portallink.twitter,
          youtube: portallink.youtube,
        });
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };
    fetchSocialLinks();
  }, []);

  //   const handleButtonClick = (path) => {
  //     if (token) {
  //     //   navigate(path);
  //     } else {
  //     //   navigate(`/signup2/in-${localStorage.getItem("cityname")}`);
  //     }
  //   };

  return (
    <>
      <footer
        className="shadow footer-link-sticky"
        style={{ position: "relative" }}
      >
        <div className="container footerspace" style={{ width: "90%" }}>
          <div className="d-flex justify-content-between flex-wrap footertabs">
            <div>
              <div
                className="d-flex flex-column"
                style={{ cursor: "pointer", padding: "0" }}
              ></div>
            </div>

            <div>
              <div
                className="d-flex flex-column FootHome"
                style={{ cursor: "pointer", padding: "0" }}
              >
                <Link
                  href="#"
                  style={{ color: "white", paddingBottom: "17px" }}
                >
                  Home
                </Link>
              </div>
            </div>
            <div
              style={{ borderLeft: "2px solid white", height: "20px" }}
            ></div>

            <div>
              <div
                className="d-flex flex-column"
                style={{ cursor: "pointer", padding: "0" }}
              >
                <Link
                  href="#"
                  style={{ color: "white", paddingBottom: "17px" }}
                >
                  About Us
                </Link>
              </div>
            </div>
            <div
              style={{ borderLeft: "2px solid white", height: "20px" }}
            ></div>

            <div>
              <div
                className="d-flex flex-column"
                style={{ cursor: "pointer", padding: "0" }}
              >
                <Link
                  href="#"
                  style={{ color: "white", paddingBottom: "17px" }}
                >
                  Contact
                </Link>
              </div>
            </div>

            <div
              style={{ borderLeft: "2px solid white", height: "20px" }}
            ></div>
            <div>
              <div
                className="d-flex flex-column terms"
                style={{ cursor: "pointer" }}
              >
                <Link
                  href="href"
                  style={{ color: "white", paddingBottom: "17px" }}
                >
                  Privacy
                </Link>
              </div>
            </div>

            <div
              className="privacyline"
              style={{ borderLeft: "2px solid white", height: "20px" }}
            ></div>

            <div>
              <div
                className="d-flex flex-column"
                style={{ cursor: "pointer", padding: "0" }}
              >
                <Link
                  href="href"
                  style={{ color: "white", paddingBottom: "17px" }}
                >
                  Terms and conditions
                </Link>
              </div>
            </div>
            <div
              style={{ borderLeft: "2px solid white", height: "20px" }}
            ></div>

            <div style={{ marginLeft: "-47px" }}>
              <div className="follow_us Footsociallinkm">
                <ul className="FootSocialLinkIcon">
                  <li>
                    <Link
                      href={socialLink.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="icon_phone"
                        style={{ color: "white", height: "19px" }}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={socialLink.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="icon_phone"
                        style={{ color: "white", height: "19px" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={socialLink.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        className="icon_phone"
                        style={{ color: "white", height: "19px" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={socialLink.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="icon_phone"
                        style={{ color: "white", height: "19px" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={socialLink.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="icon_phone"
                        style={{ color: "white", height: "19px" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={socialLink.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faYoutube}
                        className="icon_phone"
                        style={{ color: "white", height: "19px" }}
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* companyname for mobile */}
            <div className="FootLinkMobile">
              <div
                className="d-flex flex-column plink"
                style={{ cursor: "pointer", padding: "0", marginLeft: "69px" }}
              >
                <Link
                  target="_blank"
                  href="https://myinteriormart.com/"
                  style={{ color: "white", paddingBottom: "17px" }}
                >
                  {" "}
                  © my Interior Mart Team
                </Link>
              </div>
            </div>

            <div></div>
            <div></div>

            {/* <div className="follow_us">
              <ul className="FootSocialLinkIcon">
                {Object.entries(socialLink).map(([key, value]) => (
                  <li key={key}>
                    <a href={value} target="_blank" rel="noopener noreferrer">
                      <i className={`ti-${key}`}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
          <hr style={{ margin: 0 }} />
          <div className="row">
            <div className="col-lg-4 col-12 block-center-footer sociallink Footsociallinkd Footlinkdekstop">
              <div className="follow_us">
                <div>
                  <div
                    className="d-flex flex-column plink"
                    style={{
                      cursor: "pointer",
                      padding: "0",
                      paddingLeft: "135px",
                    }}
                  >
                    <Link
                      target="_blank"
                      href="https://myinteriormart.com/"
                      style={{ color: "white", paddingBottom: "17px" }}
                    >
                      © my Interior Mart Team
                    </Link>
                  </div>
                </div>

                <ul>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="to-top "
            onClick={scrollToTop}
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                backgroundColor: "orange",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faArrowUp}
                className="icon_phone"
                style={{ color: "white", height: "19px" }}
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
