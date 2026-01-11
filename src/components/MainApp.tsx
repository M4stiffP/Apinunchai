import React from 'react'
import Header from './Header'
import HeroSection from './HeroSection'
import PromotionalBanner from './PromotionalBanner'
import VideoDisplay from './VideoDisplay'
import AboutSection from './AboutSection'
import StorySection from './StorySection'
import CharactersSection from './CharactersSection'
import Footer from './Footer'
import BackToTop from './BackToTop'
import SupportChatWidget from './chat/SupportChatWidget'

const MainApp: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PromotionalBanner />
        <VideoDisplay />
        <AboutSection />
        <StorySection />
        <CharactersSection />
      </main>
      <Footer />
      <BackToTop />
      <SupportChatWidget />
    </>
  )
}

export default MainApp