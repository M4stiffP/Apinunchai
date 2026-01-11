import React from 'react'

const StorySection: React.FC = () => {
  return (
    <section 
      id="story" 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/background02.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black/70"></div>
      {/* Background Effects - Reduced opacity since we have image background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-anime-orange rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-anime-gold rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-graffiti text-anime-orange mb-4">
              MY PROJECTS
            </h2>
            <div className="w-24 h-1 bg-anime-gold mx-auto"></div>
            <p className="text-gray-300 mt-6 text-lg">
              Explore my journey through various development projects and achievements
            </p>
          </div>

          {/* Projects Timeline */}
          <div className="space-y-16">
            {/* Project 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-r from-anime-orange/10 to-transparent p-8 rounded-lg border-l-4 border-anime-orange">
                  <h3 className="text-3xl font-graffiti text-anime-gold mb-4">WEB APPLICATION</h3>
                  <h4 className="text-xl text-anime-orange mb-4">E-Commerce Shoe Website</h4>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Developed a full-stack online shoe store using HTML, Tailwind CSS, TypeScript, React, and CSS. 
                    Features modern UI/UX design, product management system, and shopping cart functionality. 
                    This project demonstrates my ability to create responsive and user-friendly e-commerce solutions.
                  </p>
                  <div className="flex items-center text-anime-orange font-semibold">
                    <span className="w-8 h-px bg-anime-orange mr-4"></span>
                    React • TypeScript • Tailwind CSS
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src="/images/photobanner01.png" 
                  alt="E-Commerce Website Project" 
                  className="w-full h-64 object-cover rounded-lg shadow-2xl border border-anime-orange/30"
                />
              </div>
            </div>

            {/* Project 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/images/photobanner02.png" 
                  alt="Pet Sales Database System" 
                  className="w-full h-64 object-cover rounded-lg shadow-2xl border border-anime-gold/30"
                />
              </div>
              <div>
                <div className="bg-gradient-to-l from-anime-gold/10 to-transparent p-8 rounded-lg border-r-4 border-anime-gold">
                  <h3 className="text-3xl font-graffiti text-anime-orange mb-4">DATA PROGRAMMING</h3>
                  <h4 className="text-xl text-anime-gold mb-4">Pet Sales Database System</h4>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Built a comprehensive online pet sales system using C# and SQL. Designed and developed 
                    database schemas for pet management, created inventory management system, and implemented 
                    order processing. Learned database connectivity with applications and data-driven development.
                  </p>
                  <div className="flex items-center text-anime-gold font-semibold">
                    <span className="w-8 h-px bg-anime-gold mr-4"></span>
                    C# • SQL • Database Design
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-r from-anime-red/10 to-transparent p-8 rounded-lg border-l-4 border-anime-red">
                  <h3 className="text-3xl font-graffiti text-anime-gold mb-4">GAME DEVELOPMENT</h3>
                  <h4 className="text-xl text-anime-red mb-4">Battle City & Breakout Games</h4>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Developed classic arcade games using Object-Oriented Programming principles. 
                    Battle City features design patterns, class inheritance, game logic, and collision detection. 
                    Breakout game includes event handling and game loop implementation. Focus on memory management and performance optimization.
                  </p>
                  <div className="flex items-center text-anime-red font-semibold">
                    <span className="w-8 h-px bg-anime-red mr-4"></span>
                    OOP • Game Logic • Performance
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src="/images/photobanner03.png" 
                  alt="Game Development Projects" 
                  className="w-full h-64 object-cover rounded-lg shadow-2xl border border-anime-red/30"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default StorySection