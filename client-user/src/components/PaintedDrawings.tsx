import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootStore } from './redux/Store';
import { fetchPaintedDrawingsByUserId } from './redux/PaintedDrawingsSlice';
import { 
  Grid, 
  Card, 
  Typography, 
  CircularProgress, 
  Alert, 
  IconButton, 
  Tooltip,
  Box,
  Fade
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import PaletteIcon from '@mui/icons-material/Palette';
import { useNavigate } from 'react-router-dom';

const PaintedDrawings = () => {
  const { paintedDrawings, status, error } = useSelector((state: RootStore) => state.paintedDrawings);
  const dispatch = useDispatch<AppDispatch>();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  const userId = user?.id || 1;

  useEffect(() => {
    dispatch(fetchPaintedDrawingsByUserId(userId));
  }, [dispatch, userId]);

  const handleDownload = (imageUrl: string, drawingId: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${drawingId}_drawing.png`;
    link.click();
  };

  const handlePrint = (imageUrl: string) => {
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html>
        <head>
          <title>Print Drawing</title>
          <style>
            body { text-align: center; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <img src="${imageUrl}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
  };

  if (status === 'loading') return <CircularProgress />;
  if (status === 'failed') return <Alert severity="error">Error: {error}</Alert>;

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: 3,
      background: 'linear-gradient(135deg, #f6f8f9 0%, #e5ebee 100%)'
    }}>
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
          <PaletteIcon sx={{ 
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
            גלריית היצירות שלי
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
          {paintedDrawings.length} יצירות מרגשות שנוצרו בהשראה
        </Typography>

        {paintedDrawings.length === 0 ? (
          <Alert severity="info">אין ציורים למשתמש {userId}</Alert>
        ) : (
          <Grid container spacing={3}>
            {paintedDrawings.map((drawing) => (
              <Fade in={true} timeout={500} key={drawing.id}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      p: 2, 
                      transition: 'all 0.3s',
                      borderRadius: 3,
                      '&:hover': { 
                        transform: 'scale(1.05)', 
                        boxShadow: 6 
                      } 
                    }}
                  >
                    <Box sx={{
                      width: '100%',
                      height: 300,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                      borderRadius: 2,
                      mb: 2,
                      background: '#f0f0f0'
                    }}>
                      <img 
                        src={drawing.imageUrl} 
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      width: '100%',
                      px: 2 
                    }}>
                      <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                        {drawing.id}
                      </Typography>
                      <Box>
                        <Tooltip title="ערוך ציור">
                          <IconButton 
                            color="primary" 
                            onClick={() => navigate(`/personal-area/${drawing.id}`)}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="הורד">
                          <IconButton 
                            color="secondary" 
                            onClick={() => handleDownload(drawing.imageUrl, drawing.drawingId)}
                            sx={{ mr: 1 }}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="הדפס">
                          <IconButton 
                            color="info" 
                            onClick={() => handlePrint(drawing.imageUrl)}
                          >
                            <PrintIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                </Card>
                </Grid>
              </Fade>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default PaintedDrawings;