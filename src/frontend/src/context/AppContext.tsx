import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  initializeFromBackend,
  saveToBackend,
} from "@/utils/BackendDataService";
import { useEffect, useRef } from "react";
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
  aadhaarNumber?: string;
  panNumber?: string;
  gender?: string;
  nomineeName?: string;
  nomineeRelation?: string;
  designation?: string;
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
  signatureUrl: string;
  sealUrl: string;
  authorityName: string;
  authorityDesignation: string;
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
  photoUrl?: string;
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

export interface SliderImage {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  sortOrder: number;
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
  name?: string;
  description?: string;
  desc?: string;
  fileUrl: string;
  fileType?: string;
  type?: string;
  fileSize?: string;
  size?: string;
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
  issuedDate?: string;
  validUpto?: string;
  expiryDate?: string;
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

// ─── New interfaces ───────────────────────────────────────────────────────────

export interface LoanApplication {
  id: string;
  userId: string;
  userName: string;
  userMobile: string;
  loanType: "general" | "shg" | "udhyog";
  amount: string;
  purpose: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  guarantorName: string;
  guarantorPhone: string;
  businessDetails?: string;
  shgName?: string;
  shgMembersCount?: string;
  businessName?: string;
  businessType?: string;
  gstNumber?: string;
  status: "pending" | "approved" | "rejected" | "under_review";
  appliedAt: string;
  adminRemark?: string;
}

export interface IncomeSource {
  id: string;
  userId: string;
  source: string;
  type: "salary" | "business" | "farming" | "handicraft" | "other";
  monthlyAmount: string;
  description: string;
  addedAt: string;
}

export interface TrainingEnrollment {
  id: string;
  userId: string;
  userName: string;
  programName: string;
  programId: string;
  enrolledAt: string;
  status: "pending" | "enrolled" | "completed" | "cancelled";
}

export interface VolunteerActivity {
  id: string;
  userId: string;
  userName: string;
  userMobile: string;
  area: string;
  hoursPerWeek: string;
  availability: string;
  description: string;
  status: "pending" | "active" | "inactive";
  joinedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl?: string;
  centerId?: string;
  centerName?: string;
  stock: number;
  isActive: boolean;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userMobile: string;
  userAddress: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: string;
  }[];
  totalAmount: string;
  status: "placed" | "confirmed" | "shipped" | "delivered" | "cancelled";
  placedAt: string;
  centerId?: string;
}

export interface InsuranceScheme {
  id: string;
  name: string;
  type: "life" | "health" | "crop" | "accident";
  description: string;
  premium: string;
  coverage: string;
  tenure: string;
  eligibility: string[];
  isActive: boolean;
}

export interface InsuranceApplication {
  id: string;
  userId: string;
  userName: string;
  schemeId: string;
  schemeName: string;
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  balance: number;
}

export interface UtilityService {
  id: string;
  name: string;
  description: string;
  type: "electricity" | "water" | "gas" | "insurance" | "other";
  contactNumber: string;
  isActive: boolean;
}

// ─── New Management Interfaces ───────────────────────────────────────────────

export interface MemberRecord {
  id: string;
  centerId: string;
  fullName: string;
  mobile: string;
  role: string;
  salaryGrade: "A" | "B" | "C";
  joiningDate: string;
  status: "active" | "inactive";
  photo?: string;
  address?: string;
  aadhaar?: string;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  centerId: string;
  date: string;
  present: boolean;
  remarks?: string;
}

export interface PayrollRecord {
  id: string;
  userId: string;
  staffName: string;
  staffDesignation: string;
  month: string;
  basicSalary: number;
  hra: number;
  da: number;
  ta: number;
  medical: number;
  bonus: number;
  grossSalary: number;
  pfDeduction: number;
  esiDeduction: number;
  tdsDeduction: number;
  advanceDeduction: number;
  totalDeductions: number;
  netSalary: number;
  status: "pending" | "approved" | "paid" | "hold";
  generatedAt: string;
  paidAt?: string;
  adminRemark?: string;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  leaveType: "casual" | "sick" | "earned" | "unpaid";
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
  hrRemark?: string;
}

export interface SupervisorReport {
  id: string;
  supervisorId: string;
  supervisorName: string;
  centerId: string;
  centerName: string;
  reportType: "daily" | "weekly" | "monthly";
  date: string;
  membersPresent: number;
  production: number;
  issues: string;
  remarks: string;
  submittedAt: string;
}

export interface ProductionEntry {
  id: string;
  centerId: string;
  memberId: string;
  memberName: string;
  productName: string;
  unitsProduced: number;
  qualityCheck: "pass" | "fail" | "pending";
  date: string;
  remarks?: string;
}

export interface MachineRecord {
  id: string;
  centerId: string;
  machineId: string;
  machineName: string;
  machineType: string;
  status: "working" | "repair" | "maintenance" | "idle";
  lastMaintenance: string;
  nextMaintenance: string;
  assignedTo?: string;
  purchaseDate?: string;
  remarks?: string;
}

export interface Review {
  id: string;
  name: string;
  profileInitial: string;
  avatarColor: string;
  stars: number;
  text: string;
  date: string;
  isApproved: boolean;
}

export interface HomeCard {
  id: string;
  name: string;
  description: string;
  icon: string;
  imageUrl: string;
  isActive: boolean;
  sortOrder: number;
}

const initialReviews: Review[] = [
  {
    id: "rv1",
    name: "Sunita Devi",
    profileInitial: "S",
    avatarColor: "bg-green-500",
    stars: 5,
    text: "DMVV Foundation has changed my life. With their help I started my own small business and now I can support my family independently.",
    date: "2024-12-15",
    isApproved: true,
  },
  {
    id: "rv2",
    name: "Priya Sharma",
    profileInitial: "P",
    avatarColor: "bg-orange-500",
    stars: 5,
    text: "The skill development training I received from DMVV Foundation helped me get a job in the textile industry. I am very grateful.",
    date: "2024-11-20",
    isApproved: true,
  },
  {
    id: "rv3",
    name: "Meena Kumari",
    profileInitial: "M",
    avatarColor: "bg-blue-500",
    stars: 4,
    text: "Excellent support for women like me. They helped me access government schemes and provided guidance throughout the process.",
    date: "2025-01-08",
    isApproved: true,
  },
];

const initialHomeCards: HomeCard[] = [
  {
    id: "hc1",
    name: "Beti Bachao Beti Padhao",
    description: "Protecting and educating the girl child across India",
    icon: "👧",
    imageUrl: "",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "hc2",
    name: "PM Ujjwala Yojana",
    description: "Clean cooking fuel for women from BPL households",
    icon: "🔥",
    imageUrl: "",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "hc3",
    name: "Mahila Shakti Kendra",
    description: "Strengthening rural women through community participation",
    icon: "🏠",
    imageUrl: "",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "hc4",
    name: "Stand-Up India",
    description: "Loans for women entrepreneurs to set up enterprises",
    icon: "📊",
    imageUrl: "",
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "hc5",
    name: "Skill India for Women",
    description: "Vocational training and placement for women",
    icon: "🎓",
    imageUrl: "",
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "hc6",
    name: "MUDRA Yojana",
    description: "Micro-financing for small businesses run by women",
    icon: "💰",
    imageUrl: "",
    isActive: true,
    sortOrder: 6,
  },
];

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
    name: "Varanasi Center",
    address: "45 Sigra, Varanasi",
    state: "Uttar Pradesh",
    district: "Varanasi",
    block: "Sigra",
    contactPhone: "0542-2201234",
    isActive: true,
  },
];

const initialNews: NewsItem[] = [
  {
    id: "n1",
    title: "Annual Women Empowerment Summit 2025",
    content:
      "DMVV Foundation hosted its annual summit bringing together 500+ women entrepreneurs from across UP and Bihar.",
    category: "Events",
    publishDate: "2025-03-08",
    isPublished: true,
    imageUrl: "/assets/generated/awards-ceremony.dim_600x400.jpg",
  },
  {
    id: "n2",
    title: "New Skill Development Center Opens in Patna",
    content:
      "DMVV Foundation expands to Bihar with a state-of-the-art skill development center offering 8 courses.",
    category: "Expansion",
    publishDate: "2025-02-15",
    isPublished: true,
    imageUrl: "/assets/generated/training-computer-skills.dim_600x400.jpg",
  },
];

