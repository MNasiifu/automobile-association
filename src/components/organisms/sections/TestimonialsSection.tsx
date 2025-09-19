import React from 'react';
import { Box, Container, Typography, Grid, Avatar, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Card } from '../../atoms';
import { FormatQuote } from '@mui/icons-material';

const TestimonialsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: `linear-gradient(135deg, ${theme.palette.grey[200]} 0%, ${theme.palette.background.default} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%23f4d616" fill-opacity="0.03"%3E%3Cpath d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    zIndex: 1,
  },
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'visible',
  background: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease-in-out',
  
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    borderColor: theme.palette.primary.main,
    
    '& .quote-icon': {
      transform: 'scale(1.1) rotate(-5deg)',
      color: theme.palette.secondary.main,
    },
  },
}));

const QuoteIcon = styled(FormatQuote)(({ theme }) => ({
  position: 'absolute',
  top: -12,
  left: 24,
  fontSize: 48,
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.default,
  borderRadius: '50%',
  padding: 8,
  transition: 'all 0.3s ease-in-out',
  zIndex: 2,
}));

const TestimonialContent = styled(Box)(() => ({
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
}));

const CustomerInfo = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 'auto',
  paddingTop: 24,
}));

const testimonials = [
  {
    id: 1,
    name: 'Sarah Nakato',
    role: 'Business Owner',
    company: 'Kampala',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    content: 'AA Uganda saved me during a breakdown on the Kampala-Entebbe highway. Their rescue team arrived within 30 minutes and got me back on the road. Excellent service!',
    service: 'Rescue Services',
  },
  {
    id: 2,
    name: 'James Okello',
    role: 'Fleet Manager',
    company: 'Transport Company',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    content: 'As a fleet manager, I rely on AA Uganda for vehicle inspections and maintenance advice. Their expertise has helped us maintain our vehicles in top condition.',
    service: 'Vehicle Inspection',
  },
  {
    id: 3,
    name: 'Grace Atuhaire',
    role: 'New Driver',
    company: 'Mbarara',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    content: 'I learned to drive at AA Uganda\'s driving school. The instructors were patient and professional. I passed my test on the first try!',
    service: 'Driving School',
  },
  {
    id: 4,
    name: 'Peter Ssemwanga',
    role: 'Family Man',
    company: 'Jinja',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    content: 'AA Uganda\'s insurance services gave me peace of mind. When I had an accident, they handled everything professionally and quickly.',
    service: 'Insurance Services',
  },
  {
    id: 5,
    name: 'Mary Nalwoga',
    role: 'Solo Traveler',
    company: 'Gulu',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    content: 'Traveling alone as a woman, AA Uganda membership gives me confidence. Their 24/7 support means I\'m never stranded.',
    service: 'Emergency Support',
  },
  {
    id: 6,
    name: 'David Kato',
    role: 'Car Enthusiast',
    company: 'Fort Portal',
    avatar: '/api/placeholder/60/60',
    rating: 5,
    content: 'The automotive advisory service helped me choose the right car for Uganda\'s roads. Their expertise is unmatched.',
    service: 'Automotive Advisory',
  },
];

const TestimonialsOverview: React.FC = () => {
  return (
    <TestimonialsSection>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            color="primary"
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            What Our Members Say
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: 600, 
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
            }}
          >
            Real experiences from satisfied AA Uganda members across the country
          </Typography>
        </Box>

        {/* Testimonials Grid */}
        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} sm={6} lg={4} key={testimonial.id}>
              <TestimonialCard hover={false} padding={0}>
                <QuoteIcon className="quote-icon" />
                
                <TestimonialContent sx={{ p: 4, pt: 5 }}>
                  {/* Service Badge */}
                  <Box sx={{ mb: 2 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    >
                      {testimonial.service}
                    </Typography>
                  </Box>

                  {/* Rating */}
                  <Box sx={{ mb: 2 }}>
                    <Rating 
                      value={testimonial.rating} 
                      readOnly 
                      size="small"
                      sx={{ 
                        '& .MuiRating-iconFilled': {
                          color: 'secondary.main',
                        },
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 3,
                      lineHeight: 1.7,
                      fontStyle: 'italic',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem' }
                    }}
                  >
                    "{testimonial.content}"
                  </Typography>

                  {/* Customer Info */}
                  <CustomerInfo>
                    <Avatar 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{ 
                        width: 48, 
                        height: 48, 
                        mr: 2,
                        border: 2,
                        borderColor: 'primary.main',
                      }}
                    >
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    
                    <Box>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: 600,
                          fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}
                      >
                        {testimonial.role} • {testimonial.company}
                      </Typography>
                    </Box>
                  </CustomerInfo>
                </TestimonialContent>
              </TestimonialCard>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600, 
              mb: 2,
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
            }}
          >
            Join Thousands of Satisfied Members
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 4,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' }
            }}
          >
            Experience the same excellent service and peace of mind
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography 
              variant="h6" 
              color="primary"
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
              }}
            >
              ⭐ 4.9/5 Average Rating • 5000+ Happy Members
            </Typography>
          </Box>
        </Box>
      </Container>
    </TestimonialsSection>
  );
};

export default TestimonialsOverview;
