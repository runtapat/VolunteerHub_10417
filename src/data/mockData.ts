import {
  Award,
  Bell,
  CalendarCheck,
  Compass,
  Home,
  Trophy,
  User
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import mockData from './mockData.json';
import {
  ActiveTab,
  Activity,
  Badge,
  BadgeTier,
  BadgeTierId,
  CategoryType,
  Certificate,
  LeaderboardUser,
  NavItem,
  NotificationItem,
  Registration,
  SelectOption,
  UserProfile
} from '../types';

/**
 * ============================================================
 *  SINGLE SOURCE OF TRUTH ของ Mock-up Data ทั้งแอปพลิเคชัน
 * ============================================================
 *  ข้อมูลจำลองทุกชนิดถูกเก็บไว้ใน "ไฟล์ JSON กลางเพียงไฟล์เดียว" คือ
 *  src/data/mockData.json
 *
 *  ไฟล์ .ts นี้ไม่เก็บข้อมูลเอง ทำหน้าที่เพียง 3 อย่าง
 *    1) ใส่ type ให้ข้อมูลที่อ่านมาจาก JSON
 *    2) ผูกไอคอน (React component) เข้ากับเมนู เพราะ JSON เก็บ component ไม่ได้
 *    3) คำนวณข้อมูลที่ derive ได้ เช่น กระดานผู้นำและชุดสีหมวดหมู่
 *
 *  ห้ามประกาศข้อมูลจำลองใหม่ในไฟล์นี้หรือในไฟล์คอมโพเนนต์เด็ดขาด
 *  ถ้าต้องแก้ข้อมูล ให้แก้ที่ mockData.json ที่เดียว
 * ============================================================
 */

// ---------------------------------------------------------
// 1) ข้อมูลดิบจาก JSON กลาง (อ่านอย่างเดียว ไม่มีการประกาศซ้ำ)
// ---------------------------------------------------------

export const BADGE_TIERS = mockData.badgeTiers as unknown as Record<string, BadgeTier>;

export const MOCK_BADGES = mockData.badges as unknown as Badge[];

export const MOCK_ACTIVITIES = mockData.activities as unknown as Activity[];

export const MOCK_USERS = mockData.users as unknown as UserProfile[];

export const MOCK_REGISTRATIONS = mockData.registrations as unknown as Registration[];

export const MOCK_CERTIFICATES = mockData.certificates as unknown as Certificate[];

export const MOCK_NOTIFICATIONS = mockData.notifications as unknown as NotificationItem[];

export interface CategoryEntry {
  name: CategoryType;
  icon: string;
  desc: string;
  /** สีไล่เฉดสำหรับการ์ดหมวดหมู่ */
  color: string;
  /** สีพื้นสำหรับแท่งกราฟและป้ายหมวดหมู่ */
  barColor: string;
}

export const CATEGORIES_LIST = mockData.categories as unknown as CategoryEntry[];

export const PROVINCES_LIST: string[] = mockData.provinces;

/** เป้าหมายรายเดือน (ชั่วโมงที่ทำได้จริงอ่านจาก currentUser.monthlyHours ไม่เก็บซ้ำที่นี่) */
export const MONTHLY_GOAL_DEFAULT = mockData.monthlyGoal;

export const TAB_METADATA = mockData.tabMetadata as Record<string, { title: string; subtitle: string }>;

export const EMERGENCY_RELATION_OPTIONS = mockData.emergencyRelationOptions as SelectOption[];

export const CANCELLATION_REASONS: string[] = mockData.cancellationReasons;

export const ACTIVITY_SORT_OPTIONS = mockData.activitySortOptions as SelectOption[];

/** ค่าตั้งต้นเมื่อสร้างใบสมัครใหม่ (กรณีผู้ใช้ไม่ได้กรอกข้อมูลผู้ติดต่อฉุกเฉิน) */
export const NEW_REGISTRATION_DEFAULTS = mockData.newRegistrationDefaults;

/** ข้อมูลหน่วยงานผู้ออกเกียรติบัตร และค่าสำรองเมื่อไม่พบข้อมูลกิจกรรม */
export const CERTIFICATE_DEFAULTS = mockData.certificateDefaults as unknown as {
  numberPrefix: string;
  fallbackCategoryCode: string;
  issueDate: string;
  fallbackHours: number;
  fallbackActivityTitle: string;
  fallbackCategory: CategoryType;
  fallbackOrganizerName: string;
  organizerSignatory: string;
  organizerPosition: string;
  verificationBaseUrl: string;
  templateStyle: Certificate['templateStyle'];
};

/** ข้อมูลหัวกระดาษ/ท้ายกระดาษของเอกสารใบรับรองชั่วโมงรวม (Transcript) */
export const TRANSCRIPT_DOCUMENT = mockData.transcriptDocument;

// ---------------------------------------------------------
// 2) ผูกไอคอนเข้ากับเมนู (JSON เก็บได้แค่ชื่อไอคอน)
// ---------------------------------------------------------

const NAV_ICONS: Record<string, LucideIcon> = {
  Home,
  Compass,
  CalendarCheck,
  Award,
  Bell,
  Trophy,
  User
};

interface NavItemJson {
  id: string;
  label: string;
  shortLabel: string;
  drawerLabel: string;
  sub: string;
  iconName: string;
  inBottomNav: boolean;
  showsUnreadBadge?: boolean;
}

/** เมนูนำทางชุดเดียว ใช้ร่วมกันทั้ง Sidebar (desktop), Bottom Bar และ Drawer (mobile) */
export const NAV_ITEMS: NavItem[] = (mockData.navItems as NavItemJson[]).map((item) => ({
  id: item.id as ActiveTab,
  label: item.label,
  shortLabel: item.shortLabel,
  drawerLabel: item.drawerLabel,
  sub: item.sub,
  icon: NAV_ICONS[item.iconName],
  inBottomNav: item.inBottomNav,
  showsUnreadBadge: item.showsUnreadBadge
}));

// ---------------------------------------------------------
// 3) ข้อมูลที่คำนวณต่อจากข้อมูลดิบ (ไม่มีการกรอกซ้ำ)
// ---------------------------------------------------------

/** สีป้ายหมวดหมู่ derive จาก CATEGORIES_LIST เพื่อไม่ให้ชุดสีแตกกันระหว่างหน้าจอ */
export const CATEGORY_BADGE_COLORS: Record<string, string> = CATEGORIES_LIST.reduce<Record<string, string>>(
  (acc, cat) => {
    acc[cat.name] = `${cat.barColor} text-white`;
    return acc;
  },
  {}
);

/** สีแท่งกราฟรายหมวดหมู่ derive จากชุดเดียวกัน */
export const CATEGORY_BAR_COLORS: Record<string, string> = CATEGORIES_LIST.reduce<Record<string, string>>(
  (acc, cat) => {
    acc[cat.name] = cat.barColor;
    return acc;
  },
  {}
);

/**
 * จิตอาสาที่ปรากฏเฉพาะบนกระดานผู้นำ (ไม่ใช่โปรไฟล์จำลองที่สลับใช้งานได้)
 * ผู้ใช้ที่สลับโปรไฟล์ได้ทั้ง 5 คนถูก derive มาจาก users จึงไม่ต้องประกาศซ้ำ
 */
const LEADERBOARD_GUEST_ENTRIES = mockData.leaderboardGuests as unknown as Omit<LeaderboardUser, 'rank'>[];

/**
 * กระดานผู้นำประจำเดือน = ข้อมูล derive ทั้งหมด ไม่มีการกรอกชื่อ/สถาบัน/ชั่วโมงซ้ำ
 * อันดับคำนวณจากชั่วโมงประจำเดือน (มาก -> น้อย) จึงไม่มีทางขัดแย้งกับข้อมูลในโปรไฟล์
 */
export const MOCK_LEADERBOARD: LeaderboardUser[] = [
  ...MOCK_USERS.map((user) => ({
    userId: user.id,
    fullName: `${user.fullName} (${user.nickname})`,
    institution: user.institution,
    avatar: user.avatar,
    monthlyHours: user.monthlyHours,
    totalHours: user.totalHours,
    tier: user.currentTier,
    badgesCount: user.badges.length,
    completedActivitiesCount: user.completedActivitiesCount
  })),
  ...LEADERBOARD_GUEST_ENTRIES
]
  .sort((a, b) => b.monthlyHours - a.monthlyHours)
  .map((entry, index) => ({ ...entry, rank: index + 1 }));

/** คำนวณระดับเหรียญตราจากชั่วโมงสะสม โดยอ้างอิงเกณฑ์ minHours ใน BADGE_TIERS ที่เดียว */
export const resolveTierByHours = (totalHours: number): BadgeTierId => {
  const matchedTier = Object.values(BADGE_TIERS)
    .slice()
    .sort((a, b) => b.minHours - a.minHours)
    .find((tier) => totalHours >= tier.minHours);

  return matchedTier ? matchedTier.id : 'tier_1';
};
