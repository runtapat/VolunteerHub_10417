import { 
  Activity, 
  Badge, 
  BadgeTier, 
  Certificate, 
  LeaderboardUser, 
  NotificationItem, 
  Registration, 
  UserProfile 
} from '../types';

export const BADGE_TIERS: Record<string, BadgeTier> = {
  tier_1: {
    id: 'tier_1',
    name: 'New Volunteer',
    thaiName: '🌱 อาสาสมัครหน้าใหม่',
    minHours: 0,
    maxHours: 19,
    icon: '🌱',
    color: '#10B981',
    bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    borderColor: '#A7F3D0',
    description: 'ก้าวแรกของการแบ่งปัน สะสมชั่วโมงจิตอาสา 0 - 19 ชั่วโมง'
  },
  tier_2: {
    id: 'tier_2',
    name: 'Regular Volunteer',
    thaiName: '⭐ อาสาสมัครประจำ',
    minHours: 20,
    maxHours: 49,
    icon: '⭐',
    color: '#0D9488',
    bgColor: 'bg-teal-50 text-teal-700 border-teal-200',
    borderColor: '#99F6E4',
    description: 'ผู้ทุ่มเทเวลาเพื่อส่วนรวม สะสมชั่วโมงจิตอาสา 20 - 49 ชั่วโมง'
  },
  tier_3: {
    id: 'tier_3',
    name: 'Distinguished Volunteer',
    thaiName: '🏆 อาสาสมัครดีเด่น',
    minHours: 50,
    maxHours: 99,
    icon: '🏆',
    color: '#0284C7',
    bgColor: 'bg-sky-50 text-sky-700 border-sky-200',
    borderColor: '#BAE6FD',
    description: 'ผู้นำแห่งการให้และสร้างแรงบันดาลใจ สะสมชั่วโมงจิตอาสา 50 - 99 ชั่วโมง'
  },
  tier_4: {
    id: 'tier_4',
    name: 'Volunteer Hero',
    thaiName: '👑 ฮีโร่แห่งการอาสา',
    minHours: 100,
    maxHours: null,
    icon: '👑',
    color: '#8B5CF6',
    bgColor: 'bg-purple-50 text-purple-700 border-purple-200',
    borderColor: '#DDD6FE',
    description: 'ระดับเกียรติยศสูงสุด สะสมชั่วโมงจิตอาสา 100 ชั่วโมงขึ้นไป'
  }
};

