// Membership data for AA Uganda

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
  color: 'primary' | 'secondary' | 'info';
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'basic',
    name: 'Basic Membership',
    price: 150000,
    duration: 'per year',
    description: 'Essential services for everyday motoring needs',
    color: 'info',
    features: [
      '24/7 Emergency Rescue',
      'Basic Vehicle Inspection',
      'Technical Helpline',
      'Member Newsletter',
      'Online Account Access',
      'Basic Insurance Advice',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Membership',
    price: 300000,
    duration: 'per year',
    description: 'Comprehensive coverage with enhanced benefits',
    color: 'primary',
    popular: true,
    features: [
      'Priority Emergency Response',
      'Comprehensive Vehicle Inspection',
      'Free Annual Safety Check',
      'Driving School Discounts (20%)',
      'Insurance Claims Assistance',
      'Technical Helpline',
      'Travel Assistance',
      'Partner Discounts',
      'Exclusive Member Events',
      'Mobile App Access',
    ],
  },
  {
    id: 'corporate',
    name: 'Corporate Membership',
    price: 750000,
    duration: 'per year',
    description: 'Tailored solutions for businesses and fleet operators',
    color: 'secondary',
    features: [
      'Fleet Management Support',
      'Priority Multi-vehicle Response',
      'Dedicated Account Manager',
      'Bulk Insurance Services',
      'Driver Training Programs',
      'Vehicle Inspection Services',
      'Monthly Reporting',
      'Custom Service Packages',
      'Emergency Contact Services',
      'Corporate Events Access',
    ],
  },
];

export const membershipBenefits = [
  {
    title: 'Peace of Mind',
    description: 'Drive with confidence knowing help is just a phone call away',
    icon: 'Security',
  },
  {
    title: 'Expert Support',
    description: 'Access to qualified professionals and technical expertise',
    icon: 'SupportAgent',
  },
  {
    title: 'Cost Savings',
    description: 'Save money with member discounts and exclusive offers',
    icon: 'Savings',
  },
  {
    title: 'Convenience',
    description: 'Simple online account management and mobile app access',
    icon: 'PhoneIphone',
  },
];

export const membershipFAQs = [
  {
    question: 'How quickly can I expect rescue services?',
    answer: 'Our average response time is 30-45 minutes in urban areas and 60-90 minutes in rural areas, depending on location and traffic conditions.',
  },
  {
    question: 'Can I upgrade my membership plan?',
    answer: 'Yes, you can upgrade your membership at any time. The price difference will be prorated based on your remaining membership period.',
  },
  {
    question: 'Are family members covered under my membership?',
    answer: 'Premium and Corporate memberships include coverage for immediate family members. Basic membership covers the primary member only.',
  },
  {
    question: 'What areas do your rescue services cover?',
    answer: 'We provide rescue services across all major towns and highways in Uganda. Our 30+ rescue vehicles are strategically positioned nationwide.',
  },
  {
    question: 'How do I make a claim for rescue services?',
    answer: 'Simply call our 24/7 hotline or use our mobile app to request assistance. Our GPS system will help locate you quickly.',
  },
];

export default {
  membershipPlans,
  membershipBenefits,
  membershipFAQs,
};
