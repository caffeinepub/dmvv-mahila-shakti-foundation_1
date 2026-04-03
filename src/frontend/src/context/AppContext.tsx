import { useLocalStorage } from "@/hooks/useLocalStorage";
import type React from "react";
import { createContext, useContext } from "react";

export interface Promotion {
  id: string;
  fromRole: string;
  toRole: string;
  promotionDate: string;
  reason: string;
  letterGenerated?: boolean;
  letterDate?: string;
}

export interface AchievementCert {
  id: string;
  title: string;
  description: string;
  issuedDate: string;
  awardedBy: string;
  category: string;
}

export interface User {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  password: string;
  role: "user" | "center" | "supervisor" | "transport" | "admin" | "hr";
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  isVerified: boolean;
  accessCode?: string;
  isLoginActive?: boolean;
  fatherName?: string;
  dob?: string;
  address?: string;
  district?: string;
  state?: string;
  pincode?: string;
  photoUrl?: string;
  memberId?: string;
  promotions?: Promotion[];
  achievementCerts?: AchievementCert[];
}

export interface KYC {
  id: string;
  userId: string;
  aadhaarFileName: string;
  photoFileName: string;
  addressProofFileName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  status: "pending" | "approved" | "rejected";
  adminRemark: string;
  submittedAt: string;
}

export interface Center {
  id: string;
  name: string;
  address: string;
  state: string;
  district: string;
  block: string;
  contactPhone: string;
  isActive: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  publishDate: string;
  isPublished: boolean;
  imageUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  footerText: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  logoUrl: string;
}

export interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
}

export interface MediaFile {
  id: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  size: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  category: string;
  caption: string;
  uploadedAt: string;
  mediaType?: "photo" | "video";
}

export interface CompanyProfile {
  orgName: string;
  description: string;
  registrationNo: string;
  foundingYear: string;
  website: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  duration: string;
  eligibility: string;
  certification: string;
  description: string;
  outcomes: string[];
  image: string;
  color: string;
  isActive: boolean;
}

export interface LeadershipMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  message: string;
  photoUrl: string;
  sortOrder: number;
  isActive: boolean;
}

export interface FoundationEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface ComputerCenter {
  id: string;
  name: string;
  address: string;
  state: string;
  district: string;
  facilities: string;
  contactPhone: string;
  imageUrl?: string;
  isActive: boolean;
}

export interface SchemeItem {
  id: string;
  name: string;
  ministry: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  howToApply: string;
  color: string;
  featured: boolean;
  isActive: boolean;
  sortOrder: number;
  imageUrl?: string;
}

export interface LoanScheme {
  id: string;
  name: string;
  amount: string;
  interest: string;
  tenure: string;
  description: string;
  eligibility: string[];
  color: string;
  isActive: boolean;
  sortOrder: number;
}

export interface EmploymentPartner {
  id: string;
  name: string;
  sector: string;
  openings: number;
  description: string;
  isActive: boolean;
  sortOrder: number;
}

export interface SuccessStory {
  id: string;
  name: string;
  from: string;
  now: string;
  income: string;
  quote: string;
  imageUrl?: string;
  photoUrl?: string; // alias for imageUrl
  isActive: boolean;
  sortOrder?: number;
}

export interface AwardCategory {
  id: string;
  name?: string;
  category?: string;
  description: string;
  icon?: string;
  color: string;
  isActive: boolean;
  sortOrder: number;
  prize?: string;
}

export interface AwardWinner {
  id: string;
  name: string;
  district?: string;
  state?: string;
  category?: string;
  achievement?: string;
  year: string;
  imageUrl?: string;
  isActive: boolean;
  sortOrder?: number;
}

export interface ApplyFormSubmission {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  state: string;
  district: string;
  applyFor?: string;
  message: string;
  submittedAt: string;
  status: "new" | "contacted" | "enrolled" | "rejected" | "reviewed";
}

export interface HomeHeroContent {
  heading: string;
  subheading: string;
  primaryBtnText: string;
  secondaryBtnText: string;
}

export interface HomeStat {
  id: string;
  number: string;
  label: string;
  iconName: string;
  color: string;
  isActive: boolean;
  sortOrder: number;
}

export interface HomeInitiative {
  id: string;
  label: string;
  iconName: string;
  color: string;
  isActive: boolean;
  sortOrder: number;
}

export interface HomeImpactStory {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  bgColor: string;
  isActive: boolean;
  sortOrder: number;
}

export interface HomeCTAContent {
  heading: string;
  subtext: string;
  primaryBtnText: string;
  secondaryBtnText: string;
}

