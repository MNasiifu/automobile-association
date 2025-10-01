import React, { useState, Suspense, useEffect } from 'react';
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
  ListItemIcon,
  Typography,
  Divider,
  Avatar,
  Fade,
  Slide,
  useTheme,
  alpha
} from '@mui/material';
import { 
  Close as CloseIcon, 
  ExpandMore, 
  ChevronRight,
  FiberManualRecord as DotIcon 
} from '@mui/icons-material';
import theme from './theme';
import { Navigation } from './components/molecules';
import { Footer } from './components/organisms';
import { WhatsAppButton } from './components/atoms';
import { ScrollToTop } from './components';
import { GlobalLoadingProvider } from './contexts';
import { 
  Home,
  Services,
  Contact,
  IdpAbout,
  ApplyForIdp,
  IdpApplicationSuccess,
  VerifyIdp,
  VehicleValuation,
  FleetManagement,
  RescueServices,
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
import { preloadFaceApiModels } from './utils/passportPhotoValidator';

// Enhanced Mobile Menu Component with Stunning UI/UX
const MobileMenu: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const location = useLocation();
  const theme = useTheme();
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
      transitionDuration={{ enter: 400, exit: 300 }}
      sx={{ 
        '& .MuiDrawer-paper': { 
          width: 320,
          background: `linear-gradient(135deg, ${alpha(theme.palette.grey[100], 0.98)} 0%, ${alpha(theme.palette.grey[50], 0.66)} 100%)`,
          backdropFilter: 'blur(20px)',
          borderLeft: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          boxShadow: `0 25px 50px -12px ${alpha(theme.palette.common.black, 0.25)}`,
        },
        '& .MuiBackdrop-root': {
          backgroundColor: alpha(theme.palette.common.black, 0.3),
          backdropFilter: 'blur(4px)',
        }
      }}
    >
      {/* Enhanced Header with Brand Identity */}
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              A
            </Typography>
          </Avatar>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2
              }}
            >
              AAU
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: alpha(theme.palette.text.secondary, 0.8),
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            >
              Navigation Menu
            </Typography>
          </Box>
        </Box>
        
        <IconButton 
          onClick={onClose}
          sx={{
            width: 44,
            height: 44,
            background: alpha(theme.palette.error.main, 0.1),
            border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
            color: theme.palette.error.main,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: alpha(theme.palette.error.main, 0.15),
              transform: 'rotate(90deg) scale(1.05)',
              boxShadow: `0 8px 16px ${alpha(theme.palette.error.main, 0.3)}`,
            }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Enhanced Navigation List */}
      <Box sx={{ p: 2, flexGrow: 1, overflow: 'auto' }}>
        <List sx={{ padding: 0 }}>
          {navigationItems.map((item: NavItem, index) => {
            const isActive = isActiveRoute(item.path);
            const isExpanded = expandedItems.has(item.label);
            
            if (item.children && item.children.length > 0) {
              return (
                <Fade 
                  in={open} 
                  timeout={300 + index * 50} 
                  key={item.path}
                  style={{ transitionDelay: open ? `${index * 50}ms` : '0ms' }}
                >
                  <Box sx={{ mb: 1 }}>
                    <ListItem 
                      onClick={() => toggleExpanded(item.label)}
                      sx={{
                        cursor: 'pointer',
                        borderRadius: 2,
                        mb: 0.5,
                        mx: 1,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        background: isActive 
                          ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`
                          : 'transparent',
                        border: isActive 
                          ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                          : `1px solid transparent`,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
                          transform: 'translateX(4px)',
                          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: isActive
                              ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                              : alpha(theme.palette.primary.main, 0.1),
                            color: isActive ? 'white' : theme.palette.primary.main,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <ChevronRight fontSize="small" />
                        </Box>
                      </ListItemIcon>
                      
                      <ListItemText 
                        primary={item.label}
                        sx={{ 
                          '& .MuiTypography-root': {
                            color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                            fontWeight: isActive ? 700 : 600,
                            fontSize: '1rem',
                            letterSpacing: '0.025em'
                          }
                        }}
                      />
                      
                      <Box
                        sx={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                        }}
                      >
                        <ExpandMore />
                      </Box>
                    </ListItem>
                    
                    <Collapse 
                      in={isExpanded} 
                      timeout={400}
                      sx={{
                        '& .MuiCollapse-wrapper': {
                          overflow: 'visible'
                        }
                      }}
                    >
                      <List component="div" disablePadding sx={{ ml: 1, position: 'relative' }}>
                        {/* Connecting Line */}
                        <Box
                          sx={{
                            position: 'absolute',
                            left: 32,
                            top: 8,
                            bottom: 8,
                            width: '2px',
                            background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.3)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                            borderRadius: 1,
                          }}
                        />
                        
                        {item.children.map((subItem, subIndex) => (
                          <Slide
                            key={subItem.path}
                            direction="right"
                            in={isExpanded}
                            timeout={200 + subIndex * 50}
                            style={{ transitionDelay: isExpanded ? `${subIndex * 50}ms` : '0ms' }}
                          >
                            <ListItem 
                              onClick={onClose}
                              component={Link}
                              {...({ to: subItem.path } as any)}
                              sx={{
                                pl: 6,
                                pr: 2,
                                py: 1.5,
                                mx: 1,
                                my: 0.5,
                                borderRadius: 2,
                                textDecoration: 'none',
                                color: 'inherit',
                                background: isActiveRoute(subItem.path)
                                  ? `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.12)} 0%, ${alpha(theme.palette.primary.main, 0.12)} 100%)`
                                  : 'transparent',
                                border: isActiveRoute(subItem.path)
                                  ? `1px solid ${alpha(theme.palette.secondary.main, 0.25)}`
                                  : '1px solid transparent',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                '&:hover': {
                                  background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`,
                                  transform: 'translateX(6px)',
                                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                                  boxShadow: `0 2px 8px ${alpha(theme.palette.secondary.main, 0.15)}`,
                                },
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  left: -12,
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  background: isActiveRoute(subItem.path)
                                    ? theme.palette.secondary.main
                                    : alpha(theme.palette.primary.main, 0.4),
                                  transition: 'all 0.3s ease',
                                  boxShadow: `0 0 0 3px ${alpha(theme.palette.background.paper, 1)}`,
                                }
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                {subItem.icon ? (
                                  <Box
                                    sx={{
                                      width: 24,
                                      height: 24,
                                      borderRadius: 1,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: isActiveRoute(subItem.path) 
                                        ? theme.palette.secondary.main 
                                        : alpha(theme.palette.text.secondary, 0.8),
                                      transition: 'all 0.3s ease'
                                    }}
                                  >
                                    {renderIcon(subItem.icon)}
                                  </Box>
                                ) : (
                                  <DotIcon
                                    sx={{
                                      fontSize: 8,
                                      color: isActiveRoute(subItem.path) 
                                        ? theme.palette.secondary.main 
                                        : alpha(theme.palette.primary.main, 0.6),
                                      margin: '0 8px',
                                    }}
                                  />
                                )}
                              </ListItemIcon>
                              
                              <ListItemText 
                                primary={subItem.label}
                                sx={{ 
                                  '& .MuiTypography-root': {
                                    color: isActiveRoute(subItem.path) 
                                      ? theme.palette.secondary.main 
                                      : theme.palette.text.primary,
                                    fontWeight: isActiveRoute(subItem.path) ? 600 : 500,
                                    fontSize: '0.9rem',
                                    letterSpacing: '0.02em'
                                  }
                                }}
                              />
                            </ListItem>
                          </Slide>
                        ))}
                      </List>
                    </Collapse>
                  </Box>
                </Fade>
              );
            }

            return (
              <Fade 
                in={open} 
                timeout={300 + index * 50} 
                key={item.path}
                style={{ transitionDelay: open ? `${index * 50}ms` : '0ms' }}
              >
                <ListItem 
                  onClick={onClose}
                  component={Link}
                  {...({ to: item.path } as any)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    mx: 1,
                    textDecoration: 'none',
                    color: 'inherit',
                    background: isActive 
                      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`
                      : 'transparent',
                    border: isActive 
                      ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                      : `1px solid transparent`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
                      transform: 'translateX(4px)',
                      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isActive
                          ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                          : alpha(theme.palette.primary.main, 0.1),
                        color: isActive ? 'white' : theme.palette.primary.main,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <ChevronRight fontSize="small" />
                    </Box>
                  </ListItemIcon>
                  
                  <ListItemText 
                    primary={item.label}
                    sx={{ 
                      cursor: 'pointer',
                      '& .MuiTypography-root': {
                        color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                        fontWeight: isActive ? 700 : 600,
                        fontSize: '1rem',
                        letterSpacing: '0.025em'
                      }
                    }}
                  />
                </ListItem>
              </Fade>
            );
          })}
        </List>
      </Box>

      {/* Enhanced Footer with Contact Info */}
      <Box sx={{ 
        p: 3, 
        mt: 'auto',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent 0%, ${alpha(theme.palette.primary.main, 0.3)} 50%, transparent 100%)`,
        }
      }}>
        <Divider sx={{ mb: 2, opacity: 0.3 }} />
        <Typography 
          variant="caption" 
          sx={{ 
            color: alpha(theme.palette.text.secondary, 0.8),
            fontSize: '0.75rem',
            fontWeight: 500,
            textAlign: 'center',
            display: 'block',
            lineHeight: 1.6
          }}
        >
          © 2024 Automobile Association Uganda
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: alpha(theme.palette.text.secondary, 0.6),
            fontSize: '0.7rem',
            textAlign: 'center',
            display: 'block',
            mt: 0.5
          }}
        >
          Excellence in Automotive Services
        </Typography>
      </Box>
    </Drawer>
  );
};

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Preload face-api models early in the app lifecycle
  useEffect(() => {
    preloadFaceApiModels();
  }, []);

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
        <GlobalLoadingProvider
          defaultConfig={{
            color: 'primary',
            height: 4,
            zIndex: 1301
          }}
        >
          <Router>
            {/* Scroll to top on route changes */}
            <ScrollToTop behavior="instant" />
            
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
                <Route path="/about/who-we-are" element={<WhoWeAre />} />
                <Route path="/about/team" element={<Team />} />
                <Route path="/about/affiliation" element={<Affiliation />} />
                <Route path="/about/careers" element={<Careers />} />
                <Route path="/about/gallery" element={<Gallery />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/vehicle-valuation" element={<VehicleValuation />} />
                <Route path="/services/fleet-management" element={<FleetManagement />} />
                <Route path="/services/rescue-services" element={<RescueServices />} />
                <Route path="/services/automotive-advisory" element={<AutomotiveAdvisory />} />
                <Route path="/membership" element={<MembershipPage />} />
                <Route path="/idp/about" element={<IdpAbout />} />
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
                <Route path="/demo/global-loading" element={
                  <Suspense fallback={<Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>}>
                    {React.createElement(React.lazy(() => import('./pages/GlobalLoadingDemo')))}
                  </Suspense>
                } />
                <Route path="/demo/scroll-to-top" element={
                  <Suspense fallback={<Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>}>
                    {React.createElement(React.lazy(() => import('./pages/ScrollToTopDemo')))}
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
      </GlobalLoadingProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
