import { useState } from 'react';
import { MapPin, Filter, Search, DollarSign, Clock, Star, Briefcase } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface JobOffer {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  distance: string;
  lat: number;
  lng: number;
  budget: string;
  duration: string;
  rating: number;
  postedBy: string;
  avatar: string;
}

export function MapView() {
  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const jobOffers: JobOffer[] = [
    {
      id: 1,
      title: 'Calculus II Tutor Needed',
      category: 'Tutoring',
      description: 'Looking for an experienced tutor to help with Calculus II. Need help with integration techniques and series.',
      location: 'Downtown Campus',
      distance: '0.5 mi',
      lat: 40.7128,
      lng: -74.0060,
      budget: '$30-40/hr',
      duration: 'Ongoing',
      rating: 4.8,
      postedBy: 'Sarah M.',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      title: 'Logo Design for Startup',
      category: 'Design',
      description: 'Need a creative designer to create a modern logo for a tech startup. Prefer someone with experience in minimalist design.',
      location: 'Tech District',
      distance: '1.2 mi',
      lat: 40.7282,
      lng: -74.0776,
      budget: '$100-200',
      duration: '1 week',
      rating: 4.9,
      postedBy: 'Mike Chen',
      avatar: 'https://i.pravatar.cc/150?img=13',
    },
    {
      id: 3,
      title: 'Python Data Analysis Project',
      category: 'Programming',
      description: 'Need help analyzing sales data using Python and creating visualizations with matplotlib.',
      location: 'University Area',
      distance: '0.8 mi',
      lat: 40.7489,
      lng: -73.9680,
      budget: '$150-250',
      duration: '3-5 days',
      rating: 4.7,
      postedBy: 'Emma L.',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: 4,
      title: 'Spanish Essay Proofreading',
      category: 'Writing',
      description: 'Looking for a native Spanish speaker to proofread and edit my 10-page essay on Latin American literature.',
      location: 'West Campus',
      distance: '1.5 mi',
      lat: 40.7614,
      lng: -73.9776,
      budget: '$50-75',
      duration: '2 days',
      rating: 4.6,
      postedBy: 'David R.',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    {
      id: 5,
      title: 'Research Assistant for Psychology Study',
      category: 'Research',
      description: 'Need a reliable student to help collect and organize data for a psychology research project.',
      location: 'Medical Center',
      distance: '2.1 mi',
      lat: 40.7414,
      lng: -74.0055,
      budget: '$20/hr',
      duration: '4 weeks',
      rating: 4.9,
      postedBy: 'Dr. Johnson',
      avatar: 'https://i.pravatar.cc/150?img=14',
    },
    {
      id: 6,
      title: 'Event Photography - Graduation Party',
      category: 'Photography',
      description: 'Looking for a photographer to capture moments at my graduation party. About 3-4 hours of coverage needed.',
      location: 'Riverside Park',
      distance: '1.8 mi',
      lat: 40.7794,
      lng: -73.9632,
      budget: '$200-300',
      duration: '1 day',
      rating: 5.0,
      postedBy: 'Jessica T.',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
  ];

  const categories = ['all', 'Tutoring', 'Design', 'Programming', 'Writing', 'Research', 'Photography'];

  const filteredJobs = filterCategory === 'all' 
    ? jobOffers 
    : jobOffers.filter(job => job.category === filterCategory);

  return (
    <div className="h-screen flex bg-gray-950">
      {/* Sidebar with job listings */}
      <div className="w-full lg:w-2/5 bg-gray-900 overflow-y-auto border-r border-gray-800">
        <div className="p-8 border-b border-gray-800 bg-gray-900/95 sticky top-0 z-10 backdrop-blur-sm">
          <h2 className="text-white mb-6">Local Job Offers</h2>
          
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 overflow-x-auto pb-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-5 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          <div className="text-gray-400 mt-5">
            {filteredJobs.length} opportunities found
          </div>
        </div>

        {/* Job Cards */}
        <div className="divide-y divide-gray-800">
          {filteredJobs.map(job => (
            <button
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`w-full p-8 text-left hover:bg-gray-800/50 transition-all ${
                selectedJob?.id === job.id ? 'bg-gray-800/70 border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white mb-2 text-lg">{job.title}</h3>
                  <div className="inline-block px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 text-sm">
                    {job.category}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white">{job.rating}</span>
                </div>
              </div>

              <p className="text-gray-400 mb-4 line-clamp-2 leading-relaxed">{job.description}</p>

              <div className="flex flex-wrap gap-5 text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{job.location} • {job.distance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span>{job.budget}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{job.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-800">
                <img src={job.avatar} alt={job.postedBy} className="w-8 h-8 rounded-full border-2 border-gray-700" />
                <span className="text-gray-300">Posted by {job.postedBy}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="hidden lg:block flex-1 relative bg-gray-950">
        <div className="w-full h-full relative">
          {/* Mock Map with Image */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1670111482157-c5ecbba142a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY2FtcHVzJTIwYWVyaWFsfGVufDF8fHx8MTc2NTI1MzQ5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Map view"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
          
          {/* Map Pins */}
          <div className="absolute inset-0">
            {filteredJobs.map((job, index) => (
              <div
                key={job.id}
                className="absolute"
                style={{
                  left: `${20 + (index % 3) * 25}%`,
                  top: `${20 + Math.floor(index / 3) * 25}%`,
                }}
              >
                <button
                  onClick={() => setSelectedJob(job)}
                  className={`flex items-center justify-center transition-transform hover:scale-110 ${
                    selectedJob?.id === job.id ? 'scale-125' : ''
                  }`}
                >
                  <div className={`relative ${selectedJob?.id === job.id ? 'animate-pulse' : ''}`}>
                    <MapPin
                      className={`w-12 h-12 ${
                        selectedJob?.id === job.id ? 'text-blue-500 fill-blue-500' : 'text-red-500 fill-red-500'
                      } drop-shadow-2xl filter`}
                    />
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white rounded-full" />
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Selected Job Card Overlay */}
          {selectedJob && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-800 p-8 max-w-lg w-[90%]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white mb-2 text-xl">{selectedJob.title}</h3>
                  <div className="inline-block px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
                    {selectedJob.category}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-white text-lg">{selectedJob.rating}</span>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">{selectedJob.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <span>{selectedJob.budget}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{selectedJob.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-gray-500" />
                  <span>{selectedJob.distance}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                <div className="flex items-center gap-3">
                  <img src={selectedJob.avatar} alt={selectedJob.postedBy} className="w-10 h-10 rounded-full border-2 border-gray-700" />
                  <span className="text-gray-200">{selectedJob.postedBy}</span>
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30">
                  Apply Now
                </button>
              </div>
            </div>
          )}

          {/* Map Controls */}
          <div className="absolute top-6 right-6 bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-800 p-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Filter className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
