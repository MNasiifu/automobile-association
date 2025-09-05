import type { SEOData, StructuredDataService, StructuredDataWebPage } from '../types/seo';

const BASE_URL = import.meta.env.VITE_PUBLIC_SITE_URL || 'https://aauganda.co.ug';

// Organization structured data (reused across pages)
export const organizationStructuredData = {
  '@context': 'https://schema.org' as const,
  '@type': 'Organization' as const,
  name: 'Automobile Association of Uganda',
  alternateName: 'AA Uganda',
  url: BASE_URL,
  logo: `${BASE_URL}/aau-logo.png`,
  contactPoint: {
    '@type': 'ContactPoint' as const,
    telephone: '+256-786-623-001',
    contactType: 'customer service',
    areaServed: 'UG',
    availableLanguage: 'en',
  },
  address: {
    '@type': 'PostalAddress' as const,
    streetAddress: 'Plot 4 Old Port Bell Rd',
    addressLocality: 'Kampala',
    addressCountry: 'UG',
  },
  sameAs: [
    'https://facebook.com/aauganda',
    'https://twitter.com/aauganda',
    'https://linkedin.com/company/aauganda',
  ],
};

// Function to create breadcrumb structured data
const createBreadcrumb = (items: Array<{ name: string; url: string }>) => ({
  '@type': 'BreadcrumbList' as const,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem' as const,
    position: index + 1,
    name: item.name,
    item: `${BASE_URL}${item.url}`,
  })),
});

// Home page SEO
export const homeSEO: SEOData = {
  title: 'AA Uganda - Your Trusted Partner on Uganda\'s Roads | Automobile Association',
  description: 'Join AA Uganda for 24/7 emergency roadside assistance, professional driving school, vehicle inspections, and comprehensive automotive services across Uganda. Your safety is our priority.',
  keywords: 'AA Uganda, automobile association, roadside assistance, emergency services, driving school, vehicle inspection, car insurance, Uganda, motor services, road safety',
  ogType: 'website',
  structuredData: {
    ...organizationStructuredData,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': BASE_URL,
    },
  },
};

// About page SEO
export const aboutSEO: SEOData = {
  title: 'About AA Uganda - 65+ Years of Road Safety Excellence | Automobile Association',
  description: 'Learn about AA Uganda\'s rich history since 1986, our mission to enhance road safety, and our commitment to serving motorists across Uganda with professional automotive services.',
  keywords: 'AA Uganda history, automobile association Uganda, road safety, FIA member, Uganda motoring organization, vehicle safety, driving excellence',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'About AA Uganda',
    description: 'Learn about AA Uganda\'s history, mission, and commitment to road safety in Uganda.',
    url: `${BASE_URL}/about`,
    mainEntity: organizationStructuredData,
    breadcrumb: createBreadcrumb([
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
    ]),
  },
};

// Services page SEO
export const servicesSEO: SEOData = {
  title: 'Automotive Services Uganda - Vehicle Inspection, Rescue & Advisory | AA Uganda',
  description: 'Comprehensive automotive services including 24/7 rescue, vehicle inspection, fleet management, insurance services, and professional automotive advisory in Uganda.',
  keywords: 'automotive services Uganda, vehicle inspection, rescue services, fleet management, car insurance, vehicle valuation, automotive advisory, AA Uganda services',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Our Services',
    description: 'Comprehensive automotive solutions designed to keep you safe and confident on Uganda\'s roads.',
    url: `${BASE_URL}/services`,
    breadcrumb: createBreadcrumb([
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
    ]),
  },
};

// Individual service pages
export const vehicleValuationSEO: SEOData = {
  title: 'Professional Vehicle Valuation Services Uganda | AA Uganda',
  description: 'Get accurate vehicle valuations from certified AA Uganda experts. Professional assessments for insurance, sales, legal, and financing purposes across Uganda.',
  keywords: 'vehicle valuation Uganda, car appraisal, vehicle assessment, insurance valuation, vehicle worth, AA Uganda valuation services',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Vehicle Valuation',
    description: 'Professional vehicle valuation services for accurate market assessments',
    provider: {
      '@type': 'Organization',
      name: 'AA Uganda',
      url: BASE_URL,
    },
    areaServed: 'Uganda',
  } as StructuredDataService,
};

export const fleetManagementSEO: SEOData = {
  title: 'Fleet Management Services Uganda - Vehicle Tracking & Maintenance | AA Uganda',
  description: 'Professional fleet management solutions including vehicle tracking, maintenance scheduling, driver management, and cost optimization for businesses in Uganda.',
  keywords: 'fleet management Uganda, vehicle tracking, fleet maintenance, driver management, business vehicle services, AA Uganda fleet solutions',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Fleet Management',
    description: 'Comprehensive fleet management solutions for businesses',
    provider: {
      '@type': 'Organization',
      name: 'AA Uganda',
      url: BASE_URL,
    },
    areaServed: 'Uganda',
  } as StructuredDataService,
};

