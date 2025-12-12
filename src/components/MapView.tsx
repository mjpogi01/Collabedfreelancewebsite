import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { MapPin, Filter, Search, DollarSign, Clock, Briefcase, X } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet - must run before any markers are created
let iconFixApplied = false;
const fixLeafletIcons = () => {
  if (iconFixApplied || typeof window === 'undefined' || !L || !L.Icon || !L.Icon.Default) return;
  
  try {
    // Only delete if it exists
    if ((L.Icon.Default.prototype as any)._getIconUrl) {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
    }
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
    iconFixApplied = true;
  } catch (e) {
    console.warn('Failed to fix Leaflet icons:', e);
  }
};

// Apply fix immediately
if (typeof window !== 'undefined') {
  fixLeafletIcons();
}

// Component to handle map clicks and close popup
function MapClickHandler({ onMapClick }: { onMapClick: () => void }) {
  useMapEvents({
    click: () => {
      onMapClick();
    },
  });
  return null;
}

// Fly to selected job when it changes
function SelectedJobFlyTo({ job }: { job: JobOffer | null }) {
  const map = useMap();

  useEffect(() => {
    if (job) {
      map.flyTo([job.lat, job.lng], 15, { duration: 0.6 });
    }
  }, [job, map]);

  return null;
}