export interface CommunityCenter {
  id: string;
  name: string;
  address: string;
  state: string;
  district: string;
  services: string;
  contactPhone?: string;
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface TransportInfo {
  id: string;
  vehicleType: string;
  route?: string;
  routeFrom?: string;
  routeTo?: string;
  capacity: number | string;
  contactPhone?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface DownloadItem {
  id: string;
  title?: string;
  name?: string; // legacy
  description?: string;
  desc?: string; // legacy
  fileUrl: string;
  fileType?: string;
  type?: string; // legacy
  fileSize?: string;
  size?: string; // legacy
  category: string;
  isActive: boolean;
  uploadedAt?: string;
  sortOrder: number;
}

export interface LegalDocument {
  id: string;
  title: string;
  documentType: string;
  issuedBy: string;
  issueDate?: string;
  issuedDate?: string; // legacy
  validUpto?: string;
  expiryDate?: string; // legacy
  registrationNo?: string;
  description: string;
  documentUrl?: string;
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface WishesLetter {
  id: string;
  senderName: string;
  designation?: string;
  senderDesignation?: string;
  organization?: string;
  senderOrganization?: string;
  message: string;
  photoUrl?: string;
  receivedDate?: string;
  letterDate?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  youtubeId: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  photoUrl?: string;
  email?: string;
  phone?: string;
  bio: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  website?: string;
  partnerType: string;
  isActive: boolean;
  sortOrder: number;
}

export interface ComplaintSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  complaintType: string;
  subject: string;
  message: string;
  status: "pending" | "in_progress" | "resolved" | "rejected";
  submittedAt: string;
  adminNote?: string;
}

export interface FooterSettings {
  footerText: string;
  facebookUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  copyrightText: string;
  showQuickLinks: boolean;
  showPrograms: boolean;
}

// ─── Initial Data ───

const initialLegalDocuments: LegalDocument[] = [
  {
    id: "ld1",
    title: "Society Registration Certificate",
    documentType: "Registration",
    issuedBy: "Registrar of Societies, Uttar Pradesh",
    issueDate: "2015-03-15",
    validUpto: "",
    registrationNo: "UP/2015/NGO/4521",
    description:
      "Official registration certificate of DMVV Bhartiy Mahila Shakti Foundation under the Societies Registration Act, 1860.",
    documentUrl: "",
    imageUrl: "",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "ld2",
    title: "12A Certificate (Income Tax Exemption)",
    documentType: "Tax Exemption",
    issuedBy: "Income Tax Department, India",
    issueDate: "2016-07-20",
    validUpto: "",
    registrationNo: "AABCD1234E/12A/2016",
    description:
      "Certificate under Section 12A of the Income Tax Act, 1961, exempting the Foundation from income tax.",
    documentUrl: "",
    imageUrl: "",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "ld3",
    title: "80G Certificate (Donation Exemption)",
    documentType: "Tax Exemption",
    issuedBy: "Income Tax Department, India",
    issueDate: "2016-09-10",
    validUpto: "2027-03-31",
    registrationNo: "AABCD1234E/80G/2016",
    description:
      "Donors to DMVV Foundation are eligible for 50% tax deduction under Section 80G.",
    documentUrl: "",
    imageUrl: "",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "ld4",
    title: "PAN Card",
    documentType: "Tax Identity",
    issuedBy: "Income Tax Department, India",
    issueDate: "2015-04-01",
    validUpto: "",
    registrationNo: "AABCD1234E",
    description:
      "Permanent Account Number of DMVV Foundation for financial and tax purposes.",
    documentUrl: "",
    imageUrl: "",
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "ld5",
    title: "FCRA Registration",
    documentType: "Foreign Contribution",
    issuedBy: "Ministry of Home Affairs, India",
    issueDate: "2019-01-22",
    validUpto: "2024-01-21",
    registrationNo: "136001234",
    description:
      "Registration under the Foreign Contribution (Regulation) Act, 2010.",
    documentUrl: "",
    imageUrl: "",
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "ld6",
    title: "GST Registration Certificate",
    documentType: "Tax Registration",
    issuedBy: "GST Department, Uttar Pradesh",
    issueDate: "2018-06-05",
    validUpto: "",
    registrationNo: "09AABCD1234E1Z5",
    description:
      "Goods and Services Tax registration certificate for DMVV Foundation.",
    documentUrl: "",
    imageUrl: "",
    isActive: true,
    sortOrder: 6,
  },
];

const initialWishesLetters: WishesLetter[] = [
  {
    id: "wl1",
    senderName: "Shri. Rajnath Singh",
    designation: "Minister of Defence",
    organization: "Government of India",
    message:
      "I extend my heartiest congratulations to DMVV Bhartiy Mahila Shakti Foundation for their dedicated work towards women empowerment. Your efforts in rural areas are truly commendable.",
    photoUrl: "",
    receivedDate: "2024-01-15",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "wl2",
    senderName: "Dr. Smriti Irani",
    designation: "Former Union Minister",
    organization: "Ministry of Women & Child Development",
    message:
      "DMVV Foundation has set an example for all NGOs working in the women empowerment sector. Your work in skill development and financial inclusion deserves highest appreciation.",
    photoUrl: "",
    receivedDate: "2024-03-08",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "wl3",
    senderName: "Ms. Ananya Kapoor",
    designation: "State Program Director",
    organization: "UNICEF India",
    message:
      "We are proud to partner with DMVV Foundation. Their grassroots approach and community-centered model is a global best practice.",
    photoUrl: "",
    receivedDate: "2024-06-20",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "wl4",
    senderName: "Shri. Akhilesh Kumar",
    designation: "District Magistrate",
    organization: "District Administration, Lucknow",
    message:
      "The foundation's community centers have become the backbone of women support in our district. Their transparent operations and real impact is something every official wishes to replicate.",
    photoUrl: "",
    receivedDate: "2024-08-10",
    isActive: true,
    sortOrder: 4,
  },
];

const initialYouTubeVideos: YouTubeVideo[] = [];

const initialTeamMembers: TeamMember[] = [
  {
    id: "tm1",
    name: "Smt. Priya Sharma",
    designation: "Executive Director",
    department: "Leadership",
    photoUrl: "",
    bio: "15+ years experience in women empowerment and rural development. Leading DMVV Foundation's mission since 2015.",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "tm2",
    name: "Dr. Rekha Gupta",
    designation: "Program Director",
    department: "Programs",
    photoUrl: "",
    bio: "PhD in Social Work. Spearheading training and skill development programs across 8 states.",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "tm3",
    name: "Shri. Rajesh Kumar",
    designation: "Finance Manager",
    department: "Finance",
    photoUrl: "",
    bio: "CA with 10 years in NGO finance management, ensuring transparent use of funds.",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "tm4",
    name: "Smt. Anita Verma",
    designation: "Field Coordinator",
    department: "Operations",
    photoUrl: "",
    bio: "Grassroots leader working directly with beneficiaries in rural UP and Bihar.",
    isActive: true,
    sortOrder: 4,
  },
];

const initialPartners: Partner[] = [
  {
    id: "p1",
    name: "Ministry of Women & Child Development",
    description:
      "Central government ministry supporting women empowerment programs",
    logoUrl: "",
    website: "https://wcd.nic.in",
    partnerType: "Government",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "p2",
    name: "NITI Aayog",
    description: "Policy think tank supporting NGO initiatives across India",
    logoUrl: "",
    website: "https://niti.gov.in",
    partnerType: "Government",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "p3",
    name: "NSDC - National Skill Development Corp",
    description: "Skill certification and training partnership for women",
    logoUrl: "",
    website: "https://nsdcindia.org",
    partnerType: "Government",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "p4",
    name: "UNICEF India",
    description:
      "International support for child rights and women welfare programs",
    logoUrl: "",
    website: "https://unicef.org/india",
    partnerType: "International",
    isActive: true,
    sortOrder: 4,
  },
];

const initialComplaintSubmissions: ComplaintSubmission[] = [];

const initialFooterSettings: FooterSettings = {
  footerText:
    "Dedicated to the empowerment of women across India. Registered NGO under the Societies Registration Act.",
  facebookUrl: "https://facebook.com",
  twitterUrl: "https://twitter.com",
  youtubeUrl: "https://youtube.com",
  instagramUrl: "https://instagram.com",
  copyrightText:
    "© 2025 DMVV Bhartiy Mahila Shakti Foundation™. All Rights Reserved.",
  showQuickLinks: true,
  showPrograms: true,
};

const initialUsers: User[] = [
  {
    id: "u1",
    fullName: "Admin User",
    mobile: "9999999999",
    email: "admin@dmvv.org",
    password: "Admin@123",
    role: "admin",
    status: "approved",
    createdAt: "2025-01-01",
    isVerified: true,
    accessCode: "ADM001",
    isLoginActive: true,
    memberId: "DMVV/2025/ADM",
  },
  {
    id: "u2",
    fullName: "Priya Sharma",
    mobile: "9876543210",
    email: "priya@example.com",
    password: "User@123",
    role: "user",
    status: "approved",
    createdAt: "2025-01-05",
    isVerified: true,
    accessCode: "DMV001",
    isLoginActive: true,
    memberId: "DMVV/2025/001",
  },
  {
    id: "u3",
    fullName: "Rahul Verma",
    mobile: "9123456789",
    email: "rahul@example.com",
    password: "User@123",
    role: "center",
    status: "approved",
    createdAt: "2025-01-10",
    isVerified: false,
    accessCode: "DMV002",
    isLoginActive: true,
    memberId: "DMVV/2025/002",
  },
  {
    id: "u4",
    fullName: "Sunita Devi",
    mobile: "9234567890",
    email: "sunita@example.com",
    password: "User@123",
    role: "user",
    status: "pending",
    createdAt: "2025-01-15",
    isVerified: false,
    accessCode: "DMV003",
    isLoginActive: true,
    memberId: "DMVV/2025/003",
  },
];

const initialKYC: KYC[] = [
  {
    id: "kyc1",
    userId: "u2",
    aadhaarFileName: "priya_aadhaar.pdf",
    photoFileName: "priya_photo.jpg",
    addressProofFileName: "priya_address.pdf",
    bankName: "State Bank of India",
    accountNumber: "123456789012",
    ifscCode: "SBIN0001234",
    branchName: "Lucknow Main Branch",
    status: "approved",
    adminRemark: "All documents verified.",
    submittedAt: "2025-01-08",
  },
  {
    id: "kyc2",
    userId: "u3",
    aadhaarFileName: "rahul_aadhaar.pdf",
    photoFileName: "rahul_photo.jpg",
    addressProofFileName: "rahul_address.pdf",
    bankName: "Punjab National Bank",
    accountNumber: "987654321098",
    ifscCode: "PUNB0005678",
    branchName: "Varanasi Branch",
    status: "pending",
    adminRemark: "",
    submittedAt: "2025-01-12",
  },
];

const initialCenters: Center[] = [
  {
    id: "c1",
    name: "Lucknow Main Center",
    address: "123 Hazratganj, Lucknow",
    state: "Uttar Pradesh",
    district: "Lucknow",
    block: "Hazratganj",
    contactPhone: "0522-4001234",
    isActive: true,
  },
  {
    id: "c2",
    name: "Varanasi Community Center",
    address: "45 Lanka Road, Varanasi",
    state: "Uttar Pradesh",
    district: "Varanasi",
    block: "Lanka",
    contactPhone: "0542-4005678",
    isActive: true,
  },
  {
    id: "c3",
    name: "Patna Training Hub",
    address: "78 Boring Road, Patna",
    state: "Bihar",
    district: "Patna",
    block: "Boring Road",
    contactPhone: "0612-4009012",
    isActive: true,
  },
  {
    id: "c4",
    name: "Allahabad Skill Center",
    address: "22 Civil Lines, Prayagraj",
    state: "Uttar Pradesh",
    district: "Prayagraj",
    block: "Civil Lines",
    contactPhone: "0532-4003456",
    isActive: false,
  },
];

const initialNews: NewsItem[] = [
  {
    id: "n1",
    title:
      "DMVV Foundation Launches Skill Development Drive for 10,000 Women Across UP",
    content:
      "In a landmark initiative, DMVV Bhartiy Mahila Shakti Foundation has launched a massive skill development drive targeting 10,000 women across Uttar Pradesh.",
    category: "Program Update",
    publishDate: "2025-03-01",
    isPublished: true,
    imageUrl: "/assets/generated/training-tailoring.dim_600x400.jpg",
  },
  {
    id: "n2",
    title: "Annual Awards Ceremony 2025: Celebrating 500 Women Achievers",
    content:
      "DMVV Foundation hosted its Annual Awards Ceremony recognizing 500 exceptional women from across India for their outstanding achievements.",
    category: "Events",
    publishDate: "2025-02-15",
    isPublished: true,
    imageUrl: "/assets/generated/awards-ceremony.dim_600x400.jpg",
  },
  {
    id: "n3",
    title: "New Community Center Inaugurated in Gorakhpur",
    content:
      "A new state-of-the-art community center was inaugurated in Gorakhpur, equipped with computer labs, tailoring units, and health care facilities.",
    category: "Infrastructure",
    publishDate: "2025-01-20",
    isPublished: true,
    imageUrl: "/assets/generated/community-center.dim_600x400.jpg",
  },
];

const initialFAQs: FAQItem[] = [
  {
    id: "f1",
    question: "Who can become a member of DMVV Foundation?",
    answer:
      "Any woman aged 18 or above who is a citizen of India can apply for membership. There is no income bar.",
    sortOrder: 1,
  },
  {
    id: "f2",
    question: "What documents are required for registration?",
    answer:
      "You need a valid Aadhaar card, a passport-size photograph, and your mobile number.",
    sortOrder: 2,
  },
  {
    id: "f3",
    question: "Are the training programs free?",
    answer:
      "Most of our training programs are fully subsidized or free of charge for BPL families.",
    sortOrder: 3,
  },
  {
    id: "f4",
    question: "How can I apply for a loan through DMVV Foundation?",
    answer:
      "Apply at any community center. The loan committee reviews applications within 7 working days.",
    sortOrder: 4,
  },
  {
    id: "f5",
    question: "Does DMVV Foundation operate outside Uttar Pradesh?",
    answer:
      "Yes! We operate in 8 states: UP, Bihar, MP, Rajasthan, Jharkhand, Uttarakhand, Delhi NCR, and Haryana.",
    sortOrder: 5,
  },
  {
    id: "f6",
    question: "How are donations utilized?",
    answer:
      "80% goes directly to programs, 10% for administration, 10% for outreach. We publish annual reports.",
    sortOrder: 6,
  },
];

const initialSettings: SiteSettings = {
  siteTitle: "DMVV Bhartiy Mahila Shakti Foundation",
  tagline: "महिला सशक्तिकरण की ओर एक कदम",
  footerText:
    "Dedicated to the empowerment of women across India. Registered NGO under the Societies Registration Act.",
  contactEmail: "info@dmvvfoundation.org",
  contactPhone: "+91-522-4001234",
  address:
    "DMVV Foundation HQ, 15-A Civil Lines, Lucknow, Uttar Pradesh - 226001",
  logoUrl: "",
};

const initialPages: PageContent[] = [
  {
    id: "pg1",
    title: "Privacy Policy",
    slug: "privacy-policy",
    content:
      "This Privacy Policy outlines how DMVV Foundation collects, uses, and protects your personal information.",
    isPublished: true,
    createdAt: "2025-01-01",
  },
];

const initialMedia: MediaFile[] = [
  {
    id: "m1",
    fileName: "hero-women-empowerment.jpg",
    fileType: "image/jpeg",
    uploadedAt: "2025-01-01",
    size: "2.4 MB",
  },
  {
    id: "m2",
    fileName: "community-center.jpg",
    fileType: "image/jpeg",
    uploadedAt: "2025-01-02",
    size: "1.8 MB",
  },
];

const initialGalleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: "/assets/generated/training-tailoring.dim_600x400.jpg",
    category: "Training",
    caption: "Tailoring skill training session — Lucknow Center",
    uploadedAt: "2025-02-10",
    mediaType: "photo",
  },
  {
    id: "g2",
    src: "/assets/generated/training-computer-skills.dim_600x400.jpg",
    category: "Training",
    caption: "Computer literacy program — Varanasi Center",
    uploadedAt: "2025-02-12",
    mediaType: "photo",
  },
  {
    id: "g3",
    src: "/assets/generated/awards-ceremony.dim_600x400.jpg",
    category: "Awards",
    caption: "Annual Awards Ceremony 2025",
    uploadedAt: "2025-02-15",
    mediaType: "photo",
  },
  {
    id: "g4",
    src: "/assets/generated/community-center.dim_600x400.jpg",
    category: "Centers",
    caption: "Gorakhpur Community Center inauguration",
    uploadedAt: "2025-02-20",
    mediaType: "photo",
  },
  {
    id: "g5",
    src: "/assets/generated/employment-success.dim_600x400.jpg",
    category: "Events",
    caption: "Employment Mela — 200 women placed",
    uploadedAt: "2025-03-01",
    mediaType: "photo",
  },
];

