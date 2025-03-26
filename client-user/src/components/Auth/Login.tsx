import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  CircularProgress,
  Paper,
  Grid,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { AppDispatch, RootStore } from '../redux/Store';
import { login } from '../redux/AuthSlice';

// Custom styled components
const primaryColor = '#6c5ce7'; 
const LogoRing = styled(Box)(({  }) => ({
  width: 200,
  height: 200,
  border: `20px solid ${primaryColor}`,
  borderRadius: '50%',
  position: 'relative',
  margin: '0 auto 30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(0, 31, 77, 0.1)', // עם שקיפות
    '&:hover fieldset': {
      borderColor: primaryColor,
    },
    '&.Mui-focused fieldset': {
      borderColor: primaryColor,
    },
  },
});

const Login = () =>
{
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootStore) => state.auth);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  // const [rememberMe, setRememberMe] = useState(false);
  const [_errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setErrorMessage(null);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!credentials.email || !credentials.password) {
      setErrorMessage("יש להזין אימייל וסיסמה.");
      return;
    }
  
    const resultAction = await dispatch(login(credentials));
  
    if (login.fulfilled.match(resultAction)) {
      navigate("/");
    } else if (login.rejected.match(resultAction)) {
      setErrorMessage(error || "שגיאה בהתחברות, אנא נסה שוב.");
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      bgcolor: '#fff',
      direction: 'rtl' 
    }}>
      <Grid container sx={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6} sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          p: 4,
          bgcolor: 'white'
        }}>
          <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <LogoRing>
                <Typography variant="h5" component="div" align="center" sx={{ 
                  position: 'absolute', 
                  width: '100%', 
                  fontWeight: 'bold',
                  color: 'black' 
                }}>
                  כמה טוב<br />שבאת!
                </Typography>
              </LogoRing>
              
              <Typography variant="h4" component="h1" mb={4} sx={{ color: '#333' }}>
                התחברות לאזור האישי
              </Typography>
              
              <Paper elevation={0} sx={{ width: '100%', p: 2 }}>
                {/* {errorMessage && <ErrorAlert error={errorMessage} onClose={() => setErrorMessage(null)} />} */}
                
                <form onSubmit={handleLogin}>
                  <StyledTextField 
                    fullWidth 
                    name="email" 
                    placeholder="אימייל*" 
                    variant="outlined" 
                    margin="normal" 
                    value={credentials.email}    
                    onChange={handleChange} 
                    sx={{ mb: 2 }} 
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: primaryColor }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <StyledTextField 
                    fullWidth  
                    name="password" 
                    type="password"  
                    placeholder="סיסמה*"  
                    variant="outlined" 
                    margin="normal"  
                    value={credentials.password} 
                    onChange={handleChange}  
                    sx={{ mb: 3 }} 
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: primaryColor }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <Button  
                    type="submit" 
                    fullWidth 
                    variant="contained" 
                    disabled={loading} 
                    sx={{   
                      bgcolor: primaryColor,  
                      py: 1.5, 
                      '&:hover': { 
                        bgcolor: '#00163A' 
                      } 
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'התחברות'}
                  </Button>
                </form>
              </Paper>
            </Box>
          </Container>
        </Grid>

        {/* Add the image in the other half of the page */}
        <Grid item xs={12} md={6} sx={{
          backgroundImage: 'url(pictures/login.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></Grid>
      </Grid>
    </Box>
  );
};

export default Login;