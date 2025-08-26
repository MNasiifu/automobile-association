// Services data for AA Uganda

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  category: 'rescue' | 'driving' | 'insurance' | 'advisory';
  image?: string;
}

export const services: Service[] = [
  {
    id: 'rescue-services',
    title: 'Rescue Services',
    description: 'Our comprehensive rescue services provide rapid response across Uganda with 30+ rescue vehicles strategically positioned nationwide.',
    icon: 'BuildCircle',
    category: 'rescue',
    features: [
      '24/7 Emergency Response',
      '30+ Rescue Vehicles Nationwide',
      'Professional Trained Staff',
      'GPS Tracking for Quick Location',
      'Towing and Recovery Services',
      'On-site Mechanical Assistance',
      'Battery Jump Start',
      'Fuel Delivery Service',
    ],
    image: '/images/rescue-service.jpg',
  },
  {
    id: 'driving-school',
    title: 'Professional Driving School',
    description: 'Learn to drive with confidence using the FIA syllabus, taught by highly qualified instructors including excellent female instructors.',
    icon: 'School',
    category: 'driving',
    features: [
      'FIA Approved Syllabus',
      'Highly Qualified Instructors',
      'Excellent Female Instructors Available',
      'Insurance Coverage for Students',
      'Insurance Coverage for Instructors',
      'Modern Training Vehicles',
      'Flexible Scheduling',
      'Theory and Practical Training',
    ],
    image: '/images/driving-school.jpg',
  },
  {
    id: 'vehicle-inspection',
    title: 'Vehicle Inspection',
    description: 'Comprehensive vehicle inspections to ensure your car meets safety standards and regulatory requirements.',
    icon: 'Search',
    category: 'advisory',
    features: [
      'Pre-purchase Inspections',
      'Annual Safety Inspections',
      'Insurance Claim Inspections',
      'Detailed Inspection Reports',
      'Expert Recommendations',
      'Compliance Certification',
    ],
    image: '/images/vehicle-inspection.jpg',
  },
  {
    id: 'insurance-services',
    title: 'Insurance Services',
    description: 'Comprehensive motor insurance solutions tailored to protect you and your vehicle on Uganda\'s roads.',
    icon: 'Security',
    category: 'insurance',
    features: [
      'Comprehensive Motor Insurance',
      'Third Party Insurance',
      'Personal Accident Coverage',
      'Claims Processing Assistance',
      'Quick Settlement Services',
      'Competitive Premium Rates',
    ],
    image: '/images/insurance.jpg',
  },
  {
    id: 'automotive-advisory',
    title: 'Automotive Advisory',
    description: 'Expert automotive advice and consultation services to help you make informed decisions about your vehicle.',
    icon: 'SupportAgent',
    category: 'advisory',
    features: [
      'Vehicle Purchase Advice',
      'Maintenance Recommendations',
      'Technical Consultations',
      'Road Safety Guidelines',
      'Fuel Efficiency Tips',
      'Vehicle Valuation Services',
    ],
    image: '/images/advisory.jpg',
  },
  {
    id: 'membership-benefits',
    title: 'Membership Benefits',
    description: 'Exclusive benefits and services available to AA Uganda members, providing value and peace of mind.',
    icon: 'CardMembership',
    category: 'advisory',
    features: [
      'Priority Rescue Response',
      'Discounted Services',
      'Free Vehicle Inspections',
      'Member-only Events',
      'Technical Helpline',
      'Travel Assistance',
      'Partner Discounts',
    ],
    image: '/images/membership.jpg',
  },
];

export const serviceCategories = [
  {
    id: 'rescue',
    name: 'Rescue Services',
    description: 'Emergency roadside assistance and recovery',
    icon: 'BuildCircle',
  },
  {
    id: 'driving',
    name: 'Driving Education',
    description: 'Professional driving instruction and training',
    icon: 'School',
  },
  {
    id: 'insurance',
    name: 'Insurance Solutions',
    description: 'Comprehensive motor insurance coverage',
    icon: 'Security',
  },
  {
    id: 'advisory',
    name: 'Advisory Services',
    description: 'Expert automotive consultation and advice',
    icon: 'SupportAgent',
  },
];

export default {
  services,
  serviceCategories,
};
