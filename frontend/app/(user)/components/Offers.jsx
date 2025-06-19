'use client';

import React, { useEffect } from 'react';

const Offers = () => {
  useEffect(() => {
    import('@google/model-viewer');
  }, []);

  return (
    <section className="bg-[#1a1a1a] text-white py-12 px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-10">
      
      {/* LEFT: PROMO CONTENT */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-wide uppercase mb-8 text-gradient-gold">
          Luxury Diamonds.<br />Unbeatable Prices.
        </h2>

        <div className="flex flex-col sm:flex-row sm:justify-between text-white/90 gap-6 sm:gap-4">
          <div className="sm:border-r border-white/20 sm:pr-4">
            <p className="text-sm mb-1 tracking-wider">STARTING AT</p>
            <p className="text-xl sm:text-2xl font-bold text-white leading-tight">
              Rs 13,000/<br />CARAT
            </p>
          </div>

          <div className="sm:border-r border-white/20 sm:px-4">
            <p className="text-base sm:text-lg font-semibold">10% OFF</p>
            <p className="text-sm">on Diamonds</p>
            <p className="text-base sm:text-lg font-semibold mt-2">50% OFF</p>
            <p className="text-sm">on Making Charges</p>
          </div>

          <div className="sm:pl-4">
            <p className="text-xl sm:text-2xl font-bold">3500+</p>
            <p className="text-sm">Unique Designs</p>
            <p className="text-xs mt-1 text-white/70">From Classic to Contemporary</p>
          </div>
        </div>
      </div>

      {/* RIGHT: 3D RING Model */}
      <div className="w-full max-w-[400px] sm:max-w-[500px] h-[300px] sm:h-[400px]  overflow-hidden">
        <model-viewer
          src="/models/scene.gltf"
          alt="3D Ring"
          auto-rotate
          camera-controls
          environment-image="neutral"
          exposure="1"
          style={{ width: '100%', height: '100%' }}
        ></model-viewer>
      </div>
    </section>
  );
};

export default Offers;
