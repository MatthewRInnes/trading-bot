import React from 'react';

// Main navigation bar component
// Displays the logo and navigation links for the website
const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo section with image and title */}
        <div className="flex items-center">
          <img 
            src="/assets/newmi.png" 
            alt="Trading Bot Logo" 
            className="logo mr-2" 
          />
          <span className="text-white text-xl font-bold">Trading Bot</span>
        </div>

        {/* Navigation links for main sections */}
        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-gray-300 hover:text-white">Dashboard</a>
          <a href="/trading" className="text-gray-300 hover:text-white">Trading</a>
          <a href="/analysis" className="text-gray-300 hover:text-white">Analysis</a>
          <a href="/settings" className="text-gray-300 hover:text-white">Settings</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 