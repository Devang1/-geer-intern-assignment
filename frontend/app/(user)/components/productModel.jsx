'use client';
import { useState } from 'react';

export default function ProductModal({ selectedProduct, setSelectedProduct }) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [metalQuality, setMetalQuality] = useState('18K');
  const [ringSize, setRingSize] = useState('6');
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const handleClose = () => setSelectedProduct(null);

  const discountedTotal = selectedProduct.price * quantity;
  const discountAmount = selectedProduct.originalprice - selectedProduct.price;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#111] text-white rounded-xl shadow-2xl max-w-5xl w-full mx-4 p-6 relative overflow-y-auto max-h-[90vh] hide-scrollbar">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-1 right-1 sm:top-4 sm:right-4 text-white hover:text-yellow-400 text-3xl"
        >
          &times;
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full rounded-xl shadow-lg"
          />

          {/* Product Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">
              {selectedProduct.name}
            </h2>

            <div className="flex gap-3 items-center flex-wrap">
              <span className="text-2xl font-bold text-yellow-400">
                ₹{selectedProduct.price.toLocaleString('en-IN')}
              </span>
              <span className="line-through text-gray-500">
                ₹{selectedProduct.originalprice.toLocaleString('en-IN')}
              </span>
              <span className="bg-yellow-900/40 text-yellow-300 px-2 py-1 rounded text-xs">
                SAVE ₹{discountAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <p className="text-sm text-gray-400">
              <strong>Shipping</strong> and discounts calculated at checkout.
            </p>

            {/* Dropdowns */}
            <div className="space-y-3">
              {/* Metal Quality */}
              <div className="flex items-center gap-4">
                <label className="text-md text-gray-300 w-32">Metal Quality</label>
                <select
                  value={metalQuality}
                  onChange={(e) => setMetalQuality(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#1a1a1a] text-white border border-gray-700 rounded-md focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none transition"
                >
                  <option value="14K">14K</option>
                  <option value="18K">18K</option>
                  <option value="22K">22K</option>
                </select>
              </div>

              {/* Ring Size */}
              <div className="flex items-center gap-4">
                <label className="text-md text-gray-300 w-32">Ring Size</label>
                <select
                  value={ringSize}
                  onChange={(e) => setRingSize(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#1a1a1a] text-white border border-gray-700 rounded-md focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none transition"
                >
                  {[5, 6, 7, 8, 9].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <label className="text-md text-gray-300 w-32">Quantity</label>
                <div className="flex items-center bg-[#1a1a1a] border border-gray-700 rounded-md overflow-hidden w-fit">
                  <button
                    onClick={decrementQuantity}
                    className="px-4 py-2 text-white bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    disabled={quantity === 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val > 0) setQuantity(val);
                    }}
                    className="w-12 text-center px-2 py-2 bg-transparent text-white focus:outline-none appearance-none"
                  />
                  <button
                    onClick={incrementQuantity}
                    className="px-4 py-2 text-white bg-gray-700 hover:bg-gray-600 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price Breakdown Button */}
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="bg-white/90 text-black px-6 py-2 rounded-lg font-semibold mt-4 hover:bg-gradient-to-br from-gray-900 to-gray-800 hover:text-white w-full border border-white/30 sm:w-auto"
            >
              Price Breakup
            </button>

            {/* Price Breakdown Section */}
            {showBreakdown && (
              <div className="mt-4 border-t border-white/10 pt-4 text-sm text-white space-y-2">
                <div className="flex justify-between">
                  <span>Original Price (per item)</span>
                  <span>
                    ₹{selectedProduct.originalprice.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-400">
                    - ₹{discountAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Discounted Price (per item)</span>
                  <span>
                    ₹{selectedProduct.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity</span>
                  <span>x {quantity}</span>
                </div>
                <div className="flex justify-between font-semibold text-yellow-400 mt-2 text-base">
                  <span>Total Price</span>
                  <span>₹{discountedTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}

            {/* Buy Now */}
            <div className="pt-4">
              <p className="text-sm text-gray-400">
                Metal Quality:{' '}
                <strong className="text-white">{metalQuality}</strong>
              </p>
              <button className="bg-white/90 text-black px-6 py-2 rounded-lg font-semibold mt-4 hover:bg-gradient-to-br from-gray-900 to-gray-800 hover:text-white w-full border border-white/30 sm:w-auto">
                Buy Now for ₹{discountedTotal.toLocaleString('en-IN')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
