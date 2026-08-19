import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  LayoutGrid, 
  List, 
  SlidersHorizontal, 
  Sparkles, 
  RotateCcw,
  Clock,
  Loader2
} from 'lucide-react';
import { Activity, CategoryType, FilterState, Registration, UserProfile } from '../types';
import { ActivityFilterPanel } from '../components/Activities/ActivityFilterPanel';
import { ActivityCard } from '../components/Activities/ActivityCard';
import { ActivitySkeletonCard } from '../components/Common/SkeletonCard';
import { EmptyState } from '../components/Common/EmptyState';

interface DiscoverScreenProps {
  currentUser: UserProfile;
  activities: Activity[];
  registrations: Registration[];
  initialCategory?: CategoryType;
  onSelectActivity: (act: Activity) => void;
  onQuickSignUp: (act: Activity) => void;
}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  currentUser,
  activities,
  registrations,
  initialCategory,
  onSelectActivity,
  onQuickSignUp
}) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    categories: initialCategory ? [initialCategory] : [],
    province: 'ทุกจังหวัด (All Locations)',
    minHours: 0,
    maxHours: 12,
    dateFilter: 'all',
    sortBy: 'date_asc'
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoadingMock, setIsLoadingMock] = useState(false);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      categories: [],
      province: 'ทุกจังหวัด (All Locations)',
      minHours: 0,
      maxHours: 12,
      dateFilter: 'all',
      sortBy: 'date_asc'
    });
  };

  const simulateLoading = () => {
    setIsLoadingMock(true);
    setTimeout(() => setIsLoadingMock(false), 800);
  };

  // Filter & Sort Logic
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      // Search query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = act.title.toLowerCase().includes(q);
        const matchesDesc = act.description.toLowerCase().includes(q);
        const matchesOrg = act.organizer.name.toLowerCase().includes(q);
        const matchesTag = act.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesOrg && !matchesTag) return false;
      }

      // Categories
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(act.category)) return false;
      }

      // Province
      if (filters.province !== 'ทุกจังหวัด (All Locations)') {
        if (act.province !== filters.province) return false;
      }

      // Max hours
      if (act.hours > filters.maxHours) return false;

      // Date Presets
      if (filters.dateFilter === 'upcoming_weekend') {
        // Simple mock match for weekend
        if (!act.date.includes('08-23') && !act.date.includes('08-29') && !act.date.includes('09-06')) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'hours_desc') return b.hours - a.hours;
      if (filters.sortBy === 'popular') return b.currentParticipants - a.currentParticipants;
      if (filters.sortBy === 'date_asc') return a.date.localeCompare(b.date);
      if (filters.sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0;
    });
  }, [activities, filters]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">ค้นหากิจกรรมจิตอาสา (Discover)</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
              {filteredActivities.length} โครงการ
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            ค้นหาและกรองกิจกรรมตามหมวดหมู่ จังหวัด และจำนวนชั่วโมงที่ต้องการ
          </p>
        </div>

        {/* View Switcher & Simulation Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={simulateLoading}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            title="ทดสอบ Skeleton Loading ตามสเปก PRD"
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">จำลอง</span> โหลดข้อมูล (Skeleton)
          </button>

          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Adaptive Filters Panel */}
      <ActivityFilterPanel
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
        totalResults={filteredActivities.length}
      />

      {/* Activities Grid or Skeleton State */}
      {isLoadingMock ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ActivitySkeletonCard key={idx} />
          ))}
        </div>
      ) : filteredActivities.length === 0 ? (
        <EmptyState
          title="ไม่พบกิจกรรมจิตอาสาที่ตรงกับตัวกรอง"
          description="ลองเปลี่ยนคำค้นหา ปรับช่วงชั่วโมง หรือคลิกปุ่มล้างตัวกรองเพื่อดูกิจกรรมทั้งหมด"
          actionText="ล้างตัวกรองทั้งหมด"
          onAction={handleResetFilters}
        />
      ) : (
        <div className={`grid gap-5 ${
          viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 md:grid-cols-2'
        }`}>
          {filteredActivities.map((act) => {
            const isReg = registrations.some(
              (r) => r.activityId === act.id && r.userId === currentUser.id && r.status === 'registered'
            );
            return (
              <ActivityCard
                key={act.id}
                activity={act}
                onSelect={onSelectActivity}
                isRegistered={isReg}
                onQuickSignUp={onQuickSignUp}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
