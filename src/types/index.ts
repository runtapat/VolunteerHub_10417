export type CategoryType = 
  | 'การศึกษา' 
  | 'สิ่งแวดล้อม' 
  | 'ผู้สูงอายุ' 
  | 'สัตว์' 
  | 'สุขภาพ' 
  | 'ชุมชน';

export type ProvinceType = 
  | 'กรุงเทพมหานคร' 
  | 'สมุทรปราการ' 
  | 'นนทบุรี' 
  | 'ปทุมธานี' 
  | 'ชลบุรี' 
  | 'เชียงใหม่' 
  | 'นครปฐม' 
  | 'ภูเก็ต' 
  | 'ขอนแก่น' 
  | 'ออนไลน์ (Online)';

export type ActivityStatus = 'open' | 'almost_full' | 'full' | 'completed' | 'cancelled';

export type RegistrationStatus = 'registered' | 'checked_in' | 'completed' | 'cancelled';

export type BadgeTierId = 'tier_1' | 'tier_2' | 'tier_3' | 'tier_4';

export interface BadgeTier {
  id: BadgeTierId;
  name: string;
  thaiName: string;
  minHours: number;
  maxHours: number | null;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export interface Badge {
  id: string;
  tierId: BadgeTierId;
  name: string;
  category?: CategoryType | 'all';
  icon: string;
  description: string;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface Activity {
  id: string;
  title: string;
  category: CategoryType;
  organizer: {
    name: string;
    avatar: string;
    verified: boolean;
    contactPhone?: string;
    contactEmail?: string;
    organizationType: string;
  };
  description: string;
  duties: string[];
  qualifications: string[];
  benefits: string[];
  locationName: string;
  province: ProvinceType;
  address: string;
  coordinates?: { lat: number; lng: number };
  date: string;
  time: string;
  hours: number;
  maxParticipants: number;
  currentParticipants: number;
  status: ActivityStatus;
  imageUrl: string;
  tags: string[];
  isFeatured?: boolean;
  registrationDeadline: string;
  dressCode?: string;
  contactPerson: string;
}

export interface Registration {
  id: string;
  activityId: string;
  userId: string;
  registeredAt: string;
  status: RegistrationStatus;
  fullName: string;
  phone: string;
  email: string;
  studentId?: string;
  institution?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  specialNeeds?: string;
  hoursAwarded?: number;
  certificateId?: string;
  feedback?: {
    rating: number;
    comment: string;
  };
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  userId: string;
  userName: string;
  userInstitution?: string;
  activityId: string;
  activityTitle: string;
  category: CategoryType;
  hours: number;
  issueDate: string;
  organizerName: string;
  organizerSignatory: string;
  organizerPosition: string;
  qrVerificationUrl: string;
  templateStyle: 'gold' | 'emerald' | 'teal';
}

export interface UserProfile {
  id: string;
  fullName: string;
  nickname: string;
  role: 'student' | 'university_student' | 'young_adult';
  institution: string;
  facultyOrSchool?: string;
  studentId?: string;
  avatar: string;
  email: string;
  phone: string;
  totalHours: number;
  currentTier: BadgeTierId;
  joinedDate: string;
  bio: string;
  skills: string[];
  interests: CategoryType[];
  badges: string[]; // Badge IDs
  rankMonthly: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'activity' | 'certificate' | 'badge' | 'reminder' | 'system';
  createdAt: string;
  read: boolean;
  actionUrl?: string;
  relatedId?: string;
}

export interface LeaderboardUser {
  rank: number;
  userId: string;
  fullName: string;
  institution: string;
  avatar: string;
  monthlyHours: number;
  totalHours: number;
  tier: BadgeTierId;
  badgesCount: number;
  completedActivitiesCount: number;
}

export interface FilterState {
  searchQuery: string;
  categories: CategoryType[];
  province: string;
  minHours: number;
  maxHours: number;
  dateFilter: 'all' | 'upcoming_weekend' | 'this_month' | 'custom';
  startDate?: string;
  endDate?: string;
  sortBy: 'date_asc' | 'hours_desc' | 'popular' | 'newest';
}

export type ActiveTab = 
  | 'home' 
  | 'discover' 
  | 'my_activities' 
  | 'hours_certificates' 
  | 'notifications' 
  | 'leaderboard' 
  | 'profile';
