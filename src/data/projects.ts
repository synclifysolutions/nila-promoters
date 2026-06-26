import mahalakshmilogo from "@/assets/logos/mahalakshmi-logo.png";
import spmLogo from "@/assets/logos/spm-logo.png";
import senchinalogo from "@/assets/logos/senchina-logo.png";
import salith from "@/assets/logos/salith-logo.png";
import anugraghalogo from "@/assets/logos/anugragha-logo.png";
import megalogo from "@/assets/logos/mega-logo.png";
import kurinjilogo from "@/assets/logos/kurunji-logo.png";
import pamlogo from "@/assets/logos/pam-logo.png";
import megacitylogo from "@/assets/logos/mega-logo.png";
import anugragha1 from "@/assets/logos/anugraha-1.jpg";
import anugragha2 from "@/assets/logos/anugraha-2.jpg";
import anugragha3 from "@/assets/logos/anugraha-3.jpg";
import anugragha4 from "@/assets/logos/anugraha-4.jpg";
import anugragha5 from "@/assets/logos/anugraha-5.jpg";
import anugragha6 from "@/assets/logos/anugraha-6.jpg";
import anugragha7 from "@/assets/logos/anugraha-7.jpg";
import anugragha8 from "@/assets/logos/anugraha-8.jpg";
import anugragha9 from "@/assets/logos/anugraha-9.jpg";
import anugraghaLayout from "@/assets/anugragha-layout.jpg";
import commingSoon from "@/assets/coming-soon.webp";

export type ProjectStatus = "Completed" | "Ongoing" | "Upcoming";

export interface Project {
  slug: string;            // used in the URL: /projects/<slug>
  name: string;
  nameTa?: string;         // Localized Tamil Name
  location: string;
  locationTa?: string;     // Localized Tamil Location
  description: string;
  descriptionTa?: string;  // Localized Tamil Description
  status: ProjectStatus;
  imageLabel: string;
  highlight: string;
  highlightTa?: string;    // Localized Tamil Highlight
  cta?: string;
  ctaTa?: string;          // Localized Tamil CTA Label
  logo?: string;

  // ---- Detail-page-only fields ----
  address?: string;
  addressTa?: string;      // Localized Tamil Address
  phone?: string;          
  whatsapp?: string;       
  features?: string[];     
  featuresTa?: string[];   // Localized Tamil Features
  gallery?: string[];      
  layoutMapImage?: string; 
  layoutMapPdf?: string;   
}

export const COMPANY_PHONE = "+919876543210";
export const COMPANY_WHATSAPP = "919876543210";

// --- Fallback default feature modules to clear ts(2305) compilation errors ---
export const DEFAULT_FEATURES = [
  "DTCP & RERA Approved Layout",
  "100% Clear & Marketable Title",
  "Wide Black-top Roads",
  "Underground Drainage",
  "Individual EB Connection",
  "24-Hour Security",
];

export const DEFAULT_FEATURES_TA = [
  "DTCP & RERA அங்கீகரிக்கப்பட்ட உள்கட்டமைப்பு",
  "100% வில்லங்கமற்ற பட்டா",
  "அகலமான தார் சாலைகள்",
  "பூமிக்கடியில் வடிகால் வசதி",
  "தனிநபர் மின்சார இணைப்பு (EB)",
  "24 மணி நேர பாதுகாப்பு வசதி",
];

