import React from "react";

const DealCard = ({
  image,
  title,
  oldPrice,
  newPrice,
  discount,
  timeAgo
}) => (
  <div style={{
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    borderRadius: "20px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
    padding: "2rem",
    margin: "1rem 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    minHeight: "280px",
    border: "1px solid rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    ":hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 16px 50px rgba(0,0,0,0.15)"
    }
  }}>
    {/* Discount badge */}
    {discount && (
      <span style={{
        position: "absolute",
        top: "1.5rem",
        left: "1.5rem",
        background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
        color: "#fff",
        borderRadius: "25px",
        padding: "0.5rem 1.2rem",
        fontSize: "1rem",
        fontWeight: 700,
        boxShadow: "0 4px 12px rgba(255,107,107,0.4)",
        zIndex: 2
      }}>
        🔥 Save {discount}
      </span>
    )}

    {/* Time ago */}
    {timeAgo && (
      <span style={{
        position: "absolute",
        top: "1.5rem",
        right: "1.5rem",
        background: "rgba(255,255,255,0.95)",
        color: "#666",
        borderRadius: "15px",
        padding: "0.4rem 1rem",
        fontSize: "0.9rem",
        fontWeight: 500,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        backdropFilter: "blur(10px)",
        zIndex: 2
      }}>
        ⏰ {timeAgo}
      </span>
    )}

    {/* Product Image */}
    <div style={{ 
      flex: "0 0 200px", 
      textAlign: "center",
      marginRight: "2rem"
    }}>
      <img
        src={image}
        alt={title}
        style={{ 
          maxWidth: "160px", 
          maxHeight: "160px", 
          objectFit: "contain"
        }}
      />
    </div>

    {/* Product Info */}
    <div style={{ flex: 1, marginRight: "1rem" }}>
      <h3 style={{ 
        fontSize: "1.3rem", 
        fontWeight: 700, 
        marginBottom: "1rem",
        color: "#2c3e50",
        lineHeight: "1.4"
      }}>
        {title}
      </h3>
    </div>
  </div>
);

export default DealCard; 