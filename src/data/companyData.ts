// Company information and static data for AA Uganda
import fiaImage from '../assets/images/FIA.jpeg';
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
      name: "Mr. Richard"
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

import type {  NavItem } from '../types/navigation';

export const navigationItems: ReadonlyArray<NavItem> = [
  { label: 'Home', path: '/' },
  {
    label: 'IDP',
    path: '/idp',
  },
  {
    label: 'Membership',
    path: '/membership',
  },

  {
    label: 'Driving School',
    path: '/driving-school',
    children: [
      { label: 'About the School', path: '/driving-school/about', icon: 'School' },
      { label: 'Refresher Courses', path: '/driving-school/refresher', icon: 'Replay' },
    ],
  },

  {
    label: 'Our Services',
    path: '/services',
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
    path: '/about',
    children: [
      { label: 'Who We Are', path: '/about/who-we-are', icon: 'Flag' },
      { label: 'Our Team', path: '/about/team', icon: 'Groups' },
      { label: 'Affiliation', path: '/about/affiliation', icon: 'Handshake' },
      { label: 'Careers', path: '/about/careers', icon: 'Work' },
      { label: 'Gallery', path: '/about/gallery', icon: 'PhotoLibrary' },
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
  subtitle: `For over ${new Date().getFullYear() - 1986} years, AA Uganda has been providing reliable motoring solutions, driving education, and rescue services across Uganda.`,
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

type Person = { name: string; role: string };

export const board: Person[] = [
  { name: 'Jane K.', role: 'Board Chair' },
  { name: 'Michael O.', role: 'Vice Chair' },
  { name: 'Grace A.', role: 'Board Member' },
  { name: 'Peter N.', role: 'Board Member' },
  { name: 'Ruth S.', role: 'Board Member' },
  { name: 'Paul T.', role: 'Board Member' },
];

export const management: Person[] = [
  { name: 'John M.', role: 'Chief Executive Officer' },
  { name: 'Sarah N.', role: 'Head of Operations' },
  { name: 'David B.', role: 'Head of Training' },
  { name: 'Rita T.', role: 'Head of Finance' },
  { name: 'Agnes K.', role: 'Head of ICT' },
  { name: 'Tom W.', role: 'Head of Membership' },
];

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
  heroContent,
  board,
  management,
  affiliates,
};
