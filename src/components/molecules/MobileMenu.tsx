import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  Box,
  List,
  ListItemText,
  IconButton,
  Collapse,
  ListItemButton,
  Button,
} from '@mui/material';
import {
  Close as CloseIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { navigationItems } from '../../data/companyData';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
  const location = useLocation();
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleSubMenuToggle = (label: string) => {
    setOpenSubMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '85%', sm: 320 } } }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/idp"
          onClick={onClose}
          sx={{
            fontWeight: 900,
            bgcolor: 'secondary.main',
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'secondary.light',
              color: 'primary.dark',
            },
          }}
        >
          Apply for IDP
        </Button>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ px: 1, mt: 1 }}>
        {navigationItems.map((item) => {
          const isActive = isActiveRoute(item.path);
          const hasChildren = !!item.children?.length;
          const isSubMenuOpen = openSubMenus.includes(item.label);

          return (
            <React.Fragment key={item.path}>
              <ListItemButton
                onClick={() => {
                  if (hasChildren) {
                    handleSubMenuToggle(item.label);
                  } else {
                    onClose();
                  }
                }}
                component={hasChildren ? 'div' : Link}
                {...(!hasChildren ? { to: item.path } : {})}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  color: isActive ? 'primary.main' : 'text.primary',
                  bgcolor: isActive ? 'primary.lighter' : 'transparent',
                  '&:hover': {
                    bgcolor: 'primary.lighter',
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: isActive ? 600 : 500,
                    },
                  }}
                />
                {hasChildren && (isSubMenuOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {hasChildren && (
                <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.path}
                        component={Link}
                        to={child.path}
                        onClick={onClose}
                        sx={{
                          pl: 4,
                          py: 0.75,
                          borderRadius: 1,
                          ml: 1,
                          mb: 0.5,
                          color: isActiveRoute(child.path)
                            ? 'primary.main'
                            : 'text.secondary',
                          bgcolor: isActiveRoute(child.path)
                            ? 'primary.lighter'
                            : 'transparent',
                          '&:hover': {
                            bgcolor: 'primary.lighter',
                          },
                        }}
                      >
                        <ListItemText
                          primary={child.label}
                          sx={{
                            '& .MuiTypography-root': {
                              fontSize: '0.9rem',
                              fontWeight: isActiveRoute(child.path) ? 600 : 400,
                            },
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

export default MobileMenu;