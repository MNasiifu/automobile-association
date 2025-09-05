import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';

export const SEOTest: React.FC = () => {
  console.log('SEOTest component rendered');
  
  return (
    <Helmet>
      <title>Test Page Title - React Helmet Working</title>
      <meta name="description" content="This is a test description to verify React Helmet is working properly." />
      <meta name="keywords" content="test, react helmet, seo, debugging" />
      <meta property="og:title" content="Test OG Title" />
      <meta property="og:description" content="Test OG Description" />
    </Helmet>
  );
};
