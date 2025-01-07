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

const Contractor = () => {
  const [catContractor, setcatContractor] = useState([]);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [contractorBanners, setContractorBanners] = useState([]);
  const [homeMegaBannerImages, setHomeMegaBannerImage] = useState([]);
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
      setcatContractor(data.contractors);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const displayedCategories = catContractor.slice(16, 33);
  const initialCategories = catContractor.slice(0, 16);

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/Banners/GetFilteredBanners"
        );
        const data = await response.json();
        setContractorBanners(data.galleryBannerImages.contractorBanners);
        setHomeMegaBannerImage(data.homeMegaBannerImages);
      } catch (error) {
        console.error("Error fetching banner images:", error);
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
      <div className="category-featured" id="contractor-section">
        <div className="show-brand">
          <div className="row">
            <div className="col-lg-2 col-md-12 category-list">
              <div className="navbar-brand contractor">
                <button
                  className={`btn btn-link navbar-brand-btn ${
                    isActive ? "button-active" : ""
                  }`}
                  type="button"
                  onClick={toggleMobileMenu}
                >
                  CONTRACTOR
                </button>
              </div>

              <div
                className={`mim-HomeSideMenu ${
                  isMobileMenuVisible ? "mobile-visible" : ""
                }`}
              >
                <ul>
                  {displayedCategories.map((category) => {
                    const icon = `/FileManager/CategoryIcons/Second/${category.imageURL}.png`;

                    return (
                      <li
                        className="mim-box-list"
                        key={category.secondCategoryID}
                        ref={(el) =>
                          (categoryRefs.current[category.secondCategoryID] = el)
                        }
                      >
                        <Link
                          href={{
                            pathname: `/Contractor/${encodeURIComponent(
                              category.name.replace(/ /g, '-')
                            )}`,
                            query: { id: category.secondCategoryID },
                          }}
                          onClick={() =>
                            handleCategoryClick(
                              category.secondCategoryID,
                              category
                            )
                          }
                          title={category.searchKeywordName}
                          style={{ color: "black" }}
                        >
                          <img
                            src={icon}
                            alt={category.searchKeywordName}
                            className="img-fluid"
                          />
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="mim-box-list">More &gt;&gt;</li>
                </ul>
              </div>
            </div>

            <div
              className="col-lg-10 col-md-12 brand-category-list"
              style={{ paddingLeft: "2px" }}
            >
              <div className="mim-Box">
                <div className="row no-gutters">
                  <div
                    className="col-md-4 mim-Box-img"
                    style={{ paddingRight: "2px" }}
                  >
                    <div className="carasoualVerticalHeight">
                      <Carousel
                        interval={8000}
                        autoPlay={true}
                        fade
                        animationeffect="Fade"
                        pause={false}
                        controls={false}
                      >
                        {contractorBanners.length > 0 ? (
                          contractorBanners.map((banner) => (
                            <Carousel.Item key={banner.id}>
                              <a
                                href={banner.bannerLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  className="d-block w-100 bannerimg"
                                  src={`https://admin.myinteriormart.com${banner.imagePath}`}
                                  alt={`Banner ${banner.location}`}
                                  style={{
                                    width: "100%",
                                    maxWidth: "1200px",
                                  }}
                                />
                              </a>
                            </Carousel.Item>
                          ))
                        ) : (
                          <p>No banners available</p>
                        )}
                      </Carousel>
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="row no-gutters">
                      {initialCategories.map((category) => {
                        const icon = `/FileManager/CategoryIcons/Second/${category.imageURL}.png`;

                        return (
                          <div
                            className="col-md-3 col-sm-3 col-3 mim-Box-item servicecategorybox"
                            key={category.secondCategoryID}
                          >
                            <Link
                              href={{
                                pathname: `/Contractor/${encodeURIComponent(
                                  category.name.replace(/ /g, '-')
                                )}`,
                                query: { id: category.secondCategoryID },
                              }}
                              title={category.searchKeywordName}
                              style={{ color: "black" }}
                            >
                              <img
                                src={icon}
                                alt={category.searchKeywordName}
                                className="img-fluid bigimage"
                              />
                              <p>{category.name}</p>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row py-1">
        <div className="carouelheight " style={{ paddingRight: "2px" }}>
          <Carousel
            interval={8000}
            autoPlay={true}
            fade
            animationeffect="Fade"
            pause={false}
            controls={false}
          >
            {homeMegaBannerImages.length > 0 ? (
              homeMegaBannerImages.map((banner, index) => (
                <Carousel.Item key={banner.id}>
                  <div className="fade-image-container">
                    <a
                      href={banner.bannerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="d-block w-100 bannerimg fade-effect"
                        src={`https://admin.myinteriormart.com${banner.imagePath}`}
                        alt={`Banner ${banner.location}`}
                        style={{ width: "100%", maxWidth: "1200px" }}
                      />
                    </a>
                  </div>
                </Carousel.Item>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </Carousel>
        </div>

        <div
          className="carouelheight carouselshow"
          style={{ paddingLeft: "2px" }}
        >
          <Carousel
            interval={9000}
            autoPlay={true}
            fade
            animationeffect="Fade"
            pause={false}
            controls={false}
          >
            {homeMegaBannerImages.length > 0 ? (
              homeMegaBannerImages.map((banner, index) => (
                <Carousel.Item key={banner.id}>
                  <div className="fade-image-container">
                    <a
                      href={banner.bannerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="d-block w-100 bannerimg fade-effect"
                        src={`https://admin.myinteriormart.com${banner.imagePath}`}
                        alt={`Banner ${banner.location}`}
                        style={{ width: "100%", maxWidth: "1200px" }}
                      />
                    </a>
                  </div>
                </Carousel.Item>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Contractor;