export const MOCK_BADGES: Badge[] = [
  {
    id: 'b1',
    tierId: 'tier_1',
    name: 'จุดเริ่มต้นแห่งการให้ (First Step)',
    category: 'all',
    icon: '🌱',
    description: 'เข้าร่วมและเสร็จสิ้นกิจกรรมจิตอาสาแรก',
    unlockedAt: '2026-06-15'
  },
  {
    id: 'b2',
    tierId: 'tier_1',
    name: 'ผู้พิทักษ์ธรรมชาติ (Green Guardian)',
    category: 'สิ่งแวดล้อม',
    icon: '🌿',
    description: 'สะสมชั่วโมงจิตอาสาด้านสิ่งแวดล้อมครบ 10 ชม.',
    unlockedAt: '2026-07-02'
  },
  {
    id: 'b3',
    tierId: 'tier_2',
    name: 'ครูอาสาด้วยใจ (Teacher of Light)',
    category: 'การศึกษา',
    icon: '📚',
    description: 'สอนหนังสือหรือพัฒนาทักษะให้น้องๆ ครบ 15 ชม.',
    unlockedAt: '2026-07-28'
  },
  {
    id: 'b4',
    tierId: 'tier_2',
    name: 'ผู้ดูแลรอยยิ้มผู้สูงวัย (Warm Heart)',
    category: 'ผู้สูงอายุ',
    icon: '👵',
    description: 'ร่วมกิจกรรมดูแลและสร้างความสุขให้ผู้สูงอายุ 10 ชม.',
    unlockedAt: '2026-08-05'
  },
  {
    id: 'b5',
    tierId: 'tier_3',
    name: 'สหายสี่ขาผู้ซื่อสัตย์ (Animal Savior)',
    category: 'สัตว์',
    icon: '🐾',
    description: 'ช่วยเหลือน้องหมาน้องแมวและสัตว์ไร้บ้านครบ 20 ชม.',
    unlockedAt: '2026-08-12'
  },
  {
    id: 'b6',
    tierId: 'tier_3',
    name: 'เสาหลักแห่งชุมชน (Community Pillar)',
    category: 'ชุมชน',
    icon: '🏘️',
    description: 'เข้าร่วมพัฒนาชุมชนและพื้นที่สาธารณะครบ 25 ชม.'
  },
  {
    id: 'b7',
    tierId: 'tier_4',
    name: 'ฮีโร่ผู้ไม่หวังสิ่งตอบแทน (Social Legend)',
    category: 'all',
    icon: '👑',
    description: 'สะสมชั่วโมงรวมมากกว่า 100 ชั่วโมงและทำกิจกรรมครบทุกหมวด'
  }
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'act-001',
    title: 'สอนการบ้านและเสริมทักษะภาษาอังกฤษน้องในชุมชนคลองเตย',
    category: 'การศึกษา',
    organizer: {
      name: 'มูลนิธิเพื่อการพัฒนาเด็กคลองเตย (Klongtoey Foundation)',
      avatar: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=120&auto=format&fit=crop&q=80',
      verified: true,
      contactPhone: '02-345-6789',
      contactEmail: 'contact@klongtoeykids.org',
      organizationType: 'มูลนิธิไม่แสวงหาผลกำไร'
    },
    description: 'ร่วมเป็นพี่อาสาสอนการบ้าน ติววิชาภาษาอังกฤษพื้นฐาน และจัดกิจกรรมนันทนาการให้น้องๆ ชั้นประถมวัยในชุมชน เพื่อเสริมสร้างความมั่นใจและการเรียนรู้ที่สนุกสนาน',
    duties: [
      'สอนการบ้านวิชาภาษาอังกฤษและคณิตศาสตร์ระดับประถม',
      'จัดเกมฝึกทักษะภาษาและกิจกรรมส่งเสริมความคิดสร้างสรรค์',
      'ช่วยดูแลอาหารว่างและกิจกรรมกลุ่มสัมพันธ์'
    ],
    qualifications: [
      'นักเรียน ม.ปลาย หรือ นิสิต/นักศึกษา ทุกชั้นปี',
      'มีใจรักเด็ก ใจเย็น และสื่อสารเข้าใจง่าย',
      'ไม่ต้องมีความเชี่ยวชาญระดับสูง ขอเพียงมีใจอยากสอน'
    ],
    benefits: [
      'ได้รับใบรับรองชั่วโมงจิตอาสา 6 ชั่วโมง (สำหรับ กยศ. / Portfolio)',
      'อาหารกลางวันและเครื่องดื่มฟรี',
      'เสื้อยืดโครงการอาสาคลองเตย 1 ตัว'
    ],
    locationName: 'ศูนย์พัฒนาเด็กเล็กชุมชนคลองเตย ล็อค 1-2-3',
    province: 'กรุงเทพมหานคร',
    address: 'แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร (ใกล้ MRT ศูนย์ฯ สิริกิติ์)',
    date: '2026-08-23',
    time: '09:00 - 15:00 น.',
    hours: 6,
    maxParticipants: 25,
    currentParticipants: 18,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
    tags: ['กยศ.', 'สอนหนังสือ', 'เด็กประถม', 'มีเกียรติบัตร', 'ใจกลางเมือง'],
    isFeatured: true,
    registrationDeadline: '2026-08-21',
    dressCode: 'ชุดสุภาพ กางเกงขายาว รองเท้าผ้าใบ',
    contactPerson: 'พี่แพรวา (ผู้ประสานงานโครงการ) โทร 081-234-5678'
  },
  {
    id: 'act-002',
    title: 'ปลูกป่าชายเลน คืนความสมบูรณ์สู่ปากอ่าวไทย ณ บางปู สมุทรปราการ',
    category: 'สิ่งแวดล้อม',
    organizer: {
      name: 'ชมรมอนุรักษ์ธรรมชาติและสิ่งแวดล้อมเพื่อสังคม',
      avatar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=120&auto=format&fit=crop&q=80',
      verified: true,
      contactPhone: '02-888-9900',
      contactEmail: 'bangpu.mangrove@greenlife.org',
      organizationType: 'องค์กรสาธารณประโยชน์'
    },
    description: 'กิจกรรมฟื้นฟูป่าชายเลน ปลูกต้นโกงกางและต้นลำพู 1,000 ต้น พร้อมเก็บขยะตกค้างแนวชายฝั่ง เพื่ออนุรักษ์ระบบนิเวศแหล่งอนุบาลสัตว์น้ำและลดการกัดเซาะชายฝั่ง',
    duties: [
      'ขนย้ายกล้าไม้โกงกางลงพื้นที่เลน',
      'ปักหลักและปลูกต้นกล้าตามแนวกั้นคลื่น',
      'คัดแยกขยะทะเลและขยะพลาสติกบริเวณสะพานสุขตา'
    ],
    qualifications: [
      'สุขภาพแข็งแรง พร้อมลุยเลน',
      'เตรียมชุดเปลี่ยนสำหรับลุยโคลนและรองเท้าบูท/ถุงเท้าหนา',
      'เปิดรับบุคคลทั่วไป นักเรียน นักศึกษา'
    ],
    benefits: [
      'สะสมชั่วโมงจิตอาสา 8 ชั่วโมงเต็ม',
      'เกียรติบัตรอิเล็กทรอนิกส์พร้อม QR Code ตรวจสอบได้',
      'อาหารกลางวันท้องถิ่นสมุทรปราการ + น้ำดื่มตลอดงาน'
    ],
    locationName: 'สถานตากอากาศบางปู (ศูนย์ศึกษาธรรมชาติกองทัพบก)',
    province: 'สมุทรปราการ',
    address: 'ถ.สุขุมวิท กม.37 ต.บางปูใหม่ อ.เมือง จ.สมุทรปราการ',
    date: '2026-08-29',
    time: '08:30 - 16:30 น.',
    hours: 8,
    maxParticipants: 40,
    currentParticipants: 35,
    status: 'almost_full',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    tags: ['สิ่งแวดล้อม', 'ปลูกป่า', 'ป่าชายเลน', '8ชั่วโมง', 'ใกล้กรุงเทพ'],
    isFeatured: true,
    registrationDeadline: '2026-08-27',
    dressCode: 'เสื้อยืดแขนยาว กางเกงขาสั้น/ผ้าร่มแห้งไว ถุงเท้าสำหรับลุยเลน',
    contactPerson: 'พี่ต้น อนุรักษ์ โทร 089-987-6543'
  },
  {
    id: 'act-003',
    title: 'จัดหมวดหมู่และซ่อมแซมหนังสือ ห้องสมุดชุมชนโรงเรียนวัดสระแก้ว',
    category: 'การศึกษา',
    organizer: {
      name: 'กลุ่มอาสาเพื่อห้องสมุดและเด็กกำพร้า',
      avatar: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=120&auto=format&fit=crop&q=80',
      verified: true,
      contactPhone: '035-123-456',
      contactEmail: 'watsrakaew.library@gmail.com',
      organizationType: 'กลุ่มเยาวชนอาสาพัฒนา'
    },
    description: 'ช่วยคัดแยก ซ่อมแซมหน้าปกหนังสือ จัดหมวดหมู่ตามระบบดิวอี้ และตกแต่งมุมอ่านหนังสือให้น้องๆ กว่า 500 คน ในโรงเรียนวัดสระแก้ว',
    duties: [
      'ติดบาร์โค้ดและลงทะเบียนหนังสือเข้าใหม่',
      'ซ่อมสันหนังสือและห่อปกพลาสติกใส',
      'จัดเรียงหนังสือขึ้นชั้นตามหมวดหมู่'
    ],
    qualifications: [
      'มีความละเอียด รอบคอบ ชอบหนังสือ',
      'นักเรียน มัธยมศึกษา หรือ นิสิต/นักศึกษา'
    ],
    benefits: [
      'เกียรติบัตร 6 ชั่วโมงจิตอาสา',
      'มีรถตู้รับ-ส่ง จากสถานีรถไฟฟ้ารังสิต'
    ],
    locationName: 'โรงเรียนวัดสระแก้ว',
    province: 'ปทุมธานี',
    address: 'ต.บ้านใหม่ อ.เมือง จ.ปทุมธานี',
    date: '2026-09-05',
    time: '09:00 - 15:00 น.',
    hours: 6,
    maxParticipants: 20,
    currentParticipants: 12,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80',
    tags: ['ห้องสมุด', 'หนังสือ', 'ปทุมธานี', 'มีรถรับส่ง'],
    isFeatured: false,
    registrationDeadline: '2026-09-03',
    contactPerson: 'พี่มิ้นท์ โทร 086-456-7890'
  },
  {
    id: 'act-004',
    title: 'กิจกรรมส่งต่อรอยยิ้ม: ดนตรีบำบัดและพูดคุยกับคุณตาคุณยาย บ้านบางแค',
    category: 'ผู้สูงอายุ',
    organizer: {
      name: 'ศูนย์พัฒนาการจัดสวัสดิการสังคมผู้สูงอายุบ้านบางแค',
      avatar: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?w=120&auto=format&fit=crop&q=80',
      verified: true,
      contactPhone: '02-455-1234',
      contactEmail: 'bangkae.seniorcare@dop.go.th',
      organizationType: 'หน่วยงานรัฐสังกัด พม.'
    },
    description: 'ร่วมเป็นเพื่อนคุย เล่นเกมฝึกสมอง ร้องเพลงย้อนยุค และช่วยนวดผ่อนคลายให้ผู้สูงอายุ เพื่อคลายความเหงาและสร้างความสดชื่นอบอุ่นใจ',
    duties: [
      'นั่งพูดคุย ฟังเรื่องเล่า และสร้างปฏิสัมพันธ์เชิงบวก',
      'ช่วยนำกิจกรรมร้องเพลง เล่นอูคูเลเล่/กีตาร์ (ถ้ามีความสามารถ)',
      'ช่วยเสิร์ฟอาหารว่างและน้ำผลไม้'
    ],
    qualifications: [
      'มีทัศนคติที่ดี อ่อนน้อมถ่อมตน มีความอดทนและฟังเก่ง',
      'ไม่มีอาการหวัดหรือไข้ในวันทำกิจกรรม'
    ],
    benefits: [
      'สะสมชั่วโมงจิตอาสา 5 ชั่วโมง',
      'เกียรติบัตรรับรองจากกรมกิจการผู้สูงอายุ',
      'ความสุขใจและบทเรียนชีวิตจากผู้สูงวัย'
    ],
    locationName: 'บ้านพักคนชราบ้านบางแค (ตึกอำนวยการ)',
    province: 'กรุงเทพมหานคร',
    address: 'ถ.เพชรเกษม แขวงบางแคเหนือ เขตบางแค กทม. (ติด MRT ภาษีเจริญ)',
    date: '2026-09-06',
    time: '13:00 - 18:00 น.',
    hours: 5,
    maxParticipants: 30,
    currentParticipants: 30,
    status: 'full',
    imageUrl: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800&auto=format&fit=crop&q=80',
    tags: ['ผู้สูงอายุ', 'ดนตรีบำบัด', 'บ้านบางแค', 'ใกล้MRT'],
    isFeatured: true,
    registrationDeadline: '2026-09-01',
    contactPerson: 'ครูนกเอี้ยง โทร 082-345-6781'
  },
  {
    id: 'act-005',
    title: 'ทำความสะอาดชายหาดบางแสน & คัดแยกขยะเพื่อการรีไซเคิล ชลบุรี',
    category: 'สิ่งแวดล้อม',
    organizer: {
      name: 'เครือข่ายเยาวชนรักษ์ทะเลไทย (Bangsaen Ocean Keeper)',
      avatar: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=120&auto=format&fit=crop&q=80',
      verified: true,
      contactPhone: '038-745-600',
      contactEmail: 'contact@oceankeeper.th',
      organizationType: 'กลุ่มเยาวชนเพื่อสิ่งแวดล้อม'
    },
    description: 'ร่วมกันกู้คืนหาดทรายขาวสะอาด เก็บก้นบุหรี่ หลอดพลาสติก เศษแก้ว และคัดแยกขยะเข้าสู่กระบวนการ Upcycling สร้างมูลค่าใหม่',
    duties: [
      'เดินเก็บขยะตามโซนชายหาด 3 กิโลเมตร',
      'ชั่งน้ำหนักและบันทึกประเภทขยะลงฐานข้อมูลสิ่งแวดล้อม',
      'บรรจุถุงขยะแยกประเภทส่งโรงงานแปรรูป'
    ],
    qualifications: [
      'พร้อมทำงานกลางแจ้ง (เตรียมหมวก แว่นกันแดด ครีมกันแดด)',
      'ไม่จำกัดอายุ'
    ],
    benefits: [
      'สะสมชั่วโมงจิตอาสา 7 ชั่วโมง',
      'เกียรติบัตรการเข้าร่วมโครงการสิ่งแวดล้อมทางทะเล',
      'อาหารว่างและน้ำดื่มสมุนไพร'
    ],
    locationName: 'ลานกิจกรรมแหลมแท่น หาดบางแสน',
    province: 'ชลบุรี',
    address: 'ต.แสนสุข อ.เมืองชลบุรี จ.ชลบุรี',
    date: '2026-09-12',
    time: '08:00 - 15:00 น.',
    hours: 7,
    maxParticipants: 50,
    currentParticipants: 24,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80',
    tags: ['ทะเล', 'ชายหาดบางแสน', 'ชลบุรี', 'Upcycling', '7ชั่วโมง'],
    isFeatured: false,
    registrationDeadline: '2026-09-10',
    contactPerson: 'พี่กอล์ฟ โทร 084-555-1212'
  },
  {
    id: 'act-006',
    title: 'อาสาพิมพ์และอ่านหนังสือเสียง/อักษรเบรลล์ เพื่อผู้พิการทางสายตา',
    category: 'การศึกษา',
    organizer: {
      name: 'มูลนิธิช่วยคนตาบอดแห่งประเทศไทย ในพระบรมราชินูปถัมภ์',
      avatar: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=120&auto=format&fit=crop&q=80',
      verified: true,
      contactPhone: '02-354-8365',
      contactEmail: 'info@blind.or.th',
      organizationType: 'มูลนิธิในพระบรมราชินูปถัมภ์'
    },
    description: 'สามารถทำได้ทั้งแบบ On-site และ Online ช่วยพิมพ์บทความ ตำราเรียน หรืออัดเสียงอ่านบทความลงแอปพลิเคชัน Read for the Blind เพื่อส่งต่อแสงสว่างทางปัญญา',
    duties: [
      'ตรวจสอบตัวสะกดและจัดรูปแบบไฟล์ Word ให้ถูกต้องตามมาตรฐาน',
      'บันทึกเสียงอ่านบทความวิชาการ นวนิยาย หรือข่าวสาร',
      'ช่วยแปลงไฟล์สำหรับพิมพ์ระบบอักษรเบรลล์'
    ],
    qualifications: [
      'ใช้คอมพิวเตอร์และโปรแกรมพิมพ์เอกสารได้คล่องแคล่ว',
      'อ่านออกเสียงภาษาไทยชัดเจน ถูกต้องตามอักขรวิธี'
    ],
    benefits: [
      'สะสมชั่วโมงจิตอาสา 4 ชั่วโมง ต่อบทความ/หนังสือ 1 เล่ม',
      'สามารถทำออนไลน์จากบ้านได้ (ยื่นตรวจผลงานผ่านระบบ)',
      'เกียรติบัตรรับรองจากมูลนิธิช่วยคนตาบอดฯ'
    ],
    locationName: 'ออนไลน์ หรือ ศูนย์บริการมูลนิธิช่วยคนตาบอดฯ ถ.ราชวิถี',
    province: 'ออนไลน์ (Online)',
    address: 'ทำจากที่บ้านได้ทุกที่ หรือ อาคารมูลนิธิฯ เขตราชเทวี กทม.',
    date: '2026-09-15',
    time: '10:00 - 14:00 น.',
    hours: 4,
    maxParticipants: 100,
    currentParticipants: 68,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop&q=80',
    tags: ['ออนไลน์', 'หนังสือเสียง', 'อักษรเบรลล์', 'ผู้พิการ', 'กยศ.'],
    isFeatured: true,
    registrationDeadline: '2026-09-14',
    contactPerson: 'พี่เบสท์ แผนกสื่อดิจิทัล โทร 085-111-2233'
  },
  {
    id: 'act-007',
    title: 'ดูแล ป้อนอาหาร และทำความสะอาดคอกสุนัข-แมวจรจัด มูลนิธิ The Voice',
    category: 'สัตว์',
    organizer: {
      name: 'The Voice Foundation (เสียงจากเรา เพื่อสัตว์ยากไร้)',
      avatar: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=120&auto=format&fit=crop&q=80',
      verified: true,
      contactPhone: '02-999-7788',
      contactEmail: 'thevoicefoundation@gmail.com',
      organizationType: 'องค์กรพิทักษ์สัตว์'
    },
    description: 'ช่วยอาบน้ำ แปรงขน พาน้องหมาพิการเดินเล่น ทำความสะอาดคอก และช่วยเตรียมชามอาหารสำหรับน้องๆ กว่า 300 ตัวที่รอคอยบ้านใหม่',
    duties: [
      'ช่วยล้างชามอาหารและผสมอาหารเม็ด',
      'แปรงขน เช็ดหู และพาน้องหมาเดินออกกำลังกาย',
      'ทำความสะอาดและฆ่าเชื้อกรงพักสัตว์'
    ],
    qualifications: [
      'ไม่แพ้ขนสัตว์และไม่มีโรคประจำตัวเกี่ยวกับทางเดินหายใจ',
      'ไม่กลัวสัตว์ และมีเมตตาต่อเพื่อนสี่ขา'
    ],
    benefits: [
      'สะสมชั่วโมงจิตอาสา 6 ชั่วโมง',
      'เกียรติบัตรจิตอาสาช่วยสัตว์ยากไร้',
      'ได้กอดและสร้างความสุขให้น้องๆ สี่ขา'
    ],
    locationName: 'ศูนย์พักพิงสัตว์ The Voice นนทบุรี',
    province: 'นนทบุรี',
    address: 'ซอยวัดลาดปลาดุก ต.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี',
    date: '2026-09-19',
    time: '09:00 - 15:00 น.',
    hours: 6,
    maxParticipants: 20,
    currentParticipants: 16,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=80',
    tags: ['น้องหมา', 'แมวจร', 'คนรักสัตว์', 'นนทบุรี', '6ชั่วโมง'],
    isFeatured: false,
    registrationDeadline: '2026-09-17',
    contactPerson: 'พี่เก๋ วอยซ์ โทร 087-654-3210'
  },
  {
    id: 'act-008',
    title: 'อาสาสมัครช่วยงานวิ่งการกุศลเพื่ออุปกรณ์การแพทย์ รพ.ศิริราช',
    category: 'สุขภาพ',
    organizer: {
      name: 'คณะแพทยศาสตร์ศิริราชพยาบาล ม.มหิดล',
      avatar: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=120&auto=format&fit=crop&q=80',
      verified: true,
      contactPhone: '02-419-7000',
      contactEmail: 'siriraj.charityrun@mahidol.ac.th',
      organizationType: 'สถาบันการแพทย์และมหาวิทยาลัย'
    },
    description: 'ร่วมเป็นกำลังสำคัญในงานเดิน-วิ่งการกุศล จุดแจกน้ำดื่ม เชียร์นักวิ่ง บอกเส้นทาง แจกเหรียญรางวัล และปฐมพยาบาลเบื้องต้น',
    duties: [
      'ประจำจุด Water Station เติมน้ำและเกลือแร่ให้นักวิ่ง',
      'ดูแลความปลอดภัยและชี้บอกเส้นทางเลี้ยว',
      'มอบเหรียญที่ระลึกที่เส้นชัย'
    ],
    qualifications: [
      'ตื่นเช้าได้ (รายงานตัว 04:30 น.)',
      'มีพลังงานสดใส กระตือรือร้น ชอบงานอีเวนต์'
    ],
    benefits: [
      'สะสมชั่วโมงจิตอาสา 5 ชั่วโมง',
      'เสื้อวิ่ง Limited Edition + เหรียญสต๊าฟ',
      'อาหารเช้าและคูปองของที่ระลึก'
    ],
    locationName: 'โรงพยาบาลศิริราช - สะพานพระราม 8',
    province: 'กรุงเทพมหานคร',
    address: 'ถ.วังหลัง แขวงศิริราช เขตบางกอกน้อย กทม.',
    date: '2026-09-20',
    time: '04:30 - 09:30 น.',
    hours: 5,
    maxParticipants: 60,
    currentParticipants: 58,
    status: 'almost_full',
    imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80',
    tags: ['งานวิ่ง', 'ศิริราช', 'สุขภาพ', 'เสื้อฟรี', 'เช้าตรู่'],
    isFeatured: true,
    registrationDeadline: '2026-09-18',
    contactPerson: 'พี่หมอโอ๊ค โทร 083-444-9988'
  },
  {
    id: 'act-009',
    title: 'ฟื้นฟูแปลงเกษตรอินทรีย์และโรงเพาะเห็ด ชุมชนคลองมหาสวัสดิ์ นครปฐม',
    category: 'ชุมชน',
    organizer: {
      name: 'วิสาหกิจชุมชนเกษตรอินทรีย์คลองมหาสวัสดิ์',
      avatar: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?w=120&auto=format&fit=crop&q=80',
      verified: true,
      contactPhone: '034-298-765',
      contactEmail: 'mahasawat.organic@gmail.com',
      organizationType: 'วิสาหกิจชุมชนต้นแบบ'
    },
    description: 'ลงแรงช่วยชาวบ้านทำปุ๋ยหมักชีวภาพ ยกร่องแปลงผัก ปลูกต้นกล้าผักสวนครัว และบรรจุก้อนเชื้อเห็ดนางฟ้าเพื่อเป็นแหล่งอาหารยั่งยืน',
    duties: [
      'ผสมดินปลูกอินทรีย์และหมักน้ำหมักชีวภาพ',
      'ยกร่องแปลงผักและคลุมฟาง',
      'จัดเรียงก้อนเชื้อเห็ดในโรงเรือน'
    ],
    qualifications: [
      'ไม่กลัวดินกลัวเปื้อน ชอบงานกลางแจ้ง',
      'เปิดรับทุกคนที่อยากเรียนรู้วิถีเกษตรพอเพียง'
    ],
    benefits: [
      'สะสมชั่วโมงจิตอาสา 7 ชั่วโมง',
      'เกียรติบัตรวิสาหกิจชุมชน',
      'ได้รับผักอินทรีย์สดและไข่เป็ดกลับบ้านคนละ 1 ชุด'
    ],
    locationName: 'ศูนย์เรียนรู้เกษตรอินทรีย์คลองมหาสวัสดิ์',
    province: 'นครปฐม',
    address: 'ต.ศาลายา อ.พุทธมณฑล จ.นครปฐม (ใกล้ ม.มหิดล ศาลายา)',
    date: '2026-09-26',
    time: '08:30 - 15:30 น.',
    hours: 7,
    maxParticipants: 25,
    currentParticipants: 10,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?w=800&auto=format&fit=crop&q=80',
    tags: ['เกษตรอินทรีย์', 'ชุมชน', 'ศาลายา', 'นครปฐม', 'ของแถมผักสด'],
    isFeatured: false,
    registrationDeadline: '2026-09-24',
    contactPerson: 'ลุงนิด โทร 081-765-4321'
  },
  {
    id: 'act-010',
    title: 'อาสาสอนทักษะคอมพิวเตอร์และ Canva เพื่อการเรียนรู้ โรงเรียนวัดดอนแก้ว เชียงใหม่',
    category: 'การศึกษา',
    organizer: {
      name: 'เครือข่ายครูอาสาดอยสูง เชียงใหม่ (Lanna Volunteer)',
      avatar: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&auto=format&fit=crop&q=80',
      verified: true,
      contactPhone: '053-221-190',
      contactEmail: 'chiangmai.volunteer@edu.th',
      organizationType: 'ชมรมครูอาสาภาคเหนือ'
    },
    description: 'ร่วมเปิดโลกดิจิทัลให้น้องๆ ม.ต้น ในพื้นที่ห่างไกล สอนการใช้งาน Google Docs, สไลด์นำเสนอ และการออกแบบกราฟิกเบื้องต้นด้วย Canva',
    duties: [
      'สอนการพิมพ์งานและการค้นหาข้อมูลบนอินเทอร์เน็ตอย่างปลอดภัย',
      'สอนออกแบบโปสเตอร์นำเสนอผลงานด้วย Canva',
      'ให้คำปรึกษาการทำพอร์ตโฟลิโอสำหรับน้อง ม.3'
    ],
    qualifications: [
      'ใช้คอมพิวเตอร์และ Canva ได้เป็นอย่างดี',
      'มีโน้ตบุ๊กส่วนตัวมาด้วย'
    ],
    benefits: [
      'สะสมชั่วโมงจิตอาสา 8 ชั่วโมง',
      'เกียรติบัตรโครงการ Lanna Digital Literacy',
      'อาหารพื้นเมืองเหนือสูตรโฮมเมด'
    ],
    locationName: 'ห้องคอมพิวเตอร์ โรงเรียนวัดดอนแก้ว อ.แม่ริม',
    province: 'เชียงใหม่',
    address: 'ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่',
    date: '2026-09-27',
    time: '08:30 - 16:30 น.',
    hours: 8,
    maxParticipants: 15,
    currentParticipants: 9,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    tags: ['เชียงใหม่', 'สอนคอมพิวเตอร์', 'Canva', 'ดิจิทัล', 'พอร์ตโฟลิโอ'],
    isFeatured: false,
    registrationDeadline: '2026-09-25',
    contactPerson: 'ครูโบว์ โทร 086-999-8877'
  },
  {
    id: 'act-011',
    title: 'อาสาคัดแยกขยะงานเทศกาลและรณรงค์ Zero Waste กทม.',
    category: 'สิ่งแวดล้อม',
    organizer: {
      name: 'กรุงเทพมหานคร ร่วมกับ Trash Hero Bangkok',
      avatar: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=120&auto=format&fit=crop&q=80',
      verified: true,
      contactPhone: '02-221-2141',
      contactEmail: 'zerowaste@bangkok.go.th',
      organizationType: 'หน่วยงานรัฐร่วมกับภาคประชาสังคม'
    },
    description: 'ร่วมเป็นทูตสิ่งแวดล้อมประจำจุดคัดแยกขยะ 4 สี แนะนำประชาชนทิ้งขยะให้ถูกถังในงานเทศกาลวัฒนธรรมกลางเมือง เพื่อลดปริมาณขยะฝังกลบ',
    duties: [
      'ประจำจุด Drop-off ขยะรีไซเคิลและขยะเศษอาหาร',
      'ให้คำแนะนำและสร้างความตระหนักรู้แก่ผู้มาร่วมงาน',
      'ช่วยจัดเก็บขยะเข้าจุดพักขยะส่วนกลาง'
    ],
    qualifications: [
      'ยิ้มแย้มแจ่มใส มนุษยสัมพันธ์ดี',
      'สนใจเรื่องสิ่งแวดล้อมและเศรษฐกิจหมุนเวียน'
    ],
    benefits: [
      'สะสมชั่วโมงจิตอาสา 6 ชั่วโมง',
      'เกียรติบัตรรับรองจากสำนักสิ่งแวดล้อม กรุงเทพมหานคร',
      'กระบอกน้ำรักษ์โลก 1 ใบ'
    ],
    locationName: 'สวนลุมพินี (ประตู 1 ถ.วิทยุ)',
    province: 'กรุงเทพมหานคร',
    address: 'แขวงลุมพินี เขตปทุมวัน กรุงเทพมหานคร (MRT ลุมพินี / BTS ศาลาแดง)',
    date: '2026-10-03',
    time: '14:00 - 20:00 น.',
    hours: 6,
    maxParticipants: 40,
    currentParticipants: 28,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80',
    tags: ['กทม', 'ZeroWaste', 'สวนลุมพินี', 'คัดแยกขยะ', 'BTSศาลาแดง'],
    isFeatured: false,
    registrationDeadline: '2026-10-01',
    contactPerson: 'พี่บอส Trash Hero โทร 081-333-4455'
  },
  {
    id: 'act-012',
    title: 'แจกถุงยังชีพ อาหารปรุงสุก และพูดคุยให้กำลังใจผู้ไร้บ้าน บริเวณสนามหลวง',
    category: 'ชุมชน',
    organizer: {
      name: 'มูลนิธิกระจกเงา (The Mirror Foundation)',
      avatar: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=120&auto=format&fit=crop&q=80',
      verified: true,
      contactPhone: '02-973-2236',
      contactEmail: 'mirror@mirror.or.th',
      organizationType: 'มูลนิธิสาธารณประโยชน์ระดับชาติ'
    },
    description: 'ร่วมแพ็กของใช้จำเป็น ยาสามัญประจำบ้าน และแจกจ่ายอาหารพร้อมน้ำดื่มให้แก่คนไร้บ้าน พร้อมสำรวจความต้องการเบื้องต้นเพื่อส่งต่อความช่วยเหลือ',
    duties: [
      'ช่วยบรรจุถุงยังชีพและจัดเตรียมกล่องอาหาร',
      'แจกจ่ายอาหารตามจุดนัดหมายอย่างเป็นระเบียบ',
      'ช่วยบันทึกข้อมูลสุขภาพเบื้องต้น'
    ],
    qualifications: [
      'เข้าใจและเคารพศักดิ์ศรีความเป็นมนุษย์',
      'พร้อมทำงานช่วงเย็น-ค่ำ'
    ],
    benefits: [
      'สะสมชั่วโมงจิตอาสา 5 ชั่วโมง',
      'เกียรติบัตรทางการจากมูลนิธิกระจกเงา',
      'เปิดมุมมองความเข้าใจสังคมเชิงลึก'
    ],
    locationName: 'ลานคนเมือง & รอบสนามหลวง',
    province: 'กรุงเทพมหานคร',
    address: 'แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพมหานคร',
    date: '2026-10-10',
    time: '16:00 - 21:00 น.',
    hours: 5,
    maxParticipants: 35,
    currentParticipants: 35,
    status: 'full',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
    tags: ['มูลนิธิกระจกเงา', 'สนามหลวง', 'คนไร้บ้าน', 'ชุมชน', 'ปันน้ำใจ'],
    isFeatured: true,
    registrationDeadline: '2026-10-08',
    contactPerson: 'พี่เอก กระจกเงา โทร 082-999-1122'
  }
];

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'user-001',
    fullName: 'พิชชาภา วัฒนเสถียร',
    nickname: 'แพรวา',
    role: 'university_student',
    institution: 'จุฬาลงกรณ์มหาวิทยาลัย',
    facultyOrSchool: 'คณะครุศาสตร์ สาขาการประถมศึกษา ชั้นปีที่ 3',
    studentId: '6630123427',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    email: 'pitchapa.w@student.chula.ac.th',
    phone: '089-123-4567',
    totalHours: 58,
    currentTier: 'tier_3',
    joinedDate: '2025-11-10',
    bio: 'มีความฝันอยากเป็นครูที่ส่งต่อโอกาสให้เด็กๆ ทุกคน รักการสอนหนังสือ และชอบกิจกรรมอนุรักษ์ธรรมชาติค่ะ สะสมชั่วโมงทุนกู้ยืมและพอร์ตวิชาชีพครู',
    skills: ['สอนการบ้าน', 'จัดกิจกรรมเด็ก', 'วาดภาพ/ออกแบบ', 'ปฐมพยาบาลเบื้องต้น'],
    interests: ['การศึกษา', 'สิ่งแวดล้อม', 'ผู้สูงอายุ'],
    badges: ['b1', 'b2', 'b3', 'b4'],
    rankMonthly: 3
  },
  {
    id: 'user-002',
    fullName: 'ธนกฤต ศิริจินดา',
    nickname: 'ก้อง',
    role: 'student',
    institution: 'โรงเรียนเตรียมอุดมศึกษา',
    facultyOrSchool: 'แผนการเรียน วิทยาศาสตร์-คณิตศาสตร์ ม.6',
    studentId: 'TU64019',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    email: 'thanakrit.s@triamudom.ac.th',
    phone: '081-987-6543',
    totalHours: 28,
    currentTier: 'tier_2',
    joinedDate: '2026-02-14',
    bio: 'กำลังเตรียมพอร์ตฟอลิโอ TCAS รอบ 1 คณะแพทยศาสตร์ อยากนำความรู้ไปช่วยเหลือผู้ป่วยและพัฒนาชุมชนครับ',
    skills: ['ปฐมพยาบาล', 'คอมพิวเตอร์', 'วิทยาศาสตร์', 'สื่อสารภาษาอังกฤษ'],
    interests: ['สุขภาพ', 'การศึกษา', 'ชุมชน'],
    badges: ['b1', 'b3'],
    rankMonthly: 12
  },
  {
    id: 'user-003',
    fullName: 'พิมพ์ชนก รัตนวิบูลย์',
    nickname: 'เมย์',
    role: 'young_adult',
    institution: 'มหาวิทยาลัยธรรมศาสตร์ (ศิษย์เก่า)',
    facultyOrSchool: 'ทำงานแล้ว - UX/UI Designer',
    studentId: '-',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    email: 'pimchanok.design@gmail.com',
    phone: '095-222-3344',
    totalHours: 114,
    currentTier: 'tier_4',
    joinedDate: '2025-05-01',
    bio: 'ดีไซเนอร์ที่เชื่อว่าการให้คือความสุขที่แท้จริง ใช้เวลาว่างวันหยุดเสาร์อาทิตย์ช่วยเหลือน้องหมาแมวและอนุรักษ์ทะเลไทย',
    skills: ['กราฟิกดีไซน์', 'ถ่ายภาพ', 'ตัดต่อวิดีโอ', 'ลุยงานป่าชายเลน'],
    interests: ['สัตว์', 'สิ่งแวดล้อม', 'ชุมชน'],
    badges: ['b1', 'b2', 'b5', 'b6', 'b7'],
    rankMonthly: 1
  },
  {
    id: 'user-004',
    fullName: 'ณภัทร วงศ์สว่าง',
    nickname: 'ภัทร',
    role: 'university_student',
    institution: 'มหาวิทยาลัยเกษตรศาสตร์',
    facultyOrSchool: 'คณะวนศาสตร์ ชั้นปีที่ 2',
    studentId: '6710450912',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    email: 'naphat.w@ku.th',
    phone: '083-456-7891',
    totalHours: 42,
    currentTier: 'tier_2',
    joinedDate: '2026-01-20',
    bio: 'สายกรีนตัวจริง สนใจการปลูกป่า คัดแยกขยะ และการฟื้นฟูแหล่งน้ำธรรมชาติในเมืองไทย',
    skills: ['เพาะพันธุ์ไม้', 'ทำปุ๋ยหมัก', 'เดินป่า', 'งานช่างไม้'],
    interests: ['สิ่งแวดล้อม', 'ชุมชน'],
    badges: ['b1', 'b2'],
    rankMonthly: 7
  },
  {
    id: 'user-005',
    fullName: 'อรัญญา ชัยประเสริฐ',
    nickname: 'น้ำอ้อย',
    role: 'university_student',
    institution: 'มหาวิทยาลัยมหิดล',
    facultyOrSchool: 'คณะพยาบาลศาสตร์ ชั้นปีที่ 1',
    studentId: '6820011234',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    email: 'aranya.chai@mahidol.ac.th',
    phone: '087-111-9988',
    totalHours: 12,
    currentTier: 'tier_1',
    joinedDate: '2026-07-01',
    bio: 'น้องใหม่หัวใจอาสา อยากใช้เวลาว่างช่วงปี 1 สั่งสมประสบการณ์และช่วยเหลือสังคมค่ะ',
    skills: ['ดูแลผู้ป่วยเบื้องต้น', 'ร้องเพลง', 'จัดกิจกรรมนันทนาการ'],
    interests: ['สุขภาพ', 'ผู้สูงอายุ'],
    badges: ['b1'],
    rankMonthly: 24
  }
];

