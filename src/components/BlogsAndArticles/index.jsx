import React from "react";
import blog1 from "../../assests/img/blog1.jpg"
import blog2 from "../../assests/img/blog2.jpg"
import blog3 from "../../assests/img/blog3.jpg"

function BlogsAndArticles(){
    return(
        <>
         <section
    id="blog"
    style={{ backgroundColor: "rgb(219, 222, 222)" }}
    className="pt-5 pb-5"
  >
    <div className="container">
      <div className="row text-center">
        <h1
          className="mb-4 mt-3"
         
        >
          Blog &amp; Article
        </h1>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div
            className="card h-100 shadow-sm"
            
          >
            <img
              src={blog1}
              alt="images"
              className="card-img-top blog-img"
            />
            <div className="card-body lh-lg">
              <h5 className="card-text">
                GeoEstate: Simplify Property Acquisition with the Largest
                Centralized Database
              </h5>
              <a className="text-success text-decoration-none fw-bold" href="#">
                Read more
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div
            className="card h-100 shadow-sm"
            
          >
            <img
              src={blog2}
              className="card-img-top blog-img"
              alt="images"
            />
            <div className="card-body lh-lg">
              <h5 className="card-text">Discover Mallorca</h5>
              <a className="text-success text-decoration-none fw-bold" href="#">
                Read more
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div
            className="card h-100 shadow-sm"
           
          >
            <img
              src={blog3}
              className="card-img-top blog-img"
              alt="images"
            />
            <div className="card-body lh-lg">
              <h5 className="card-text">
                Why Invest in Luxury Hotels in Mallorca?
              </h5>
              <a className="text-success text-decoration-none fw-bold" href="#">
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
        </>
    )
};
export default BlogsAndArticles;