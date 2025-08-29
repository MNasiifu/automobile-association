import React from 'react';
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
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
  useLocation,
} from 'react-router-dom';
import { Button } from '../atoms';
import { navigationItems, companyInfo } from '../../data/companyData';
import AAULogo from '../../assets/images/aau-logo.png';

interface NavigationProps {
  onMenuClick?: () => void;
}
type NavChild = { label: string; path: string };
type NavItem = { label: string; path: string; children?: NavChild[] };

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  cursor: 'pointer',
  '& img': { height: 56, width: 'auto', marginRight: theme.spacing(1.5) }, // bigger logo
  '& .logo-text': {
    fontWeight: 800,
    fontSize: '1.15rem',
    color: theme.palette.primary.main,
    letterSpacing: 0.2,
    [theme.breakpoints.down('sm')]: { display: 'none' },
  },
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginLeft: 'auto',
  flexWrap: 'nowrap',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: { display: 'none' },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  marginLeft: 'auto',
  [theme.breakpoints.up('md')]: { display: 'none' },
}));

const LinkBehavior = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  function LinkBehavior(props, ref) {
    return <RouterLink ref={ref} {...props} />;
  }
);

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
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = (delay = 140) => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => {
      setActiveKey(null);
      setAnchorEl(null);
      setChildrenItems([]);
    }, delay);
  };

  // Open on hover/focus instantly (re-anchors if switching parents)
  const handleParentEnter = (
    key: string,
    el: HTMLElement,
    kids?: NavChild[]
  ) => {
    cancelClose();
    if (kids && kids.length) {
      setActiveKey(key);
      setAnchorEl(el);
      setChildrenItems(kids);
    } else {
      // parent has no submenu -> ensure dropdown is closed
      setActiveKey(null);
      setAnchorEl(null);
      setChildrenItems([]);
    }
  };

  // Close when leaving both nav and the dropdown
  const handlePopperMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && navRef.current?.contains(next)) {
      // heading back to the nav bar; don't close here
      return;
    }
    scheduleClose(80);
  };

  return (
    <StyledAppBar position="sticky" elevation={trigger ? 2 : 0}>
      <Toolbar
        sx={{ px: { xs: 2, sm: 3, md: 4 }, minHeight: { xs: 64, md: 72 } }}
      >
        <Logo component={LinkBehavior} to="/" aria-label="AA Uganda Home">
          <img src={AAULogo} alt="AA Uganda Logo" />
          <Box className="logo-text">{companyInfo.phrase}</Box>
        </Logo>

        <NavLinks
          ref={navRef}
          role="navigation"
          aria-label="Primary"
          onMouseEnter={cancelClose}
          onMouseLeave={() => scheduleClose(140)}
        >
          {(navigationItems as unknown as NavItem[]).map((item) => {
            const active = isActiveRoute(item.path);
            const hasChildren = !!item.children?.length;
            const key = item.label;

            return (
              <Box
                key={key}
                onMouseEnter={(e) =>
                  handleParentEnter(
                    key,
                    e.currentTarget as HTMLElement,
                    item.children
                  )
                }
                onFocus={(e) =>
                  handleParentEnter(
                    key,
                    e.currentTarget as HTMLElement,
                    item.children
                  )
                }
              >
                <Button
                  variant="text"
                  component={LinkBehavior}
                  to={item.path}
                  endIcon={
                    hasChildren ? (
                      <KeyboardArrowDown sx={{ ml: 0.25 }} />
                    ) : undefined
                  }
                  aria-haspopup={hasChildren ? 'menu' : undefined}
                  aria-expanded={activeKey === key ? 'true' : undefined}
                  aria-controls={activeKey === key ? 'nav-popper' : undefined}
                  sx={{
                    color: active ? 'primary.dark' : 'text.primary',
                    fontWeight: active ? 800 : 600,
                    position: 'relative',
                    px: 1.15,
                    fontSize: { lg: 14, xl: 15 },
                    '&:after': active
                      ? {
                          content: '""',
                          position: 'absolute',
                          left: 10,
                          right: 10,
                          bottom: 6,
                          height: 3,
                          borderRadius: 3,
                          backgroundColor: 'secondary.main',
                        }
                      : {},
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                    },
                  }}
                >
                  {item.label}
                </Button>
              </Box>
            );
          })}

          {/* Apply for IDP — yellow bg + green text (uses your containedSecondary override) */}
          <Button
            variant="contained"
            color="secondary"
            component={LinkBehavior}
            to="/idp"
            sx={{ ml: 1.5, fontWeight: 900 }}
          >
            Apply for IDP
          </Button>
        </NavLinks>

        <Popper
          id="nav-popper"
          open={Boolean(activeKey)}
          anchorEl={anchorEl}
          placement="bottom-start"
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
              bgcolor: 'secondary.main',
              color: 'primary.main',
              minWidth: 240,
              boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
            }}
          >
            <List dense disablePadding sx={{ py: 0.5 }}>
              {childrenItems.map((c) => (
                <ListItemButton
                  key={c.path}
                  component={LinkBehavior}
                  to={c.path}
                  onClick={(e) => {
                    const isHash = c.path.includes('#');
                    if (isHash) {
                      const [base, rawHash] = c.path.split('#');
                      const hash = decodeURIComponent(rawHash || '');
                      if (location.pathname === base && hash) {
                        e.preventDefault(); // stay on the same route
                        const el = document.getElementById(hash);
                        if (el)
                          el.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          });
                      }
                    }
                    scheduleClose(0);
                  }}
                  sx={{
                    fontWeight: 500,
                    letterSpacing: 0.8,
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                    },
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, py: 0.5 }}>
                    {c.label}
                  </Typography>
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Popper>

        <MobileMenuButton
          color="inherit"
          aria-label="Open menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </MobileMenuButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navigation;
