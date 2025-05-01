import { Box, Card, CardContent, CardMedia, Divider, Grid, Typography, IconButton, Tooltip } from "@mui/material";
import { ColorLens, Download, Star } from "@mui/icons-material";
import Drawing from "../types/drawing";
import RatingStars from "./RatingStars";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "./redux/Store";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";
import RatingModal from "./RatingModal";
import axios from "axios";
import { fetchTopRatedDrawings } from "./redux/DrawingSlice";

const baseURL= import.meta.env.VITE_API_URL

const DrawingCard = ({ drawing }: { drawing: Drawing }) => {
    const { user } = useSelector((state: RootStore) => state.auth);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [_currentDrawingId, setCurrentDrawingId] = useState<number | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    // מצב עבור מודל הדירוג
    const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);
    const [ratingDrawingId, setRatingDrawingId] = useState<number | null>(null);
    const [ratingDrawingTitle, setRatingDrawingTitle] = useState<string>('');
    const handleColoringClick = (id: number) => {
    if (user) {
      navigate(`/${id}`);
    } else {
      // שמירת ה-ID של הציור הנוכחי ופתיחת המודל
      setCurrentDrawingId(id);
      setIsModalOpen(true);
    }
  };
  const handleRatingClick = (id: number, title: string) => {
    setRatingDrawingId(id);
    setRatingDrawingTitle(title);
    setIsRatingModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // פונקציה לסגירת מודל הדירוג
  const handleCloseRatingModal = () => {
  dispatch(fetchTopRatedDrawings(10)); // Call Redux function
    setIsRatingModalOpen(false);
  };

  const handleDownloadClick = async () => {
   let fileName=drawing.name
   const downloadResponse = await axios.get(`${baseURL}/upload/download-url/${fileName}`);
   const fileUrl = downloadResponse.data;

   console.log("fileUrl",fileUrl);
   console.log("fileName",fileName);

   
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName; // שם הקובץ שנשמור
      link.click();
    } catch (error)
 {
      console.error('Error downloading the file:', error);
    }
  };



  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={drawing.id}>
      <Card 
        elevation={3} 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'transform 0.2s, box-shadow 0.2s',
          borderRadius: '12px',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
          }
        }}
      >
        <Box sx={{ position: 'relative', paddingTop: '75%' }}>
          <CardMedia
            component="img"
            image={drawing.imageUrl}
            alt={drawing.title}
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              backgroundColor: '#f8f8f8'
            }}
          />
        </Box>
        
        <CardContent sx={{ flexGrow: 1, direction: 'rtl' }}>
          <Typography gutterBottom variant="h6" component="h2" sx={{ 
            fontWeight: 'bold',
            color: '#3d2c8d' 
          }}>
            {drawing.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {drawing.description}
          </Typography>
          <Divider sx={{ my: 1 }} />
          
          {/* Rating display */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <RatingStars rating={drawing.avgRating} count={drawing.countRating} />
            <Typography variant="body2" sx={{ ml: 1, fontWeight: 'medium' }}>
              {drawing.avgRating.toFixed(1)}
            </Typography>
          </Box>
          
          {/* Action buttons with text labels alongside and click handlers */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              direction: 'rtl'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title="צביעה" arrow placement="top">
                <IconButton 
                onClick={()=>handleColoringClick(drawing.id)}
            
                  sx={{ 
                    bgcolor: '#f0e6ff', 
                    '&:hover': { bgcolor: '#d9c2ff' },
                    padding: '12px'
                  }}
                >
                  <ColorLens sx={{ fontSize: 28, color: '#3d2c8d' }} />
                </IconButton>
              </Tooltip>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 'medium',
                  cursor: 'pointer'
                }}
                onClick={()=>handleColoringClick(drawing.id)}
              >
                צביעה
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title="הורדה" arrow placement="top">
                <IconButton 
                  onClick={handleDownloadClick}
                  sx={{ 
                    bgcolor: '#e6f7ff', 
                    '&:hover': { bgcolor: '#bfe6ff' },
                    padding: '12px'
                  }}
                >
                  <Download sx={{ fontSize: 28, color: '#0277bd' }} />
                </IconButton>
              </Tooltip>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 'medium',
                  cursor: 'pointer'
                }}
                onClick={handleDownloadClick}
              >
                הורדה
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title="דרוג" arrow placement="top">
                <IconButton 
                onClick={()=>handleRatingClick(drawing.id, drawing.title)}
                sx={{ 
                    bgcolor: '#fff8e1', 
                    '&:hover': { bgcolor: '#ffecb3' },
                    padding: '12px'
                  }}
                >
                  <Star sx={{ fontSize: 28, color: '#ff9800' }} />
                </IconButton>
              </Tooltip>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 'medium',
                  cursor: 'pointer'
                }}
                onClick={()=>handleRatingClick(drawing.id, drawing.title)}
              >
                דרוג
              </Typography>
            </Box>
          </Box>

          {/* Rating dialog would be added here */}
          {/* {ratingDialogOpen && <RatingDialog drawing={drawing} onClose={() => setRatingDialogOpen(false)} />} */}
        </CardContent>
      </Card>
        {/* מודל השגיאה */}
        <ErrorModal 
        open={isModalOpen} 
        onClose={handleCloseModal} 
      />
      
      {/* מודל הדירוג */}
      {ratingDrawingId && (
        <RatingModal
          open={isRatingModalOpen}
          onClose={handleCloseRatingModal}
          drawingId={ratingDrawingId}
          drawingTitle={ratingDrawingTitle}
        />
      )}
    </Grid>
    
  );
};

export default DrawingCard;