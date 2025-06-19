'use client';

import React from 'react';
import LuxuryHero from './components/luxury-hero';
import ShopByShape from './components/ShopByShape';
import ShopByCategory from './components/ShopByCategory';
import Offers from './components/Offers';
import ExploreCollections from './components/ExploreCollections'
import BestSellers from './components/BestSeller';
import Footer from './components/footer';
export default function Home() {
  return (
    <>
      <main>
        <LuxuryHero />
        <BestSellers/>
        <ShopByShape />
        <ShopByCategory/>
        <Offers/>
        <ExploreCollections/>
        <Footer/>
      </main>
    </>
  );
}
