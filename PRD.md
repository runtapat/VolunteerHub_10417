# VolunteerHub — Frontend PRD

## 1. Product Overview
- **Name:** VolunteerHub Thailand
- **Description:** A volunteer activity platform for Thai students and young adults to discover activities, sign up, accumulate verified volunteer hours, and collect digital certificates
- **Problem:** Volunteer opportunities are scattered across social media pages, and volunteer hours are still tracked on paper — making them easy to lose, hard to verify, and difficult to compile for scholarship (กยศ.) or TCAS portfolio applications
- **Target Users:** High school students (TCAS portfolio), university students (scholarship hour requirements), young working adults who volunteer on weekends

## 2. User Stories
1. As a student, I want to filter activities by category, province, and hours so I can find events I can actually attend
2. As a student, I want to see remaining seats on each activity so I can decide before it fills up
3. As a user, I want the sign-up form pre-filled with my profile so I don't retype my details every time
4. As a parent, I want an emergency contact recorded on every sign-up so I know my child is safe
5. As a student, I want to cancel a registration with a reason so the seat returns to other volunteers
6. As a student, I want to see my hours broken down by category so I know which area to strengthen
7. As a student, I want to download a certificate with a verification code so I can attach it to my scholarship application
8. As a user, I want to see my tier, badges, and monthly rank so I stay motivated to volunteer again

## 3. Screen Definitions
- **Home:** Welcome banner, featured activities, category shortcuts, monthly goal progress, upcoming registered activities
- **Discover:** Search bar, filter panel (category, province, hours range, date), sort dropdown, result grid with activity cards
- **My Activities:** Tabs for upcoming, completed, and cancelled registrations, with cancel and complete-simulation actions
- **Hours & Certificates:** Four summary stat cards, hours-by-category chart, digital certificate vault, transcript export button
- **Notifications:** Chronological list of activity, certificate, badge, reminder, and system alerts with unread state
- **Leaderboard & Achievements:** Monthly top-3 podium, full ranking table, 4-tier criteria, badge collection grid
- **Profile:** Personal info, institution, skills, interests, volunteer history, and a 5-persona switcher
- **Activity Detail Modal:** Full description, organizer, duties, qualifications, benefits, location, dress code, sign-up button
- **Sign Up Modal:** Pre-filled personal form, emergency contact fields, special needs, terms agreement, validation messages
- **Cancel Confirm Modal:** Reason dropdown and confirmation warning
- **Certificate Preview Modal:** Full-size certificate with number, hours, signatory, and QR verification code
- **Transcript Modal:** Official hour-verification document listing every approved activity with a total

## 4. UI Components
- Persistent sidebar navigation on desktop (Home, Discover, My Activities, Hours & Certificates, Notifications, Leaderboard, Profile)
- Bottom navigation bar plus hamburger drawer on mobile, sharing one nav definition
- Activity cards with cover image, category badge, hours badge, participant progress bar, and organizer
- Filter panel with multi-select category chips, province dropdown, hours range, and reset button
- Status badges (Open: Teal, Almost Full: Amber, Full: Slate)
- Category color set (Education: Amber, Environment: Teal, Elderly: Rose, Animals: Yellow, Health: Sky, Community: Emerald)
- Tier badges with icon and Thai name (🌱 New, ⭐ Regular, 🏆 Distinguished, 👑 Hero)
- Modals for activity detail, sign-up, cancellation, certificate, and transcript
- Form inputs with inline validation messages
- Toast notifications and confetti effect on success
- Progress bars for monthly goal, participant count, and hours-by-category stacked chart
- Empty states with a call-to-action on every list screen
- Skeleton cards for loading state

## 5. User Flows
**Signing Up for an Activity:**
1. User browses Home or Discover and clicks an activity card
2. Activity detail modal opens with full information
3. User clicks "สมัครเข้าร่วม" and the sign-up form appears pre-filled from their profile
4. User fills emergency contact and submits — form validates phone, email, and required fields
5. Participant count increases, status flips to "full" if the last seat is taken, a notification is created
6. Confetti and a success toast fire, then the app navigates to My Activities

