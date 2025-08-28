import React from 'react';
import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
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
  return (
    <StyledAppBar position="sticky" elevation={0}>
      <Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Logo 
          onClick={() => window.location.href = '/'}
          sx={{ 
            textDecoration: 'none',
            cursor: 'pointer'
          }}
        >
          <img src={AAULogo} alt="AA Uganda Logo" />
          <Box className="logo-text">{companyInfo.shortName}</Box>
        </Logo>
        
        <NavLinks>
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant="text"
              href={item.path}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
          
          <Button
            variant="contained"
            color="primary"
            href="/membership"
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
