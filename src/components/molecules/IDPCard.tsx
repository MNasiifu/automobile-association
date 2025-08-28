import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { Check as CheckIcon, Schedule as ScheduleIcon, Language as LanguageIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Button } from '../atoms';
import type { IDPApplication } from '../../data/idpData';

interface IDPCardProps {
  application: IDPApplication;
  onSelect: (applicationId: string) => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'all 0.3s ease-in-out',
  border: `2px solid transparent`,
  
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[12],
    borderColor: theme.palette.primary.main,
  },
}));

const PopularBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -8,
  right: 16,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  padding: theme.spacing(0.5, 2),
  borderRadius: 12,
  fontSize: '0.75rem',
  fontWeight: 600,
  zIndex: 1,
}));

const PriceSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3, 2),
  backgroundColor: theme.palette.grey[50],
}));

const FeatureList = styled(List)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(1, 0),
  
  '& .MuiListItem-root': {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  
  '& .MuiListItemIcon-root': {
    minWidth: 32,
    color: theme.palette.success.main,
  },
  
  '& .MuiListItemText-root': {
    margin: 0,
  },
}));

const IDPCard: React.FC<IDPCardProps> = ({ application, onSelect }) => {
  const handleSelect = () => {
    onSelect(application.id);
  };

  return (
    <StyledCard>
      {application.popular && (
        <PopularBadge>
          Most Popular
        </PopularBadge>
      )}
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700 }}>
            {application.name}
          </Typography>
          
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
            {application.type}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            {application.description}
          </Typography>
        </Box>

        <PriceSection>
          <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: `${application.color}.main` }}>
            UGX {application.fee.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            One-time fee
          </Typography>
        </PriceSection>

        <Box sx={{ mt: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <ScheduleIcon sx={{ mr: 1, fontSize: 20, color: 'primary.main' }} />
            <Typography variant="body2">
              Processing: {application.processingTime}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LanguageIcon sx={{ mr: 1, fontSize: 20, color: 'primary.main' }} />
            <Typography variant="body2">
              Valid: {application.validityPeriod}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
            Coverage Includes:
          </Typography>
          
          <FeatureList dense>
            {application.coverage.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary={item}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            ))}
          </FeatureList>
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          color={application.color}
          fullWidth
          size="large"
          onClick={handleSelect}
          sx={{
            py: 1.5,
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          Apply for {application.name}
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default IDPCard;
