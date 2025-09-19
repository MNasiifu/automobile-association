import React from 'react';
import { Box } from '@mui/material';
import { Hero, ServicesOverview } from '../components/organisms';
import { 
  StatsSection,
  AboutPreview,
  TestimonialsSection,
  PartnershipsSection,
  CallToActionSection,
  IdpSection
} from '../components/organisms/sections';
import { SEO } from '../components/SEO';
import { homeSEO } from '../data/seoData';

const Home: React.FC = () => {
  return (
    <Box>
      <SEO seoData={homeSEO} />
      
      {/* Hero Section - Enhanced with better visuals and animations */}
      <Hero />

      {/* About Preview - Company overview with mission, vision, and team */}
      <AboutPreview />
      
      {/* Statistics Section - Show company achievements and trust indicators */}
      <StatsSection />
      
      {/* Services Overview - Enhanced with better presentation */}
      <ServicesOverview showAll />
      
      {/* International Driving Permit Section - IDP application and verification */}
      <IdpSection />
      
      {/* Testimonials - Social proof from satisfied customers */}
      <TestimonialsSection />
      
      {/* Partnerships - International affiliations and credibility */}
      <PartnershipsSection />
      
      {/* Call to Action - Final conversion section */}
      <CallToActionSection />
    </Box>
  );
};

export default Home;
