import React from 'react';
import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';

/**
 * Utility function to parse text with **bold** markdown syntax and render as JSX
 * Converts text like "This is **bold** text" to proper JSX with bold formatting
 */
export const parseFormattedText = (text: string): React.ReactNode[] => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Remove the ** and render as bold
      const boldText = part.slice(2, -2);
      return (
        <strong key={index} style={{ fontWeight: 600, color: 'inherit' }}>
          {boldText}
        </strong>
      );
    }
    return part;
  });
};

/**
 * FormattedTypography component that automatically parses **bold** markdown syntax
 * Usage: <FormattedTypography>This is **bold** text</FormattedTypography>
 */
interface FormattedTypographyProps extends Omit<TypographyProps, 'children'> {
  children: string;
}

export const FormattedTypography: React.FC<FormattedTypographyProps> = ({
  children,
  ...props
}) => {
  const formattedContent = parseFormattedText(children);
  
  return (
    <Typography {...props}>
      {formattedContent}
    </Typography>
  );
};

export default FormattedTypography;
