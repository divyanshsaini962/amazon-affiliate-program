import React from "react";
import Link from "next/link";
import Image from "next/image";
import tv from "@/public/telivision.jpg";
import earphones from "@/public/earphone.jpg";
import pantry from "@/public/Vim.jpg";
import luggage from "@/public/Luggage.jpg"; // Fixed: capital L
import electronics from "@/public/Electronics.jpg"; // Fixed: capital E
import womensClothing from "@/public/Woman.jpg";
import homeAppliances from "@/public/Ac.jpg";
import mensClothing from "@/public/mens.jpg";

const BannerBottom = () => {
  return (
    <div className="banner-bottom">
      <div className="topics_sec">
        <h2>Top Categories</h2>
        <div className="topics_list">
          <Link href="/topics/best-products">
            <div className="topics">
              <div className="topics_svg">
                <Image src={tv} alt="tv" 
                  className="banner-bottom-img" />
              </div>
              <h3>Best Products</h3>
            </div>
          </Link>
          <Link href="/topics/earphones">
            <div className="topics">
              <div className="topics_svg">
                <Image src={earphones} alt="earphones" 
                  className="banner-bottom-img" />
              </div>
              <h3>Earphones</h3>
            </div>
          </Link>
          <Link href="/topics/pantry">
            <div className="topics">
              <div className="topics_svg">
                <Image src={pantry} alt="earphones" 
                  className="banner-bottom-img" />
              </div>
              <h3>Pantry</h3>
            </div>
          </Link>
          <Link href="/topics/luggage">
            <div className="topics">
              <div className="topics_svg">
                <Image src={luggage} alt="earphones" 
                  className="banner-bottom-img" />
              </div>
              <h3>Luggage</h3>
            </div>
          </Link>
          <Link href="/topics/electronics">
            <div className="topics">
              <div className="topics_svg">
                <Image src={electronics} alt="earphones" 
                  className="banner-bottom-img" />
              </div>
              <h3>Electronics</h3>
            </div>
          </Link>
          <Link href="/topics/womens-clothing">
            <div className="topics">
              <div className="topics_svg">
                <Image src={womensClothing} alt="earphones" 
                  className="banner-bottom-img" />
              </div>
              <h3>Women's Clothing</h3>
            </div>
          </Link>
          <Link href="/topics/home-appliances">
            <div className="topics">
              <div className="topics_svg">
                <Image src={homeAppliances} alt="earphones" 
                  className="banner-bottom-img" />
              </div>
              <h3>Home Appliances</h3>
            </div>
          </Link>
          <Link href="/topics/mens-clothing">
            <div className="topics">
              <div className="topics_svg">
                <Image src={mensClothing} alt="earphones" 
                  className="banner-bottom-img" />
              </div>
              <h3>Men's Clothing</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerBottom;