export const rescueServicesSEO: SEOData = {
  title: '24/7 Emergency Roadside Assistance Uganda - Vehicle Rescue Services | AA Uganda',
  description: 'Reliable 24/7 emergency roadside assistance across Uganda. Vehicle breakdown recovery, tire changes, battery jumpstart, fuel delivery, and towing services.',
  keywords: '24/7 roadside assistance Uganda, emergency vehicle rescue, car breakdown, towing services, battery jumpstart, tire change, fuel delivery, AA Uganda rescue',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Emergency Rescue Services',
    description: '24/7 emergency roadside assistance and vehicle recovery',
    provider: {
      '@type': 'Organization',
      name: 'AA Uganda',
      url: BASE_URL,
    },
    areaServed: 'Uganda',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${BASE_URL}/services/rescue-services`,
      serviceSupportedBy: {
        '@type': 'ContactPoint',
        telephone: '+256-786-623-001',
      },
    },
  } as StructuredDataService,
};

export const vehicleInspectionSEO: SEOData = {
  title: 'Professional Vehicle Inspection Services Uganda | Pre-Purchase & Safety Checks',
  description: 'Comprehensive vehicle inspection services in Uganda. Pre-purchase inspections, safety checks, insurance claim assessments by certified AA Uganda technicians.',
  keywords: 'vehicle inspection Uganda, pre-purchase inspection, car safety check, vehicle assessment, insurance inspection, AA Uganda inspection services',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Vehicle Inspection',
    description: 'Professional vehicle inspection and safety assessment services',
    provider: {
      '@type': 'Organization',
      name: 'AA Uganda',
      url: BASE_URL,
    },
    areaServed: 'Uganda',
  } as StructuredDataService,
};

export const insuranceServicesSEO: SEOData = {
  title: 'Motor Insurance Services Uganda - Vehicle Insurance Solutions | AA Uganda',
  description: 'Comprehensive motor insurance solutions in Uganda. Vehicle insurance, claims assistance, coverage advice, and insurance consultation services from AA Uganda.',
  keywords: 'motor insurance Uganda, vehicle insurance, car insurance, insurance claims, insurance consultation, AA Uganda insurance services',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Insurance Services',
    description: 'Comprehensive motor insurance solutions and consultation',
    provider: {
      '@type': 'Organization',
      name: 'AA Uganda',
      url: BASE_URL,
    },
    areaServed: 'Uganda',
  } as StructuredDataService,
};

export const automotiveAdvisorySEO: SEOData = {
  title: 'Automotive Advisory Services Uganda - Expert Vehicle Consultation | AA Uganda',
  description: 'Professional automotive advisory services in Uganda. Expert vehicle consultation, technical advice, maintenance guidance, and automotive solutions from AA Uganda specialists.',
  keywords: 'automotive advisory Uganda, vehicle consultation, automotive advice, technical guidance, vehicle maintenance, AA Uganda advisory services',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Automotive Advisory',
    description: 'Professional automotive consultation and advisory services',
    provider: {
      '@type': 'Organization',
      name: 'AA Uganda',
      url: BASE_URL,
    },
    areaServed: 'Uganda',
  } as StructuredDataService,
};

// IDP related pages
export const idpSEO: SEOData = {
  title: 'International Driving Permit Uganda - Apply Online | AA Uganda',
  description: 'Apply for your International Driving Permit (IDP) online with AA Uganda. Quick processing, official permits for global travel. Verify IDP authenticity online.',
  keywords: 'international driving permit Uganda, IDP Uganda, driving permit online, international license, AA Uganda IDP, global driving permit',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'International Driving Permit',
    description: 'Official International Driving Permit application and verification services',
    provider: {
      '@type': 'Organization',
      name: 'AA Uganda',
      url: BASE_URL,
    },
    areaServed: 'Uganda',
  } as StructuredDataService,
};

export const applyIdpSEO: SEOData = {
  title: 'Apply for International Driving Permit Online - Quick & Easy | AA Uganda',
  description: 'Apply for your International Driving Permit online with AA Uganda. Simple application process, fast processing, and official IDP for international travel.',
  keywords: 'apply IDP online, international driving permit application, IDP application Uganda, online permit application, AA Uganda IDP',
  noIndex: false,
};

export const verifyIdpSEO: SEOData = {
  title: 'Verify International Driving Permit - IDP Authentication | AA Uganda',
  description: 'Verify the authenticity of International Driving Permits issued by AA Uganda. Quick online verification system for IDP validation and authentication.',
  keywords: 'verify IDP, international driving permit verification, IDP authentication, permit validation, AA Uganda verification',
  noIndex: false,
};

// Membership page SEO
export const membershipSEO: SEOData = {
  title: 'AA Uganda Membership - Join Uganda\'s Premier Automobile Association',
  description: 'Become an AA Uganda member and enjoy exclusive benefits including 24/7 roadside assistance, discounts on services, expert automotive advice, and priority support.',
  keywords: 'AA Uganda membership, automobile association membership, roadside assistance membership, vehicle services membership, AA benefits Uganda',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Membership',
    description: 'Join AA Uganda and enjoy exclusive automotive services and benefits',
    url: `${BASE_URL}/membership`,
    breadcrumb: createBreadcrumb([
      { name: 'Home', url: '/' },
      { name: 'Membership', url: '/membership' },
    ]),
  } as StructuredDataWebPage,
};

// Contact page SEO
export const contactSEO: SEOData = {
  title: 'Contact AA Uganda - 24/7 Emergency Assistance & Customer Support',
  description: 'Contact AA Uganda for emergency roadside assistance, customer support, or inquiries. Available 24/7 with multiple contact options including phone, email, and online form.',
  keywords: 'contact AA Uganda, emergency assistance, customer support, roadside help, AA Uganda phone, 24/7 assistance',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Us',
    description: 'Get in touch with AAU for emergency assistance, inquiries, or to learn more about our services.',
    url: `${BASE_URL}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: 'AA Uganda',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+256-786-623-001',
        contactType: 'customer service',
        areaServed: 'UG',
        availableLanguage: 'en',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      },
    },
    breadcrumb: createBreadcrumb([
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' },
    ]),
  },
};

