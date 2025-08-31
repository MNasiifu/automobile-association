import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { 
  ThemeProvider, 
  CssBaseline, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton,
  Collapse,
  ListItemIcon
} from '@mui/material';
import { Close as CloseIcon, ExpandLess, ExpandMore } from '@mui/icons-material';
import theme from './theme';
import { Navigation } from './components/molecules';
import { Footer } from './components/organisms';
import { WhatsAppButton } from './components/atoms';
import { 
  Home, 
  About, 
  Services,
  Contact,
  Careers,
  InternationalDrivingPermit,
  VehicleValuation,
  FleetManagement,
  RescueServices,
  VehicleInspection,
  InsuranceServices,
  AutomotiveAdvisory,
  MembershipPage
} from './pages';
import { navigationItems, type NavigationItem } from './data/companyData';
import * as Icons from '@mui/icons-material';

// Mobile Menu Component
const MobileMenu: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  
  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleExpanded = (itemLabel: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemLabel)) {
      newExpanded.delete(itemLabel);
    } else {
      newExpanded.add(itemLabel);
    }
    setExpandedItems(newExpanded);
  };

  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent fontSize="small" /> : null;
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: 280 } }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List>
        {navigationItems.map((item: NavigationItem) => {
          const isActive = isActiveRoute(item.path);
          const isExpanded = expandedItems.has(item.label);
          
          if (item.submenu && item.submenu.length > 0) {
            return (
              <React.Fragment key={item.path}>
                <ListItem 
                  onClick={() => toggleExpanded(item.label)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    }
                  }}
                >
                  <ListItemText 
                    primary={item.label}
                    sx={{ 
                      '& .MuiTypography-root': {
                        color: isActive ? 'secondary.main' : 'text.primary',
                        fontWeight: isActive ? 600 : 400,
                      }
                    }}
                  />
                  {isExpanded ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenu.map((subItem) => (
                      <ListItem 
                        key={subItem.path}
                        onClick={onClose}
                        component={Link}
                        {...({ to: subItem.path } as any)}
                        sx={{
                          pl: 4,
                          textDecoration: 'none',
                          color: 'inherit',
                          '&:hover': {
                            backgroundColor: 'primary.light',
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {renderIcon(subItem.icon)}
                        </ListItemIcon>
                        <ListItemText 
                          primary={subItem.label}
                          sx={{ 
                            '& .MuiTypography-root': {
                              color: isActiveRoute(subItem.path) ? 'secondary.main' : 'text.primary',
                              fontWeight: isActiveRoute(subItem.path) ? 600 : 400,
                              fontSize: '0.9rem',
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          }

          return (
            <ListItem 
              key={item.path} 
              onClick={onClose}
              component={Link}
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
              <Route path="/services/vehicle-valuation" element={<VehicleValuation />} />
              <Route path="/services/fleet-management" element={<FleetManagement />} />
              <Route path="/services/rescue-services" element={<RescueServices />} />
              <Route path="/services/vehicle-inspection" element={<VehicleInspection />} />
              <Route path="/services/insurance-services" element={<InsuranceServices />} />
              <Route path="/services/automotive-advisory" element={<AutomotiveAdvisory />} />
              <Route path="/services/membership" element={<MembershipPage />} />
              <Route path="/idp" element={<InternationalDrivingPermit />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
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
