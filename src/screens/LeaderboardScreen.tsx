import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Crown, 
  Sparkles, 
  Medal, 
  CheckCircle2, 
  Users, 
  Flame, 
  TrendingUp, 
  Star,
  ChevronRight
} from 'lucide-react';
import { LeaderboardUser, UserProfile } from '../types';
import { BADGE_TIERS, MOCK_BADGES, MOCK_LEADERBOARD } from '../data/mockData';

interface LeaderboardScreenProps {
  currentUser: UserProfile;
  onOpenBadgeDetails?: (badgeId: string) => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  currentUser,
  onOpenBadgeDetails
}) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'tiers'>('leaderboard');

  const top3 = MOCK_LEADERBOARD.slice(0, 3);
  const restList = MOCK_LEADERBOARD.slice(3);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">ความสำเร็จ & ผู้นำ (Achievements & Leaderboard)</h2>
        <p className="text-xs text-slate-500 mt-1">
          ระบบเกียรติยศ 4 ระดับ และตารางจัดอันดับการทำความดีประจำเดือน สิงหาคม 2026
        </p>
      </div>

      {/* Tabs Row */}
      <div className="flex border-b border-teal-100 gap-4">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`pb-3 px-2 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'leaderboard'
              ? 'border-teal-500 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>กระดานผู้นำประจำเดือน (Leaderboard)</span>
        </button>

        <button
          onClick={() => setActiveTab('tiers')}
          className={`pb-3 px-2 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'tiers'
              ? 'border-teal-500 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-4 h-4 text-teal-600" />
          <span>เกณฑ์ระดับเหรียญตรา & Badges (4 Tiers)</span>
        </button>
      </div>

      {/* LEADERBOARD VIEW */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          {/* Top 3 Podium Cards (Vibrant Gradient Theme) */}
          <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-800 text-white rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-teal-900/10 relative overflow-hidden">
            <div className="text-center space-y-1 mb-8 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <Flame className="w-3.5 h-3.5" />
                <span>TOP 3 VOLUNTEER HEROES OF THE MONTH</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">ทำเนียบจิตอาสายอดเยี่ยมประจำเดือน</h3>
            </div>

            {/* Podium grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end max-w-2xl mx-auto relative z-10">
              {/* Rank 2 (Left) */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="relative">
                  <img
                    src={top3[1].avatar}
                    alt={top3[1].fullName}
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-slate-200 shadow-lg"
                  />
                  <span className="absolute -bottom-2 -right-1 w-6 h-6 bg-slate-200 text-slate-900 rounded-full font-bold text-xs flex items-center justify-center shadow-md">
                    2
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-xs sm:text-sm text-white truncate max-w-[100px] sm:max-w-none">{top3[1].fullName.split(' ')[0]}</p>
                  <p className="text-[10px] text-teal-200 truncate">{top3[1].institution.split(' ')[0]}</p>
                </div>
                <div className="w-full bg-teal-900/60 rounded-t-2xl py-3 border border-teal-600/40">
                  <span className="text-sm sm:text-base font-extrabold text-teal-200">+{top3[1].monthlyHours} ชม.</span>
                </div>
              </div>

              {/* Rank 1 (Center - Tallest) */}
              <div className="flex flex-col items-center text-center space-y-2">
                <Crown className="w-8 h-8 text-amber-300 animate-bounce" />
                <div className="relative">
                  <img
                    src={top3[0].avatar}
                    alt={top3[0].fullName}
                    className="w-18 h-18 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-amber-300 shadow-xl"
                  />
                  <span className="absolute -bottom-2 -right-1 w-7 h-7 bg-amber-400 text-amber-950 rounded-full font-extrabold text-sm flex items-center justify-center shadow-md">
                    1
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm sm:text-base text-amber-200 truncate max-w-[120px] sm:max-w-none">{top3[0].fullName.split(' ')[0]}</p>
                  <p className="text-[10px] text-teal-100 truncate">{top3[0].institution.split(' ')[0]}</p>
                </div>
                <div className="w-full bg-amber-400/20 rounded-t-2xl py-5 border border-amber-300/40">
                  <span className="text-base sm:text-xl font-extrabold text-amber-300">+{top3[0].monthlyHours} ชม.</span>
                  <p className="text-[9px] text-amber-200">อันดับ 1 เดือนนี้</p>
                </div>
              </div>

              {/* Rank 3 (Right) */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="relative">
                  <img
                    src={top3[2].avatar}
                    alt={top3[2].fullName}
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-amber-600 shadow-lg"
                  />
                  <span className="absolute -bottom-2 -right-1 w-6 h-6 bg-amber-600 text-white rounded-full font-bold text-xs flex items-center justify-center shadow-md">
                    3
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-xs sm:text-sm text-white truncate max-w-[100px] sm:max-w-none">{top3[2].fullName.split(' ')[0]}</p>
                  <p className="text-[10px] text-teal-200 truncate">{top3[2].institution.split(' ')[0]}</p>
                </div>
                <div className="w-full bg-teal-900/60 rounded-t-2xl py-2.5 border border-teal-600/40">
                  <span className="text-sm sm:text-base font-extrabold text-teal-200">+{top3[2].monthlyHours} ชม.</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Current Rank Callout */}
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center font-extrabold text-base shadow-sm shadow-teal-200">
                #{currentUser.rankMonthly}
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">อันดับของคุณ: {currentUser.fullName}</p>
                <p className="text-xs text-teal-700">สะสมในเดือนนี้ 18 ชั่วโมง (สะสมรวมตลอดกาล {currentUser.totalHours} ชั่วโมง)</p>
              </div>
            </div>
            <span className="text-xs font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-full border border-teal-200">
              Top 5% ของผู้ใช้ทั้งหมด
            </span>
          </div>

          {/* Full Leaderboard Table */}
          <div className="bg-white rounded-3xl border border-teal-50 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-teal-50 flex items-center justify-between">
              <h4 className="font-bold text-slate-800 text-sm">ตารางอันดับจิตอาสา (Leaderboard Table)</h4>
              <span className="text-xs text-slate-400">อัปเดตแบบ Real-time</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-teal-50/50 text-slate-600 font-bold border-b border-teal-50">
                  <tr>
                    <th className="p-3.5 text-center w-16">อันดับ</th>
                    <th className="p-3.5">จิตอาสา</th>
                    <th className="p-3.5">สถาบันการศึกษา</th>
                    <th className="p-3.5 text-center">ระดับ</th>
                    <th className="p-3.5 text-center">ชั่วโมงเดือนนี้</th>
                    <th className="p-3.5 text-center">ชั่วโมงรวม</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-50">
                  {MOCK_LEADERBOARD.map((user) => {
                    const isMe = user.userId === currentUser.id;
                    const tier = BADGE_TIERS[user.tier] || BADGE_TIERS.tier_1;

                    return (
                      <tr key={user.userId} className={`hover:bg-teal-50/30 transition-colors ${isMe ? 'bg-teal-50/60 font-semibold' : ''}`}>
                        <td className="p-3.5 text-center font-bold font-mono">
                          {user.rank === 1 && '🥇 1'}
                          {user.rank === 2 && '🥈 2'}
                          {user.rank === 3 && '🥉 3'}
                          {user.rank > 3 && `#${user.rank}`}
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <img src={user.avatar} alt={user.fullName} className="w-8 h-8 rounded-full object-cover border border-teal-200" />
                            <div>
                              <p className="font-bold text-slate-800">{user.fullName}</p>
                              {isMe && <span className="text-[10px] text-teal-700 font-bold">(บัญชีของคุณ)</span>}
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-600">{user.institution}</td>
                        <td className="p-3.5 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-100">
                            {tier.icon} {tier.thaiName.split(' ')[1]}
                          </span>
                        </td>
                        <td className="p-3.5 text-center font-extrabold text-teal-600">+{user.monthlyHours} ชม.</td>
                        <td className="p-3.5 text-center text-slate-600 font-medium">{user.totalHours} ชม.</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TIERS & BADGES VIEW */}
      {activeTab === 'tiers' && (
        <div className="space-y-6">
          {/* 4 Tiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(BADGE_TIERS).map((tier) => {
              const isCurrent = currentUser.currentTier === tier.id;
              return (
                <div
                  key={tier.id}
                  className={`p-6 rounded-[2rem] border transition-all space-y-3 ${
                    isCurrent
                      ? 'bg-teal-50 border-teal-500 shadow-md ring-2 ring-teal-500/20'
                      : 'bg-white border-teal-50 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 bg-white rounded-2xl border border-teal-100 shadow-xs">
                        {tier.icon}
                      </span>
                      <div>
                        <h4 className="font-bold text-base text-slate-800">{tier.thaiName}</h4>
                        <p className="text-xs text-slate-500">{tier.name}</p>
                      </div>
                    </div>

                    {isCurrent && (
                      <span className="px-3 py-1 rounded-full bg-teal-500 text-white text-xs font-bold shadow-xs">
                        ระดับของคุณ
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600">{tier.description}</p>

                  <div className="pt-2 border-t border-teal-50 flex items-center justify-between text-xs font-semibold text-teal-800">
                    <span>เกณฑ์ชั่วโมง:</span>
                    <span>{tier.minHours} - {tier.maxHours ? `${tier.maxHours} ชม.` : 'ไม่จำกัด'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Badges Grid */}
          <div className="bg-white rounded-3xl p-6 border border-teal-50 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-base">เหรียญตราเกียรติยศ (Badges Collection)</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_BADGES.map((badge) => {
                const isUnlocked = currentUser.badges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                      isUnlocked
                        ? 'bg-teal-50/50 border-teal-200'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <span className={`text-2xl p-2 rounded-xl bg-white shadow-xs border ${isUnlocked ? 'border-teal-200' : 'grayscale'}`}>
                      {badge.icon}
                    </span>
                    <div className="min-w-0 flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-slate-800 truncate">{badge.name}</h5>
                      </div>
                      <p className="text-slate-500 mt-1">{badge.description}</p>
                      <div className="mt-2 flex items-center justify-between text-[10px]">
                        {isUnlocked ? (
                          <span className="text-teal-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-teal-600" /> ปลดล็อกแล้ว ({badge.unlockedAt})
                          </span>
                        ) : (
                          <span className="text-slate-400 font-medium">ยังไม่ปลดล็อก</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
