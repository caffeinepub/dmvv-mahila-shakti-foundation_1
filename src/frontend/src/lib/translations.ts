export type Language = "en" | "hi" | "mr" | "or" | "pa" | "bn";

export const LANGUAGES: {
  code: Language;
  label: string;
  nativeLabel: string;
}[] = [
  { code: "hi", label: "Hindi", nativeLabel: "हिंदी" },
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" },
  { code: "or", label: "Odia", nativeLabel: "ଓଡ଼ିଆ" },
  { code: "pa", label: "Punjabi", nativeLabel: "ਪੰਜਾਬੀ" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
];

export type TranslationKey =
  // nav
  | "nav.home"
  | "nav.about"
  | "nav.schemes"
  | "nav.centers"
  | "nav.training"
  | "nav.employment"
  | "nav.loan"
  | "nav.rewards"
  | "nav.news"
  | "nav.gallery"
  | "nav.downloads"
  | "nav.contact"
  | "nav.more"
  | "nav.franchise"
  | "nav.faq"
  | "nav.ourTeam"
  | "nav.ourPartners"
  | "nav.legalDocs"
  | "nav.wishes"
  | "nav.terms"
  | "nav.rules"
  | "nav.complaint"
  | "nav.donateNow"
  | "nav.catOrg"
  | "nav.catSchemes"
  | "nav.catTraining"
  | "nav.catMedia"
  | "nav.catInfo"
  | "nav.shgLoan"
  | "nav.udhyogLoan"
  | "nav.communityCenter"
  // auth
  | "auth.login"
  | "auth.signup"
  | "auth.logout"
  | "auth.dashboard"
  // home
  | "home.heroTitle"
  | "home.heroSubtitle"
  | "home.heroCta1"
  | "home.heroCta2"
  | "home.sectionInitiatives"
  | "home.sectionImpact"
  | "home.sectionNews"
  | "home.sectionVideos"
  | "home.sectionCenter"
  | "home.sectionCta"
  | "home.readMore"
  | "home.viewAll"
  | "home.learnMore"
  | "home.applyNow"
  | "home.joinUs"
  | "home.contactUs"
  // common
  | "common.submit"
  | "common.cancel"
  | "common.save"
  | "common.edit"
  | "common.delete"
  | "common.add"
  | "common.close"
  | "common.search"
  | "common.loading"
  | "common.noData"
  | "common.yes"
  | "common.no"
  | "common.name"
  | "common.email"
  | "common.phone"
  | "common.address"
  | "common.state"
  | "common.district"
  | "common.status"
  | "common.date"
  | "common.action"
  | "common.active"
  | "common.inactive"
  | "common.details"
  | "common.download"
  | "common.upload"
  | "common.back"
  | "common.next"
  | "common.pending"
  | "common.approved"
  | "common.rejected"
  // about
  | "about.title"
  | "about.mission"
  | "about.vision"
  | "about.leadership"
  // schemes
  | "schemes.title"
  | "schemes.eligibility"
  | "schemes.benefits"
  | "schemes.apply"
  // loan
  | "loan.title"
  | "loan.amount"
  | "loan.interest"
  | "loan.tenure"
  | "loan.apply"
  | "loan.shg"
  | "loan.udhyog"
  // training
  | "training.title"
  | "training.duration"
  | "training.enroll"
  // employment
  | "employment.title"
  | "employment.partners"
  | "employment.successStories"
  // contact
  | "contact.title"
  | "contact.message"
  | "contact.send"
  // footer
  | "footer.rights"
  | "footer.followUs";

type TranslationRecord = Record<TranslationKey, string>;

const en: TranslationRecord = {
  // nav
  "nav.home": "Home",
  "nav.about": "About Us",
  "nav.schemes": "Schemes",
  "nav.centers": "Our Centers",
  "nav.training": "Training",
  "nav.employment": "Employment",
  "nav.loan": "Loan",
  "nav.rewards": "Rewards",
  "nav.news": "News",
  "nav.gallery": "Gallery",
  "nav.downloads": "Downloads",
  "nav.contact": "Contact",
  "nav.more": "More",
  "nav.franchise": "Franchise",
  "nav.faq": "FAQ",
  "nav.ourTeam": "Our Team",
  "nav.ourPartners": "Our Partners",
  "nav.legalDocs": "Legal Documents",
  "nav.wishes": "Wishes",
  "nav.terms": "Terms & Conditions",
  "nav.rules": "Rules & Regulations",
  "nav.complaint": "Complaint",
  "nav.donateNow": "Donate Now",
  "nav.catOrg": "Organization",
  "nav.catSchemes": "Schemes",
  "nav.catTraining": "Training",
  "nav.catMedia": "Media",
  "nav.catInfo": "Info",
  "nav.shgLoan": "SHG Loan",
  "nav.udhyogLoan": "Udhyog Loan",
  "nav.communityCenter": "Community Center",
  // auth
  "auth.login": "Login",
  "auth.signup": "Sign Up",
  "auth.logout": "Logout",
  "auth.dashboard": "Dashboard",
  // home
  "home.heroTitle": "Empowering Women\nAcross India",
  "home.heroSubtitle":
    "Transforming lives through education, skill development, and financial inclusion for women across rural India.",
  "home.heroCta1": "Learn More",
  "home.heroCta2": "Join Us",
  "home.sectionInitiatives": "Our Core Initiatives",
  "home.sectionImpact": "Impact Stories",
  "home.sectionNews": "News & Announcements",
  "home.sectionVideos": "Watch & Learn",
  "home.sectionCenter": "Community Centers",
  "home.sectionCta": "Join the Movement",
  "home.readMore": "Read More",
  "home.viewAll": "View All",
  "home.learnMore": "Learn More",
  "home.applyNow": "Apply Now",
  "home.joinUs": "Join Us",
  "home.contactUs": "Contact Us",
  // common
  "common.submit": "Submit",
  "common.cancel": "Cancel",
  "common.save": "Save",
  "common.edit": "Edit",
  "common.delete": "Delete",
  "common.add": "Add",
  "common.close": "Close",
  "common.search": "Search",
  "common.loading": "Loading...",
  "common.noData": "No data available",
  "common.yes": "Yes",
  "common.no": "No",
  "common.name": "Name",
  "common.email": "Email",
  "common.phone": "Phone",
  "common.address": "Address",
  "common.state": "State",
  "common.district": "District",
  "common.status": "Status",
  "common.date": "Date",
  "common.action": "Action",
  "common.active": "Active",
  "common.inactive": "Inactive",
  "common.details": "Details",
  "common.download": "Download",
  "common.upload": "Upload",
  "common.back": "Back",
  "common.next": "Next",
  "common.pending": "Pending",
  "common.approved": "Approved",
  "common.rejected": "Rejected",
  // about
  "about.title": "About Us",
  "about.mission": "Our Mission",
  "about.vision": "Our Vision",
  "about.leadership": "Our Leadership",
  // schemes
  "schemes.title": "Government Schemes",
  "schemes.eligibility": "Eligibility",
  "schemes.benefits": "Benefits",
  "schemes.apply": "Apply Now",
  // loan
  "loan.title": "Loan Schemes",
  "loan.amount": "Loan Amount",
  "loan.interest": "Interest Rate",
  "loan.tenure": "Tenure",
  "loan.apply": "Apply for Loan",
  "loan.shg": "SHG Loan",
  "loan.udhyog": "Udhyog Loan",
  // training
  "training.title": "Training Programs",
  "training.duration": "Duration",
  "training.enroll": "Enroll Now",
  // employment
  "employment.title": "Employment",
  "employment.partners": "Industry Partners",
  "employment.successStories": "Success Stories",
  // contact
  "contact.title": "Contact Us",
  "contact.message": "Message",
  "contact.send": "Send Message",
  // footer
  "footer.rights": "All Rights Reserved",
  "footer.followUs": "Follow Us",
};

const hi: TranslationRecord = {
  // nav
  "nav.home": "होम",
  "nav.about": "हमारे बारे में",
  "nav.schemes": "योजनाएं",
  "nav.centers": "हमारे केंद्र",
  "nav.training": "प्रशिक्षण",
  "nav.employment": "रोजगार",
  "nav.loan": "ऋण",
  "nav.rewards": "पुरस्कार",
  "nav.news": "समाचार",
  "nav.gallery": "गैलरी",
  "nav.downloads": "डाउनलोड",
  "nav.contact": "संपर्क",
  "nav.more": "और",
  "nav.franchise": "फ्रेंचाइज़",
  "nav.faq": "सामान्य प्रश्न",
  "nav.ourTeam": "हमारी टीम",
  "nav.ourPartners": "हमारे साझेदार",
  "nav.legalDocs": "कानूनी दस्तावेज",
  "nav.wishes": "शुभकामनाएं",
  "nav.terms": "नियम एवं शर्तें",
  "nav.rules": "नियम एवं विनियम",
  "nav.complaint": "शिकायत",
  "nav.donateNow": "अभी दान करें",
  "nav.catOrg": "संस्था",
  "nav.catSchemes": "योजनाएं",
  "nav.catTraining": "प्रशिक्षण",
  "nav.catMedia": "मीडिया",
  "nav.catInfo": "जानकारी",
  "nav.shgLoan": "एसएचजी ऋण",
  "nav.udhyogLoan": "उद्योग ऋण",
  "nav.communityCenter": "सामुदायिक केंद्र",
  // auth
  "auth.login": "लॉगिन",
  "auth.signup": "पंजीकरण",
  "auth.logout": "लॉगआउट",
  "auth.dashboard": "डैशबोर्ड",
  // home
  "home.heroTitle": "भारत भर में\nमहिलाओं को सशक्त बनाना",
  "home.heroSubtitle":
    "ग्रामीण भारत की महिलाओं के लिए शिक्षा, कौशल विकास और वित्तीय समावेशन के माध्यम से जीवन बदलना।",
  "home.heroCta1": "और जानें",
  "home.heroCta2": "हमसे जुड़ें",
  "home.sectionInitiatives": "हमारी मुख्य पहल",
  "home.sectionImpact": "प्रभाव की कहानियां",
  "home.sectionNews": "समाचार एवं घोषणाएं",
  "home.sectionVideos": "देखें और सीखें",
  "home.sectionCenter": "सामुदायिक केंद्र",
  "home.sectionCta": "आंदोलन से जुड़ें",
  "home.readMore": "और पढ़ें",
  "home.viewAll": "सभी देखें",
  "home.learnMore": "और जानें",
  "home.applyNow": "अभी आवेदन करें",
  "home.joinUs": "हमसे जुड़ें",
  "home.contactUs": "संपर्क करें",
  // common
  "common.submit": "जमा करें",
  "common.cancel": "रद्द करें",
  "common.save": "सहेजें",
  "common.edit": "संपादित करें",
  "common.delete": "हटाएं",
  "common.add": "जोड़ें",
  "common.close": "बंद करें",
  "common.search": "खोजें",
  "common.loading": "लोड हो रहा है...",
  "common.noData": "कोई डेटा उपलब्ध नहीं",
  "common.yes": "हाँ",
  "common.no": "नहीं",
  "common.name": "नाम",
  "common.email": "ईमेल",
  "common.phone": "फ़ोन",
  "common.address": "पता",
  "common.state": "राज्य",
  "common.district": "जिला",
  "common.status": "स्थिति",
  "common.date": "तारीख",
  "common.action": "कार्रवाई",
  "common.active": "सक्रिय",
  "common.inactive": "निष्क्रिय",
  "common.details": "विवरण",
  "common.download": "डाउनलोड",
  "common.upload": "अपलोड",
  "common.back": "वापस",
  "common.next": "अगला",
  "common.pending": "लंबित",
  "common.approved": "स्वीकृत",
  "common.rejected": "अस्वीकृत",
  // about
  "about.title": "हमारे बारे में",
  "about.mission": "हमारा मिशन",
  "about.vision": "हमारी दृष्टि",
  "about.leadership": "हमारा नेतृत्व",
  // schemes
  "schemes.title": "सरकारी योजनाएं",
  "schemes.eligibility": "पात्रता",
  "schemes.benefits": "लाभ",
  "schemes.apply": "अभी आवेदन करें",
  // loan
  "loan.title": "ऋण योजनाएं",
  "loan.amount": "ऋण राशि",
  "loan.interest": "ब्याज दर",
  "loan.tenure": "अवधि",
  "loan.apply": "ऋण के लिए आवेदन",
  "loan.shg": "स्वयं सहायता समूह ऋण",
  "loan.udhyog": "उद्योग ऋण",
  // training
  "training.title": "प्रशिक्षण कार्यक्रम",
  "training.duration": "अवधि",
  "training.enroll": "अभी नामांकन करें",
  // employment
  "employment.title": "रोजगार",
  "employment.partners": "उद्योग भागीदार",
  "employment.successStories": "सफलता की कहानियां",
  // contact
  "contact.title": "संपर्क करें",
  "contact.message": "संदेश",
  "contact.send": "संदेश भेजें",
  // footer
  "footer.rights": "सर्वाधिकार सुरक्षित",
  "footer.followUs": "हमें फॉलो करें",
};

const mr: TranslationRecord = {
  // nav
  "nav.home": "मुख्यपृष्ठ",
  "nav.about": "आमच्याबद्दल",
  "nav.schemes": "योजना",
  "nav.centers": "आमची केंद्रे",
  "nav.training": "प्रशिक्षण",
  "nav.employment": "रोजगार",
  "nav.loan": "कर्ज",
  "nav.rewards": "पुरस्कार",
  "nav.news": "बातम्या",
  "nav.gallery": "गॅलरी",
  "nav.downloads": "डाउनलोड",
  "nav.contact": "संपर्क",
  "nav.more": "अधिक",
  "nav.franchise": "फ्रँचायझी",
  "nav.faq": "वारंवार विचारले जाणारे प्रश्न",
  "nav.ourTeam": "आमची टीम",
  "nav.ourPartners": "आमचे भागीदार",
  "nav.legalDocs": "कायदेशीर कागदपत्रे",
  "nav.wishes": "शुभेच्छा",
  "nav.terms": "अटी व शर्ती",
  "nav.rules": "नियम व विनियम",
  "nav.complaint": "तक्रार",
  "nav.donateNow": "आता दान करा",
  "nav.catOrg": "संस्था",
  "nav.catSchemes": "योजना",
  "nav.catTraining": "प्रशिक्षण",
  "nav.catMedia": "माध्यम",
  "nav.catInfo": "माहिती",
  "nav.shgLoan": "बचत गट कर्ज",
  "nav.udhyogLoan": "उद्योग कर्ज",
  "nav.communityCenter": "सामुदायिक केंद्र",
  // auth
  "auth.login": "लॉगिन",
  "auth.signup": "नोंदणी",
  "auth.logout": "लॉगआउट",
  "auth.dashboard": "डॅशबोर्ड",
  // home
  "home.heroTitle": "भारतभर महिलांना\nसशक्त करणे",
  "home.heroSubtitle":
    "ग्रामीण भारतातील महिलांसाठी शिक्षण, कौशल्य विकास आणि आर्थिक समावेशाद्वारे जीवन बदलणे.",
  "home.heroCta1": "अधिक जाणून घ्या",
  "home.heroCta2": "आमच्यात सामील व्हा",
  "home.sectionInitiatives": "आमचे मुख्य उपक्रम",
  "home.sectionImpact": "प्रभावाच्या कहाण्या",
  "home.sectionNews": "बातम्या आणि घोषणा",
  "home.sectionVideos": "पाहा आणि शिका",
  "home.sectionCenter": "सामुदायिक केंद्रे",
  "home.sectionCta": "चळवळीत सहभागी व्हा",
  "home.readMore": "अधिक वाचा",
  "home.viewAll": "सर्व पाहा",
  "home.learnMore": "अधिक जाणून घ्या",
  "home.applyNow": "आता अर्ज करा",
  "home.joinUs": "आमच्यात सामील व्हा",
  "home.contactUs": "संपर्क करा",
  // common
  "common.submit": "सबमिट करा",
  "common.cancel": "रद्द करा",
  "common.save": "जतन करा",
  "common.edit": "संपादित करा",
  "common.delete": "हटवा",
  "common.add": "जोडा",
  "common.close": "बंद करा",
  "common.search": "शोधा",
  "common.loading": "लोड होत आहे...",
  "common.noData": "कोणताही डेटा उपलब्ध नाही",
  "common.yes": "हो",
  "common.no": "नाही",
  "common.name": "नाव",
  "common.email": "ईमेल",
  "common.phone": "फोन",
  "common.address": "पत्ता",
  "common.state": "राज्य",
  "common.district": "जिल्हा",
  "common.status": "स्थिती",
  "common.date": "तारीख",
  "common.action": "कृती",
  "common.active": "सक्रिय",
  "common.inactive": "निष्क्रिय",
  "common.details": "तपशील",
  "common.download": "डाउनलोड",
  "common.upload": "अपलोड",
  "common.back": "मागे",
  "common.next": "पुढे",
  "common.pending": "प्रलंबित",
  "common.approved": "मंजूर",
  "common.rejected": "नाकारले",
  // about
  "about.title": "आमच्याबद्दल",
  "about.mission": "आमचे ध्येय",
  "about.vision": "आमची दृष्टी",
  "about.leadership": "आमचे नेतृत्व",
  // schemes
  "schemes.title": "सरकारी योजना",
  "schemes.eligibility": "पात्रता",
  "schemes.benefits": "लाभ",
  "schemes.apply": "आता अर्ज करा",
  // loan
  "loan.title": "कर्ज योजना",
  "loan.amount": "कर्जाची रक्कम",
  "loan.interest": "व्याजदर",
  "loan.tenure": "कालावधी",
  "loan.apply": "कर्जासाठी अर्ज करा",
  "loan.shg": "स्वयं सहाय्यता गट कर्ज",
  "loan.udhyog": "उद्योग कर्ज",
  // training
  "training.title": "प्रशिक्षण कार्यक्रम",
  "training.duration": "कालावधी",
  "training.enroll": "आता नोंदणी करा",
  // employment
  "employment.title": "रोजगार",
  "employment.partners": "उद्योग भागीदार",
  "employment.successStories": "यशाच्या कहाण्या",
  // contact
  "contact.title": "संपर्क करा",
  "contact.message": "संदेश",
  "contact.send": "संदेश पाठवा",
  // footer
  "footer.rights": "सर्व हक्क राखीव",
  "footer.followUs": "आम्हाला फॉलो करा",
};

const or: TranslationRecord = {
  // nav
  "nav.home": "ହୋମ",
  "nav.about": "ଆମ ବିଷୟରେ",
  "nav.schemes": "ଯୋଜନା",
  "nav.centers": "ଆମ କେନ୍ଦ୍ର",
  "nav.training": "ତାଲିମ",
  "nav.employment": "ନିଯୁକ୍ତି",
  "nav.loan": "ଋଣ",
  "nav.rewards": "ପୁରସ୍କାର",
  "nav.news": "ଖବର",
  "nav.gallery": "ଗ୍ୟାଲେରି",
  "nav.downloads": "ଡାଉନଲୋଡ",
  "nav.contact": "ଯୋଗାଯୋଗ",
  "nav.more": "ଆହୁରି",
  "nav.franchise": "ଫ୍ରାଞ୍ଚାଇଜ",
  "nav.faq": "ସାଧାରଣ ପ୍ରଶ୍ନ",
  "nav.ourTeam": "ଆମ ଦଳ",
  "nav.ourPartners": "ଆମ ସହଭାଗୀ",
  "nav.legalDocs": "ଆଇନ ଦଲିଲ",
  "nav.wishes": "ଶୁଭେଚ୍ଛା",
  "nav.terms": "ନିୟମ ଓ ସର୍ତ",
  "nav.rules": "ନିୟମ ଓ ବିଧି",
  "nav.complaint": "ଅଭିଯୋଗ",
  "nav.donateNow": "ଏବେ ଦାନ କରନ୍ତୁ",
  "nav.catOrg": "ସଂସ୍ଥା",
  "nav.catSchemes": "ଯୋଜନା",
  "nav.catTraining": "ତାଲିମ",
  "nav.catMedia": "ମିଡ଼ିଆ",
  "nav.catInfo": "ସୂଚନା",
  "nav.shgLoan": "ଏସଏଚଜି ଋଣ",
  "nav.udhyogLoan": "ଉଦ୍ୟୋଗ ଋଣ",
  "nav.communityCenter": "ସାମୁଦାୟିକ କେନ୍ଦ୍ର",
  // auth
  "auth.login": "ଲଗଇନ",
  "auth.signup": "ପଞ୍ଜୀକରଣ",
  "auth.logout": "ଲଗଆଉଟ",
  "auth.dashboard": "ଡ୍ୟାଶବୋର୍ଡ",
  // home
  "home.heroTitle": "ଭାରତ ଜୁଡ଼ା\nମହିଳାଙ୍କୁ ସଶକ୍ତ କରିବା",
  "home.heroSubtitle":
    "ଗ୍ରାମୀଣ ଭାରତର ମହିଳାଙ୍କ ପାଇଁ ଶିକ୍ଷା, କୌଶଳ ବିକାଶ ଏବଂ ଆର୍ଥିକ ଅନ୍ତର୍ଭୁକ୍ତି ମାଧ୍ୟମରେ ଜୀବନ ବଦଳାଇବା।",
  "home.heroCta1": "ଆହୁରି ଜାଣନ୍ତୁ",
  "home.heroCta2": "ଆମ ସହ ଯୋଗ ଦିଅନ୍ତୁ",
  "home.sectionInitiatives": "ଆମର ମୁଖ୍ୟ ପ୍ରଚେଷ୍ଟା",
  "home.sectionImpact": "ପ୍ରଭାବ ଗଳ୍ପ",
  "home.sectionNews": "ଖବର ଏବଂ ଘୋଷଣା",
  "home.sectionVideos": "ଦେଖନ୍ତୁ ଏବଂ ଶିଖନ୍ତୁ",
  "home.sectionCenter": "ସାମୁଦାୟିକ କେନ୍ଦ୍ର",
  "home.sectionCta": "ଆନ୍ଦୋଳନରେ ଯୋଗ ଦିଅନ୍ତୁ",
  "home.readMore": "ଆହୁରି ପଢ଼ନ୍ତୁ",
  "home.viewAll": "ସବୁ ଦେଖନ୍ତୁ",
  "home.learnMore": "ଆହୁରି ଜାଣନ୍ତୁ",
  "home.applyNow": "ଏବେ ଆବେଦନ କରନ୍ତୁ",
  "home.joinUs": "ଆମ ସହ ଯୋଗ ଦିଅନ୍ତୁ",
  "home.contactUs": "ଯୋଗାଯୋଗ କରନ୍ତୁ",
  // common
  "common.submit": "ଦାଖଲ କରନ୍ତୁ",
  "common.cancel": "ବାତିଲ",
  "common.save": "ସଞ୍ଚୟ",
  "common.edit": "ସଂପାଦନ",
  "common.delete": "ଡିଲିଟ",
  "common.add": "ଯୋଡ଼ନ୍ତୁ",
  "common.close": "ବନ୍ଦ",
  "common.search": "ଖୋଜନ୍ତୁ",
  "common.loading": "ଲୋଡ ହେଉଛି...",
  "common.noData": "କୌଣସି ଡାଟା ଉପଲବ୍ଧ ନୁହେଁ",
  "common.yes": "ହଁ",
  "common.no": "ନା",
  "common.name": "ନାମ",
  "common.email": "ଇମେଲ",
  "common.phone": "ଫୋନ",
  "common.address": "ଠିକଣା",
  "common.state": "ରାଜ୍ୟ",
  "common.district": "ଜିଲ୍ଲା",
  "common.status": "ସ୍ଥିତି",
  "common.date": "ତାରିଖ",
  "common.action": "କାର୍ଯ୍ୟ",
  "common.active": "ସକ୍ରିୟ",
  "common.inactive": "ନିଷ୍କ୍ରିୟ",
  "common.details": "ବିବରଣ",
  "common.download": "ଡାଉନଲୋଡ",
  "common.upload": "ଅପଲୋଡ",
  "common.back": "ପଛକୁ",
  "common.next": "ପରବର୍ତ୍ତୀ",
  "common.pending": "ଅପେକ୍ଷାରତ",
  "common.approved": "ଅନୁମୋଦିତ",
  "common.rejected": "ପ୍ରତ୍ୟାଖ୍ୟାତ",
  // about
  "about.title": "ଆମ ବିଷୟରେ",
  "about.mission": "ଆମର ଲକ୍ଷ୍ୟ",
  "about.vision": "ଆମର ଦୃଷ୍ଟି",
  "about.leadership": "ଆମର ନେତୃତ୍ୱ",
  // schemes
  "schemes.title": "ସରକାରୀ ଯୋଜନା",
  "schemes.eligibility": "ଯୋଗ୍ୟତା",
  "schemes.benefits": "ଲାଭ",
  "schemes.apply": "ଏବେ ଆବେଦନ କରନ୍ତୁ",
  // loan
  "loan.title": "ଋଣ ଯୋଜନା",
  "loan.amount": "ଋଣ ରାଶି",
  "loan.interest": "ସୁଧ ହାର",
  "loan.tenure": "ଅବଧି",
  "loan.apply": "ଋଣ ପାଇଁ ଆବେଦନ",
  "loan.shg": "ସ୍ୱୟଂ ସହାୟତା ଗୋଷ୍ଠୀ ଋଣ",
  "loan.udhyog": "ଉଦ୍ୟୋଗ ଋଣ",
  // training
  "training.title": "ତାଲିମ କାର୍ଯ୍ୟକ୍ରମ",
  "training.duration": "ଅବଧି",
  "training.enroll": "ଏବେ ଯୋଗ ଦିଅନ୍ତୁ",
  // employment
  "employment.title": "ନିଯୁକ୍ତି",
  "employment.partners": "ଶିଳ୍ପ ସହଭାଗୀ",
  "employment.successStories": "ସଫଳତାର ଗଳ୍ପ",
  // contact
  "contact.title": "ଯୋଗାଯୋଗ କରନ୍ତୁ",
  "contact.message": "ବାର୍ତ୍ତା",
  "contact.send": "ବାର୍ତ୍ତା ପଠାନ୍ତୁ",
  // footer
  "footer.rights": "ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ",
  "footer.followUs": "ଆମକୁ ଫଲୋ କରନ୍ତୁ",
};

const pa: TranslationRecord = {
  // nav
  "nav.home": "ਮੁੱਖ ਪੰਨਾ",
  "nav.about": "ਸਾਡੇ ਬਾਰੇ",
  "nav.schemes": "ਯੋਜਨਾਵਾਂ",
  "nav.centers": "ਸਾਡੇ ਕੇਂਦਰ",
  "nav.training": "ਸਿਖਲਾਈ",
  "nav.employment": "ਰੁਜ਼ਗਾਰ",
  "nav.loan": "ਕਰਜ਼ਾ",
  "nav.rewards": "ਇਨਾਮ",
  "nav.news": "ਖ਼ਬਰਾਂ",
  "nav.gallery": "ਗੈਲਰੀ",
  "nav.downloads": "ਡਾਊਨਲੋਡ",
  "nav.contact": "ਸੰਪਰਕ",
  "nav.more": "ਹੋਰ",
  "nav.franchise": "ਫ੍ਰੈਂਚਾਈਜ਼",
  "nav.faq": "ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ",
  "nav.ourTeam": "ਸਾਡੀ ਟੀਮ",
  "nav.ourPartners": "ਸਾਡੇ ਸਾਂਝੇਦਾਰ",
  "nav.legalDocs": "ਕਾਨੂੰਨੀ ਦਸਤਾਵੇਜ਼",
  "nav.wishes": "ਸ਼ੁਭਕਾਮਨਾਵਾਂ",
  "nav.terms": "ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ",
  "nav.rules": "ਨਿਯਮ ਅਤੇ ਕਾਨੂੰਨ",
  "nav.complaint": "ਸ਼ਿਕਾਇਤ",
  "nav.donateNow": "ਹੁਣੇ ਦਾਨ ਕਰੋ",
  "nav.catOrg": "ਸੰਸਥਾ",
  "nav.catSchemes": "ਯੋਜਨਾਵਾਂ",
  "nav.catTraining": "ਸਿਖਲਾਈ",
  "nav.catMedia": "ਮੀਡੀਆ",
  "nav.catInfo": "ਜਾਣਕਾਰੀ",
  "nav.shgLoan": "ਐਸਐਚਜੀ ਕਰਜ਼ਾ",
  "nav.udhyogLoan": "ਉਦਯੋਗ ਕਰਜ਼ਾ",
  "nav.communityCenter": "ਕਮਿਊਨਿਟੀ ਕੇਂਦਰ",
  // auth
  "auth.login": "ਲੌਗਇਨ",
  "auth.signup": "ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
  "auth.logout": "ਲੌਗਆਉਟ",
  "auth.dashboard": "ਡੈਸ਼ਬੋਰਡ",
  // home
  "home.heroTitle": "ਭਾਰਤ ਭਰ ਵਿੱਚ\nਔਰਤਾਂ ਨੂੰ ਸਸ਼ਕਤ ਕਰਨਾ",
  "home.heroSubtitle":
    "ਪੇਂਡੂ ਭਾਰਤ ਦੀਆਂ ਔਰਤਾਂ ਲਈ ਸਿੱਖਿਆ, ਹੁਨਰ ਵਿਕਾਸ ਅਤੇ ਵਿੱਤੀ ਸਮਾਵੇਸ਼ ਰਾਹੀਂ ਜ਼ਿੰਦਗੀ ਬਦਲਣਾ।",
  "home.heroCta1": "ਹੋਰ ਜਾਣੋ",
  "home.heroCta2": "ਸਾਡੇ ਨਾਲ ਜੁੜੋ",
  "home.sectionInitiatives": "ਸਾਡੀਆਂ ਮੁੱਖ ਪਹਿਲਕਦਮੀਆਂ",
  "home.sectionImpact": "ਪ੍ਰਭਾਵ ਦੀਆਂ ਕਹਾਣੀਆਂ",
  "home.sectionNews": "ਖ਼ਬਰਾਂ ਅਤੇ ਐਲਾਨ",
  "home.sectionVideos": "ਦੇਖੋ ਅਤੇ ਸਿੱਖੋ",
  "home.sectionCenter": "ਕਮਿਊਨਿਟੀ ਕੇਂਦਰ",
  "home.sectionCta": "ਅੰਦੋਲਨ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ",
  "home.readMore": "ਹੋਰ ਪੜ੍ਹੋ",
  "home.viewAll": "ਸਭ ਦੇਖੋ",
  "home.learnMore": "ਹੋਰ ਜਾਣੋ",
  "home.applyNow": "ਹੁਣੇ ਅਰਜ਼ੀ ਦਿਓ",
  "home.joinUs": "ਸਾਡੇ ਨਾਲ ਜੁੜੋ",
  "home.contactUs": "ਸੰਪਰਕ ਕਰੋ",
  // common
  "common.submit": "ਜਮ੍ਹਾਂ ਕਰੋ",
  "common.cancel": "ਰੱਦ ਕਰੋ",
  "common.save": "ਸੇਵ ਕਰੋ",
  "common.edit": "ਸੰਪਾਦਿਤ ਕਰੋ",
  "common.delete": "ਮਿਟਾਓ",
  "common.add": "ਜੋੜੋ",
  "common.close": "ਬੰਦ ਕਰੋ",
  "common.search": "ਖੋਜੋ",
  "common.loading": "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
  "common.noData": "ਕੋਈ ਡੇਟਾ ਉਪਲਬਧ ਨਹੀਂ",
  "common.yes": "ਹਾਂ",
  "common.no": "ਨਹੀਂ",
  "common.name": "ਨਾਮ",
  "common.email": "ਈਮੇਲ",
  "common.phone": "ਫ਼ੋਨ",
  "common.address": "ਪਤਾ",
  "common.state": "ਰਾਜ",
  "common.district": "ਜ਼ਿਲ੍ਹਾ",
  "common.status": "ਸਥਿਤੀ",
  "common.date": "ਤਾਰੀਖ਼",
  "common.action": "ਕਾਰਵਾਈ",
  "common.active": "ਸਰਗਰਮ",
  "common.inactive": "ਅਕਿਰਿਆਸ਼ੀਲ",
  "common.details": "ਵੇਰਵੇ",
  "common.download": "ਡਾਊਨਲੋਡ",
  "common.upload": "ਅਪਲੋਡ",
  "common.back": "ਵਾਪਸ",
  "common.next": "ਅਗਲਾ",
  "common.pending": "ਬਕਾਇਆ",
  "common.approved": "ਮਨਜ਼ੂਰ",
  "common.rejected": "ਰੱਦ",
  // about
  "about.title": "ਸਾਡੇ ਬਾਰੇ",
  "about.mission": "ਸਾਡਾ ਮਿਸ਼ਨ",
  "about.vision": "ਸਾਡੀ ਦ੍ਰਿਸ਼ਟੀ",
  "about.leadership": "ਸਾਡੀ ਲੀਡਰਸ਼ਿਪ",
  // schemes
  "schemes.title": "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ",
  "schemes.eligibility": "ਯੋਗਤਾ",
  "schemes.benefits": "ਲਾਭ",
  "schemes.apply": "ਹੁਣੇ ਅਰਜ਼ੀ ਦਿਓ",
  // loan
  "loan.title": "ਕਰਜ਼ਾ ਯੋਜਨਾਵਾਂ",
  "loan.amount": "ਕਰਜ਼ੇ ਦੀ ਰਕਮ",
  "loan.interest": "ਵਿਆਜ਼ ਦਰ",
  "loan.tenure": "ਮਿਆਦ",
  "loan.apply": "ਕਰਜ਼ੇ ਲਈ ਅਰਜ਼ੀ",
  "loan.shg": "ਸਵੈ ਸਹਾਇਤਾ ਗਰੁੱਪ ਕਰਜ਼ਾ",
  "loan.udhyog": "ਉਦਯੋਗ ਕਰਜ਼ਾ",
  // training
  "training.title": "ਸਿਖਲਾਈ ਪ੍ਰੋਗਰਾਮ",
  "training.duration": "ਮਿਆਦ",
  "training.enroll": "ਹੁਣੇ ਦਾਖ਼ਲ ਹੋਵੋ",
  // employment
  "employment.title": "ਰੁਜ਼ਗਾਰ",
  "employment.partners": "ਉਦਯੋਗ ਸਾਂਝੇਦਾਰ",
  "employment.successStories": "ਸਫ਼ਲਤਾ ਦੀਆਂ ਕਹਾਣੀਆਂ",
  // contact
  "contact.title": "ਸੰਪਰਕ ਕਰੋ",
  "contact.message": "ਸੁਨੇਹਾ",
  "contact.send": "ਸੁਨੇਹਾ ਭੇਜੋ",
  // footer
  "footer.rights": "ਸਾਰੇ ਅਧਿਕਾਰ ਸੁਰੱਖਿਅਤ",
  "footer.followUs": "ਸਾਨੂੰ ਫ਼ੌਲੋ ਕਰੋ",
};

const bn: TranslationRecord = {
  // nav
  "nav.home": "হোম",
  "nav.about": "আমাদের সম্পর্কে",
  "nav.schemes": "প্রকল্প",
  "nav.centers": "আমাদের কেন্দ্র",
  "nav.training": "প্রশিক্ষণ",
  "nav.employment": "কর্মসংস্থান",
  "nav.loan": "ঋণ",
  "nav.rewards": "পুরস্কার",
  "nav.news": "সংবাদ",
  "nav.gallery": "গ্যালারি",
  "nav.downloads": "ডাউনলোড",
  "nav.contact": "যোগাযোগ",
  "nav.more": "আরো",
  "nav.franchise": "ফ্র্যাঞ্চাইজি",
  "nav.faq": "সাধারণ প্রশ্ন",
  "nav.ourTeam": "আমাদের দল",
  "nav.ourPartners": "আমাদের অংশীদার",
  "nav.legalDocs": "আইনি নথি",
  "nav.wishes": "শুভেচ্ছা",
  "nav.terms": "নিয়ম ও শর্ত",
  "nav.rules": "নিয়ম ও বিধি",
  "nav.complaint": "অভিযোগ",
  "nav.donateNow": "এখনই দান করুন",
  "nav.catOrg": "সংস্থা",
  "nav.catSchemes": "প্রকল্প",
  "nav.catTraining": "প্রশিক্ষণ",
  "nav.catMedia": "মিডিয়া",
  "nav.catInfo": "তথ্য",
  "nav.shgLoan": "এসএইচজি ঋণ",
  "nav.udhyogLoan": "উদ্যোগ ঋণ",
  "nav.communityCenter": "কমিউনিটি সেন্টার",
  // auth
  "auth.login": "লগইন",
  "auth.signup": "নিবন্ধন",
  "auth.logout": "লগআউট",
  "auth.dashboard": "ড্যাশবোর্ড",
  // home
  "home.heroTitle": "ভারত জুড়ে\nমহিলাদের ক্ষমতায়ন",
  "home.heroSubtitle":
    "গ্রামীণ ভারতের মহিলাদের জন্য শিক্ষা, দক্ষতা উন্নয়ন এবং আর্থিক অন্তর্ভুক্তির মাধ্যমে জীবন পরিবর্তন।",
  "home.heroCta1": "আরো জানুন",
  "home.heroCta2": "আমাদের সাথে যোগ দিন",
  "home.sectionInitiatives": "আমাদের মূল উদ্যোগ",
  "home.sectionImpact": "প্রভাবের গল্প",
  "home.sectionNews": "সংবাদ ও ঘোষণা",
  "home.sectionVideos": "দেখুন এবং শিখুন",
  "home.sectionCenter": "কমিউনিটি সেন্টার",
  "home.sectionCta": "আন্দোলনে যোগ দিন",
  "home.readMore": "আরো পড়ুন",
  "home.viewAll": "সব দেখুন",
  "home.learnMore": "আরো জানুন",
  "home.applyNow": "এখনই আবেদন করুন",
  "home.joinUs": "আমাদের সাথে যোগ দিন",
  "home.contactUs": "যোগাযোগ করুন",
  // common
  "common.submit": "জমা দিন",
  "common.cancel": "বাতিল",
  "common.save": "সংরক্ষণ",
  "common.edit": "সম্পাদনা",
  "common.delete": "মুছুন",
  "common.add": "যোগ করুন",
  "common.close": "বন্ধ করুন",
  "common.search": "অনুসন্ধান",
  "common.loading": "লোড হচ্ছে...",
  "common.noData": "কোনো ডেটা পাওয়া যায়নি",
  "common.yes": "হ্যাঁ",
  "common.no": "না",
  "common.name": "নাম",
  "common.email": "ইমেইল",
  "common.phone": "ফোন",
  "common.address": "ঠিকানা",
  "common.state": "রাজ্য",
  "common.district": "জেলা",
  "common.status": "অবস্থা",
  "common.date": "তারিখ",
  "common.action": "কার্যক্রম",
  "common.active": "সক্রিয়",
  "common.inactive": "নিষ্ক্রিয়",
  "common.details": "বিবরণ",
  "common.download": "ডাউনলোড",
  "common.upload": "আপলোড",
  "common.back": "পিছনে",
  "common.next": "পরবর্তী",
  "common.pending": "অপেক্ষমান",
  "common.approved": "অনুমোদিত",
  "common.rejected": "প্রত্যাখ্যাত",
  // about
  "about.title": "আমাদের সম্পর্কে",
  "about.mission": "আমাদের লক্ষ্য",
  "about.vision": "আমাদের দৃষ্টিভঙ্গি",
  "about.leadership": "আমাদের নেতৃত্ব",
  // schemes
  "schemes.title": "সরকারি প্রকল্প",
  "schemes.eligibility": "যোগ্যতা",
  "schemes.benefits": "সুবিধা",
  "schemes.apply": "এখনই আবেদন করুন",
  // loan
  "loan.title": "ঋণ প্রকল্প",
  "loan.amount": "ঋণের পরিমাণ",
  "loan.interest": "সুদের হার",
  "loan.tenure": "মেয়াদ",
  "loan.apply": "ঋণের জন্য আবেদন",
  "loan.shg": "স্বনির্ভর গোষ্ঠী ঋণ",
  "loan.udhyog": "উদ্যোগ ঋণ",
  // training
  "training.title": "প্রশিক্ষণ কার্যক্রম",
  "training.duration": "সময়কাল",
  "training.enroll": "এখনই ভর্তি হন",
  // employment
  "employment.title": "কর্মসংস্থান",
  "employment.partners": "শিল্প অংশীদার",
  "employment.successStories": "সাফল্যের গল্প",
  // contact
  "contact.title": "যোগাযোগ করুন",
  "contact.message": "বার্তা",
  "contact.send": "বার্তা পাঠান",
  // footer
  "footer.rights": "সর্বস্বত্ব সংরক্ষিত",
  "footer.followUs": "আমাদের অনুসরণ করুন",
};

export const translations: Record<Language, TranslationRecord> = {
  en,
  hi,
  mr,
  or,
  pa,
  bn,
};

export function t(lang: Language, key: TranslationKey): string {
  return translations[lang][key] ?? translations.en[key] ?? key;
}
