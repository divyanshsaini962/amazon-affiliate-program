import DailyDealCard from "./DailyDealCard";

const deals = [
  {
    image: "/tv.jpg",
    title: "MI 80 cm (32 inches) Horizon Edition HD Ready Android Smart LED TV 4A | L32M6-EI (Grey)",
    oldPrice: "Rs. 19999",
    newPrice: "Rs. 15999",
    discount: "20%",
    date: "September 9, 22",
    buyLink: "https://www.amazon.in/dp/B086CYSLVV",
  },
  {
    image: "/mixer.jpg",
    title: "Croma 500W Mixer Grinder with 3 Stainless Steel Leak-proof Jars, 3 speed & Pulse function, 2 years warranty",
    oldPrice: "Rs. 2999",
    newPrice: "Rs. 1899",
    discount: "36%",
    date: "September 9, 22",
    buyLink: "https://www.amazon.in/dp/B07X5W8V2T",
  },
];

export default function DailyDealsSection() {
  return (
    <section style={{ background: "#fff", padding: "0 0 2rem 0", marginTop: "1rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>Daily Deals</h2>
          <a href="/deals" className="view-all-btn">View All</a>
        </div>
        <div className="leftblog_sec">
          <div className="blogs_sec">
            {deals.map((deal, idx) => (
              <DailyDealCard key={idx} {...deal} />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .view-all-btn {
          background: #4f8cff;
          color: #fff;
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s;
        }
        .view-all-btn:hover {
          background: #2563eb;
        }
      `}</style>
    </section>
  );
} 