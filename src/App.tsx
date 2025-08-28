import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import theme from './theme';
import { Navigation } from './components/molecules';
import { Footer } from './components/organisms';
import { Home, About, Services, Membership, Contact } from './pages';
import { navigationItems } from './data/companyData';

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
        <Box sx={{ minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
          {/* Navigation */}
          <Navigation onMenuClick={handleMobileMenuToggle} />
          
          {/* Mobile Menu Drawer */}
          <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={handleMobileMenuClose}
            sx={{ '& .MuiDrawer-paper': { width: 250 } }}
          >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={handleMobileMenuClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            <List>
              {navigationItems.map((item) => (
                <ListItem key={item.path} onClick={handleMobileMenuClose}>
                  <ListItemText 
                    primary={item.label}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => window.location.href = item.path}
                  />
                </ListItem>
              ))}
            </List>
          </Drawer>
          
          {/* Main Content */}
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/idp" element={<Membership />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Box>
          
          {/* Footer */}
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
