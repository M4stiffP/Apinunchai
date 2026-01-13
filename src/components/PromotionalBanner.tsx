import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PromotionalBanner.module.css';

const PromotionalBanner: React.FC = () => {
  const navigate = useNavigate();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current active certificate

  // Certificate banners - All from certificate folder
  const banners: Array<{
    src: string;
    title: string;
    subtitle?: string;
    featured?: boolean;
  }> = [
    { 
      src: '/images/certificate/Cerificatehtml.png', 
      title: "FutureSkill Certificate in create your website's visualization using HTML. Course",
      subtitle: 'Zero to functional web pages - The "skeleton" of web development',
      featured: true
    },
    { 
      src: '/images/certificate/javaScript.png', 
      title: 'FutureSkill Certificate in JavaScript Course',
      subtitle: 'Master Web Interactivity - The "muscles" of websites'
    },
    { 
      src: '/images/certificate/mahidol_ai.png', 
      title: 'Mahidol AI Certificate',
      subtitle: 'AI & Prompt Engineering'
    },
    { 
      src: '/images/certificate/UxUi_Cer.png', 
      title: 'UX/UI Design Certificate',
      subtitle: 'User Experience Design'
    },
    { 
      src: '/images/certificate/CerificateC.png', 
      title: 'FutureSkill Certificate in Coding C Languages Course',
      subtitle: 'Master Fundamentals - Perfect foundation for any language'
    },
    { 
      src: '/images/certificate/Cerificatepython.png', 
      title: 'FutureSkill Certificate in UpSkill Python Programming Course',
      subtitle: 'Path to Developer - Master Python with Ph.D. expert'
    }
  ];

  const handleBannerClick = () => {
    navigate('/certificates');
  };

  // Smooth scroll function
  const slide = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      // Scroll amount based on card width + gap
      const scrollAmount = 350; 
      
      if (direction === 'left') {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  // Handle direct page change when clicking pagination button
  const handlePageChange = (index: number) => {
    setCurrentIndex(index);
    
    // Scroll to specific certificate
    if (sliderRef.current) {
      const scrollAmount = index * 350; // Card width + gap
      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll tracking to update current index
  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      // Calculate which certificate is currently in view
      const newIndex = Math.round(scrollLeft / 350);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < banners.length) {
        setCurrentIndex(newIndex);
      }
    }
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Modern Certificate Slider */}
          <div className="relative bg-gradient-to-r from-black/80 to-gray-900/80 rounded-xl overflow-hidden border border-anime-orange/30 shadow-2xl">
            
            {/* Fade overlays for visual depth */}
            <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none"></div>

            {/* Left Navigation Button */}
            <button
              onClick={() => slide('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-anime-orange/80 hover:bg-anime-orange text-white rounded-full z-20 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center shadow-lg"
              aria-label="Previous certificates"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Scrollable Certificate Container */}
            <div 
              ref={sliderRef}
              className={`flex gap-6 overflow-x-auto scroll-smooth p-8 ${styles.scrollbarHide}`}
              onScroll={handleScroll}
            >
              {banners.map((banner, index) => (
                <div
                  key={index}
                  onClick={handleBannerClick}
                  className="flex-none w-80 h-60 bg-gray-800/50 rounded-lg overflow-hidden cursor-pointer group transition-all duration-500 hover:scale-105 hover:bg-gray-700/50 border border-anime-gold/20 hover:border-anime-orange"
                >
                  {/* Certificate Image */}
                  <div className="relative h-full">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${banner.src})`,
                        backgroundColor: '#2a2a2a',
                        backgroundSize: banner.src.includes('certificate') ? 'contain' : 'cover'
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Certificate Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center mb-2">
                        <h3 className="text-white font-bold text-lg group-hover:text-anime-orange transition-colors">
                          {banner.title}
                        </h3>
                        {banner.featured && (
                          <span className="ml-2 px-2 py-0.5 bg-anime-orange text-white text-xs rounded-full animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>
                      {banner.subtitle && (
                        <p className="text-gray-300 text-sm mb-2">{banner.subtitle}</p>
                      )}
                      <p className="text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to view all certificates →
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Navigation Button */}
            <button
              onClick={() => slide('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-anime-orange/80 hover:bg-anime-orange text-white rounded-full z-20 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center shadow-lg"
              aria-label="Next certificates"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* X-Shaped Pagination Buttons */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 z-20">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index)}
                  className="bg-transparent border-none cursor-pointer p-1 transition-transform duration-200 ease-in-out hover:scale-110 flex items-center justify-center"
                  aria-label={`Go to certificate ${index + 1}`}
                  title={banners[index].title}
                >
                  {/* X SVG Icon */}
                  <svg 
                    viewBox="0 0 24 24" 
                    className={`w-7 h-7 transition-all duration-300 ${
                      index === currentIndex
                        ? 'fill-white stroke-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] scale-125 hover:fill-anime-orange hover:stroke-anime-orange'
                        : 'fill-transparent stroke-white hover:stroke-anime-orange'
                    }`}
                    style={{
                      strokeWidth: '4px',
                      strokeLinejoin: 'round',
                      strokeLinecap: 'square'
                    }}
                  >
                    <path d="M 6 6 L 18 18 M 18 6 L 6 18" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;