const initialFAQs: FAQItem[] = [
  {
    id: "f1",
    question: "How do I register with DMVV Foundation?",
    answer:
      "Visit our Signup page, fill in your details and select your role. Admin will approve your account within 24-48 hours.",
    sortOrder: 1,
  },
  {
    id: "f2",
    question: "What documents are required for KYC?",
    answer:
      "Aadhaar card, passport photo, address proof, and bank account details are required.",
    sortOrder: 2,
  },
  {
    id: "f3",
    question: "How can I apply for a loan?",
    answer:
      "After account approval and KYC verification, visit the Loan section in your dashboard and fill the application form.",
    sortOrder: 3,
  },
];

const initialSettings: SiteSettings = {
  siteTitle: "DMVV Bhartiy Mahila Shakti Foundation™",
  tagline: "Empowering Women, Building India",
  footerText: "Dedicated to the empowerment of women across India since 2015.",
  contactEmail: "info@dmvvfoundation.org",
  contactPhone: "+91 9876543210",
  address: "123 Hazratganj, Lucknow - 226001, Uttar Pradesh, India",
  logoUrl: "/assets/dmvv_01-019d502e-b12e-7281-9c5f-d104232dfddd.png",
  signatureUrl: "",
  sealUrl: "",
  authorityName: "Smt. Priya Sharma",
  authorityDesignation: "Executive Director",
};

const initialPages: PageContent[] = [];
const initialMedia: MediaFile[] = [];

const initialGalleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: "/assets/generated/hero-women-empowerment.dim_1400x700.jpg",
    category: "Events",
    caption: "Annual Women Empowerment Summit",
    uploadedAt: "2025-03-08",
    mediaType: "photo",
  },
  {
    id: "g2",
    src: "/assets/generated/training-tailoring.dim_600x400.jpg",
    category: "Training",
    caption: "Tailoring & Embroidery Workshop",
    uploadedAt: "2025-02-10",
    mediaType: "photo",
  },
  {
    id: "g3",
    src: "/assets/generated/community-center.dim_600x400.jpg",
    category: "Centers",
    caption: "Community Center - Lucknow",
    uploadedAt: "2025-01-20",
    mediaType: "photo",
  },
];

const initialTrainingPrograms: TrainingProgram[] = [
  {
    id: "tp1",
    title: "Tailoring & Garment Making",
    duration: "3 Months",
    eligibility: "Class 8 pass, Age 18-45",
    certification: "NSDC Certified",
    description:
      "Learn professional tailoring, garment design and quality stitching techniques from expert trainers.",
    outcomes: [
      "Professional stitching skills",
      "Business setup guidance",
      "Market linkage support",
    ],
    image: "/assets/generated/training-tailoring.dim_600x400.jpg",
    color: "bg-green-50 border-green-200",
    isActive: true,
  },
  {
    id: "tp2",
    title: "Computer & Digital Literacy",
    duration: "2 Months",
    eligibility: "Class 10 pass, Age 16-40",
    certification: "NIELIT Certified",
    description:
      "Master basic to advanced computer skills, MS Office, internet, and digital payment systems.",
    outcomes: [
      "Job-ready computer skills",
      "Digital banking knowledge",
      "Online business setup",
    ],
    image: "/assets/generated/training-computer-skills.dim_600x400.jpg",
    color: "bg-blue-50 border-blue-200",
    isActive: true,
  },
  {
    id: "tp3",
    title: "Beauty & Wellness",
    duration: "2 Months",
    eligibility: "Age 18-40",
    certification: "Beauty & Wellness Sector Council",
    description:
      "Professional beauty therapy, skincare, hair styling and salon management training.",
    outcomes: ["Salon setup skills", "Client management", "Product knowledge"],
    image: "/assets/generated/employment-success.dim_600x400.jpg",
    color: "bg-pink-50 border-pink-200",
    isActive: true,
  },
];

const initialCompanyProfile: CompanyProfile = {
  orgName: "DMVV Bhartiy Mahila Shakti Foundation™",
  description:
    "A leading NGO dedicated to empowering women through skill development, financial inclusion, and community support programs across India.",
  registrationNo: "UP/2015/NGO/4521",
  foundingYear: "2015",
  website: "https://dmvvfoundation.org",
};

const initialLeadership: LeadershipMember[] = [
  {
    id: "l1",
    name: "Smt. Priya Sharma",
    designation: "Executive Director",
    qualification: "M.A. Social Work, BHU",
    message:
      "Our mission is to ensure every woman in India has the opportunity to achieve financial independence and live with dignity.",
    photoUrl: "",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "l2",
    name: "Dr. Rekha Gupta",
    designation: "Program Director",
    qualification: "PhD Social Work, TISS Mumbai",
    message:
      "We believe in grassroots change — one woman at a time, one village at a time.",
    photoUrl: "",
    sortOrder: 2,
    isActive: true,
  },
];

const initialFoundationEvents: FoundationEvent[] = [
  {
    id: "fe1",
    title: "Annual Women Empowerment Summit 2025",
    description:
      "A landmark gathering of 500+ women entrepreneurs, policy makers, and NGO leaders.",
    eventDate: "2025-03-08",
    location: "Lucknow, Uttar Pradesh",
    imageUrl: "/assets/generated/awards-ceremony.dim_600x400.jpg",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "fe2",
    title: "Skill Development Mela - Varanasi",
    description:
      "Free skill training registration camp for rural women in and around Varanasi district.",
    eventDate: "2025-02-15",
    location: "Varanasi, Uttar Pradesh",
    imageUrl: "/assets/generated/training-tailoring.dim_600x400.jpg",
    isActive: true,
    sortOrder: 2,
  },
];

const initialComputerCenters: ComputerCenter[] = [
  {
    id: "cc1",
    name: "DMVV Digital Hub - Lucknow",
    address: "23 Alambagh, Lucknow",
    state: "Uttar Pradesh",
    district: "Lucknow",
    facilities: "30 computers, internet, printer, projector",
    contactPhone: "0522-3001234",
    imageUrl: "/assets/generated/training-computer-skills.dim_600x400.jpg",
    isActive: true,
  },
  {
    id: "cc2",
    name: "DMVV Digital Hub - Varanasi",
    address: "12 Lanka, Varanasi",
    state: "Uttar Pradesh",
    district: "Varanasi",
    facilities: "20 computers, internet, scanner",
    contactPhone: "0542-3001234",
    imageUrl: "/assets/generated/training-computer-skills.dim_600x400.jpg",
    isActive: true,
  },
];

const initialSchemes: SchemeItem[] = [
  {
    id: "s1",
    name: "Self Employment Revolution Scheme",
    ministry: "Ministry of Skill Development",
    description:
      "Comprehensive skill-to-employment program providing training, tools, and market linkage for rural women.",
    eligibility: [
      "Women aged 18-45",
      "Rural or semi-urban resident",
      "Class 5 minimum education",
      "BPL or low-income family",
    ],
    benefits: [
      "Free skill training",
      "Tool kit worth ₹15,000",
      "Market linkage support",
      "Monthly stipend during training",
    ],
    howToApply: "Apply through DMVV Foundation website or nearest center.",
    color: "border-orange-400",
    featured: true,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "s2",
    name: "Mahila Udyam Yojana",
    ministry: "Ministry of MSME",
    description: "Business development support for women entrepreneurs.",
    eligibility: [
      "Women entrepreneurs",
      "Existing or new business",
      "Age 18-50",
    ],
    benefits: [
      "Business training",
      "Seed capital assistance",
      "Mentorship",
      "Market access",
    ],
    howToApply: "Fill online application or visit any DMVV center.",
    color: "border-green-400",
    featured: false,
    isActive: true,
    sortOrder: 2,
  },
];

