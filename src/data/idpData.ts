// International Driving Permit data for AA Uganda

export interface IDPApplication {
  id: string;
  name: string;
  type: string;
  description: string;
  processingTime: string;
  validityPeriod: string;
  coverage: string[];
  requirements: string[];
  fee: number;
  popular?: boolean;
  color: 'primary' | 'secondary' | 'info';
}

export const idpApplicationTypes: IDPApplication[] = [
  {
    id: 'idp-1968',
    name: '1968 IDP',
    type: 'Standard International Driving Permit',
    description: 'Valid in over 150 countries worldwide based on the 1968 Vienna Convention',
    processingTime: '2-3 working days',
    validityPeriod: '1 year from issue date',
    fee: 75000,
    color: 'primary',
    popular: true,
    coverage: [
      'All EU Countries',
      'United States & Canada',
      'Australia & New Zealand',
      'South Africa',
      'Most Asian Countries',
      'Most African Countries',
    ],
    requirements: [
      'Valid Ugandan Driving License',
      'Completed IDP Application Form',
      '2 Passport-sized Photos',
      'Copy of Passport Bio-data Page',
      'Application Fee Payment',
      'Medical Certificate (if required)',
    ],
  },
  {
    id: 'idp-1949',
    name: '1949 IDP',
    type: 'Inter-American Driving Permit',
    description: 'Required for specific countries not covered by the 1968 Convention',
    processingTime: '3-5 working days',
    validityPeriod: '1 year from issue date',
    fee: 85000,
    color: 'info',
    coverage: [
      'Thailand',
      'India',
      'Cyprus',
      'Malta',
      'Some Caribbean Nations',
      'Specific Asian Countries',
    ],
    requirements: [
      'Valid Ugandan Driving License',
      'Completed IDP Application Form',
      '2 Passport-sized Photos',
      'Copy of Passport Bio-data Page',
      'Application Fee Payment',
      'Additional Documentation',
    ],
  },
  {
    id: 'idp-expedited',
    name: 'Express IDP',
    type: 'Same-Day Processing',
    description: 'Fast-track processing for urgent travel requirements',
    processingTime: 'Same working day',
    validityPeriod: '1 year from issue date',
    fee: 150000,
    color: 'secondary',
    coverage: [
      'All 1968 Convention Countries',
      'Emergency Travel Support',
      'Priority Processing',
    ],
    requirements: [
      'Valid Ugandan Driving License',
      'Completed IDP Application Form',
      '2 Passport-sized Photos',
      'Copy of Passport Bio-data Page',
      'Proof of Urgent Travel',
      'Express Processing Fee',
    ],
  },
];

export const idpBenefits = [
  {
    title: 'Global Recognition',
    description: 'Legally drive in over 150 countries with official translation of your license',
    icon: 'Public',
  },
  {
    title: 'Legal Compliance',
    description: 'Meet international driving requirements and avoid costly fines abroad',
    icon: 'Gavel',
  },
  {
    title: 'Insurance Coverage',
    description: 'Ensure your travel insurance remains valid when driving internationally',
    icon: 'Security',
  },
  {
    title: 'Peace of Mind',
    description: 'Travel confidently knowing you have proper documentation',
    icon: 'Verified',
  },
];

export const idpRequirements = {
  eligibility: [
    'Must be at least 18 years old',
    'Hold a valid Ugandan driving license',
    'License must be valid for at least 6 months',
    'No pending legal issues related to driving',
  ],
  documentation: [
    'Original Ugandan driving license',
    'Completed IDP application form',
    '2 recent passport-sized photographs',
    'Copy of passport bio-data page',
    'Proof of address in Uganda',
    'Medical certificate (if license is over 5 years old)',
  ],
  process: [
    'Submit complete application with required documents',
    'Pay the applicable processing fee',
    'Undergo document verification',
    'Receive IDP within specified processing time',
  ],
};

export const idpFAQs = [
  {
    question: 'What is an International Driving Permit (IDP)?',
    answer: 'An **International Driving Permit (IDP)** is an official translation of your national driving license that allows you to drive legally in foreign countries. It\'s not a standalone license but a **certified translation document** that must be carried alongside your original Ugandan license for international recognition.',
  },
  {
    question: 'Which countries require an IDP?',
    answer: 'Over **150 countries worldwide** recognize and accept IDPs. Requirements vary by destination - some countries require it for **all foreign drivers**, others specifically for **car rentals** or **long-term stays**. We strongly recommend checking specific country requirements before travel to ensure compliance.',
  },
  {
    question: 'How long is an IDP valid?',
    answer: 'IDPs are typically valid for **one full year** from the date of issue. However, you can only use it as long as your **original Ugandan license remains valid**. If your domestic license expires, your IDP becomes invalid regardless of its own expiry date.',
  },
  {
    question: 'Can I apply for an IDP if I\'m already abroad?',
    answer: '**Unfortunately, no.** IDPs must be obtained **before traveling abroad**. They can only be issued in the same country where your original license was issued. This is an international requirement, so **plan ahead** and apply before your departure.',
  },
  {
    question: 'Do I need both 1968 and 1949 IDPs?',
    answer: 'Most travelers only need the **1968 IDP** as it covers the majority of countries worldwide. The **1949 IDP** is only required for specific countries not party to the 1968 Vienna Convention. Our team will advise you on which type you need based on your destination.',
  },
  {
    question: 'Can I renew my IDP?',
    answer: 'IDPs **cannot be renewed** - you must apply for a completely new IDP each time. However, you can apply for a new one **up to 3 months before** your current IDP expires, ensuring continuous coverage for frequent travelers.',
  },
];

export const verificationInfo = {
  title: 'IDP Verification Service',
  description: 'Verify the authenticity of International Driving Permits issued by AA Uganda',
  features: [
    'Instant online verification',
    'QR code scanning capability',
    'Detailed permit information',
    'Fraud protection',
    'Multi-language support',
  ],
  process: [
    'Enter IDP number or scan QR code',
    'System checks against secure database',
    'Verification result displayed instantly',
    'Download verification certificate if needed',
  ],
};

export default {
  idpApplicationTypes,
  idpBenefits,
  idpRequirements,
  idpFAQs,
  verificationInfo,
};
