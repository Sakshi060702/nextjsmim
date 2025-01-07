"use client";

import React, { useEffect, useState, useRef } from "react";
// import { useRouter } from "next/router";
import Link from "next/link";
import { Carousel } from "react-bootstrap";
// import CryptoJS from "crypto-js";

import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/Service.css";
import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/reset.css";
import "../../Styles/Frontend/css/Cate.css";


// const encryptionKey = "myinterriorMart@SECRETKEY";

// const encrypt = (text) => {
//   return CryptoJS.AES.encrypt(JSON.stringify(text), encryptionKey).toString();
// };

// const decrypt = (ciphertext) => {
//   const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
//   return bytes.toString(CryptoJS.enc.Utf8);
// };

const Dealer = () => {
    const [catDealer, setcatDealer] = useState([]);
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const [dealerBanners, setdealerBanners] = useState([]);
  const [isActive, setIsActive] = useState(false);
  //   const router = useRouter();
  const categoryRefs = useRef({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/Category/GetCategories"
      );
      const data = await response.json();
      setcatDealer(data.dealers);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  

  const displayedCategories = catDealer.slice(16, 33);
  const initialCategories = catDealer.slice(0, 16);

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
    setIsActive((prev) => !prev);
  };


  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const response = await fetch(
          `https://apidev.myinteriormart.com/api/Banners/GetFilteredBanners`
        );
        const data = await response.json();
        setdealerBanners(data.galleryBannerImages.dealerBanners);
      } catch (error) {
        console.error("Error fetching banner images", error);
      }
    };
    fetchBannerImages();
  }, []);

  const handleCategoryClick = (categoryId, category) => {
    console.log("categoryname", category.name);
    // const dynamicUrl = `/Contractor/${category.name
    //   .replace(/\s+/g, "-")
    //   .toLowerCase()}/in-${localStorage.getItem("cityname")}?fircatEncyt=${encodeURIComponent(
    //   encrypt(parseInt(category.secondCategoryID))
    // )}`;

    // Navigate to the constructed URL
    router.push(dynamicUrl);
  };

  return (
    <>
       <div className="category-featured">
        <div className="show-brand">
          <div className="row">
            <div className="col-lg-2 col-md-12 category-list">
              <div className="navbar-brand">
                <button
                  className={`btn btn-link navbar-brand-btn ${isActive ? 'button-active' : ''}`}
                  type="button"
                  onClick={toggleMobileMenu}
                >
                  DEALERS
                </button>
              </div>

              <div
                className={`mim-HomeSideMenu ${
                  isMobileMenuVisible ? "mobile-visible" : ""
                }`}
              >
                <ul>
                  {displayedCategories.map((cat) => {
                    const icon = `/FileManager/CategoryIcons/Second/${cat.imageURL}.png`;

                    return (
                      <li className="mim-box-list" key={cat.secondCategoryID}  ref={(el) => (categoryRefs.current[cat.secondCategoryID] = el)}>
                        <Link
                           href={{
                            pathname: `/Dealer/${encodeURIComponent(
                              cat.name.replace(/ /g, '-')
                            )}`,
                            query: { id: cat.secondCategoryID },
                          }}

                          onClick={() => handleCategoryClick(cat.secondCategoryID)}
                          
                        >
                          <img
                            src={icon}
                            alt={cat.searchKeywordName}
                            className="img-fluid"
                          />
                          {cat.name}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="mim-box-list">More &gt;&gt;</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-10 col-md-12 brand-category-list" id="testingBannerFor_scroll">
              <div className="mim-Box">
                <div className="row no-gutters">
                  <div className="col-md-4 mim-Box-img">
                    <div className="carasoualVerticalHeight"> 
                    <Carousel
                      interval={8000}
                      autoPlay={true}
                      fade
                      animationEffect="Fade"
                      pause={false}
                      controls={false}
                    >
                      {dealerBanners.length > 0 ? (
                        dealerBanners.map((banner) => (
                          <Carousel.Item key={banner.id}>
                            <a href={banner.bannerLink} target="_blank" rel="noopener noreferrer">
                            <img
                              className="d-block w-100 bannerimg"
                              src={`https://admin.myinteriormart.com${banner.imagePath}`}
                              alt={`Banner ${banner.location}`}
                              style={{
                                width: "100%",
                                maxWidth: "1200px",
                                maxWidth: "1200px",
                              }}
                            />
                            </a>
                          </Carousel.Item>
                        ))
                      ) : (
                        <p>Loading...</p>
                      )}
                    </Carousel>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="tab-content checkout" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="cutomize"
                        role="tabpanel"
                        aria-labelledby="cutomize"
                      >
                        <div className="row no-gutters">
                          {initialCategories.map((cat) => {
                            const icon = `/FileManager/CategoryIcons/Second/${cat.imageURL}.png`;
                            return (
                              <div
                                className="col-md-3 col-sm-3 col-3 mim-Box-item servicecategorybox"
                                
                                key={cat.secondCategoryID} ref={(el) => (categoryRefs.current[cat.secondCategoryID] = el)}
                              >
                                <Link
                                   href={{
                                    pathname: `/Dealer/${encodeURIComponent(
                                      cat.name.replace(/ /g, '-')
                                    )}`,
                                    query: { id: cat.secondCategoryID },
                                  }}
                                  onClick={() => handleCategoryClick(cat.secondCategoryID)}
                                  title={cat.searchKeywordName}
                                >
                                  <img
                                    src={icon}
                                    alt={cat.searchKeywordName}
                                    className="img-fluid"
                                  />
                                  <p>{cat.name}</p>
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="monopoly"
                        role="tabpanel"
                        aria-labelledby="monopoly"
                      >
                        dasd1a231d31sad
                      </div>
                      <div
                        className="tab-pane fade"
                        id="latest"
                        role="tabpanel"
                        aria-labelledby="latest"
                      >
                        dasd1a231d31sad
                      </div>
                      <div
                        className="tab-pane fade"
                        id="running"
                        role="tabpanel"
                        aria-labelledby="running"
                      >
                        dasd1a231d31sad
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dealer;
