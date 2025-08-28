import React from 'react';
import { Box } from '@mui/material';
import { 
  AnimatedTitle, 
  AnimatedSubtitle, 
  PageHeaderBadge, 
  AnimatedDescription, 
  SectionDivider, 
  ActionButtonContainer 
} from '../atoms';

interface PageHeaderContentProps {
  title: string;
  subtitle?: string;
  badge?: string;
  description?: string;
  actions?: React.ReactNode;
}

const PageHeaderContent: React.FC<PageHeaderContentProps> = ({
  title,
  subtitle,
  badge,
  description,
  actions
}) => {
  return (
    <Box className="page-header-content">
      <Box className="content-inner">
        {badge && (
          <PageHeaderBadge label={badge} />
        )}

        <Box className="main-content">
          <AnimatedTitle variant="h1" component="h1">
            {title}
          </AnimatedTitle>

          {subtitle && (
            <AnimatedSubtitle>
              {subtitle}
            </AnimatedSubtitle>
          )}

          {description && (
            <AnimatedDescription>
              {description}
            </AnimatedDescription>
          )}

          {(subtitle || description) && (
            <SectionDivider />
          )}

          {actions && (
            <ActionButtonContainer>
              {actions}
            </ActionButtonContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PageHeaderContent;
