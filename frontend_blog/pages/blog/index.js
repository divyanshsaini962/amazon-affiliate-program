import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import useFetchData from "@/hooks/useFetchData";
import MenImage from "@/public/carousel1.jpg";
import NoImg from "@/public/noimage.jpg";
import Author2 from "@/public/carousel3.jpg";
import AuthorI from "@/public/ashish.jpg";

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
  }, [currentPage, perPage, totalPages, currentBlogs, loading, alldata, publishedBlogs]);

  const sliderSettings = {
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
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Your Tech Review Blog",
        "url": "https://yourdomain.com",
        "body": "In-depth reviews of the latest tech products and gadgets",
        "blogPost": publishedBlogs.map((blog) => ({
          "@type": "BlogPosting",
          "headline": blog.title,
          "description": blog.description,
          "datePublished": blog.createAt,
          "author": {
            "@type": "Person",
            "name": "Divyanshu Saini"
          },
          "image": blog.mainImage || NoImg,
          "url": `https://yourdomain.com/blog/${blog.slug}`
        }))
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
        <meta name="body" content="Discover in-depth reviews of the latest tech products, gadgets, and innovations. Stay informed with our expert analysis and comparisons." />
        <meta property="og:title" content="Tech Product Reviews | Your Website Name" />
        <meta property="og:body" content="Discover in-depth reviews of the latest tech products, gadgets, and innovations." />
        <meta property="og:image" content="/path-to-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://yourdomain.com" />
      </Head>

      <main>
       

        <section className="main_blog_section" aria-label="Recent blog posts">
          <h2 id="hadding">Recently Published</h2>
          <div className="leftblog_sec">
            <div className="blogs_sec" style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              justifyContent: 'center',
            }}>
              {loading ? (
                <div className="wh_100 flex flex-center mt-2 pb-5">
                  <div className="loader" aria-label="Loading content"></div>
                </div>
              ) : currentBlogs.length > 0 ? (
                currentBlogs.map((blog, index) => (
                  <article className="blog" key={blog._id} style={{
                    background: '#fff',
                    borderRadius: '16px',
                    boxShadow: '0 2px 16px rgba(42,60,255,0.07)',
                    maxWidth: '350px',
                    width: '100%',
                    margin: '0 auto',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '420px',
                  }}>
                    <Link href={`/blog/${blog.slug}`}>
                      <Image
                        src={blog.mainImage || NoImg}
                        alt={`Featured image for ${blog.title}`}
                        width={350}
                        height={200}
                        style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                        priority={index === 0}
                      />
                    </Link>
                    <div className="bloginfo" style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        {blog.tags && blog.tags.length > 0 && blog.tags[0] && (
                          <Link href={`/tag/${blog.tags[0]}`}>
                            <div className="blogtag" style={{
                              display: 'inline-block',
                              background: '#e3e8ff',
                              color: '#2a3cff',
                              borderRadius: '12px',
                              padding: '2px 10px',
                              fontSize: '0.95em',
                              marginBottom: '8px',
                            }}>{blog.tags[0]}</div>
                          </Link>
                        )}
                        <Link href={`/blog/${blog.slug}`}>
                          <h3 className="blog-title" style={{ margin: '8px 0 12px 0', color: '#222', fontWeight: 700, fontSize: '1.3rem' }}>
                            {blog.title.length > 50
                              ? blog.title.substring(0, 50) + '...'
                              : blog.title}
                          </h3>
                        </Link>
                        <p className="blog-description" style={{ color: '#444', fontSize: '1.05rem', marginBottom: '16px' }}>
                          {blog.description.length > 70
                            ? blog.description.substring(0, 70) + '...'
                            : blog.description}
                        </p>
                        <div className="blog-buttons" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.75rem" }}>
                          <a
                            href={blog.amazonLink || "https://www.amazon.in/"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="buy-btn-amazon"
                            style={{
                              background: "#ff9900",
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
                      <div className="blogauthor flex gap-1" style={{ alignItems: 'center' }}>
                        <div className="blogaimg">
                          <Image
                            src={AuthorI}
                            alt="Divyanshu Saini"
                            width={50}
                            height={50}
                            style={{
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                        <div className="flex flex-col flex-left gap-05">
                          <h4 style={{ margin: 0, color: '#2a3cff', fontWeight: 600 }}>Divyanshu Saini</h4>
                          <span style={{ color: '#888', fontSize: '0.95em' }}>
                            {new Date(blog.createAt).toLocaleDateString(
                              "en-Us",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
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
    </>
  );
}