import React from 'react';
import { Box, Container, Typography, ImageList, ImageListItem } from '@mui/material';
import { PageHeader } from '../components/molecules';

// Import all images
import rescueImg from '../assets/images/AA-rescue.jpg';
import defensiveDrivingImg from '../assets/images/defensive-driving.jpeg';
import drivingSchoolImg from '../assets/images/driving-school.jpg';
import car1Img from '../assets/images/car1.jpeg';
import roadImg from '../assets/images/road.jpg';
import rescueServiceImg from '../assets/images/rescue.jpg';
import stripImg from '../assets/images/STRIPWEBSITE.png';
import towingImg from '../assets/images/TOWINGANDRECOVERYFRESHCAR.jpeg';

const Gallery: React.FC = () => {
  const images = [
    { img: rescueImg, title: 'AA Rescue Service' },
    { img: defensiveDrivingImg, title: 'Defensive Driving' },
    { img: drivingSchoolImg, title: 'Driving School' },
    { img: car1Img, title: 'Vehicle Services' },
    { img: roadImg, title: 'Road Safety' },
    { img: rescueServiceImg, title: 'Emergency Response' },
    { img: stripImg, title: 'AA Uganda Services' },
    { img: towingImg, title: 'Towing Service' },
  ];

  return (
    <Box>
      <PageHeader
        title="Gallery"
        subtitle="Visual journey through our services and activities"
      />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <ImageList variant="masonry" cols={3} gap={16}>
          {images.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                style={{ borderRadius: 8 }}
              />
              <Typography variant="caption" sx={{ mt: 1 }}>
                {item.title}
              </Typography>
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </Box>
  );
};

export default Gallery;