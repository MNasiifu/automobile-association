import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import theme from './theme';
import { Navigation } from './components/molecules';
import { Footer } from './components/organisms';
import { Home, About, Services, Membership, Contact, Careers } from './pages';
import { navigationItems } from './data/companyData';

// Mobile Menu Component
const MobileMenu: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const location = useLocation();
  
  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: 250 } }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List>
        {navigationItems.map((item) => {
          const isActive = isActiveRoute(item.path);
          return (
            <ListItem 
              key={item.path} 
              onClick={onClose}
              component={Link}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...({ to: item.path } as any)}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'primary.light',
                }
              }}
            >
              <ListItemText 
                primary={item.label}
                sx={{ 
                  cursor: 'pointer',
                  '& .MuiTypography-root': {
                    color: isActive ? 'secondary.main' : 'text.primary',
                    fontWeight: isActive ? 600 : 400,
                  }
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

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
          <MobileMenu open={mobileMenuOpen} onClose={handleMobileMenuClose} />
          
          {/* Main Content */}
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/idp" element={<Membership />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
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