export const MOCK_REGISTRATIONS: Registration[] = [
  {
    id: 'reg-001',
    activityId: 'act-001',
    userId: 'user-001',
    registeredAt: '2026-08-10 14:20',
    status: 'registered',
    fullName: 'พิชชาภา วัฒนเสถียร',
    phone: '089-123-4567',
    email: 'pitchapa.w@student.chula.ac.th',
    studentId: '6630123427',
    institution: 'จุฬาลงกรณ์มหาวิทยาลัย',
    emergencyContact: {
      name: 'นางสมศรี วัฒนเสถียร (มารดา)',
      phone: '081-111-2222',
      relation: 'มารดา'
    },
    specialNeeds: 'ทานมังสวิรัติ'
  },
  {
    id: 'reg-002',
    activityId: 'act-002',
    userId: 'user-001',
    registeredAt: '2026-08-12 09:15',
    status: 'registered',
    fullName: 'พิชชาภา วัฒนเสถียร',
    phone: '089-123-4567',
    email: 'pitchapa.w@student.chula.ac.th',
    studentId: '6630123427',
    institution: 'จุฬาลงกรณ์มหาวิทยาลัย',
    emergencyContact: {
      name: 'นางสมศรี วัฒนเสถียร (มารดา)',
      phone: '081-111-2222',
      relation: 'มารดา'
    }
  },
  {
    id: 'reg-003',
    activityId: 'act-003',
    userId: 'user-001',
    registeredAt: '2026-07-20 11:00',
    status: 'completed',
    fullName: 'พิชชาภา วัฒนเสถียร',
    phone: '089-123-4567',
    email: 'pitchapa.w@student.chula.ac.th',
    studentId: '6630123427',
    institution: 'จุฬาลงกรณ์มหาวิทยาลัย',
    emergencyContact: {
      name: 'นางสมศรี วัฒนเสถียร (มารดา)',
      phone: '081-111-2222',
      relation: 'มารดา'
    },
    hoursAwarded: 6,
    certificateId: 'cert-001'
  },
  {
    id: 'reg-004',
    activityId: 'act-004',
    userId: 'user-001',
    registeredAt: '2026-07-01 16:30',
    status: 'completed',
    fullName: 'พิชชาภา วัฒนเสถียร',
    phone: '089-123-4567',
    email: 'pitchapa.w@student.chula.ac.th',
    studentId: '6630123427',
    institution: 'จุฬาลงกรณ์มหาวิทยาลัย',
    emergencyContact: {
      name: 'นางสมศรี วัฒนเสถียร (มารดา)',
      phone: '081-111-2222',
      relation: 'มารดา'
    },
    hoursAwarded: 5,
    certificateId: 'cert-002'
  },
  {
    id: 'reg-005',
    activityId: 'act-005',
    userId: 'user-001',
    registeredAt: '2026-06-12 10:00',
    status: 'completed',
    fullName: 'พิชชาภา วัฒนเสถียร',
    phone: '089-123-4567',
    email: 'pitchapa.w@student.chula.ac.th',
    studentId: '6630123427',
    institution: 'จุฬาลงกรณ์มหาวิทยาลัย',
    emergencyContact: {
      name: 'นางสมศรี วัฒนเสถียร (มารดา)',
      phone: '081-111-2222',
      relation: 'มารดา'
    },
    hoursAwarded: 7,
    certificateId: 'cert-003'
  }
];

