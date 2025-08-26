import React from 'react';
import { Box, Container, Typography, Grid, Avatar } from '@mui/material';
import { Timeline, People, EmojiEvents, Security } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Heading, Card } from '../components/atoms';
import { companyInfo } from '../data/companyData';

const AboutSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

const StatsSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(6, 0),
}));

const StatCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  height: '100%',
  padding: theme.spacing(4),
}));

const IconWrapper = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: theme.palette.primary.main,
  margin: '0 auto 16px auto',
}));

const About: React.FC = () => {
  const stats = [
    {
      icon: <Timeline sx={{ fontSize: 40 }} />,
      number: '65+',
      label: 'Years of Service',
      description: 'Serving Uganda since 1955',
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      number: '10,000+',
      label: 'Active Members',
      description: 'Trusted by thousands',
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 40 }} />,
      number: '30+',
      label: 'Rescue Vehicles',
      description: 'Nationwide coverage',
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      number: '99%',
      label: 'Customer Satisfaction',
      description: 'Excellence in service',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <AboutSection>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Heading variant="h1" gutterBottom>
                About {companyInfo.shortName}
              </Heading>
              
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                Established in {companyInfo.founded}, the Automobile Association of Uganda 
                has been the trusted partner for motorists across the country for over six decades.
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                {companyInfo.mission}
              </Typography>
              
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                Our comprehensive range of services includes emergency rescue operations, 
                professional driving education, vehicle inspections, and automotive advisory 
                services. We pride ourselves on maintaining the highest standards of service 
                excellence and customer satisfaction.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/about-hero.jpg"
                alt="AA Uganda Team"
                sx={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </AboutSection>

      {/* Statistics Section */}
      <StatsSection>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Heading variant="h2" gutterBottom>
              Our Impact
            </Heading>
            <Typography variant="h6" color="text.secondary">
              Decades of excellence in automotive services
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StatCard>
                  <IconWrapper>
                    {stat.icon}
                  </IconWrapper>
                  
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                    {stat.number}
                  </Typography>
                  
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {stat.label}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    {stat.description}
                  </Typography>
                </StatCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </StatsSection>

      {/* Vision & Values Section */}
      <AboutSection>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Heading variant="h3" gutterBottom>
                Our Vision
              </Heading>
              
              <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                {companyInfo.vision}
              </Typography>
              
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                We envision a future where every motorist in Uganda has access to reliable, 
                professional automotive services that ensure their safety and confidence 
                on the road.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Heading variant="h3" gutterBottom>
                Our Values
              </Heading>
              
              <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                {companyInfo.values.map((value, index) => (
                  <Typography
                    key={index}
                    component="li"
                    variant="body1"
                    sx={{
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      '&:before': {
                        content: '"✓"',
                        color: 'primary.main',
                        fontWeight: 600,
                        marginRight: 2,
                        fontSize: '1.2rem',
                      },
                    }}
                  >
                    {value}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </AboutSection>
    </Box>
  );
};

export default About;
