import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrawingsByCategory, searchDrawings } from './redux/DrawingSlice';
import { AppDispatch, RootStore } from './redux/Store';
import { Grid, Typography,  CircularProgress, Box,} from '@mui/material';
import DisplayDrawing from './DisplayDrawing';


interface Props {
  selectedCategory: number | null;
  searchTerm: string;
}

const DrawingsDisplay: React.FC<Props> = ({ selectedCategory, searchTerm }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { drawings, status, error } = useSelector((state: RootStore) => state.drawings);
  
  useEffect(() => {
    if (selectedCategory !== null) {
      dispatch(fetchDrawingsByCategory(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchDrawings(searchTerm));
    }
  }, [dispatch, searchTerm]);


  const sampleDrawings = [
    { id: 1, title: "פיל חמוד", imageUrl: "https://example.com/pic1.jpg", avgRating: 4.2, totalRatings: 42, categoryName: "חיות", description: "פיל אפריקאי", categoryId: 1 },
    { id: 2, title: "דינוזאור טירנוזאורוס", imageUrl: "https://example.com/pic2.jpg", avgRating: 4.8, totalRatings: 87, categoryName: "דינוזאורים", description: "דינוזאור מפחיד", categoryId: 2 },
    { id: 3, title: "נסיכה בארמון", imageUrl: "https://example.com/pic3.jpg", avgRating: 4.5, totalRatings: 29, categoryName: "דמויות", description: "נסיכה יפה", categoryId: 3 },
    { id: 4, title: "מכונית מירוץ", imageUrl: "https://example.com/pic4.jpg", avgRating: 4.7, totalRatings: 53, categoryName: "רכבים", description: "מכונית מהירה", categoryId: 4 },
    { id: 5, title: "סביבון לחנוכה", imageUrl: "https://example.com/pic5.jpg", avgRating: 4.9, totalRatings: 64, categoryName: "חגים", description: "סביבון צבעוני", categoryId: 5 }
  ];

  const drawingsToUse = drawings.length > 0 ? drawings : sampleDrawings;



  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Typography color="error" sx={{ textAlign: 'center', my: 4 }}>
        שגיאה: {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ px: 3, pb: 4 }}>
      <Grid container spacing={2}>
        {drawingsToUse.map((drawing: any) => (
          <DisplayDrawing drawing={drawing}/>
        ))}
      </Grid>
    </Box>
  );
};

export default DrawingsDisplay;