export const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-001',
    certificateNumber: 'VH-2026-EDU-0891',
    userId: 'user-001',
    userName: 'นางสาวพิชชาภา วัฒนเสถียร',
    userInstitution: 'จุฬาลงกรณ์มหาวิทยาลัย (รหัสนิสิต 6630123427)',
    activityId: 'act-003',
    activityTitle: 'จัดหมวดหมู่และซ่อมแซมหนังสือ ห้องสมุดชุมชนโรงเรียนวัดสระแก้ว',
    category: 'การศึกษา',
    hours: 6,
    issueDate: '2026-07-28',
    organizerName: 'กลุ่มอาสาเพื่อห้องสมุดและเด็กกำพร้า',
    organizerSignatory: 'อาจารย์อุดมศักดิ์ วัฒนปรีชา',
    organizerPosition: 'ประธานกรรมการมูลนิธิห้องสมุดเพื่อเด็กไทย',
    qrVerificationUrl: 'https://volunteerhub.th/verify/VH-2026-EDU-0891',
    templateStyle: 'gold'
  },
  {
    id: 'cert-002',
    certificateNumber: 'VH-2026-SNR-0452',
    userId: 'user-001',
    userName: 'นางสาวพิชชาภา วัฒนเสถียร',
    userInstitution: 'จุฬาลงกรณ์มหาวิทยาลัย (รหัสนิสิต 6630123427)',
    activityId: 'act-004',
    activityTitle: 'กิจกรรมส่งต่อรอยยิ้ม: ดนตรีบำบัดและพูดคุยกับคุณตาคุณยาย บ้านบางแค',
    category: 'ผู้สูงอายุ',
    hours: 5,
    issueDate: '2026-07-15',
    organizerName: 'ศูนย์พัฒนาการจัดสวัสดิการสังคมผู้สูงอายุบ้านบางแค',
    organizerSignatory: 'นางสมจิตต์ สว่างวงษ์',
    organizerPosition: 'ผู้อำนวยการศูนย์พัฒนาการจัดสวัสดิการสังคมบ้านบางแค',
    qrVerificationUrl: 'https://volunteerhub.th/verify/VH-2026-SNR-0452',
    templateStyle: 'emerald'
  },
  {
    id: 'cert-003',
    certificateNumber: 'VH-2026-ENV-1029',
    userId: 'user-001',
    userName: 'นางสาวพิชชาภา วัฒนเสถียร',
    userInstitution: 'จุฬาลงกรณ์มหาวิทยาลัย (รหัสนิสิต 6630123427)',
    activityId: 'act-005',
    activityTitle: 'ทำความสะอาดชายหาดบางแสน & คัดแยกขยะเพื่อการรีไซเคิล ชลบุรี',
    category: 'สิ่งแวดล้อม',
    hours: 7,
    issueDate: '2026-06-25',
    organizerName: 'เครือข่ายเยาวชนรักษ์ทะเลไทย (Bangsaen Ocean Keeper)',
    organizerSignatory: 'ดร.สมชาย ทะเลงาม',
    organizerPosition: 'ประธานเครือข่ายอนุรักษ์ทรัพยากรชายฝั่งภาคตะวันออก',
    qrVerificationUrl: 'https://volunteerhub.th/verify/VH-2026-ENV-1029',
    templateStyle: 'teal'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-001',
    userId: 'user-001',
    title: '🎉 ได้รับเกียรติบัตรใหม่!',
    message: 'กิจกรรม "จัดหมวดหมู่และซ่อมแซมหนังสือ ห้องสมุดวัดสระแก้ว" ได้ออกเกียรติบัตร 6 ชั่วโมงให้คุณเรียบร้อยแล้ว สามารถกดดูและดาวน์โหลดได้ทันที',
    type: 'certificate',
    createdAt: '2026-08-16 10:30',
    read: false,
    relatedId: 'cert-001'
  },
  {
    id: 'notif-002',
    userId: 'user-001',
    title: '⭐ เลื่อนระดับเป็น "อาสาสมัครดีเด่น" (Tier 3)',
    message: 'ยินดีด้วย! คุณสะสมชั่วโมงจิตอาสาครบ 50 ชั่วโมง และปลดล็อกเหรียญตราพิเศษพร้อมสิทธิพิเศษประจำระดับ',
    type: 'badge',
    createdAt: '2026-08-14 15:45',
    read: false,
    relatedId: 'tier_3'
  },
  {
    id: 'notif-003',
    userId: 'user-001',
    title: '⏰ แจ้งเตือนกิจกรรมที่ใกล้จะมาถึง',
    message: 'กิจกรรม "สอนการบ้านน้องชุมชนคลองเตย" จะเริ่มในวันอาทิตย์ที่ 23 ส.ค. นี้ เวลา 09:00 น. กรุณาเตรียมตัวและแต่งกายสุภาพ',
    type: 'reminder',
    createdAt: '2026-08-18 09:00',
    read: true,
    relatedId: 'act-001'
  },
  {
    id: 'notif-004',
    userId: 'user-001',
    title: '🌱 กิจกรรมจิตอาสาตรงใจคุณเปิดรับสมัคร!',
    message: 'มีกิจกรรมใหม่ด้าน "สิ่งแวดล้อม" ในเขตกรุงเทพฯ เปิดรับสมัครแล้ว ลองเข้าไปดูและสมัครได้เลย',
    type: 'activity',
    createdAt: '2026-08-17 18:20',
    read: true,
    relatedId: 'act-011'
  }
];

