// Company information and static data for AA Uganda

export const companyInfo = {
  name: "Automobile Association of Uganda",
  shortName: "AA Uganda",
  founded: "1955",
  address: {
    street: "Plot 4 Old Port Bell Rd",
    city: "Kampala",
    country: "Uganda",
    coordinates: {
      lat: 0.3476,
      lng: 32.6204,
    },
  },
  contact: {
    phone: "+256 414 250 362",
    email: "info@aauganda.co.ug",
    website: "www.aauganda.co.ug",
  },
  social: {
    facebook: "https://facebook.com/aauganda",
    twitter: "https://twitter.com/aauganda",
    linkedin: "https://linkedin.com/company/aauganda",
    instagram: "https://instagram.com/aauganda",
  },
  mission: "To provide reliable motoring solutions by responding to members' needs while ensuring organizational growth and excellence in service delivery.",
  vision: "To be the leading motoring organization in Uganda, providing comprehensive automotive services and promoting road safety across the nation.",
  values: [
    "Excellence in Service",
    "Integrity and Trust",
    "Innovation and Growth",
    "Customer Satisfaction",
    "Safety First",
  ],
};

export interface NavigationItem {
  label: string;
  path: string;
  submenu?: NavigationSubItem[];
}

export interface NavigationSubItem {
  label: string;
  path: string;
  icon?: string;
}

export const navigationItems: NavigationItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { 
    label: "Services", 
    path: "/services",
    submenu: [
      { label: "Vehicle Valuation", path: "/services/vehicle-valuation", icon: "Assessment" },
      { label: "Fleet Management", path: "/services/fleet-management", icon: "DirectionsCar" },
      { label: "Rescue Services", path: "/services/rescue-services", icon: "BuildCircle" },
      { label: "Vehicle Inspection", path: "/services/vehicle-inspection", icon: "Search" },
      { label: "Insurance Services", path: "/services/insurance-services", icon: "Security" },
      { label: "Automotive Advisory", path: "/services/automotive-advisory", icon: "SupportAgent" },
      { label: "Membership", path: "/services/membership", icon: "CardMembership" },
    ]
  },
  { label: "IDP", path: "/idp" },
  { label: "Contact Us", path: "/contact" },
];

export const heroContent = {
  title: "Your Trusted Partner on Uganda's Roads",
  subtitle: "For over 65 years, AA Uganda has been providing reliable motoring solutions, driving education, and rescue services across Uganda.",
  ctaText: "Apply for IDP",
  ctaLink: "/membership",
  backgroundImage: "/images/hero-bg.jpg",
  features: [
    "24/7 Rescue Services",
    "Professional Driving School",
    "Comprehensive Insurance",
    "Expert Automotive Advice",
  ],
};

export default {
  companyInfo,
  navigationItems,
  heroContent,
};
