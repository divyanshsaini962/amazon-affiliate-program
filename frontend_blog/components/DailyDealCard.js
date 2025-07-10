import Image from "next/image";
import Link from "next/link";

export default function DailyDealCard({
  image,
  title,
  oldPrice,
  newPrice,
  discount,
  date,
  buyLink,
}) {
  return (
    <article className="blog">
      <div className="blogs">
        <div className="blogimg">
          <Image src={image} alt={title} width={300} height={200} style={{ objectFit: "cover" }} />
        </div>
      </div>
      <div className="bloginfo">
        <div className="blogtag">{date}</div>
        <h3 className="blog-title">
          {title.length > 50 ? title.substring(0, 50) + "..." : title}
        </h3>
        <div className="deal-prices" style={{ marginBottom: "0.5rem" }}>
          <span className="old-price" style={{ textDecoration: "line-through", color: "#888", marginRight: "0.7rem" }}>{oldPrice}</span>
          <span className="new-price" style={{ color: "#222", fontWeight: 700 }}>{newPrice}</span>
          <span className="deal-badge" style={{ marginLeft: "1rem", color: "#2ecc40", fontWeight: 600 }}>Save {discount}</span>
        </div>
        <div className="blog-buttons" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.75rem" }}>
          <a
            href={buyLink}
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
              margin: "0 0.25rem 0.5rem 0.25rem",
              display: "inline-block",
              transition: "background 0.2s",
              flex: "1 1 180px",
              textAlign: "center",
            }}
          >
            Buy on Amazon
          </a>
          <a
            href={buyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="view-details-btn"
            style={{
              background: "#4f8cff",
              color: "#fff",
              padding: "0.7rem 1.5rem",
              borderRadius: "8px",
              fontWeight: 600,
              textDecoration: "none",
              margin: "0 0.25rem 0.5rem 0.25rem",
              display: "inline-block",
              transition: "background 0.2s",
              flex: "1 1 180px",
              textAlign: "center",
            }}
          >
            View Details
          </a>
        </div>
      </div>
    </article>
  );
} 