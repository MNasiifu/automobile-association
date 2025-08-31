import React from 'react';
import { 
  HeaderContainer, 
  ContentContainer 
} from '../atoms';
import { DecorativeBackground, PageHeaderContent } from './';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  badge?: string;
  description?: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  backgroundImage,
  badge,
  description,
  actions
}) => {
  return (
    <HeaderContainer backgroundImage={backgroundImage}>
      <DecorativeBackground />
      
      <ContentContainer maxWidth="md">
        <PageHeaderContent 
          title={title}
          subtitle={subtitle}
          badge={badge}
          description={description}
          actions={actions}
        />
      </ContentContainer>
    </HeaderContainer>
  );
};

export default PageHeader;