const initialTrainingPrograms: TrainingProgram[] = [
  {
    id: "tp1",
    title: "Tailoring & Garment Making",
    duration: "3 Months",
    eligibility: "Women aged 18-45, Class 8 pass",
    certification: "NSDC Certified",
    description:
      "Comprehensive training in tailoring, dress designing, and garment making using modern industrial machines.",
    outcomes: [
      "Professional tailoring skills",
      "Self-employment capability",
      "Boutique management",
    ],
    image: "/assets/generated/training-tailoring.dim_600x400.jpg",
    color: "bg-purple-50 border-purple-200",
    isActive: true,
  },
  {
    id: "tp2",
    title: "Computer Skills & Digital Literacy",
    duration: "2 Months",
    eligibility: "Women aged 16-35, Class 10 pass",
    certification: "NIELIT Certified",
    description:
      "From basic computer operations to MS Office, internet usage, and online business skills.",
    outcomes: [
      "Basic to advanced computer skills",
      "Online job opportunities",
      "Digital payment literacy",
    ],
    image: "/assets/generated/training-computer-skills.dim_600x400.jpg",
    color: "bg-blue-50 border-blue-200",
    isActive: true,
  },
  {
    id: "tp3",
    title: "Beauty & Wellness Services",
    duration: "2 Months",
    eligibility: "Women aged 18-40, any education",
    certification: "BSSC Certified",
    description:
      "Professional beauty parlor training including hair styling, skin care, makeup, and salon management.",
    outcomes: [
      "Parlor management skills",
      "Home-based income",
      "Bridal makeup expertise",
    ],
    image: "/assets/generated/employment-success.dim_600x400.jpg",
    color: "bg-pink-50 border-pink-200",
    isActive: true,
  },
  {
    id: "tp4",
    title: "Financial Literacy & Banking",
    duration: "1 Month",
    eligibility: "All women members",
    certification: "DMVV Foundation Certificate",
    description:
      "Understanding banking, savings, insurance, SHG management, and accessing government financial schemes.",
    outcomes: [
      "Bank account management",
      "SHG formation skills",
      "Loan application process",
    ],
    image: "/assets/generated/community-center.dim_600x400.jpg",
    color: "bg-green-50 border-green-200",
    isActive: true,
  },
];

const initialCompanyProfile: CompanyProfile = {
  orgName: "DMVV Bhartiy Mahila Shakti Foundation",
  description: "A leading NGO dedicated to women empowerment across India.",
  registrationNo: "UP/2015/NGO/4521",
  foundingYear: "2015",
  website: "https://dmvvfoundation.org",
};

const initialLeadership: LeadershipMember[] = [
  {
    id: "lm1",
    name: "Smt. Durga Devi",
    designation: "Chairperson & Founder",
    qualification: "M.A. Social Work, Delhi University",
    message:
      "Our mission is to ensure that every woman in India has access to opportunities, dignity, and a life of her choosing.",
    photoUrl: "",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "lm2",
    name: "Shri. Vijay Kumar Verma",
    designation: "Secretary General",
    qualification: "LLB, Allahabad University",
    message:
      "Legal empowerment is the foundation of all empowerment. We ensure every woman knows her rights.",
    photoUrl: "",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "lm3",
    name: "Dr. Meena Agarwal",
    designation: "Medical Advisor",
    qualification: "MBBS, MD Community Medicine",
    message:
      "Women's health is the pillar of a healthy society. Our health programs reach the most remote villages.",
    photoUrl: "",
    sortOrder: 3,
    isActive: true,
  },
];

