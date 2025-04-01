import React from 'react';
import { 
  Box, 
  Button, 
  Dialog, 
  DialogContent, 
  Typography, 
  styled, 
  keyframes 
} from '@mui/material';

// Define animation keyframes
const modalAppear = keyframes`
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const pulseError = keyframes`
  0% { box-shadow: 0 5px 15px rgba(231, 76, 60, 0.15); }
  50% { box-shadow: 0 5px 25px rgba(231, 76, 60, 0.3); }
  100% { box-shadow: 0 5px 15px rgba(231, 76, 60, 0.15); }
`;

// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    animation: `${modalAppear} 0.4s ease-out forwards`,
    borderRadius: 16,
    background: 'linear-gradient(145deg, #ffffff, #f9f9f9)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
    padding: theme.spacing(4, 5),
    minWidth: 380,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: 5,
      height: '100%',
      background: 'linear-gradient(to bottom, #3a7bd5, #3a6073)',
    },
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  }
}));

const ErrorIcon = styled(Box)(({  }) => ({
  position: 'relative',
  background: 'linear-gradient(145deg, #fee6e6, #fff2f2)',
  color: '#e74c3c',
  width: 85,
  height: 85,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 25px',
  boxShadow: '0 5px 15px rgba(231, 76, 60, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
  animation: `${pulseError} 2s infinite`,
  '& > span': {
    fontSize: 36,
    fontWeight: 'bold',
  },
}));

const CloseButton = styled(Button)(({  }) => ({
  position: 'absolute', 
  top: 18, 
  left: 18,
  minWidth: 'auto',
  padding: 0,
  fontSize: 22,
  fontFamily: 'Heebo, sans-serif',
  color: '#a0aec0',
  '&:hover': {
    color: '#4a5568',
    background: 'transparent',
  },
}));

const LoginButton = styled(Button)(({  }) => ({
  background: 'linear-gradient(135deg, #3a7bd5, #00d2ff)',
  color: 'white',
  padding: '12px 24px',
  borderRadius: 30,
  fontWeight: 500,
  boxShadow: '0 4px 15px rgba(58, 123, 213, 0.4)',
  transition: 'all 0.3s',
  width: 130,
  fontFamily: 'Heebo, sans-serif',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 18px rgba(58, 123, 213, 0.5)',
    background: 'linear-gradient(135deg, #3a7bd5, #00d2ff)',
  },
}));

const RegisterButton = styled(Button)(({  }) => ({
  background: 'white',
  color: '#3a7bd5',
  border: '1px solid #e2e8f0',
  padding: '12px 24px',
  borderRadius: 30,
  fontWeight: 500,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s',
  width: 130,
  fontFamily: 'Heebo, sans-serif',
  '&:hover': {
    transform: 'translateY(-2px)',
    background: '#f8fafc',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.08)',
  },
}));

const BackgroundShape = styled(Box)({
  position: 'absolute',
  bottom: -10,
  left: -20,
  width: 120,
  height: 120,
  opacity: 0.07,
  zIndex: 0,
  transform: 'rotate(-15deg)',
});

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

/**
 * ErrorModal component - Shows a styled error message requiring login or registration
 * Matches the design from the enhanced HTML version
 */
const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  onClose,
  title = "פעולה זו דורשת התחברות",
  message = "לצביעה נא להרשם או להתחבר למערכת"
}) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      dir="rtl"
    >
      <CloseButton onClick={onClose} disableRipple>
        ×
      </CloseButton>
      
      <BackgroundShape>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#3a7bd5" d="M41.9,-67.1C55.1,-59.2,67.1,-48.9,74.4,-35.8C81.7,-22.6,84.3,-6.6,82.1,8.9C79.9,24.4,72.8,39.3,62.5,51.2C52.1,63.1,38.6,71.9,24.2,76.2C9.8,80.5,-5.5,80.3,-19.1,75.6C-32.7,70.9,-44.7,61.8,-53.5,50.2C-62.3,38.6,-68,24.5,-71.7,9.7C-75.3,-5.1,-76.9,-20.6,-72.2,-35.1C-67.5,-49.6,-56.4,-63.1,-42.6,-70.5C-28.8,-77.9,-12.2,-79.2,1.6,-81.9C15.4,-84.5,28.8,-75,41.9,-67.1Z" transform="translate(100 100)" />
        </svg>
      </BackgroundShape>
      
      <DialogContent sx={{ textAlign: 'center', position: 'relative', zIndex: 1, p: 0 }}>
        <ErrorIcon>
          <span>!</span>
        </ErrorIcon>
        
        <Typography variant="h5" component="h2" sx={{ 
          mb: 1.5, 
          fontWeight: 700, 
          color: '#2d3748', 
          fontFamily: 'Heebo, sans-serif',
          fontSize: 24
        }}>
          {title}
        </Typography>
        
        <Typography variant="body1" sx={{ 
          mb: 3, 
          color: '#4a5568', 
          lineHeight: 1.6, 
          fontFamily: 'Heebo, sans-serif',
          fontSize: 16
        }}>
          {message}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center' }}>
          <LoginButton href="/login" disableElevation>
            התחברות
          </LoginButton>
          <RegisterButton href="/register" disableElevation>
            הרשמה
          </RegisterButton>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};


export default ErrorModal