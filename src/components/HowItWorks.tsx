import { MapPin, Search, Handshake, Star, Globe, Clock } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Search Locally',
      description: 'Browse services and skills from students, professionals, and flexible personnel in your area using our map-based search.',
    },
    {
      icon: Handshake,
      title: 'Connect & Collaborate',
      description: 'Message freelancers directly, discuss project details, and agree on terms that work for both parties.',
    },
    {
      icon: Star,
      title: 'Complete & Review',
      description: 'Work with local talent, complete your project, and leave reviews to build community trust.',
    },
  ];

  const features = [
    {
      icon: MapPin,
      title: 'Location-First',
      description: 'Find talent in your neighborhood, campus, or city. Meet in person or work remotely—your choice.',
      color: 'blue',
    },
    {
      icon: Globe,
      title: 'Student-Focused',
      description: 'Perfect for businesses and individuals. Find fast, flexible personnel for cashiering, retail, academic services, and more at competitive rates.',
      color: 'green',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Work around class schedules and busy academic calendars. Projects that fit your timeline.',
      color: 'purple',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    green: 'bg-green-500/10 text-green-400 border-green-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  };

  return (
    <div className="py-28 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* How It Works Section */}
        <div className="text-center mb-20">
          <h2 className="section-title-lg text-white mb-6">How CollabEd Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Getting started is simple. Our platform makes it easy to find and work with local talent for your business and academic needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-32">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-white mb-3 text-xl">{step.title}</div>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Key Features Section */}
        <div className="text-center mb-20">
          <h2 className="section-title-lg text-white mb-6">Why Choose CollabEd?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            The localized platform connecting businesses and individuals with fast, flexible personnel and academic talent.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 bg-gray-900/50 border border-gray-800 rounded-2xl hover:bg-gray-900/80 hover:border-gray-700 transition-all backdrop-blur-sm">
              <div className={`w-16 h-16 ${colorClasses[feature.color as keyof typeof colorClasses]} border rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-white mb-3 text-xl">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
