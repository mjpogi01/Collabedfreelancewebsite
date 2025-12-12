import React, { useState, type FormEvent } from 'react';
import { MapPin, Search, GraduationCap, Users, Star, Menu, X, Mail, Lock, User as UserIcon, Eye, EyeOff, Briefcase, DollarSign, Clock } from 'lucide-react';
import { Hero } from './components/Hero';
import { Updates } from './components/Updates';
import { HowItWorks } from './components/HowItWorks';
import { ServiceCategories } from './components/ServiceCategories';
import { MapView, JobOffer } from './components/MapView';
import { FeaturedOpportunities } from './components/FeaturedOpportunities';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

type ApplyState = 'idle' | 'confirm' | 'loading' | 'success' | 'error';
type HireState = 'idle' | 'confirm' | 'loading' | 'success' | 'error';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'jobmap' | 'talentmap' | 'updates'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [profileUser, setProfileUser] = useState<JobOffer | null>(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [isPostTalentOpen, setIsPostTalentOpen] = useState(false);
  const [applyState, setApplyState] = useState<ApplyState>('idle');
  const [applyJob, setApplyJob] = useState<JobOffer | null>(null);
  const [hireState, setHireState] = useState<HireState>('idle');
  const [hireTalent, setHireTalent] = useState<JobOffer | null>(null);

  const initialJobs: JobOffer[] = [
    {
      id: 1,
      title: 'Calculus II Tutor Needed',
      category: 'Tutoring',
      description: 'Looking for an experienced tutor to help with Calculus II. Need help with integration techniques and series.',
      location: 'Batangas State University',
      distance: '0.5 km',
      lat: 13.76,
      lng: 121.06,
      budget: '₱500-700/hr',
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
      location: 'Batangas City Port Area',
      distance: '1.2 km',
      lat: 13.75,
      lng: 121.05,
      budget: '₱5,000-10,000',
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
      location: 'Pallocan West',
      distance: '0.8 km',
      lat: 13.755,
      lng: 121.065,
      budget: '₱7,500-12,500',
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
      location: 'Batangas City Proper',
      distance: '1.5 km',
      lat: 13.752,
      lng: 121.058,
      budget: '₱2,500-3,750',
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
      location: 'Batangas Medical Center',
      distance: '2.1 km',
      lat: 13.748,
      lng: 121.062,
      budget: '₱1,000/hr',
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
      location: 'Plaza Mabini',
      distance: '1.8 km',
      lat: 13.758,
      lng: 121.055,
      budget: '₱10,000-15,000',
      duration: '1 day',
      rating: 5.0,
      postedBy: 'Jessica T.',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
  ];
  const [jobOffers, setJobOffers] = useState<JobOffer[]>(initialJobs);

  const initialTalents: JobOffer[] = [
    {
      id: 101,
      title: 'Full-Stack Developer (React/Node)',
      category: 'Programming',
      description: 'Building web apps with React, TypeScript, Node.js, REST/GraphQL. Available for part-time contracts.',
      location: 'Batangas City Proper',
      distance: '0.8 km',
      lat: 13.754,
      lng: 121.059,
      budget: '₱800/hr',
      duration: 'Part-time / Remote',
      rating: 4.9,
      postedBy: 'Jared Lim',
      avatar: 'https://i.pravatar.cc/150?img=21',
    },
    {
      id: 102,
      title: 'UI/UX Designer & Illustrator',
      category: 'Design',
      description: 'Figma, web/mobile UI, brand illustration. Available for sprints or ongoing design support.',
      location: 'Pallocan West',
      distance: '1.1 km',
      lat: 13.756,
      lng: 121.064,
      budget: '₱1,000/hr',
      duration: 'Project-based',
      rating: 4.8,
      postedBy: 'Alyssa Reyes',
      avatar: 'https://i.pravatar.cc/150?img=24',
    },
    {
      id: 103,
      title: 'Data Analyst (Python/SQL)',
      category: 'Data Analysis',
      description: 'Data cleaning, dashboards, visualizations. Skilled in Python, Pandas, SQL, Tableau.',
      location: 'Batangas State University',
      distance: '0.6 km',
      lat: 13.759,
      lng: 121.061,
      budget: '₱900/hr',
      duration: 'Flexible / Remote',
      rating: 5.0,
      postedBy: 'Miguel Santos',
      avatar: 'https://i.pravatar.cc/150?img=26',
    },
    {
      id: 104,
      title: 'Content Writer & Social Media',
      category: 'Content / Social',
      description: 'Blogs, SEO content, social captions. Fast turnarounds and consistent tone.',
      location: 'SM City Batangas',
      distance: '1.9 km',
      lat: 13.77,
      lng: 121.052,
      budget: '₱600/hr',
      duration: 'Ongoing',
      rating: 4.7,
      postedBy: 'Nicole Tan',
      avatar: 'https://i.pravatar.cc/150?img=29',
    },
    {
      id: 105,
      title: 'Retail & Cashiering Support',
      category: 'Retail & Cashiering',
      description: 'Weekend and evening shifts, POS handling, customer service, inventory support.',
      location: 'Batangas City Port Area',
      distance: '1.4 km',
      lat: 13.751,
      lng: 121.049,
      budget: '₱450/hr',
      duration: 'Weekends / On-site',
      rating: 4.8,
      postedBy: 'Ryan Dela Cruz',
      avatar: 'https://i.pravatar.cc/150?img=31',
    },
    {
      id: 106,
      title: 'Academic Tutor (Math & Physics)',
      category: 'Tutoring',
      description: 'Engineering student offering tutoring for HS/College Math, Physics, exam prep.',
      location: 'Plaza Mabini',
      distance: '1.2 km',
      lat: 13.758,
      lng: 121.056,
      budget: '₱700/hr',
      duration: 'Weeknights',
      rating: 5.0,
      postedBy: 'Carla Mendoza',
      avatar: 'https://i.pravatar.cc/150?img=34',
    },
  ];
  const [talentOffers, setTalentOffers] = useState<JobOffer[]>(initialTalents);

  type NewJobPayload = {
    title: string;
    category: string;
    location: string;
    budget: string;
    duration: string;
    description: string;
  };

  const handlePostJobSubmit = (payload: NewJobPayload) => {
    const jitter = () => (Math.random() - 0.5) * 0.015;
    const centerLat = 13.7565;
    const centerLng = 121.0583;
    const newJob: JobOffer = {
      id: Date.now(),
      title: payload.title.trim() || 'New Job',
      category: payload.category || 'General',
      description: payload.description.trim() || 'No description provided.',
      location: payload.location.trim() || 'Batangas City',
      distance: `${(Math.random() * 2 + 0.3).toFixed(1)} km`,
      lat: centerLat + jitter(),
      lng: centerLng + jitter(),
      budget: payload.budget.trim() || '₱—',
      duration: payload.duration.trim() || 'Flexible',
      rating: 5.0,
      postedBy: 'You',
      avatar: 'https://i.pravatar.cc/150?u=collabed-demo',
    };
    setJobOffers((prev) => [newJob, ...prev]);
    setCurrentPage('jobmap');
    setSearchTerm(payload.title);
    setIsPostJobOpen(false);
  };

  const handlePostTalentSubmit = (payload: NewJobPayload) => {
    const jitter = () => (Math.random() - 0.5) * 0.015;
    const centerLat = 13.7565;
    const centerLng = 121.0583;
    const newTalent: JobOffer = {
      id: Date.now(),
      title: payload.title.trim() || 'New Talent',
      category: payload.category || 'General',
      description: payload.description.trim() || 'No description provided.',
      location: payload.location.trim() || 'Batangas City',
      distance: `${(Math.random() * 2 + 0.3).toFixed(1)} km`,
      lat: centerLat + jitter(),
      lng: centerLng + jitter(),
      budget: payload.budget.trim() || '₱—',
      duration: payload.duration.trim() || 'Flexible',
      rating: 5.0,
      postedBy: 'You',
      avatar: 'https://i.pravatar.cc/150?u=collabed-talent',
    };
    setTalentOffers((prev) => [newTalent, ...prev]);
    setCurrentPage('talentmap');
    setSearchTerm(payload.title);
    setIsPostTalentOpen(false);
  };

  // Apply job flow
  const openApplyFlow = (job: JobOffer) => {
    setApplyJob(job);
    setApplyState('confirm');
  };

  const handleConfirmApply = () => {
    setApplyState('loading');
    // Simulate async submission
    setTimeout(() => {
      // For demo: 85% success rate
      const success = Math.random() > 0.15;
      setApplyState(success ? 'success' : 'error');
    }, 1200);
  };

  const handleRetryApply = () => {
    handleConfirmApply();
  };

  const closeApplyFlow = () => {
    setApplyState('idle');
    setApplyJob(null);
  };

  // Hire talent flow
  const openHireFlow = (talent: JobOffer) => {
    setHireTalent(talent);
    setHireState('confirm');
  };

  const handleConfirmHire = (payload: { role: string; offer: string; message: string }) => {
    setHireState('loading');
    // Simulate async
    setTimeout(() => {
      const success = Math.random() > 0.15;
      setHireState(success ? 'success' : 'error');
    }, 1200);
  };

  const handleRetryHire = (payload: { role: string; offer: string; message: string }) => {
    handleConfirmHire(payload);
  };

  const closeHireFlow = () => {
    setHireState('idle');
    setHireTalent(null);
  };

  const goToUpdates = () => {
    setCurrentPage('updates');
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo and Title - Leftmost */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
              <span className="text-white text-xl sm:text-2xl font-semibold">CollabEd</span>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center justify-center flex-1 gap-10 xl:gap-14 px-8">
              <button
                onClick={() => setCurrentPage('home')}
                className={`transition-colors text-base font-medium px-2 py-1 rounded-lg ${
                  currentPage === 'home' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
              </button>
                  <button
                    onClick={() => setCurrentPage('jobmap')}
                    className={`transition-colors text-base font-medium px-2 py-1 rounded-lg ${
                      currentPage === 'jobmap' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Job Map
                  </button>
                  <button
                    onClick={() => setCurrentPage('talentmap')}
                    className={`transition-colors text-base font-medium px-2 py-1 rounded-lg ${
                      currentPage === 'talentmap' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Talent Map
                  </button>
                  <button
                    onClick={goToUpdates}
                    className={`transition-colors text-base font-medium px-2 py-1 rounded-lg ${
                      currentPage === 'updates' ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Updates
                  </button>
            </div>

            {/* Right side actions */}
                <div className="hidden md:flex items-center gap-3 flex-shrink-0 relative">
                  {isSignedIn ? (
                    <>
                      <button
                        onClick={() => setProfileOpen((prev) => !prev)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 hover:bg-gray-800 border border-gray-700 rounded-lg text-gray-200 transition"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/50 flex items-center justify-center text-blue-300 text-sm font-semibold">
                          U
                        </div>
                        <span className="text-sm font-semibold">Profile</span>
                      </button>
                      {profileOpen && (
                        <div className="profile-dropdown">
                          <button
                            className="profile-dropdown-item"
                          >
                            Account
                          </button>
                          <button
                            className="profile-dropdown-item"
                            onClick={() => {
                              setIsPaymentOpen(true);
                              setProfileOpen(false);
                            }}
                          >
                            Payment
                          </button>
                          <button
                            className="profile-dropdown-item profile-dropdown-signout"
                            onClick={() => {
                              setIsSignedIn(false);
                              setProfileOpen(false);
                            }}
                          >
                            Sign Out
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        className="px-5 py-2 text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-500/10 transition-all text-base font-medium shadow-sm shadow-blue-600/10"
                        onClick={() => setIsSignInOpen(true)}
                      >
                        Sign In
                      </button>
                      <button
                        className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/30 text-base font-medium"
                        onClick={() => setIsSignUpOpen(true)}
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-gray-800">
              <div className="flex flex-col gap-4">
                {/* Navigation Links */}
                <div className="flex flex-col gap-4 pb-4 border-b border-gray-800">
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setMobileMenuOpen(false);
                  }}
                    className={`text-left font-medium text-base ${
                    currentPage === 'home' ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('jobmap');
                    setMobileMenuOpen(false);
                  }}
                    className={`text-left font-medium text-base ${
                    currentPage === 'jobmap' ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  Job Map
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('talentmap');
                    setMobileMenuOpen(false);
                  }}
                    className={`text-left font-medium text-base ${
                    currentPage === 'talentmap' ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  Talent Map
                </button>
                  <button
                    onClick={() => {
                      goToUpdates();
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left font-medium text-base ${currentPage === 'updates' ? 'text-blue-400' : 'text-gray-300'}`}
                  >
                    Updates
                  </button>
                </div>

                {/* Auth Buttons */}
                <div className="flex flex-col gap-3 pt-2">
                  {isSignedIn ? (
                    <button
                      className="w-full px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium text-base"
                      onClick={() => {
                        setIsSignedIn(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </button>
                  ) : (
                    <>
                      <button
                        className="w-full px-6 py-2.5 text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-500/10 transition-colors font-medium text-base"
                        onClick={() => {
                          setIsSignInOpen(true);
                          setMobileMenuOpen(false);
                        }}
                      >
                  Sign In
                </button>
                      <button
                        className="w-full px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium text-base"
                        onClick={() => {
                          setIsSignUpOpen(true);
                          setMobileMenuOpen(false);
                        }}
                      >
                        Sign Up
                </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 md:pt-24">
        {currentPage === 'home' && (
          <>
            <Hero
              searchTerm={searchTerm}
              locationTerm={locationTerm}
              onSearchTermChange={setSearchTerm}
              onLocationChange={setLocationTerm}
              onSearchSubmit={() => {
                if (isSignedIn) {
                  setCurrentPage('jobmap');
                } else {
                  setIsSignInOpen(true);
                }
              }}
            />
            <HowItWorks />
            <ServiceCategories />
            <FeaturedOpportunities />
            <Testimonials />
          </>
        )}
        {currentPage === 'updates' && (
          isSignedIn ? (
            <Updates />
          ) : (
            <div className="min-h-[60vh] flex items-center justify-center text-gray-300">
              Please sign in to view Updates.
            </div>
          )
        )}
        {currentPage === 'jobmap' && (
          isSignedIn ? (
            <MapView
              title="Job Map"
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              jobOffers={jobOffers}
              onPostJob={() => setIsPostJobOpen(true)}
              onApplyJob={(job) => openApplyFlow(job)}
              onViewProfile={(job) => setProfileUser(job)}
            />
          ) : (
            <div className="min-h-[60vh] flex items-center justify-center text-gray-300">
              Please sign in to view the Job Map.
            </div>
          )
        )}
        {currentPage === 'talentmap' && (
          isSignedIn ? (
            <MapView
              title="Talent Map"
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              jobOffers={talentOffers}
              onPostJob={() => setIsPostTalentOpen(true)}
              onApplyJob={(job) => openApplyFlow(job)}
              onHireTalent={(job) => openHireFlow(job)}
            onViewProfile={(job) => setProfileUser(job)}
              isTalent
              hidePostButton={false}
              postButtonLabel="Post Talent"
            />
          ) : (
            <div className="min-h-[60vh] flex items-center justify-center text-gray-300">
              Please sign in to view the Talent Map.
            </div>
          )
        )}
      </main>

      <Footer />

      {/* Sign In Modal */}
      {isSignInOpen && (
        <Modal onClose={() => setIsSignInOpen(false)} mode="signin" onSwitchToSignUp={() => {
          setIsSignInOpen(false);
          setIsSignUpOpen(true);
        }}>
          <AuthForm
            mode="signin"
            onSubmit={() => {
              setIsSignedIn(true);
              setIsSignInOpen(false);
              setCurrentPage('home');
            }}
          />
        </Modal>
      )}

      {/* Sign Up Modal */}
      {isSignUpOpen && (
        <Modal onClose={() => setIsSignUpOpen(false)} mode="signup" onSwitchToSignIn={() => {
          setIsSignUpOpen(false);
          setIsSignInOpen(true);
        }}>
          <AuthForm
            mode="signup"
            onSubmit={() => {
              setIsSignedIn(true);
              setIsSignUpOpen(false);
              setCurrentPage('home');
            }}
          />
        </Modal>
      )}

      {/* Post Job Modal */}
      {isPostJobOpen && (
        <PostJobModal
          onClose={() => setIsPostJobOpen(false)}
          onSubmit={handlePostJobSubmit}
        />
      )}
      {isPostTalentOpen && (
        <PostTalentModal
          onClose={() => setIsPostTalentOpen(false)}
          onSubmit={handlePostTalentSubmit}
        />
      )}

      {/* Apply Flow Modals */}
      {applyState === 'confirm' && applyJob && (
        <ApplyConfirmModal
          job={applyJob}
          onConfirm={handleConfirmApply}
          onCancel={closeApplyFlow}
        />
      )}
      {applyState === 'loading' && (
        <ApplyLoadingModal />
      )}
      {applyState === 'success' && (
        <ApplySuccessModal
          onClose={closeApplyFlow}
        />
      )}
      {applyState === 'error' && (
        <ApplyErrorModal
          onRetry={handleRetryApply}
          onCancel={closeApplyFlow}
        />
      )}

      {/* Hire Flow Modals */}
      {hireState === 'confirm' && hireTalent && (
        <HireConfirmModal
          talent={hireTalent}
          onConfirm={handleConfirmHire}
          onCancel={closeHireFlow}
        />
      )}
      {hireState === 'loading' && (
        <ApplyLoadingModal />
      )}
      {hireState === 'success' && hireTalent && (
        <HireSuccessModal
          talent={hireTalent}
          onClose={closeHireFlow}
        />
      )}
      {hireState === 'error' && hireTalent && (
        <HireErrorModal
          talent={hireTalent}
          onRetry={handleRetryHire}
          onCancel={closeHireFlow}
        />
      )}

      {isPaymentOpen && (
        <PaymentModal onClose={() => setIsPaymentOpen(false)} />
      )}
      {profileUser && (
        <ProfileModal user={profileUser} onClose={() => setProfileUser(null)} />
      )}
    </div>
  );
}

function Modal({ children, onClose, mode, onSwitchToSignIn, onSwitchToSignUp }: { 
  children: React.ReactNode; 
  onClose: () => void; 
  mode: 'signin' | 'signup';
  onSwitchToSignIn?: () => void;
  onSwitchToSignUp?: () => void;
}) {
  const isSignIn = mode === 'signin';
  return (
    <div 
      className="auth-overlay fixed inset-0 z-[70] flex items-start justify-center bg-black/70 backdrop-blur-md px-6 pb-12"
      onClick={onClose}
    >
      <div 
        className="collabed-auth-modal auth-card auth-modal-card bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl relative overflow-hidden"
        style={{ width: '30vw', minWidth: '360px', maxWidth: '520px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="auth-close absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Logo and Title */}
        <div className="auth-header px-10 pt-8 pb-8 text-center space-y-2">
          <div className="auth-brand flex items-center justify-center gap-3 mb-2">
            <GraduationCap className="w-9 h-9 text-blue-500" />
            <span className="text-white text-xl font-bold">CollabEd</span>
          </div>
          <h2 className="auth-title text-white text-lg font-bold mb-1">
            {isSignIn ? 'Welcome Back!' : 'Create Your Account'}
          </h2>
          <p className="auth-subtitle text-gray-400 text-sm">
            {isSignIn ? 'Sign in to continue your journey' : 'Join CollabEd and start connecting with local talent'}
          </p>
        </div>

        {/* Content */}
        <div className="auth-body px-10 pb-10">
          {children}
        </div>

        {/* Footer Link */}
        <div className="auth-footer px-10 pb-10 text-center mt-4">
          <p className="auth-footer-text text-gray-400 text-xs">
            {isSignIn ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={isSignIn ? onSwitchToSignUp : onSwitchToSignIn}
              className="auth-footer-link text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              {isSignIn ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function AuthForm({ mode, onSubmit }: { mode: 'signin' | 'signup'; onSubmit: () => void }) {
  const isSignUp = mode === 'signup';
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  
  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    // In a real app, this would trigger OAuth flow
    console.log(`Signing in with ${provider}`);
    // For demo purposes, we'll just sign them in
    onSubmit();
  };

  return (
    <div className="auth-form space-y-6">
      {/* Email Form */}
      <form
        className="auth-form-fields space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {isSignUp && (
          <div className="auth-field space-y-1.5">
            <label className="auth-label text-gray-300 text-[10px] font-bold uppercase tracking-wider">Full Name</label>
            <div className="auth-input-wrap relative">
              <UserIcon className="auth-input-icon absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              <input
                required
                type="text"
                placeholder="Enter your full name"
                className="auth-input w-full pl-12 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>
        )}
        <div className="auth-field space-y-1.5">
          <label className="auth-label text-gray-300 text-[10px] font-bold uppercase tracking-wider">Email</label>
          <div className="auth-input-wrap relative">
            <Mail className="auth-input-icon absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <input
              required
              type="email"
              placeholder="Enter email"
              className="auth-input w-full pl-12 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
            />
          </div>
        </div>
        <div className="auth-field space-y-1.5">
          <div className="auth-field-header flex items-center justify-between">
            <label className="auth-label text-gray-300 text-[10px] font-bold uppercase tracking-wider">Password</label>
            {!isSignUp && (
              <a href="#" className="auth-forgot text-[10px] text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </a>
            )}
          </div>
          <div className="auth-input-wrap relative">
            <Lock className="auth-input-icon absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <input
              required
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              className="auth-input w-full pl-12 pr-14 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="auth-toggle absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors z-10 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {isSignUp && (
          <div className="auth-field space-y-1.5">
            <label className="auth-label text-gray-300 text-[10px] font-bold uppercase tracking-wider">Confirm Password</label>
            <div className="auth-input-wrap relative">
              <Lock className="auth-input-icon absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              <input
                required
                type={showPasswordConfirm ? 'text' : 'password'}
                placeholder="Confirm password"
                className="auth-input w-full pl-12 pr-14 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="auth-toggle absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors z-10 cursor-pointer"
                aria-label={showPasswordConfirm ? 'Hide password' : 'Show password'}
              >
                {showPasswordConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Primary Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="auth-primary w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-semibold text-sm"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="auth-divider relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-gray-900 text-gray-400 text-xs font-medium">OR</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="auth-social-group space-y-3">
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          className="auth-social w-full flex items-center justify-center gap-3 py-2.75 bg-gray-800/70 hover:bg-gray-800 border border-gray-700 text-white rounded-lg transition-colors font-medium text-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
      <p className="auth-terms mt-4 text-gray-500 leading-relaxed">
        By continuing, you agree to CollabEd’s 10% commission per transaction and consent to location sharing for service coordination.
      </p>
    </div>
  );
}

function PaymentModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/70 backdrop-blur-md px-4 pt-24 pb-10 overflow-y-auto" onClick={onClose}>
      <div
        className="payment-modal bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="payment-modal-header flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div>
            <h3 className="text-white text-lg font-semibold">Payment Details</h3>
            <p className="text-gray-400 text-sm">Provide your preferred payment accounts</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-700 flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="payment-modal-body px-6 py-6 space-y-4">
          <div className="payment-earnings flex items-center justify-between bg-gray-800/70 border border-gray-700 rounded-lg px-4 py-3">
            <div>
              <div className="text-gray-400 text-xs font-medium">Your earnings</div>
              <div className="text-white text-lg font-semibold">₱12,500</div>
            </div>
            <div className="flex gap-2">
              <button className="payment-earnings-btn px-3 py-2 rounded-lg border border-gray-700 text-gray-200 hover:bg-gray-800 text-sm font-semibold">
                Details
              </button>
              <button className="payment-earnings-withdraw px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 text-sm font-semibold shadow-lg shadow-blue-600/25">
                Withdraw
              </button>
            </div>
          </div>

          <div className="payment-field space-y-1.5">
            <label className="text-gray-300 text-sm font-semibold">GCash Number</label>
            <input
              className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              placeholder="e.g., 09XXXXXXXXX"
            />
          </div>
          <div className="payment-field space-y-1.5">
            <label className="text-gray-300 text-sm font-semibold">PayMaya Number</label>
            <input
              className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              placeholder="e.g., 09XXXXXXXXX"
            />
          </div>
          <div className="payment-field space-y-1.5">
            <label className="text-gray-300 text-sm font-semibold">PayPal Email / Link</label>
            <input
              className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              placeholder="e.g., you@paypal.me or paypal.me/yourlink"
            />
          </div>
        </div>

        <div className="payment-modal-footer flex justify-end gap-3 px-6 py-4 border-t border-gray-800">
          <button
            className="px-5 py-2 rounded-lg border border-gray-700 text-gray-200 hover:bg-gray-800 transition text-sm font-semibold"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 transition text-sm font-semibold shadow-lg shadow-blue-600/25"
            onClick={onClose}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileModal({ user, onClose }: { user: JobOffer; onClose: () => void }) {
  const reviews = [
    { name: 'Client A', rating: 5, text: 'Great communication and fast delivery.' },
    { name: 'Client B', rating: 4, text: 'Solid work, would hire again.' },
    { name: 'Client C', rating: 5, text: 'Exceeded expectations on a tight deadline.' },
  ];

  return (
    <div className="profile-overlay fixed inset-0 z-[75] flex items-start justify-center bg-black/70 backdrop-blur-md px-4 overflow-y-auto" onClick={onClose}>
      <div
        className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt={user.postedBy} className="w-14 h-14 rounded-full border-2 border-gray-700 object-cover" />
            <div>
              <div className="text-white text-xl font-semibold">{user.postedBy}</div>
              <div className="text-gray-400 text-sm">{user.title}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-700 flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <h4 className="text-white font-semibold text-lg mb-2">About</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{user.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-500" /> {user.location}</div>
              <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-gray-500" /> {user.budget}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-500" /> {user.duration}</div>
              <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /> {user.rating?.toFixed?.(1) ?? '5.0'} / 5</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white text-lg font-semibold">
              <Star className="w-5 h-5 text-yellow-400" />
              {user.rating?.toFixed?.(1) ?? '5.0'} Rating
            </div>
            <div className="space-y-3 bg-gray-800/60 border border-gray-800 rounded-xl p-3 max-h-64 overflow-y-auto">
              {reviews.map((r, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-gray-900/60 border border-gray-800">
                  <div className="flex items-center justify-between text-sm text-white">
                    <span className="font-semibold">{r.name}</span>
                    <span className="text-yellow-400 flex items-center gap-1"><Star className="w-4 h-4" /> {r.rating}</span>
                  </div>
                  <p className="text-gray-300 text-xs mt-1 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostJobModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (data: { title: string; category: string; location: string; budget: string; duration: string; description: string; }) => void; }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tutoring');
  const [location, setLocation] = useState('Batangas City');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, category, location, budget, duration, description });
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 pt-20 md:pt-24 pb-8 animate-[fadeIn_0.2s_ease-out] overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-700/50 rounded-2xl shadow-2xl relative overflow-hidden w-full max-w-2xl animate-[slideUp_0.3s_ease-out] my-8"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Header */}
        <div className="px-8 pt-6 pb-6 border-b border-gray-800/50">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                <Briefcase className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold">Post a Job</h3>
                <p className="text-gray-400 text-sm mt-0.5">Create a job listing and see it appear on the map</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center bg-gray-800/80 hover:bg-gray-700 rounded-xl text-gray-400 hover:text-white transition-all duration-200 backdrop-blur-sm border border-gray-700/50 flex-shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="px-8 py-6 space-y-6" onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-semibold">
              Job Title <span className="text-red-400">*</span>
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="postjob-field w-full px-4 py-3 text-base placeholder-gray-500 transition-all duration-200"
              placeholder="e.g., Weekend Retail Shift"
            />
          </div>

          {/* Category and Location Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-semibold">Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                className="postjob-select w-full px-4 py-3 text-base transition-all duration-200 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    paddingRight: '2.5rem',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                  }}
                >
                  <option>Tutoring</option>
                  <option>Design</option>
                  <option>Programming</option>
                  <option>Writing</option>
                  <option>Research</option>
                  <option>Photography</option>
                  <option>Retail & Cashiering</option>
                  <option>Content / Social</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-semibold">Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="postjob-field w-full px-4 py-3 text-base placeholder-gray-500 transition-all duration-200"
                placeholder="e.g., SM City Batangas"
              />
            </div>
          </div>

          {/* Budget and Duration Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-semibold">Budget</label>
              <input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="postjob-field w-full px-4 py-3 text-base placeholder-gray-500 transition-all duration-200"
                placeholder="e.g., ₱600/hr or ₱8,000"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-semibold">Duration</label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="postjob-field w-full px-4 py-3 text-base placeholder-gray-500 transition-all duration-200"
                placeholder="e.g., 1 week, Weekends, Flexible"
              />
            </div>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="postjob-textarea w-full px-4 py-3 resize-none text-base leading-relaxed placeholder-gray-500 transition-all duration-200"
              rows={5}
              placeholder="Describe the role, expectations, requirements, and timing..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800/50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-300 bg-transparent border border-gray-700/50 rounded-xl hover:bg-gray-800/50 hover:border-gray-600 transition-all duration-200 font-medium text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all duration-200 font-semibold text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PostTalentModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (data: { title: string; category: string; location: string; budget: string; duration: string; description: string; }) => void; }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Programming');
  const [location, setLocation] = useState('Batangas City / Remote');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, category, location, budget, duration, description });
  };

  return (
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-md px-4 py-8"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800/60 rounded-2xl shadow-2xl relative overflow-hidden w-full max-w-2xl animate-[slideUp_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center bg-gray-800/80 hover:bg-gray-700 rounded-xl text-gray-400 hover:text-white transition-all duration-200 z-10 backdrop-blur-sm border border-gray-700/50"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-8 pt-8 pb-6 border-b border-gray-800/50">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold">Post Your Talent</h3>
                <p className="text-gray-400 text-sm mt-0.5">Showcase your skills and availability to get invited.</p>
              </div>
            </div>
          </div>
        </div>

        <form className="px-8 py-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-semibold">
              Headline <span className="text-red-400">*</span>
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="postjob-field w-full px-4 py-3 text-base placeholder-gray-500 transition-all duration-200"
              placeholder="e.g., Full-Stack Developer (React/Node)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-semibold">Skill Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="postjob-select w-full px-4 py-3 text-base transition-all duration-200 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    paddingRight: '2.5rem',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                  }}
                >
                  <option>Programming</option>
                  <option>Design</option>
                  <option>Data Analysis</option>
                  <option>Tutoring</option>
                  <option>Writing</option>
                  <option>Content / Social</option>
                  <option>Retail & Cashiering</option>
                  <option>Photography</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-semibold">Preferred Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="postjob-field w-full px-4 py-3 text-base placeholder-gray-500 transition-all duration-200"
                placeholder="e.g., Batangas City / Remote"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-semibold">Expected Rate</label>
              <input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="postjob-field w-full px-4 py-3 text-base placeholder-gray-500 transition-all duration-200"
                placeholder="e.g., ₱800/hr or ₱50k/mo"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-semibold">Availability</label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="postjob-field w-full px-4 py-3 text-base placeholder-gray-500 transition-all duration-200"
                placeholder="e.g., Part-time, Weeknights, Weekends"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-semibold">Bio / Experience</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="postjob-textarea w-full px-4 py-3 resize-none text-base leading-relaxed placeholder-gray-500 transition-all duration-200"
              rows={5}
              placeholder="Describe your skills, experience, tools, and when you're available."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800/50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-300 bg-transparent border border-gray-700/50 rounded-xl hover:bg-gray-800/50 hover:border-gray-600 transition-all duration-200 font-medium text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all duration-200 font-semibold text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Post Talent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Apply flow modals
function ModalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-md px-4 py-8">
      <div className="apply-modal-shell relative bg-gray-900/95 border border-gray-800 rounded-2xl shadow-2xl w-full px-5 py-6 animate-fade-pop">
        {children}
      </div>
    </div>
  );
}

function ApplyConfirmModal({ job, onConfirm, onCancel }: { job: JobOffer; onConfirm: () => void; onCancel: () => void; }) {
  return (
    <ModalShell>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-300">
          <Briefcase className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-white text-lg font-semibold mb-1">Confirm Application</h3>
          <p className="text-gray-300 text-sm">Are you sure you want to apply for <span className="text-white font-semibold">{job.title}</span> by <span className="text-white">{job.postedBy}</span>?</p>
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button
          className="px-4 py-2 rounded-xl border border-gray-700 text-gray-200 hover:bg-gray-800 transition"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/30 transition"
          onClick={onConfirm}
        >
          Confirm Apply
        </button>
      </div>
    </ModalShell>
  );
}

function ApplyLoadingModal() {
  return (
    <ModalShell>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500/40 border-t-blue-400 rounded-full animate-spin" />
        <div>
          <div className="text-white text-lg font-semibold">Submitting your application…</div>
          <p className="text-gray-400 text-sm mt-1">Please wait a moment.</p>
        </div>
      </div>
    </ModalShell>
  );
}

function ApplySuccessModal({ onClose }: { onClose: () => void; }) {
  return (
    <ModalShell>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-green-500/15 border border-green-500/40 flex items-center justify-center">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <div className="text-white text-lg font-semibold">Your application has been successfully submitted!</div>
          <p className="text-gray-400 text-sm mt-1">The employer will review your application shortly.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
          <button className="w-full px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/30 transition">
            View Applications
          </button>
          <button
            className="w-full px-5 py-2 rounded-xl border border-gray-700 text-gray-200 hover:bg-gray-800 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function ApplyErrorModal({ onRetry, onCancel }: { onRetry: () => void; onCancel: () => void; }) {
  return (
    <ModalShell>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/40 flex items-center justify-center">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div className="text-white text-lg font-semibold">Something went wrong while submitting your application.</div>
          <p className="text-gray-400 text-sm mt-1">Please try again or check your connection.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
          <button
            className="w-full px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/30 transition"
            onClick={onRetry}
          >
            Retry
          </button>
          <button
            className="w-full px-5 py-2 rounded-xl border border-gray-700 text-gray-200 hover:bg-gray-800 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

// Hire modals
function HireConfirmModal({ talent, onConfirm, onCancel }: { talent: JobOffer; onConfirm: (data: { role: string; offer: string; message: string }) => void; onCancel: () => void; }) {
  const [role, setRole] = useState('');
  const [offer, setOffer] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onConfirm({ role, offer, message });
  };

  return (
    <ModalShell>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-300">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-white text-lg font-semibold mb-1">Confirm Hire</h3>
            <p className="text-gray-300 text-sm">
              Hire <span className="text-white font-semibold">{talent.postedBy}</span> for <span className="text-white">{talent.title}</span>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 text-sm font-semibold">Role / Job Title</label>
          <input
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="postjob-field w-full px-3 py-2.5 text-sm placeholder-gray-500 transition-all duration-200"
            placeholder="e.g., 2-week React landing page build"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 text-sm font-semibold">Your Offer</label>
          <input
            required
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            className="postjob-field w-full px-3 py-2.5 text-sm placeholder-gray-500 transition-all duration-200"
            placeholder="e.g., ₱30,000 fixed or ₱900/hr, paid weekly"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 text-sm font-semibold">Notes / Scope</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="postjob-textarea w-full px-3 py-2.5 text-sm leading-relaxed placeholder-gray-500 transition-all duration-200"
            rows={3}
            placeholder="Share the scope, timeline, or links to the brief."
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-gray-700 text-gray-200 hover:bg-gray-800 transition text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/30 transition text-sm font-semibold"
          >
            Send Hire Request
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

function HireSuccessModal({ talent, onClose }: { talent: JobOffer; onClose: () => void; }) {
  return (
    <ModalShell>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-green-500/15 border border-green-500/40 flex items-center justify-center">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <div className="text-white text-lg font-semibold">Hire request sent to {talent.postedBy}!</div>
          <p className="text-gray-400 text-sm mt-1">They’ll review your offer and respond soon.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
          <button className="w-full px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/30 transition">
            View Messages
          </button>
          <button
            className="w-full px-5 py-2 rounded-xl border border-gray-700 text-gray-200 hover:bg-gray-800 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function HireErrorModal({ talent, onRetry, onCancel }: { talent: JobOffer; onRetry: (data: { role: string; offer: string; message: string }) => void; onCancel: () => void; }) {
  const [role, setRole] = useState('');
  const [offer, setOffer] = useState('');
  const [message, setMessage] = useState('');

  const handleRetry = () => {
    onRetry({ role, offer, message });
  };

  return (
    <ModalShell>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/40 flex items-center justify-center">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div className="text-white text-lg font-semibold">Could not send hire request to {talent.postedBy}.</div>
          <p className="text-gray-400 text-sm mt-1">Please try again or adjust your offer.</p>
        </div>
        <div className="w-full space-y-2 text-left">
          <label className="block text-gray-300 text-sm font-semibold">Role / Job Title</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="postjob-field w-full px-3 py-2.5 text-sm placeholder-gray-500 transition-all duration-200"
            placeholder="e.g., 2-week React landing page build"
          />
          <label className="block text-gray-300 text-sm font-semibold mt-3">Your Offer</label>
          <input
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            className="postjob-field w-full px-3 py-2.5 text-sm placeholder-gray-500 transition-all duration-200"
            placeholder="e.g., ₱30,000 fixed or ₱900/hr"
          />
          <label className="block text-gray-300 text-sm font-semibold mt-3">Notes</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="postjob-textarea w-full px-3 py-2.5 text-sm leading-relaxed placeholder-gray-500 transition-all duration-200"
            rows={3}
            placeholder="Share a quick note or adjust your offer."
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
          <button
            className="w-full px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/30 transition"
            onClick={handleRetry}
          >
            Retry
          </button>
          <button
            className="w-full px-5 py-2 rounded-xl border border-gray-700 text-gray-200 hover:bg-gray-800 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
