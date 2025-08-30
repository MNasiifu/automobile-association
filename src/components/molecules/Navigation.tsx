import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Menu as MenuIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '../atoms';
import { navigationItems, companyInfo, type NavigationItem } from '../../data/companyData';
import AAULogo from '../../assets/images/aau-logo.png';
import * as Icons from '@mui/icons-material';

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

const DropdownButton = styled(Button)(({ theme }) => ({
  '& .MuiButton-endIcon': {
    marginLeft: theme.spacing(0.5),
    transition: 'transform 0.2s ease-in-out',
  },
  '&[aria-expanded="true"] .MuiButton-endIcon': {
    transform: 'rotate(180deg)',
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(0.25), // Further reduced gap for seamless hover transition
    minWidth: 220,
    borderRadius: theme.spacing(1),
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${theme.palette.grey[200]}`,
    '& .MuiMenuItem-root': {
      padding: theme.spacing(1.5, 2),
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
      },
    },
  },
}));

const MenuItemContent = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: '100%',
}));

const Navigation: React.FC<NavigationProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<number | null>(null);
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  // Helper function to determine if a navigation item is active
  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>, itemLabel: string) => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    
    setAnchorEl(event.currentTarget);
    setActiveDropdown(itemLabel);
  };

  const handleDropdownClose = () => {
    // Only close if the menu is not being hovered
    if (!isMenuHovered) {
      setAnchorEl(null);
      setActiveDropdown(null);
    }
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>, itemLabel: string) => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    
    setAnchorEl(event.currentTarget);
    setActiveDropdown(itemLabel);
  };

  const handleMouseLeave = () => {
    // Only set timeout if menu is not being hovered
    if (!isMenuHovered) {
      const timeout = setTimeout(() => {
        setAnchorEl(null);
        setActiveDropdown(null);
      }, 200); // Increased delay for better UX
      
      setHoverTimeout(timeout);
    }
  };

  const handleMenuMouseEnter = () => {
    // Clear the timeout and set menu as hovered
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsMenuHovered(true);
  };

  const handleMenuMouseLeave = () => {
    // Reset menu hover state and close the dropdown with a slight delay
    setIsMenuHovered(false);
    const timeout = setTimeout(() => {
      setAnchorEl(null);
      setActiveDropdown(null);
    }, 100);
    
    setHoverTimeout(timeout);
  };

  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent fontSize="small" /> : null;
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
          {navigationItems.map((item: NavigationItem) => {
            const isActive = isActiveRoute(item.path);
            
            if (item.submenu && item.submenu.length > 0) {
              return (
                <Box
                  key={item.path}
                  sx={{ position: 'relative' }}
                  onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <DropdownButton
                    variant="text"
                    endIcon={<ExpandMoreIcon />}
                    onClick={(e) => handleDropdownOpen(e, item.label)}
                    aria-expanded={activeDropdown === item.label}
                    sx={{
                      color: isActive ? 'primary.dark' : 'text.primary',
                      fontWeight: isActive ? 600 : 400,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    {item.label}
                  </DropdownButton>
                  
                  <StyledMenu
                    anchorEl={anchorEl}
                    open={activeDropdown === item.label}
                    onClose={handleDropdownClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                      onMouseEnter: handleMenuMouseEnter,
                      onMouseLeave: handleMenuMouseLeave,
                    }}
                    PaperProps={{
                      onMouseEnter: handleMenuMouseEnter,
                      onMouseLeave: handleMenuMouseLeave,
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    {item.submenu.map((subItem) => (
                      <MenuItem
                        key={subItem.path}
                        component={Link}
                        to={subItem.path}
                        onClick={handleDropdownClose}
                        sx={{
                          color: isActiveRoute(subItem.path) ? 'primary.main' : 'text.primary',
                          fontWeight: isActiveRoute(subItem.path) ? 600 : 400,
                        }}
                      >
                        <MenuItemContent>
                          {renderIcon(subItem.icon)}
                          <Typography variant="body2">{subItem.label}</Typography>
                        </MenuItemContent>
                      </MenuItem>
                    ))}
                  </StyledMenu>
                </Box>
              );
            }

            return (
              <Button
                key={item.path}
                variant="text"
                component={Link}
                {...({ to: item.path } as any)}
                sx={{
                  color: isActive ? 'primary.dark' : 'text.primary',
                  fontWeight: isActive ? 600 : 400,
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
            {...({ to: '/idp' } as any)}
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
