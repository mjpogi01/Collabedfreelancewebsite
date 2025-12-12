import { useState } from 'react';
import { MapPin, DollarSign, Clock } from 'lucide-react';

type UpdateItem = {
  title: string;
  detail: string;
  tag: string;
  color: 'blue' | 'green' | 'purple';
};

const badge = {
  blue: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
  green: 'bg-green-500/10 text-green-300 border-green-500/30',
  purple: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
} as const;

type AppStatus = 'completed' | 'accepted' | 'denied' | 'pending';

const statusStyles: Record<AppStatus, string> = {
  completed: 'updates-badge updates-badge-completed',
  accepted: 'updates-badge updates-badge-accepted',
  denied: 'updates-badge updates-badge-denied',
  pending: 'updates-badge updates-badge-pending',
};

const jobApplications = [
  {
    id: 1,
    title: 'Python Data Analysis Project',
    category: 'Programming',
    location: 'Pallocan West',
    distance: '0.8 km',
    description: 'Analyze sales data and create visualizations with matplotlib. Short timeline, clear data set provided.',
    budget: '₱7,500-12,500',
    duration: '3-5 days',
    postedBy: 'Emma L.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'pending' as AppStatus,
    owner: 'mine' as const,
  },
  {
    id: 2,
    title: 'Logo Design for Startup',
    category: 'Design',
    location: 'Batangas City Port Area',
    distance: '1.2 km',
    description: 'Minimalist logo for a tech startup. Need 2 concepts and brand colors.',
    budget: '₱5,000-10,000',
    duration: '1 week',
    postedBy: 'Mike Chen',
    avatar: 'https://i.pravatar.cc/150?img=13',
    status: 'accepted' as AppStatus,
    owner: 'mine' as const,
  },
  {
    id: 3,
    title: 'Calculus II Tutor Needed',
    category: 'Tutoring',
    location: 'Batangas State University',
    distance: '0.5 km',
    description: 'Ongoing tutoring for integration techniques and series. 2 sessions per week.',
    budget: '₱500-700/hr',
    duration: 'Ongoing',
    postedBy: 'Sarah M.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'completed' as AppStatus,
    owner: 'incoming' as const,
    payments: [
      { label: 'GCash', value: '0917-234-5678' },
      { label: 'PayMaya', value: '0918-111-2222' },
      { label: 'PayPal', value: 'paypal.me/sarah-m' },
    ],
  },
  {
    id: 4,
    title: 'Spanish Essay Proofreading',
    category: 'Writing',
    location: 'Batangas City Proper',
    distance: '1.5 km',
    description: 'Proofread and edit a 10-page essay on Latin American literature.',
    budget: '₱2,500-3,750',
    duration: '2 days',
    postedBy: 'David R.',
    avatar: 'https://i.pravatar.cc/150?img=12',
    status: 'denied' as AppStatus,
    owner: 'incoming' as const,
  },
  {
    id: 5,
    title: 'Event Photography - Graduation Party',
    category: 'Photography',
    location: 'Plaza Mabini',
    distance: '1.8 km',
    description: 'Capture key moments at a graduation party. 3-4 hours coverage with quick edits.',
    budget: '₱10,000-15,000',
    duration: '1 day',
    postedBy: 'Jessica T.',
    avatar: 'https://i.pravatar.cc/150?img=9',
    status: 'pending' as AppStatus,
    owner: 'incoming' as const,
  },
];

