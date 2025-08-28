import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import { 
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface VerificationModalProps {
  open: boolean;
  onClose: () => void;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    minWidth: 400,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2),
      minWidth: 'calc(100% - 32px)',
    },
  },
}));

const VerificationResult = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const VerificationModal: React.FC<VerificationModalProps> = ({ open, onClose }) => {
  const [idpNumber, setIdpNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    status: 'success' | 'error' | 'info' | null;
    message: string;
    details?: any;
  }>({ status: null, message: '' });

  const handleVerify = async () => {
    if (!idpNumber.trim()) {
      setVerificationResult({
        status: 'error',
        message: 'Please enter a valid IDP number'
      });
      return;
    }

    setIsVerifying(true);
    setVerificationResult({ status: null, message: '' });

    // Simulate API call
    setTimeout(() => {
      const isValid = idpNumber.length >= 8 && idpNumber.toUpperCase().startsWith('UG');
      
      if (isValid) {
        setVerificationResult({
          status: 'success',
          message: 'IDP Verified Successfully',
          details: {
            number: idpNumber.toUpperCase(),
            holder: 'John Doe Kamau',
            type: '1968 IDP',
            issueDate: '2024-01-15',
            expiryDate: '2025-01-15',
            status: 'Active',
            countries: '150+ Countries'
          }
        });
      } else {
        setVerificationResult({
          status: 'error',
          message: 'Invalid IDP Number',
          details: {
            suggestion: 'Please check the IDP number and try again. Valid format: UG123456789'
          }
        });
      }
      
      setIsVerifying(false);
    }, 1500);
  };

  const handleClose = () => {
    setIdpNumber('');
    setVerificationResult({ status: null, message: '' });
    setIsVerifying(false);
    onClose();
  };

  const getResultIcon = () => {
    switch (verificationResult.status) {
      case 'success':
        return <CheckCircleIcon color="success" sx={{ fontSize: 48, mb: 1 }} />;
      case 'error':
        return <ErrorIcon color="error" sx={{ fontSize: 48, mb: 1 }} />;
      case 'info':
        return <InfoIcon color="info" sx={{ fontSize: 48, mb: 1 }} />;
      default:
        return null;
    }
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Verify International Driving Permit
        </Typography>
        <Button
          onClick={handleClose}
          size="small"
          sx={{ minWidth: 'auto', p: 1 }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter the IDP number to verify its authenticity and view details
        </Typography>

        <TextField
          fullWidth
          label="IDP Number"
          placeholder="e.g., UG123456789"
          value={idpNumber}
          onChange={(e) => setIdpNumber(e.target.value)}
          disabled={isVerifying}
          sx={{ mb: 2 }}
        />

        {verificationResult.status && (
          <VerificationResult>
            {getResultIcon()}
            
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {verificationResult.message}
            </Typography>

            {verificationResult.status === 'success' && verificationResult.details && (
              <Box sx={{ textAlign: 'left', mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">IDP Number:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {verificationResult.details.number}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Holder Name:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {verificationResult.details.holder}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Type:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {verificationResult.details.type}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Issue Date:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {verificationResult.details.issueDate}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Expiry Date:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {verificationResult.details.expiryDate}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Status:</Typography>
                  <Chip 
                    label={verificationResult.details.status} 
                    color="success" 
                    size="small"
                  />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">Valid in:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {verificationResult.details.countries}
                  </Typography>
                </Box>
              </Box>
            )}

            {verificationResult.status === 'error' && verificationResult.details && (
              <Alert severity="error" sx={{ mt: 2, textAlign: 'left' }}>
                {verificationResult.details.suggestion}
              </Alert>
            )}
          </VerificationResult>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          disabled={isVerifying}
        >
          Close
        </Button>
        
        <Button
          onClick={handleVerify}
          variant="contained"
          disabled={isVerifying || !idpNumber.trim()}
          startIcon={isVerifying ? <CircularProgress size={16} /> : undefined}
        >
          {isVerifying ? 'Verifying...' : 'Verify IDP'}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default VerificationModal;
