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
      "DMVV Bhartiy Mahila Shakti Foundation has successfully trained over 50,000 women across 15 states under the Skill India programme. The training covers vocational skills including tailoring, computer literacy, food processing, and beauty & wellness. Women participants have reported a 70% increase in household income after completing these courses.",
    category: "Achievement",
    publishDate: "2025-12-15",
    isPublished: true,
    imageUrl: "/assets/generated/training-tailoring.dim_600x400.jpg",
  },
  {
    id: "n2",
    title: "New Mahila Kendra Inaugurated in Varanasi",
    content:
      "A new state-of-the-art Mahila Kendra was inaugurated in Varanasi by the District Magistrate. The center is equipped with 50 sewing machines, a computer lab with 20 workstations, and a dedicated healthcare counseling room. The center will serve women from 12 surrounding villages.",
    category: "Center Opening",
    publishDate: "2025-11-20",
    isPublished: true,
    imageUrl: "/assets/generated/community-center.dim_600x400.jpg",
  },
  {
    id: "n3",
    title: "Annual Mahila Samman Puraskar 2025 Ceremony",
    content:
      "The Annual Mahila Samman Puraskar 2025 was held at New Delhi, recognizing 25 outstanding women entrepreneurs and leaders who have made exceptional contributions to women empowerment. The event was attended by government officials, social workers, and over 500 beneficiaries.",
    category: "Awards",
    publishDate: "2025-10-05",
    isPublished: true,
    imageUrl: "/assets/generated/awards-ceremony.dim_600x400.jpg",
  },
  {
    id: "n4",
    title: "Microfinance Loan Disbursement Camp in Rural Bihar",
    content:
      "DMVV Foundation organized a microfinance loan disbursement camp in rural Bihar, providing collateral-free loans to 200 women entrepreneurs. Loans ranging from ₹25,000 to ₹2,00,000 were disbursed to women starting small businesses in tailoring, food processing, and handicrafts.",
    category: "Financial Empowerment",
    publishDate: "2025-09-12",
    isPublished: true,
    imageUrl: "/assets/generated/employment-success.dim_600x400.jpg",
  },
  {
    id: "n5",
    title: "Digital Literacy Drive Reaches 10,000 Women",
    content:
      "Our digital literacy program has now reached 10,000 women across UP, Bihar, Rajasthan, and MP. The program teaches basic computer skills, internet usage, online banking, and digital payment methods. Trained women are now able to access government schemes and sell their products online.",
    category: "Training",
    publishDate: "2025-08-30",
    isPublished: true,
    imageUrl: "/assets/generated/training-computer-skills.dim_600x400.jpg",
  },
  {
    id: "n6",
    title: "Partnership with NABARD for Women Farmers",
    content:
      "DMVV Foundation has signed an MOU with NABARD to support women farmers through the Mahila Kisan Sashaktikaran Pariyojana. The partnership will provide training in modern farming techniques, access to Kisan Credit Cards, and market linkages for agricultural products produced by women farmers.",
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
      "DMVV Bhartiy Mahila Shakti Foundation™ is a registered non-governmental organization dedicated to the empowerment of women across India. We work in areas of vocational training, financial inclusion, healthcare, education, and entrepreneurship development. Since our establishment, we have impacted over 50,000 women across 15 states.",
    sortOrder: 1,
  },
  {
    id: "f2",
    question: "How can I register with the Foundation?",
    answer:
      "You can register through our online portal by clicking the 'Sign Up' button on our website. Complete the registration form with your personal details, select your role (User, Center, Supervisor, or Transport), and submit. Your application will be reviewed by our admin team within 2-3 working days. Once approved, you will receive access to the portal.",
    sortOrder: 2,
  },
  {
    id: "f3",
    question: "What documents are required for KYC verification?",
    answer:
      "For KYC verification, you need to submit: (1) Aadhaar Card (front and back), (2) Recent passport-size photograph, (3) Address proof (Aadhaar/Voter ID/Utility Bill), and (4) Bank account details including account number, IFSC code, and bank passbook/statement. All documents should be clear and legible scans or photographs.",
    sortOrder: 3,
  },
  {
    id: "f4",
    question: "What training programs does the Foundation offer?",
    answer:
      "We offer a wide range of skill development training programs including: Tailoring & Fashion Design (3-6 months), Computer & Digital Literacy (1-3 months), Beauty & Wellness (3 months), Food Processing & Packaging (2 months), Handicrafts & Embroidery (3 months), and Organic Farming (2 months). All programs are certified and provide placement assistance.",
    sortOrder: 4,
  },
  {
    id: "f5",
    question: "How can I apply for a loan through the Foundation?",
    answer:
      "Women who have completed at least one training program and have an approved KYC can apply for microfinance loans. Loans range from ₹10,000 to ₹5,00,000 depending on the business plan. You need to submit a business plan, KYC documents, and guarantor details. Loans are available at subsidized interest rates under various government schemes like MUDRA and Stand-Up India.",
    sortOrder: 5,
  },
  {
    id: "f6",
    question: "Which states does the Foundation operate in?",
    answer:
      "Currently, DMVV Foundation operates in 15+ states including Uttar Pradesh, Bihar, Rajasthan, Madhya Pradesh, Maharashtra, Gujarat, Jharkhand, West Bengal, Odisha, Chhattisgarh, Haryana, Punjab, Delhi, Uttarakhand, and Himachal Pradesh. We are continuously expanding to new states to reach more women in need.",
    sortOrder: 6,
  },
  {
    id: "f7",
    question: "Is there any fee for training programs?",
    answer:
      "Most of our training programs are free of cost or available at a nominal subsidized fee for women from economically weaker sections (EWS) and Below Poverty Line (BPL) categories. Women with APL (Above Poverty Line) status may be required to pay a small fee. Scholarships and fee waivers are available based on merit and financial need.",
    sortOrder: 7,
  },
  {
    id: "f8",
    question: "What is the Mahila Samman Puraskar?",
    answer:
      "The Mahila Samman Puraskar is our annual recognition program that honors outstanding women who have demonstrated exceptional courage, leadership, and contribution to society. Awards are given in categories including Entrepreneurship, Social Service, Education, Arts & Culture, and Sports. Nominations can be submitted online by any citizen of India.",
    sortOrder: 8,
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
  {
    id: "m3",
    fileName: "training-gallery-2025.jpg",
    fileType: "Image",
    uploadedAt: "2025-02-01",
    size: "1.2 MB",
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
      "Comprehensive training in stitching, garment making, embroidery, and fashion design. Includes machine operation, pattern making, and quality finishing techniques.",
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
      "Basic to intermediate computer skills including MS Office, internet, email, digital payment, and online government services access.",
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
      "Training in food preservation, processing, and packaging techniques for pickles, papads, jams, and agro-products.",
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
      "Traditional and contemporary handicraft training including chikan embroidery, block printing, pottery, and tribal art.",
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
    "DMVV Bhartiy Mahila Shakti Foundation is a registered non-governmental organization working towards the social and economic empowerment of women across India. We provide vocational training, financial assistance, healthcare guidance, and entrepreneurship support to women from marginalized communities. Since 2020, we have positively impacted over 50,000 women across 15 states.",
  registrationNo: "NGO/UP/2020/001234",
  foundingYear: "2020",
  website: "www.dmvv.org",
};

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
