// SEO utility functions

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  ogImage?: string;
  canonical?: string;
}

export const updatePageSEO = (config: SEOConfig) => {
  // Update document title
  document.title = config.title;

  // Update meta description
  updateMetaTag('description', config.description);

  // Update keywords if provided
  if (config.keywords && config.keywords.length > 0) {
    updateMetaTag('keywords', config.keywords.join(', '));
  }

  // Update author if provided
  if (config.author) {
    updateMetaTag('author', config.author);
  }

  // Update Open Graph tags
  updateMetaProperty('og:title', config.title);
  updateMetaProperty('og:description', config.description);
  updateMetaProperty('og:type', 'website');

  if (config.ogImage) {
    updateMetaProperty('og:image', config.ogImage);
  }

  // Update canonical URL if provided
  if (config.canonical) {
    updateCanonicalLink(config.canonical);
  }

  // Update Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', config.title);
  updateMetaTag('twitter:description', config.description);

  if (config.ogImage) {
    updateMetaTag('twitter:image', config.ogImage);
  }
};

const updateMetaTag = (name: string, content: string) => {
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.appendChild(element);
  }
  
  element.content = content;
};

const updateMetaProperty = (property: string, content: string) => {
  let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  
  element.content = content;
};

const updateCanonicalLink = (href: string) => {
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  
  element.href = href;
};

// Default SEO configurations for each page
export const defaultSEOConfigs = {
  home: {
    title: 'AA Uganda - Your Trusted Partner on Uganda\'s Roads',
    description: 'Automobile Association of Uganda provides 24/7 rescue services, professional driving school, vehicle inspections, and automotive advisory services across Uganda.',
    keywords: ['AA Uganda', 'automobile association', 'rescue services', 'driving school', 'vehicle inspection', 'Uganda'],
    author: 'AA Uganda',
  },
  about: {
    title: 'About AA Uganda - 65+ Years of Excellence in Automotive Services',
    description: 'Learn about AA Uganda\'s history, mission, and commitment to providing reliable motoring solutions since 1955. Discover our values and impact.',
    keywords: ['AA Uganda history', 'about automobile association', 'Uganda automotive services', 'company mission'],
    author: 'AA Uganda',
  },
  services: {
    title: 'Our Services - Comprehensive Automotive Solutions | AA Uganda',
    description: 'Explore AA Uganda\'s comprehensive services including 24/7 rescue, FIA-approved driving school, vehicle inspections, insurance, and automotive advisory.',
    keywords: ['rescue services', 'driving school Uganda', 'vehicle inspection', 'motor insurance', 'automotive advisory'],
    author: 'AA Uganda',
  },
  membership: {
    title: 'Membership Plans - Join AA Uganda Today',
    description: 'Choose from our flexible membership plans and enjoy exclusive benefits, priority rescue services, discounts, and comprehensive automotive support.',
    keywords: ['AA Uganda membership', 'automotive membership', 'rescue services membership', 'vehicle assistance'],
    author: 'AA Uganda',
  },
  contact: {
    title: 'Contact AA Uganda - Get in Touch for Assistance',
    description: 'Contact AA Uganda for inquiries, emergency assistance, or membership information. Visit us at Plot 4 Old Port Bell Rd, Kampala or call our 24/7 hotline.',
    keywords: ['contact AA Uganda', 'emergency assistance', 'Kampala office', 'customer service'],
    author: 'AA Uganda',
  },
};
