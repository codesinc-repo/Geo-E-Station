import React from "react";
import colimg from "../../assests/img/col-img.png";
import "../../Pages/Home/home.css";
import { Link } from "react-router-dom";
import image from "../../assests/img/Bg_images.png";
import home from "../../assests/img/svgexport-7.svg";
import marker from "../../assests/img/svgexport-8.svg";
import alt from "../../assests/img/svgexport-9.svg";
import img from "../../assests/img/svgexport-10.svg";

function PricingSection() {

    const solutionData = [
        {
            id: 0,
            icon: [home],
            title: 'Integration with Multiple Portals',
            desc: 'Access the most complete international and national portfolio of properties from Idealista, Fotocasa, LuxuryEstate, and more, in one place',
        },
        {
            id: 1,
            icon: [marker],
            title: 'Advanced Geolocation',
            desc: "Explore properties directly on the map and activate the ones you're interested in to easily find them while you're on the go.",
        },
        {
            id: 2,
            icon: [alt],
            title: 'Dynamic Interface',
            desc: 'Enjoy a fluid user experience with an intuitive and adaptable interface that will allow you to easily capture and evaluate properties.',
        },
        {
            id: 3,
            icon: [img],
            title: 'Custom Alerts',
            desc: 'Receive instant notifications when new properties appear that match your preferences.',
        }
    ]

    return (
        <>
            <section
                className="bg-img py-5"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="container-fluid  content my-5 d-flex justify-content-center align-items-center  " style={{ height: "80vh" }}>
                    <div className="row align-items-center">
                        <div className="col-md-6 ">
                            <div className="ms-5">
                                <h2>
                                    <strong>  Discover properties from multiple portals, geolocated and personalized for you</strong>
                                </h2>
                                <p className="subtitle mt-4">
                                    All in one dynamic and easy-to-use platform even while you're on the go.
                                    <br />
                                    <br />
                                    Geoestate is definitely your property acquisition and valuation tool
                                </p>
                                <div className="agents">
                                    <img
                                        alt="Agent 1"
                                        height={40}

                                        src="https://storage.googleapis.com/a1aa/image/jov1tu0eD8UyAiRvBwZiDtOFTecD5fxjjPF89Gq6MopPnUknA.jpg"
                                        width={40}
                                    />
                                    <img
                                        alt="Agent 2"
                                        height={40}
                                        src="https://storage.googleapis.com/a1aa/image/Ntqx27l8AxbTBh45xTt4FJ0d1yeniIVsTHciU5Zl3MK1JF5JA.jpg"
                                        width={40}
                                    />
                                    <img
                                        alt="Agent 3"
                                        height={40}
                                        src="https://storage.googleapis.com/a1aa/image/nYULLgOmBTZPP5g4VgBMwQAvHr1hZM6yf9weEfPHCrzQnUknA.jpg"
                                        width={40}
                                    />
                                    <span className="ms-5"><b>More than 2,000 agents have used it</b></span>
                                </div>
                                <button className="offer-btn">
                                    <Link to="/Payment">Launch offer at 30%</Link>
                                </button>
                            </div>
                        </div>
                        <div style={{ width: "50%" }}>
                            <img src={colimg} alt="" className="img-fluid col-img" />
                        </div>
                    </div>
                </div>
            </section>
            {/* 4th Section  */}
            <section id="company">
                <div className="container-fluid my-4">
                    <div className="section-title my-5">
                        <h2>The complete solution for the real estate market</h2>
                        <p className="my-4">
                            We make it easy for users to use our platform, which is why we
                            offer this benefit.
                        </p>
                    </div>
                    <div className="row">
                        {solutionData.map((sol, index) => (
                            <div
                                className="col-md-3 col-sm-6 d-flex align-items-stretch mb-4 rounded-5 overflow-hidden"
                                key={sol.id}
                            >
                                <div
                                    className="feature-box d-flex flex-column justify-content-between p-3 border rounded  rounded-4 overflow-hidden"
                                    style={{ maxHeight: "100%" }}
                                >
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img
                                            src={sol.icon}
                                            alt={sol.title}
                                            style={{ width: "50px", marginBottom: "1rem" }}
                                        />

                                    </div>
                                    <h4 className="fs-6 mt-3">{sol.title}</h4>
                                    <p className="fs-6">{sol.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5th Section  */}
            <section style={{ backgroundColor: "#33DB4A26" }} id="price">
                <div className="container-fluid py-5">
                    <div className="pricing-header">
                        <h1>Choose the best option for you</h1>
                        <p>Choose the no-commitment rate that best suits your needs</p>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-4 mb-4">
                            <div className="card text-center h-100 rounded-5 overflow-hidden border-0">
                                <div className="card-header border-0 bg-white">
                                    <h2 className="fw-bold my-5">Basic User</h2>
                                    <div className="price mb-2">
                                        <span className="fw-bold fs-5 text-muted">80€</span>/month
                                    </div>
                                    <p className="my-4">( For One User )</p>
                                    <p>Offer during the first 1 month</p>
                                </div>
                                <div className="card-body">
                                    <button className="btn btn-choose">
                                        <Link to="/Payment">Choose Plan</Link>
                                    </button>
                                    <ul className="d-flex flex-column align-items-start my-3 gap-3">
                                        <li className="d-flex gap-3 mt-2 align-items-center">
                                            <i className="fas fa-check bg-dark rounded-circle p-1 text-white" />
                                            Access to a limited database
                                        </li>
                                        <li className="d-flex gap-3 mt-2 align-items-center">
                                            <i className="fas fa-check bg-dark rounded-circle p-1 text-white" />
                                            No advanced geolocation
                                        </li>
                                        <li className="d-flex gap-3 mt-2 align-items-center">
                                            <i className="fas fa-check bg-dark rounded-circle p-1 text-white" />
                                            No buyer management
                                        </li>
                                        <li className="d-flex gap-3 mt-2 align-items-center">
                                            <i className="fas fa-check bg-dark rounded-circle p-1 text-white" />
                                            Cannot mark the map with colors
                                        </li>
                                        <li className="d-flex gap-3 mt-2 align-items-center">
                                            <i className="fas fa-check bg-dark rounded-circle p-1 text-white" />
                                            Cannot create buyer profiles
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 mb-4" >
                            <div className="card highlight text-center rounded-5 overflow-hidden border-0">
                                <div className="card-header border-0 text-white">
                                    <h2 className="fw-bold my-5">Standard</h2>
                                    <div className="price mb-2">
                                        <span className="fw-bold fs-5 text-white ">150€</span>/month
                                    </div>
                                    <p className="my-4">( For Up to Five Users )</p>
                                    <p>Offer during the first 2 months</p>
                                </div>
                                <div className="card-body">
                                    <button className="btn btn-choose" style={{ color: "#33DB4A" }}>
                                        <Link to="/Payment" style={{ color: "#28A344" }}>Choose Plan</Link>
                                    </button>
                                    <ul className="d-flex flex-column align-items-start my-3 gap-3 text-white">
                                        <li className="d-flex gap-3 mt-2 align-items-center">
                                            <i className="fas fa-check bg-white rounded-circle p-1 text-black" />
                                            Real-time geolocation
                                        </li>
                                        <li className="d-flex gap-3 mt-2 align-items-center">
                                            <i className="fas fa-check bg-white rounded-circle p-1 text-black" />
                                            Unlimited buyer profiles
                                        </li>
                                        <li className="d-flex gap-3 mt-2 align-items-center">
                                            <i className="fas fa-check bg-white rounded-circle p-1 text-black" />
                                            Custom alerts
                                        </li>
                                        <li className="d-flex gap-3 mt-2 align-items-center">
                                            <i className="fas fa-check bg-white rounded-circle p-1 text-black" />
                                            Automatic exposé sending
                                        </li>
                                        <li className="d-flex gap-3 mt-2 align-items-center">
                                            <i className="fas fa-check bg-white rounded-circle p-1 text-black" />
                                            Limited to one province
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 mb-4">
                            <div className="card text-center h-100 rounded-5 overflow-hidden border-0" style={{ height: "350px" }}>
                                <div className="card-header border-0 bg-white ">
                                    <h2 className="fw-bold my-5">Master</h2>
                                    <div className="price mb-2">
                                        <span className="fw-bold fs-5 text-muted">300€</span>/month
                                    </div>
                                    <p className="my-4">( For Upto Ten Users )</p>
                                    <p>Offer during the first 3 months</p>
                                </div>
                                <div className="card-body">
                                    <button className="btn btn-choose">
                                        <Link to="/Payment">Choose Plan</Link>
                                    </button>
                                    <ul className="d-flex flex-column align-items-start my-3 gap-3">
                                        <li className="d-flex gap-3 mt-2 align-items-center">
                                            <i className="fas fa-check bg-dark rounded-circle p-1 text-white" />
                                            Full access to all provinces
                                        </li>
                                        <li className="d-flex gap-3 mt-2 align-items-center">
                                            <i className="fas fa-check bg-dark rounded-circle p-1 text-white" />
                                            Unlimited profiles
                                        </li>
                                        <li className="d-flex gap-3 mt-2 align-items-center">
                                            <i className="fas fa-check bg-dark rounded-circle p-1 text-white" />
                                            Enhanced control over property{" "}
                                        </li>
                                        <li className="d-flex gap-3 mt-2 align-items-center">
                                            <i className="fas fa-check bg-dark rounded-circle p-1 text-white" />
                                            Ability to create 1 administrator profile
                                        </li>
                                        <li className="d-flex gap-3 mt-2 align-items-center">
                                            <i className="fas fa-check bg-dark rounded-circle p-1 text-white" />
                                            Ability to create 4 agent profiles
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default PricingSection;
