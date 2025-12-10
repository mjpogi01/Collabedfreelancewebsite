import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Jessica Chen',
      role: 'Computer Science Student',
      avatar: 'https://i.pravatar.cc/150?img=47',
      rating: 5,
      text: "CollabEd helped me find local tutoring gigs that fit perfectly around my class schedule. I've earned over $2,000 this semester while helping other students!",
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'Business Owner',
      avatar: 'https://i.pravatar.cc/150?img=52',
      rating: 5,
      text: 'I found an amazing graphic design student through CollabEd who created our entire brand identity. The local connection made collaboration so much easier.',
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      role: 'University Instructor',
      avatar: 'https://i.pravatar.cc/150?img=32',
      rating: 5,
      text: 'As an instructor, I use CollabEd to find research assistants. The quality of students on this platform is exceptional, and being local makes coordination seamless.',
    },
  ];

  return (
    <div className="py-28 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-white mb-6">What Our Community Says</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Join thousands of students, instructors, and businesses who are already collaborating locally.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-10 hover:bg-gray-900 hover:border-gray-700 transition-all backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-yellow-400 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <Quote className="w-10 h-10 text-blue-500/30 mb-6" />
              
              <p className="text-gray-300 mb-8 italic leading-relaxed text-lg">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-800">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full border-2 border-gray-700"
                />
                <div>
                  <div className="text-white text-lg">{testimonial.name}</div>
                  <div className="text-gray-500 mt-1">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-16 text-center overflow-hidden shadow-2xl shadow-blue-600/20">
          {/* Decorative pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />
          
          <div className="relative z-10">
            <h2 className="text-white mb-6">Ready to Start Collaborating?</h2>
            <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              Join CollabEd today and connect with talented students and instructors in your area. Whether you're offering skills or looking for talent, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button className="px-10 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                Post a Job
              </button>
              <button className="px-10 py-4 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-all border-2 border-blue-400">
                Find Opportunities
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
