import Image from "next/image";

const categories = [
  { name: "Great Freedom Festival", image: "/Feedback-2.jpg" },
  { name: "Best Products", image: "/Feedback-2.jpg" },
  { name: "Earphones", image: "/Feedback-2.jpg" },
  { name: "Pantry", image: "/Feedback-2.jpg" },
  { name: "Luggage", image: "/Feedback-2.jpg" },
  { name: "Electronics", image: "/Feedback-2.jpg" },
  { name: "Women’s Clothing", image: "/Feedback-2.jpg" },
  { name: "Home Appliances", image: "/Feedback-2.jpg" },
  { name: "Men’s Clothing", image: "/Feedback-2.jpg" },
];

export default function TopCategories() {
  return (
    <section className="w-full py-10 px-4 md:px-10 lg:px-16 bg-[#f8f8f8]">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
        Top Categories
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 relative overflow-hidden rounded-full bg-white shadow-md transition-transform group-hover:scale-105">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-contain p-2"
              />
            </div>
            <p className="mt-2 text-sm sm:text-base text-gray-700 font-medium leading-tight px-1">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