const initialLoanSchemes: LoanScheme[] = [
  {
    id: "ls1",
    name: "Mahila Udyam Loan",
    amount: "₹50,000 - ₹5,00,000",
    interest: "7% per annum",
    tenure: "1-5 years",
    description:
      "Business development loan for women entrepreneurs to start or expand their enterprise.",
    eligibility: [
      "Women aged 18-55",
      "Approved DMVV member",
      "Valid KYC documents",
      "Bank account mandatory",
    ],
    color: "border-green-400",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "ls2",
    name: "SHG Group Loan",
    amount: "₹1,00,000 - ₹10,00,000",
    interest: "6% per annum",
    tenure: "2-7 years",
    description:
      "Collective loan for Self Help Groups to fund group enterprises and activities.",
    eligibility: [
      "Registered SHG with DMVV",
      "Minimum 10 active members",
      "6 months group savings record",
      "Group KYC completed",
    ],
    color: "border-blue-400",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "ls3",
    name: "Emergency Micro Loan",
    amount: "₹5,000 - ₹50,000",
    interest: "8% per annum",
    tenure: "6 months - 2 years",
    description:
      "Quick disbursal micro loans for urgent financial needs of DMVV members.",
    eligibility: ["Active DMVV member", "No existing default", "Approved KYC"],
    color: "border-orange-400",
    isActive: true,
    sortOrder: 3,
  },
];

const initialEmploymentPartners: EmploymentPartner[] = [
  {
    id: "ep1",
    name: "Fabindia",
    sector: "Textile & Handicraft",
    openings: 50,
    description:
      "Sourcing handwoven textiles and crafts from DMVV artisan groups.",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "ep2",
    name: "BigBasket",
    sector: "Food Processing",
    openings: 30,
    description: "Procurement of organic produce and processed food items.",
    isActive: true,
    sortOrder: 2,
  },
];

const initialSuccessStories: SuccessStory[] = [
  {
    id: "ss1",
    name: "Kamla Devi",
    from: "Daily wage laborer, Sitapur",
    now: "Runs tailoring unit, 8 employees",
    income: "₹45,000/month",
    quote:
      "DMVV Foundation gave me the skills and confidence to build my own business. Today I employ 8 other women.",
    imageUrl: "/assets/generated/employment-success.dim_600x400.jpg",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "ss2",
    name: "Savita Singh",
    from: "School dropout, Varanasi",
    now: "Computer institute owner",
    income: "₹60,000/month",
    quote:
      "The digital literacy program changed my life. I now run a computer training center for 40 students.",
    imageUrl: "/assets/generated/training-computer-skills.dim_600x400.jpg",
    isActive: true,
    sortOrder: 2,
  },
];

const initialAwardCategories: AwardCategory[] = [
  {
    id: "ac1",
    name: "Best Entrepreneur",
    category: "Business",
    description: "Women who built successful businesses from scratch",
    icon: "🏆",
    color: "bg-yellow-50 border-yellow-400",
    isActive: true,
    sortOrder: 1,
    prize: "₹25,000 + Certificate",
  },
  {
    id: "ac2",
    name: "Community Leader",
    category: "Leadership",
    description: "Women who led community transformation initiatives",
    icon: "⭐",
    color: "bg-blue-50 border-blue-400",
    isActive: true,
    sortOrder: 2,
    prize: "₹15,000 + Certificate",
  },
];

const initialAwardWinners: AwardWinner[] = [
  {
    id: "aw1",
    name: "Meera Devi",
    district: "Lucknow",
    state: "UP",
    category: "Best Entrepreneur",
    achievement: "Built a ₹50L annual revenue handicraft export business",
    year: "2024",
    isActive: true,
  },
  {
    id: "aw2",
    name: "Sunita Tiwari",
    district: "Varanasi",
    state: "UP",
    category: "Community Leader",
    achievement: "Organized 200+ women into SHG groups in 3 villages",
    year: "2024",
    isActive: true,
  },
];

const _initialApplyFormSubmissions: ApplyFormSubmission[] = [];

const initialSliderImages: SliderImage[] = [
  {
    id: "slider1",
    imageUrl: "/assets/generated/hero-women-empowerment.dim_1400x700.jpg",
    title: "Empowering Women Across India",
    subtitle: "Building skills, livelihoods and dignity for every woman",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "slider2",
    imageUrl: "/assets/generated/hero-women-empowerment.dim_1400x700.jpg",
    title: "DMVV Bhartiy Mahila Shakti Foundation",
    subtitle: "Self Employment Revolution — Join Us Today",
    isActive: true,
    sortOrder: 2,
  },
];
const initialHomeHero: HomeHeroContent = {
  heading: "Empowering Women, Building India",
  subheading:
    "DMVV Bhartiy Mahila Shakti Foundation — Providing skills, loans, and support to women across India since 2015.",
  primaryBtnText: "Join Us Today",
  secondaryBtnText: "Learn More",
};

const initialHomeStats: HomeStat[] = [
  {
    id: "hs1",
    number: "50,000+",
    label: "Women Trained",
    iconName: "Users",
    color: "text-green-600",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "hs2",
    number: "₹35 Cr+",
    label: "Loans Disbursed",
    iconName: "IndianRupee",
    color: "text-orange-500",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "hs3",
    number: "8 States",
    label: "Operational",
    iconName: "MapPin",
    color: "text-blue-600",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "hs4",
    number: "200+",
    label: "Centers",
    iconName: "Building2",
    color: "text-purple-600",
    isActive: true,
    sortOrder: 4,
  },
];

const initialHomeInitiatives: HomeInitiative[] = [
  {
    id: "hi1",
    label: "Skill Development",
    iconName: "GraduationCap",
    color: "bg-green-100 text-green-700",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "hi2",
    label: "Micro Finance",
    iconName: "IndianRupee",
    color: "bg-orange-100 text-orange-700",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "hi3",
    label: "Community Centers",
    iconName: "Building2",
    color: "bg-blue-100 text-blue-700",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "hi4",
    label: "Health & Wellness",
    iconName: "Heart",
    color: "bg-pink-100 text-pink-700",
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "hi5",
    label: "Legal Aid",
    iconName: "Scale",
    color: "bg-purple-100 text-purple-700",
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "hi6",
    label: "Transport Support",
    iconName: "Bus",
    color: "bg-yellow-100 text-yellow-700",
    isActive: true,
    sortOrder: 6,
  },
];

const initialHomeImpactStories: HomeImpactStory[] = [
  {
    id: "his1",
    title: "Tailoring Success",
    subtitle: "500+ women trained in Lucknow",
    imageUrl: "/assets/generated/training-tailoring.dim_600x400.jpg",
    bgColor: "bg-green-600",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "his2",
    title: "Digital Revolution",
    subtitle: "Computer literacy in rural UP",
    imageUrl: "/assets/generated/training-computer-skills.dim_600x400.jpg",
    bgColor: "bg-blue-600",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "his3",
    title: "Entrepreneurs Rise",
    subtitle: "1,200 businesses launched",
    imageUrl: "/assets/generated/employment-success.dim_600x400.jpg",
    bgColor: "bg-orange-600",
    isActive: true,
    sortOrder: 3,
  },
];

const initialHomeCTA: HomeCTAContent = {
  heading: "Ready to Transform Your Life?",
  subtext:
    "Join 50,000+ women who have already changed their lives through DMVV Foundation programs.",
  primaryBtnText: "Register Now - Free",
  secondaryBtnText: "Talk to Us",
};

const initialCommunityCenters: CommunityCenter[] = [
  {
    id: "cm1",
    name: "Lucknow Community Hub",
    address: "45 Rajajipuram, Lucknow",
    state: "Uttar Pradesh",
    district: "Lucknow",
    services: "Skill training, legal aid, health camps, SHG meetings",
    contactPhone: "0522-5001234",
    imageUrl: "/assets/generated/community-center.dim_600x400.jpg",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "cm2",
    name: "Varanasi Community Hub",
    address: "22 Orderly Bazar, Varanasi",
    state: "Uttar Pradesh",
    district: "Varanasi",
    services: "Skill training, counseling, microfinance, self-defense",
    contactPhone: "0542-5001234",
    imageUrl: "/assets/generated/community-center.dim_600x400.jpg",
    isActive: true,
    sortOrder: 2,
  },
];

const initialTransportInfo: TransportInfo[] = [
  {
    id: "t1",
    vehicleType: "Mini Bus (20 seater)",
    routeFrom: "Hazratganj",
    routeTo: "DMVV Center Lucknow",
    capacity: 20,
    contactPhone: "9876500001",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "t2",
    vehicleType: "Tempo Traveller (12 seater)",
    routeFrom: "Gomti Nagar",
    routeTo: "DMVV Center Lucknow",
    capacity: 12,
    contactPhone: "9876500002",
    isActive: true,
    sortOrder: 2,
  },
];

