import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assests/img/logo.png"
function Footer() {
    return (
        <>
            <footer className="footer-section ">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="widget company-intro-widget">
                                    <a href="index.html" className="site-logo">
                                        <img src={logo} alt="logo" />
                                    </a>
                                    <a href="#" />
                                    <ul className="company-footer-contact-list d-flex">
                                        <li>
                                            <a
                                                href="https://www.facebook.com/profile.php?id=61565554209572"
                                                target="_blank" rel="noreferrer"
                                            >
                                                <i className="fa-brands fa-facebook" />
                                            </a>
                                        </li>
                                        <li>
                                            <Link to="">
                                                <i className="fa-brands fa-linkedin" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="">
                                                <i className="fa-brands fa-instagram" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="">
                                                <i className="fa-brands fa-twitter" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="">
                                                <i className="fa-brands fa-youtube" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="widget course-links-widget">
                                    <h5 className="widget-title fw-bold fs-4">Services</h5>
                                    <ul className="courses-link-list">
                                        <li>
                                            <a href="#home">Home</a>
                                        </li>
                                        <li>
                                            <a href="#price">Price</a>
                                        </li>
                                        <li>
                                            <a href="#company">Company</a>
                                        </li>
                                        <li>
                                            <a href="#blog">Blog</a>
                                        </li>
                                        <li>
                                            <a href="#contact">Contact</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="widget latest-news-widget">
                                    <h5 className="widget-title fw-bold fs-4">Get In Touch</h5>
                                    <ul className="small-post-list">
                                        <li>
                                            <div className="small-post-item d-flex flex-column border-bottom py-2">
                                                <Link to="" className="post-date">
                                                    <i className="fa-solid fa-phone" /> +34666227706
                                                </Link>
                                                <Link to="" className="post-date">
                                                    <i className="fa-solid fa-envelope" /> info@geoestate.ai
                                                </Link>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="small-post-item d-flex flex-column pt-3">
                                                <Link to="" className="post-date">
                                                    <i className="fa-solid fa-location-dot" /> 07013 Palma de
                                                    Mallorca <br /> &nbsp;&nbsp; Spain
                                                </Link>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="widget newsletter-widget">
                                    <h5 className="widget-title fw-bold fs-4">Newsletter</h5>
                                    <div className="footer-newsletter">
                                        <form className="news-letter-form d-flex">
                                            <input
                                                type="email"
                                                name="news-email"
                                                className="h-100"
                                                id="news-email"
                                                placeholder="Your email address"
                                            />
                                            <input
                                                className="h-100"
                                                type="submit"
                                                defaultValue="Submit"
                                            />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-6 text-sm-left text-center">
                                <span className="copy-right-text">
                                    © 2024 <a href="https://codepen.io/anupkumar92">GeoSate</a> All
                                    Rights Reserved{" "}
                                    <a
                                        href="https://codes-inc.com/"
                                        className="text-decoration-none text-warning"
                                    >
                                        Codesinc.
                                    </a>{" "}
                                </span>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <ul className="terms-privacy d-flex justify-content-sm-end justify-content-center">
                                    <li>
                                        <Link to="">Terms &amp; Conditions</Link>
                                    </li>
                                    <li>
                                        <Link to="">Privacy Policy</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
