import React from 'react';

const ShopByCategory = () => {
  const categories = [
    {
      name: 'Rings',
      image: 'https://media.istockphoto.com/id/176830145/photo/wedding-rings.jpg?s=612x612&w=0&k=20&c=AeZdAkKLzyCHwQdj4A0GPfwyZumaOJa0Z2jrDt_TRok=',
      description: 'Elegant lab-grown diamond rings with a timeless charm.',
    },
    {
      name: 'Earrings',
      image: 'https://karatcart.com/cdn/shop/files/partnerimages_2Fa4b87139_33015822_5.jpg?v=1725617160',
      description: 'Graceful diamond earrings that elevate every look.',
    },
    {
      name: 'Pendant',
      image: 'https://www.mannash.in/cdn/shop/products/MCYNCP86D145_M.jpg?v=1622134610',
      description: 'Elegant lab-grown diamond pendants with unique style.',
    },
    {
      name: 'Bracelets',
      image: 'https://www.elahe.in/cdn/shop/files/5_2d3f7222-bf7b-43dc-917e-597d4b09909a_2000x.jpg?v=1722687234',
      description: 'Stunning diamond bracelets for every occasion.',
    },
    {
      name: 'Necklace',
      image: 'https://www.aurusjewels.in/cdn/shop/files/Uttara1-Webp.webp?v=1701930539',
      description: 'Necklaces that blend grace with grandeur.',
    },
  ];

  return (
    <section className="py-16 px-6 bg-black text-center">
      <h2 className="text-4xl font-bold font-playfair mb-12 text-transparent text-gradient-gold tracking-widest">
        Shop By Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((cat, index) => (
          <a href={cat === 'Other Jewelry' ? '/Products' : `/Products?category=${encodeURIComponent(cat.name)}`}>
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-lg border border-white/10"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            {/* Category Name Banner */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-2 text-center">
              <h3 className="text-white text-lg font-medium tracking-wide uppercase">
                {cat.name}
              </h3>
            </div>

            {/* Hover Overlay with Description */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-4">
                <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#fff8dc]">
                  {cat.name}
                </h3>
              <p className="text-sm text-white">{cat.description}</p>
            </div>
          </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