const initialFoundationEvents: FoundationEvent[] = [
  {
    id: "fe1",
    title: "Annual Women Empowerment Mahotsav 2025",
    description:
      "Grand annual celebration bringing together thousands of women beneficiaries, donors, and government officials.",
    eventDate: "2025-03-08",
    location: "Lucknow, Uttar Pradesh",
    imageUrl: "/assets/generated/awards-ceremony.dim_600x400.jpg",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "fe2",
    title: "Skill Development Camp — Rural UP",
    description:
      "Two-day residential skill development camp for women from 50 villages in rural Uttar Pradesh.",
    eventDate: "2025-02-20",
    location: "Gorakhpur, Uttar Pradesh",
    imageUrl: "/assets/generated/training-tailoring.dim_600x400.jpg",
    isActive: true,
    sortOrder: 2,
  },
];

const initialComputerCenters: ComputerCenter[] = [
  {
    id: "cc1",
    name: "DMVV Digital Kendra — Lucknow",
    address: "12-A, Indira Nagar, Lucknow",
    state: "Uttar Pradesh",
    district: "Lucknow",
    facilities: "30 computers, internet, printer, projector",
    contactPhone: "0522-4007890",
    imageUrl: "/assets/generated/training-computer-skills.dim_600x400.jpg",
    isActive: true,
  },
  {
    id: "cc2",
    name: "DMVV Tech Center — Varanasi",
    address: "45-B, Lanka Road, Varanasi",
    state: "Uttar Pradesh",
    district: "Varanasi",
    facilities: "20 computers, internet, tally software",
    contactPhone: "0542-4006789",
    imageUrl: "/assets/generated/training-computer-skills.dim_600x400.jpg",
    isActive: true,
  },
];

const initialSchemes: SchemeItem[] = [
  {
    id: "sc0",
    name: "Self Employment Revolution Scheme",
    ministry: "DMVV Foundation Initiative",
    description:
      "DMVV Foundation's flagship scheme empowering women to start their own businesses with training, mentorship, seed funding.",
    eligibility: [
      "Women aged 18-50",
      "BPL or lower middle-income families",
      "Completion of any DMVV skill training",
    ],
    benefits: [
      "Seed funding up to ₹50,000",
      "Business mentorship for 1 year",
      "Market linkage support",
    ],
    howToApply:
      "Apply at any DMVV community center with Aadhaar and training completion certificate.",
    color: "border-ngo-orange",
    featured: true,
    isActive: true,
    sortOrder: 0,
  },
  {
    id: "sc1",
    name: "Beti Bachao Beti Padhao",
    ministry: "Ministry of Women & Child Development",
    description:
      "National program to address the declining child sex ratio and promote education of the girl child.",
    eligibility: [
      "All families with girl children",
      "Below poverty line families",
    ],
    benefits: [
      "Free education support",
      "Health care for girls",
      "Cash incentive for education",
    ],
    howToApply: "Apply at district women and child development office.",
    color: "border-pink-400",
    featured: false,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "sc2",
    name: "PM Ujjwala Yojana",
    ministry: "Ministry of Petroleum & Natural Gas",
    description: "Provides free LPG connections to women from BPL households.",
    eligibility: ["BPL families", "Women must be head or co-applicant"],
    benefits: ["Free LPG connection", "First refill subsidy"],
    howToApply: "Apply at nearest LPG distributor with Aadhaar and BPL card.",
    color: "border-orange-400",
    featured: false,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "sc3",
    name: "Stand-Up India",
    ministry: "Ministry of Finance",
    description:
      "Bank loans between ₹10 lakh and ₹1 crore to SC/ST and women entrepreneurs.",
    eligibility: ["Women entrepreneurs", "First-time enterprise (Greenfield)"],
    benefits: ["Loan up to ₹1 crore", "7-year repayment period"],
    howToApply: "Apply through any scheduled commercial bank.",
    color: "border-blue-400",
    featured: false,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "sc4",
    name: "Skill India Mission for Women",
    ministry: "Ministry of Skill Development",
    description:
      "Vocational training and placement assistance to women in 40+ skill areas.",
    eligibility: ["Women aged 15-45", "Any educational qualification"],
    benefits: [
      "Free certified training",
      "Placement assistance",
      "Stipend during training",
    ],
    howToApply: "Register at DMVV skill center with Aadhaar.",
    color: "border-green-400",
    featured: false,
    isActive: true,
    sortOrder: 4,
  },
];

const initialLoanSchemes: LoanScheme[] = [
  {
    id: "ls1",
    name: "Micro Enterprise Loan",
    amount: "₹10,000 – ₹50,000",
    interest: "4% per annum",
    tenure: "12-24 months",
    description:
      "Small loans for starting micro-enterprises like tailoring units, food processing, handicrafts.",
    eligibility: ["DMVV member for 6+ months", "Completed skill training"],
    color: "border-l-4 border-l-green-500",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "ls2",
    name: "Self Help Group (SHG) Loan",
    amount: "₹50,000 – ₹2,00,000",
    interest: "6% per annum",
    tenure: "24-36 months",
    description:
      "Group loans for SHGs to start joint ventures or purchase equipment.",
    eligibility: ["Formed SHG with 10+ members", "6 months savings record"],
    color: "border-l-4 border-l-blue-500",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "ls3",
    name: "Education Loan for Women",
    amount: "₹25,000 – ₹1,00,000",
    interest: "3% per annum",
    tenure: "36-60 months",
    description:
      "Interest-subsidized education loans for women pursuing higher education.",
    eligibility: ["Women aged 18-35", "Admission confirmation letter"],
    color: "border-l-4 border-l-orange-500",
    isActive: true,
    sortOrder: 3,
  },
];

const initialEmploymentPartners: EmploymentPartner[] = [
  {
    id: "ep1",
    name: "Reliance Industries",
    sector: "Retail & FMCG",
    openings: 250,
    description:
      "Partnered for placement of trained women in retail and back-office roles.",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "ep2",
    name: "Tata Motors",
    sector: "Manufacturing",
    openings: 120,
    description:
      "Women-friendly manufacturing roles in assembly and quality control.",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "ep3",
    name: "Infosys BPO",
    sector: "IT & ITeS",
    openings: 350,
    description:
      "Work-from-home and office roles in data entry and customer support.",
    isActive: true,
    sortOrder: 3,
  },
];

const initialSuccessStories: SuccessStory[] = [
  {
    id: "ss1",
    name: "Meera Devi",
    from: "Daily wage worker, Gorakhpur",
    now: "Boutique owner employing 5 women",
    income: "₹35,000/month",
    quote:
      "DMVV Foundation gave me a needle and thread — I stitched my own destiny.",
    imageUrl: "/assets/generated/employment-success.dim_600x400.jpg",
    isActive: true,
  },
  {
    id: "ss2",
    name: "Sunita Kumari",
    from: "School dropout, Varanasi",
    now: "IT professional at a leading BPO",
    income: "₹22,000/month",
    quote:
      "I never thought a computer was for someone like me. DMVV showed me I was wrong.",
    imageUrl: "/assets/generated/training-computer-skills.dim_600x400.jpg",
    isActive: true,
  },
];

const initialAwardCategories: AwardCategory[] = [
  {
    id: "ac1",
    name: "Entrepreneurship Excellence",
    description: "Awarded to women who started and grew successful businesses",
    icon: "🏆",
    color: "bg-yellow-50 border-yellow-200",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "ac2",
    name: "Social Leadership",
    description: "For women who led community change and social impact",
    icon: "⭐",
    color: "bg-purple-50 border-purple-200",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "ac3",
    name: "Education Champion",
    description: "Women who pursued education against all odds",
    icon: "📚",
    color: "bg-blue-50 border-blue-200",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "ac4",
    name: "Digital Innovator",
    description: "Women excelling in technology and digital skills",
    icon: "💻",
    color: "bg-green-50 border-green-200",
    isActive: true,
    sortOrder: 4,
  },
];

