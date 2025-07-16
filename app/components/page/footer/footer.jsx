// components/Footer.tsx
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Customer Service */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-gray-300 transition">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-gray-300 transition">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:text-gray-300 transition">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-gray-300 transition">Returns & Exchanges</Link></li>
              <li><Link href="/track-order" className="hover:text-gray-300 transition">Track Order</Link></li>
            </ul>
          </div>
          
          {/* Shop */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/new-arrivals" className="hover:text-gray-300 transition">New Arrivals</Link></li>
              <li><Link href="/best-sellers" className="hover:text-gray-300 transition">Best Sellers</Link></li>
              <li><Link href="/sale" className="hover:text-gray-300 transition">Sale</Link></li>
              <li><Link href="/gift-cards" className="hover:text-gray-300 transition">Gift Cards</Link></li>
            </ul>
          </div>
          
          {/* About */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">About Us</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-gray-300 transition">Our Story</Link></li>
              <li><Link href="/sustainability" className="hover:text-gray-300 transition">Sustainability</Link></li>
              <li><Link href="/careers" className="hover:text-gray-300 transition">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-gray-300 transition">Blog</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Stay Connected</h3>
            <p className="mb-4 text-gray-400">Subscribe to our newsletter for the latest updates</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l text-gray-900 focus:outline-none"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r transition"
              >
                Subscribe
              </button>
            </form>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebook size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><FaYoutube size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><FaPinterest size={20} /></a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} YourStoreName. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;