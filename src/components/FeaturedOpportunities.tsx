import { MapPin, DollarSign, Clock, Star, Bookmark, Zap } from 'lucide-react';

export function FeaturedOpportunities() {
  const opportunities = [
    {
      id: 1,
      title: 'Chemistry Lab Report Writing',
      category: 'Academic Writing',
      budget: '$80-120',
      duration: '3 days',
      location: 'Science Building',
      distance: '1.2 mi',
      rating: 4.9,
      applicants: 12,
      postedBy: 'Prof. Anderson',
      avatar: 'https://i.pravatar.cc/150?img=33',
      urgent: true,
    },
    {
      id: 2,
      title: 'Website Development for Student Org',
      category: 'Programming',
      budget: '$300-500',
      duration: '2 weeks',
      location: 'Student Center',
      distance: '0.5 mi',
      rating: 4.8,
      applicants: 8,
      postedBy: 'Alex Martinez',
      avatar: 'https://i.pravatar.cc/150?img=15',
      urgent: false,
    },
    {
      id: 3,
      title: 'Statistics Homework Help',
      category: 'Tutoring',
      budget: '$35/hr',
      duration: 'Ongoing',
      location: 'Library',
      distance: '0.3 mi',
      rating: 5.0,
      applicants: 15,
      postedBy: 'Nina Patel',
      avatar: 'https://i.pravatar.cc/150?img=20',
      urgent: false,
    },
    {
      id: 4,
      title: 'Video Editing for YouTube Channel',
      category: 'Media',
      budget: '$150-250',
      duration: '1 week',
      location: 'Media Lab',
      distance: '1.0 mi',
      rating: 4.7,
      applicants: 6,
      postedBy: 'Chris Wong',
      avatar: 'https://i.pravatar.cc/150?img=11',
      urgent: true,
    },
  ];

  return (
    <div className="py-28 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="section-title-lg text-white mb-3">Featured Opportunities</h2>
            <p className="text-gray-400 text-lg">
              Hot gigs in your area right now
            </p>
          </div>
          <button className="px-6 py-3 text-blue-400 border border-blue-500/50 rounded-xl hover:bg-blue-500/10 transition-all">
            View All
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {opportunities.map(opp => (
            <div key={opp.id} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:bg-gray-900 hover:border-gray-700 transition-all backdrop-blur-sm group">
              {opp.urgent && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-full border border-red-500/30 mb-5">
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Urgent</span>
                </div>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-white mb-3 text-xl group-hover:text-blue-400 transition-colors">{opp.title}</h3>
                  <div className="inline-block px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg border border-gray-700">
                    {opp.category}
                  </div>
                </div>
                <button className="p-2.5 hover:bg-gray-800 rounded-xl transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-500 hover:text-blue-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-gray-300">
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <span>{opp.budget}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{opp.duration}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{opp.location}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>{opp.rating} rating</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                <div className="flex items-center gap-3">
                  <img src={opp.avatar} alt={opp.postedBy} className="w-12 h-12 rounded-full border-2 border-gray-700" />
                  <div>
                    <div className="text-white">{opp.postedBy}</div>
                    <div className="text-gray-500 text-sm">{opp.distance} away</div>
                  </div>
                </div>
                <div className="text-gray-400">
                  {opp.applicants} applicants
                </div>
              </div>

              <button className="w-full mt-6 px-6 py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