const initialDownloadItems: DownloadItem[] = [
  {
    id: "d1",
    title: "Annual Report 2024-25",
    description: "Complete annual report with financials and program outcomes",
    fileUrl: "#",
    fileType: "PDF",
    fileSize: "4.2 MB",
    category: "Annual Reports",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "d2",
    title: "Member Registration Form",
    description: "Offline registration form for new member enrollment",
    fileUrl: "#",
    fileType: "PDF",
    fileSize: "256 KB",
    category: "Forms",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "d3",
    title: "SHG Formation Guidelines",
    description: "Step-by-step guide to forming a Self Help Group",
    fileUrl: "#",
    fileType: "PDF",
    fileSize: "1.1 MB",
    category: "Guidelines",
    isActive: true,
    sortOrder: 3,
  },
];

// ─── New initial data ─────────────────────────────────────────────────────────

const initialProducts: Product[] = [
  {
    id: "pr1",
    name: "Handcrafted Salwar Kameez",
    description:
      "Beautifully hand-stitched salwar kameez made by DMVV artisans. Available in multiple sizes and colors.",
    price: "850",
    category: "Clothing",
    imageUrl: "",
    centerName: "Lucknow Main Center",
    centerId: "c1",
    stock: 25,
    isActive: true,
  },
  {
    id: "pr2",
    name: "Embroidered Dupatta",
    description:
      "Exquisite hand-embroidered dupatta with traditional Chikankari work from Lucknow artisans.",
    price: "450",
    category: "Clothing",
    imageUrl: "",
    centerName: "Lucknow Main Center",
    centerId: "c1",
    stock: 40,
    isActive: true,
  },
  {
    id: "pr3",
    name: "Handicraft Shoulder Bag",
    description:
      "Stylish handwoven shoulder bag made from sustainable cotton fabric by rural women artisans.",
    price: "320",
    category: "Accessories",
    imageUrl: "",
    centerName: "Varanasi Center",
    centerId: "c2",
    stock: 15,
    isActive: true,
  },
  {
    id: "pr4",
    name: "Jute Basket (Set of 3)",
    description:
      "Eco-friendly jute baskets handmade by DMVV artisans. Perfect for home décor and storage.",
    price: "280",
    category: "Home Décor",
    imageUrl: "",
    centerName: "Varanasi Center",
    centerId: "c2",
    stock: 30,
    isActive: true,
  },
];

const initialInsuranceSchemes: InsuranceScheme[] = [
  {
    id: "ins1",
    name: "Pradhan Mantri Jeevan Jyoti Bima Yojana",
    type: "life",
    description:
      "Government-backed life insurance scheme providing ₹2 lakh coverage at very affordable premium.",
    premium: "₹436/year",
    coverage: "₹2,00,000",
    tenure: "1 year (renewable)",
    eligibility: ["Age 18-50", "Bank account holder", "Active DMVV member"],
    isActive: true,
  },
  {
    id: "ins2",
    name: "Pradhan Mantri Suraksha Bima Yojana",
    type: "accident",
    description:
      "Accidental death and disability insurance at just ₹20 per year. Maximum coverage ₹2 lakh.",
    premium: "₹20/year",
    coverage: "₹2,00,000",
    tenure: "1 year (renewable)",
    eligibility: ["Age 18-70", "Bank account holder"],
    isActive: true,
  },
  {
    id: "ins3",
    name: "Pradhan Mantri Fasal Bima Yojana",
    type: "crop",
    description:
      "Crop insurance scheme for women farmers to protect against natural calamities and crop failure.",
    premium: "2% of sum insured (Kharif)",
    coverage: "Up to ₹2,00,000",
    tenure: "Per season",
    eligibility: [
      "Women farmers",
      "Land ownership or tenancy",
      "Aadhaar linked bank account",
    ],
    isActive: true,
  },
];

const initialUtilityServices: UtilityService[] = [
  {
    id: "us1",
    name: "Electricity Bill Payment",
    description:
      "Pay your UPPCL electricity bill through DMVV centers. No extra charges.",
    type: "electricity",
    contactNumber: "1800-180-5025",
    isActive: true,
  },
  {
    id: "us2",
    name: "Water Bill Payment",
    description:
      "Jal Nigam water bill payment facility available at all DMVV community centers.",
    type: "water",
    contactNumber: "0522-2610503",
    isActive: true,
  },
  {
    id: "us3",
    name: "LPG Gas Booking",
    description:
      "Book Indane/HP/Bharat gas cylinder through DMVV centers with home delivery support.",
    type: "gas",
    contactNumber: "7718955555",
    isActive: true,
  },
];

// ─── New Management Initial Data ─────────────────────────────────────────────

const initialMemberRecords: MemberRecord[] = [
  {
    id: "mr1",
    centerId: "c1",
    fullName: "Geeta Rani",
    mobile: "9876501111",
    role: "Tailor",
    salaryGrade: "A",
    joiningDate: "2025-06-01",
    status: "active",
    address: "45 Rajajipuram, Lucknow",
  },
  {
    id: "mr2",
    centerId: "c1",
    fullName: "Sunita Kumari",
    mobile: "9876502222",
    role: "Embroider",
    salaryGrade: "B",
    joiningDate: "2025-07-15",
    status: "active",
    address: "12 Alambagh, Lucknow",
  },
  {
    id: "mr3",
    centerId: "c1",
    fullName: "Asha Devi",
    mobile: "9876503333",
    role: "Computer Operator",
    salaryGrade: "B",
    joiningDate: "2025-08-01",
    status: "active",
    address: "77 Indira Nagar, Lucknow",
  },
  {
    id: "mr4",
    centerId: "c2",
    fullName: "Meena Singh",
    mobile: "9876504444",
    role: "Weaver",
    salaryGrade: "C",
    joiningDate: "2025-09-10",
    status: "active",
    address: "34 Lanka, Varanasi",
  },
  {
    id: "mr5",
    centerId: "c2",
    fullName: "Pooja Gupta",
    mobile: "9876505555",
    role: "Beauty Expert",
    salaryGrade: "A",
    joiningDate: "2025-10-05",
    status: "inactive",
    address: "89 Sigra, Varanasi",
  },
];

const initialAttendanceRecords: AttendanceRecord[] = [
  {
    id: "ar1",
    memberId: "mr1",
    memberName: "Geeta Rani",
    centerId: "c1",
    date: "2026-04-01",
    present: true,
  },
  {
    id: "ar2",
    memberId: "mr2",
    memberName: "Sunita Kumari",
    centerId: "c1",
    date: "2026-04-01",
    present: true,
  },
  {
    id: "ar3",
    memberId: "mr3",
    memberName: "Asha Devi",
    centerId: "c1",
    date: "2026-04-01",
    present: false,
  },
  {
    id: "ar4",
    memberId: "mr4",
    memberName: "Meena Singh",
    centerId: "c2",
    date: "2026-04-01",
    present: true,
  },
  {
    id: "ar5",
    memberId: "mr5",
    memberName: "Pooja Gupta",
    centerId: "c2",
    date: "2026-04-01",
    present: false,
  },
  {
    id: "ar6",
    memberId: "mr1",
    memberName: "Geeta Rani",
    centerId: "c1",
    date: "2026-04-02",
    present: true,
  },
  {
    id: "ar7",
    memberId: "mr2",
    memberName: "Sunita Kumari",
    centerId: "c1",
    date: "2026-04-02",
    present: false,
  },
  {
    id: "ar8",
    memberId: "mr3",
    memberName: "Asha Devi",
    centerId: "c1",
    date: "2026-04-02",
    present: true,
  },
  {
    id: "ar9",
    memberId: "mr4",
    memberName: "Meena Singh",
    centerId: "c2",
    date: "2026-04-02",
    present: true,
  },
  {
    id: "ar10",
    memberId: "mr5",
    memberName: "Pooja Gupta",
    centerId: "c2",
    date: "2026-04-02",
    present: false,
  },
];

