import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Breadcrumbs,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import { 
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { Heading } from '../atoms';

// Professional animation keyframes
const subtleFloat = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Modern header container with elegant design
const HeaderContainer = styled(Box)<{ $backgroundImage?: string }>(({ theme, $backgroundImage }) => ({
  position: 'relative',
  minHeight: '40vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  background: $backgroundImage 
    ? `linear-gradient(135deg, rgba(2, 121, 63, 0.9) 0%, rgba(2, 121, 63, 0.7) 100%), url(${$backgroundImage})`
    : `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  
  [theme.breakpoints.down('md')]: {
    minHeight: '35vh',
    backgroundAttachment: 'scroll',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '30vh',
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
    pointerEvents: 'none',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100px',
    background: 'linear-gradient(to top, rgba(255,255,255,0.1) 0%, transparent 100%)',
    pointerEvents: 'none',
  },
}));

// Elegant decorative elements
const DecorativeElement = styled(Box)<{ $size?: number; $left?: number; $top?: number; $opacity?: number }>(({ 
  theme, 
  $size = 60, 
  $left = 10, 
  $top = 20,
  $opacity = 0.1
}) => ({
  position: 'absolute',
  width: `${$size}px`,
  height: `${$size}px`,
  left: `${$left}%`,
  top: `${$top}%`,
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  borderRadius: '50%',
  opacity: $opacity,
  animation: `${subtleFloat} 6s ease-in-out infinite`,
  zIndex: 1,
}));

// Enhanced content container with advanced UI/UX practices
const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 10,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  
  '& .page-header-content': {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    borderRadius: theme.spacing(4),
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    position: 'relative',
    
    // Progressive spacing system
    padding: theme.spacing(3, 0),
    
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)',
    },
    
    // Enhanced responsive spacing
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(5, 5),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(4, 4),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 3),
      borderRadius: theme.spacing(3),
    },
    
    // Inner content wrapper for better organization
    '& .content-inner': {
      maxWidth: '900px',
      margin: '0 auto',
      textAlign: 'center',
    },
    
    // Visual hierarchy improvements
    '& .header-section': {
      marginBottom: theme.spacing(3),
      
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(2),
      },
    },
    
    '& .main-content': {
      position: 'relative',
      zIndex: 2,
    },
    
    // Subtle background pattern
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
      pointerEvents: 'none',
      zIndex: 1,
    },
  },
}));

// Enhanced title with superior typography
const AnimatedTitle = styled(Heading)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 800,
  textShadow: '0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)',
  marginBottom: theme.spacing(2),
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  animation: `${slideInUp} 0.8s ease-out`,
  position: 'relative',
  textAlign: 'center',
  
  // Enhanced text rendering
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  
  // Responsive scaling with better proportions
  fontSize: 'clamp(2.5rem, 4vw + 1rem, 4.5rem)',
  
  // Subtle text decoration for depth
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '3px',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
    borderRadius: '2px',
    opacity: 0.8,
  },
  
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(1.5),
    '&::after': {
      width: '40px',
      height: '2px',
      bottom: '-6px',
    },
  },
  
  [theme.breakpoints.down('sm')]: {
    letterSpacing: '-0.01em',
  },
}));

// Enhanced subtitle with improved readability
const AnimatedSubtitle = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.95)',
  fontSize: 'clamp(1.1rem, 2vw + 0.5rem, 1.4rem)',
  fontWeight: 400,
  lineHeight: 1.65,
  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
  marginBottom: theme.spacing(3),
  maxWidth: '700px',
  margin: '0 auto',
  animation: `${slideInUp} 1s ease-out 0.2s both`,
  
  // Better text rendering
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  
  // Enhanced spacing and readability
  letterSpacing: '0.01em',
  wordSpacing: '0.05em',
  
  // Responsive adjustments
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(2),
    maxWidth: '600px',
  },
  
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1.5),
    maxWidth: '100%',
    lineHeight: 1.6,
  },
}));

// Enhanced breadcrumbs with modern UX patterns
const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(15px)',
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(5),
  border: '1px solid rgba(255, 255, 255, 0.4)',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  animation: `${scaleIn} 0.6s ease-out 0.3s both`,
  display: 'inline-flex', // Better centering
  
  // Enhanced accessibility
  '&:focus-within': {
    outline: '2px solid rgba(255, 255, 255, 0.8)',
    outlineOffset: '2px',
  },
  
  '& .MuiBreadcrumbs-separator': {
    color: 'rgba(255, 255, 255, 0.8)',
    margin: theme.spacing(0, 1.5),
    fontSize: '1rem',
  },
  
  '& .MuiTypography-root': {
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    fontSize: '0.95rem',
    letterSpacing: '0.02em',
  },
  
  '& .MuiLink-root': {
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    padding: theme.spacing(0.75, 1.25),
    borderRadius: theme.spacing(2.5),
    fontWeight: 500,
    
    '&:hover, &:focus': {
      color: '#ffffff',
      background: 'rgba(255, 255, 255, 0.15)',
      transform: 'translateY(-1px) scale(1.02)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    
    '&:active': {
      transform: 'translateY(0) scale(0.98)',
    },
  },
  
  // Mobile optimization
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2),
    
    '& .MuiTypography-root, & .MuiLink-root': {
      fontSize: '0.875rem',
      gap: theme.spacing(0.5),
    },
    
    '& .MuiBreadcrumbs-separator': {
      margin: theme.spacing(0, 1),
    },
  },
}));

// Interfaces
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: string; // Optional badge/tag
  description?: string; // Additional description
  actions?: React.ReactNode; // Call-to-action buttons
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  backgroundImage,
  breadcrumbs = [],
  badge,
  description,
  actions
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Default breadcrumbs if none provided
  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: <HomeIcon sx={{ fontSize: '1rem' }} /> },
    { label: title }
  ];

  const finalBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

  // Decorative elements for visual appeal
  const decorativeElements = [
    { size: 80, left: 5, top: 15, opacity: 0.08 },
    { size: 120, left: 90, top: 10, opacity: 0.06 },
    { size: 60, left: 85, top: 80, opacity: 0.1 },
    { size: 100, left: 10, top: 85, opacity: 0.07 },
    { size: 90, left: 50, top: 5, opacity: 0.05 },
  ];

  return (
    <HeaderContainer $backgroundImage={backgroundImage}>
      {!isMobile && decorativeElements.map((element, index) => (
        <DecorativeElement
          key={index}
          $size={element.size}
          $left={element.left}
          $top={element.top}
          $opacity={element.opacity}
        />
      ))}

      <ContentContainer maxWidth="md">
        <Box className="page-header-content">
          <Box className="content-inner">
            <Box className="header-section">
              <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
                <StyledBreadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  {finalBreadcrumbs.map((crumb, index) => (
                    crumb.href ? (
                      <MuiLink key={index} href={crumb.href}>
                        {crumb.icon}
                        {crumb.label}
                      </MuiLink>
                    ) : (
                      <Typography key={index}>
                        {crumb.icon}
                        {crumb.label}
                      </Typography>
                    )
                  ))}
                </StyledBreadcrumbs>
              </Stack>

              {badge && (
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                  <Chip
                    label={badge}
                    sx={{
                      background: 'rgba(255, 203, 10, 0.2)',
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontWeight: 600,
                      border: '1px solid rgba(255, 203, 10, 0.3)',
                      fontSize: '0.875rem',
                      '&:hover': {
                        background: 'rgba(255, 203, 10, 0.3)',
                      },
                    }}
                  />
                </Box>
              )}
            </Box>

            <Box className="main-content">
              <AnimatedTitle variant="h1" component="h1">
                {title}
              </AnimatedTitle>

              {subtitle && (
                <AnimatedSubtitle>
                  {subtitle}
                </AnimatedSubtitle>
              )}

              {description && (
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    maxWidth: '600px',
                    margin: '0 auto',
                    mb: 4,
                    textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    animation: `${slideInUp} 1.2s ease-out 0.4s both`,
                  }}
                >
                  {description}
                </Typography>
              )}

              {(subtitle || description) && (
                <Divider
                  sx={{
                    my: 4,
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    height: '1px',
                    border: 'none',
                    maxWidth: '200px',
                    margin: '32px auto',
                  }}
                />
              )}

              {actions && (
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    mt: 4,
                    animation: `${slideInUp} 1s ease-out 0.6s both`,
                  }}
                >
                  {actions}
                </Stack>
              )}
            </Box>
          </Box>
        </Box>
      </ContentContainer>
      </HeaderContainer>
    );
  };

export default PageHeader;
