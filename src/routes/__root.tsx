import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type ReactNode, createContext, useContext, useState } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

// ==========================================
// 1. LIGHTWEIGHT TRANSLATION SETUP
// ==========================================
type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

// Simple global translation lookup
const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.projects": "Projects",
    "notfound.title": "404",
    "notfound.subtitle": "Page not found",
    "notfound.desc": "The page you're looking for doesn't exist.",
    "notfound.btn": "Go home",
    // Ad Popup
    "ad.call": "📞 Call Now",
    "ad.whatsapp": "💬 WhatsApp",
    "ad.close": "Close",
    // Hero
    "hero.badge": "DTCP · RERA Approved · Est. 2020",
    "hero.title": "Where Your Dream Begins with",
    "hero.desc": "Premium DTCP & RERA-approved plots for families who demand clear titles, prime locations, and absolute transparency.",
    "hero.btnExplore": "Explore Projects",
    "hero.btnVisit": "Book a Site Visit",
    "hero.scroll": "Scroll",
    "trust.dtcp": "DTCP Approved",
    "trust.rera": "RERA Certified",
    "trust.title": "100% Clear Title",
    "trust.charges": "No Hidden Charges",
    // Stats
    "stats.sub": "Our Track Record",
    "stats.title": "Numbers That Speak Trust",
    "stats.families": "Happy Families",
    "stats.projects": "Projects Delivered",
    "stats.years": "Years of Trust",
    "stats.titles": "Clear Title Plots",
    // Why Choose
    "why.sub": "Our Promise",
    "why.title1": "Why Families Trust",
    "why.f1.title": "DTCP & RERA Approved",
    "why.f1.desc": "Every layout cleared by Tamil Nadu's town planning and real-estate regulators.",
    "why.f2.title": "100% Clear Title",
    "why.f2.desc": "Legally verified, encumbrance-free documents on every single plot we sell.",
    "why.f3.title": "Prime Locations",
    "why.f3.desc": "Hand-picked micro-markets across Kumbakonam with the strongest growth fundamentals.",
    "why.f4.title": "Flexible Payment Plans",
    "why.f4.desc": "Tailored installment structures that fit family budgets — no hidden charges.",
    "why.f5.title": "Trusted Since 2020",
    "why.f5.desc": "Five years of consistent delivery and 500+ families who chose us as their partner.",
    "why.f6.title": "Transparent Dealings",
    "why.f6.desc": "What we promise on paper is exactly what we deliver on the ground.",
    // Portfolio
    "portfolio.sub": "Portfolio",
    "portfolio.title1": "Our Signature",
    "portfolio.title2": "Projects",
    "portfolio.desc": "A curated selection of layouts that define quality, trust, and lasting value.",
    "portfolio.btnViewAll": "View All Projects",
    // Gallery
    "gallery.sub": "Site Gallery",
    "gallery.title1": "Glimpses from the",
    "gallery.title2": "Ground",
    "gallery.desc": "Hover to pause · Click any photo to view fullscreen",
    "gallery.pausedHint": "Click to open · Arrow keys to navigate",
    "gallery.hint": "← → keys to navigate · Esc to close",
    // Reviews
    "reviews.sub": "Voices of Trust",
    "reviews.title1": "What Our",
    "reviews.title2": "Families",
    "reviews.title3": "Say",
    "reviews.desc": "Over 500 families have trusted us with their most important investment.",
    "reviews.avg": "Average Rating",
    "reviews.verified": "Verified Reviews",
    "reviews.r1.name": "Ramesh Kumar",
    "reviews.r1.loc": "Kumbakonam",
    "reviews.r1.quote": "From documentation to registration, Nila Promoters made the entire process effortless. My plot in Mahalakshmi Nagar was the best decision for my family.",
    "reviews.r2.name": "Lakshmi Priya",
    "reviews.r2.loc": "Senchina",
    "reviews.r2.quote": "True to their word on every commitment. The Sanjana Nagar layout is exactly as promised — clear titles, wide roads, peaceful location.",
    "reviews.r3.name": "Suresh Babu",
    "reviews.r3.loc": "Thanjavur",
    "reviews.r3.quote": "I evaluated five developers before choosing Nila. Their transparency and DTCP approvals stood out. Couldn't be happier.",
    // CTA
    "cta.sub": "Take the Next Step",
    "cta.title1": "Ready to Own Your Dream Plot in",
    "cta.title2": "Kumbakonam?",
    "cta.desc": "Schedule a complimentary site visit. Walk the land, ask every question, and decide with complete confidence.",
    "cta.btnVisit": "Book a Site Visit Today",
    "cta.btnView": "View All Projects",
    // Footer Keys
    "footer.brandDesc": "Premium DTCP & RERA-approved plots in Kumbakonam since 2020.",
    "footer.hNavigate": "Navigate",
    "footer.hProjects": "Projects",
    "footer.hContact": "Contact",
    "footer.exploreAll": "Explore all",
    "footer.addressLine1": "Smart Plaza, OSJ Abdeen Nagar,",
    "footer.addressLine2": "Chennai Main Rd, Kumbakonam – 612002",
    "footer.p1": "Mahalakshmi Nagar",
    "footer.p2": "SPM Garden",
    "footer.p3": "Sanjana Nagar",
    "footer.p4": "Anugragah Avenue",
    "footer.p5": "London City",
    "footer.rights": "All rights reserved.",
    "footer.devBy": "Developed by",
    // About Page Banners & Story
    "about.bannerTitle": "About Nila Promoters",
    "about.bannerDesc": "Kumbakonam's most trusted DTCP & RERA approved plot developer since 2020.",
    "about.storySub": "Our Story",
    "about.storyTitle": "A Promise Rooted in Kumbakonam",
    "about.storyP1": "was founded in 2020 with a single, powerful commitment — to make land ownership in Kumbakonam transparent, accessible, and truly valuable.",
    "about.storyP2": "Every plot we sell carries a clear legal title, government approvals, and the promise of long-term investment growth — backed by five years of unwavering trust.",
    "about.est": "Est. 2020",
    // Leadership
    "about.leadSub": "Leadership",
    "about.leadTitle1": "The Vision Behind",
    "about.mdName": "Mr.R. Mahesh",
    "about.mdTitle": "Managing Director, Nila Promoters",
    "about.mdQuote1": "At",
    "about.mdQuote2": "we don't just sell land — we build futures, one plot at a time.",
    // Journey
    "about.journeySub": "Our Journey",
    "about.journeyTitle": "Five Years. One Promise.",
    "about.m1.t": "Kurunji Nagar", "about.m1.d": "First plotted layout launched in Kumbakonam.",
    "about.m2.t": "Mahalakshmi Nagar & SPM Garden", "about.m2.d": "100+ families served across two landmark projects.",
    "about.m3.t": "Mega City Launched", "about.m3.d": "Expanded to new micro-markets with Mega City.",
    "about.m4.t": "Saleh Nagar Delivered", "about.m4.d": "300+ happy families milestone crossed.",
    "about.m5.t": "PAM Nagar & Sanjeeena Nagar Launched", "about.m5.d": "Scaling new heights across Kumbakonam.",
    "about.m6.t": "SPM Garden Launched", "about.m6.d": "Scaling new heights across Kumbakonam.",
    "about.m7.t": "Anugraha Avenue Launched", "about.m7.d": "Our flagship ongoing project.",
    // Vision & Mission
    "about.driveSub": "What Drives Us",
    "about.visTitle": "Our Vision", "about.visDesc": "To be Kumbakonam's most trusted land developer — where every plot is a promise of prosperity, legal clarity, and lifelong value.",
    "about.misTitle": "Our Mission", "about.misDesc": "To deliver DTCP & RERA approved plots at prime locations across Kumbakonam with complete transparency, fair pricing, and unwavering customer support.",
    // Core Values
    "about.valuesSub": "What Guides Us",
    "about.valuesTitle1": "Our Core", "about.valuesTitle2": "Values",
    "about.valuesDesc": "Six principles that shape every decision we make.",
    "about.v1.t": "Transparency", "about.v1.d": "Every transaction is open, honest, and documented.",
    "about.v2.t": "Integrity", "about.v2.d": "We do what we say, always.",
    "about.v3.t": "Quality", "about.v3.d": "Premium plots with zero compromise on standards.",
    "about.v4.t": "Customer First", "about.v4.d": "Your trust is the foundation we build on.",
    "about.v5.t": "Legal Compliance", "about.v5.d": "100% DTCP & RERA approved, every time.",
    "about.v6.t": "Community Growth", "about.v6.d": "Building neighbourhoods, not just plots.",
    "about.footerTag": "Nila Promoters — Est. 2020",
    // Contact Page Keys
    "contact.heroSub": "Let's Talk Land",
    "contact.heroTitle1": "Every great plot starts with",
    "contact.heroTitle2": "one conversation.",
    "contact.heroDesc": "Call, message, or walk into either of our Kumbakonam offices.",
    "contact.linkCall": "Call Us",
    "contact.linkWa": "WhatsApp",
    "contact.linkMail": "Email",
    "contact.formSub": "Send an Enquiry",
    "contact.formTitle1": "Tell us what you're",
    "contact.formTitle2": "looking for",
    "contact.formDesc": "Share a few details and our team will respond within 24 hours.",
    "contact.fName": "Full Name",
    "contact.fPhone": "Phone Number",
    "contact.fEmail": "Email",
    "contact.fInterest": "Interested In",
    "contact.optGeneral": "General Enquiry",
    "contact.fMsg": "Message",
    "contact.fMsgPlaceholder": "Tell us about your plot requirements...",
    "contact.btnSubmit": "Send Enquiry",
    "contact.formSuccess": "Thank you! Your enquiry has been received. We'll be in touch shortly.",
    "contact.hoursTitle": "Working Hours",
    "contact.hoursWeekdays": "Monday – Saturday",
    "contact.hoursSunday": "Sunday",
    "contact.hoursAppointment": "By Appointment",
    "contact.trustDesc": "Five years of clear titles and on-the-ground transparency.",
    "contact.officesTitle1": "Two doors,",
    "contact.officesTitle2": "always open",
    "contact.office1Name": "Smart Plaza Office",
    "contact.office2Name": "Sarangapani Road Office",
    "contact.btnDirections": "Get Directions",
    "contact.mapSub": "Find Us",
    "contact.mapTitle": "On the map",
    "contact.btnMapOpen": "Open in Google Maps",
    // Projects Page Keys
    "projects.bannerTitle": "Our Portfolio",
    "projects.bannerDesc": "Explore Nila Promoters' completed, ongoing, and upcoming DTCP & RERA approved plotted developments across Kumbakonam.",
    "projects.tabAll": "All Projects",
    "projects.tabOngoing": "Ongoing",
    "projects.tabCompleted": "Completed",
    "projects.tabUpcoming": "Upcoming",
    // Project Dynamic Detail Screen Keys
    "details.notFound": "Project Not Found",
    "details.backBtn": "Back to Projects",
    "details.subHeader": "Project Details",
    "details.mapClick": "🔍 Click to View Fullscreen",
    "details.mapHeader": "Layout Map",
    "details.mapReset": "Reset",
    "details.mapHint": "Scroll to zoom · Drag to pan · Press Esc to close",
    "details.mapTitle1": "Layout",
    "details.mapTitle2": "Map",
    "details.mapDownload": "Download Layout Map",
    "nav.bookVisit": "Book a Visit",
    "nav.bookVisitMobile": "Book Visit",
  },
  ta: {
    "nav.home": "முகப்பு",
    "nav.about": "எங்களைப் பற்றி",
    "nav.contact": "தொடர்பு",
    "nav.projects": "திட்டங்கள்",
    "notfound.title": "404",
    "notfound.subtitle": "பக்கம் காணப்படவில்லை",
    "notfound.desc": "நீங்கள் தேடும் பக்கம் இங்கு இல்லை.",
    "notfound.btn": "முகப்பு பக்கத்திற்கு செல்ல",
    // Ad Popup
    "ad.call": "📞 இப்போது அழைக்கவும்",
    "ad.whatsapp": "💬 வாட்ஸ்அப்",
    "ad.close": "மூடுக",
    // Hero
    "hero.badge": "DTCP · RERA அங்கீகாரம் · துவங்கப்பட்ட ஆண்டு 2020",
    "hero.title": "உங்கள் கனவு இல்லம் நனவாகும் இடம்",
    "hero.desc": "முறையான ஆவணங்கள், சிறந்த இருப்பிடம் மற்றும் முழுமையான வெளிப்படைத்தன்மையை விரும்பும் குடும்பங்களுக்கான பிரீமியம் DTCP மற்றும் RERA அங்கீகரிக்கப்பட்ட மனைகள்.",
    "hero.btnExplore": "திட்டங்களை ஆராய்க",
    "hero.btnVisit": "இடத்தை பார்வையிட முன்பதிவு செய்க",
    "hero.scroll": "கீழே செல்லவும்",
    "trust.dtcp": "DTCP அங்கீகாரம் பெற்றது",
    "trust.rera": "RERA சான்றளிக்கப்பட்டது",
    "trust.title": "100% வில்லங்கமற்ற பட்டா",
    "trust.charges": "மறைமுக கட்டணங்கள் இல்லை",
    // Stats
    "stats.sub": "எங்களது சாதனைப் பயணம்",
    "stats.title": "நம்பிக்கையின் எண்கள்",
    "stats.families": "மகிழ்ச்சியான குடும்பங்கள்",
    "stats.projects": "நிறைவடைந்த திட்டங்கள்",
    "stats.years": "ஆண்டுகால நம்பிக்கை",
    "stats.titles": "தெளிவான தலைப்பு மனைகள்",
    // Why Choose
    "why.sub": "எங்களது வாக்குறுதி",
    "why.title1": "குடும்பங்கள் ஏன் எங்களை நம்புகிறார்கள்?",
    "why.f1.title": "DTCP & RERA அங்கீகாரம்",
    "why.f1.desc": "ஒவ்வொரு வரைபட அமைப்பும் தமிழக அரசின் நகர் ஊரமைப்பு மற்றும் ரியல் எஸ்டேட் ஒழுங்குமுறை குழுமத்தால் அங்கீகரிக்கப்பட்டது.",
    "why.f2.title": "100% தெளிவான பட்டா",
    "why.f2.desc": "நாங்கள் விற்கும் ஒவ்வொரு தனி மனையிலும் சட்டப்பூர்வமாக சரிபார்க்கப்பட்ட, வில்லங்கமற்ற ஆவணங்கள்.",
    "why.f3.title": "முக்கிய இருப்பிடங்கள்",
    "why.f3.desc": "வளர்ச்சி மற்றும் எதிர்கால முதலீட்டு மதிப்புமிக்க கும்பகோணத்தின் முக்கிய பகுதிகள் தேர்வு செய்யப்பட்டுள்ளன.",
    "why.f4.title": "எளிதான தவணை முறைகள்",
    "why.f4.desc": "குடும்ப பட்ஜெட்டுக்கு ஏற்றவாறு வடிவமைக்கப்பட்ட தவணை முறைகள் — மறைமுக கட்டணங்கள் ஏதுமில்லை.",
    "why.f5.title": "5+ ஆண்டுகால நம்பகத்தன்மை",
    "why.f5.desc": "ஐந்து ஆண்டுகளாக துல்லியமான நிர்வாகம் மற்றும் எங்களை தேர்ந்தெடுத்த 500-க்கும் மேற்பட்ட மகிழ்ச்சியான குடும்பங்கள்.",
    "why.f6.title": "வெளிப்படையான நடைமுறை",
    "why.f6.desc": "பத்திரத்தில் நாங்கள் வாக்குறுதி அளிப்பது எதுவோ, அதை அப்படியே களத்தில் வழங்குகிறோம்.",
    // Portfolio
    "portfolio.sub": "எங்களது பணிகள்",
    "portfolio.title1": "எங்களின் முக்கிய",
    "portfolio.title2": "திட்டங்கள்",
    "portfolio.desc": "தரம், நம்பிக்கை மற்றும் நீடித்த மதிப்பை வரையறுக்கும் வீட்டுமனைகளின் தொகுப்பு.",
    "portfolio.btnViewAll": "அனைத்து திட்டங்களையும் காண்க",
    // Gallery
    "gallery.sub": "புகைப்பட தொகுப்பு",
    "gallery.title1": "களத்தில் இருந்து நேரடி",
    "gallery.title2": "காட்சிகள்",
    "gallery.desc": "நிறுத்துவதற்கு கர்சரை வைக்கவும் · முழுத்திரையில் காண ஏதேனும் ஒரு புகைப்படத்தை கிளிக் செய்யவும்",
    "gallery.pausedHint": "திறக்க கிளிக் செய்க · வழிநடத்த அம்பு விசைகளைப் பயன்படுத்தவும்",
    "gallery.hint": "நகர்த்த ← → விசைகள் · மூட Esc விசை",
    // Reviews
    "reviews.sub": "வாடிக்கையாளர்களின் குரல்",
    "reviews.title1": "எங்கள்",
    "reviews.title2": "குடும்பங்கள்",
    "reviews.title3": "கூறுவது என்ன?",
    "reviews.desc": "500-க்கும் மேற்பட்ட குடும்பங்கள் தங்களின் மிக முக்கியமான முதலீட்டிற்கு எங்களை நம்பியுள்ளனர்.",
    "reviews.avg": "சராசரி மதிப்பீடு",
    "reviews.verified": "சரிபார்க்கப்பட்ட மதிப்புரைகள்",
    "reviews.r1.name": "ரமேஷ் குமார்",
    "reviews.r1.loc": "கும்பகோணம்",
    "reviews.r1.quote": "ஆவணங்கள் தயாரிப்பதில் இருந்து பத்திரம் பதிவு செய்வது வரை, நிலா புரோமோட்டர்ஸ் முழு செயல்முறையையும் எளிதாக்கினர். மகாலட்சுமி நகரில் மனை வாங்கியது எனது குடும்பத்திற்கு நான் எடுத்த மிகச் சிறந்த முடிவு.",
    "reviews.r2.name": "லெட்சுமி பிரியா",
    "reviews.r2.loc": "செஞ்சின",
    "reviews.r2.quote": "கொடுத்த வாக்குறுதிகள் அனைத்தையும் நிறைவேற்றியுள்ளனர். சஞ்சனா நகர் வரைபடம் சொன்னபடியே அமைந்துள்ளது — தெளிவான ஆவணங்கள், அகலமான சாலைகள், அமைதியான சூழல்.",
    "reviews.r3.name": "சுரேஷ் பாபு",
    "reviews.r3.loc": "தஞ்சாவூர்",
    "reviews.r3.quote": "நிலா நிறுவனத்தை தேர்ந்தெடுப்பதற்கு முன் ஐந்து நிறுவனங்களை ஒப்பிட்டுப் பார்த்தேன். அவர்களின் வெளிப்படைத்தன்மையும் DTCP அங்கீகாரமும் என்னை கவர்ந்தது. மிகவும் மகிழ்ச்சி.",
    // CTA
    "cta.sub": "அடுத்த அடியை எடுத்து வையுங்கள்",
    "cta.title1": "கும்பகோணத்தில் உங்கள் கனவு மனையை சொந்தமாக்க",
    "cta.title2": "தயாரா?",
    "cta.desc": "இலவசமாக இடத்தை பார்வையிட முன்பதிவு செய்யுங்கள். நிலத்தை நேரடியாகப் பார்த்து, உங்கள் சந்தேகங்களைத் தெளிவுபடுத்தி, முழு நம்பிக்கையுடன் முடிவெடுங்கள்.",
    "cta.btnVisit": "இன்றே இடத்தை பார்வையிட முன்பதிவு செய்க",
    "cta.btnView": "அனைத்து திட்டங்களையும் பார்க்க",

    // Footer Keys
    "footer.brandDesc": "2020 முதல் கும்பகோணத்தில் பிரீமியம் DTCP மற்றும் RERA அங்கீகரிக்கப்பட்ட வீட்டுமனைகள்.",
    "footer.hNavigate": "வழிசெலுத்தல்",
    "footer.hProjects": "திட்டங்கள்",
    "footer.hContact": "தொடர்பு கொள்ள",
    "footer.exploreAll": "அனைத்தையும் ஆராய்க",
    "footer.addressLine1": "ஸ்மார்ட் பிளாசா, OSJ ஆப்தீன் நகர்,",
    "footer.addressLine2": "சென்னை மெயின் ரோடு, கும்பகோணம் - 612002",
    "footer.p1": "மகாலட்சுமி நகர்",
    "footer.p2": "SPM கார்டன்",
    "footer.p3": "சஞ்சனா நகர்",
    "footer.p4": "அனுக்கிரஹா அவென்யூ",
    "footer.p5": "லண்டன் சிட்டி",
    "footer.rights": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    "footer.devBy": "வடிவமைக்கப்பட்டது",
    // About Page Banners & Story
    "about.bannerTitle": "நிலா புரோமோட்டர்ஸ் பற்றி",
    "about.bannerDesc": "2020 முதல் கும்பகோணத்தில் மிகவும் நம்பகமான DTCP மற்றும் RERA அங்கீகரிக்கப்பட்ட வீட்டுமனை மேம்பாட்டாளர்.",
    "about.storySub": "எங்களது வரலாறு",
    "about.storyTitle": "கும்பகோணத்தில் வேரூன்றிய ஒரு உன்னத வாக்குறுதி",
    "about.storyP1": "கும்பகோணத்தில் நிலம் வாங்குவதை வெளிப்படையானதாகவும், எளியமுறையிலும், உண்மையான மதிப்புமிக்கதாகவும் மாற்ற வேண்டும் என்ற ஒரே ஒரு உறுதியான நோக்கத்துடன் 2020 இல் தொடங்கப்பட்டது.",
    "about.storyP2": "நாங்கள் விற்கும் ஒவ்வொரு மனையும் தெளிவான சட்டப்பூர்வ ஆவணங்கள், அரசு அங்கீகாரங்கள் மற்றும் நீண்ட கால முதலீட்டு வளர்ச்சியின் உத்தரவாதத்தைக் கொண்டுள்ளது — இது ஐந்து ஆண்டுகால அசைக்க முடியாத நம்பிக்கையால் ஆதரிக்கப்படுகிறது.",
    "about.est": "தொடக்கம் 2020",
    // Leadership
    "about.leadSub": "தலைமைத்துவம்",
    "about.leadTitle1": "பின்னால் இருக்கும் தொலைநோக்கு பார்வை",
    "about.mdName": "திரு. R. மகேஷ்",
    "about.mdTitle": "நிர்வாக இயக்குனர், நிலா புரோமோட்டர்ஸ்",
    "about.mdQuote1": "நாங்கள்",
    "about.mdQuote2": "வெறும் நிலத்தை மட்டும் விற்கவில்லை — ஒவ்வொரு மனையின் மூலமும் மக்களின் எதிர்காலத்தை உருவாக்குகிறோம்.\"",
    // Journey
    "about.journeySub": "எங்களது பயணம்",
    "about.journeyTitle": "ஐந்து ஆண்டுகள். ஒரு வாக்குறுதி.",
    "about.m1.t": "குறிஞ்சி நகர்", "about.m1.d": "கும்பகோணத்தில் தொடங்கப்பட்ட எங்களின் முதல் வீட்டுமனைத் திட்டம்.",
    "about.m2.t": "மகாலட்சுமி நகர் & SPM கார்டன்", "about.m2.d": "இரண்டு முக்கிய திட்டங்கள் மூலம் 100-க்கும் மேற்பட்ட குடும்பங்கள் பயனடைந்தனர்.",
    "about.m3.t": "மெகா சிட்டி அறிமுகம்", "about.m3.d": "மெகா சிட்டி திட்டத்தின் மூலம் புதிய சந்தைகளில் எங்களது எல்லையை விரிவுபடுத்தினோம்.",
    "about.m4.t": "சாலே நகர் ஒப்படைப்பு", "about.m4.d": "300-க்கும் மேற்பட்ட மகிழ்ச்சியான குடும்பங்கள் என்ற மைல்கல்லைக் கடந்தோம்.",
    "about.m5.t": "PAM நகர் & சஞ்சீனா நகர் தொடக்கம்", "about.m5.d": "கும்பகோணம் முழுவதும் புதிய உயரங்களை எட்டியது.",
    "about.m6.t": "SPM கார்டன் விரிவாக்கம்", "about.m6.d": "கும்பகோணம் முழுவதும் புதிய வீட்டுமனைகள் விற்பனை.",
    "about.m7.t": "அனுக்கிரஹா அவென்யூ", "about.m7.d": "தற்போது சிறப்பாக நடைபெற்று வரும் எங்களது முதன்மைத் திட்டம்.",
    // Vision & Mission
    "about.driveSub": "எங்களை இயக்குவது எது?",
    "about.visTitle": "எங்களது தொலைநோக்கு", "about.visDesc": "கும்பகோணத்தின் மிகவும் நம்பகமான நில மேம்பாட்டாளராக விளங்குவதே எங்களின் நோக்கம் — இங்கு ஒவ்வொரு மனையும் செழிப்பு, சட்டத் தெளிவு மற்றும் வாழ்நாள் மதிப்பின் வாக்குறுதியாகும்.",
    "about.misTitle": "எங்களது லட்சியம்", "about.misDesc": "கும்பகோணம் முழுவதும் முதன்மையான இடங்களில் DTCP மற்றும் RERA அங்கீகரிக்கப்பட்ட மனைகளை முழுமையான வெளிப்படைத்தன்மை, நியாயமான விலை மற்றும் அசைக்க முடியாத வாடிக்கையாளர் ஆதரவுடன் வழங்குவது.",
    // Core Values
    "about.valuesSub": "எங்களை வழிநடத்துவது எது?",
    "about.valuesTitle1": "எங்களது முக்கிய", "about.valuesTitle2": "நெறிமுறைகள்",
    "about.valuesDesc": "நாங்கள் எடுக்கும் ஒவ்வொரு முடிவையும் வடிவமைக்கும் ஆறு முக்கிய கொள்கைகள்.",
    "about.v1.t": "வெளிப்படைத்தன்மை", "about.v1.d": "ஒவ்வொரு பரிவர்த்தனையும் திறந்த, நேர்மையான மற்றும் ஆவணப்படுத்தப்பட்ட ஒன்றாகும்.",
    "about.v2.t": "நேர்மை", "about.v2.d": "நாங்கள் சொல்வதை எப்போதும் செய்கிறோம், எந்நிலையிலும்.",
    "about.v3.t": "தரம்", "about.v3.d": "தரக் கட்டுப்பாடுகளில் எந்தவித சமரசமும் இல்லாத பிரீமியம் மனைகள்.",
    "about.v4.t": "வாடிக்கையாளருக்கு முன்னுரிமை", "about.v4.d": "உங்களது நம்பிக்கையே நாங்கள் கட்டியெழுப்பும் அடித்தளம்.",
    "about.v5.t": "சட்டப்பூர்வ இணக்கம்", "about.v5.d": "எப்போதும் 100% DTCP மற்றும் RERA அங்கீகரிக்கப்பட்ட ஆவணங்கள்.",
    "about.v6.t": "சமூக வளர்ச்சி", "about.v6.d": "வெறும் மனைகளை மட்டுமல்லாமல், சிறந்த குடியிருப்புப் பகுதிகளை உருவாக்குகிறோம்.",
    "about.footerTag": "நிலா புரோமோட்டர்ஸ் — துவங்கப்பட்ட ஆண்டு 2020",
    // Contact Page Keys
    "contact.heroSub": "வீட்டுமனைகளைப் பற்றி பேசுவோம்",
    "contact.heroTitle1": "ஒவ்வொரு சிறந்த நிலமும் ஒரு",
    "contact.heroTitle2": "சிறு உரையாடலுடன் தொடங்குகிறது.",
    "contact.heroDesc": "எங்களை அழைக்கவும், குறுஞ்செய்தி அனுப்பவும் அல்லது கும்பகோணத்தில் உள்ள எங்களது அலுவலகத்திற்கு நேரடியாக வரவும்.",
    "contact.linkCall": "அழைக்க",
    "contact.linkWa": "வாட்ஸ்அப்",
    "contact.linkMail": "மின்னஞ்சல்",
    "contact.formSub": "விசாரணை படிவம்",
    "contact.formTitle1": "உங்களுக்கு என்ன தேவை என்பதை",
    "contact.formTitle2": "எங்களிடம் கூறுங்கள்",
    "contact.formDesc": "சில விபரங்களைப் பகிர்ந்துகொள்ளுங்கள், எங்களது குழு 24 மணி நேரத்திற்குள் உங்களைத் தொடர்பு கொள்ளும்.",
    "contact.fName": "முழு பெயர்",
    "contact.fPhone": "தொலைபேசி எண்",
    "contact.fEmail": "மின்னஞ்சல் முகவரி",
    "contact.fInterest": "விருப்பமுள்ள திட்டம்",
    "contact.optGeneral": "பொதுவான விசாரணை",
    "contact.fMsg": "செய்தி",
    "contact.fMsgPlaceholder": "உங்களது வீட்டுமனைத் தேவைகளைப் பற்றி எழுதவும்...",
    "contact.btnSubmit": "விசாரணையை அனுப்பുക",
    "contact.formSuccess": "நன்றி! உங்களது விசாரணை எங்களுக்குக் கிடைத்துள்ளது. விரைவில் உங்களைத் தொடர்பு கொள்கிறோம்.",
    "contact.hoursTitle": "வேலை நேரங்கள்",
    "contact.hoursWeekdays": "திங்கள் – சனிக்கிழமை",
    "contact.hoursSunday": "ஞாயிற்றுக்கிழமை",
    "contact.hoursAppointment": "முன்பதிவு மூலம் மட்டும்",
    "contact.trustDesc": "ஐந்து ஆண்டுகால வில்லங்கமற்ற ஆவணங்கள் மற்றும் களத்தின் நேரடி வெளிப்படைத்தன்மை.",
    "contact.officesTitle1": "எங்களது இரு அலுவலகங்களும்,",
    "contact.officesTitle2": "உங்களை வரவேற்க தயாராக உள்ளன",
    "contact.office1Name": "ஸ்மார்ட் பிளாசா அலுவலகம்",
    "contact.office2Name": "சாரங்கபாணி ரோடு அலுவலகம்",
    "contact.btnDirections": "வழித்தடத்தை அறிய",
    "contact.mapSub": "இருப்பிடம்",
    "contact.mapTitle": "வரைபடத்தில் காண்க",
    "contact.btnMapOpen": "கூகுள் மேப்பில் திறக்க",
    // Projects Page Keys
    "projects.bannerTitle": "எங்களது திட்டங்கள்",
    "projects.bannerDesc": "கும்பகோணம் முழுவதும் நிறைவடைந்த, தற்போதைய மற்றும் வரவிருக்கும் பிரீமியம் வீட்டுமனை திட்டங்களை ஆராயுங்கள்.",
    "projects.tabAll": "அனைத்து மனைகள்",
    "projects.tabOngoing": "விற்பனையில் உள்ளவை",
    "projects.tabCompleted": "நிறைவடைந்தவை",
    "projects.tabUpcoming": "வரவிருப்பவை",
    // Project Dynamic Detail Screen Keys
    "details.notFound": "திட்டம் கண்டறியப்படவில்லை",
    "details.backBtn": "திட்டங்கள் பக்கத்திற்கு செல்ல",
    "details.subHeader": "திட்ட விவரங்கள்",
    "details.mapClick": "🔍 முழுத்திரையில் பார்க்க கிளிக் செய்யவும்",
    "details.mapHeader": "மனைப்பிரிவு வரைபடம்",
    "details.mapReset": "மீட்டமை",
    "details.mapHint": "பெரிதாக்க ஸ்க்ரோல் செய்யவும் · நகர்த்த டிராக் செய்யவும் · மூட Esc விசையை அழுத்தவும்",
    "details.mapTitle1": "மனைப்பிரிவு",
    "details.mapTitle2": "வரைபடம்",
    "details.mapDownload": "வரைபடத்தை பதிவிறக்கம் செய்ய",
    "nav.bookVisit": "இடத்தை பார்வையிட",
    "nav.bookVisitMobile": "பதிவு செய்க",
  }
};

