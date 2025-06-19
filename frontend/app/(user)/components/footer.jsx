'use client';

export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300 pt-10 pb-6 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/10 pb-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-semibold text-white">Geer.in</h2>
          <p className="mt-2 text-sm text-gray-400">
            Crafted elegance, timeless luxury. Discover your sparkle with us.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-yellow-400 font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="/shop" className="hover:text-yellow-400 transition">Shop</a></li>
            <li><a href="/about" className="hover:text-yellow-400 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-yellow-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="text-yellow-400 font-semibold mb-3">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-yellow-400 transition">FAQs</a></li>
            <li><a href="/returns" className="hover:text-yellow-400 transition">Return Policy</a></li>
            <li><a href="/shipping" className="hover:text-yellow-400 transition">Shipping Info</a></li>
            <li><a href="/terms" className="hover:text-yellow-400 transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-yellow-400 font-semibold mb-3">Contact Us</h3>
          <p className="text-sm mb-1">📍 123 Luxury Street, Mumbai, India</p>
          <p className="text-sm mb-1">📞 +91 98765 43210</p>
          <p className="text-sm mb-3">✉️ support@geer.com</p>
          <div className="flex gap-4 mt-2 text-lg">
            <a href="#" className="hover:text-yellow-400 transition">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <i className="fab fa-instagram" />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <i className="fab fa-whatsapp" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} Geer.in . All rights reserved.
      </div>
    </footer>
  );
}
