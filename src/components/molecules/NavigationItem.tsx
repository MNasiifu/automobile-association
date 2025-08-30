import React, { useState } from 'react';
import { Button, Box, ButtonBase } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { SubMenu } from './SubMenu';
import type { MenuIconKey } from '../../types/navigation';

interface NavigationItemProps {
  label: string;
  path: string;
  active: boolean;
  children?: ReadonlyArray<{ readonly label: MenuIconKey; readonly path: string }>;
  open?: boolean;
  anchorEl?: HTMLElement | null;
  childrenItems?: ReadonlyArray<{ readonly label: MenuIconKey; readonly path: string }>;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  path,
  active,
  children,
  open,
  anchorEl,
  childrenItems,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <Box
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{ 
        position: 'relative',
        '&:hover': {
          '& > a > button': {
            color: 'primary.main',
          }
        }
      }}
    >
      <RouterLink
        to={path}
        style={{ textDecoration: 'none' }}
      >
        <Button
          variant="text"
          className={active ? 'active' : ''}
          endIcon={children && <KeyboardArrowDown />}
          sx={{
            color: active ? 'primary.main' : 'text.primary',
            fontWeight: active ? 700 : 500,
            px: 1.15,
            fontSize: { lg: 14, xl: 15 },
            transition: 'all 0.2s ease-in-out',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'primary.main',
            },
            '&:after': active || open ? {
              content: '""',
              position: 'absolute',
              left: 4,
              right: 4,
              bottom: 3,
              height: 3,
              backgroundColor: 'secondary.main',
              transition: 'transform 0.2s ease-in-out',
              transform: 'scaleX(1)',
            } : {
              content: '""',
              position: 'absolute',
              left: 4,
              right: 4,
              bottom: 3,
              height: 3,
              backgroundColor: 'secondary.main',
              transition: 'transform 0.2s ease-in-out',
              transform: 'scaleX(0)',
            }
          }}
        >
          {label}
        </Button>
      </RouterLink>

      {children && (
        <SubMenu
          items={childrenItems || children}
          open={Boolean(open)}
          anchorEl={anchorEl || null}
          onClose={() => onMouseLeave?.()}
        />
      )}
    </Box>
  );
};