export const ONGOING: Project[] = [
  {
    slug: "anugraha-avenue",
    name: "Anugraha Avenue",
    nameTa: "அனுக்கிரஹா அவென்யூ",
    location: "Pudukkottai Main Road, Thanjavur",
    locationTa: "புதுக்கோட்டை மெயின் ரோடு, தஞ்சாவூர்",
    description: "DTCP & RERA approved premium gated community strategically located on the Thanjavur–Pudukkottai NH Road. Residential plots with modern infrastructure, water facilities, security, and excellent connectivity to educational institutions and hospitals.",
    descriptionTa: "தஞ்சாவூர்-புதுக்கோட்டை தேசிய நெடுஞ்சாலையில் மூலோபாய ரீதியாக அமைந்துள்ள DTCP & RERA அங்கீகரிக்கப்பட்ட பிரீமியம் கதவடைப்பு மனைப்பிரிவு. நவீன உள்கட்டமைப்பு, குடிநீர் வசதி, பாதுகாப்பு மற்றும் கல்வி நிறுவனங்கள் மற்றும் மருத்துவமனைகளுக்கு சிறந்த போக்குவரத்து இணைப்பு கொண்ட குடியிருப்பு மனைகள்.",
    status: "Ongoing",
    imageLabel: "Anugraha Avenue",
    highlight: "DTCP & RERA Approved Plots Available",
    highlightTa: "DTCP & RERA அங்கீகரிக்கப்பட்ட மனைகள் விற்பனைக்கு உள்ளன",
    cta: "Enquire Now",
    ctaTa: "இப்போதே விசாரிக்கவும்",
    logo: anugraghalogo,
    address: "Anugraha Avenue, Thanjavur–Pudukkottai Main Road, Tamil Nadu",
    addressTa: "அனுக்கிரஹா அவென்யூ, தஞ்சாவூர்-புதுக்கோட்டை மெயின் ரோடு, தமிழ்நாடு",
    features: [
      "DTCP & RERA Approved Layout",
      "Located on Thanjavur–Pudukkottai NH Road",
      "Near Kings College & Major Educational Institutions",
      "24ft, 30ft & 33ft Wide Roads",
      "Residential Neighborhood with Existing Houses",
      "60,000 Litre Drinking Water Facility",
      "Individual EB Connection for Every Plot",
      "24×7 Security Service",
      "CCTV Surveillance Throughout the Layout",
      "Elevated Land with No Water Stagnation",
      "Arch Entrance & Well-Planned Infrastructure",
      "Close to Schools, Colleges & Hospitals",
    ],
    featuresTa: [
      "DTCP & RERA அங்கீகரிக்கப்பட்ட உள்கட்டமைப்பு",
      "தஞ்சாவூர்-புதுக்கோட்டை தேசிய நெடுஞ்சாலையில் அமைந்துள்ளது",
      "கிங்ஸ் கல்லூரி & முக்கிய கல்வி நிறுவனங்களுக்கு அருகில்",
      "24 அடி, 30 அடி & 33 அடி அகல சாலைகள்",
      "ஏற்கனவே வீடுகள் உள்ள சிறந்த குடியிருப்பு பகுதி",
      "60,000 லிட்டர் கொள்ளளவு கொண்ட குடிநீர் வசதி",
      "ஒவ்வொரு மனைக்கும் தனிநபர் மின்சார இணைப்பு (EB)",
      "24×7 சுழற்சி முறை பாதுகாப்பு சேவை",
      "முழு மனைப்பிரிவிலும் CCTV கேமரா கண்காணிப்பு",
      "தண்ணீர் தேங்காத உயர்தர மேட்டு நிலம்",
      "நுழைவு வளைவு & நன்கு திட்டமிடப்பட்ட கட்டமைப்பு",
      "பள்ளிகள், கல்லூரிகள் & மருத்துவமனைகளுக்கு மிக அருகில்",
    ],
    gallery: [anugragha1, anugragha2, anugragha3, anugragha4, anugragha5, anugragha6, anugragha7, anugragha8, anugragha9],
    layoutMapImage: anugraghaLayout,
    layoutMapPdf: anugraghaLayout,
  },
];

