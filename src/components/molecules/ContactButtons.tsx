import React from 'react';
import {
  Button,
  Stack,
} from '@mui/material';
import type { StackProps } from '@mui/material';
import {
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
} from '@mui/icons-material';
import { config } from '../../utils/config/config';

export interface ContactButtonsProps extends Omit<StackProps, 'children'> {
  /**
   * Size of the buttons
   * @default 'large'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether to show both buttons or just one
   * @default 'both'
   */
  variant?: 'both' | 'phone-only' | 'whatsapp-only';
  /**
   * Custom text for the phone button
   * @default 'Talk To Us'
   */
  phoneText?: string;
  /**
   * Custom text for the WhatsApp button
   * @default 'Chat with us'
   */
  whatsappText?: string;
  /**
   * Custom message for WhatsApp
   * @default 'Hello! I would like to inquire about your services.'
   */
  whatsappMessage?: string;
  /**
   * Whether to use full width buttons on mobile
   * @default true
   */
  fullWidthOnMobile?: boolean;
  /**
   * Custom styling for buttons
   */
  buttonSx?: object;
  /**
   * Callback when phone button is clicked (before default action)
   */
  onPhoneClick?: () => void;
  /**
   * Callback when WhatsApp button is clicked (before default action)
   */
  onWhatsAppClick?: () => void;
}

const ContactButtons: React.FC<ContactButtonsProps> = ({
  size = 'large',
  variant = 'both',
  phoneText = 'Talk To Us',
  whatsappText = 'Chat with us',
  whatsappMessage = 'Hello! I would like to inquire about your services.',
  fullWidthOnMobile = true,
  buttonSx = {},
  onPhoneClick,
  onWhatsAppClick,
  direction = { xs: 'column', sm: 'row' },
  spacing = 2,
  ...stackProps
}) => {
  // Default button styling
  const defaultButtonSx = {
    px: 4,
    py: 1.5,
    borderRadius: 3,
    textTransform: 'none',
    fontSize: '1.1rem',
    ...(fullWidthOnMobile && {
      width: { xs: '100%', sm: 'auto' }
    }),
    ...buttonSx,
  };

  // Handler for phone call functionality
  const handleTalkToUs = () => {
    // Call custom callback if provided
    if (onPhoneClick) {
      onPhoneClick();
    }

    try {
      window.location.href = `tel:${config.company.contactNumber}`;
    } catch (error) {
      console.error('Error initiating phone call:', error);
      // Fallback: copy number to clipboard if possible
      if (navigator.clipboard) {
        navigator.clipboard.writeText(config.company.contactNumber);
        alert(`Phone number copied to clipboard: ${config.company.contactNumber}`);
      } else {
        alert(`Please call us at: ${config.company.contactNumber}`);
      }
    }
  };

  // Handler for WhatsApp functionality
  const handleChatWithUs = () => {
    // Call custom callback if provided
    if (onWhatsAppClick) {
      onWhatsAppClick();
    }

    try {
      const message = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${config.company.whatsAppNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      // Fallback: copy number to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(config.company.whatsAppNumber);
        alert(`WhatsApp number copied to clipboard: ${config.company.whatsAppNumber}`);
      } else {
        alert(`Please message us on WhatsApp: ${config.company.whatsAppNumber}`);
      }
    }
  };

  return (
    <Stack direction={direction} spacing={spacing} {...stackProps}>
      {(variant === 'both' || variant === 'phone-only') && (
        <Button
          variant="contained"
          size={size}
          startIcon={<PhoneIcon />}
          onClick={handleTalkToUs}
          sx={defaultButtonSx}
        >
          {phoneText}
        </Button>
      )}
      
      {(variant === 'both' || variant === 'whatsapp-only') && (
        <Button
          variant="outlined"
          size={size}
          startIcon={<WhatsAppIcon />}
          onClick={handleChatWithUs}
          sx={defaultButtonSx}
        >
          {whatsappText}
        </Button>
      )}
    </Stack>
  );
};

export default ContactButtons;
