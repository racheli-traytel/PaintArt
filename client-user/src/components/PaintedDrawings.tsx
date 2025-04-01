import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Grid, 
  Card, 
  Typography, 
  CircularProgress, 
  Alert, 
  IconButton, 
  Tooltip,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import PaletteIcon from '@mui/icons-material/Palette';
import DeleteIcon from '@mui/icons-material/Delete';

import { AppDispatch, RootStore } from './redux/Store';
import { fetchPaintedDrawingsByUserId, deletePaintedDrawing } from './redux/PaintedDrawingsSlice';
import PaintedDrawing from '../types/PaintedDrawing';
import api from './api';

const PaintedDrawings = () => {
  const { paintedDrawings, status, error } = useSelector((state: RootStore) => state.paintedDrawings);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [drawingToDelete, setDrawingToDelete] = useState<number | null>(null);

  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const userId = user?.id || 1;

  useEffect(() => {
    dispatch(fetchPaintedDrawingsByUserId(userId));
  }, [dispatch, userId]);

  const handleDownload = async (drawing: PaintedDrawing) => {
    try {
      const downloadResponse = await api.get(`/upload/download-url/${drawing.name}`);
      const fileUrl = downloadResponse.data;

      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = drawing.name;
      link.click();
    } catch (error) {
      console.error('Error downloading the file:', error);
      alert('הורדת הקובץ נכשלה');
    }
  };

  const handlePrint = (imageUrl: string) => {
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html>
        <head>
          <title>הדפסת ציור</title>
          <style>
            body { 
              text-align: center; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh; 
              margin: 0; 
              background: #f0f0f0;
            }
            img { 
              max-width: 90%; 
              max-height: 90%; 
              object-fit: contain; 
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
          </style>
        </head>
        <body>
          <img src="${imageUrl}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
  };

  const confirmDelete = (drawingId: number) => {
    setDrawingToDelete(drawingId);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (drawingToDelete) {
      dispatch(deletePaintedDrawing(drawingToDelete));
      setDeleteConfirmOpen(false);
      setDrawingToDelete(null);
    }
  };

  if (status === 'loading') return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <CircularProgress size={80} thickness={4} />
    </Box>
  );

  if (status === 'failed') return (
    <Alert 
      severity="error" 
      sx={{ 
        m: 3, 
        maxWidth: 600, 
        mx: 'auto' 
      }}
    >
      שגיאה: {error}
    </Alert>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      py: 4
    }}>
      <Box sx={{ 
        maxWidth: 1200, 
        mx: 'auto', 
        px: 2 
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          mb: 4
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}>
            <PaletteIcon sx={{ 
              fontSize: 60, 
              mr: 2, 
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #2AB673)',
              borderRadius: '50%',
              p: 1.5,
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
                fontSize: {
                  xs: '2rem',
                  sm: '2.5rem',
                  md: '3rem'
                }
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
            <Alert 
              severity="info" 
              sx={{ 
                width: '100%', 
                maxWidth: 500, 
                mx: 'auto' 
              }}
            >
              אין ציורים למשתמש {userId}
            </Alert>
          ) : (
            <Grid container spacing={3} justifyContent="center">
              {paintedDrawings.map((drawing) => (
                <Grid item xs={12} sm={6} md={4} key={drawing.id}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex', 
                      flexDirection: 'column', 
                      transition: 'all 0.3s',
                      borderRadius: 3,
                      boxShadow: 3,
                      '&:hover': { 
                        transform: 'scale(1.03)', 
                        boxShadow: 6 
                      } 
                    }}
                  >
                    <Box sx={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '75%', // 4:3 aspect ratio
                      overflow: 'hidden',
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      background: 'linear-gradient(45deg, #f0f0f0, #e0e0e0)'
                    }}>
                      <img 
                        src={drawing.imageUrl} 
                        alt={`ציור ${drawing.id}`}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          objectPosition: 'center',
                          padding: '10px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </Box>
                    <Box sx={{ 
                      p: 2, 
                      display: 'flex', 
                      justifyContent: 'flex-end', // Align buttons to the right
                      alignItems: 'center' 
                    }}>
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
                            onClick={() => handleDownload(drawing)}
                            sx={{ mr: 1 }}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="הדפס">
                          <IconButton 
                            color="info" 
                            onClick={() => handlePrint(drawing.imageUrl)}
                            sx={{ mr: 1 }}
                          >
                            <PrintIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="מחק ציור">
                          <IconButton 
                            color="error" 
                            onClick={() => confirmDelete(drawing.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 4,
            maxWidth: 450,
            width: '100%',
            background: 'linear-gradient(145deg, #f0f4f8 0%, #e6eaf0 100%)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          }
        }}
      >
        <DialogContent sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center',
          p: 4 
        }}>
          <WarningAmberIcon 
            sx={{ 
              fontSize: 80, 
              color: '#ff6b6b', 
              mb: 2,
              background: 'rgba(255,107,107,0.1)',
              borderRadius: '50%',
              p: 2
            }} 
          />
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            מחיקת ציור
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
            האם אתה בטוח שברצונך להעביר לסל מיחזור?
          </Typography>
     

          <DialogActions sx={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center',
            gap: 2 
          }}>
            <Button 
              onClick={() => setDeleteConfirmOpen(false)} 
              variant="outlined"
              color="primary"
              sx={{ 
                px: 3,
                py: 1,
                borderRadius: 2
              }}
            >
              ביטול
            </Button>
            <Button 
              onClick={handleDelete} 
              variant="contained"
              color="error"
              sx={{ 
                px: 3,
                py: 1,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #ff6b6b, #ff4757)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #ff4757, #ff6b6b)'
                }
              }}
            >
              מחק
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PaintedDrawings;