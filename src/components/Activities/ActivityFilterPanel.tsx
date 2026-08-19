import React from 'react';
import { 
  Search, 
  RotateCcw, 
  MapPin, 
  Clock, 
  Calendar, 
  SlidersHorizontal,
  X
} from 'lucide-react';
import { CategoryType, FilterState } from '../../types';
import { CATEGORIES_LIST, PROVINCES_LIST } from '../../data/mockData';

interface ActivityFilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const ActivityFilterPanel: React.FC<ActivityFilterPanelProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults
}) => {
  const toggleCategory = (cat: CategoryType) => {
    const isSelected = filters.categories.includes(cat);
    const newCategories = isSelected
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];

    onFilterChange({ ...filters, categories: newCategories });
  };

  const hasActiveFilters = 
    filters.searchQuery !== '' ||
    filters.categories.length > 0 ||
    filters.province !== 'ทุกจังหวัด (All Locations)' ||
    filters.minHours > 0 ||
    filters.maxHours < 12 ||
    filters.dateFilter !== 'all';

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-teal-50 shadow-sm space-y-4">
      {/* Top Search Bar & Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหากิจกรรม เช่น ปลูกป่า, สอนการบ้าน, เก็บขยะ, กยศ..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-100/80 border-none text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
            className="px-3.5 py-2.5 rounded-2xl bg-slate-100 border-none text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            <option value="date_asc">🗓️ จัดเร็วๆ นี้ (Soonest)</option>
            <option value="hours_desc">⏱️ ชั่วโมงสูงสุด (Most Hours)</option>
            <option value="popular">🔥 ได้รับความนิยม (Popular)</option>
            <option value="newest">✨ กิจกรรมใหม่ล่าสุด (Newest)</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="px-3 py-2.5 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title="ล้างตัวกรองทั้งหมด"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">ล้างตัวกรอง</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Chips Bar (Vibrant Palette style) */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-teal-600" />
            เลือกหมวดหมู่กิจกรรม (Categories):
          </span>
          {filters.categories.length > 0 && (
            <span className="text-teal-600 font-bold text-[11px]">
              เลือกแล้ว {filters.categories.length} หมวด
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = filters.categories.includes(cat.name as CategoryType);
            return (
              <button
                key={cat.name}
                onClick={() => toggleCategory(cat.name as CategoryType)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-200 active:scale-95'
                    : 'bg-slate-50 hover:bg-teal-50/50 text-slate-600 border border-slate-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Row: Province, Hours Slider, Date Presets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-teal-50 text-xs">
        {/* Province Filter */}
        <div className="space-y-1">
          <label className="text-slate-500 font-medium flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> สถานที่ / จังหวัด:
          </label>
          <select
            value={filters.province}
            onChange={(e) => onFilterChange({ ...filters, province: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-100/80 border-none text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            {PROVINCES_LIST.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Hours Filter */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> จำนวนชั่วโมงจิตอาสา:
            </span>
            <span className="text-teal-600 font-bold">{filters.maxHours} ชม.</span>
          </div>
          <input
            type="range"
            min={1}
            max={12}
            step={1}
            value={filters.maxHours}
            onChange={(e) => onFilterChange({ ...filters, maxHours: Number(e.target.value) })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
        </div>

        {/* Date Filter */}
        <div className="space-y-1">
          <label className="text-slate-500 font-medium flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> ช่วงเวลาจัดงาน:
          </label>
          <div className="grid grid-cols-3 gap-1">
            {[
              { id: 'all', label: 'ทั้งหมด' },
              { id: 'upcoming_weekend', label: 'ส-อา นี้' },
              { id: 'this_month', label: 'เดือนนี้' }
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => onFilterChange({ ...filters, dateFilter: d.id as any })}
                className={`py-1.5 px-1 rounded-lg text-center font-medium transition-colors cursor-pointer ${
                  filters.dateFilter === d.id
                    ? 'bg-teal-50 text-teal-700 font-bold border border-teal-200'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results summary bar */}
      <div className="pt-2 border-t border-teal-50 flex justify-between items-center text-xs text-slate-400">
        <span>พบกิจกรรมจิตอาสา <strong className="text-teal-700">{totalResults}</strong> กิจกรรม</span>
        {hasActiveFilters && (
          <span className="text-teal-600 font-bold">ฟิลเตอร์ทำงานอยู่</span>
        )}
      </div>
    </div>
  );
};
