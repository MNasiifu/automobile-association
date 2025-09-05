import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { PageHeader } from '../components/molecules';
import { SEO } from '../components/SEO';
import { gallerySEO } from '../data/seoData';

// Import all images
import rescueImg from '../assets/images/AA-rescue.jpg';
import defensiveDrivingImg from '../assets/images/defensive-driving.jpeg';
import drivingSchoolImg from '../assets/images/driving-school.jpg';
import car1Img from '../assets/images/car1.jpeg';
import roadImg from '../assets/images/road.jpg';
import rescueServiceImg from '../assets/images/rescue.jpg';
import towingImg from '../assets/images/TOWINGANDRECOVERYFRESHCAR.jpeg';

const Gallery: React.FC = () => {
  const images = [
    { img: rescueImg, title: 'AA Rescue Service' },
    { img: defensiveDrivingImg, title: 'Defensive Driving' },
    { img: drivingSchoolImg, title: 'Driving School' },
    { img: car1Img, title: 'Vehicle Services' },
    { img: roadImg, title: 'Road Safety' },
    { img: rescueServiceImg, title: 'Emergency Response' },
    { img: towingImg, title: 'Towing Service' },
  ];

  return (
    <Box>
      <SEO seoData={gallerySEO} />
      <PageHeader
        title="Gallery"
        subtitle="Visual journey through our services and activities"
      />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'grid', gap: 3, width: '100%', gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        }}}>
          {images.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
                '&:hover img': {
                  transform: 'scale(1.05)'
                }
              }}
            >
              <Box
                component="img"
                src={item.img}
                alt={item.title}
                loading="lazy"
                sx={{
                  width: '100%',
                  aspectRatio: '4/3',
                  height: 280,
                  objectFit: 'cover',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  textAlign: 'center',
                  fontWeight: 500,
                  color: 'text.secondary'
                }}
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Gallery;