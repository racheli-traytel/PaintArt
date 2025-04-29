import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  Link, 
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton, 
  OutlinedInput,
  createTheme,
  ThemeProvider,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, Palette, Brush, Image } from '@mui/icons-material';
import { AppDispatch, RootStore } from '../redux/Store';
import { login } from '../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';

// יצירת ערכת נושא מותאמת אישית עם צבעים בהירים וחיים יותר
const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#2196F3', // כחול בהיר יותר
    },
    secondary: {
      main: '#FF5252', // אדום בהיר יותר
    },
    error: {
      main: '#FF9800', // כתום בהיר יותר
    },
    success: {
      main: '#4CAF50', // ירוק בהיר יותר
    }
  },
  typography: {
    fontFamily: "'Segoe UI', 'Arial', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 'bold',
          padding: '12px 24px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// רכיבים מעוצבים עם צבעים בהירים וחיים יותר
const LoginContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: 16,
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  position: 'relative',
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(15px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 200,
    height: 200,
    background: 'linear-gradient(45deg, #2196F3, #64B5F6)',
    borderRadius: '50%',
    top: -100,
    right: -100,
    opacity: 0.6,
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: 150,
    height: 150,
    background: 'linear-gradient(45deg, #FF9800, #FFCA28)',
    borderRadius: '50%',
    bottom: -75,
    left: -75,
    opacity: 0.6,
    zIndex: 0,
  }
}));

// שינוי הרקע לגוון בהיר יותר
const Background = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(135deg, #4f5bd5 0%, #962fbf 100%)', // רקע בהיר יותר בגוון סגול-כחול
  zIndex: -1,
  overflow: 'hidden',
});

const PaintSplash = styled(Box)({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(40px)',
  opacity: 0.4,
});

const FloatingParticle = styled(Box)({
  position: 'absolute',
  borderRadius: '50%',
  opacity: 0.65,
  boxShadow: '0 0 20px rgba(255,255,255,0.3)',
});

const ArtIconBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2),
  margin: theme.spacing(3, 0),
}));

const ArtIconContainer = styled(Box)(({  }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 48,
  height: 48,
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  borderRadius: '50%',
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
  animation: 'float 6s infinite ease-in-out',
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
  },
}));

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #FF5252, #FF9800)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF1744, #F57C00)',
    filter: 'brightness(1.1)',
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 20px rgba(255, 82, 82, 0.5)',
  },
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'rotate(30deg)',
    transition: 'all 0.3s',
  },
  '&:hover::after': {
    transform: 'rotate(30deg) translate(10%, 10%)',
  }
});

// פונקציה ליצירת מיקום רנדומלי בתוך האלמנט
const getRandomPosition = (max: number) => {
  return Math.floor(Math.random() * max);
};

// פונקציה לבחירת צבע רנדומלי מתוך מערך הצבעים
const getRandomColor = () => {
  const colors = ['#2196F3', '#FF5252', '#FF9800', '#4CAF50', '#9C27B0', '#00BCD4']; // צבעים חיים ובהירים יותר
  return colors[Math.floor(Math.random() * colors.length)];
};