const initialAwardWinners: AwardWinner[] = [
  {
    id: "aw1",
    name: "Rekha Singh",
    district: "Lucknow",
    category: "Entrepreneurship Excellence",
    achievement: "Started a tailoring cooperative employing 12 women",
    year: "2024",
    imageUrl: "/assets/generated/awards-ceremony.dim_600x400.jpg",
    isActive: true,
  },
  {
    id: "aw2",
    name: "Priya Pandey",
    district: "Varanasi",
    category: "Education Champion",
    achievement:
      "Completed B.Ed degree at 38 years of age while raising 3 children",
    year: "2024",
    imageUrl: "/assets/generated/awards-ceremony.dim_600x400.jpg",
    isActive: true,
  },
];

const initialApplyFormSubmissions: ApplyFormSubmission[] = [];

const initialHomeHero: HomeHeroContent = {
  heading: "Empowering Women\nTransforming India",
  subheading:
    "DMVV Bhartiy Mahila Shakti Foundation — dedicated to skill development, financial inclusion, and holistic empowerment of women across India.",
  primaryBtnText: "Know Our Mission",
  secondaryBtnText: "Join as Member",
};

const initialHomeStats: HomeStat[] = [
  {
    id: "hs1",
    number: "50,000+",
    label: "Women Empowered",
    iconName: "Users",
    color: "text-ngo-green",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "hs2",
    number: "200+",
    label: "Centers Active",
    iconName: "MapPin",
    color: "text-ngo-orange",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "hs3",
    number: "8",
    label: "States Covered",
    iconName: "Globe",
    color: "text-blue-500",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "hs4",
    number: "₹12 Cr+",
    label: "Loans Disbursed",
    iconName: "Banknote",
    color: "text-purple-500",
    isActive: true,
    sortOrder: 4,
  },
];

const initialHomeInitiatives: HomeInitiative[] = [
  {
    id: "hi1",
    label: "Skill Training",
    iconName: "GraduationCap",
    color: "text-ngo-green",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "hi2",
    label: "Micro Loans",
    iconName: "Banknote",
    color: "text-ngo-orange",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "hi3",
    label: "Legal Aid",
    iconName: "Shield",
    color: "text-blue-600",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "hi4",
    label: "Healthcare",
    iconName: "Heart",
    color: "text-red-500",
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "hi5",
    label: "Employment",
    iconName: "Briefcase",
    color: "text-purple-600",
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "hi6",
    label: "Education",
    iconName: "BookOpen",
    color: "text-yellow-600",
    isActive: true,
    sortOrder: 6,
  },
];

const initialHomeImpactStories: HomeImpactStory[] = [
  {
    id: "his1",
    title: "Meera: From Worker to Boutique Owner",
    subtitle: "Gorakhpur, UP — now earns ₹35,000/mo",
    imageUrl: "/assets/generated/employment-success.dim_600x400.jpg",
    bgColor: "bg-orange-50",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "his2",
    title: "Sunita: IT Professional at BPO",
    subtitle: "Varanasi, UP — placed at Infosys BPO",
    imageUrl: "/assets/generated/training-computer-skills.dim_600x400.jpg",
    bgColor: "bg-blue-50",
    isActive: true,
    sortOrder: 2,
  },
];

const initialHomeCTA: HomeCTAContent = {
  heading: "Ready to Change Lives?",
  subtext:
    "Join thousands of volunteers, donors, and partners who are building a stronger India — one woman at a time.",
  primaryBtnText: "Become a Member",
  secondaryBtnText: "Contact Us",
};

const initialCommunityCenters: CommunityCenter[] = [
  {
    id: "mc1",
    name: "Lucknow Women's Community Hub",
    address: "23-B, Gomti Nagar, Lucknow",
    state: "Uttar Pradesh",
    district: "Lucknow",
    services:
      "Skill training, health camps, legal aid, crèche, computer literacy",
    contactPhone: "0522-4009876",
    imageUrl: "/assets/generated/community-center.dim_600x400.jpg",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "mc2",
    name: "Varanasi Mahila Kendra",
    address: "67, Sigra Colony, Varanasi",
    state: "Uttar Pradesh",
    district: "Varanasi",
    services: "Tailoring, beauty training, SHG meetings, medical check-ups",
    contactPhone: "0542-4003210",
    imageUrl: "/assets/generated/training-tailoring.dim_600x400.jpg",
    isActive: true,
    sortOrder: 2,
  },
];

const initialTransportInfo: TransportInfo[] = [
  {
    id: "tr1",
    vehicleType: "Mini Bus (20 Seater)",
    route: "Lucknow Center ↔ Rural Areas (30 km radius)",
    capacity: 20,
    contactPhone: "9876543210",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "tr2",
    vehicleType: "Van (8 Seater)",
    route: "Varanasi Center ↔ Nearby Villages",
    capacity: 8,
    contactPhone: "9123456789",
    isActive: true,
    sortOrder: 2,
  },
];

const initialDownloadItems: DownloadItem[] = [
  {
    id: "di1",
    title: "DMVV Foundation Annual Report 2024",
    description:
      "Comprehensive annual report covering programs, financials, and impact metrics for 2024.",
    fileUrl: "#",
    fileType: "PDF",
    fileSize: "4.2 MB",
    category: "Reports",
    isActive: true,
    uploadedAt: "2025-01-15",
    sortOrder: 1,
  },
  {
    id: "di2",
    title: "Membership Registration Form",
    description: "Official form for new member registration.",
    fileUrl: "#",
    fileType: "PDF",
    fileSize: "0.8 MB",
    category: "Forms",
    isActive: true,
    uploadedAt: "2025-01-10",
    sortOrder: 2,
  },
  {
    id: "di3",
    title: "Loan Application Form",
    description: "Application form for micro-enterprise and SHG loans.",
    fileUrl: "#",
    fileType: "PDF",
    fileSize: "1.2 MB",
    category: "Forms",
    isActive: true,
    uploadedAt: "2025-01-10",
    sortOrder: 3,
  },
  {
    id: "di4",
    title: "Training Program Brochure 2025",
    description:
      "Details of all training programs, eligibility, duration, and certification for 2025.",
    fileUrl: "#",
    fileType: "PDF",
    fileSize: "2.5 MB",
    category: "Brochures",
    isActive: true,
    uploadedAt: "2025-01-08",
    sortOrder: 4,
  },
];

