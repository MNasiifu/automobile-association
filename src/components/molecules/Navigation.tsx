import React from 'react';
import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '../atoms';
import { navigationItems, companyInfo } from '../../data/companyData';
import AAULogo from '../../assets/images/aau-logo.png';

interface NavigationProps {
  onMenuClick?: () => void;
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  cursor: 'pointer',
  
  '& img': {
    height: 40,
    width: 'auto',
    marginRight: theme.spacing(1),
  },
  
  '& .logo-text': {
    fontWeight: 700,
    fontSize: '1.2rem',
    color: theme.palette.primary.main,
    
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginLeft: 'auto',
  
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  marginLeft: 'auto',
  
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const Navigation: React.FC<NavigationProps> = ({ onMenuClick }) => {
  const location = useLocation();
  
  // Helper function to determine if a navigation item is active
  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <StyledAppBar position="sticky" elevation={0}>
      <Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Logo 
          component={Link}
          {...({ to: '/' } as any)}
          sx={{ 
            textDecoration: 'none',
            cursor: 'pointer'
          }}
        >
          <img src={AAULogo} alt="AA Uganda Logo" />
          <Box className="logo-text">{companyInfo.shortName}</Box>
        </Logo>
        
        <NavLinks>
          {navigationItems.map((item) => {
            const isActive = isActiveRoute(item.path);
            return (
              <Button
                key={item.path}
                variant="text"
                component={Link}
                {...({ to: item.path } as any)}
                sx={{
                  color: isActive ? 'primary.dark' : 'text.primary',
                  fontWeight: isActive ? 600 : 400,
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
          
          <Button
            variant="contained"
            color="primary"
            component={Link}
            {...({ to: '/membership' } as any)}
            sx={{ 
              ml: 2,
              '&:hover': {
                color: 'secondary.main',
                fontWeight: 600
              }
            }}
          >
            Apply for IDP
          </Button>
        </NavLinks>
        
        <MobileMenuButton
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </MobileMenuButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navigation;
