import { BookOpen, Pen, Palette, Code, Calculator, Languages, Music, Camera, Briefcase, Microscope, TrendingUp, FileText, ShoppingCart, Store } from 'lucide-react';

export function ServiceCategories() {
  const categories = [
    {
      icon: BookOpen,
      title: 'Tutoring',
      count: '2,340',
      description: 'Math, Science, Languages & more',
      color: 'from-blue-600 to-blue-500',
      glow: 'blue-600/20',
    },
    {
      icon: Pen,
      title: 'Academic Writing',
      count: '1,580',
      description: 'Essays, Research Papers, Editing',
      color: 'from-purple-600 to-purple-500',
      glow: 'purple-600/20',
    },
    {
      icon: Palette,
      title: 'Graphic Design',
      count: '890',
      description: 'Logos, Posters, Presentations',
      color: 'from-pink-600 to-pink-500',
      glow: 'pink-600/20',
    },
    {
      icon: Code,
      title: 'Programming',
      count: '1,120',
      description: 'Web Dev, Apps, Data Analysis',
      color: 'from-green-600 to-green-500',
      glow: 'green-600/20',
    },
    {
      icon: Calculator,
      title: 'Math & Statistics',
      count: '760',
      description: 'Calculus, Statistics, Algebra',
      color: 'from-orange-600 to-orange-500',
      glow: 'orange-600/20',
    },
    {
      icon: Languages,
      title: 'Translation',
      count: '540',
      description: 'Document & Content Translation',
      color: 'from-indigo-600 to-indigo-500',
      glow: 'indigo-600/20',
    },
    {
      icon: Music,
      title: 'Music Lessons',
      count: '320',
      description: 'Instruments, Theory, Production',
      color: 'from-red-600 to-red-500',
      glow: 'red-600/20',
    },
    {
      icon: Camera,
      title: 'Photography',
      count: '450',
      description: 'Events, Portraits, Editing',
      color: 'from-yellow-600 to-yellow-500',
      glow: 'yellow-600/20',
    },
    {
      icon: Store,
      title: 'Retail & Cashiering',
      count: '420',
      description: 'Cashiering, Sales, Customer Service',
      color: 'from-teal-600 to-teal-500',
      glow: 'teal-600/20',
    },
    {
      icon: Briefcase,
      title: 'Business Services',
      count: '680',
      description: 'Marketing, Consulting, Admin',
      color: 'from-indigo-600 to-indigo-500',
      glow: 'indigo-600/20',
    },
    {
      icon: Microscope,
      title: 'Lab Assistance',
      count: '210',
      description: 'Research, Data Collection',
      color: 'from-cyan-600 to-cyan-500',
      glow: 'cyan-600/20',
    },
    {
      icon: TrendingUp,
      title: 'Data Analysis',
      count: '530',
      description: 'Excel, SPSS, R, Python',
      color: 'from-violet-600 to-violet-500',
      glow: 'violet-600/20',
    },
    {
      icon: FileText,
      title: 'Content Writing',
      count: '920',
      description: 'Blogs, Articles, Copywriting',
      color: 'from-emerald-600 to-emerald-500',
      glow: 'emerald-600/20',
    },
  ];

  return (
    <div className="py-28 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="section-title-lg text-white mb-6">Browse by Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore thousands of services offered by talented students, professionals, and flexible personnel in your area.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:bg-gray-900 hover:border-gray-700 transition-all text-left group backdrop-blur-sm hover:shadow-lg hover:shadow-${category.glow}`}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-${category.glow}`}>
                <category.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white mb-2 text-lg">{category.title}</h3>
              <p className="text-gray-400 mb-3 text-sm leading-relaxed">{category.description}</p>
              <div className="text-gray-500">{category.count} available</div>
            </button>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="px-10 py-4 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 hover:border-gray-600 transition-all">
            View All Categories
          </button>
        </div>
      </div>
    </div>
  );
}
