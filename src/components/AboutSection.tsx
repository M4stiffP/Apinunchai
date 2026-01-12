import React from 'react'
import { useIntersectionObserver } from '../hooks/useScrollEffects'

const AboutSection: React.FC = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver()

  return (
    <section 
      id="about" 
      ref={targetRef}
      className="py-20 relative"
      style={{
        backgroundImage: 'url(/images/background01.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className={`text-center mb-16 transition-all duration-1000 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-graffiti text-anime-orange mb-4">
              ABOUT ME
            </h2>
            <div className="w-24 h-1 bg-anime-gold mx-auto"></div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className={`space-y-6 transition-all duration-1000 delay-300 ${
              hasIntersected ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                I am <span className="text-anime-orange font-semibold">Apinunchai Witthayanukrao</span>, a Mathematics with Computer Science student at <span className="text-anime-gold">King Mongkut's University of Technology North Bangkok</span> with a GPA of <span className="text-anime-orange">3.77</span>. I am passionate about <span className="text-white font-medium">Full Stack Development and Data Analysis</span>, currently seeking an internship opportunity to apply my technical skills in a professional environment.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Through my academic coursework and personal projects, I have built a strong foundation in <span className="text-anime-gold">Computer Science and Mathematics</span>. My technical skill set includes <span className="text-white font-medium">JavaScript, TypeScript, Python, C#, and PHP</span>. I have a keen interest in modern web technologies, particularly <span className="text-anime-orange">React.js and Node.js</span>, and have practical experience managing databases such as <span className="text-anime-gold">MySQL and MongoDB</span>.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                I am a <span className="text-anime-orange font-medium">fast learner</span> who is eager to adapt to new technologies and workflows. Whether developing <span className="text-white">e-commerce platforms</span>, building <span className="text-anime-gold">data-driven applications</span>, or designing games, I approach every task with <span className="text-anime-orange">attention to detail</span> and a commitment to delivering <span className="text-white font-medium">high-quality work</span>. I am ready to contribute to the team while further developing my skills as a developer.
              </p>
              
              {/* Programming Languages */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-6 bg-black/50 rounded-lg border border-anime-orange/30 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl mb-2">⚛️</div>
                  <div className="text-sm text-anime-orange font-semibold">React & JavaScript</div>
                  <div className="text-xs text-gray-400 mt-1">Frontend Development</div>
                </div>
                <div className="text-center p-6 bg-black/50 rounded-lg border border-anime-gold/30 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl mb-2">🐍</div>
                  <div className="text-sm text-anime-gold font-semibold">Python & C#</div>
                  <div className="text-xs text-gray-400 mt-1">Backend & Data Analysis</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className={`relative transition-all duration-1000 delay-500 ${
              hasIntersected ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <img 
                src="/images/card.png" 
                alt="Apinunchai Witthayanukrao Profile" 
                className="w-full h-auto rounded-lg shadow-2xl border-2 border-anime-orange/30 transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
            </div>
          </div>

          {/* Additional Info */}
          <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-gradient-to-r from-anime-orange/10 to-anime-gold/10 p-6 sm:p-8 rounded-lg border border-anime-orange/30">
              <h3 className="text-xl sm:text-2xl font-bold text-anime-gold mb-4">Development Philosophy</h3>
              <p className="text-sm sm:text-base text-gray-300 max-w-3xl mx-auto">
                My development philosophy is rooted in adaptive learning. I believe that mastery begins with imitation—studying successful patterns to understand the 'why' and 'how.' I don't just replicate; I analyze, adapt, and improve. This mindset drives me to never stop learning and never stop evolving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection