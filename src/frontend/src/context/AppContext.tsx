import type React from "react";
import { createContext, useContext, useState } from "react";

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

// Foundation Event
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

// Computer Center
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

// Scheme
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

// Loan Scheme
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

// Employment Partner
export interface EmploymentPartner {
  id: string;
  name: string;
  sector: string;
  openings: number;
  description: string;
  isActive: boolean;
  sortOrder: number;
}

// Employment Success Story
export interface SuccessStory {
  id: string;
  name: string;
  from: string;
  now: string;
  income: string;
  quote: string;
  photoUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

// Award Category
export interface AwardCategory {
  id: string;
  category: string;
  description: string;
  prize: string;
  color: string;
  isActive: boolean;
  sortOrder: number;
}

// Past Award Winner
export interface AwardWinner {
  id: string;
  name: string;
  year: string;
  category: string;
  state: string;
  isActive: boolean;
  sortOrder: number;
}

// Apply Form Submission
export interface ApplyFormSubmission {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  state: string;
  district: string;
  applyFor: string;
  message: string;
  submittedAt: string;
  status: "new" | "reviewed" | "contacted";
}

// Home Hero Content
export interface HomeHeroContent {
  heading: string;
  subheading: string;
  primaryBtnText: string;
  secondaryBtnText: string;
}

// Home Stat
export interface HomeStat {
  id: string;
  iconName: string;
  number: string;
  label: string;
  color: string;
  sortOrder: number;
  isActive: boolean;
}

// Home Initiative
export interface HomeInitiative {
  id: string;
  label: string;
  iconName: string;
  color: string;
  sortOrder: number;
  isActive: boolean;
}

// Home Impact Story
export interface HomeImpactStory {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  bgColor: string;
  sortOrder: number;
  isActive: boolean;
}

// Home CTA Content
export interface HomeCTAContent {
  heading: string;
  subtext: string;
  primaryBtnText: string;
  secondaryBtnText: string;
}

// Community Center (public-facing, separate from admin Center management)
export interface CommunityCenter {
  id: string;
  name: string;
  address: string;
  state: string;
  district: string;
  services: string;
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

// Transport Info
export interface TransportInfo {
  id: string;
  vehicleType: string;
  routeFrom: string;
  routeTo: string;
  capacity: string;
  contactPhone: string;
  isActive: boolean;
  sortOrder: number;
}

// Download Item
export interface DownloadItem {
  id: string;
  name: string;
  type: string;
  size: string;
  category: string;
  desc: string;
  fileUrl: string;
  isActive: boolean;
  sortOrder: number;
}

// ─── Initial Data ───────────────────────────────────────────────

const initialUsers: User[] = [
  {
    id: "admin1",
    fullName: "Admin User",
    mobile: "9876543210",
    email: "admin@dmvv.org",
    password: "Admin@123",
    role: "admin",
    status: "approved",
    createdAt: "2024-01-01",
    isVerified: true,
  },
  {
    id: "user1",
    fullName: "Sunita Devi",
    mobile: "9876543211",
    email: "sunita@example.com",
    password: "User@123",
    role: "user",
    status: "approved",
    createdAt: "2024-02-15",
    isVerified: false,
  },
  {
    id: "user2",
    fullName: "Kavita Sharma",
    mobile: "9876543212",
    email: "kavita@example.com",
    password: "User@123",
    role: "user",
    status: "pending",
    createdAt: "2024-03-10",
    isVerified: false,
  },
  {
    id: "center1",
    fullName: "Mahila Kendra Lucknow",
    mobile: "9876543213",
    email: "lucknow@dmvv.org",
    password: "Center@123",
    role: "center",
    status: "approved",
    createdAt: "2024-01-20",
    isVerified: false,
  },
  {
    id: "sup1",
    fullName: "Ramesh Kumar",
    mobile: "9876543214",
    email: "ramesh@dmvv.org",
    password: "Sup@123",
    role: "supervisor",
    status: "approved",
    createdAt: "2024-02-01",
    isVerified: false,
  },
  {
    id: "hr1",
    fullName: "Priya Verma",
    mobile: "9876543215",
    email: "priya.hr@dmvv.org",
    password: "HR@123",
    role: "hr",
    status: "approved",
    createdAt: "2024-01-15",
    isVerified: false,
  },
];

const initialKYC: KYC[] = [
  {
    id: "kyc1",
    userId: "user1",
    aadhaarFileName: "sunita_aadhaar.pdf",
    photoFileName: "sunita_photo.jpg",
    addressProofFileName: "sunita_address.pdf",
    bankName: "State Bank of India",
    accountNumber: "12345678901",
    ifscCode: "SBIN0001234",
    branchName: "Lucknow Main Branch",
    status: "approved",
    adminRemark: "All documents verified and in order.",
    submittedAt: "2024-02-20",
  },
  {
    id: "kyc2",
    userId: "center1",
    aadhaarFileName: "kendra_reg.pdf",
    photoFileName: "kendra_photo.jpg",
    addressProofFileName: "kendra_address.pdf",
    bankName: "Punjab National Bank",
    accountNumber: "98765432101",
    ifscCode: "PUNB0012345",
    branchName: "Lucknow Hazratganj",
    status: "pending",
    adminRemark: "",
    submittedAt: "2024-03-05",
  },
];

const initialCenters: Center[] = [
  {
    id: "c1",
    name: "DMVV Mahila Kendra - Lucknow",
    address: "12, Vikas Nagar, Near Civil Lines",
    state: "Uttar Pradesh",
    district: "Lucknow",
    block: "Sadar",
    contactPhone: "0522-4012345",
    isActive: true,
  },
  {
    id: "c2",
    name: "DMVV Mahila Kendra - Varanasi",
    address: "45, Shivpur Colony, Lanka Road",
    state: "Uttar Pradesh",
    district: "Varanasi",
    block: "Pindra",
    contactPhone: "0542-2234567",
    isActive: true,
  },
  {
    id: "c3",
    name: "DMVV Mahila Kendra - Patna",
    address: "78, Rajendra Nagar, Boring Road",
    state: "Bihar",
    district: "Patna",
    block: "Patna Sadar",
    contactPhone: "0612-2345678",
    isActive: true,
  },
  {
    id: "c4",
    name: "DMVV Mahila Kendra - Jaipur",
    address: "23, Pratap Nagar, Tonk Road",
    state: "Rajasthan",
    district: "Jaipur",
    block: "Sanganer",
    contactPhone: "0141-2456789",
    isActive: true,
  },
  {
    id: "c5",
    name: "DMVV Mahila Kendra - Bhopal",
    address: "56, Kolar Road, Near TT Nagar",
    state: "Madhya Pradesh",
    district: "Bhopal",
    block: "Huzur",
    contactPhone: "0755-2567890",
    isActive: false,
  },
];

const initialNews: NewsItem[] = [
  {
    id: "n1",
    title: "50,000 Women Trained Under Skill India Programme",
    content:
      "DMVV Bhartiy Mahila Shakti Foundation has successfully trained over 50,000 women across 15 states under the Skill India programme.",
    category: "Achievement",
    publishDate: "2025-12-15",
    isPublished: true,
    imageUrl: "/assets/generated/training-tailoring.dim_600x400.jpg",
  },
  {
    id: "n2",
    title: "New Mahila Kendra Inaugurated in Varanasi",
    content:
      "A new state-of-the-art Mahila Kendra was inaugurated in Varanasi by the District Magistrate.",
    category: "Center Opening",
    publishDate: "2025-11-20",
    isPublished: true,
    imageUrl: "/assets/generated/community-center.dim_600x400.jpg",
  },
  {
    id: "n3",
    title: "Annual Mahila Samman Puraskar 2025 Ceremony",
    content:
      "The Annual Mahila Samman Puraskar 2025 was held at New Delhi, recognizing 25 outstanding women entrepreneurs.",
    category: "Awards",
    publishDate: "2025-10-05",
    isPublished: true,
    imageUrl: "/assets/generated/awards-ceremony.dim_600x400.jpg",
  },
  {
    id: "n4",
    title: "Microfinance Loan Disbursement Camp in Rural Bihar",
    content:
      "DMVV Foundation organized a microfinance loan disbursement camp in rural Bihar, providing collateral-free loans to 200 women entrepreneurs.",
    category: "Financial Empowerment",
    publishDate: "2025-09-12",
    isPublished: true,
    imageUrl: "/assets/generated/employment-success.dim_600x400.jpg",
  },
  {
    id: "n5",
    title: "Digital Literacy Drive Reaches 10,000 Women",
    content:
      "Our digital literacy program has now reached 10,000 women across UP, Bihar, Rajasthan, and MP.",
    category: "Training",
    publishDate: "2025-08-30",
    isPublished: true,
    imageUrl: "/assets/generated/training-computer-skills.dim_600x400.jpg",
  },
  {
    id: "n6",
    title: "Partnership with NABARD for Women Farmers",
    content:
      "DMVV Foundation has signed an MOU with NABARD to support women farmers through the Mahila Kisan Sashaktikaran Pariyojana.",
    category: "Partnership",
    publishDate: "2025-07-18",
    isPublished: true,
  },
];

const initialFAQs: FAQItem[] = [
  {
    id: "f1",
    question: "What is DMVV Bhartiy Mahila Shakti Foundation?",
    answer:
      "DMVV Bhartiy Mahila Shakti Foundation™ is a registered NGO dedicated to the empowerment of women across India.",
    sortOrder: 1,
  },
  {
    id: "f2",
    question: "How can I register with the Foundation?",
    answer:
      "Click the 'Sign Up' button and complete the registration form. Your application will be reviewed within 2-3 working days.",
    sortOrder: 2,
  },
  {
    id: "f3",
    question: "What documents are required for KYC verification?",
    answer:
      "Aadhaar Card, passport-size photo, address proof, and bank account details.",
    sortOrder: 3,
  },
  {
    id: "f4",
    question: "What training programs does the Foundation offer?",
    answer:
      "Tailoring, Computer Literacy, Beauty & Wellness, Food Processing, Handicrafts, and Organic Farming.",
    sortOrder: 4,
  },
  {
    id: "f5",
    question: "How can I apply for a loan?",
    answer:
      "After completing training and KYC approval, apply with a business plan. Loans from ₹10,000 to ₹5,00,000 at subsidized rates.",
    sortOrder: 5,
  },
  {
    id: "f6",
    question: "Which states does the Foundation operate in?",
    answer:
      "15+ states including UP, Bihar, Rajasthan, MP, Maharashtra, Gujarat, Jharkhand, West Bengal, Odisha, and more.",
    sortOrder: 6,
  },
];

const initialSettings: SiteSettings = {
  siteTitle: "DMVV Bhartiy Mahila Shakti Foundation™",
  tagline: "महिला सशक्तिकरण की ओर एक कदम",
  footerText:
    "Dedicated to the empowerment of women across India. Registered NGO under the Societies Registration Act.",
  contactEmail: "info@dmvv.org",
  contactPhone: "+91-9876543210",
  address: "DMVV Foundation HQ, Sector 12, Vikas Bhawan, New Delhi - 110001",
  logoUrl: "",
};

const initialPages: PageContent[] = [
  {
    id: "p1",
    title: "About DMVV Foundation",
    slug: "about",
    content:
      "DMVV Bhartiy Mahila Shakti Foundation is dedicated to women's empowerment.",
    isPublished: true,
    createdAt: "2024-01-01",
  },
];

const initialMedia: MediaFile[] = [
  {
    id: "m1",
    fileName: "foundation-brochure-2025.pdf",
    fileType: "PDF",
    uploadedAt: "2025-01-10",
    size: "2.4 MB",
  },
  {
    id: "m2",
    fileName: "annual-report-2024.pdf",
    fileType: "PDF",
    uploadedAt: "2024-12-15",
    size: "5.1 MB",
  },
];

const initialGalleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: "/assets/generated/training-tailoring.dim_600x400.jpg",
    category: "Training",
    caption: "Tailoring Workshop - Lucknow Center",
    uploadedAt: "2024-03-01",
  },
  {
    id: "g2",
    src: "/assets/generated/training-computer-skills.dim_600x400.jpg",
    category: "Training",
    caption: "Digital Literacy Class - Varanasi",
    uploadedAt: "2024-03-05",
  },
  {
    id: "g3",
    src: "/assets/generated/employment-success.dim_600x400.jpg",
    category: "Events",
    caption: "Women Entrepreneurship Fair 2024",
    uploadedAt: "2024-04-10",
  },
  {
    id: "g4",
    src: "/assets/generated/community-center.dim_600x400.jpg",
    category: "Centers",
    caption: "Inauguration of Patna Mahila Kendra",
    uploadedAt: "2024-04-15",
  },
  {
    id: "g5",
    src: "/assets/generated/awards-ceremony.dim_600x400.jpg",
    category: "Awards",
    caption: "Mahila Samman Puraskar 2024 Ceremony",
    uploadedAt: "2024-05-01",
  },
  {
    id: "g6",
    src: "/assets/generated/hero-women-empowerment.dim_1400x700.jpg",
    category: "Events",
    caption: "Annual Women's Day Rally 2025",
    uploadedAt: "2025-03-08",
  },
];

const initialTrainingPrograms: TrainingProgram[] = [
  {
    id: "tp1",
    title: "Tailoring & Fashion Design",
    duration: "3-6 Months",
    eligibility: "Women aged 18-45, minimum 8th standard",
    certification: "NSQF Level 4 - Apparel Sector Skill Council",
    description:
      "Comprehensive training in stitching, garment making, embroidery, and fashion design.",
    outcomes: [
      "Sewing machine operation",
      "Pattern making & cutting",
      "Garment construction",
      "Embroidery & decorative work",
      "Quality control & finishing",
    ],
    image: "/assets/generated/training-tailoring.dim_600x400.jpg",
    color: "border-pink-400",
    isActive: true,
  },
  {
    id: "tp2",
    title: "Computer & Digital Literacy",
    duration: "1-3 Months",
    eligibility: "Women aged 18-50, minimum 5th standard",
    certification: "NIELIT O Level & CCC Certificate",
    description:
      "Basic to intermediate computer skills including MS Office, internet, email, digital payment.",
    outcomes: [
      "MS Office (Word, Excel, PowerPoint)",
      "Internet & email usage",
      "Digital payment methods (UPI, NEFT)",
      "Online government portal navigation",
      "E-commerce basics",
    ],
    image: "/assets/generated/training-computer-skills.dim_600x400.jpg",
    color: "border-blue-400",
    isActive: true,
  },
  {
    id: "tp3",
    title: "Beauty & Wellness",
    duration: "3 Months",
    eligibility: "Women aged 18-40, minimum 8th standard",
    certification: "Beauty & Wellness Sector Skill Council Level 3",
    description:
      "Professional training in beauty treatments, skincare, hair styling, and wellness services.",
    outcomes: [
      "Facial & skincare treatments",
      "Hair cutting & styling",
      "Mehendi application",
      "Makeup & bridal services",
      "Salon management basics",
    ],
    image: "/assets/generated/employment-success.dim_600x400.jpg",
    color: "border-purple-400",
    isActive: true,
  },
  {
    id: "tp4",
    title: "Food Processing & Packaging",
    duration: "2 Months",
    eligibility: "Women aged 18-45, minimum 5th standard",
    certification: "FICSI Certificate",
    description:
      "Training in food preservation, processing, and packaging techniques.",
    outcomes: [
      "Food safety & hygiene (FSSAI)",
      "Pickle & jam preparation",
      "Packaging & labeling",
      "Food business registration",
      "Marketing & selling food products",
    ],
    image: "/assets/generated/community-center.dim_600x400.jpg",
    color: "border-orange-400",
    isActive: true,
  },
  {
    id: "tp5",
    title: "Handicrafts & Embroidery",
    duration: "3 Months",
    eligibility: "Women aged 18-50, no minimum education",
    certification: "MSME & DC-Handicrafts Artisan Certificate",
    description:
      "Traditional and contemporary handicraft training including chikan embroidery, block printing.",
    outcomes: [
      "Chikan & Zardosi embroidery",
      "Block printing techniques",
      "Pottery & clay work",
      "Product finishing & pricing",
      "Online selling through e-commerce",
    ],
    image: "/assets/generated/training-tailoring.dim_600x400.jpg",
    color: "border-yellow-400",
    isActive: true,
  },
];

const initialCompanyProfile: CompanyProfile = {
  orgName: "DMVV Bhartiy Mahila Shakti Foundation™",
  description:
    "DMVV Bhartiy Mahila Shakti Foundation is a registered non-governmental organization working towards the social and economic empowerment of women across India.",
  registrationNo: "NGO/UP/2020/001234",
  foundingYear: "2020",
  website: "www.dmvv.org",
};

const initialLeadership: LeadershipMember[] = [
  {
    id: "l1",
    name: "Dr. Anjali Srivastava",
    designation: "Founder & President",
    qualification: "Ph.D. Social Work, BHU",
    message:
      "Our mission is to empower every woman in India through education, skill development, and financial inclusion.",
    photoUrl: "",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "l2",
    name: "Mrs. Meena Gupta",
    designation: "Secretary General",
    qualification: "M.A. Public Administration",
    message:
      "We are committed to creating sustainable opportunities for women across rural and urban India.",
    photoUrl: "",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "l3",
    name: "Mr. Suresh Kumar Verma",
    designation: "Treasurer",
    qualification: "CA, ICAI",
    message:
      "Financial transparency and accountability are the cornerstones of our organization.",
    photoUrl: "",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "l4",
    name: "Dr. Priya Nair",
    designation: "Program Director",
    qualification: "MBA, Social Entrepreneurship",
    message:
      "Designing impactful programs that truly transform lives is what drives me.",
    photoUrl: "",
    sortOrder: 4,
    isActive: true,
  },
];

const initialFoundationEvents: FoundationEvent[] = [
  {
    id: "fe1",
    title: "Mahila Sashaktikaran Sammelan 2025",
    description:
      "Annual gathering of women leaders, beneficiaries, and partners to celebrate achievements and plan ahead.",
    eventDate: "2025-03-08",
    location: "New Delhi",
    imageUrl: "/assets/generated/awards-ceremony.dim_600x400.jpg",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "fe2",
    title: "Skill Development Mela - Lucknow",
    description:
      "Free skill training registration and demo for rural women from UP and neighboring states.",
    eventDate: "2025-04-15",
    location: "Lucknow, UP",
    imageUrl: "/assets/generated/training-tailoring.dim_600x400.jpg",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "fe3",
    title: "Microfinance Loan Camp - Bihar",
    description:
      "Loan disbursement camp for women entrepreneurs in rural Bihar.",
    eventDate: "2025-05-20",
    location: "Patna, Bihar",
    imageUrl: "/assets/generated/employment-success.dim_600x400.jpg",
    isActive: true,
    sortOrder: 3,
  },
];

const initialComputerCenters: ComputerCenter[] = [
  {
    id: "cc1",
    name: "DMVV Computer Center - Lucknow",
    address: "12, Vikas Nagar, Near Civil Lines, Lucknow",
    state: "Uttar Pradesh",
    district: "Lucknow",
    facilities: "20 Computers, Wi-Fi, Projector, Printer",
    contactPhone: "0522-4012345",
    imageUrl: "/assets/generated/training-computer-skills.dim_600x400.jpg",
    isActive: true,
  },
  {
    id: "cc2",
    name: "DMVV Computer Center - Patna",
    address: "78, Rajendra Nagar, Boring Road, Patna",
    state: "Bihar",
    district: "Patna",
    facilities: "15 Computers, Wi-Fi, Printer",
    contactPhone: "0612-2345678",
    imageUrl: "/assets/generated/community-center.dim_600x400.jpg",
    isActive: true,
  },
];

const initialSchemes: SchemeItem[] = [
  {
    id: "s1",
    name: "Self Employment Revulation Scheme",
    ministry: "Mahila Sashaktikaran Yojana",
    description:
      "DMVV Bhartiy Mahila Shakti Foundation ki yeh flagship yojana mahilaon ko swavlambi banane ke liye design ki gayi hai.",
    eligibility: [
      "18-55 aadhar registered mahila",
      "BPL ya lower middle class parivar",
      "Minimum 5th class pass",
      "SHG member ya individual apply kar sakti hain",
    ],
    benefits: [
      "Rup ₹50,000 tak seed capital sahayata",
      "Nishulk vyavsayik prashikshan (3-6 maah)",
      "Marketing aur bazaar linkage",
      "Mentorship aur follow-up support",
    ],
    howToApply:
      "Nazdiki DMVV Mahila Kendra mein sampark karen ya website par online aavedan karen.",
    color: "border-ngo-orange",
    featured: true,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "s2",
    name: "Pradhan Mantri Ujjwala Yojana",
    ministry: "Ministry of Petroleum & Natural Gas",
    description:
      "Provides free LPG connections to women from Below Poverty Line households.",
    eligibility: [
      "Woman from BPL household",
      "Age above 18 years",
      "Should not already have LPG connection",
      "Must possess valid BPL card",
    ],
    benefits: [
      "Free LPG connection with 14.2 kg cylinder",
      "₹1,600 financial assistance",
      "Free first refill and hotplate",
      "Subsequent cylinders at subsidized rates",
    ],
    howToApply:
      "Visit nearest LPG distributor or apply online on the PMUY portal.",
    color: "border-orange-400",
    featured: false,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "s3",
    name: "Beti Bachao Beti Padhao",
    ministry: "Ministry of Women & Child Development",
    description:
      "National campaign to address the declining Child Sex Ratio and promote education of the girl child.",
    eligibility: [
      "Girl children from birth to Class 10",
      "Parents or guardians of girl children",
      "Applicable in all 640 districts",
      "Special focus on 100 selected districts",
    ],
    benefits: [
      "Sukanya Samriddhi Yojana with 8% interest rate",
      "Scholarship for girl students",
      "Awareness programs against female foeticide",
      "Free admission in government schools",
    ],
    howToApply: "Register at Anganwadi centers or apply through BBBP portal.",
    color: "border-pink-400",
    featured: false,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "s4",
    name: "Mahila Shakti Kendra",
    ministry: "Ministry of Women & Child Development",
    description:
      "Scheme to empower rural women through community participation.",
    eligibility: [
      "Rural women in designated districts",
      "Women from SC/ST/OBC categories get priority",
      "Widows and single women preferred",
      "Self-Help Group members eligible",
    ],
    benefits: [
      "Community skill development",
      "Awareness about government schemes",
      "Facilitation of bank accounts and Aadhaar",
      "Linkage to MNREGA and other schemes",
    ],
    howToApply:
      "Contact nearest Anganwadi or District Women & Child Development Officer.",
    color: "border-green-400",
    featured: false,
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "s5",
    name: "Stand-Up India Scheme",
    ministry: "Ministry of Finance",
    description:
      "Facilitates bank loans between ₹10 lakh to ₹1 crore for women entrepreneurs.",
    eligibility: [
      "Women entrepreneurs above 18 years",
      "SC/ST/OBC women get additional benefits",
      "First-generation entrepreneurs preferred",
      "Valid business plan required",
    ],
    benefits: [
      "Loans from ₹10 lakh to ₹1 crore at concessional rates",
      "Repayment period up to 7 years",
      "Working capital facility up to ₹10 lakh",
      "Margin money subsidy",
    ],
    howToApply: "Apply online at standupmitra.in or visit any bank branch.",
    color: "border-blue-400",
    featured: false,
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "s6",
    name: "Skill India for Women",
    ministry: "Ministry of Skill Development & Entrepreneurship",
    description:
      "Provides skill training to women across various sectors to improve employability.",
    eligibility: [
      "Women aged 18-45 years",
      "Minimum 5th standard pass",
      "Preference to rural and BPL women",
      "No prior formal skill training",
    ],
    benefits: [
      "Free skill training in 30+ vocational sectors",
      "NSQF-level certification recognized nationwide",
      "Placement assistance with industry partners",
      "Stipend during training period",
    ],
    howToApply:
      "Visit nearest PMKVY Training Centre or register online at skillindiadigital.gov.in.",
    color: "border-purple-400",
    featured: false,
    isActive: true,
    sortOrder: 6,
  },
];

const initialLoanSchemes: LoanScheme[] = [
  {
    id: "ls1",
    name: "MUDRA Loan - Shishu",
    amount: "Up to ₹50,000",
    interest: "7-10% p.a.",
    tenure: "Up to 5 years",
    description:
      "For micro businesses in early stage. Ideal for home-based businesses like tailoring, food making, and beauty services.",
    eligibility: [
      "Women entrepreneur above 18 years",
      "Non-farm income generating activity",
      "Micro or small enterprise",
      "Valid KYC documents",
    ],
    color: "border-green-400",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "ls2",
    name: "MUDRA Loan - Kishor",
    amount: "₹50,001 to ₹5,00,000",
    interest: "8-12% p.a.",
    tenure: "Up to 7 years",
    description:
      "For expanding existing small businesses. Suitable for women running small shops or production units.",
    eligibility: [
      "Existing business of at least 6 months",
      "ITR or business proof required",
      "Good credit history preferred",
      "Bank account mandatory",
    ],
    color: "border-blue-400",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "ls3",
    name: "Mahila Samridhi Yojana",
    amount: "₹10,000 to ₹2,00,000",
    interest: "4% p.a. (subsidized)",
    tenure: "Up to 3 years",
    description:
      "DMVV Foundation's own microfinance program for marginalized women. Collateral-free micro-loans with minimal documentation.",
    eligibility: [
      "Women from BPL or EWS category",
      "Completed at least one DMVV training",
      "KYC verified on portal",
      "Self-Help Group membership preferred",
    ],
    color: "border-orange-400",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "ls4",
    name: "Stand-Up India Women Loan",
    amount: "₹10 Lakh to ₹1 Crore",
    interest: "Bank rate + 3%",
    tenure: "Up to 7 years",
    description:
      "For women entrepreneurs setting up new greenfield enterprises in manufacturing, services, or trade sector.",
    eligibility: [
      "First-generation women entrepreneur",
      "Business plan with financial projections",
      "SC/ST women get additional benefits",
      "Age above 18 years",
    ],
    color: "border-purple-400",
    isActive: true,
    sortOrder: 4,
  },
];

const initialEmploymentPartners: EmploymentPartner[] = [
  {
    id: "ep1",
    name: "Fabindia",
    sector: "Retail & Handicrafts",
    openings: 120,
    description: "Leading Indian ethnic fashion and lifestyle brand.",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "ep2",
    name: "Lijjat Papad",
    sector: "Food Industry",
    openings: 85,
    description: "Women-led food cooperative with national reach.",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "ep3",
    name: "BSNL",
    sector: "Telecom",
    openings: 45,
    description: "Government telecom company with pan-India presence.",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "ep4",
    name: "State Bank of India",
    sector: "Banking",
    openings: 30,
    description: "India's largest public sector bank.",
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "ep5",
    name: "Apollo Clinics",
    sector: "Healthcare",
    openings: 60,
    description: "Leading healthcare chain across India.",
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "ep6",
    name: "Reliance Trends",
    sector: "Retail",
    openings: 95,
    description: "Large format fashion retail chain.",
    isActive: true,
    sortOrder: 6,
  },
];

const initialSuccessStories: SuccessStory[] = [
  {
    id: "ss1",
    name: "Mona Singh",
    from: "Bareilly, UP",
    now: "Tailoring Business Owner",
    income: "₹25,000/month",
    quote:
      "DMVV Foundation's tailoring training completely transformed my life. I now run a boutique employing 5 other women.",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "ss2",
    name: "Fatima Begum",
    from: "Kishanganj, Bihar",
    now: "Beauty Salon Owner",
    income: "₹18,000/month",
    quote:
      "After the beauty training, I started my own salon and now I'm financially independent.",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "ss3",
    name: "Rekha Devi",
    from: "Alwar, Rajasthan",
    now: "Food Processing Entrepreneur",
    income: "₹15,000/month",
    quote:
      "With the food processing skills and MUDRA loan support, I started a pickle manufacturing unit.",
    isActive: true,
    sortOrder: 3,
  },
];

const initialAwardCategories: AwardCategory[] = [
  {
    id: "ac1",
    category: "Entrepreneurship Excellence",
    description:
      "For women who have built successful businesses employing other women in their communities",
    prize: "₹25,000 + Certificate + Trophy",
    color: "border-yellow-400 bg-yellow-50",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "ac2",
    category: "Social Service Samman",
    description:
      "Recognizing outstanding contributions to women's rights, healthcare, and community welfare",
    prize: "₹20,000 + Certificate + Trophy",
    color: "border-green-400 bg-green-50",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "ac3",
    category: "Digital Shakti Award",
    description:
      "For women leveraging technology for livelihood, education, or social impact",
    prize: "₹15,000 + Certificate + Trophy",
    color: "border-blue-400 bg-blue-50",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "ac4",
    category: "Krishi Mahila Samman",
    description:
      "Honoring women farmers adopting modern techniques and sustainable agriculture",
    prize: "₹20,000 + Certificate + Trophy",
    color: "border-orange-400 bg-orange-50",
    isActive: true,
    sortOrder: 4,
  },
];

const initialAwardWinners: AwardWinner[] = [
  {
    id: "aw1",
    name: "Savita Rani",
    year: "2024",
    category: "Entrepreneurship Excellence",
    state: "Uttar Pradesh",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "aw2",
    name: "Dr. Nandini Patil",
    year: "2024",
    category: "Social Service Samman",
    state: "Maharashtra",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "aw3",
    name: "Geeta Kumari",
    year: "2023",
    category: "Digital Shakti Award",
    state: "Bihar",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "aw4",
    name: "Phoolwati Devi",
    year: "2023",
    category: "Krishi Mahila Samman",
    state: "Madhya Pradesh",
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "aw5",
    name: "Meenu Chauhan",
    year: "2022",
    category: "Entrepreneurship Excellence",
    state: "Rajasthan",
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "aw6",
    name: "Sunita Lakra",
    year: "2022",
    category: "Social Service Samman",
    state: "Jharkhand",
    isActive: true,
    sortOrder: 6,
  },
];

