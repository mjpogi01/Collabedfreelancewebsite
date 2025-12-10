import { Search, MapPin, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-36 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 backdrop-blur-sm">
              <MapPin className="w-5 h-5" />
              <span>Find Local Academic Talent</span>
            </div>
            
            <h1 className="text-white leading-tight">
              Connect with Students & Instructors in Your Area
            </h1>
            
            <p className="text-gray-400 max-w-lg text-lg leading-relaxed">
              CollabEd is the localized freelance platform connecting students and instructors with those who need academic skills, tutoring, content creation, and more. Find talent near you.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1 relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search services or skills..."
                  className="w-full pl-14 pr-5 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 backdrop-blur-sm"
                />
              </div>
              <div className="relative sm:w-56">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-14 pr-5 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 backdrop-blur-sm"
                />
              </div>
              <button className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50">
                Search
              </button>
            </div>

            <div className="flex items-center gap-8 pt-6">
              <div>
                <div className="text-white text-2xl">10,000+</div>
                <div className="text-gray-500 mt-1">Active Students</div>
              </div>
              <div className="h-16 w-px bg-gray-800" />
              <div>
                <div className="text-white text-2xl">500+</div>
                <div className="text-gray-500 mt-1">Instructors</div>
              </div>
              <div className="h-16 w-px bg-gray-800" />
              <div>
                <div className="text-white text-2xl">50+</div>
                <div className="text-gray-500 mt-1">Local Areas</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1520569495996-b5e1219cb625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzY1MjUwODc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students collaborating"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-8 -left-8 bg-gray-800/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                  <TrendingUp className="w-7 h-7 text-green-400" />
                </div>
                <div>
                  <div className="text-white text-xl">5,000+</div>
                  <div className="text-gray-400 mt-0.5">Gigs Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
