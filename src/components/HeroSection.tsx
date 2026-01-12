import React, { useState, useEffect } from 'react';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-[200vh] overflow-hidden">
      {/* Main Background - Full size background01 from top */}
      <div className="absolute inset-0">
        {/* Background01 Image - Full size covering entire screen */}
        <div 
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/background01.png)'
          }}
        ></div>
        
        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Central Shoe Image - Reduced size with top spacing and shadow */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pt-20">
        <img 
          src="/images/card.png" 
          alt="Apinunchai Witthayanukrao Portfolio" 
          className="w-[480px] sm:w-[560px] md:w-[720px] lg:w-[880px] xl:w-[1040px] 2xl:w-[1200px] h-auto object-contain opacity-95 drop-shadow-2xl filter shadow-2xl"
        />
      </div>

      {/* WITTHAYANUKRAO APINUNCHAI Title - Positioned below the card */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className={`text-[3.9rem] sm:text-[5.2rem] lg:text-[7.8rem] xl:text-[9.1rem] 2xl:text-[10.4rem] font-black leading-[0.8] tracking-tighter text-shadow-extreme text-center transform transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="block text-white drop-shadow-2xl">WITTHAYANUKRAO</span>
          <span className="block text-red-500 -mt-8 drop-shadow-2xl">APINUNCHAI</span>
        </h1>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4 z-30">
        <div className="writing-mode-vertical text-white font-bold tracking-[0.3em] text-sm rotate-180 opacity-80">
          SCROLL
        </div>
        <div className="flex flex-col space-y-1">
          <div className="w-0.5 h-8 bg-red-500"></div>
          <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[8px] border-l-transparent border-r-transparent border-t-red-500"></div>
          <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[8px] border-l-transparent border-r-transparent border-t-red-500"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;