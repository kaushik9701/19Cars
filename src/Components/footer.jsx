import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Created by <span className="font-semibold">KaushikBandi</span></p>
        <a
          href="https://www.linkedin.com/in/kaushik-reddy-bandi-1ba624257/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 transition text-sm mt-2 md:mt-0"
        >
          LinkedIn Profile
        </a>
      </div>
    </footer>
  );
};

export default Footer;