interface AppContextType {
  users: User[];
  kycs: KYC[];
  centers: Center[];
  news: NewsItem[];
  faqs: FAQItem[];
  settings: SiteSettings;
  pages: PageContent[];
  media: MediaFile[];
  galleryItems: GalleryItem[];
  trainingPrograms: TrainingProgram[];
  companyProfile: CompanyProfile;
  leadership: LeadershipMember[];
  foundationEvents: FoundationEvent[];
  computerCenters: ComputerCenter[];
  schemes: SchemeItem[];
  loanSchemes: LoanScheme[];
  employmentPartners: EmploymentPartner[];
  successStories: SuccessStory[];
  awardCategories: AwardCategory[];
  awardWinners: AwardWinner[];
  applyFormSubmissions: ApplyFormSubmission[];
  homeHero: HomeHeroContent;
  homeStats: HomeStat[];
  homeInitiatives: HomeInitiative[];
  homeImpactStories: HomeImpactStory[];
  homeCTA: HomeCTAContent;
  communityCenters: CommunityCenter[];
  transportInfo: TransportInfo[];
  downloadItems: DownloadItem[];
  legalDocuments: LegalDocument[];
  wishesLetters: WishesLetter[];
  youtubeVideos: YouTubeVideo[];
  teamMembers: TeamMember[];
  partners: Partner[];
  complaintSubmissions: ComplaintSubmission[];
  footerSettings: FooterSettings;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addKYC: (kyc: KYC) => void;
  updateKYC: (id: string, updates: Partial<KYC>) => void;
  addCenter: (center: Center) => void;
  updateCenter: (id: string, updates: Partial<Center>) => void;
  deleteCenter: (id: string) => void;
  addNews: (item: NewsItem) => void;
  updateNews: (id: string, updates: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  updateSettings: (updates: Partial<SiteSettings>) => void;
  addPage: (page: PageContent) => void;
  updatePage: (id: string, updates: Partial<PageContent>) => void;
  deletePage: (id: string) => void;
  addMedia: (file: MediaFile) => void;
  deleteMedia: (id: string) => void;
  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (id: string, updates: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  updateCompanyProfile: (updates: Partial<CompanyProfile>) => void;
  addTrainingProgram: (program: TrainingProgram) => void;
  updateTrainingProgram: (
    id: string,
    updates: Partial<TrainingProgram>,
  ) => void;
  deleteTrainingProgram: (id: string) => void;
  addLeadershipMember: (member: LeadershipMember) => void;
  updateLeadershipMember: (
    id: string,
    updates: Partial<LeadershipMember>,
  ) => void;
  deleteLeadershipMember: (id: string) => void;
  addFoundationEvent: (event: FoundationEvent) => void;
  updateFoundationEvent: (
    id: string,
    updates: Partial<FoundationEvent>,
  ) => void;
  deleteFoundationEvent: (id: string) => void;
  addComputerCenter: (cc: ComputerCenter) => void;
  updateComputerCenter: (id: string, updates: Partial<ComputerCenter>) => void;
  deleteComputerCenter: (id: string) => void;
  addScheme: (scheme: SchemeItem) => void;
  updateScheme: (id: string, updates: Partial<SchemeItem>) => void;
  deleteScheme: (id: string) => void;
  addLoanScheme: (ls: LoanScheme) => void;
  updateLoanScheme: (id: string, updates: Partial<LoanScheme>) => void;
  deleteLoanScheme: (id: string) => void;
  addEmploymentPartner: (p: EmploymentPartner) => void;
  updateEmploymentPartner: (
    id: string,
    updates: Partial<EmploymentPartner>,
  ) => void;
  deleteEmploymentPartner: (id: string) => void;
  addSuccessStory: (s: SuccessStory) => void;
  updateSuccessStory: (id: string, updates: Partial<SuccessStory>) => void;
  deleteSuccessStory: (id: string) => void;
  addAwardCategory: (ac: AwardCategory) => void;
  updateAwardCategory: (id: string, updates: Partial<AwardCategory>) => void;
  deleteAwardCategory: (id: string) => void;
  addAwardWinner: (aw: AwardWinner) => void;
  updateAwardWinner: (id: string, updates: Partial<AwardWinner>) => void;
  deleteAwardWinner: (id: string) => void;
  addApplyFormSubmission: (s: ApplyFormSubmission) => void;
  updateApplyFormSubmission: (
    id: string,
    updates: Partial<ApplyFormSubmission>,
  ) => void;
  deleteApplyFormSubmission: (id: string) => void;
  updateHomeHero: (updates: Partial<HomeHeroContent>) => void;
  addHomeStat: (stat: HomeStat) => void;
  updateHomeStat: (id: string, updates: Partial<HomeStat>) => void;
  deleteHomeStat: (id: string) => void;
  addHomeInitiative: (item: HomeInitiative) => void;
  updateHomeInitiative: (id: string, updates: Partial<HomeInitiative>) => void;
  deleteHomeInitiative: (id: string) => void;
  addHomeImpactStory: (story: HomeImpactStory) => void;
  updateHomeImpactStory: (
    id: string,
    updates: Partial<HomeImpactStory>,
  ) => void;
  deleteHomeImpactStory: (id: string) => void;
  updateHomeCTA: (updates: Partial<HomeCTAContent>) => void;
  addCommunityCenter: (cc: CommunityCenter) => void;
  updateCommunityCenter: (
    id: string,
    updates: Partial<CommunityCenter>,
  ) => void;
  deleteCommunityCenter: (id: string) => void;
  addTransportInfo: (t: TransportInfo) => void;
  updateTransportInfo: (id: string, updates: Partial<TransportInfo>) => void;
  deleteTransportInfo: (id: string) => void;
  addDownloadItem: (d: DownloadItem) => void;
  updateDownloadItem: (id: string, updates: Partial<DownloadItem>) => void;
  deleteDownloadItem: (id: string) => void;
  addLegalDocument: (doc: LegalDocument) => void;
  updateLegalDocument: (id: string, updates: Partial<LegalDocument>) => void;
  deleteLegalDocument: (id: string) => void;
  addWishesLetter: (w: WishesLetter) => void;
  updateWishesLetter: (id: string, updates: Partial<WishesLetter>) => void;
  deleteWishesLetter: (id: string) => void;
  addYouTubeVideo: (v: YouTubeVideo) => void;
  updateYouTubeVideo: (id: string, updates: Partial<YouTubeVideo>) => void;
  deleteYouTubeVideo: (id: string) => void;
  addTeamMember: (m: TeamMember) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  addPartner: (p: Partner) => void;
  updatePartner: (id: string, updates: Partial<Partner>) => void;
  deletePartner: (id: string) => void;
  addComplaintSubmission: (c: ComplaintSubmission) => void;
  updateComplaintSubmission: (
    id: string,
    updates: Partial<ComplaintSubmission>,
  ) => void;
  deleteComplaintSubmission: (id: string) => void;
  updateFooterSettings: (updates: Partial<FooterSettings>) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useLocalStorage<User[]>("dmvv_users", initialUsers);
  const [kycs, setKycs] = useLocalStorage<KYC[]>("dmvv_kycs", initialKYC);
  const [centers, setCenters] = useLocalStorage<Center[]>(
    "dmvv_centers",
    initialCenters,
  );
  const [news, setNews] = useLocalStorage<NewsItem[]>("dmvv_news", initialNews);
  const [faqs] = useLocalStorage<FAQItem[]>("dmvv_faqs", initialFAQs);
  const [settings, setSettings] = useLocalStorage<SiteSettings>(
    "dmvv_settings",
    initialSettings,
  );
  const [pages, setPages] = useLocalStorage<PageContent[]>(
    "dmvv_pages",
    initialPages,
  );
  const [media, setMedia] = useLocalStorage<MediaFile[]>(
    "dmvv_media",
    initialMedia,
  );
  const [galleryItems, setGalleryItems] = useLocalStorage<GalleryItem[]>(
    "dmvv_galleryItems",
    initialGalleryItems,
  );
  const [trainingPrograms, setTrainingPrograms] = useLocalStorage<
    TrainingProgram[]
  >("dmvv_trainingPrograms", initialTrainingPrograms);
  const [companyProfile, setCompanyProfile] = useLocalStorage<CompanyProfile>(
    "dmvv_companyProfile",
    initialCompanyProfile,
  );
  const [leadership, setLeadership] = useLocalStorage<LeadershipMember[]>(
    "dmvv_leadership",
    initialLeadership,
  );
  const [foundationEvents, setFoundationEvents] = useLocalStorage<
    FoundationEvent[]
  >("dmvv_foundationEvents", initialFoundationEvents);
  const [computerCenters, setComputerCenters] = useLocalStorage<
    ComputerCenter[]
  >("dmvv_computerCenters", initialComputerCenters);
  const [schemes, setSchemes] = useLocalStorage<SchemeItem[]>(
    "dmvv_schemes",
    initialSchemes,
  );
  const [loanSchemes, setLoanSchemes] = useLocalStorage<LoanScheme[]>(
    "dmvv_loanSchemes",
    initialLoanSchemes,
  );
  const [employmentPartners, setEmploymentPartners] = useLocalStorage<
    EmploymentPartner[]
  >("dmvv_employmentPartners", initialEmploymentPartners);
  const [successStories, setSuccessStories] = useLocalStorage<SuccessStory[]>(
    "dmvv_successStories",
    initialSuccessStories,
  );
  const [awardCategories, setAwardCategories] = useLocalStorage<
    AwardCategory[]
  >("dmvv_awardCategories", initialAwardCategories);
  const [awardWinners, setAwardWinners] = useLocalStorage<AwardWinner[]>(
    "dmvv_awardWinners",
    initialAwardWinners,
  );
  const [applyFormSubmissions, setApplyFormSubmissions] = useLocalStorage<
    ApplyFormSubmission[]
  >("dmvv_applyFormSubmissions", initialApplyFormSubmissions);
  const [homeHero, setHomeHero] = useLocalStorage<HomeHeroContent>(
    "dmvv_homeHero",
    initialHomeHero,
  );
  const [homeStats, setHomeStats] = useLocalStorage<HomeStat[]>(
    "dmvv_homeStats",
    initialHomeStats,
  );
  const [homeInitiatives, setHomeInitiatives] = useLocalStorage<
    HomeInitiative[]
  >("dmvv_homeInitiatives", initialHomeInitiatives);
  const [homeImpactStories, setHomeImpactStories] = useLocalStorage<
    HomeImpactStory[]
  >("dmvv_homeImpactStories", initialHomeImpactStories);
  const [homeCTA, setHomeCTA] = useLocalStorage<HomeCTAContent>(
    "dmvv_homeCTA",
    initialHomeCTA,
  );
  const [communityCenters, setCommunityCenters] = useLocalStorage<
    CommunityCenter[]
  >("dmvv_communityCenters", initialCommunityCenters);
  const [transportInfo, setTransportInfo] = useLocalStorage<TransportInfo[]>(
    "dmvv_transportInfo",
    initialTransportInfo,
  );
  const [downloadItems, setDownloadItems] = useLocalStorage<DownloadItem[]>(
    "dmvv_downloadItems",
    initialDownloadItems,
  );
  const [legalDocuments, setLegalDocuments] = useLocalStorage<LegalDocument[]>(
    "dmvv_legalDocuments",
    initialLegalDocuments,
  );
  const [wishesLetters, setWishesLetters] = useLocalStorage<WishesLetter[]>(
    "dmvv_wishesLetters",
    initialWishesLetters,
  );
  const [youtubeVideos, setYouTubeVideos] = useLocalStorage<YouTubeVideo[]>(
    "dmvv_youtubeVideos",
    initialYouTubeVideos,
  );
  const [teamMembers, setTeamMembers] = useLocalStorage<TeamMember[]>(
    "dmvv_teamMembers",
    initialTeamMembers,
  );
  const [partners, setPartners] = useLocalStorage<Partner[]>(
    "dmvv_partners",
    initialPartners,
  );
  const [complaintSubmissions, setComplaintSubmissions] = useLocalStorage<
    ComplaintSubmission[]
  >("dmvv_complaints", initialComplaintSubmissions);
  const [footerSettings, setFooterSettings] = useLocalStorage<FooterSettings>(
    "dmvv_footerSettings",
    initialFooterSettings,
  );
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>(
    "dmvv_currentUser",
    null,
  );

  const addUser = (user: User) => setUsers((prev) => [...prev, user]);
  const updateUser = (id: string, updates: Partial<User>) =>
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    );
  const deleteUser = (id: string) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));
  const addKYC = (kyc: KYC) => setKycs((prev) => [...prev, kyc]);
  const updateKYC = (id: string, updates: Partial<KYC>) =>
    setKycs((prev) =>
      prev.map((k) => (k.id === id ? { ...k, ...updates } : k)),
    );
  const addCenter = (center: Center) => setCenters((prev) => [...prev, center]);
  const updateCenter = (id: string, updates: Partial<Center>) =>
    setCenters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  const deleteCenter = (id: string) =>
    setCenters((prev) => prev.filter((c) => c.id !== id));
  const addNews = (item: NewsItem) => setNews((prev) => [...prev, item]);
  const updateNews = (id: string, updates: Partial<NewsItem>) =>
    setNews((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n)),
    );
  const deleteNews = (id: string) =>
    setNews((prev) => prev.filter((n) => n.id !== id));
  const updateSettings = (updates: Partial<SiteSettings>) =>
    setSettings((prev) => ({ ...prev, ...updates }));
  const addPage = (page: PageContent) => setPages((prev) => [...prev, page]);
  const updatePage = (id: string, updates: Partial<PageContent>) =>
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    );
  const deletePage = (id: string) =>
    setPages((prev) => prev.filter((p) => p.id !== id));
  const addMedia = (file: MediaFile) => setMedia((prev) => [...prev, file]);
  const deleteMedia = (id: string) =>
    setMedia((prev) => prev.filter((m) => m.id !== id));
  const addGalleryItem = (item: GalleryItem) =>
    setGalleryItems((prev) => [...prev, item]);
  const updateGalleryItem = (id: string, updates: Partial<GalleryItem>) =>
    setGalleryItems((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates } : g)),
    );
  const deleteGalleryItem = (id: string) =>
    setGalleryItems((prev) => prev.filter((g) => g.id !== id));
  const addTrainingProgram = (program: TrainingProgram) =>
    setTrainingPrograms((prev) => [...prev, program]);
  const updateTrainingProgram = (
    id: string,
    updates: Partial<TrainingProgram>,
  ) =>
    setTrainingPrograms((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  const deleteTrainingProgram = (id: string) =>
    setTrainingPrograms((prev) => prev.filter((t) => t.id !== id));
  const updateCompanyProfile = (updates: Partial<CompanyProfile>) =>
    setCompanyProfile((prev) => ({ ...prev, ...updates }));
  const addLeadershipMember = (member: LeadershipMember) =>
    setLeadership((prev) => [...prev, member]);
  const updateLeadershipMember = (
    id: string,
    updates: Partial<LeadershipMember>,
  ) =>
    setLeadership((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    );
  const deleteLeadershipMember = (id: string) =>
    setLeadership((prev) => prev.filter((l) => l.id !== id));
  const addFoundationEvent = (event: FoundationEvent) =>
    setFoundationEvents((prev) => [...prev, event]);
  const updateFoundationEvent = (
    id: string,
    updates: Partial<FoundationEvent>,
  ) =>
    setFoundationEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    );
  const deleteFoundationEvent = (id: string) =>
    setFoundationEvents((prev) => prev.filter((e) => e.id !== id));
  const addComputerCenter = (cc: ComputerCenter) =>
    setComputerCenters((prev) => [...prev, cc]);
  const updateComputerCenter = (id: string, updates: Partial<ComputerCenter>) =>
    setComputerCenters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  const deleteComputerCenter = (id: string) =>
    setComputerCenters((prev) => prev.filter((c) => c.id !== id));
  const addScheme = (scheme: SchemeItem) =>
    setSchemes((prev) => [...prev, scheme]);
  const updateScheme = (id: string, updates: Partial<SchemeItem>) =>
    setSchemes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    );
  const deleteScheme = (id: string) =>
    setSchemes((prev) => prev.filter((s) => s.id !== id));
  const addLoanScheme = (ls: LoanScheme) =>
    setLoanSchemes((prev) => [...prev, ls]);
  const updateLoanScheme = (id: string, updates: Partial<LoanScheme>) =>
    setLoanSchemes((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    );
  const deleteLoanScheme = (id: string) =>
    setLoanSchemes((prev) => prev.filter((l) => l.id !== id));
  const addEmploymentPartner = (p: EmploymentPartner) =>
    setEmploymentPartners((prev) => [...prev, p]);
  const updateEmploymentPartner = (
    id: string,
    updates: Partial<EmploymentPartner>,
  ) =>
    setEmploymentPartners((prev) =>
      prev.map((ep) => (ep.id === id ? { ...ep, ...updates } : ep)),
    );
  const deleteEmploymentPartner = (id: string) =>
    setEmploymentPartners((prev) => prev.filter((p) => p.id !== id));
  const addSuccessStory = (s: SuccessStory) =>
    setSuccessStories((prev) => [...prev, s]);
  const updateSuccessStory = (id: string, updates: Partial<SuccessStory>) =>
    setSuccessStories((prev) =>
      prev.map((ss) => (ss.id === id ? { ...ss, ...updates } : ss)),
    );
  const deleteSuccessStory = (id: string) =>
    setSuccessStories((prev) => prev.filter((ss) => ss.id !== id));
  const addAwardCategory = (ac: AwardCategory) =>
    setAwardCategories((prev) => [...prev, ac]);
  const updateAwardCategory = (id: string, updates: Partial<AwardCategory>) =>
    setAwardCategories((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    );
  const deleteAwardCategory = (id: string) =>
    setAwardCategories((prev) => prev.filter((a) => a.id !== id));
  const addAwardWinner = (aw: AwardWinner) =>
    setAwardWinners((prev) => [...prev, aw]);
  const updateAwardWinner = (id: string, updates: Partial<AwardWinner>) =>
    setAwardWinners((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...updates } : w)),
    );
  const deleteAwardWinner = (id: string) =>
    setAwardWinners((prev) => prev.filter((w) => w.id !== id));
  const addApplyFormSubmission = (s: ApplyFormSubmission) =>
    setApplyFormSubmissions((prev) => [...prev, s]);
  const updateApplyFormSubmission = (
    id: string,
    updates: Partial<ApplyFormSubmission>,
  ) =>
    setApplyFormSubmissions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    );
  const deleteApplyFormSubmission = (id: string) =>
    setApplyFormSubmissions((prev) => prev.filter((a) => a.id !== id));
  const updateHomeHero = (updates: Partial<HomeHeroContent>) =>
    setHomeHero((prev) => ({ ...prev, ...updates }));
  const addHomeStat = (stat: HomeStat) =>
    setHomeStats((prev) => [...prev, stat]);
  const updateHomeStat = (id: string, updates: Partial<HomeStat>) =>
    setHomeStats((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    );
  const deleteHomeStat = (id: string) =>
    setHomeStats((prev) => prev.filter((s) => s.id !== id));
  const addHomeInitiative = (item: HomeInitiative) =>
    setHomeInitiatives((prev) => [...prev, item]);
  const updateHomeInitiative = (id: string, updates: Partial<HomeInitiative>) =>
    setHomeInitiatives((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updates } : i)),
    );
  const deleteHomeInitiative = (id: string) =>
    setHomeInitiatives((prev) => prev.filter((i) => i.id !== id));
  const addHomeImpactStory = (story: HomeImpactStory) =>
    setHomeImpactStories((prev) => [...prev, story]);
  const updateHomeImpactStory = (
    id: string,
    updates: Partial<HomeImpactStory>,
  ) =>
    setHomeImpactStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    );
  const deleteHomeImpactStory = (id: string) =>
    setHomeImpactStories((prev) => prev.filter((s) => s.id !== id));
  const updateHomeCTA = (updates: Partial<HomeCTAContent>) =>
    setHomeCTA((prev) => ({ ...prev, ...updates }));
  const addCommunityCenter = (cc: CommunityCenter) =>
    setCommunityCenters((prev) => [...prev, cc]);
  const updateCommunityCenter = (
    id: string,
    updates: Partial<CommunityCenter>,
  ) =>
    setCommunityCenters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  const deleteCommunityCenter = (id: string) =>
    setCommunityCenters((prev) => prev.filter((c) => c.id !== id));
  const addTransportInfo = (t: TransportInfo) =>
    setTransportInfo((prev) => [...prev, t]);
  const updateTransportInfo = (id: string, updates: Partial<TransportInfo>) =>
    setTransportInfo((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  const deleteTransportInfo = (id: string) =>
    setTransportInfo((prev) => prev.filter((t) => t.id !== id));
  const addDownloadItem = (d: DownloadItem) =>
    setDownloadItems((prev) => [...prev, d]);
  const updateDownloadItem = (id: string, updates: Partial<DownloadItem>) =>
    setDownloadItems((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    );
  const deleteDownloadItem = (id: string) =>
    setDownloadItems((prev) => prev.filter((d) => d.id !== id));
  const addLegalDocument = (doc: LegalDocument) =>
    setLegalDocuments((prev) => [...prev, doc]);
  const updateLegalDocument = (id: string, updates: Partial<LegalDocument>) =>
    setLegalDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    );
  const deleteLegalDocument = (id: string) =>
    setLegalDocuments((prev) => prev.filter((d) => d.id !== id));
  const addWishesLetter = (w: WishesLetter) =>
    setWishesLetters((prev) => [...prev, w]);
  const updateWishesLetter = (id: string, updates: Partial<WishesLetter>) =>
    setWishesLetters((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    );
  const deleteWishesLetter = (id: string) =>
    setWishesLetters((prev) => prev.filter((l) => l.id !== id));
  const addYouTubeVideo = (v: YouTubeVideo) =>
    setYouTubeVideos((prev) => [...prev, v]);
  const updateYouTubeVideo = (id: string, updates: Partial<YouTubeVideo>) =>
    setYouTubeVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v)),
    );
  const deleteYouTubeVideo = (id: string) =>
    setYouTubeVideos((prev) => prev.filter((v) => v.id !== id));
  const addTeamMember = (m: TeamMember) =>
    setTeamMembers((prev) => [...prev, m]);
  const updateTeamMember = (id: string, updates: Partial<TeamMember>) =>
    setTeamMembers((prev) =>
      prev.map((tm) => (tm.id === id ? { ...tm, ...updates } : tm)),
    );
  const deleteTeamMember = (id: string) =>
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  const addPartner = (p: Partner) => setPartners((prev) => [...prev, p]);
  const updatePartner = (id: string, updates: Partial<Partner>) =>
    setPartners((prev) =>
      prev.map((pt) => (pt.id === id ? { ...pt, ...updates } : pt)),
    );
  const deletePartner = (id: string) =>
    setPartners((prev) => prev.filter((p) => p.id !== id));
  const addComplaintSubmission = (c: ComplaintSubmission) =>
    setComplaintSubmissions((prev) => [...prev, c]);
  const updateComplaintSubmission = (
    id: string,
    updates: Partial<ComplaintSubmission>,
  ) =>
    setComplaintSubmissions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  const deleteComplaintSubmission = (id: string) =>
    setComplaintSubmissions((prev) => prev.filter((c) => c.id !== id));
  const updateFooterSettings = (updates: Partial<FooterSettings>) =>
    setFooterSettings((prev) => ({ ...prev, ...updates }));

  return (
    <AppContext.Provider
      value={{
        users,
        kycs,
        centers,
        news,
        faqs,
        settings,
        pages,
        media,
        galleryItems,
        trainingPrograms,
        companyProfile,
        leadership,
        foundationEvents,
        computerCenters,
        schemes,
        loanSchemes,
        employmentPartners,
        successStories,
        awardCategories,
        awardWinners,
        applyFormSubmissions,
        homeHero,
        homeStats,
        homeInitiatives,
        homeImpactStories,
        homeCTA,
        communityCenters,
        transportInfo,
        downloadItems,
        legalDocuments,
        wishesLetters,
        youtubeVideos,
        teamMembers,
        partners,
        complaintSubmissions,
        footerSettings,
        currentUser,
        setCurrentUser,
        addUser,
        updateUser,
        deleteUser,
        addKYC,
        updateKYC,
        addCenter,
        updateCenter,
        deleteCenter,
        addNews,
        updateNews,
        deleteNews,
        updateSettings,
        addPage,
        updatePage,
        deletePage,
        addMedia,
        deleteMedia,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        updateCompanyProfile,
        addTrainingProgram,
        updateTrainingProgram,
        deleteTrainingProgram,
        addLeadershipMember,
        updateLeadershipMember,
        deleteLeadershipMember,
        addFoundationEvent,
        updateFoundationEvent,
        deleteFoundationEvent,
        addComputerCenter,
        updateComputerCenter,
        deleteComputerCenter,
        addScheme,
        updateScheme,
        deleteScheme,
        addLoanScheme,
        updateLoanScheme,
        deleteLoanScheme,
        addEmploymentPartner,
        updateEmploymentPartner,
        deleteEmploymentPartner,
        addSuccessStory,
        updateSuccessStory,
        deleteSuccessStory,
        addAwardCategory,
        updateAwardCategory,
        deleteAwardCategory,
        addAwardWinner,
        updateAwardWinner,
        deleteAwardWinner,
        addApplyFormSubmission,
        updateApplyFormSubmission,
        deleteApplyFormSubmission,
        updateHomeHero,
        addHomeStat,
        updateHomeStat,
        deleteHomeStat,
        addHomeInitiative,
        updateHomeInitiative,
        deleteHomeInitiative,
        addHomeImpactStory,
        updateHomeImpactStory,
        deleteHomeImpactStory,
        updateHomeCTA,
        addCommunityCenter,
        updateCommunityCenter,
        deleteCommunityCenter,
        addTransportInfo,
        updateTransportInfo,
        deleteTransportInfo,
        addDownloadItem,
        updateDownloadItem,
        deleteDownloadItem,
        addLegalDocument,
        updateLegalDocument,
        deleteLegalDocument,
        addWishesLetter,
        updateWishesLetter,
        deleteWishesLetter,
        addYouTubeVideo,
        updateYouTubeVideo,
        deleteYouTubeVideo,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addPartner,
        updatePartner,
        deletePartner,
        addComplaintSubmission,
        updateComplaintSubmission,
        deleteComplaintSubmission,
        updateFooterSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