const initialApplyFormSubmissions: ApplyFormSubmission[] = [];

const initialHomeHero: HomeHeroContent = {
  heading: "Empowering Women,\nTransforming India",
  subheading:
    "DMVV Bhartiy Mahila Shakti Foundation™ works tirelessly to provide vocational training, financial support, and opportunities for women across rural and urban India.",
  primaryBtnText: "Explore Our Work",
  secondaryBtnText: "Register Now",
};

const initialHomeStats: HomeStat[] = [
  {
    id: "hs1",
    iconName: "Users",
    number: "50,000+",
    label: "Women Empowered",
    color: "text-green-700",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "hs2",
    iconName: "MapPin",
    number: "200+",
    label: "Active Centers",
    color: "text-orange-500",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "hs3",
    iconName: "Award",
    number: "15+",
    label: "States Covered",
    color: "text-blue-600",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "hs4",
    iconName: "Clock",
    number: "10+",
    label: "Years of Service",
    color: "text-purple-600",
    sortOrder: 4,
    isActive: true,
  },
];

const initialHomeInitiatives: HomeInitiative[] = [
  {
    id: "hi1",
    label: "Vocational Training",
    iconName: "GraduationCap",
    color: "text-blue-600",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "hi2",
    label: "Education Support",
    iconName: "BookOpen",
    color: "text-green-600",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "hi3",
    label: "Financial Empowerment",
    iconName: "Banknote",
    color: "text-orange-500",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "hi4",
    label: "Healthcare",
    iconName: "Heart",
    color: "text-red-500",
    sortOrder: 4,
    isActive: true,
  },
];

const initialHomeImpactStories: HomeImpactStory[] = [
  {
    id: "his1",
    title: "Sunita's Story",
    subtitle: "From trainee to entrepreneur",
    imageUrl: "/assets/generated/training-tailoring.dim_600x400.jpg",
    bgColor: "bg-green-50",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "his2",
    title: "Rekha's Journey",
    subtitle: "Self-reliant through microfinance",
    imageUrl: "/assets/generated/employment-success.dim_600x400.jpg",
    bgColor: "bg-orange-50",
    sortOrder: 2,
    isActive: true,
  },
];

const initialHomeCTA: HomeCTAContent = {
  heading: "Join the Movement for Women's Empowerment",
  subtext:
    "Become a volunteer, donate, or register as a beneficiary. Together, we can create lasting change.",
  primaryBtnText: "Register Now",
  secondaryBtnText: "Apply Now",
};

const initialCommunityCenters: CommunityCenter[] = [
  {
    id: "cm1",
    name: "DMVV Community Center - Lucknow",
    address: "15, Gomti Nagar, Lucknow",
    state: "Uttar Pradesh",
    district: "Lucknow",
    services: "Skill Training, Health Camps, Legal Aid, SHG Meetings",
    imageUrl: "/assets/generated/community-center.dim_600x400.jpg",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "cm2",
    name: "DMVV Community Center - Patna",
    address: "88, Kankarbagh Colony, Patna",
    state: "Bihar",
    district: "Patna",
    services: "Computer Training, Tailoring, Microfinance, Counseling",
    imageUrl: "/assets/generated/training-tailoring.dim_600x400.jpg",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "cm3",
    name: "DMVV Community Center - Jaipur",
    address: "34, Jagatpura Road, Jaipur",
    state: "Rajasthan",
    district: "Jaipur",
    services: "Handicrafts, Food Processing, SHG Support, Health Awareness",
    imageUrl: "/assets/generated/employment-success.dim_600x400.jpg",
    isActive: true,
    sortOrder: 3,
  },
];

const initialTransportInfo: TransportInfo[] = [
  {
    id: "ti1",
    vehicleType: "Mini Bus (22 Seater)",
    routeFrom: "Lucknow HQ",
    routeTo: "Rural Centers - UP",
    capacity: "22 women",
    contactPhone: "9876543220",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "ti2",
    vehicleType: "Tempo Traveller (12 Seater)",
    routeFrom: "Patna Office",
    routeTo: "Village Camps - Bihar",
    capacity: "12 women",
    contactPhone: "9876543221",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "ti3",
    vehicleType: "SUV (7 Seater)",
    routeFrom: "Jaipur Center",
    routeTo: "District Offices - Rajasthan",
    capacity: "7 staff",
    contactPhone: "9876543222",
    isActive: true,
    sortOrder: 3,
  },
];