export const COMPLETED: Project[] = [
  {
    slug: "sri-mahalakshmi-nagar",
    name: "Sri Mahalakshmi Nagar",
    nameTa: "ஸ்ரீ மகாலட்சுமி நகர்",
    location: "Needamangalam Main Road, Pattukottai Road, Kumbakonam",
    locationTa: "நீலமங்கலம் மெயின் ரோடு, பட்டுக்கோட்டை ரோடு, கும்பகோணம்",
    description: "A premium DTCP approved plotted layout delivering well-planned residential plots to families seeking peaceful living.",
    descriptionTa: "அமைதியான வாழ்க்கையை விரும்பும் குடும்பங்களுக்காக நன்கு திட்டமிடப்பட்ட, DTCP அங்கீகாரம் பெற்ற பிரீமியம் குடியிருப்பு மனைகள்.",
    status: "Completed",
    imageLabel: "Mahalakshmi Nagar",
    highlight: "100% Plots Sold",
    highlightTa: "100% மனைகள் விற்கப்பட்டன",
    cta: "View Details",
    ctaTa: "விவரங்களை காண்க",
    logo: mahalakshmilogo,
    address: "Needamangalam Main Road, Pattukottai Road, Kumbakonam, Tamil Nadu",
    addressTa: "நீலமங்கலம் மெயின் ரோடு, பட்டுக்கோட்டை ரோடு, கும்பகோணம், தமிழ்நாடு",
    features: [
      "DTCP & RERA Approved Gated Layout",
      "30ft & 23ft Wide Black-top Roads",
      "24-Hour Security",
      "Individual EB Connections",
      "Drinking Water Facility",
      "Well-Developed Residential Area",
      "Near Neelamangalam Main Road",
      "Arch Entrance & Street Lights",
    ],
    featuresTa: [
      "DTCP & RERA அங்கீகரிக்கப்பட்ட பாதுகாப்பான கதவடைப்பு மனைப்பிரிவு",
      "30 அடி மற்றும் 23 அடி அகல தார் சாலைகள்",
      "24 மணி நேர பாதுகாப்பு வசதி",
      "தனிநபர் மின்சார இணைப்பு (EB)",
      "குடிநீர் வசதி",
      "நன்கு வளர்ச்சியடைந்த குடியிருப்புப் பகுதி",
      "நீலமங்கலம் பிரதான சாலை அருகில்",
      "வடிவமைக்கப்பட்ட நுழைவு வளைவு & தெரு விளக்குகள்",
    ],
  },
  {
    slug: "spm-garden",
    name: "SPM Garden",
    nameTa: "SPM கார்டன்",
    location: "Pulavarnatham, Valangaiman Taluk, Kumbakonam",
    locationTa: "புலவர்நத்தம், வலங்கைமான் தாலுகா, கும்பகோணம்",
    description: "Thoughtfully designed layout with wide roads, greenery, and all essential amenities for comfortable community living.",
    descriptionTa: "அகலமான சாலைகள், பசுமையான சூழல் மற்றும் வசதியான சமூக வாழ்க்கைக்குத் தேவையான அனைத்து அத்தியாவசிய வசதிகளுடன் வடிவமைக்கப்பட்ட மனைப்பிரிவு.",
    status: "Completed",
    imageLabel: "SPM Garden",
    highlight: "Fully Handed Over",
    highlightTa: "முழுமையாக ஒப்படைக்கப்பட்டது",
    cta: "View Details",
    ctaTa: "விவரங்களை காண்க",
    logo: spmLogo,
    address: "Pulavarnatham, Valangaiman Taluk, Kumbakonam, Tamil Nadu",
    addressTa: "புலவர்நத்தம், வலங்கைமான் தாலுகா, கும்பகோணம், தமிழ்நாடு",
  },
  {
    slug: "sanjeeena-nagar",
    name: "Sanjeena Nagar",
    nameTa: "சஞ்சீனா நகர்",
    location: "Annalagraharam, Kumbakonam",
    locationTa: "அன்னலக்ஷ்மிபுரம், கும்பகோணம்",
    description: "DTCP approved residential plots in a prime location, offering families a secure and value-driven investment.",
    descriptionTa: "முக்கிய இருப்பிடத்தில் அமைந்துள்ள DTCP அங்கீகரிக்கப்பட்ட குடியிருப்பு மனைகள், குடும்பங்களுக்கு பாதுகாப்பான மற்றும் மதிப்புமிக்க முதலீடு.",
    status: "Completed",
    imageLabel: "Sanjeeena Nagar",
    highlight: "100% Plots Sold",
    highlightTa: "100% மனைகள் விற்கப்பட்டன",
    cta: "View Details",
    ctaTa: "விவரங்களை காண்க",
    logo: senchinalogo,
    address: "Annalagraharam, Kumbakonam, Tamil Nadu",
    addressTa: "அன்னலக்ஷ்மிபுரம், கும்பகோணம், தமிழ்நாடு",
  },
  {
    slug: "salih-nagar",
    name: "Salih Nagar",
    nameTa: "ஸாலித் நகர்",
    location: "kukkur, nachiyar kovil salai, kumbakonam",
    locationTa: "கூகூர், நாச்சியார் கோவில் சாலை, கும்பகோணம்",
    description: "A serene plotted community offering excellent connectivity and clear legal title for every plot owner.",
    descriptionTa: "சிறந்த போக்குவரத்து இணைப்பு மற்றும் ஒவ்வொரு மனை உரிமையாளருக்கும் தெளிவான சட்டப்பூர்வ ஆவணங்களை வழங்கும் அமைதியான குடியிருப்புப் பகுதி.",
    status: "Completed",
    imageLabel: "Salith Nagar",
    highlight: "Fully Handed Over",
    highlightTa: "முழுமையாக ஒப்படைக்கப்பட்டது",
    cta: "View Details",
    ctaTa: "விவரங்களை காண்க",
    logo: salith,
    address: "kukkur, nachiyar kovil salai, kumbakonam, Tamil Nadu",
    addressTa: "கூகூர், நாச்சியார் கோவில் சாலை, கும்பகோணம், தமிழ்நாடு",
  },
  {
    slug: "kurinji-nagar",
    name: "Kurinji Nagar",
    nameTa: "குறிஞ்சி நகர்",
    location: "Thanjavur - Pudukottai bypass road",
    locationTa: "தஞ்சாவூர்-புதுக்கோட்டை புறவழிச்சாலை",
    description: "A serene plotted community offering excellent connectivity and clear legal title for every plot owner.",
    descriptionTa: "சிறந்த போக்குவரத்து இணைப்பு மற்றும் ஒவ்வொரு மனை உரிமையாளருக்கும் தெளிவான சட்டப்பூர்வ ஆவணங்களை வழங்கும் அமைதியான குடியிருப்புப் பகுதி.",
    status: "Completed",
    imageLabel: "Kurinji Nagar",
    highlight: "Fully Handed Over",
    highlightTa: "முழுமையாக ஒப்படைக்கப்பட்டது",
    cta: "View Details",
    ctaTa: "விவரங்களை காண்க",
    logo: kurinjilogo,
    address: "Thanjavur - Pudukottai bypass road, Tamil Nadu",
    addressTa: "தஞ்சாவூர்-புதுக்கோட்டை புறவழிச்சாலை, தமிழ்நாடு",
  },
  {
    slug: "pam-nagar",
    name: "PAM Nagar",
    nameTa: "PAM நகர்",
    location: "Melavathur, (Mangudi Main Road) Near Panchayat Board Office",
    locationTa: "மேலவழுத்தூர், (மாங்குடி மெயின்ரோட்டில்) பஞ்சாயத்து போர்டு அலுவலகம் அருகில்",
    description: "A serene plotted community offering excellent connectivity and clear legal title for every plot owner.",
    descriptionTa: "சிறந்த போக்குவரத்து இணைப்பு மற்றும் ஒவ்வொரு மனை உரிமையாளருக்கும் தெளிவான சட்டப்பூர்வ ஆவணங்களை வழங்கும் அமைதியான குடியிருப்புப் பகுதி.",
    status: "Completed",
    imageLabel: "PAM Nagar",
    highlight: "Fully Handed Over",
    highlightTa: "முழுமையாக ஒப்படைக்கப்பட்டது",
    cta: "View Details",
    ctaTa: "விவரங்களை காண்க",
    logo: pamlogo,
    address: "Melavathur, (Mangudi Main Road) Near Panchayat Board Office, Tamil Nadu",
    addressTa: "மேலவழுத்தூர், (மாங்குடி மெயின்ரோட்டில்) பஞ்சாயத்து போர்டு அலுவலகம் அருகில்,தமிழ்நாடு ",
  },
  {
    slug: "mega-city",
    name: "Mega City",
    nameTa: "மெகா சிட்டி",
    location: "On the Avoor main road, near Patteswaram",
    locationTa: "கும்பகோணத்தில் இருந்து 10 கி.மீ தூரத்தில் பட்டீஸ்வரம் அருகில், ஆவூர் மெயின் ரோட்டில்",
    description: "A serene plotted community offering excellent connectivity and clear legal title for every plot owner.",
    descriptionTa: "சிறந்த போக்குவரத்து இணைப்பு மற்றும் ஒவ்வொரு மனை உரிமையாளருக்கும் தெளிவான சட்டப்பூர்வ ஆவணங்களை வழங்கும் அமைதியான குடியிருப்புப் பகுதி.",
    status: "Completed",
    imageLabel: "Mega City",
    highlight: "Fully Handed Over",
    highlightTa: "முழுமையாக ஒப்படைக்கப்பட்டது",
    cta: "View Details",
    ctaTa: "விவரங்களை காண்க",
    logo: megacitylogo,
    address: "On the Avoor main road, near Patteswaram, Tamil Nadu",
    addressTa: "கும்பகோணத்தில் இருந்து 10 கி.மீ தூரத்தில் பட்டீஸ்வரம் அருகில், ஆவூர் மெயின் ரோட்டில்,தமிழ்நாடு ",
  },
];



