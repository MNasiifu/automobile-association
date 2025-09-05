import React from 'react';
import { Helmet } from 'react-helmet-async';
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

interface SEOProps {
  seoData: Partial<SEOData>;
}

export const SEO: React.FC<SEOProps> = ({ seoData }) => {
  const location = useLocation();
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

  // Debug logging
  console.log('SEO Component - seoData:', seoData);
  console.log('SEO Component - finalSEO:', finalSEO);
  console.log('SEO Component - description:', finalSEO.description);
  console.log('SEO Component - keywords:', finalSEO.keywords);

  // Robots meta tag
  const robotsContent: string[] = [];
  if (finalSEO.noIndex) robotsContent.push('noindex');
  else robotsContent.push('index');
  
  if (finalSEO.noFollow) robotsContent.push('nofollow');
  else robotsContent.push('follow');

  const ogImageUrl = finalSEO.ogImage?.startsWith('http') 
    ? finalSEO.ogImage 
    : `${window.location.origin}${finalSEO.ogImage}`;
    
  const twitterImageUrl = finalSEO.twitterImage?.startsWith('http') 
    ? finalSEO.twitterImage 
    : `${window.location.origin}${finalSEO.twitterImage}`;

  return (
    <Helmet>
      {/* Essential meta tags */}
      <title>{finalSEO.title}</title>
      <meta name="description" content={finalSEO.description} />
      <meta name="keywords" content={finalSEO.keywords || ''} />
      <meta name="robots" content={robotsContent.join(', ')} />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={finalSEO.ogTitle!} />
      <meta property="og:description" content={finalSEO.ogDescription!} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={finalSEO.ogType || 'website'} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="AA Uganda" />
      
      {/* Twitter tags */}
      <meta name="twitter:card" content={finalSEO.twitterCard || 'summary_large_image'} />
      <meta name="twitter:title" content={finalSEO.twitterTitle!} />
      <meta name="twitter:description" content={finalSEO.twitterDescription!} />
      <meta name="twitter:image" content={twitterImageUrl} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalSEO.canonical} />
      
      {/* Structured data */}
      {finalSEO.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(finalSEO.structuredData, null, 2)}
        </script>
      )}
    </Helmet>
  );
};