**Completing an Activity and Receiving a Certificate:**
1. User opens My Activities and clicks the complete-simulation button on a registered activity
2. System adds the activity's hours to the user's total
3. System recalculates the tier from the hour thresholds defined in the data source
4. A certificate is generated with a number, issue date, signatory, and QR verification link
5. A notification is created and a level-up message appears if the tier changed
6. The certificate immediately appears in the Hours & Certificates vault

**Cancelling a Registration:**
1. User opens My Activities and clicks cancel on an upcoming activity
2. Confirmation modal opens with a reason dropdown
3. User confirms — registration status becomes "cancelled"
4. Participant count decreases and the activity reopens for sign-ups
5. An info toast confirms the seat was returned to the system

## 6. Mock Data
All mock data lives in a **single source file**: `src/data/mockData.json`. No component declares its own data — derived values such as the leaderboard and category colors are computed from this file.

```json
{
  "categories": [
    { "name": "การศึกษา", "icon": "📚", "desc": "สอนหนังสือ ติววิชา ซ่อมห้องสมุด", "barColor": "bg-amber-500" },
    { "name": "สิ่งแวดล้อม", "icon": "🌱", "desc": "ปลูกป่า ปลูกปะการัง เก็บขยะ", "barColor": "bg-teal-500" }
  ],
  "activities": [
    {
      "id": "act-001",
      "title": "สอนการบ้านและเสริมทักษะภาษาอังกฤษน้องในชุมชนคลองเตย",
      "category": "การศึกษา",
      "organizer": { "name": "มูลนิธิเพื่อการพัฒนาเด็กคลองเตย (KLD)", "verified": true },
      "province": "กรุงเทพมหานคร",
      "date": "2026-08-24",
      "time": "09:00 - 15:00",
      "hours": 6,
      "maxParticipants": 25,
      "currentParticipants": 18,
      "status": "open",
      "isFeatured": true
    }
  ],
  "users": [
    {
      "id": "user-001",
      "fullName": "พิชชาภา วัฒนเสถียร",
      "nickname": "แพรวา",
      "role": "university_student",
      "institution": "จุฬาลงกรณ์มหาวิทยาลัย",
      "totalHours": 58,
      "currentTier": "tier_3",
      "monthlyHours": 16,
      "completedActivitiesCount": 9,
      "categoryHours": { "การศึกษา": 16, "สิ่งแวดล้อม": 21, "ผู้สูงอายุ": 10, "สัตว์": 6, "สุขภาพ": 5 },
      "badges": ["b1", "b2", "b3", "b4"]
    }
  ],
  "registrations": [
    {
      "id": "reg-003",
      "activityId": "act-003",
      "userId": "user-001",
      "status": "completed",
      "emergencyContact": { "name": "สมหญิง วัฒนเสถียร", "phone": "0891234567", "relation": "มารดา" },
      "hoursAwarded": 6,
      "certificateId": "cert-001"
    }
  ],
  "certificates": [
    {
      "id": "cert-001",
      "certificateNumber": "VH-2026-EDU-0891",
      "userId": "user-001",
      "activityId": "act-003",
      "category": "การศึกษา",
      "hours": 6,
      "issueDate": "2026-07-28",
      "qrVerificationUrl": "https://volunteerhub.th/verify/VH-2026-EDU-0891"
    }
  ],
  "badgeTiers": {
    "tier_1": { "id": "tier_1", "name": "New Volunteer", "thaiName": "🌱 อาสาสมัครหน้าใหม่", "minHours": 0, "maxHours": 19 },
    "tier_2": { "id": "tier_2", "name": "Regular Volunteer", "thaiName": "⭐ อาสาสมัครประจำ", "minHours": 20, "maxHours": 49 },
    "tier_3": { "id": "tier_3", "name": "Distinguished Volunteer", "thaiName": "🏆 อาสาสมัครดีเด่น", "minHours": 50, "maxHours": 99 },
    "tier_4": { "id": "tier_4", "name": "Volunteer Hero", "thaiName": "👑 ฮีโร่แห่งการอาสา", "minHours": 100, "maxHours": null }
  }
}
```

**Data set size:** 12 activities · 5 user personas · 5 registrations · 3 certificates · 4 notifications · 7 badges · 4 tiers · 6 categories · 11 provinces · 7 navigation items
