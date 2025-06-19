'use client';

import React, { useEffect, useState, useRef } from 'react';

const LuxuryHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null); // ✅ JavaScript-compatible ref

  useEffect(() => {
    setIsVisible(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden font-cormorant">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover brightness-[0.3]" // darker for cinematic
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Cinematic Text Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="uppercase tracking-[0.4em] text-sm md:text-base lg:text-lg text-gradient-gold mb-6 animate-glow">
            The Collection
          </p>
        </div>

        <div
          className={`transition-all duration-1200 delay-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-glow-reveal text-5xl md:text-7xl lg:text-8xl xl:text-[8rem] font-semibold leading-none">
            LUX VELVETONE
          </h1>
        </div>

        <div
          className={`transition-all duration-1000 delay-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button className="mt-12 px-8 py-4 glass-morphism text-white font-medium tracking-widest uppercase text-sm hover:bg-white/20 transition-all duration-300 rounded-full border border-white/30 hover:border-white/50 hover:shadow-2xl">
            <a href="#exploreCollection">Explore Collection</a>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {/* Glow Dots */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-gradient-to-r from-[#C0C0C0] to-[#1e1e1e] rounded-full animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-1/3 right-16 w-3 h-3 bg-gradient-to-r from-[#1e1e1e] to-[#C0C0C0] rounded-full animate-pulse hidden lg:block"></div>
      <div className="absolute top-1/2 right-10 w-1 h-1 bg-white/60 rounded-full animate-pulse hidden lg:block"></div>
    </section>
  );
};

export default LuxuryHero;
