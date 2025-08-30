import React from 'react';
import { Menu, MenuItem, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { menuIcons } from '../../data/navigationIcons';

import type { MenuIconKey } from '../../types/navigation';

interface SubMenuItem {
  readonly label: MenuIconKey;
  readonly path: string;
}

interface SubMenuProps {
  items: ReadonlyArray<SubMenuItem>;
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const SubMenu: React.FC<SubMenuProps> = ({ 
  items, 
  open, 
  anchorEl, 
  onClose 
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      elevation={3}
      keepMounted
      MenuListProps={{
        onMouseLeave: onClose
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      TransitionProps={{
        timeout: 200,
      }}
      PaperProps={{
        elevation: 3,
        sx: { 
          mt: 1,
          backgroundColor: 'white',
          borderRadius: 1,
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        }
      }}
      sx={{
        '& .MuiPaper-root': {
          mt: 1,
          minWidth: 180,
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          backgroundColor: '#ffffff',
        },
      }}
    >
      {items.map((item) => {
        const Icon = menuIcons[item.label];
        return (
          <MenuItem
            key={item.label}
            component={RouterLink}
            to={item.path}
            onClick={onClose}
            sx={{
              py: 1.5,
              px: 2,
              gap: 1.5,
              transition: 'all 0.2s ease',
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
                '& svg': {
                  color: 'white',
                },
              },
            }}
          >
            {Icon && (
              <Box
                component={Icon}
                sx={{
                  fontSize: 20,
                  color: 'text.secondary',
                  transition: 'color 0.2s ease',
                }}
              />
            )}
            {item.label}
          </MenuItem>
        );
      })}
    </Menu>
  );
};