export const MOCK_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    userId: 'user-003',
    fullName: 'พิมพ์ชนก รัตนวิบูลย์ (เมย์)',
    institution: 'มหาวิทยาลัยธรรมศาสตร์',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    monthlyHours: 24,
    totalHours: 114,
    tier: 'tier_4',
    badgesCount: 5,
    completedActivitiesCount: 19
  },
  {
    rank: 2,
    userId: 'user-008',
    fullName: 'วรภัทร ชาญวิทย์ (วิน)',
    institution: 'มหาวิทยาลัยเชียงใหม่',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    monthlyHours: 20,
    totalHours: 86,
    tier: 'tier_3',
    badgesCount: 4,
    completedActivitiesCount: 14
  },
  {
    rank: 3,
    userId: 'user-001',
    fullName: 'พิชชาภา วัฒนเสถียร (แพรวา)',
    institution: 'จุฬาลงกรณ์มหาวิทยาลัย',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    monthlyHours: 18,
    totalHours: 58,
    tier: 'tier_3',
    badgesCount: 4,
    completedActivitiesCount: 9
  },
  {
    rank: 4,
    userId: 'user-004',
    fullName: 'ณภัทร วงศ์สว่าง (ภัทร)',
    institution: 'มหาวิทยาลัยเกษตรศาสตร์',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    monthlyHours: 15,
    totalHours: 42,
    tier: 'tier_2',
    badgesCount: 2,
    completedActivitiesCount: 7
  },
  {
    rank: 5,
    userId: 'user-002',
    fullName: 'ธนกฤต ศิริจินดา (ก้อง)',
    institution: 'โรงเรียนเตรียมอุดมศึกษา',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    monthlyHours: 12,
    totalHours: 28,
    tier: 'tier_2',
    badgesCount: 2,
    completedActivitiesCount: 5
  },
  {
    rank: 6,
    userId: 'user-007',
    fullName: 'กานต์ธีรา นันทปกรณ์ (เกรซ)',
    institution: 'มหาวิทยาลัยมหิดล',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80',
    monthlyHours: 10,
    totalHours: 35,
    tier: 'tier_2',
    badgesCount: 3,
    completedActivitiesCount: 6
  },
  {
    rank: 7,
    userId: 'user-005',
    fullName: 'อรัญญา ชัยประเสริฐ (น้ำอ้อย)',
    institution: 'มหาวิทยาลัยมหิดล',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    monthlyHours: 8,
    totalHours: 12,
    tier: 'tier_1',
    badgesCount: 1,
    completedActivitiesCount: 2
  }
];

