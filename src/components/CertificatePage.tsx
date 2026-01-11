import React from 'react'
import { Link } from 'react-router-dom'

const CertificatePage: React.FC = () => {
  const certificates = [
    {
      id: 1,
      title: "Mahidol AI Certificate",
      image: "/images/certificate/mahidol_ai.png",
      description: "Artificial Intelligence certification from Mahidol University demonstrating proficiency in AI concepts, machine learning algorithms, and practical applications in technology development.",
      date: "2024",
      category: "Academic"
    },
    {
      id: 2,
      title: "UX/UI Design Certificate", 
      image: "/images/certificate/UxUi_Cer.png",
      description: "User Experience and User Interface Design certification showcasing skills in design principles, user research, wireframing, prototyping, and creating intuitive digital experiences.",
      date: "2024",
      category: "Professional"
    }
  ]

  return (
    <section 
      className="min-h-screen py-20 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/background02.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-anime-orange rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-anime-gold rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-graffiti text-anime-orange mb-4">
              MY CERTIFICATES
            </h1>
            <div className="w-24 h-1 bg-anime-gold mx-auto"></div>
            <p className="text-gray-300 mt-6 text-lg">
              Academic achievements and professional certifications
            </p>
          </div>

          {/* Certificates Gallery */}
          <div className="space-y-16">
            {certificates.map((cert, index) => (
              <div key={cert.id} className="grid md:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className={index % 2 === 0 ? "order-1" : "order-2"}>
                  <div className="relative group cursor-pointer">
                    <img 
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-auto object-contain rounded-lg shadow-2xl border-2 border-anime-orange/30 transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 0 ? "order-2" : "order-1"}>
                  <div className={`bg-gradient-to-${index % 2 === 0 ? 'r' : 'l'} from-anime-${index % 2 === 0 ? 'orange' : 'gold'}/10 to-transparent p-8 rounded-lg border-${index % 2 === 0 ? 'l' : 'r'}-4 border-anime-${index % 2 === 0 ? 'orange' : 'gold'}`}>
                    <div className="flex items-center mb-4">
                      <span className={`px-3 py-1 text-xs font-semibold bg-anime-${index % 2 === 0 ? 'orange' : 'gold'}/20 text-anime-${index % 2 === 0 ? 'orange' : 'gold'} rounded-full`}>
                        {cert.category}
                      </span>
                      <span className="text-gray-400 text-sm ml-4">{cert.date}</span>
                    </div>
                    
                    <h3 className={`text-3xl font-graffiti text-anime-${index % 2 === 0 ? 'gold' : 'orange'} mb-4`}>
                      {cert.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {cert.description}
                    </p>
                    
                    <div className={`flex items-center text-anime-${index % 2 === 0 ? 'orange' : 'gold'} font-semibold`}>
                      <span className={`w-8 h-px bg-anime-${index % 2 === 0 ? 'orange' : 'gold'} mr-4`}></span>
                      Certificate • Achievement • Recognition
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back to Home Button */}
          <div className="text-center mt-16">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-anime-orange/20 hover:bg-anime-orange text-white rounded-lg transition-colors duration-300 border border-anime-orange/30 hover:border-anime-orange"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CertificatePage