import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Popper,
  Paper,
  List,
  ListItemButton,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { Menu as MenuIcon, KeyboardArrowDown } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Button } from '../atoms';
import { navigationItems, companyInfo } from '../../data/companyData';
import AAULogo from '../../assets/images/aau-logo.png';
import * as Icons from '@mui/icons-material';

type NavChild = { label: string; path: string; icon?: string };
type NavItem = { label: string; path: string; children?: NavChild[] };

interface NavigationProps {
  onMenuClick?: () => void;
}

// Forwarded Link so MUI components accept `to`
type RouterLinkProps = React.ComponentProps<typeof RouterLink>;
const LinkBehavior = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  function LinkBehavior(props, ref) {
    return <RouterLink ref={ref} {...props} />;
  }
);

interface StyledAppBarProps {
  trigger: boolean;
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'trigger',
})<StyledAppBarProps>(({ theme, trigger }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  boxShadow: trigger ? '0 2px 12px rgba(0, 0, 0, 0.12)' : '0 2px 12px rgba(0, 0, 0, 0.08)',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  transform: `translateY(0)`,
  '& .MuiToolbar-root': {
    justifyContent: 'space-between',
  }
}));

const Logo = styled(RouterLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  cursor: 'pointer',
  flexShrink: 0,
  marginRight: theme.spacing(2),
  '& img': {
    height: 48,
    width: 'auto',
    marginRight: theme.spacing(1.25),
  },
  '& .logo-text': {
    fontWeight: 500,
    fontSize: '0.85rem',
    color: theme.palette.primary.main,
    whiteSpace: 'nowrap',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginLeft: theme.spacing(1),
    padding: theme.spacing(0.5, 0),
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2px',
      background: `linear-gradient(90deg, ${theme.palette.secondary.main}00, ${theme.palette.secondary.main}, ${theme.palette.secondary.main}00)`,
      opacity: 0.5,
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  flex: 1,
  justifyContent: 'flex-end',
  '& .nav-items': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  '& .apply-button': {
    marginLeft: theme.spacing(2),
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: theme.spacing(1),
      padding: theme.spacing(1, 2),
    },
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const CLOSE_DELAY = 120;

const Navigation: React.FC<NavigationProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const trigger = useScrollTrigger({ threshold: 6 });

  const [activeKey, setActiveKey] = React.useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [childrenItems, setChildrenItems] = React.useState<NavChild[]>([]);
  const navRef = React.useRef<HTMLDivElement | null>(null);
  const popperRef = React.useRef<HTMLDivElement | null>(null);
  const closeTimer = React.useRef<number | null>(null);

  const isActiveRoute = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent fontSize="small" /> : null;
  };

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = (delay = CLOSE_DELAY) => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => {
      setActiveKey(null);
      setAnchorEl(null);
      setChildrenItems([]);
    }, delay);
  };

  // Open instantly on hover/focus; close instantly if no submenu
  const handleParentEnter = (key: string, el: HTMLElement, kids?: NavChild[]) => {
    cancelClose();
    const hasKids = !!kids?.length;

    if (hasKids) {
      setActiveKey((prev) => (prev === key ? prev : key));
      setAnchorEl(el);
      setChildrenItems(kids!);
    } else {
      setActiveKey(null);
      setAnchorEl(null);
      setChildrenItems([]);
    }
  };

  // Close dropdown if the pointer leaves both the nav and popper
  const handlePopperMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && navRef.current?.contains(next)) return; // moving back to nav
    scheduleClose(80);
  };

  const openDropdown = Boolean(activeKey && childrenItems.length > 0);

  return (
    <StyledAppBar trigger={trigger} elevation={trigger ? 2 : 0}>
      <Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 }, minHeight: { xs: 64, md: 72 } }}>
        <Logo to="/" aria-label="AA Uganda Home">
          <img src={AAULogo} alt="AA Uganda Logo" />
          <Typography className="logo-text">{companyInfo.phrase}</Typography>
        </Logo>

        <NavLinks
          ref={navRef}
          role="navigation"
          aria-label="Primary"
          onMouseEnter={cancelClose}
          onMouseLeave={() => scheduleClose(CLOSE_DELAY)}
        >
          <Box className="nav-items">
            {(navigationItems as unknown as NavItem[]).map((item) => {
              const active = isActiveRoute(item.path);
              const hasChildren = !!item.children?.length;
              const key = item.label;

              return (
                <Box
                  key={key}
                  onMouseEnter={(e) =>
                    handleParentEnter(key, e.currentTarget as HTMLElement, item.children)
                  }
                  onFocus={(e) =>
                    handleParentEnter(key, e.currentTarget as HTMLElement, item.children)
                  }
                  sx={{ flexShrink: 0 }}
                >
                  <Button
                    variant="text"
                    component={LinkBehavior as any}
                    {...({ to: item.path } as any)}
                    endIcon={hasChildren ? <KeyboardArrowDown sx={{ ml: 0.25 }} /> : undefined}
                    aria-haspopup={hasChildren ? 'menu' : undefined}
                    aria-expanded={activeKey === key ? 'true' : undefined}
                    aria-controls={activeKey === key ? 'nav-popper' : undefined}
                    sx={{
                      color: active ? 'primary.dark' : 'text.primary',
                      fontWeight: active ? 800 : 600,
                      position: 'relative',
                      whiteSpace: 'nowrap',
                      fontSize: { xs: '0.875rem', md: '0.9375rem' },
                      textTransform: 'none',
                      minWidth: 'unset',
                      padding: { xs: '4px 8px', md: '6px 12px' },
                      '&.MuiButton-root': {
                        border: 'none',
                        boxShadow: 'none',
                      },
                      '&:after': active
                        ? {
                            content: '""',
                            position: 'absolute',
                            left: 8,
                            right: 8,
                            bottom: 4,
                            height: 2,
                            borderRadius: 1,
                            backgroundColor: 'secondary.main',
                          }
                        : {},
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: 'primary.main',
                        boxShadow: 'none',
                      },
                      '&:active': {
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </Box>
              );
            })}
          </Box>

          <Button
            className="apply-button"
            variant="contained"
            color="secondary"
            component={LinkBehavior as any}
            {...({ to: '/idp' } as any)}
            sx={{
              fontWeight: 900,
              bgcolor: 'secondary.main',
              color: 'primary.main',
              flexShrink: 0,
              '&:hover': {
                bgcolor: 'secondary.light',
                color: 'primary.dark',
                boxShadow: '0 6px 18px rgba(2,79,49,0.25)',
              },
            }}
          >
            Apply for IDP
          </Button>
        </NavLinks>

        <Popper
          id="nav-popper"
          open={openDropdown}
          anchorEl={anchorEl}
          placement="bottom-start"
          disablePortal
          sx={{ zIndex: (t) => t.zIndex.modal + 1 }}
          onMouseEnter={cancelClose}
          onMouseLeave={handlePopperMouseLeave}
        >
          <Paper
            ref={popperRef}
            elevation={6}
            sx={{
              mt: 1,
              borderRadius: 1,
              color: 'text.primary',
              minWidth: 240,
              boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
              backgroundColor: '#ffffff',
            }}
          >
            <List dense disablePadding sx={{ py: 0.5 }}>
              {childrenItems.map((c) => (
                <ListItemButton
                  key={c.path}
                  component={LinkBehavior as any}
                  {...({ to: c.path } as any)}
                  onClick={(e) => {
                    // Smooth-scroll if this is a same-page hash link
                    const isHash = c.path.includes('#');
                    if (isHash) {
                      const [base, rawHash] = c.path.split('#');
                      const hash = decodeURIComponent(rawHash || '');
                      if (location.pathname === base && hash) {
                        e.preventDefault();
                        const el = document.getElementById(hash);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                    scheduleClose(0);
                  }}
                  sx={{
                    fontWeight: 600,
                    letterSpacing: 0.2,
                    py: 1.5,
                    px: 2,
                    gap: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '& .menu-icon': {
                        color: 'secondary.main'
                      }
                    },
                  }}
                >
                  <Box 
                    className="menu-icon"
                    sx={{ 
                      width: 20, 
                      height: 20, 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'secondary.dark'
                    }}
                  >
                    {c.icon ? renderIcon(c.icon) : (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: 'secondary.dark',
                        }}
                      />
                    )}
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {c.label}
                  </Typography>
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Popper>

        <MobileMenuButton color="inherit" aria-label="Open menu" onClick={onMenuClick}>
          <MenuIcon />
        </MobileMenuButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navigation;
