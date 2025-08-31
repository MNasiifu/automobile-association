import { IconButton, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+256786623001';
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Tooltip title="Chat with us on WhatsApp" placement="left">
      <IconButton
        onClick={handleWhatsAppClick}
        sx={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#25D366',
          color: 'white',
          '&:hover': {
            backgroundColor: '#128C7E',
          },
          width: 56,
          height: 56,
          zIndex: 1000,
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 32 }} />
      </IconButton>
    </Tooltip>
  );
};

export default WhatsAppButton;