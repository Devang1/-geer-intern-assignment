'use client';
import { useEffect } from 'react';
import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useState } from 'react';
import 'swiper/css/navigation';
import ProductModal from './productModel';


const BestSellers = () => {
  const [mockProducts, setmockProducts] = useState([]);
    useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setmockProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchData();
  }, []);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const formatPrice = (price) => {
            return new Intl.NumberFormat('en-IN', {
             maximumFractionDigits: 0
            }).format(price);};
  return (
    <section className="py-24 bg-black text-white">
      <h2 className="text-center text-4xl md:text-5xl font-playfair font-bold mb-16 text-gradient-gold tracking-wider">
        Best Sellers
      </h2>

      <div className="px-6 md:px-12 max-w-7xl mx-auto ">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {mockProducts.map((item, idx) => (
            <SwiperSlide key={idx} className='py-5'>
              <div className="bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 group  hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] cursor-pointer" onClick={() => setSelectedProduct(item)}>
                <div className="relative w-full h-72 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-playfair text-xl font-semibold text-gradient-silver-dark mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm tracking-wide text-white/80">₹{formatPrice(item.price)}</p>
                  <button className="mt-4 px-6 py-2 text-sm uppercase tracking-wide text-white font-medium border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="text-center mt-16">
        <Link href="/Products"className="px-8 py-3 text-sm md:text-base uppercase tracking-wide text-white font-semibold border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300 inline-block">
            See All Items
        </Link>
      </div>
      <ProductModal selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
    </section>
  );
};

export default BestSellers;