const initialPayrollRecords: PayrollRecord[] = [
  {
    id: "pay1",
    userId: "u3",
    staffName: "Rahul Verma",
    staffDesignation: "Center Manager",
    month: "2026-03",
    basicSalary: 12000,
    hra: 2400,
    da: 1200,
    ta: 500,
    medical: 300,
    bonus: 0,
    grossSalary: 16400,
    pfDeduction: 1440,
    esiDeduction: 123,
    tdsDeduction: 0,
    advanceDeduction: 0,
    totalDeductions: 1563,
    netSalary: 14837,
    status: "paid",
    generatedAt: "2026-03-31",
    paidAt: "2026-04-01",
  },
  {
    id: "pay2",
    userId: "u2",
    staffName: "Priya Sharma",
    staffDesignation: "Field Executive",
    month: "2026-03",
    basicSalary: 8000,
    hra: 1600,
    da: 800,
    ta: 500,
    medical: 300,
    bonus: 0,
    grossSalary: 11200,
    pfDeduction: 960,
    esiDeduction: 84,
    tdsDeduction: 0,
    advanceDeduction: 0,
    totalDeductions: 1044,
    netSalary: 10156,
    status: "approved",
    generatedAt: "2026-03-31",
  },
  {
    id: "pay3",
    userId: "u4",
    staffName: "Sunita Devi",
    staffDesignation: "Supervisor",
    month: "2026-03",
    basicSalary: 15000,
    hra: 3000,
    da: 1500,
    ta: 500,
    medical: 300,
    bonus: 500,
    grossSalary: 20800,
    pfDeduction: 1800,
    esiDeduction: 156,
    tdsDeduction: 0,
    advanceDeduction: 0,
    totalDeductions: 1956,
    netSalary: 18844,
    status: "pending",
    generatedAt: "2026-03-31",
  },
];

const initialLeaveRequests: LeaveRequest[] = [
  {
    id: "lr1",
    userId: "u2",
    userName: "Priya Sharma",
    leaveType: "casual",
    fromDate: "2026-04-05",
    toDate: "2026-04-06",
    days: 2,
    reason: "Personal family function",
    status: "approved",
    appliedAt: "2026-04-03",
    hrRemark: "Approved",
  },
  {
    id: "lr2",
    userId: "u3",
    userName: "Rahul Verma",
    leaveType: "sick",
    fromDate: "2026-04-08",
    toDate: "2026-04-09",
    days: 2,
    reason: "Medical treatment",
    status: "pending",
    appliedAt: "2026-04-07",
  },
  {
    id: "lr3",
    userId: "u4",
    userName: "Sunita Devi",
    leaveType: "earned",
    fromDate: "2026-04-15",
    toDate: "2026-04-17",
    days: 3,
    reason: "Annual vacation",
    status: "pending",
    appliedAt: "2026-04-10",
  },
];

const initialSupervisorReports: SupervisorReport[] = [
  {
    id: "sr1",
    supervisorId: "u4",
    supervisorName: "Sunita Devi",
    centerId: "c1",
    centerName: "Lucknow Main Center",
    reportType: "daily",
    date: "2026-04-03",
    membersPresent: 22,
    production: 150,
    issues: "Machine M-003 needs repair",
    remarks: "Production on track. Quality check passed.",
    submittedAt: "2026-04-03T17:30:00",
  },
  {
    id: "sr2",
    supervisorId: "u4",
    supervisorName: "Sunita Devi",
    centerId: "c2",
    centerName: "Varanasi Center",
    reportType: "weekly",
    date: "2026-03-31",
    membersPresent: 18,
    production: 720,
    issues: "None",
    remarks: "Excellent week. Exceeded targets by 12%.",
    submittedAt: "2026-03-31T18:00:00",
  },
];

const initialProductionEntries: ProductionEntry[] = [
  {
    id: "pe1",
    centerId: "c1",
    memberId: "mr1",
    memberName: "Geeta Rani",
    productName: "Salwar Kameez",
    unitsProduced: 8,
    qualityCheck: "pass",
    date: "2026-04-01",
  },
  {
    id: "pe2",
    centerId: "c1",
    memberId: "mr2",
    memberName: "Sunita Kumari",
    productName: "Embroidered Dupatta",
    unitsProduced: 12,
    qualityCheck: "pass",
    date: "2026-04-01",
  },
  {
    id: "pe3",
    centerId: "c1",
    memberId: "mr3",
    memberName: "Asha Devi",
    productName: "Kurta Set",
    unitsProduced: 6,
    qualityCheck: "pending",
    date: "2026-04-02",
  },
  {
    id: "pe4",
    centerId: "c2",
    memberId: "mr4",
    memberName: "Meena Singh",
    productName: "Handloom Saree",
    unitsProduced: 3,
    qualityCheck: "pass",
    date: "2026-04-02",
  },
  {
    id: "pe5",
    centerId: "c2",
    memberId: "mr4",
    memberName: "Meena Singh",
    productName: "Jute Bag",
    unitsProduced: 20,
    qualityCheck: "fail",
    date: "2026-04-03",
    remarks: "Stitching quality issue",
  },
];

const initialMachineRecords: MachineRecord[] = [
  {
    id: "mch1",
    centerId: "c1",
    machineId: "M-001",
    machineName: "Singer Sewing Machine",
    machineType: "Sewing",
    status: "working",
    lastMaintenance: "2026-03-15",
    nextMaintenance: "2026-06-15",
    assignedTo: "Geeta Rani",
  },
  {
    id: "mch2",
    centerId: "c1",
    machineId: "M-002",
    machineName: "Juki Overlock",
    machineType: "Overlock",
    status: "working",
    lastMaintenance: "2026-03-10",
    nextMaintenance: "2026-06-10",
    assignedTo: "Sunita Kumari",
  },
  {
    id: "mch3",
    centerId: "c1",
    machineId: "M-003",
    machineName: "Button Stitch Machine",
    machineType: "Button",
    status: "repair",
    lastMaintenance: "2026-02-28",
    nextMaintenance: "2026-03-28",
    remarks: "Needle assembly broken",
  },
  {
    id: "mch4",
    centerId: "c2",
    machineId: "M-004",
    machineName: "Handloom Frame",
    machineType: "Weaving",
    status: "working",
    lastMaintenance: "2026-03-01",
    nextMaintenance: "2026-06-01",
    assignedTo: "Meena Singh",
  },
];

