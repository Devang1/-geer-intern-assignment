'use client';

import React from 'react';

const collections = [
  {
    title: 'EVERYDAY ROMANCE',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOCCF82MOkJx7mIHbVfvjkonP0zRDzRZjAykt7KNFAqQaFBB91FI11sCq3IiJBfcQpU64&usqp=CAU',
  },
  {
    title: 'WEDDING SEASON READY',
    image: 'https://sakhijewellers.com/wp-content/uploads/2021/12/SAkhi-Jewellers-Wedding-Season.webp',
  },
  {
    title: 'RINGS – THAT SAY YES!',
    image: 'https://parakkatjewels.com/cdn/shop/files/stone-ring-psr233w-021-parakkat-jewels-1.jpg?crop=center&height=1200&v=1748941256&width=1200',
  },
  {
    title: "THE GENTLEMAN'S EDIT",
    image: 'https://www.giva.co/cdn/shop/articles/0_18.jpg?v=1675833653',
  },
];

const ExploreCollections = () => {
  return (
    <section className="py-20 bg-black text-white" id="exploreCollection">
      <h2 className="text-center text-4xl font-bold font-playfair mb-16 text-gradient-gold tracking-widest">
        Explore Collections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 px-6 md:px-12 max-w-7xl mx-auto">
        {collections.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center group transition-transform duration-500 ease-in-out hover:scale-[1.07]"
          >
            {/* Circular Image with Border & Shadow */}
            <div className="w-56 h-56 md:w-60 md:h-60 rounded-full overflow-hidden relative shadow-xl border-4 border-white/10 group-hover:shadow-gold transition-all duration-500">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center rounded-full transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gold shimmer ring on hover */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#FFD700]/40 transition duration-500" />
            </div>

            {/* Title with shimmer effect */}
            <p className="mt-6 text-center font-playfair text-sm md:text-base tracking-wider text-gradient-silver-dark animate-fade-in-up">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCollections;
