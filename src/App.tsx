import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import { Navigation, MobileMenu } from './components/molecules';
import { Footer } from './components/organisms';
import { Home, About, Services, Membership, Contact, Careers, InternationalDrivingPermit } from './pages';
import { WhatsAppButton } from './components/atoms';

// MobileMenu is now imported from components/molecules

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
            minHeight: '100vh', 
            width: '100%',
            display: 'flex', 
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
          {/* Navigation */}
          <Navigation onMenuClick={handleMobileMenuToggle} />
          
          {/* Mobile Menu Drawer */}
          <MobileMenu open={mobileMenuOpen} onClose={handleMobileMenuClose} />
          
          {/* Main Content */}
          <Box sx={{ 
            flexGrow: 1,
            width: '100%',
            overflowX: 'hidden'
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/idp" element={<InternationalDrivingPermit />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/membership" element={<Membership />} />
            </Routes>
          </Box>
          
          {/* Footer */}
          <Footer />
          {/* WhatsApp Button */}
          <WhatsAppButton />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