export interface JobOffer {
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

type MapViewProps = {
  title?: string;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  jobOffers: JobOffer[];
  onPostJob: () => void;
  onApplyJob?: (job: JobOffer) => void;
  isTalent?: boolean;
  hidePostButton?: boolean;
  postButtonLabel?: string;
  onHireTalent?: (job: JobOffer) => void;
  onViewProfile?: (job: JobOffer) => void;
};

export function MapView({ title = 'Local Job Offers', searchTerm, onSearchTermChange, jobOffers, onPostJob, onApplyJob, isTalent = false, hidePostButton = false, postButtonLabel, onHireTalent, onViewProfile }: MapViewProps) {
  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const searchPlaceholder = isTalent ? 'Search talents or skills...' : 'Search jobs...';
  const postLabel = postButtonLabel || (isTalent ? 'Post Talent' : 'Post a Job');

  // Ensure icon fix is applied
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  // Fallback icons (not used if avatar-based icons succeed)
  const defaultIcon = useMemo(() => {
    if (typeof window === 'undefined' || !L || !L.divIcon) return undefined;
    try {
      return L.divIcon({
        className: 'custom-default-marker',
        html: '<div style="background-color: #3388ff; width: 25px; height: 41px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; box-shadow: 0 3px 14px rgba(0,0,0,0.4);"></div>',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      });
    } catch (e) {
      console.warn('Failed to create default icon:', e);
      return undefined;
    }
  }, []);

  const redIcon = useMemo(() => {
    if (typeof window === 'undefined' || !L || !L.divIcon) return undefined;
    try {
      return L.divIcon({
        className: 'custom-red-marker',
        html: '<div style="background-color: #ef4444; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 3px 14px rgba(0,0,0,0.4); position: relative;"><div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(45deg); width: 12px; height: 12px; background-color: white; border-radius: 50%;"></div></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
      });
    } catch (e) {
      console.warn('Failed to create red icon:', e);
      return undefined;
    }
  }, []);

  const getMarkerIcon = useCallback(
    (job: JobOffer, selected: boolean) => {
      if (typeof window === 'undefined' || !L || !L.divIcon) {
        return selected ? redIcon || defaultIcon : defaultIcon;
      }
      const size = 46;
      const pinColor = selected ? '#ef4444' : '#3b82f6';
      const avatar = job.avatar || '';
      try {
        return L.divIcon({
          className: 'avatar-marker',
          html: `
            <div style="width:${size}px;height:${size}px;position:relative;transform:translate(-50%,-100%);">
              <div style="width:${size}px;height:${size}px;background:${pinColor};border:3px solid #fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 6px 18px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;">
                <div style="width:26px;height:26px;border-radius:50%;border:2px solid #fff;overflow:hidden;background:#111;transform:rotate(45deg);">
                  <img src="${avatar}" style="width:100%;height:100%;object-fit:cover;" />
                </div>
              </div>
            </div>
          `,
          iconSize: [size, size],
          iconAnchor: [size / 2, size - 6],
          popupAnchor: [0, -size / 2]
        });
      } catch (err) {
        console.warn('Failed to create avatar icon:', err);
        return selected ? redIcon || defaultIcon : defaultIcon;
      }
    },
    [defaultIcon, redIcon]
  );

  const categories = Array.from(
    new Set(['all', ...jobOffers.map((job) => job.category)])
  );

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const matchesSearch = (job: JobOffer) =>
    !normalizedSearch ||
    job.title.toLowerCase().includes(normalizedSearch) ||
    job.description.toLowerCase().includes(normalizedSearch) ||
    job.location.toLowerCase().includes(normalizedSearch);

  const filteredJobs = (filterCategory === 'all' 
    ? jobOffers 
    : jobOffers.filter(job => job.category === filterCategory)
  ).filter(matchesSearch);

  // Don't render map until icons are ready
  if (!defaultIcon) {
    return (
      <div className="flex bg-gray-950 -mt-20 md:-mt-24 h-screen items-center justify-center">
        <div className="text-white">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-950 -mt-20 md:-mt-24 h-screen">
      {/* Sidebar with job listings */}
      <div className="w-full lg:w-2/5 bg-gray-900 overflow-y-auto border-r border-gray-800">
        <div className="p-6">
          <div className="flex items-center justify-between gap-3 mb-5">
            <h2 className="text-white text-xl sm:text-2xl font-semibold">{title}</h2>
            {!hidePostButton && (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium shadow-lg shadow-blue-600/20"
                onClick={onPostJob}
              >
                {postLabel}
              </button>
            )}
          </div>
          
          {/* Search + Map Filters */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500 transition-all"
              />
            </div>
            <button
              className="p-3 rounded-xl border border-gray-800 bg-gray-850 hover:bg-gray-800 transition-all text-gray-200 shadow-sm shadow-black/30"
              aria-label="Map filters"
              onClick={(e) => e.preventDefault()}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 overflow-x-auto pb-3 mb-5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          <div className="text-gray-400 mb-5">
            {filteredJobs.length} {isTalent ? 'profiles' : 'opportunities'} found
          </div>
        </div>

        {/* Job Cards */}
        <div className="divide-y divide-gray-800 px-6 pb-6">
          {filteredJobs.map(job => (
            <div
              role="button"
              tabIndex={0}
              key={job.id}
              onClick={() => setSelectedJob(job)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedJob(job);
                }
              }}
              className={`w-full p-5 text-left hover:bg-gray-800/50 transition-all cursor-pointer ${
                selectedJob?.id === job.id ? 'bg-gray-800/70 border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="mb-3">
                <h3 className="text-white mb-2 text-lg font-semibold">{job.title}</h3>
                <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 text-sm">
                  {job.category}
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
                <div
                  role="button"
                  tabIndex={0}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewProfile?.(job);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onViewProfile?.(job);
                    }
                  }}
                >
                  <img src={job.avatar} alt={job.postedBy} className="w-8 h-8 rounded-full border-2 border-gray-700" />
                  <span className="text-gray-300 text-sm underline-offset-2 hover:underline">{isTalent ? 'Talent: ' : 'Posted by '}{job.postedBy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="hidden lg:block flex-1 relative bg-gray-950">
        <div 
          className="w-full h-full relative"
          onClick={() => setSelectedJob(null)}
        >
          {/* Leaflet Map */}
          <MapContainer
            center={[13.7565, 121.0583]} // Batangas City coordinates
            zoom={13}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
            className="z-0"
          >
            <MapClickHandler onMapClick={() => setSelectedJob(null)} />
            <SelectedJobFlyTo job={selectedJob} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                {filteredJobs.map((job) => (
                  <Marker
                    key={job.id}
                    position={[job.lat, job.lng]}
                    icon={getMarkerIcon(job, selectedJob?.id === job.id)}
                    eventHandlers={{
                      click: () => setSelectedJob(job),
                    }}
                  >
                    <Popup>
                      <div className="text-sm">
                        <h3 className="font-semibold mb-1">{job.title}</h3>
                        <p className="text-gray-600">{job.location}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
          </MapContainer>

          {/* Selected Job Card Overlay */}
          {selectedJob && (
            <div 
              className="absolute top-6 right-6 bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-800 p-6 max-w-sm w-[90%] lg:w-[360px] z-30 animate-[slideUp_0.25s_ease-out]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="pr-4">
                  <h3 className="text-white mb-1 text-lg font-semibold">{selectedJob.title}</h3>
                  <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-300 rounded-lg border border-blue-500/20 text-xs">
                    {selectedJob.category}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-800/70 hover:bg-gray-700 rounded-xl text-gray-400 hover:text-white transition-all border border-gray-700/70"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed text-sm line-clamp-3">{selectedJob.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4 text-gray-200 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span>{selectedJob.budget}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{selectedJob.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <span>{selectedJob.distance}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                <div
                  role="button"
                  tabIndex={0}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewProfile?.(selectedJob);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onViewProfile?.(selectedJob);
                    }
                  }}
                >
                  <img src={selectedJob.avatar} alt={selectedJob.postedBy} className="w-9 h-9 rounded-full border-2 border-gray-700" />
                  <span className="text-gray-200 text-sm underline-offset-2 hover:underline">{isTalent ? 'Talent: ' : 'Posted by '}{selectedJob.postedBy}</span>
                </div>
                <button
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/30 text-sm font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isTalent) {
                      onHireTalent?.(selectedJob);
                    } else {
                      onApplyJob?.(selectedJob);
                    }
                  }}
                >
                  {isTalent ? 'Hire' : 'Apply Now'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
