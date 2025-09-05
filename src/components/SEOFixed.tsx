import React, { useEffect } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
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

export const SEOFixed: React.FC<SEOProps> = ({ seoData }) => {
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
  console.log('SEOFixed Component - finalSEO:', finalSEO);

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

  // Force meta tag updates using DOM manipulation as fallback
  useEffect(() => {
    console.log('SEOFixed useEffect triggered');
    
    // Update description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', finalSEO.description);
    
    // Update keywords
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    if (finalSEO.keywords) {
      keywordsMeta.setAttribute('content', finalSEO.keywords);
    }
    
    // Update robots
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', robotsContent.join(', '));
    
    // Update OG tags
    let ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (!ogTitleMeta) {
      ogTitleMeta = document.createElement('meta');
      ogTitleMeta.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleMeta);
    }
    ogTitleMeta.setAttribute('content', finalSEO.ogTitle!);
    
    let ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (!ogDescMeta) {
      ogDescMeta = document.createElement('meta');
      ogDescMeta.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescMeta);
    }
    ogDescMeta.setAttribute('content', finalSEO.ogDescription!);
    
    console.log('SEOFixed: Meta tags manually updated');
  }, [finalSEO, robotsContent]);

  return (
    <Helmet>
      <title>{finalSEO.title}</title>
      <meta name="description" content={finalSEO.description} />
      <meta name="keywords" content={finalSEO.keywords || ''} />
      <meta name="robots" content={robotsContent.join(', ')} />
      
      <meta property="og:title" content={finalSEO.ogTitle!} />
      <meta property="og:description" content={finalSEO.ogDescription!} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={finalSEO.ogType || 'website'} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="AA Uganda" />
      
      <meta name="twitter:card" content={finalSEO.twitterCard || 'summary_large_image'} />
      <meta name="twitter:title" content={finalSEO.twitterTitle!} />
      <meta name="twitter:description" content={finalSEO.twitterDescription!} />
      <meta name="twitter:image" content={twitterImageUrl} />
      
      <link rel="canonical" href={finalSEO.canonical} />
      
      {finalSEO.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(finalSEO.structuredData, null, 2)}
        </script>
      )}
    </Helmet>
  );
};
