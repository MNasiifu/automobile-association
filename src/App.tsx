import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
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
  InternationalDrivingPermit,
  ApplyForIdp,
  IdpApplicationSuccess,
  VerifyIdp,
  VehicleValuation,
  FleetManagement,
  RescueServices,
  VehicleInspection,
  InsuranceServices,
  AutomotiveAdvisory,
  MembershipPage,
  WhoWeAre,
  Team,
  Affiliation,
  Gallery,
  Careers
} from './pages';
import { navigationItems } from './data/companyData';
import * as Icons from '@mui/icons-material';
import type { NavItem } from './types/navigation';

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
        {navigationItems.map((item: NavItem) => {
          const isActive = isActiveRoute(item.path);
          const isExpanded = expandedItems.has(item.label);
          
          if (item.children && item.children.length > 0) {
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
                    {item.children.map((subItem) => (
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
                          {subItem.icon ? renderIcon(subItem.icon) : (
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: theme.palette.primary.main,
                                margin: '0 8px',
                              }}
                            />
                          )}
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
    <HelmetProvider context={{}}>
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
              overflowX: 'hidden',
              marginTop: { xs: '64px', md: '72px' } // This matches the minHeight values from Navigation's Toolbar
            }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/about/who-we-are" element={<WhoWeAre />} />
                <Route path="/about/team" element={<Team />} />
                <Route path="/about/affiliation" element={<Affiliation />} />
                <Route path="/about/careers" element={<Careers />} />
                <Route path="/about/gallery" element={<Gallery />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/vehicle-valuation" element={<VehicleValuation />} />
                <Route path="/services/fleet-management" element={<FleetManagement />} />
                <Route path="/services/rescue-services" element={<RescueServices />} />
                <Route path="/services/vehicle-inspection" element={<VehicleInspection />} />
                <Route path="/services/insurance-services" element={<InsuranceServices />} />
                <Route path="/services/automotive-advisory" element={<AutomotiveAdvisory />} />
                <Route path="/membership" element={<MembershipPage />} />
                <Route path="/idp" element={<InternationalDrivingPermit />} />
                <Route path="/idp/apply" element={<ApplyForIdp />} />
                <Route path="/idp/apply-success" element={<IdpApplicationSuccess />} />
                <Route path="/idp/verify" element={<VerifyIdp />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/driving-school/about" element={
                  <Suspense fallback={<Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>}>
                    {React.createElement(React.lazy(() => import('./pages/driving-school/About')))}
                  </Suspense>
                } />
                <Route path="/driving-school/refresher" element={
                  <Suspense fallback={<Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>}>
                    {React.createElement(React.lazy(() => import('./pages/driving-school/Refresher')))}
                  </Suspense>
                } />
              </Routes>
            </Box>
            
            {/* Footer */}
            <Footer />
            {/* WhatsApp Button */}
            <WhatsAppButton />
          </Box>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
