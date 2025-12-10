import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    platform: {
      title: 'Platform',
      links: ['How It Works', 'Browse Services', 'Post a Job', 'Find Work', 'Pricing'],
    },
    categories: {
      title: 'Categories',
      links: ['Tutoring', 'Academic Writing', 'Programming', 'Design', 'Translation'],
    },
    resources: {
      title: 'Resources',
      links: ['Help Center', 'Safety Tips', 'Blog', 'Success Stories', 'Community Guidelines'],
    },
    company: {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Contact', 'Partners'],
    },
  };

  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-9 h-9 text-blue-500" />
              <span className="text-white text-xl">CollabEd</span>
            </div>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Connecting local academic talent with opportunities.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-11 h-11 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group">
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-11 h-11 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group">
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-11 h-11 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-11 h-11 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group">
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-white mb-5 text-lg">{section.title}</h3>
              <ul className="space-y-3.5">
                {section.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-gray-500 hover:text-white transition-colors inline-block">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-900 pt-12 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-white mb-2 text-xl">Stay Updated</h3>
              <p className="text-gray-500">Get the latest opportunities and updates delivered to your inbox.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-600"
                />
              </div>
              <button className="px-8 py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all whitespace-nowrap shadow-lg shadow-blue-600/20">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-500">
          <p>&copy; 2025 CollabEd. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