const LoginPage: React.FC = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootStore) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, speed: number, color: string }>>([]);
  

  
  // יצירת חלקיקים מרחפים כשהקומפוננטה מתחילה
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 60; i++) { // יותר חלקיקים לאפקט ויזואלי טוב יותר
      newParticles.push({
        id: i,
        x: getRandomPosition(100),
        y: getRandomPosition(100),
        size: Math.random() * 8 + 2, // גדלים שונים לחלקיקים
        speed: Math.random() * 0.6 + 0.1,
        color: getRandomColor()
      });
    }
    setParticles(newParticles);
    
    // אנימציה לחלקיקים
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          y: particle.y <= 0 ? 100 : particle.y - particle.speed
        }))
      );
    };
    
    const intervalId = setInterval(animateParticles, 50);
    return () => clearInterval(intervalId);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await dispatch(login(formData));
  
    if (login.fulfilled.match(response)) {
      navigate('/');
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Background>
        {/* כתמי צבע ברקע בגוונים בהירים וחיים יותר */}
        <PaintSplash
          sx={{
            width: 400,
            height: 400,
            backgroundColor: '#FF5252', // אדום בהיר
            top: -180,
            right: '30%',
            animation: 'pulse 15s infinite alternate ease-in-out',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1) translate(0, 0)', opacity: 0.35 },
              '50%': { transform: 'scale(1.3) translate(50px, 20px)', opacity: 0.45 },
              '100%': { transform: 'scale(1) translate(0, 0)', opacity: 0.35 },
            },
          }}
        />
        <PaintSplash
          sx={{
            width: 350,
            height: 350,
            backgroundColor: '#2196F3', // כחול בהיר
            bottom: -120,
            left: '20%',
            animation: 'float-splash 18s infinite alternate-reverse ease-in-out',
            '@keyframes float-splash': {
              '0%': { transform: 'scale(1) translate(0, 0) rotate(0deg)', opacity: 0.35 },
              '30%': { transform: 'scale(1.2) translate(30px, -30px) rotate(5deg)', opacity: 0.45 },
              '70%': { transform: 'scale(0.95) translate(-40px, 30px) rotate(-5deg)', opacity: 0.4 },
              '100%': { transform: 'scale(1) translate(0, 0) rotate(0deg)', opacity: 0.35 },
            },
          }}
        />
        <PaintSplash
          sx={{
            width: 300,
            height: 300,
            backgroundColor: '#FF9800', // כתום בהיר
            top: '40%',
            right: -80,
            animation: 'float-splash-2 20s infinite alternate ease-in-out',
            '@keyframes float-splash-2': {
              '0%': { transform: 'scale(1) translate(0, 0)', opacity: 0.35 },
              '25%': { transform: 'scale(1.25) translate(-40px, 30px)', opacity: 0.4 },
              '75%': { transform: 'scale(0.9) translate(40px, -50px)', opacity: 0.45 },
              '100%': { transform: 'scale(1) translate(0, 0)', opacity: 0.35 },
            },
          }}
        />
        <PaintSplash
          sx={{
            width: 280,
            height: 280,
            backgroundColor: '#4CAF50', // ירוק בהיר
            bottom: '30%',
            left: '10%',
            animation: 'float-splash-3 25s infinite alternate-reverse ease-in-out',
            '@keyframes float-splash-3': {
              '0%': { transform: 'scale(1) translate(0, 0) rotate(0deg)', opacity: 0.35 },
              '20%': { transform: 'scale(1.2) translate(50px, 30px) rotate(3deg)', opacity: 0.4 },
              '60%': { transform: 'scale(0.95) translate(-30px, -50px) rotate(-3deg)', opacity: 0.45 },
              '100%': { transform: 'scale(1) translate(0, 0) rotate(0deg)', opacity: 0.35 },
            },
          }}
        />
        <PaintSplash
          sx={{
            width: 250,
            height: 250,
            backgroundColor: '#9C27B0', // סגול בהיר
            top: '60%',
            left: '60%',
            animation: 'float-splash-4 22s infinite alternate ease-in-out',
            '@keyframes float-splash-4': {
              '0%': { transform: 'scale(1) translate(0, 0) rotate(0deg)', opacity: 0.35 },
              '40%': { transform: 'scale(1.15) translate(-40px, -30px) rotate(-3deg)', opacity: 0.4 },
              '80%': { transform: 'scale(0.9) translate(50px, 40px) rotate(3deg)', opacity: 0.45 },
              '100%': { transform: 'scale(1) translate(0, 0) rotate(0deg)', opacity: 0.35 },
            },
          }}
        />
        
        {/* חלקיקים מרחפים צבעוניים */}
        {particles.map(particle => (
          <FloatingParticle
            key={particle.id}
            sx={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 15px ${particle.color}`,
            }}
          />
        ))}
      </Background>
      
      <Container maxWidth="sm" sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        direction: 'rtl',
      }}>
        <LoginContainer elevation={8} sx={{ width: '100%' }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
              ברוכים הבאים
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary" gutterBottom>
              התחברו לעולם האמנות שלכם
            </Typography>
            
            <ArtIconBox>
              <ArtIconContainer sx={{ backgroundColor: 'rgba(255, 82, 82, 0.25)' }}>
                <Palette sx={{ color: '#FF5252' }} />
              </ArtIconContainer>
              <ArtIconContainer sx={{ backgroundColor: 'rgba(33, 150, 243, 0.25)', animationDelay: '0.2s' }}>
                <Brush sx={{ color: '#2196F3' }} />
              </ArtIconContainer>
              <ArtIconContainer sx={{ backgroundColor: 'rgba(76, 175, 80, 0.25)', animationDelay: '0.4s' }}>
                <Image sx={{ color: '#4CAF50' }} />
              </ArtIconContainer>
            </ArtIconBox>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="דואר אלקטרוני"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 3 }}
              />
              
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel htmlFor="password">סיסמה</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="סיסמה"
                />
              </FormControl>
              
              <Box sx={{ textAlign: 'left' }}>
                <Link href="#" underline="none" color="secondary">
                  שכחתם את הסיסמה?
                </Link>
              </Box>
              
              <GradientButton
                type="submit"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? 'מתחבר...' : 'התחברות'}
              </GradientButton>
              
              <Typography align="center" variant="body2" sx={{ mt: 2 }}>
                אין לכם חשבון עדיין?{' '}
                <Link href="/register" underline="none" color="primary" fontWeight="bold">
                  הרשמו עכשיו
                </Link>
              </Typography>
            </Box>
          </Box>
        </LoginContainer>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;