// About sub-pages
export const whoWeAreSEO: SEOData = {
  title: 'Who We Are - AA Uganda Leadership & Organization Overview',
  description: 'Meet the AA Uganda team, leadership, and organization structure. Learn about our professional staff, board of directors, and management committed to road safety.',
  keywords: 'AA Uganda team, leadership, organization, board of directors, management, staff, automobile association leadership',
};

export const teamSEO: SEOData = {
  title: 'Our Team - Professional Staff & Experts | AA Uganda',
  description: 'Meet the professional team at AA Uganda. Experienced automotive experts, technicians, and support staff dedicated to serving Uganda\'s motorists.',
  keywords: 'AA Uganda team, automotive experts, professional staff, technicians, customer service team',
};

export const affiliationSEO: SEOData = {
  title: 'Affiliations & Partnerships - International Automobile Federation | AA Uganda',
  description: 'AA Uganda is proudly affiliated with the FIA (International Automobile Federation) and maintains partnerships with leading automotive organizations worldwide.',
  keywords: 'AA Uganda affiliations, FIA member, International Automobile Federation, automotive partnerships, global automobile association',
};

export const gallerySEO: SEOData = {
  title: 'Photo Gallery - AA Uganda Services & Activities in Pictures',
  description: 'Explore our photo gallery showcasing AA Uganda\'s rescue services, driving school activities, vehicle inspections, and community events across Uganda.',
  keywords: 'AA Uganda gallery, rescue services photos, driving school images, vehicle inspection pictures, automotive services gallery',
};

export const careersSEO: SEOData = {
  title: 'Careers at AA Uganda - Join Our Professional Automotive Team',
  description: 'Explore career opportunities at AA Uganda. Join our team of automotive professionals and contribute to road safety and excellent customer service in Uganda.',
  keywords: 'AA Uganda careers, automotive jobs, road safety careers, customer service jobs, technical positions Uganda',
};

// Driving school pages
export const drivingSchoolAboutSEO: SEOData = {
  title: 'AA Uganda Driving School - Professional Driver Training & Education',
  description: 'AA Uganda Driving School offers professional driver training, defensive driving courses, and comprehensive driving education programs across Uganda.',
  keywords: 'AA Uganda driving school, driver training, driving lessons, defensive driving, driver education, professional driving instructors',
};

export const drivingSchoolRefresherSEO: SEOData = {
  title: 'Refresher Driving Courses - Advanced Driver Training | AA Uganda',
  description: 'Improve your driving skills with AA Uganda\'s refresher courses. Advanced driver training, defensive driving techniques, and safety updates for experienced drivers.',
  keywords: 'refresher driving course, advanced driver training, defensive driving, experienced driver training, driving skills improvement',
};