export function Updates() {
  const [tab, setTab] = useState<'jobs' | 'hire'>('jobs');
  const myApps = jobApplications.filter((j) => j.owner === 'mine');
  const incomingApps = jobApplications.filter((j) => j.owner === 'incoming');
  const [payModalJob, setPayModalJob] = useState<(typeof jobApplications)[number] | null>(null);
  const [showPayFeedback, setShowPayFeedback] = useState(false);

  return (
    <>
    <div id="updates" className="bg-gray-950 min-h-screen pt-4 md:pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-center">
          <div className="inline-flex gap-8 border-b border-gray-800 pb-2">
            <button
              className={`px-3 pb-3 text-base md:text-lg font-semibold transition-all duration-200 border-b-2 ${
                tab === 'jobs'
                  ? 'text-white border-blue-500'
                  : 'text-gray-300 border-transparent hover:text-white hover:border-gray-700'
              }`}
              onClick={() => setTab('jobs')}
            >
              Job Applications
            </button>
            <button
              className={`px-3 pb-3 text-base md:text-lg font-semibold transition-all duration-200 border-b-2 ${
                tab === 'hire'
                  ? 'text-white border-blue-500'
                  : 'text-gray-300 border-transparent hover:text-white hover:border-gray-700'
              }`}
              onClick={() => setTab('hire')}
            >
              Hire Requests
            </button>
          </div>
        </div>

        {tab === 'jobs' && (
          <div className="mt-12 space-y-16">
            <section className="updates-section">
              <h3 className="updates-heading">Your Applications</h3>
              <div className="updates-grid">
                {myApps.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                  />
                ))}
              </div>
            </section>

            <section className="updates-section updates-section-incoming">
              <h3 className="updates-heading">Applications Sent to You</h3>
              <div className="updates-grid">
                {incomingApps.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onPay={(j) => {
                      setShowPayFeedback(false);
                      setPayModalJob(j);
                    }}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {tab === 'hire' && (
          <div className="mt-10 text-center text-gray-400 text-sm">
            No hire requests yet.
          </div>
        )}
      </div>
    </div>

      {/* Pay Modal */}
      {payModalJob && (
        <div className="updates-pay-modal-backdrop" onClick={() => { setPayModalJob(null); setShowPayFeedback(false); }}>
          <div
            className="updates-pay-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="updates-pay-modal-header">
              <div>
                <div className="updates-pay-modal-title">Payment to CollabEd</div>
                <div className="updates-pay-modal-subtitle">
                  {payModalJob.title}
                </div>
              </div>
              <button
                className="updates-pay-modal-close"
                aria-label="Close"
                onClick={() => setPayModalJob(null)}
              >
                ×
              </button>
            </div>
            <div className="updates-pay-list">
              <div className="updates-pay-item">
                <span className="updates-pay-label">Bank (CollabEd)</span>
                <span className="updates-pay-value">BPI - 1234 5678 90</span>
              </div>
              <div className="updates-pay-item">
                <span className="updates-pay-label">Commission</span>
                <span className="updates-pay-value">CollabEd collects 10% per transaction</span>
              </div>
            </div>
            <div className="updates-terms">
              By proceeding, you agree to CollabEd’s 10% commission per transaction and consent to sharing your location for service coordination.
            </div>
            <div className="updates-pay-actions">
              <button
                className="updates-pay-done"
                onClick={() => setShowPayFeedback(true)}
              >
                Payment Done
              </button>
            </div>
            {showPayFeedback && (
              <div className="payment-rating bg-gray-800/70 border border-gray-700 rounded-lg px-4 py-3 space-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white text-sm font-semibold">{payModalJob.rating?.toFixed?.(1) ?? '5.0'} / 5.0</span>
                  </div>
                  <span className="text-gray-400 text-xs">Recent review</span>
                </div>
                <div className="payment-review text-gray-300 text-sm leading-relaxed">
                  “Professional, on time, and easy to work with.”
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function JobCard({ job, onPay }: { job: (typeof jobApplications)[number]; onPay?: (job: (typeof jobApplications)[number]) => void; }) {
  return (
    <div className="rounded-2xl bg-gray-900/80 border border-gray-800 shadow-lg shadow-black/20 p-6 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-white text-lg font-semibold leading-tight line-clamp-1 mb-2">{job.title}</div>
          <div className="inline-block px-3 py-1 rounded-lg bg-blue-500/10 text-white border border-blue-500/20 text-xs font-semibold">
            {job.category}
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold self-start ${statusStyles[job.status]}`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </div>
      </div>

      <p className="text-white text-sm mt-3 leading-relaxed line-clamp-3 flex-1">{job.description}</p>

      <div className="mt-4 space-y-2 text-sm text-white">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-300" />
          <span className="truncate">{job.location} • {job.distance}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-300" />
          <span>{job.budget}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-300" />
          <span>{job.duration}</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3 mt-6">
        <button className="px-4 py-2 rounded-xl border border-gray-700 text-white hover:bg-gray-800 transition text-sm font-semibold">
          Chat
        </button>
        {job.owner === 'incoming'
          ? job.status === 'pending' ? (
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400 shadow-md shadow-green-600/30 transition text-sm font-semibold">
                Accept
              </button>
            ) : job.status === 'completed' ? (
              <button
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400 shadow-md shadow-green-600/30 transition text-sm font-semibold"
                onClick={() => onPay?.(job)}
              >
                Pay
              </button>
            ) : null
          : (
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 shadow-md shadow-blue-600/30 transition text-sm font-semibold">
              Cancel
            </button>
          )}
      </div>
    </div>
  );
}

