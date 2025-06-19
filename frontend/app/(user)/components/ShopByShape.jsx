import React from 'react';

const ShopByShape = () => {
  const shapes = [
    { name: 'Round', icon: 'https://geer.in/cdn/shop/collections/round.webp?v=1745760030&width=1070' },
    { name: 'Oval', icon: 'https://geer.in/cdn/shop/collections/oval.png?v=1745760292&width=1070' },
    { name: 'Cushion', icon: 'https://geer.in/cdn/shop/collections/cushion.png?v=1745760311&width=1070' },
    { name: 'Emerald', icon: 'https://geer.in/cdn/shop/collections/emerald.png?v=1745760249&width=1070' },
    { name: 'Pear', icon: 'https://geer.in/cdn/shop/collections/pear.png?v=1745760183&width=1070' },
    { name: 'Heart', icon: 'https://geer.in/cdn/shop/collections/heart.png?v=1745760265&width=1070' },
    { name: 'Radiant', icon: 'https://geer.in/cdn/shop/collections/radiant.png?v=1745760334&width=1070' },
    { name: 'Princess', icon: 'https://geer.in/cdn/shop/collections/princess.png?v=1745760215&width=1070' },
    { name: 'Marquise', icon: 'https://geer.in/cdn/shop/collections/marquise.png?v=1745760234&width=1070' },
    { name: 'Asscher', icon: 'https://geer.in/cdn/shop/collections/asscher.png?v=1745760365&width=1070' },
  ];

  return (
    <section className="py-16 px-4 text-center bg-[#1a1a1a]">
      <h2 className="text-3xl sm:text-4xl font-bold font-playfair mb-10 text-transparent text-gradient-gold tracking-widest">
        Shop By Shape
      </h2>

      <div className="flex overflow-x-auto hide-scrollbar space-x-6 px-2 py-2 sm:justify-center">
        {shapes.map((shape, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[80px] sm:min-w-[100px] group transition-transform duration-300 hover:scale-105"
          >
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white/10 border border-white/20 shadow-lg group-hover:shadow-gold transition-all duration-300 p-2 sm:p-4">
              <img
                src={shape.icon}
                alt={shape.name}
                className="w-full h-full object-contain filter brightness-0 invert group-hover:scale-110 transition duration-300"
              />
            </div>
            <p className="text-xs sm:text-sm text-[#facc15] mt-2 group-hover:text-white transition-colors duration-300 uppercase tracking-wide">
              {shape.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByShape;