export const CATEGORIES_LIST = [
  { name: 'การศึกษา', icon: '📚', desc: 'สอนหนังสือ ติววิชา ซ่อมห้องสมุด', color: 'from-amber-500 to-orange-500' },
  { name: 'สิ่งแวดล้อม', icon: '🌱', desc: 'ปลูกป่า ปลูกปะการัง เก็บขยะ', color: 'from-emerald-500 to-green-600' },
  { name: 'ผู้สูงอายุ', icon: '👵', desc: 'เพื่อนคุย ดนตรีบำบัด สุขภาพจิต', color: 'from-rose-500 to-pink-600' },
  { name: 'สัตว์', icon: '🐾', desc: 'น้องหมาแมวจร ทำหมัน อนุรักษ์ช้าง', color: 'from-amber-600 to-yellow-600' },
  { name: 'สุขภาพ', icon: '🏥', desc: 'งานวิ่งการกุศล บริจาคเลือด โรงพยาบาล', color: 'from-sky-500 to-blue-600' },
  { name: 'ชุมชน', icon: '🏘️', desc: 'พัฒนาพื้นที่ แปลงผัก แจกถุงยังชีพ', color: 'from-teal-500 to-emerald-600' }
] as const;

export const PROVINCES_LIST = [
  'ทุกจังหวัด (All Locations)',
  'กรุงเทพมหานคร',
  'สมุทรปราการ',
  'นนทบุรี',
  'ปทุมธานี',
  'ชลบุรี',
  'เชียงใหม่',
  'นครปฐม',
  'ภูเก็ต',
  'ขอนแก่น',
  'ออนไลน์ (Online)'
];

