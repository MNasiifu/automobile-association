import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Card, Button } from '../atoms';

/**
 * ServiceCard Props Interface
 * Enhanced to support a centered "Read More" button at the bottom
 */
interface ServiceCardProps {
  /** Title of the service */
  title: string;
  /** Brief description of the service */
  description: string;
  /** Material-UI icon name (string) for the service */
  icon: string;
  /** Optional array of service features/benefits */
  features?: string[];
  /** Optional click handler for the entire card */
  onClick?: () => void;
  /** Optional click handler for the "Read More" button */
  onReadMore?: () => void;
  /** Whether to show the "Read More" button (default: true) */
  showReadMore?: boolean;
  /** Custom text for the "Read More" button (default: "Read More") */
  readMoreText?: string;
}

const StyledServiceCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  
  '&:hover': {
    '& .service-icon': {
      transform: 'scale(1.1)',
    },
  },
}));

const IconWrapper = styled(Avatar)(({ theme }) => ({
  width: 64,
  height: 64,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  margin: '0 auto 16px auto',
  transition: 'transform 0.2s ease-in-out',
}));

/**
 * ServiceCard Component
 * 
 * A reusable card component for displaying service information with an optional
 * "Read More" button centered at the bottom. The component supports both card-level
 * click handling and separate "Read More" button functionality.
 * 
 * Features:
 * - Responsive design with hover effects
 * - Dynamic Material-UI icon support
 * - Features list with truncation (shows first 3, indicates more)
 * - Centered "Read More" button with customizable text
 * - Event propagation handling to prevent conflicts between card and button clicks
 * - Fully customizable through props
 * 
 * @param props - ServiceCardProps interface
 * @returns JSX.Element - The rendered ServiceCard component
 * 
 * @example
 * ```tsx
 * <ServiceCard
 *   title="Fleet Management"
 *   description="Comprehensive fleet management solutions"
 *   icon="DirectionsCar"
 *   features={["GPS Tracking", "Driver Monitoring", "Route Optimization"]}
 *   onClick={() => navigate("/services/fleet-management")}
 *   onReadMore={() => navigate("/services/fleet-management")}
 *   showReadMore={true}
 *   readMoreText="Learn More"
 * />
 * ```
 */
const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  features,
  onClick,
  onReadMore,
  showReadMore = true,
  readMoreText = "Read More",
}) => {
  // Get the icon component dynamically
  const IconComponent = (Icons as any)[icon] || Icons.Build;

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent card click when read more button is clicked
    if ((e.target as HTMLElement).closest('.read-more-button')) {
      return;
    }
    onClick?.();
  };

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReadMore?.();
  };

  return (
    <StyledServiceCard hover onClick={handleCardClick}>
      {/* Main content area */}
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <IconWrapper className="service-icon">
            <IconComponent sx={{ fontSize: 32 }} />
          </IconWrapper>
          
          <Typography variant="h6" color="primary" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 2 }}>
            {description}
          </Typography>
        </Box>
        
        {features && features.length > 0 && (
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
              Key Features:
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              {features.slice(0, 3).map((feature, index) => (
                <Typography
                  key={index}
                  component="li"
                  variant="body2"
                  sx={{ mb: 0.5 }}
                >
                  {feature}
                </Typography>
              ))}
              {features.length > 3 && (
                <Typography variant="body2" color="primary" sx={{ fontStyle: 'italic' }}>
                  +{features.length - 3} more features
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Read More Button */}
        {showReadMore && onReadMore && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 3,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}>
            <Button
              className="read-more-button"
              variant="text"
              size="small"
              onClick={handleReadMoreClick}
              sx={{
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.875rem',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {readMoreText}
            </Button>
          </Box>
        )}
      </Box>
    </StyledServiceCard>
  );
};

export default ServiceCard;
