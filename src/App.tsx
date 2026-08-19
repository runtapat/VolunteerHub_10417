import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  ActiveTab, 
  Activity, 
  CategoryType, 
  Certificate, 
  NotificationItem, 
  Registration, 
  UserProfile 
} from './types';
import { 
  MOCK_ACTIVITIES, 
  MOCK_CERTIFICATES, 
  MOCK_NOTIFICATIONS, 
  MOCK_REGISTRATIONS, 
  MOCK_USERS,
  BADGE_TIERS,
  CERTIFICATE_DEFAULTS,
  NEW_REGISTRATION_DEFAULTS,
  resolveTierByHours
} from './data/mockData';

// Layout & Common Components
import { Sidebar } from './components/Navigation/Sidebar';
import { Header } from './components/Navigation/Header';
import { MobileNav } from './components/Navigation/MobileNav';
import { ToastContainer, ToastMessage } from './components/Common/Toast';

// Modals
import { ActivityDetailModal } from './components/Activities/ActivityDetailModal';
import { SignUpModal } from './components/Activities/SignUpModal';
import { CancelConfirmModal } from './components/Activities/CancelConfirmModal';
import { CertificatePreviewModal } from './components/Certificates/CertificatePreviewModal';
import { TranscriptModal } from './components/Hours/TranscriptModal';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { DiscoverScreen } from './screens/DiscoverScreen';
import { MyActivitiesScreen } from './screens/MyActivitiesScreen';
import { VolunteerHoursScreen } from './screens/VolunteerHoursScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { LeaderboardScreen } from './screens/LeaderboardScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export default function App() {
  // App Navigation & Current User
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_USERS[0]);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Core Data States
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [registrations, setRegistrations] = useState<Registration[]>(MOCK_REGISTRATIONS);
  const [certificates, setCertificates] = useState<Certificate[]>(MOCK_CERTIFICATES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  // Modal States
  const [selectedActivityDetail, setSelectedActivityDetail] = useState<Activity | null>(null);
  const [selectedActivitySignUp, setSelectedActivitySignUp] = useState<Activity | null>(null);
  const [selectedActivityCancel, setSelectedActivityCancel] = useState<Activity | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);
  const [discoverInitialCategory, setDiscoverInitialCategory] = useState<CategoryType | undefined>(undefined);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Quick lookup dictionary for activities
  const activitiesMap = useMemo(() => {
    return activities.reduce<Record<string, Activity>>((acc, act) => {
      acc[act.id] = act;
      return acc;
    }, {});
  }, [activities]);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Handle Tab navigation with optional category filter preset
  const handleNavigateTab = (tab: ActiveTab, category?: CategoryType) => {
    if (category) {
      setDiscoverInitialCategory(category);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sign up action handler (Journey A)
  const handleSignUpSubmit = (regData: Partial<Registration>) => {
    if (!selectedActivitySignUp) return;

    const activity = selectedActivitySignUp;
    const newRegistration: Registration = {
      id: `reg-${Date.now()}`,
      activityId: activity.id,
      userId: currentUser.id,
      registeredAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'registered',
      fullName: regData.fullName || currentUser.fullName,
      phone: regData.phone || currentUser.phone,
      email: regData.email || currentUser.email,
      institution: regData.institution || currentUser.institution,
      studentId: regData.studentId || currentUser.studentId,
      emergencyContact: regData.emergencyContact || NEW_REGISTRATION_DEFAULTS.emergencyContact,
      specialNeeds: regData.specialNeeds
    };

    // Add registration
    setRegistrations((prev) => [newRegistration, ...prev]);

    // Increment participant count in activity
    setActivities((prev) =>
      prev.map((a) =>
        a.id === activity.id
          ? {
              ...a,
              currentParticipants: a.currentParticipants + 1,
              status: a.currentParticipants + 1 >= a.maxParticipants ? 'full' : a.status
            }
          : a
      )
    );

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: '🎉 สมัครเข้าร่วมกิจกรรมสำเร็จ!',
      message: `คุณได้ลงทะเบียนเข้าร่วมโครงการ "${activity.title}" เรียบร้อยแล้ว กรุณาตรวจสอบรายละเอียดในแท็บกิจกรรมของฉัน`,
      type: 'activity',
      createdAt: 'เมื่อสักครู่',
      read: false,
      relatedId: activity.id
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Close Modals
    setSelectedActivitySignUp(null);
    setSelectedActivityDetail(null);

    // Trigger celebration confetti & toast
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if confetti fails
    }

    addToast('success', 'สมัครเข้าร่วมกิจกรรมสำเร็จ!', `บันทึกโครงการ "${activity.title}" ลงในกิจกรรมของคุณแล้ว`);
    
    // Smoothly redirect to My Activities
    setTimeout(() => {
      setActiveTab('my_activities');
    }, 400);
  };

  // Cancel action handler (Journey C)
  const handleCancelRegistration = (activityId: string, reason: string) => {
    // Mark registration as cancelled
    setRegistrations((prev) =>
      prev.map((r) =>
        r.activityId === activityId && r.userId === currentUser.id
          ? { ...r, status: 'cancelled' }
          : r
      )
    );

    // Decrement participants & reopen status
    setActivities((prev) =>
      prev.map((a) =>
        a.id === activityId
          ? {
              ...a,
              currentParticipants: Math.max(0, a.currentParticipants - 1),
              status: 'open'
            }
          : a
      )
    );

    addToast('info', 'ยกเลิกการสมัครเรียบร้อย', 'ที่นั่งว่างถูกส่งคืนสู่ระบบสำหรับจิตอาสาท่านอื่นแล้ว');
  };

  // Simulate completion & awarding hours + certificate (Journey B)
  const handleSimulateComplete = (registrationId: string) => {
    const reg = registrations.find((r) => r.id === registrationId);
    if (!reg) return;

    const activity = activitiesMap[reg.activityId];
    const awardedHours = activity ? activity.hours : CERTIFICATE_DEFAULTS.fallbackHours;
    const newTotalHours = currentUser.totalHours + awardedHours;

    // Calculate new tier (ใช้เกณฑ์ minHours จาก BADGE_TIERS ใน mockData เป็นแหล่งเดียว)
    const newTier = resolveTierByHours(newTotalHours);

    const isLeveledUp = newTier !== currentUser.currentTier;

    // Update user stats
    // บวกชั่วโมงเข้าทุกตัวชี้วัดพร้อมกัน (ชั่วโมงรวม / ชั่วโมงเดือนนี้ / ชั่วโมงรายหมวด)
    // เพื่อให้ทุกตัวเลขที่แสดงในแอปสอดคล้องกันเสมอตามกฎ DI-01
    const awardedCategory = activity ? activity.category : CERTIFICATE_DEFAULTS.fallbackCategory;
    setCurrentUser((prev) => ({
      ...prev,
      totalHours: newTotalHours,
      currentTier: newTier,
      monthlyHours: prev.monthlyHours + awardedHours,
      completedActivitiesCount: prev.completedActivitiesCount + 1,
      categoryHours: {
        ...prev.categoryHours,
        [awardedCategory]: (prev.categoryHours[awardedCategory] || 0) + awardedHours
      }
    }));

    // Update registration status to completed
    const newCertId = `cert-${Date.now()}`;
    setRegistrations((prev) =>
      prev.map((r) =>
        r.id === registrationId
          ? { ...r, status: 'completed', hoursAwarded: awardedHours, certificateId: newCertId }
          : r
      )
    );

    // Generate new Certificate
    const newCert: Certificate = {
      id: newCertId,
      certificateNumber: `${CERTIFICATE_DEFAULTS.numberPrefix}-${
        activity ? activity.category.slice(0, 3).toUpperCase() : CERTIFICATE_DEFAULTS.fallbackCategoryCode
      }-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      userName: currentUser.fullName,
      userInstitution: `${currentUser.institution} (รหัสนักศึกษา ${currentUser.studentId || '-'})`,
      activityId: activity ? activity.id : reg.activityId,
      activityTitle: activity ? activity.title : CERTIFICATE_DEFAULTS.fallbackActivityTitle,
      category: activity ? activity.category : CERTIFICATE_DEFAULTS.fallbackCategory,
      hours: awardedHours,
      issueDate: CERTIFICATE_DEFAULTS.issueDate,
      organizerName: activity ? activity.organizer.name : CERTIFICATE_DEFAULTS.fallbackOrganizerName,
      organizerSignatory: CERTIFICATE_DEFAULTS.organizerSignatory,
      organizerPosition: CERTIFICATE_DEFAULTS.organizerPosition,
      qrVerificationUrl: `${CERTIFICATE_DEFAULTS.verificationBaseUrl}/${newCertId}`,
      templateStyle: CERTIFICATE_DEFAULTS.templateStyle
    };

    setCertificates((prev) => [newCert, ...prev]);

    // Create notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: '🎉 ได้รับเกียรติบัตร & ชั่วโมงสะสมใหม่!',
      message: `กิจกรรม "${activity?.title || 'จิตอาสา'}" ได้รับการบันทึก +${awardedHours} ชั่วโมง และออกเกียรติบัตรเรียบร้อยแล้ว`,
      type: 'certificate',
      createdAt: 'เมื่อสักครู่',
      read: false,
      relatedId: newCertId
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Trigger major confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {
      // Ignore if confetti fails
    }

    addToast(
      'success',
      `บันทึกสำเร็จ +${awardedHours} ชั่วโมง!`,
      isLeveledUp
        ? `ยินดีด้วย! คุณเลื่อนระดับเป็น "${BADGE_TIERS[newTier].thaiName}" 🎉`
        : 'เกียรติบัตรอิเล็กทรอนิกส์พร้อมให้ดาวน์โหลดแล้ว'
    );
  };

  // Mock PDF Download
  const handleDownloadMockPDF = (cert: Certificate) => {
    addToast(
      'success',
      'กำลังดาวน์โหลดเกียรติบัตร (HD PDF)...',
      `ไฟล์เกียรติบัตร ${cert.certificateNumber} กำลังถูกประมวลผลความละเอียดสูงสำหรับพอร์ตโฟลิโอ`
    );
  };

  // Mark all notifications as read
  const handleMarkAllNotifsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('info', 'ทำเครื่องหมายอ่านแล้วทั้งหมด', 'การแจ้งเตือนทั้งหมดถูกตั้งเป็นอ่านแล้ว');
  };

  return (
    <div className="min-h-screen bg-[#F0F9F6] flex flex-col font-['IBM_Plex_Sans_Thai',sans-serif] text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
      {/* Toast Notifications Overlay */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      <div className="flex-1 flex">
        {/* Desktop Sidebar (Persistent Left Sidebar) */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          unreadCount={unreadNotificationsCount}
        />

        {/* Mobile Navigation Drawer & Bottom Bar */}
        <MobileNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          unreadCount={unreadNotificationsCount}
          isDrawerOpen={isMobileDrawerOpen}
          setIsDrawerOpen={setIsMobileDrawerOpen}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
          {/* Top Header Bar */}
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentUser={currentUser}
            onSelectUser={(u) => {
              setCurrentUser(u);
              addToast('info', `สลับโปรไฟล์ผู้ใช้: ${u.nickname}`, `แสดงมุมมอง ${u.institution}`);
            }}
            unreadCount={unreadNotificationsCount}
            onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
          />

          {/* Page Body Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {activeTab === 'home' && (
              <HomeScreen
                currentUser={currentUser}
                activities={activities}
                registrations={registrations}
                onSelectActivity={(act) => setSelectedActivityDetail(act)}
                onNavigateTab={handleNavigateTab}
                onQuickSignUp={(act) => setSelectedActivitySignUp(act)}
              />
            )}

            {activeTab === 'discover' && (
              <DiscoverScreen
                currentUser={currentUser}
                activities={activities}
                registrations={registrations}
                initialCategory={discoverInitialCategory}
                onSelectActivity={(act) => setSelectedActivityDetail(act)}
                onQuickSignUp={(act) => setSelectedActivitySignUp(act)}
              />
            )}

            {activeTab === 'my_activities' && (
              <MyActivitiesScreen
                currentUser={currentUser}
                registrations={registrations}
                activitiesMap={activitiesMap}
                certificates={certificates}
                onSelectActivity={(act) => setSelectedActivityDetail(act)}
                onOpenCancelModal={(act) => setSelectedActivityCancel(act)}
                onSimulateCompleteActivity={handleSimulateComplete}
                onOpenCertificateModal={(cert) => setSelectedCertificate(cert)}
                onNavigateToDiscover={() => setActiveTab('discover')}
              />
            )}

            {activeTab === 'hours_certificates' && (
              <VolunteerHoursScreen
                currentUser={currentUser}
                certificates={certificates}
                registrations={registrations}
                onOpenCertificateModal={(cert) => setSelectedCertificate(cert)}
                onOpenTranscriptModal={() => setShowTranscriptModal(true)}
                onDownloadMockPDF={handleDownloadMockPDF}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationsScreen
                currentUser={currentUser}
                notifications={notifications}
                onMarkAllAsRead={handleMarkAllNotifsAsRead}
                onSelectNotification={(notif) => {
                  setNotifications((prev) =>
                    prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
                  );
                  if (notif.type === 'certificate') {
                    const cert = certificates[0];
                    if (cert) setSelectedCertificate(cert);
                  } else if (notif.type === 'activity') {
                    setActiveTab('discover');
                  }
                }}
              />
            )}

            {activeTab === 'leaderboard' && (
              <LeaderboardScreen currentUser={currentUser} />
            )}

            {activeTab === 'profile' && (
              <ProfileScreen
                currentUser={currentUser}
                onSelectUser={(u) => {
                  setCurrentUser(u);
                  addToast('info', `สลับโปรไฟล์: ${u.nickname}`, u.institution);
                }}
                registrations={registrations}
                activitiesMap={activitiesMap}
                onOpenTranscriptModal={() => setShowTranscriptModal(true)}
              />
            )}
          </main>
        </div>
      </div>

      {/* MODALS */}
      {/* Activity Detail Modal */}
      {selectedActivityDetail && (
        <ActivityDetailModal
          activity={selectedActivityDetail}
          currentUser={currentUser}
          isRegistered={registrations.some(
            (r) =>
              r.activityId === selectedActivityDetail.id &&
              r.userId === currentUser.id &&
              r.status === 'registered'
          )}
          onClose={() => setSelectedActivityDetail(null)}
          onOpenSignUp={(act) => {
            setSelectedActivitySignUp(act);
          }}
          onOpenCancel={(act) => {
            setSelectedActivityCancel(act);
          }}
        />
      )}

      {/* Sign Up Form Modal */}
      {selectedActivitySignUp && (
        <SignUpModal
          activity={selectedActivitySignUp}
          currentUser={currentUser}
          onClose={() => setSelectedActivitySignUp(null)}
          onSubmit={handleSignUpSubmit}
        />
      )}

      {/* Cancel Confirmation Modal */}
      {selectedActivityCancel && (
        <CancelConfirmModal
          activity={selectedActivityCancel}
          onClose={() => setSelectedActivityCancel(null)}
          onConfirmCancel={handleCancelRegistration}
        />
      )}

      {/* Digital Certificate Preview Modal */}
      {selectedCertificate && (
        <CertificatePreviewModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
          onDownloadMockPDF={handleDownloadMockPDF}
        />
      )}

      {/* Full Volunteer Transcript Export Modal */}
      {showTranscriptModal && (
        <TranscriptModal
          currentUser={currentUser}
          completedRegistrations={registrations.filter(
            (r) => r.userId === currentUser.id && r.status === 'completed'
          )}
          activitiesMap={activitiesMap}
          onClose={() => setShowTranscriptModal(false)}
          onDownload={() => {
            addToast('success', 'ส่งออกใบบันทึกชั่วโมงสำเร็จ', 'บันทึกเอกสาร Volunteer Transcript (PDF) เรียบร้อยแล้ว');
          }}
        />
      )}
    </div>
  );
}