export const CATEGORY_BADGE_COLORS: Record<string, string> = {
  'การศึกษา': 'bg-amber-500 text-white',
  'สิ่งแวดล้อม': 'bg-teal-500 text-white',
  'ผู้สูงอายุ': 'bg-rose-500 text-white',
  'สัตว์': 'bg-yellow-500 text-white',
  'สุขภาพ': 'bg-sky-500 text-white',
  'ชุมชน': 'bg-emerald-500 text-white'
};

export const MONTHLY_GOAL_DEFAULT = {
  targetHours: 20,
  defaultCurrentHours: 16
};

export const TAB_METADATA: Record<string, { title: string; subtitle: string }> = {
  home: { title: 'หน้าหลัก', subtitle: 'ศูนย์รวมกิจกรรมจิตอาสาและเป้าหมายของคุณ' },
  discover: { title: 'ค้นหากิจกรรม', subtitle: 'ค้นหาและกรองกิจกรรมจิตอาสาทั่วประเทศ' },
  my_activities: { title: 'กิจกรรมของฉัน', subtitle: 'จัดการกิจกรรมที่กำลังจะถึงและประวัติการเข้าร่วม' },
  hours_certificates: { title: 'ชั่วโมงจิตอาสา & เกียรติบัตร', subtitle: 'สรุปชั่วโมงสะสมและใบรับรองอิเล็กทรอนิกส์' },
  notifications: { title: 'การแจ้งเตือน', subtitle: 'อัปเดตกิจกรรม เกียรติบัตร และระดับความสำเร็จ' },
  leaderboard: { title: 'ความสำเร็จ & ผู้นำ', subtitle: 'เกียรติยศ 4 ระดับ และกระดานผู้นำประจำเดือน' },
  profile: { title: 'โปรไฟล์ & พอร์ตโฟลิโอ', subtitle: 'ข้อมูลส่วนตัว ทักษะ และประวัติงานอาสา' }
};

