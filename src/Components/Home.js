import React from "react";
import Navbar from "./Navbar";
import BannerImage from "../Assets/banner_img.jpeg";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <div class="home-container">
        <div class="home-text-section">
          <h1 className="heading">
            Giggles & Growth: Your Trusted Guide to Infant Care
          </h1>
          <p className="description">
            Discover expert guidance and joyful parenting on Giggles and Growth
            – your ultimate companion for nurturing happy, healthy infants.
          </p>
          <button className="secondary-button">
            Login <FiArrowRight />
          </button>
        </div>

          <img src={BannerImage} className="home-image" alt="banner"></img>
    
      </div>
    </div>
  );
};

export default Home;