// ─── Context Type ─────────────────────────────────────────────────────────────

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
  sliderImages: SliderImage[];
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
  // New state
  loanApplications: LoanApplication[];
  incomeSources: IncomeSource[];
  trainingEnrollments: TrainingEnrollment[];
  volunteerActivities: VolunteerActivity[];
  products: Product[];
  orders: Order[];
  insuranceSchemes: InsuranceScheme[];
  insuranceApplications: InsuranceApplication[];
  walletTransactions: WalletTransaction[];
  utilityServices: UtilityService[];
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
  addSliderImage: (img: SliderImage) => void;
  updateSliderImage: (id: string, updates: Partial<SliderImage>) => void;
  deleteSliderImage: (id: string) => void;
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
  // New actions
  addLoanApplication: (a: LoanApplication) => void;
  updateLoanApplication: (
    id: string,
    updates: Partial<LoanApplication>,
  ) => void;
  addIncomeSource: (s: IncomeSource) => void;
  deleteIncomeSource: (id: string) => void;
  addTrainingEnrollment: (e: TrainingEnrollment) => void;
  updateTrainingEnrollment: (
    id: string,
    updates: Partial<TrainingEnrollment>,
  ) => void;
  addVolunteerActivity: (v: VolunteerActivity) => void;
  updateVolunteerActivity: (
    id: string,
    updates: Partial<VolunteerActivity>,
  ) => void;
  addProduct: (p: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (o: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  addInsuranceScheme: (s: InsuranceScheme) => void;
  updateInsuranceScheme: (
    id: string,
    updates: Partial<InsuranceScheme>,
  ) => void;
  deleteInsuranceScheme: (id: string) => void;
  addInsuranceApplication: (a: InsuranceApplication) => void;
  updateInsuranceApplication: (
    id: string,
    updates: Partial<InsuranceApplication>,
  ) => void;
  addWalletTransaction: (t: WalletTransaction) => void;
  updateUtilityService: (id: string, updates: Partial<UtilityService>) => void;
  // Management collections
  memberRecords: MemberRecord[];
  attendanceRecords: AttendanceRecord[];
  payrollRecords: PayrollRecord[];
  leaveRequests: LeaveRequest[];
  supervisorReports: SupervisorReport[];
  productionEntries: ProductionEntry[];
  machineRecords: MachineRecord[];
  addMemberRecord: (m: MemberRecord) => void;
  updateMemberRecord: (id: string, updates: Partial<MemberRecord>) => void;
  deleteMemberRecord: (id: string) => void;
  addAttendanceRecord: (a: AttendanceRecord) => void;
  updateAttendanceRecord: (
    id: string,
    updates: Partial<AttendanceRecord>,
  ) => void;
  addPayrollRecord: (p: PayrollRecord) => void;
  updatePayrollRecord: (id: string, updates: Partial<PayrollRecord>) => void;
  deletePayrollRecord: (id: string) => void;
  addLeaveRequest: (l: LeaveRequest) => void;
  updateLeaveRequest: (id: string, updates: Partial<LeaveRequest>) => void;
  addSupervisorReport: (r: SupervisorReport) => void;
  addProductionEntry: (p: ProductionEntry) => void;
  updateProductionEntry: (
    id: string,
    updates: Partial<ProductionEntry>,
  ) => void;
  addMachineRecord: (m: MachineRecord) => void;
  updateMachineRecord: (id: string, updates: Partial<MachineRecord>) => void;
  deleteMachineRecord: (id: string) => void;
  // Reviews
  reviews: Review[];
  addReview: (r: Review) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  // Home Cards
  homeCards: HomeCard[];
  addHomeCard: (c: HomeCard) => void;
  updateHomeCard: (id: string, updates: Partial<HomeCard>) => void;
  deleteHomeCard: (id: string) => void;
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
  >("dmvv_applyFormSubmissions", []);
  const [homeHero, setHomeHero] = useLocalStorage<HomeHeroContent>(
    "dmvv_homeHero",
    initialHomeHero,
  );
  const [sliderImages, setSliderImages] = useLocalStorage<SliderImage[]>(
    "dmvv_sliderImages",
    initialSliderImages,
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
  // New state
  const [loanApplications, setLoanApplications] = useLocalStorage<
    LoanApplication[]
  >("dmvv_loanApplications", []);
  const [incomeSources, setIncomeSources] = useLocalStorage<IncomeSource[]>(
    "dmvv_incomeSources",
    [],
  );
  const [trainingEnrollments, setTrainingEnrollments] = useLocalStorage<
    TrainingEnrollment[]
  >("dmvv_trainingEnrollments", []);
  const [volunteerActivities, setVolunteerActivities] = useLocalStorage<
    VolunteerActivity[]
  >("dmvv_volunteerActivities", []);
  const [products, setProducts] = useLocalStorage<Product[]>(
    "dmvv_products",
    initialProducts,
  );
  const [orders, setOrders] = useLocalStorage<Order[]>("dmvv_orders", []);
  const [insuranceSchemes, setInsuranceSchemes] = useLocalStorage<
    InsuranceScheme[]
  >("dmvv_insuranceSchemes", initialInsuranceSchemes);
  const [insuranceApplications, setInsuranceApplications] = useLocalStorage<
    InsuranceApplication[]
  >("dmvv_insuranceApplications", []);
  const [walletTransactions, setWalletTransactions] = useLocalStorage<
    WalletTransaction[]
  >("dmvv_walletTransactions", []);
  const [utilityServices, setUtilityServices] = useLocalStorage<
    UtilityService[]
  >("dmvv_utilityServices", initialUtilityServices);

  // ─── Management State ────────────────────────────────────────────────────────
  const [memberRecords, setMemberRecords] = useLocalStorage<MemberRecord[]>(
    "dmvv_memberRecords",
    initialMemberRecords,
  );
  const [attendanceRecords, setAttendanceRecords] = useLocalStorage<
    AttendanceRecord[]
  >("dmvv_attendanceRecords", initialAttendanceRecords);
  const [payrollRecords, setPayrollRecords] = useLocalStorage<PayrollRecord[]>(
    "dmvv_payrollRecords",
    initialPayrollRecords,
  );
  const [leaveRequests, setLeaveRequests] = useLocalStorage<LeaveRequest[]>(
    "dmvv_leaveRequests",
    initialLeaveRequests,
  );
  const [supervisorReports, setSupervisorReports] = useLocalStorage<
    SupervisorReport[]
  >("dmvv_supervisorReports", initialSupervisorReports);
  const [productionEntries, setProductionEntries] = useLocalStorage<
    ProductionEntry[]
  >("dmvv_productionEntries", initialProductionEntries);
  const [machineRecords, setMachineRecords] = useLocalStorage<MachineRecord[]>(
    "dmvv_machineRecords",
    initialMachineRecords,
  );
  const [reviews, setReviews] = useLocalStorage<Review[]>(
    "dmvv_reviews",
    initialReviews,
  );
  const [homeCards, setHomeCards] = useLocalStorage<HomeCard[]>(
    "dmvv_homeCards",
    initialHomeCards,
  );

  // ─── Backend Sync ────────────────────────────────────────────────────────────
  // On mount: load all content from backend canister (server-side persistent storage)
  // so that ALL users see the admin's latest updates, not just local device state.
  const backendLoadedRef = useRef(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: setters are stable; mount-only init
  useEffect(() => {
    if (backendLoadedRef.current) return;
    backendLoadedRef.current = true;
    initializeFromBackend().then((data) => {
      if (data.dmvv_users) setUsers(data.dmvv_users as User[]);
      if (data.dmvv_kycs) setKycs(data.dmvv_kycs as KYC[]);
      if (data.dmvv_centers) setCenters(data.dmvv_centers as Center[]);
      if (data.dmvv_news) setNews(data.dmvv_news as NewsItem[]);
      if (data.dmvv_settings) setSettings(data.dmvv_settings as SiteSettings);
      if (data.dmvv_pages) setPages(data.dmvv_pages as PageContent[]);
      if (data.dmvv_media) setMedia(data.dmvv_media as MediaFile[]);
      if (data.dmvv_galleryItems)
        setGalleryItems(data.dmvv_galleryItems as GalleryItem[]);
      if (data.dmvv_trainingPrograms)
        setTrainingPrograms(data.dmvv_trainingPrograms as TrainingProgram[]);
      if (data.dmvv_companyProfile)
        setCompanyProfile(data.dmvv_companyProfile as CompanyProfile);
      if (data.dmvv_leadership)
        setLeadership(data.dmvv_leadership as LeadershipMember[]);
      if (data.dmvv_foundationEvents)
        setFoundationEvents(data.dmvv_foundationEvents as FoundationEvent[]);
      if (data.dmvv_computerCenters)
        setComputerCenters(data.dmvv_computerCenters as ComputerCenter[]);
      if (data.dmvv_schemes) setSchemes(data.dmvv_schemes as SchemeItem[]);
      if (data.dmvv_loanSchemes)
        setLoanSchemes(data.dmvv_loanSchemes as LoanScheme[]);
      if (data.dmvv_employmentPartners)
        setEmploymentPartners(
          data.dmvv_employmentPartners as EmploymentPartner[],
        );
      if (data.dmvv_successStories)
        setSuccessStories(data.dmvv_successStories as SuccessStory[]);
      if (data.dmvv_awardCategories)
        setAwardCategories(data.dmvv_awardCategories as AwardCategory[]);
      if (data.dmvv_awardWinners)
        setAwardWinners(data.dmvv_awardWinners as AwardWinner[]);
      if (data.dmvv_applyFormSubmissions)
        setApplyFormSubmissions(
          data.dmvv_applyFormSubmissions as ApplyFormSubmission[],
        );
      if (data.dmvv_homeHero)
        setHomeHero(data.dmvv_homeHero as HomeHeroContent);
      if (data.dmvv_sliderImages)
        setSliderImages(data.dmvv_sliderImages as SliderImage[]);
      if (data.dmvv_homeStats) setHomeStats(data.dmvv_homeStats as HomeStat[]);
      if (data.dmvv_homeInitiatives)
        setHomeInitiatives(data.dmvv_homeInitiatives as HomeInitiative[]);
      if (data.dmvv_homeImpactStories)
        setHomeImpactStories(data.dmvv_homeImpactStories as HomeImpactStory[]);
      if (data.dmvv_homeCTA) setHomeCTA(data.dmvv_homeCTA as HomeCTAContent);
      if (data.dmvv_communityCenters)
        setCommunityCenters(data.dmvv_communityCenters as CommunityCenter[]);
      if (data.dmvv_transportInfo)
        setTransportInfo(data.dmvv_transportInfo as TransportInfo[]);
      if (data.dmvv_downloadItems)
        setDownloadItems(data.dmvv_downloadItems as DownloadItem[]);
      if (data.dmvv_legalDocuments)
        setLegalDocuments(data.dmvv_legalDocuments as LegalDocument[]);
      if (data.dmvv_wishesLetters)
        setWishesLetters(data.dmvv_wishesLetters as WishesLetter[]);
      if (data.dmvv_youtubeVideos)
        setYouTubeVideos(data.dmvv_youtubeVideos as YouTubeVideo[]);
      if (data.dmvv_teamMembers)
        setTeamMembers(data.dmvv_teamMembers as TeamMember[]);
      if (data.dmvv_partners) setPartners(data.dmvv_partners as Partner[]);
      if (data.dmvv_complaints)
        setComplaintSubmissions(data.dmvv_complaints as ComplaintSubmission[]);
      if (data.dmvv_footerSettings)
        setFooterSettings(data.dmvv_footerSettings as FooterSettings);
      if (data.dmvv_loanApplications)
        setLoanApplications(data.dmvv_loanApplications as LoanApplication[]);
      if (data.dmvv_incomeSources)
        setIncomeSources(data.dmvv_incomeSources as IncomeSource[]);
      if (data.dmvv_trainingEnrollments)
        setTrainingEnrollments(
          data.dmvv_trainingEnrollments as TrainingEnrollment[],
        );
      if (data.dmvv_volunteerActivities)
        setVolunteerActivities(
          data.dmvv_volunteerActivities as VolunteerActivity[],
        );
      if (data.dmvv_products) setProducts(data.dmvv_products as Product[]);
      if (data.dmvv_orders) setOrders(data.dmvv_orders as Order[]);
      if (data.dmvv_insuranceSchemes)
        setInsuranceSchemes(data.dmvv_insuranceSchemes as InsuranceScheme[]);
      if (data.dmvv_insuranceApplications)
        setInsuranceApplications(
          data.dmvv_insuranceApplications as InsuranceApplication[],
        );
      if (data.dmvv_walletTransactions)
        setWalletTransactions(
          data.dmvv_walletTransactions as WalletTransaction[],
        );
      if (data.dmvv_utilityServices)
        setUtilityServices(data.dmvv_utilityServices as UtilityService[]);
      if (data.dmvv_memberRecords)
        setMemberRecords(data.dmvv_memberRecords as MemberRecord[]);
      if (data.dmvv_attendanceRecords)
        setAttendanceRecords(data.dmvv_attendanceRecords as AttendanceRecord[]);
      if (data.dmvv_payrollRecords)
        setPayrollRecords(data.dmvv_payrollRecords as PayrollRecord[]);
      if (data.dmvv_leaveRequests)
        setLeaveRequests(data.dmvv_leaveRequests as LeaveRequest[]);
      if (data.dmvv_supervisorReports)
        setSupervisorReports(data.dmvv_supervisorReports as SupervisorReport[]);
      if (data.dmvv_productionEntries)
        setProductionEntries(data.dmvv_productionEntries as ProductionEntry[]);
      if (data.dmvv_machineRecords)
        setMachineRecords(data.dmvv_machineRecords as MachineRecord[]);
      if (data.dmvv_reviews) setReviews(data.dmvv_reviews as Review[]);
      if (data.dmvv_homeCards) setHomeCards(data.dmvv_homeCards as HomeCard[]);
    });
  }, []);

  // On every state change: persist to backend so all users see latest data
  useEffect(() => {
    saveToBackend("dmvv_users", users);
  }, [users]);
  useEffect(() => {
    saveToBackend("dmvv_kycs", kycs);
  }, [kycs]);
  useEffect(() => {
    saveToBackend("dmvv_centers", centers);
  }, [centers]);
  useEffect(() => {
    saveToBackend("dmvv_news", news);
  }, [news]);
  useEffect(() => {
    saveToBackend("dmvv_settings", settings);
  }, [settings]);
  useEffect(() => {
    saveToBackend("dmvv_pages", pages);
  }, [pages]);
  useEffect(() => {
    saveToBackend("dmvv_media", media);
  }, [media]);
  useEffect(() => {
    saveToBackend("dmvv_galleryItems", galleryItems);
  }, [galleryItems]);
  useEffect(() => {
    saveToBackend("dmvv_trainingPrograms", trainingPrograms);
  }, [trainingPrograms]);
  useEffect(() => {
    saveToBackend("dmvv_companyProfile", companyProfile);
  }, [companyProfile]);
  useEffect(() => {
    saveToBackend("dmvv_leadership", leadership);
  }, [leadership]);
  useEffect(() => {
    saveToBackend("dmvv_foundationEvents", foundationEvents);
  }, [foundationEvents]);
  useEffect(() => {
    saveToBackend("dmvv_computerCenters", computerCenters);
  }, [computerCenters]);
  useEffect(() => {
    saveToBackend("dmvv_schemes", schemes);
  }, [schemes]);
  useEffect(() => {
    saveToBackend("dmvv_loanSchemes", loanSchemes);
  }, [loanSchemes]);
  useEffect(() => {
    saveToBackend("dmvv_employmentPartners", employmentPartners);
  }, [employmentPartners]);
  useEffect(() => {
    saveToBackend("dmvv_successStories", successStories);
  }, [successStories]);
  useEffect(() => {
    saveToBackend("dmvv_awardCategories", awardCategories);
  }, [awardCategories]);
  useEffect(() => {
    saveToBackend("dmvv_awardWinners", awardWinners);
  }, [awardWinners]);
  useEffect(() => {
    saveToBackend("dmvv_applyFormSubmissions", applyFormSubmissions);
  }, [applyFormSubmissions]);
  useEffect(() => {
    saveToBackend("dmvv_homeHero", homeHero);
  }, [homeHero]);
  useEffect(() => {
    saveToBackend("dmvv_sliderImages", sliderImages);
  }, [sliderImages]);
  useEffect(() => {
    saveToBackend("dmvv_homeStats", homeStats);
  }, [homeStats]);
  useEffect(() => {
    saveToBackend("dmvv_homeInitiatives", homeInitiatives);
  }, [homeInitiatives]);
  useEffect(() => {
    saveToBackend("dmvv_homeImpactStories", homeImpactStories);
  }, [homeImpactStories]);
  useEffect(() => {
    saveToBackend("dmvv_homeCTA", homeCTA);
  }, [homeCTA]);
  useEffect(() => {
    saveToBackend("dmvv_communityCenters", communityCenters);
  }, [communityCenters]);
  useEffect(() => {
    saveToBackend("dmvv_transportInfo", transportInfo);
  }, [transportInfo]);
  useEffect(() => {
    saveToBackend("dmvv_downloadItems", downloadItems);
  }, [downloadItems]);
  useEffect(() => {
    saveToBackend("dmvv_legalDocuments", legalDocuments);
  }, [legalDocuments]);
  useEffect(() => {
    saveToBackend("dmvv_wishesLetters", wishesLetters);
  }, [wishesLetters]);
  useEffect(() => {
    saveToBackend("dmvv_youtubeVideos", youtubeVideos);
  }, [youtubeVideos]);
  useEffect(() => {
    saveToBackend("dmvv_teamMembers", teamMembers);
  }, [teamMembers]);
  useEffect(() => {
    saveToBackend("dmvv_partners", partners);
  }, [partners]);
  useEffect(() => {
    saveToBackend("dmvv_complaints", complaintSubmissions);
  }, [complaintSubmissions]);
  useEffect(() => {
    saveToBackend("dmvv_footerSettings", footerSettings);
  }, [footerSettings]);
  useEffect(() => {
    saveToBackend("dmvv_loanApplications", loanApplications);
  }, [loanApplications]);
  useEffect(() => {
    saveToBackend("dmvv_incomeSources", incomeSources);
  }, [incomeSources]);
  useEffect(() => {
    saveToBackend("dmvv_trainingEnrollments", trainingEnrollments);
  }, [trainingEnrollments]);
  useEffect(() => {
    saveToBackend("dmvv_volunteerActivities", volunteerActivities);
  }, [volunteerActivities]);
  useEffect(() => {
    saveToBackend("dmvv_products", products);
  }, [products]);
  useEffect(() => {
    saveToBackend("dmvv_orders", orders);
  }, [orders]);
  useEffect(() => {
    saveToBackend("dmvv_insuranceSchemes", insuranceSchemes);
  }, [insuranceSchemes]);
  useEffect(() => {
    saveToBackend("dmvv_insuranceApplications", insuranceApplications);
  }, [insuranceApplications]);
  useEffect(() => {
    saveToBackend("dmvv_walletTransactions", walletTransactions);
  }, [walletTransactions]);
  useEffect(() => {
    saveToBackend("dmvv_utilityServices", utilityServices);
  }, [utilityServices]);
  useEffect(() => {
    saveToBackend("dmvv_memberRecords", memberRecords);
  }, [memberRecords]);
  useEffect(() => {
    saveToBackend("dmvv_attendanceRecords", attendanceRecords);
  }, [attendanceRecords]);
  useEffect(() => {
    saveToBackend("dmvv_payrollRecords", payrollRecords);
  }, [payrollRecords]);
  useEffect(() => {
    saveToBackend("dmvv_leaveRequests", leaveRequests);
  }, [leaveRequests]);
  useEffect(() => {
    saveToBackend("dmvv_supervisorReports", supervisorReports);
  }, [supervisorReports]);
  useEffect(() => {
    saveToBackend("dmvv_productionEntries", productionEntries);
  }, [productionEntries]);
  useEffect(() => {
    saveToBackend("dmvv_machineRecords", machineRecords);
  }, [machineRecords]);
  useEffect(() => {
    saveToBackend("dmvv_reviews", reviews);
  }, [reviews]);
  useEffect(() => {
    saveToBackend("dmvv_homeCards", homeCards);
  }, [homeCards]);
  // ─────────────────────────────────────────────────────────────────────────────

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
  const addSliderImage = (img: SliderImage) =>
    setSliderImages((prev) => [...prev, img]);
  const updateSliderImage = (id: string, updates: Partial<SliderImage>) =>
    setSliderImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...updates } : img)),
    );
  const deleteSliderImage = (id: string) =>
    setSliderImages((prev) => prev.filter((img) => img.id !== id));
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
  // New actions
  const addLoanApplication = (a: LoanApplication) =>
    setLoanApplications((prev) => [...prev, a]);
  const updateLoanApplication = (
    id: string,
    updates: Partial<LoanApplication>,
  ) =>
    setLoanApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    );
  const addIncomeSource = (s: IncomeSource) =>
    setIncomeSources((prev) => [...prev, s]);
  const deleteIncomeSource = (id: string) =>
    setIncomeSources((prev) => prev.filter((s) => s.id !== id));
  const addTrainingEnrollment = (e: TrainingEnrollment) =>
    setTrainingEnrollments((prev) => [...prev, e]);
  const updateTrainingEnrollment = (
    id: string,
    updates: Partial<TrainingEnrollment>,
  ) =>
    setTrainingEnrollments((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    );
  const addVolunteerActivity = (v: VolunteerActivity) =>
    setVolunteerActivities((prev) => [...prev, v]);
  const updateVolunteerActivity = (
    id: string,
    updates: Partial<VolunteerActivity>,
  ) =>
    setVolunteerActivities((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v)),
    );
  const addProduct = (p: Product) => setProducts((prev) => [...prev, p]);
  const updateProduct = (id: string, updates: Partial<Product>) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    );
  const deleteProduct = (id: string) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));
  const addOrder = (o: Order) => setOrders((prev) => [...prev, o]);
  const updateOrder = (id: string, updates: Partial<Order>) =>
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...updates } : o)),
    );
  const addInsuranceScheme = (s: InsuranceScheme) =>
    setInsuranceSchemes((prev) => [...prev, s]);
  const updateInsuranceScheme = (
    id: string,
    updates: Partial<InsuranceScheme>,
  ) =>
    setInsuranceSchemes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    );
  const deleteInsuranceScheme = (id: string) =>
    setInsuranceSchemes((prev) => prev.filter((s) => s.id !== id));
  const addInsuranceApplication = (a: InsuranceApplication) =>
    setInsuranceApplications((prev) => [...prev, a]);
  const updateInsuranceApplication = (
    id: string,
    updates: Partial<InsuranceApplication>,
  ) =>
    setInsuranceApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    );
  const addWalletTransaction = (t: WalletTransaction) =>
    setWalletTransactions((prev) => [...prev, t]);
  const updateUtilityService = (id: string, updates: Partial<UtilityService>) =>
    setUtilityServices((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    );

  // ─── Management CRUD ─────────────────────────────────────────────────────────
  const addMemberRecord = (m: MemberRecord) =>
    setMemberRecords((prev) => [...prev, m]);
  const updateMemberRecord = (id: string, updates: Partial<MemberRecord>) =>
    setMemberRecords((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    );
  const deleteMemberRecord = (id: string) =>
    setMemberRecords((prev) => prev.filter((m) => m.id !== id));
  const addAttendanceRecord = (a: AttendanceRecord) =>
    setAttendanceRecords((prev) => [...prev, a]);
  const updateAttendanceRecord = (
    id: string,
    updates: Partial<AttendanceRecord>,
  ) =>
    setAttendanceRecords((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    );
  const addPayrollRecord = (p: PayrollRecord) =>
    setPayrollRecords((prev) => [...prev, p]);
  const updatePayrollRecord = (id: string, updates: Partial<PayrollRecord>) =>
    setPayrollRecords((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    );
  const deletePayrollRecord = (id: string) =>
    setPayrollRecords((prev) => prev.filter((p) => p.id !== id));
  const addLeaveRequest = (l: LeaveRequest) =>
    setLeaveRequests((prev) => [...prev, l]);
  const updateLeaveRequest = (id: string, updates: Partial<LeaveRequest>) =>
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    );
  const addSupervisorReport = (r: SupervisorReport) =>
    setSupervisorReports((prev) => [...prev, r]);
  const addProductionEntry = (p: ProductionEntry) =>
    setProductionEntries((prev) => [...prev, p]);
  const updateProductionEntry = (
    id: string,
    updates: Partial<ProductionEntry>,
  ) =>
    setProductionEntries((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    );
  const addMachineRecord = (m: MachineRecord) =>
    setMachineRecords((prev) => [...prev, m]);
  const updateMachineRecord = (id: string, updates: Partial<MachineRecord>) =>
    setMachineRecords((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    );
  const deleteMachineRecord = (id: string) =>
    setMachineRecords((prev) => prev.filter((m) => m.id !== id));
  const addReview = (r: Review) => setReviews((prev) => [...prev, r]);
  const updateReview = (id: string, updates: Partial<Review>) =>
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    );
  const deleteReview = (id: string) =>
    setReviews((prev) => prev.filter((r) => r.id !== id));
  const addHomeCard = (c: HomeCard) => setHomeCards((prev) => [...prev, c]);
  const updateHomeCard = (id: string, updates: Partial<HomeCard>) =>
    setHomeCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  const deleteHomeCard = (id: string) =>
    setHomeCards((prev) => prev.filter((c) => c.id !== id));

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
        sliderImages,
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
        loanApplications,
        incomeSources,
        trainingEnrollments,
        volunteerActivities,
        products,
        orders,
        insuranceSchemes,
        insuranceApplications,
        walletTransactions,
        utilityServices,
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
        addSliderImage,
        updateSliderImage,
        deleteSliderImage,
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
        addLoanApplication,
        updateLoanApplication,
        addIncomeSource,
        deleteIncomeSource,
        addTrainingEnrollment,
        updateTrainingEnrollment,
        addVolunteerActivity,
        updateVolunteerActivity,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrder,
        addInsuranceScheme,
        updateInsuranceScheme,
        deleteInsuranceScheme,
        addInsuranceApplication,
        updateInsuranceApplication,
        addWalletTransaction,
        updateUtilityService,
        memberRecords,
        attendanceRecords,
        payrollRecords,
        leaveRequests,
        supervisorReports,
        productionEntries,
        machineRecords,
        addMemberRecord,
        updateMemberRecord,
        deleteMemberRecord,
        addAttendanceRecord,
        updateAttendanceRecord,
        addPayrollRecord,
        updatePayrollRecord,
        deletePayrollRecord,
        addLeaveRequest,
        updateLeaveRequest,
        addSupervisorReport,
        addProductionEntry,
        updateProductionEntry,
        addMachineRecord,
        updateMachineRecord,
        deleteMachineRecord,
        reviews,
        addReview,
        updateReview,
        deleteReview,
        homeCards,
        addHomeCard,
        updateHomeCard,
        deleteHomeCard,
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