export const UPCOMING: Project[] = [
  {
    slug: "london-city",
    name: "London City",
    nameTa: "லண்டன் சிட்டி",
    location: "Virupatchipuram, Valingaman ",
    locationTa: "விருப்பாச்சிபுரம் வலங்கைமான்",
    description: "A landmark pre-launch development inspired by world-class planning, offering premium plots at early-bird pricing.",
    descriptionTa: "உலகத்தரம் வாய்ந்த உள்கட்டமைப்பு திட்டமிடலால் ஈர்க்கப்பட்டு, ஆரம்பகால சலுகை விலையில் பிரீமியம் மனைகளை வழங்கும் ஒரு வரலாற்றுச் சிறப்புமிக்க புதிய மனைப்பிரிவு.",
    status: "Upcoming",
    imageLabel: "comingSoon",
    highlight: "Pre-Launch — Register Interest",
    highlightTa: "முன்பதிவு தொடங்குகிறது — உங்கள் விருப்பத்தை பதிவு செய்யவும்",
    cta: "Register Interest",
    ctaTa: "விருப்பத்தை பதிவு செய்க",
    logo: commingSoon,
    address: "Virupatchipuram, Valingaman, Tamil Nadu",
    addressTa: "விருப்பாச்சிபுரம் வலங்கைமான், தமிழ்நாடு",
  },
  {
    slug: "Baakiyalakshmi nagar",
    name: "Baakiyalakshmi nagar",
    nameTa: "பாக்கியலட்சுமி நகர்",
    location: "Annalagraharam, Kumbakonam",
    locationTa: "அன்னலக்ஷ்மிபுரம், கும்பகோணம்",
    description: "A peaceful upcoming layout in the growing Analagragharam belt — ideal for families and long-term investors.",
    descriptionTa: "வளர்ந்து வரும் அனலாக்ரஹாரம் பகுதியில் அமையவிருக்கும் ஒரு அமைதியான குடியிருப்பு மனைப்பிரிவு — குடும்பங்களுக்கும் நீண்ட கால முதலீட்டாளர்களுக்கும் ஏற்றது.",
    status: "Upcoming",
    imageLabel: "comingSoon",
    highlight: "Coming Soon",
    highlightTa: "விரைவில் வருகிறது",
    cta: "Register Interest",
    ctaTa: "விருப்பத்தை பதிவு செய்க",
    logo: commingSoon,
      address: "Annalagraharam, Kumbakonam, Tamil Nadu",
    addressTa: "அன்னலக்ஷ்மிபுரம், கும்பகோணம், தமிழ்நாடு",
  },
];

export const ALL_PROJECTS: Project[] = [...ONGOING, ...COMPLETED, ...UPCOMING];