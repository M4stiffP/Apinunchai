import React, { useState } from 'react'

const CharactersSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const pdfDocuments = [
    {
      title: 'Resume - Data Engineer (English)',
      description: 'Professional resume tailored for Data Engineering positions, highlighting technical skills in Python, SQL, data pipeline development, and big data technologies.',
      fileName: 'Apinunchai_Wtynk_Resume_Data_Eng.pdf',
      badge: 'RECOMMENDED',
      icon: '📊',
      category: 'Data Engineering'
    },
    {
      title: 'Resume - Data Engineer (Thai)',
      description: 'เรซูเม่ภาษาไทยสำหรับตำแหน่ง Data Engineer แสดงทักษะด้านการวิเคราะห์ข้อมูล Python, SQL, การจัดการฐานข้อมูล และเทคโนโลยี Big Data',
      fileName: 'Apinunchai_Wtynk_Resume_Data_Thai.pdf',
      badge: 'FEATURED',
      icon: '🇹🇭📊',
      category: 'Data Engineering'
    },
    {
      title: 'Resume - Developer (English)', 
      description: 'Comprehensive resume focusing on Full Stack Development skills, including React, TypeScript, Node.js, database management, and modern web technologies.',
      fileName: 'Apinunchai_Wtynk_Resume_Dev_Eng.pdf',
      badge: 'POPULAR',
      icon: '💻',
      category: 'Software Development'
    },
    {
      title: 'Resume - Developer (Thai)',
      description: 'เรซูเม่ภาษาไทยสำหรับตำแหน่งนักพัฒนา แสดงทักษะการเขียนโปรแกรม การพัฒนาเว็บแอปพลิเคชัน และโปรเจกต์ต่างๆ ที่ผ่านมา',
      fileName: 'Apinunchai_Wtynk_Resume_Dev_Thai.pdf',
      badge: 'LATEST',
      icon: '🇹🇭',
      category: 'Software Development'
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pdfDocuments.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + pdfDocuments.length) % pdfDocuments.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section id="downloads" className="py-20 bg-section-pattern bg-cover bg-center bg-fixed relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-graffiti text-anime-orange mb-4">
              RESUME DOWNLOADS
            </h2>
            <div className="w-24 h-1 bg-anime-gold mx-auto"></div>
            <p className="text-gray-300 mt-6 text-lg">
              Download my professional resumes in different formats
            </p>
          </div>

          {/* PDF Download Cards Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-anime-orange/80 hover:bg-anime-orange rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-300 hover:scale-110"
            >
              ←
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-anime-orange/80 hover:bg-anime-orange rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-300 hover:scale-110"
            >
              →
            </button>

            {/* Cards Container */}
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {pdfDocuments.map((doc, index) => (
                  <div 
                    key={doc.fileName}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="group relative h-96 max-w-md mx-auto">
                      {/* Front Side - Always Visible */}
                      <div className="absolute inset-0 bg-black/60 rounded-lg overflow-hidden border border-anime-orange/30 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95">
                        {/* Document Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            doc.badge === 'RECOMMENDED' ? 'bg-green-500 text-white' :
                            doc.badge === 'FEATURED' ? 'bg-red-500 text-white' :
                            doc.badge === 'POPULAR' ? 'bg-blue-500 text-white' :
                            'bg-purple-500 text-white'
                          }`}>
                            {doc.badge}
                          </span>
                        </div>

                        {/* Document Icon */}
                        <div className="relative h-48 flex items-center justify-center bg-gradient-to-br from-anime-orange/20 to-anime-gold/20">
                          <div className="text-8xl mb-4">{doc.icon}</div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        </div>

                        {/* Document Info */}
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-anime-gold mb-2">
                            {doc.title}
                          </h3>
                          <div className="text-sm text-anime-orange mb-2">
                            {doc.category}
                          </div>
                          <div className="text-xs text-gray-300">
                            hover to view details & download
                          </div>
                        </div>
                      </div>

                      {/* Back Side - Show on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-anime-orange/90 to-anime-gold/90 rounded-lg p-6 flex flex-col justify-between border border-anime-orange opacity-0 scale-105 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                        <div>
                          <h3 className="text-xl font-bold text-black mb-4">
                            {doc.title}
                          </h3>
                          <p className="text-black/80 text-sm leading-relaxed mb-4">
                            {doc.description}
                          </p>
                          <div className="text-sm font-semibold text-black mb-2">
                            Category: {doc.category}
                          </div>
                        </div>
                        
                        <a 
                          href={`/pdf/${doc.fileName}`}
                          download={doc.fileName}
                          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-center inline-block"
                        >
                          📥 Download PDF
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {pdfDocuments.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-anime-orange scale-125' 
                      : 'bg-gray-500 hover:bg-anime-orange/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CharactersSection