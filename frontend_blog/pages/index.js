import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import useFetchData from "@/hooks/useFetchData";
import MenImage from "@/public/carousel1.jpg";
import NoImg from "@/public/noimage.jpg";
import Author2 from "@/public/carousel3.jpg";
import AuthorI from "@/public/ashish.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import secondimg from "../public/carousel2.jpg";
import BannerBottom from "@/components/BannerBottom";
import DealCard from "../components/DealCard";
import DailyDealsSection from "@/components/DailyDealsSection";


export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const { alldata, loading, error } = useFetchData("/api/getblog");

  const publishedBlogs = useMemo(() => {
    return alldata.filter((blog) => blog.status === "publish");
  }, [alldata]);

  const totalBlogs = publishedBlogs.length;
  const totalPages = Math.ceil(totalBlogs / perPage);

  const currentBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    return publishedBlogs.slice(startIndex, startIndex + perPage);
  }, [publishedBlogs, currentPage, perPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  useEffect(() => {
    if (!loading && alldata.length > 0) {
    }
  }, [
    currentPage,
    perPage,
    totalPages,
    currentBlogs,
    loading,
    alldata,
    publishedBlogs,
  ]);

  const newSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    if (!loading && publishedBlogs.length > 0) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Your Tech Review Blog",
        url: "https://yourdomain.com",
        body: "In-depth reviews of the latest tech products and gadgets",
        blogPost: publishedBlogs.map((blog) => ({
          "@type": "BlogPosting",
          headline: blog.title,
          datePublished: blog.createAt,
          author: {
            "@type": "Person",
            name: "Divyanshu Saini",
          },
          image: blog.mainImage || NoImg,
          url: `https://yourdomain.com/blog/${blog.slug}`,
        })),
      });
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [loading, publishedBlogs]);

  if (error) {
    return <div>Error loading blog posts. Please try again later.</div>;
  }

  return (
    <>
      <Head>
        <title>Tech Product Reviews | Your Website Name</title>
        <meta
          name="body"
          content="Discover in-depth reviews of the latest tech products, gadgets, and innovations. Stay informed with our expert analysis and comparisons."
        />
        <meta
          property="og:title"
          content="Tech Product Reviews | Your Website Name"
        />
        <meta
          property="og:body"
          content="Discover in-depth reviews of the latest tech products, gadgets, and innovations."
        />
        <meta property="og:image" content="/path-to-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://yourdomain.com" />
      </Head>

      <main>
         {/* slider */}
        <section
          className="full-width-slider"
          aria-label="Featured posts slider"
        >
          <Slider {...newSliderSettings}>
            <div>
              <Image
                src={MenImage}
                alt="Featured tech product 1"
                width={1920}
                height={1080}
                priority
              />
            </div>
            <div>
              <Image
                src={secondimg}
                alt="Featured tech product 2"
                width={1920}
                height={1080}
              />
            </div>
            <div>
              <Image
                src={Author2}
                alt="Featured tech product 3"
                width={1920}
                height={1080}
              />
            </div>
          </Slider>
        </section>

        <div className="bannerb">
          <BannerBottom />
        </div>
        {/* <section
          className="deals_section"
          style={{
            background: "#e9ecf8",
            padding: "2.5rem 0",
            margin: "0",
            width: "100vw",
            position: "relative",
            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
            marginRight: "-50vw",
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              padding: "0 1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>Latest Deals</h2>
            </div>
            <DealCard
              image="/latest%20deal.jpg"
              title="atomberg Efficio Alpha 1200mm BLDC Ceiling Fan with Remote | 5 star | High Air Delivery | LED Speed Indicator | Low Noise | Timeless Design with Power Saving | 2 Years Warranty (Seasand Ivory)"
              oldPrice="Rs. 4590"
              newPrice="Rs. 2699"
              discount="41%"
              timeAgo="10 hrs ago"
            />
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <a
                href="/deals"
                style={{
                  background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "25px",
                  padding: "1rem 2.5rem",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(52,152,219,0.3)",
                  transition: "all 0.3s ease",
                  display: "inline-block",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(52,152,219,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 16px rgba(52,152,219,0.3)";
                }}
              >
                🛒 View All Deals
              </a>
            </div>
          </div>
        </section> */}
        <DailyDealsSection />
        <section className="main_blog_section" aria-label="Recent blog posts">
          <h2 id="hadding">Recently Published</h2>
          <div className="leftblog_sec">
            <div className="blogs_sec">
              {loading ? (
                <div className="wh_100 flex flex-center mt-2 pb-5">
                  <div className="loader" aria-label="Loading content"></div>
                </div>
              ) : currentBlogs.length > 0 ? (
                currentBlogs.map((blog, index) => (
                  <article className="blog" key={blog._id}>
                    <div className="blogs">
                      <div className="blogimg">
                        <Link href={`/blog/${blog.slug}`}>
                          <Image
                            src={blog.mainImage || NoImg}
                            alt={`Featured image for ${blog.title}`}
                            width={300}
                            height={200}
                            style={{ objectFit: "cover" }}
                            priority={index === 0}
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="bloginfo">
                      <Link href={`/tag/${blog.tags[0]}`}>
                        <div className="blogtag">{blog.tags[0]}</div>
                      </Link>
                      <Link href={`/blog/${blog.slug}`}>
                        <h3 className="blog-title">
                          {blog.title.length > 50
                            ? blog.title.substring(0, 50) + "..."
                            : blog.title}
                        </h3>
                      </Link>
                      <div className="blog-buttons" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.75rem" }}>
                        <a
                          href="https://www.amazon.in/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="buy-btn"
                          style={{
                            background: "#ffc107",
                            color: "#222",
                            padding: "0.7rem 1.5rem",
                            borderRadius: "8px",
                            fontWeight: 600,
                            textDecoration: "none",
                            transition: "background 0.2s",
                            flex: "1 1 180px",
                            textAlign: "center",
                            margin: "0 0.25rem 0.5rem 0.25rem",
                          }}
                        >
                          Buy on Amazon
                        </a>
                        <Link href={`/blog/${blog.slug}`} legacyBehavior>
                          <a
                            className="view-details-btn"
                            style={{
                              background: "#4f8cff",
                              color: "#fff",
                              padding: "0.7rem 1.5rem",
                              borderRadius: "8px",
                              fontWeight: 600,
                              textDecoration: "none",
                              transition: "background 0.2s",
                              flex: "1 1 180px",
                              textAlign: "center",
                              margin: "0 0.25rem 0.5rem 0.25rem",
                            }}
                          >
                            View Details
                          </a>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p>No published blogs available.</p>
              )}
            </div>
          </div>
          {!loading && currentBlogs.length > 0 && (
            <nav className="blogpagination" aria-label="Pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                Previous
              </button>
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={currentPage === number + 1 ? "active" : ""}
                  aria-label={`Page ${number + 1}`}
                  aria-current={currentPage === number + 1 ? "page" : undefined}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                Next
              </button>
            </nav>
          )}
        </section>
      </main>
      <style jsx>{`
        @media (max-width: 600px) {
          .blog-buttons {
            flex-direction: column !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </>
  );
}
