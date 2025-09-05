import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { SEOData } from '../types/seo';

const DEFAULT_SEO: Partial<SEOData> = {
  title: 'AA Uganda - Your Trusted Partner on Uganda\'s Roads',
  description: 'Automobile Association of Uganda provides 24/7 rescue services, professional driving school, vehicle inspections, and automotive advisory services across Uganda.',
  keywords: 'AA Uganda, automobile association, rescue services, driving school, vehicle inspection, Uganda, emergency assistance, motor insurance',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  ogImage: '/aau-logo.png',
  twitterImage: '/aau-logo.png',
};

export const useSEO = (seoData: Partial<SEOData>) => {
  const location = useLocation();
  
  useEffect(() => {
    const currentUrl = `${window.location.origin}${location.pathname}`;
    
    // Merge with defaults
    const finalSEO: SEOData = {
      ...DEFAULT_SEO,
      ...seoData,
      title: seoData.title || DEFAULT_SEO.title!,
      description: seoData.description || DEFAULT_SEO.description!,
      canonical: seoData.canonical || currentUrl,
      ogTitle: seoData.ogTitle || seoData.title || DEFAULT_SEO.title!,
      ogDescription: seoData.ogDescription || seoData.description || DEFAULT_SEO.description!,
      twitterTitle: seoData.twitterTitle || seoData.title || DEFAULT_SEO.title!,
      twitterDescription: seoData.twitterDescription || seoData.description || DEFAULT_SEO.description!,
    };

    // Update title
    document.title = finalSEO.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', finalSEO.description);
    if (finalSEO.keywords) {
      updateMetaTag('keywords', finalSEO.keywords);
    }
    
    // Robots meta tag
    const robotsContent: string[] = [];
    if (finalSEO.noIndex) robotsContent.push('noindex');
    else robotsContent.push('index');
    
    if (finalSEO.noFollow) robotsContent.push('nofollow');
    else robotsContent.push('follow');
    
    updateMetaTag('robots', robotsContent.join(', '));

    // Open Graph tags
    updateMetaTag('og:title', finalSEO.ogTitle!, true);
    updateMetaTag('og:description', finalSEO.ogDescription!, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', finalSEO.ogType || 'website', true);
    if (finalSEO.ogImage) {
      const imageUrl = finalSEO.ogImage.startsWith('http') 
        ? finalSEO.ogImage 
        : `${window.location.origin}${finalSEO.ogImage}`;
      updateMetaTag('og:image', imageUrl, true);
    }

    // Twitter tags
    updateMetaTag('twitter:card', finalSEO.twitterCard || 'summary_large_image');
    updateMetaTag('twitter:title', finalSEO.twitterTitle!);
    updateMetaTag('twitter:description', finalSEO.twitterDescription!);
    if (finalSEO.twitterImage) {
      const imageUrl = finalSEO.twitterImage.startsWith('http') 
        ? finalSEO.twitterImage 
        : `${window.location.origin}${finalSEO.twitterImage}`;
      updateMetaTag('twitter:image', imageUrl);
    }

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = finalSEO.canonical!;

    // Structured data
    if (finalSEO.structuredData) {
      let script = document.querySelector('script[data-react-seo="structured-data"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-react-seo', 'structured-data');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(finalSEO.structuredData);
    }

  }, [seoData, location.pathname]);
};
