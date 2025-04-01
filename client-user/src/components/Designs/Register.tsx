// import { 
//     Box, 
//     Button, 
//     Paper, 
//     createTheme,
//   } from '@mui/material';
// import { styled } from '@mui/material/styles';

// const theme = createTheme({
//     direction: 'rtl',
//     palette: {
//       primary: {
//         main: '#2196F3', // כחול בהיר יותר
//       },
//       secondary: {
//         main: '#FF5252', // אדום בהיר יותר
//       },
//       error: {
//         main: '#FF9800', // כתום בהיר יותר
//       },
//       success: {
//         main: '#4CAF50', // ירוק בהיר יותר
//       }
//     },
//     typography: {
//       fontFamily: "'Segoe UI', 'Arial', sans-serif",
//     },
//     components: {
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             borderRadius: 8,
//             fontWeight: 'bold',
//             padding: '12px 24px',
//           },
//         },
//       },
//       MuiOutlinedInput: {
//         styleOverrides: {
//           root: {
//             borderRadius: 8,
//           },
//         },
//       },
//     },
//   });
  
//   // רכיבים מעוצבים עם צבעים בהירים וחיים יותר
//   const RegisterContainer = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(5),
//     borderRadius: 16,
//     boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
//     position: 'relative',
//     overflow: 'hidden',
//     background: 'rgba(255, 255, 255, 0.95)',
//     backdropFilter: 'blur(15px)',
//     '&::before': {
//       content: '""',
//       position: 'absolute',
//       width: 200,
//       height: 200,
//       background: 'linear-gradient(45deg, #2196F3, #64B5F6)',
//       borderRadius: '50%',
//       top: -100,
//       right: -100,
//       opacity: 0.6,
//       zIndex: 0,
//     },
//     '&::after': {
//       content: '""',
//       position: 'absolute',
//       width: 150,
//       height: 150,
//       background: 'linear-gradient(45deg, #FF9800, #FFCA28)',
//       borderRadius: '50%',
//       bottom: -75,
//       left: -75,
//       opacity: 0.6,
//       zIndex: 0,
//     }
//   }));
  
//   // שינוי הרקע לגוון בהיר יותר
//   const Background = styled(Box)({
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: 'linear-gradient(135deg, #4f5bd5 0%, #962fbf 100%)', // רקע בהיר יותר בגוון סגול-כחול
//     zIndex: -1,
//     overflow: 'hidden',
//   });
  
//   const PaintSplash = styled(Box)({
//     position: 'absolute',
//     borderRadius: '50%',
//     filter: 'blur(40px)',
//     opacity: 0.4,
//   });
  
//   const FloatingParticle = styled(Box)({
//     position: 'absolute',
//     borderRadius: '50%',
//     opacity: 0.65,
//     boxShadow: '0 0 20px rgba(255,255,255,0.3)',
//   });
  
//   const ArtIconBox = styled(Box)(({ theme }) => ({
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: theme.spacing(2),
//     margin: theme.spacing(3, 0),
//   }));
  
//   const ArtIconContainer = styled(Box)(({  }) => ({
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 48,
//     height: 48,
//     backgroundColor: 'rgba(255, 255, 255, 0.25)',
//     borderRadius: '50%',
//     boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
//     animation: 'float 6s infinite ease-in-out',
//     '@keyframes float': {
//       '0%, 100%': {
//         transform: 'translateY(0)',
//       },
//       '50%': {
//         transform: 'translateY(-10px)',
//       },
//     },
//   }));
  
//   const GradientButton = styled(Button)({
//     background: 'linear-gradient(45deg, #FF5252, #FF9800)',
//     color: 'white',
//     '&:hover': {
//       background: 'linear-gradient(45deg, #FF1744, #F57C00)',
//       filter: 'brightness(1.1)',
//       transform: 'translateY(-3px)',
//       boxShadow: '0 8px 20px rgba(255, 82, 82, 0.5)',
//     },
//     transition: 'all 0.3s ease',
//     position: 'relative',
//     overflow: 'hidden',
//     '&::after': {
//       content: '""',
//       position: 'absolute',
//       top: '-50%',
//       left: '-50%',
//       width: '200%',
//       height: '200%',
//       background: 'rgba(255, 255, 255, 0.15)',
//       transform: 'rotate(30deg)',
//       transition: 'all 0.3s',
//     },
//     '&:hover::after': {
//       transform: 'rotate(30deg) translate(10%, 10%)',
//     }
//   });
  
//   // פונקציה ליצירת מיקום רנדומלי בתוך האלמנט
//   const getRandomPosition = (max: number) => {
//     return Math.floor(Math.random() * max);
//   };
  
//   // פונקציה לבחירת צבע רנדומלי מתוך מערך הצבעים
//   const getRandomColor = () => {
//     const colors = ['#2196F3', '#FF5252', '#FF9800', '#4CAF50', '#9C27B0', '#00BCD4']; // צבעים חיים ובהירים יותר
//     return colors[Math.floor(Math.random() * colors.length)];
//   };