import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Checkbox, 
  FormControlLabel, 
  Divider, 
  Container, 
  CircularProgress,
  FormHelperText,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AppDispatch, RootStore } from '../redux/store';
import { register } from '../redux/AuthSlice'; // נניח שיש לך פעולה signup
import { useNavigate } from 'react-router-dom';  // ייבוא של useNavigate

// Custom styled components
const LogoRing = styled(Box)(({ theme }) => ({
  width: 250,
  height: 250,
  border: `25px solid ${theme.palette.error.main}`,
  borderRadius: '50%',
  position: 'relative',
  margin: '0 auto 40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // יצירת הפונקציה למעבר בין עמודים

  const { loading, error } = useSelector((state: RootStore) => state.auth);

  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e:any) => { 
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e:any) => {
    e.preventDefault();
    console.log("credentials",credentials);
    
    dispatch(register(credentials))
      .unwrap() // עוטף את הקריאה כדי לטפל בשגיאות של thunk
      .then(() => {
        // אם ההרשמה הצליחה, ננווט לעמוד האישי
        navigate('/');
      })
      .catch((err) => {
        // טיפול בשגיאות, לדוגמה: אם המשתמש כבר קיים
        console.error('Signup failed:', err);
      });
  };

  const handleGoogleSignup = () => {
    // Google signup implementation would go here
    console.log('Google signup clicked');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#070716',
        backgroundImage: 'radial-gradient(circle at center, #0c0c1d 0%, #070716 70%)',
        color: 'white',
        direction: 'rtl'
      }}
    >
      <Container maxWidth="sm">
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            p: 3
          }}
        >
          {/* Logo Ring with Text */}
          <LogoRing>
            <Typography 
              variant="h4" 
              component="div" 
              align="center" 
              sx={{ 
                position: 'absolute', 
                width: '100%',
                fontWeight: 'bold',
                textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
              }}
            >
              ברוך הבא!<br />התחל את ההרשמה
            </Typography>
          </LogoRing>
          
          <Typography variant="h4" component="h1" mb={4}>
            יצירת חשבון חדש
          </Typography>
          
          <Paper 
            elevation={0}
            sx={{ 
              width: '100%', 
              bgcolor: 'transparent',
              p: 2
            }}
          >
            {/* Divider */}
            <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
              <Divider sx={{ flexGrow: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
                או
              </Typography>
              <Divider sx={{ flexGrow: 1 }} />
            </Box>
            
            {/* Signup Form */}
            <form onSubmit={handleSignup}>
              <TextField
                fullWidth
                name="firstName"
                placeholder="שם פרטי*"
                variant="outlined"
                margin="normal"
                value={credentials.firstName}
                onChange={handleChange}
                sx={{ 
                  bgcolor: 'white',
                  borderRadius: 1,
                  mb: 2
                }}
              />
              
              <TextField
                fullWidth
                name="lastName"
                placeholder="שם משפחה*"
                variant="outlined"
                margin="normal"
                value={credentials.lastName}
                onChange={handleChange}
                sx={{ 
                  bgcolor: 'white',
                  borderRadius: 1,
                  mb: 2
                }}
              />
              
              <TextField
                fullWidth
                name="email"
                placeholder="אימייל*"
                variant="outlined"
                margin="normal"
                value={credentials.email}
                onChange={handleChange}
                sx={{ 
                  bgcolor: 'white',
                  borderRadius: 1,
                  mb: 2
                }}
              />
              
              <TextField
                fullWidth
                name="password"
                type="password"
                placeholder="סיסמה*"
                variant="outlined"
                margin="normal"
                value={credentials.password}
                onChange={handleChange}
                sx={{ 
                  bgcolor: 'white',
                  borderRadius: 1,
                  mb: 2
                }}
              />
              
              {error && (
                <FormHelperText error sx={{ mb: 2 }}>
                  {error}
                </FormHelperText>
              )}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ 
                  bgcolor: '#ff0e63',
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#d60b54',
                  }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'הירשם'}
              </Button>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2
              }}>
                <Typography 
                  variant="body2" 
                  component="a" 
                  href="/login" 
                  sx={{ 
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  כבר יש לך חשבון? התחבר
                </Typography>
                
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      sx={{ 
                        color: 'white',
                        '&.Mui-checked': {
                          color: 'white',
                        },
                      }}
                    />
                  }
                  label="זכור אותי"
                  sx={{ color: 'white' }}
                />
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
      
      {/* Watermark */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          opacity: 0.5,
          width: 120,
          height: 120,
        }}
      >
        {/* Placeholder for your NET FREE watermark */}
        <img src="/net-free-logo.png" alt="NET FREE" width="100%" height="100%" />
      </Box>
    </Box>
  );
};

export default Register;