const initialDownloadItems: DownloadItem[] = [
  {
    id: "dl1",
    name: "DMVV Foundation Brochure 2025",
    type: "PDF",
    size: "2.4 MB",
    category: "Brochures",
    desc: "Complete overview of our programs, centers, and impact",
    fileUrl: "",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "dl2",
    name: "Annual Report 2024-25",
    type: "PDF",
    size: "5.1 MB",
    category: "Reports",
    desc: "Detailed report of activities, financials, and achievements",
    fileUrl: "",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "dl3",
    name: "Member Registration Form",
    type: "PDF",
    size: "0.3 MB",
    category: "Forms",
    desc: "Offline registration form for new members",
    fileUrl: "",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "dl4",
    name: "KYC Document Checklist",
    type: "PDF",
    size: "0.2 MB",
    category: "Forms",
    desc: "List of documents required for KYC verification",
    fileUrl: "",
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "dl5",
    name: "Loan Application Form",
    type: "PDF",
    size: "0.4 MB",
    category: "Forms",
    desc: "Application form for DMVV Mahila Samridhi Yojana loan",
    fileUrl: "",
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "dl6",
    name: "Training Program Schedule 2025",
    type: "PDF",
    size: "1.2 MB",
    category: "Training",
    desc: "Schedule and details of all training programs for 2025",
    fileUrl: "",
    isActive: true,
    sortOrder: 6,
  },
  {
    id: "dl7",
    name: "Government Schemes Booklet",
    type: "PDF",
    size: "3.2 MB",
    category: "Schemes",
    desc: "Comprehensive guide to government schemes for women",
    fileUrl: "",
    isActive: true,
    sortOrder: 7,
  },
  {
    id: "dl8",
    name: "Certificate Templates",
    type: "PDF",
    size: "0.8 MB",
    category: "Certificates",
    desc: "Templates for training completion certificates",
    fileUrl: "",
    isActive: true,
    sortOrder: 8,
  },
];

// ─── Context Type ────────────────────────────────────────────────

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
  // Home page content
  homeHero: HomeHeroContent;
  homeStats: HomeStat[];
  homeInitiatives: HomeInitiative[];
  homeImpactStories: HomeImpactStory[];
  homeCTA: HomeCTAContent;
  // Community Centers (public page)
  communityCenters: CommunityCenter[];
  // Transport
  transportInfo: TransportInfo[];
  // Downloads
  downloadItems: DownloadItem[];
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
  // Home page updates
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
  // Community Centers
  addCommunityCenter: (cc: CommunityCenter) => void;
  updateCommunityCenter: (
    id: string,
    updates: Partial<CommunityCenter>,
  ) => void;
  deleteCommunityCenter: (id: string) => void;
  // Transport
  addTransportInfo: (t: TransportInfo) => void;
  updateTransportInfo: (id: string, updates: Partial<TransportInfo>) => void;
  deleteTransportInfo: (id: string) => void;
  // Downloads
  addDownloadItem: (d: DownloadItem) => void;
  updateDownloadItem: (id: string, updates: Partial<DownloadItem>) => void;
  deleteDownloadItem: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [kycs, setKycs] = useState<KYC[]>(initialKYC);
  const [centers, setCenters] = useState<Center[]>(initialCenters);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [faqs] = useState<FAQItem[]>(initialFAQs);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [pages, setPages] = useState<PageContent[]>(initialPages);
  const [media, setMedia] = useState<MediaFile[]>(initialMedia);
  const [galleryItems, setGalleryItems] =
    useState<GalleryItem[]>(initialGalleryItems);
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgram[]>(
    initialTrainingPrograms,
  );
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>(
    initialCompanyProfile,
  );
  const [leadership, setLeadership] =
    useState<LeadershipMember[]>(initialLeadership);
  const [foundationEvents, setFoundationEvents] = useState<FoundationEvent[]>(
    initialFoundationEvents,
  );
  const [computerCenters, setComputerCenters] = useState<ComputerCenter[]>(
    initialComputerCenters,
  );
  const [schemes, setSchemes] = useState<SchemeItem[]>(initialSchemes);
  const [loanSchemes, setLoanSchemes] =
    useState<LoanScheme[]>(initialLoanSchemes);
  const [employmentPartners, setEmploymentPartners] = useState<
    EmploymentPartner[]
  >(initialEmploymentPartners);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>(
    initialSuccessStories,
  );
  const [awardCategories, setAwardCategories] = useState<AwardCategory[]>(
    initialAwardCategories,
  );
  const [awardWinners, setAwardWinners] =
    useState<AwardWinner[]>(initialAwardWinners);
  const [applyFormSubmissions, setApplyFormSubmissions] = useState<
    ApplyFormSubmission[]
  >(initialApplyFormSubmissions);
  const [homeHero, setHomeHero] = useState<HomeHeroContent>(initialHomeHero);
  const [homeStats, setHomeStats] = useState<HomeStat[]>(initialHomeStats);
  const [homeInitiatives, setHomeInitiatives] = useState<HomeInitiative[]>(
    initialHomeInitiatives,
  );
  const [homeImpactStories, setHomeImpactStories] = useState<HomeImpactStory[]>(
    initialHomeImpactStories,
  );
  const [homeCTA, setHomeCTA] = useState<HomeCTAContent>(initialHomeCTA);
  const [communityCenters, setCommunityCenters] = useState<CommunityCenter[]>(
    initialCommunityCenters,
  );
  const [transportInfo, setTransportInfo] =
    useState<TransportInfo[]>(initialTransportInfo);
  const [downloadItems, setDownloadItems] =
    useState<DownloadItem[]>(initialDownloadItems);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
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
