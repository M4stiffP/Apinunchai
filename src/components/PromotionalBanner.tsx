import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PromotionalBanner: React.FC = () => {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true); // Track if at starting position

  // Certificate banners - All from certificate folder
  const banners = [
    { src: '/images/certificate/mahidol_ai.png', title: 'Mahidol AI Certificate' },
    { src: '/images/certificate/UxUi_Cer.png', title: 'UX/UI Design Certificate' }
  ];

  const handleBannerClick = () => {
    navigate('/certificates')
  }

  const nextSlide = () => {
    if (isAtStart) {
      // Move right to next image
      setCurrentIndex(1);
      setIsAtStart(false);
    } else {
      // Go back to start
      setCurrentIndex(0);
      setIsAtStart(true);
    }
  };

  const prevSlide = () => {
    if (isAtStart) {
      // Move left to previous image (last image)
      setCurrentIndex(banners.length - 1);
      setIsAtStart(false);
    } else {
      // Go back to start
      setCurrentIndex(0);
      setIsAtStart(true);
    }
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-[9xl] mx-auto">
          {/* Enlarged Image Banner with Spacing - 1.5x size width and height */}
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden group rounded-lg border-2 border-red-500/50 shadow-2xl">
            
            {/* Continuous Images Strip with Wider 3 Images Display and Gap */}
            <div 
              className="flex absolute inset-0 transition-transform duration-1000 ease-in-out gap-2 sm:gap-4 lg:gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100/2.5)}%)`,
                width: `${(banners.length + 2) * (100/2.5)}%`,
                paddingLeft: '1rem',
                paddingRight: '1rem'
              }}
            >
          {/* Duplicate first image at the end for seamless loop */}
          {[...banners, banners[0]].map((banner, index) => (
            <div
              key={index}
              onClick={handleBannerClick}
              className="relative flex-none h-full cursor-pointer rounded-lg overflow-hidden shadow-lg"
              style={{ 
                width: `calc(${100 / (banners.length + 1)}% - 0.5rem)`,
                minWidth: '250px'
              }}
            >
              {/* Full Image Coverage with Better Hover Effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 hover:scale-105"
                style={{
                  backgroundImage: `url(${banner.src})`,
                  backgroundColor: '#2a2a2a',
                  backgroundSize: banner.src.includes('certificate') ? 'contain' : 'cover'
                }}
              />
              
              {/* Certificate Label Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-sm font-semibold">{banner.title}</p>
                <p className="text-gray-300 text-xs">Click to view all certificates</p>
              </div>
              
              {/* Image Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 rounded-lg" />
              
              {/* Active Image Border - only show for original images */}
              {index < banners.length && index === currentIndex && (
                <div className="absolute inset-0 ring-4 ring-red-500 ring-opacity-90 pointer-events-none rounded-lg"></div>
              )}
            </div>
          ))}
        </div>
        {/* Navigation Controls - Simple Toggle Between Start and End */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center space-x-2 sm:space-x-3 z-20">
          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full transition-all duration-200 ease-in-out shadow-lg flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-bold bg-white text-black hover:bg-gray-100 hover:scale-110 active:scale-95"
            aria-label="Toggle Slide Left"
            title="เลื่อนซ้าย/กลับ"
          >
            ←
          </button>
          
          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full transition-all duration-200 ease-in-out shadow-lg flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-bold bg-white text-black hover:bg-gray-100 hover:scale-110 active:scale-95"
            aria-label="Toggle Slide Right"
            title="เลื่อนขวา/กลับ"
          >
            →
          </button>
        </div>

        {/* Bottom Position Indicators - Disabled */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 h-2 bg-red-500 rounded-full' 
                  : 'w-2 h-2 bg-white/60 rounded-full'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800/30">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-1000"
            style={{ width: `${((currentIndex + 1) / banners.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default PromotionalBanner;