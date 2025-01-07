"use client";

import React, { useEffect, useState, useRef } from "react";
// import { useRouter } from "next/router";
import Link from "next/link";
import { Carousel } from "react-bootstrap";
// import CryptoJS from "crypto-js";

import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/Service.css";
import "../../Styles/Frontend/css/Cate.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/reset.css";


// const encryptionKey = "myinterriorMart@SECRETKEY";

// const encrypt = (text) => {
//   return CryptoJS.AES.encrypt(JSON.stringify(text), encryptionKey).toString();
// };

// const decrypt = (ciphertext) => {
//   const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
//   return bytes.toString(CryptoJS.enc.Utf8);
// };

const Service = () => {
    const [categories, setCategories] = useState([]);
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const [serviceBanners, setServiceBanners] = useState([]);
    const [homeMegaBannerImages, setHomeMegaBannerImage] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [showSecondBanner, setShowSecondBanner] = useState(false);

  
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
      setCategories(data.services);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const displayedCategories = categories.slice(16, 33);
  const initialCategories = categories.slice(0, 16);


  const toggleMobileMenu = () => {
    setIsActive((prev) => !prev); // Toggle active state
    setIsMobileMenuVisible(!isMobileMenuVisible);
};


useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const response = await fetch(
          `https://apidev.myinteriormart.com/api/Banners/GetFilteredBanners`
        );
        const data = await response.json();

        setServiceBanners(data.galleryBannerImages.servicesBanners);
      } catch (error) {
        console.error("Error fetching banner images:", error);
      }
    };

    fetchBannerImages();
  }, []);


  useEffect(() => {
    const fetchHorizontalBanners = async () => {
      try {
        const response = await fetch(
          `https://apidev.myinteriormart.com/api/Banners/GetFilteredBanners`
        );
        const data = await response.json();

        setHomeMegaBannerImage(data.homeMegaBannerImages);
      } catch (error) {
        console.error("Error fetching banner images:", error);
      }
    };

    fetchHorizontalBanners();
  }, []);

  useEffect(() => {
    if (homeMegaBannerImages.length > 0) {
      const timer = setTimeout(() => {
        setShowSecondBanner(true);
      }, homeMegaBannerImages.length * 3000); // Adjust the timing as needed

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [homeMegaBannerImages]);

  

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
                SERVICES
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
                    <li key={category.secondCategoryID}>
                      <Link
                         href={{
                          pathname: `/Service/${encodeURIComponent(
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
                          className="img-fluid image"
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
                  className="col-md-4 mim-Box-img "
                  style={{ paddingRight: "2px" }}
                >
                  <div className="carasoualVerticalHeight">
                    <Carousel
                      interval={8000}
                      autoPlay={true}
                      fade
                      animationEffect="Fade"
                      pause={false}
                      controls={false}
                    >
                      {serviceBanners.length > 0 ? (
                        serviceBanners.map((banner) => (
                          <Carousel.Item key={banner.id}>
                            <a
                              href={banner.bannerLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                className="d-block w-100 bannerimg "
                                src={`https://admin.myinteriormart.com${banner.imagePath}`}
                                alt={`Banner ${banner.location}`}
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
                  <div className="row no-gutters">
                    {initialCategories.map((category) => {
                      const icon = `/FileManager/CategoryIcons/Second/${category.imageURL}.png`;
                      return (
                        <div
                          className="col-md-3 col-sm-3 col-3 mim-Box-item servicecategorybox "
                          key={category.secondCategoryID}
                        >
                          <Link
                            href={{
                              pathname: `/Service/${encodeURIComponent(
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
      <div className="row py-1">
        <div className="carouelheight " style={{paddingRight:'2px'}}>
          <Carousel
            interval={8000}
            autoPlay={true}
            fade
            animationEffect="Fade"
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

        <div className="carouelheight carouselshow" style={{paddingLeft:'2px'}}>
          <Carousel
            interval={9000}
            autoPlay={true}
            fade
            animationEffect="Fade"
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
    </div>
    </>
  );
};

export default Service;
