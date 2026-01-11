import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-anime-orange/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo Section */}
            <div className="col-span-1">
              <h3 className="text-2xl font-graffiti text-anime-orange mb-4">
                WITTHAYANUKRAO APINUNCHAI
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Full Stack Developer & Data Analysis enthusiast. Passionate about creating innovative web solutions 
                and meaningful digital experiences through code.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold text-white mb-4">Navigation</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-anime-orange transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills/Technologies */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold text-white mb-4">Technologies</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-anime-orange transition-colors duration-300"
                  >
                    React & TypeScript
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-anime-orange transition-colors duration-300"
                  >
                    Python & Data Analysis
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-anime-orange transition-colors duration-300"
                  >
                    Node.js & Express
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-anime-orange transition-colors duration-300"
                  >
                    MySQL & MongoDB
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-anime-orange transition-colors duration-300"
                  >
                    C# & PHP
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="space-y-3">
                <p className="text-gray-400 text-sm">📧 Apinunchai.Wtynk@gmail.com</p>
                <p className="text-gray-400 text-sm">📱 061-551-5815</p>
              </div>
              <div className="flex space-x-4 mt-4">
                <a 
                  href="https://github.com/M4stiffP" 
                  target="_blank"
                  className="w-10 h-10 bg-anime-orange/20 hover:bg-anime-orange rounded-full flex items-center justify-center transition-colors duration-300 group"
                >
                  <span className="text-anime-orange group-hover:text-black font-bold text-xs">GH</span>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-anime-orange/20 hover:bg-anime-orange rounded-full flex items-center justify-center transition-colors duration-300 group"
                >
                  <span className="text-anime-orange group-hover:text-black font-bold text-xs">LI</span>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-anime-orange/20 hover:bg-anime-orange rounded-full flex items-center justify-center transition-colors duration-300 group"
                >
                  <span className="text-anime-orange group-hover:text-black font-bold text-xs">TW</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 WITTHAYANUKRAO APINUNCHAI. All rights reserved. Premium sneakers & streetwear collection.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-anime-orange transition-colors">
                  Shipping Info
                </a>
                <a href="#" className="text-gray-400 hover:text-anime-orange transition-colors">
                  Return Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-anime-orange transition-colors">
                  Size Guide
                </a>
                <a href="#" className="text-gray-400 hover:text-anime-orange transition-colors">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer