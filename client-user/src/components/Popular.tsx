import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from './redux/Store';
import { 
  Box, CircularProgress, 
  Typography,  Container, Grid,  
 Paper 
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { fetchTopRatedDrawings } from './redux/DrawingSlice';
import DrawingCard from './DrawingCard';

const TopRatedDrawings = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Get drawings from the store
  const { error, status, topRatedDrawings } = useSelector((state: RootStore) => state.drawings);
  
  useEffect(() => {
    dispatch(fetchTopRatedDrawings(10)); // Call Redux function
  }, [dispatch]);

  
  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 8, height: '60vh', alignItems: 'center' }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }
  
  if (status === 'failed') {
    return (
      <Container maxWidth="md">
        <Typography variant="h5" color="error" sx={{ textAlign: 'center', my: 8, direction: 'rtl' }}>
          שגיאה: {error}
        </Typography>
      </Container>
    );
  }
  
  const drawingsArray = Array.isArray(topRatedDrawings) ? topRatedDrawings : [];
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Updated header design */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        mb: 4,
        p: 3,
        position: 'relative',
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2
        }}>
          <StarIcon sx={{ 
            fontSize: 50, 
            mr: 2, 
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #2AB673)',
            borderRadius: '50%',
            p: 1,
            color: 'white',
            boxShadow: 3
          }} />
          <Typography 
            variant="h2" 
            sx={{ 
              background: 'linear-gradient(45deg, #FF6B6B, #FF9800, #2196F3, #4CAF50)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold', 
              textShadow: '3px 3px 6px rgba(0,0,0,0.2)',
              textAlign: 'center',
              fontSize: {
                xs: '2.5rem',
                sm: '3rem',
                md: '3.5rem'
              },
              position: 'relative',
              zIndex: 2,
            }}
          >
            הציורים הכי פופולרים
          </Typography>
        </Box>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: 'text.secondary',
            textAlign: 'center',
            mb: 3,
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
          }}
        >
          גלריית היצירות בעלות הדירוג הגבוה ביותר
        </Typography>
      
        {/* Main content */}
        <Grid container spacing={3}>
          {drawingsArray.length === 0 ? (
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 4, textAlign: 'center', direction: 'rtl' }}>
                <Typography variant="h6">אין ציורים זמינים</Typography>
              </Paper>
            </Grid>
          ) : (
            drawingsArray.map((drawing: any) => (
              <DrawingCard drawing={drawing} key={drawing.id}></DrawingCard>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default TopRatedDrawings;