function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('site_lang');
      return (saved === 'en' || saved === 'ta') ? saved : 'en';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('site_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ta' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ==========================================
// 2. COMPONENTS & ROUTE DEFINITIONS
// ==========================================
function NotFoundComponent() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-navy">{t('notfound.title')}</h1>
        <h2 className="mt-4 text-xl font-semibold">{t('notfound.subtitle')}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t('notfound.desc')}</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-gold px-5 py-2 text-sm font-semibold text-navy"
        >
          {t('notfound.btn')}
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-navy"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nila Promoters — Premium DTCP & RERA Approved Plots in Kumbakonam" },
      { name: "description", content: "Nila Promoters is a DTCP & RERA approved premium plot developer in Kumbakonam, Tamil Nadu. Clear-title residential plots since 2020." },
      { name: "author", content: "Nila Promoters" },
      { property: "og:title", content: "Nila Promoters — Premium Plots in Kumbakonam" },
      { property: "og:description", content: "DTCP & RERA approved plotted developments in prime Kumbakonam locations." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Nila Promoters" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <InnerHtmlShell>{children}</InnerHtmlShell>
    </LanguageProvider>
  );
}

// Inner shell handles binding context state directly to the core <html> tag
function InnerHtmlShell({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  return (
    <html lang={language}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function PageWrapper() {
  const router = useRouter();
  const pathname = router.state.location.pathname;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <PageWrapper />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </QueryClientProvider>
  );
}