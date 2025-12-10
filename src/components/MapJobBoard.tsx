import { useState } from 'react';
import { MapPin, DollarSign, Clock, Briefcase, X, Filter } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  category: string;
  budget: string;
  duration: string;
  location: string;
  description: string;
  postedBy: string;
  distance: string;
  lat: number;
  lng: number;
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Math Tutor Needed for Calculus',
    category: 'Tutoring',
    budget: '$25-35/hr',
    duration: '2-3 hours/week',
    location: 'Downtown Campus',
    description: 'Looking for a patient tutor to help with Calculus I. Prefer someone with teaching experience.',
    postedBy: 'Sarah M.',
    distance: '0.5 mi',
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    title: 'Research Paper - Psychology',
    category: 'Academic Writing',
    budget: '$150-200',
    duration: '1 week',
    location: 'North District',
    description: 'Need help with a 10-page psychology research paper on cognitive development.',
    postedBy: 'John D.',
    distance: '1.2 mi',
    lat: 40.7282,
    lng: -73.9942,
  },
  {
    id: 3,
    title: 'Python Programming Assignment',
    category: 'Programming',
    budget: '$80-120',
    duration: '3 days',
    location: 'Tech Park Area',
    description: 'Help with data structures and algorithms assignment in Python.',
    postedBy: 'Emily R.',
    distance: '2.1 mi',
    lat: 40.7589,
    lng: -73.9851,
  },
  {
    id: 4,
    title: 'Spanish Conversation Partner',
    category: 'Language Learning',
    budget: '$20/hr',
    duration: 'Ongoing',
    location: 'University District',
    description: 'Looking for native Spanish speaker for weekly conversation practice.',
    postedBy: 'Mike L.',
    distance: '0.8 mi',
    lat: 40.7180,
    lng: -73.9974,
  },
  {
    id: 5,
    title: 'Statistics Data Analysis Help',
    category: 'Math & Statistics',
    budget: '$100-150',
    duration: '2 days',
    location: 'Business School Area',
    description: 'Need help analyzing survey data using SPSS for my thesis.',
    postedBy: 'Jessica K.',
    distance: '1.5 mi',
    lat: 40.7350,
    lng: -74.0120,
  },
  {
    id: 6,
    title: 'Chemistry Lab Report Review',
    category: 'Science',
    budget: '$50-75',
    duration: '1 day',
    location: 'Science Building',
    description: 'Looking for someone to review and provide feedback on organic chemistry lab report.',
    postedBy: 'David P.',
    distance: '0.3 mi',
    lat: 40.7200,
    lng: -74.0050,
  },
];

export function MapJobBoard() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [hoveredJobId, setHoveredJobId] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Tutoring', 'Academic Writing', 'Programming', 'Language Learning', 'Math & Statistics', 'Science'];

  const filteredJobs = filterCategory === 'All' 
    ? mockJobs 
    : mockJobs.filter(job => job.category === filterCategory);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-gray-900">Local Job Map</h1>
            <p className="text-gray-600">Find academic services near you</p>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-indigo-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Job List Sidebar */}
        <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="text-sm text-gray-600">
              {filteredJobs.length} jobs found nearby
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedJob?.id === job.id ? 'bg-indigo-50' : 
                  hoveredJobId === job.id ? 'bg-gray-50' : 'bg-white'
                }`}
                onClick={() => setSelectedJob(job)}
                onMouseEnter={() => setHoveredJobId(job.id)}
                onMouseLeave={() => setHoveredJobId(null)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-gray-900 flex-1">
                    {job.title}
                  </h3>
                  <span className="text-sm text-indigo-600 ml-2">{job.distance}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {job.category}
                  </span>
                </div>
                
                <div className="space-y-1 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.budget}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{job.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-gray-100">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
            {/* Grid pattern to simulate map */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
            
            {/* Mock map labels */}
            <div className="absolute top-1/4 left-1/4 text-gray-500 text-sm opacity-50">Downtown</div>
            <div className="absolute top-1/3 right-1/3 text-gray-500 text-sm opacity-50">University District</div>
            <div className="absolute bottom-1/3 left-1/2 text-gray-500 text-sm opacity-50">Tech Park</div>
            
            {/* Job Markers */}
            {filteredJobs.map((job, index) => {
              const top = 20 + (index * 15) % 60;
              const left = 15 + (index * 20) % 70;
              const isSelected = selectedJob?.id === job.id;
              const isHovered = hoveredJobId === job.id;
              
              return (
                <div
                  key={job.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all cursor-pointer ${
                    isSelected ? 'z-20 scale-110' : isHovered ? 'z-10 scale-105' : 'z-0'
                  }`}
                  style={{ top: `${top}%`, left: `${left}%` }}
                  onClick={() => setSelectedJob(job)}
                  onMouseEnter={() => setHoveredJobId(job.id)}
                  onMouseLeave={() => setHoveredJobId(null)}
                >
                  {/* Marker Pin */}
                  <div className={`relative ${isSelected || isHovered ? 'animate-bounce' : ''}`}>
                    <div className={`w-8 h-8 rounded-full shadow-lg flex items-center justify-center ${
                      isSelected ? 'bg-indigo-600' : 'bg-white border-2 border-indigo-500'
                    }`}>
                      <MapPin className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />
                    </div>
                    {/* Price badge */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap">
                      {job.budget}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Job Detail Panel */}
          {selectedJob && (
            <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl shadow-2xl p-6 max-w-2xl">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl text-gray-900 mb-2">
                    {selectedJob.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {selectedJob.category}
                    </span>
                    <span className="text-gray-500 text-sm">Posted by {selectedJob.postedBy}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <DollarSign className="w-5 h-5 text-indigo-600" />
                    <div>
                      <div className="text-xs text-gray-500">Budget</div>
                      <div>{selectedJob.budget}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <div>
                      <div className="text-xs text-gray-500">Duration</div>
                      <div>{selectedJob.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                    <div>
                      <div className="text-xs text-gray-500">Distance</div>
                      <div>{selectedJob.distance}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Description</div>
                  <p className="text-gray-700">{selectedJob.description}</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                    Apply Now
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors">
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Map Controls */}
          <div className="absolute top-6 right-6 bg-white rounded-lg shadow-lg p-2 space-y-2">
            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded">
              +
            </button>
            <div className="border-t border-gray-200" />
            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded">
              −
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
