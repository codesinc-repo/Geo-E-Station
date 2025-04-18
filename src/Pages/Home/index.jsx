import React from "react";
// import "./home.css";
import CustomNavbar from "../../components/Navbar";
import SwiperImage from "../../components/Swiperimage";
import Testimonial from "../../components/Testimonial";
import Footer from "../../components/Footer";
import BlogsAndArticles from "../../components/BlogsAndArticles";
import Faqs from "../../components/FAQs";
import ContactUs from "../../components/ContactUs";
import PricingSection from "../../components/PricingSection";
import HeroSection from "../../components/HeroSection";

const Home = () => {
    return (
        <>
            <CustomNavbar />
            <HeroSection />
            <SwiperImage />

            <PricingSection />


            {/* <BlogsAndArticles /> */}
            <Testimonial />

            <Faqs />
            <ContactUs />
            <Footer />
        </>
    );
};

export default Home;
