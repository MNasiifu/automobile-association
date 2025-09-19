
import fiaImage from '../assets/images/FIA.jpeg';
import type {  NavItem } from '../types/navigation';
import felixImg from '../assets/images/people/Felix.jpeg';
import edirisaImg from '../assets/images/people/Idrisi-AAU.jpeg';
import maureenImg from '../assets/images/people/Maureen.jpeg';
import richardImg from '../assets/images/people/Richard.jpeg';
import robinaImg from '../assets/images/people/Robina.jpeg';
import margretImg from '../assets/images/people/Margret.jpeg';

// Person type and management array
export type Person = {
  name: string;
  role: string;
  img?: string;
  category?: string;
};

export const companyInfo = {
  name: "Automobile Association of Uganda",
  phrase: "Inspring Mobility",
  description: "AA Uganda is a leading motoring organization in Uganda, offering a wide range of services including roadside assistance, driving education, insurance, and travel services.",
  shortName: "AA Uganda",
  founded: 1986,
  address: {
    street: "Plot 4 Old Portbell Road Suite 8",
    city: "Kampala",
    country: "Uganda",
    postalCode: "P.O. Box 1459",
    coordinates: {
      lat: 0.3476,
      lng: 32.6204,
    },
  },
  contact: {
    phone: "+256752760252 | +256776760252",
    emergency: {
      phone: "+256772366004",
      name: "Mr. Richard Ssewagudde",
    },
    email: "odongkara@aau.co.ug",
    website: "www.aauganda.co.ug",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100054503438804",
    twitter: "https://x.com/AUTOMOBILEASSO1",
  },
  mission: "To provide reliable motoring solutions by responding to members' needs while ensuring organizational growth and excellence in service delivery.",
  vision: "Founded to offer reliable motoring solutions by responding to members' needs while taking into consideration the club's growth.",
  values: [
    "Excellence in Service",
    "Integrity and Trust",
    "Innovation and Growth",
    "Customer Satisfaction",
    "Safety First",
  ],
};



export const management: Person[] = [
  {
    name: 'FELIX ODONGKARA CANDIDA',
    role: 'President',
    img: felixImg,
    category: 'executive',
  },
  {
    name: 'HAJI EDIRISA NSUBUGA',
    role: 'Secretary General',
    img: edirisaImg,
    category: 'executive',
  },
  {
    name: 'MAUREEN BYARUGABA',
    role: 'Accountant',
    img: maureenImg,
    category: 'senior-staff',
  },
  {
    name: 'MAGRATE ISIKO ',
    role: 'Manager Membership and Marketing',
    img: margretImg,
    category: 'staff',
  },
  {
    name: 'RICHARD SSEWAGUDDE',
    role: 'Rescue Manager',
    img: richardImg,
    category: 'staff',
  },
  {
    name: 'Robiina Grace Namagembe ',
    role: 'Front desk  officer',
    img: robinaImg,
    category: 'staff',
  }
];

export const servicesNavItems: ReadonlyArray<NavItem> = [
  { label: "Vehicle Valuation", path: "/services/vehicle-valuation" },
      { label: "Fleet Management", path: "/services/fleet-management" },
      { label: "Rescue Services", path: "/services/rescue-services" },
      { label: "Vehicle Inspection", path: "/services/vehicle-inspection" },
      { label: "Insurance Services", path: "/services/insurance-services" },
      { label: "Automotive Advisory", path: "/services/automotive-advisory" },
];

export const navigationItems: ReadonlyArray<NavItem> = [
  { label: 'Home', path: '/' },
  {
    label: 'IDP',
    path: '#',
    route: '/idp/about',
    children: [
      { label: 'About IDP', path: '/idp/about', icon: 'Info' },
      { label: 'Apply for IDP', path: '/idp/apply', icon: 'PostAdd' },
      { label: 'Verify IDP', path: '/idp/verify', icon: 'VerifiedUser' },
    ],
  },
  {
    label: 'Membership',
    path: '/membership',
  },

  {
    label: 'Driving School',
    path: '#',
    route: '/driving-school/about',
    children: [
      { label: 'About the School', path: '/driving-school/about', icon: 'School' },
      { label: 'Refresher Courses', path: '/driving-school/refresher', icon: 'Replay' },
    ],
  },

  {
    label: 'Our Services',
    path: '#',
    skip: true,
    children: [
      { label: "Vehicle Valuation", path: "/services/vehicle-valuation", icon: "Assessment" },
      { label: "Fleet Management", path: "/services/fleet-management", icon: "DirectionsCar" },
      { label: "Rescue Services", path: "/services/rescue-services", icon: "BuildCircle" },
      { label: "Vehicle Inspection", path: "/services/vehicle-inspection", icon: "Search" },
      { label: "Insurance Services", path: "/services/insurance-services", icon: "Security" },
      { label: "Automotive Advisory", path: "/services/automotive-advisory", icon: "SupportAgent" },
    ],
  },
    {
    label: 'About Us',
    path: '#',
    route: "/about/who-we-are",
    children: [
      { label: 'Who We Are', path: '/about/who-we-are', icon: 'Flag' },
      { label: 'Our Team', path: '/about/team', icon: 'Groups' },
      { label: 'Affiliation', path: '/about/affiliation', icon: 'Handshake' },
      { label: 'Careers', path: '/about/careers', icon: 'Work' }
    ],
  },
  {
    label: 'Contact Us',
    path: '/contact',
  },
] as const;

export const affiliates = [
  {
    name: 'FIA',
    img: fiaImage,
    description: `Internationally, AA Uganda is a member of Federation Internationale de l'Automobile (FIA), the world motoring body which represents over 100 million motorists and their families. FIA brings together 246 international motoring and sports organizations from 145 countries in 5 continents. Through its membership to FIA, AA has over the years been able to learn best practice from other AA clubs from across the globe, and implement some of these solutions in Kenya.AA is also a member of the world Touring Body – Alliance Internationale de Tourisme (AIT). The AA CEO and the Governing Council President hold the positions of Treasurer and Vice President respectively at the African AA Clubs - African Council of Touring and Automobile Clubs (ACTA).`,
  },
];


export const heroContent = {
  title: "Your Trusted Partner on Uganda's Roads",
  subtitle: "From International Driving Permits valid in 150+ countries to 24/7 emergency rescue services, we deliver comprehensive automotive solutions that keep you moving safely across Uganda and beyond.",
  ctaText: "Apply for IDP",
  ctaLink: "/idp/apply",
  backgroundImage: "/images/hero-bg.jpg",
  features: [
    "24/7 Rescue Services",
    "Professional Driving School",
    "Comprehensive Insurance",
    "Expert Automotive Advice",
  ],
};

export const milestones = [
  { year: 2023, text: 'Introduced enhanced inspection & advisory services.' },
  { year: 2020, text: 'Digitized member services with online applications and support.' },
  { year: 2005, text: 'Launched modern driving school and safety training programs.' },
  { year: 1978, text: 'Expanded roadside support coverage across major corridors.' },
  { year: 1986, text: 'Founded with a mission to support motorists and road safety in Uganda.' },
];

export default {
  companyInfo,
  navigationItems,
  servicesNavItems,
  heroContent,
  management,
  affiliates,
};
