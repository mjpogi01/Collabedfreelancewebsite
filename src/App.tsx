import { useState } from 'react';
import { MapPin, Search, GraduationCap, Users, Star, Menu, X } from 'lucide-react';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { ServiceCategories } from './components/ServiceCategories';
import { MapView } from './components/MapView';
import { FeaturedOpportunities } from './components/FeaturedOpportunities';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'map'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navigation */}
      <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-9 h-9 text-blue-500" />
              <span className="text-white text-xl">CollabEd</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              <button
                onClick={() => setCurrentPage('home')}
                className={`transition-colors ${
                  currentPage === 'home' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage('map')}
                className={`transition-colors flex items-center gap-2 ${
                  currentPage === 'map' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Map View
              </button>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Browse Services
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                How It Works
              </a>
              <button className="px-6 py-2.5 text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-500/10 transition-colors">
                Sign In
              </button>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-gray-800">
              <div className="flex flex-col gap-5">
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left ${
                    currentPage === 'home' ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('map');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left flex items-center gap-2 ${
                    currentPage === 'map' ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  Map View
                </button>
                <a href="#" className="text-gray-300">
                  Browse Services
                </a>
                <a href="#" className="text-gray-300">
                  How It Works
                </a>
                <button className="px-6 py-2.5 text-blue-400 border border-blue-500/50 rounded-lg text-left">
                  Sign In
                </button>
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {currentPage === 'home' ? (
          <>
            <Hero />
            <HowItWorks />
            <ServiceCategories />
            <FeaturedOpportunities />
            <Testimonials />
          </>
        ) : (
          <MapView />
        )}
      </main>

      <Footer />
    </div>
  );
}