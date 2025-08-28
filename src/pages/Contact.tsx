import React from 'react';
import { Box, Container, Typography, Grid, TextField, Paper } from '@mui/material';
import { Phone, Email, LocationOn, AccessTime } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Heading, Button, Card } from '../components/atoms';
import { PageHeader } from '../components/molecules';
import { companyInfo } from '../data/companyData';

const ContactSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

const MapSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(6, 0),
}));

const ContactCard = styled(Card)(({ theme }) => ({
  height: '100%',
  textAlign: 'center',
  padding: theme.spacing(4),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px auto',
}));

const FormSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
}));

const GoogleMapEmbed = styled('iframe')(() => ({
  width: '100%',
  height: '400px',
  border: 'none',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

const Contact: React.FC = () => {
  const contactMethods = [
    {
      icon: <Phone sx={{ fontSize: 28 }} />,
      title: 'Phone',
      primary: companyInfo.contact.phone,
      secondary: 'Mon - Fri: 8AM - 6PM',
    },
    {
      icon: <Email sx={{ fontSize: 28 }} />,
      title: 'Email',
      primary: companyInfo.contact.email,
      secondary: 'We respond within 24 hours',
    },
    {
      icon: <LocationOn sx={{ fontSize: 28 }} />,
      title: 'Address',
      primary: companyInfo.address.street,
      secondary: `${companyInfo.address.city}, ${companyInfo.address.country}`,
    },
    {
      icon: <AccessTime sx={{ fontSize: 28 }} />,
      title: 'Business Hours',
      primary: 'Mon - Fri: 8:00 AM - 6:00 PM',
      secondary: 'Sat: 9:00 AM - 4:00 PM',
    },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  // Google Maps embed URL for Plot 4 Old Port Bell Rd, Uganda
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7613874618946!2d32.6181637!3d0.3476000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb6c6c6c6c6c%3A0x6c6c6c6c6c6c6c6c!2sPlot%204%20Old%20Port%20Bell%20Rd%2C%20Kampala%2C%20Uganda!5e0!3m2!1sen!2sus!4v1635789123456!5m2!1sen!2sus`;

  return (
    <Box>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with AAU for emergency assistance, inquiries, or to learn more about our services."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' }
        ]}
      />

      {/* Contact Methods Section */}
      <ContactSection>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {contactMethods.map((method, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ContactCard>
                  <IconWrapper>
                    {method.icon}
                  </IconWrapper>
                  
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {method.title}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                    {method.primary}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    {method.secondary}
                  </Typography>
                </ContactCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ContactSection>

      {/* Contact Form & Map Section */}
      <MapSection>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} md={6}>
              <FormSection elevation={2}>
                <Heading variant="h3" gutterBottom>
                  Send us a Message
                </Heading>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Fill out the form below and we'll get back to you as soon as possible.
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={4}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </FormSection>
            </Grid>
            
            {/* Map */}
            <Grid item xs={12} md={6}>
              <Box>
                <Heading variant="h3" gutterBottom>
                  Find Us Here
                </Heading>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Visit our headquarters located at Plot 4 Old Port Bell Road, Kampala.
                </Typography>
                
                <GoogleMapEmbed
                  src={mapSrc}
                  title="AA Uganda Location"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                
                <Box sx={{ mt: 3, p: 3, backgroundColor: 'background.paper', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Emergency Assistance
                  </Typography>
                  
                  <Typography variant="body1" color="primary" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                    24/7 Hotline: {companyInfo.contact.phone}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    For immediate roadside assistance and emergency services
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </MapSection>
    </Box>
  );
};

export default Contact;
