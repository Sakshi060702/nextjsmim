'use client';
import React from "react";

import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/dropdown.css";


function Freeselectcategory(){
    return(
        <>
        <div className="tab-pane fade active show" id="v-pills-category" role="tabpanel" aria-labelledby="v-pills-category-tab">
      <h5>Post your free ad</h5>
      <div className="row py-5 selectcategoryblock">
        <div className="col-md-12 d-flex justify-content-center selectcategory">
          <div className="select_category_sec d-flex align-items-center">
            <div className="select_category_img_sec">
               <img src='/img/left.jpeg' alt="img" className="select_category_img" />
            </div>
            <div className="select_category_info text-center">
              <h5>
                Select the appropriate category to post your ad
              </h5>
              <p>
                Not Sure? Give us a missed call @1234567890 and we will help you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}
export default Freeselectcategory;