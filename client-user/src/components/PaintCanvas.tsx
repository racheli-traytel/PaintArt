import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  Slider,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Print,
  Palette,
  Brush,
  Delete,
  Save,
  Download,
  Clear
} from '@mui/icons-material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from './redux/Store';
import { addPaintedDrawing, fetchPaintedDrawingsByUserId } from './redux/PaintedDrawingsSlice';
import Drawing from '../types/drawing';
import PaintedDrawing from '../types/PaintedDrawing';
import { fetchAllDrawings } from './redux/DrawingSlice';
import api from './api';

const PaintCanvas = ({ isPainted }: { isPainted: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { drawings } = useSelector((state: RootStore) => state.drawings);
  const { paintedDrawings } = useSelector((state: RootStore) => state.paintedDrawings);
  const drawingList = isPainted ? paintedDrawings : drawings;
  const drawing = drawingList.find(x => x.id === (id ? parseInt(id, 10) : undefined));

  const { user } = useSelector((state: RootStore) => state.auth)
  const userId:number=user? user.id:1
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [color, setColor] = useState<string>('#000000');
  const [brushSize, setBrushSize] = useState<number>(5);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isEraseMode, setIsEraseMode] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const colorPalette = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#000000', '#808080',
    '#FFA500', '#800080', '#008000', '#FFD700',
    '#A52A2A', '#D2691E', '#C71585', '#B0C4DE'
  ];
  useEffect(() => {
    if (id && drawings.length > 0) {
      const drawing = drawings.find(x => x.id === parseInt(id, 10));
      console.log("Drawing:", drawing); // וודא שהציור נטען
    }
  }, [id, drawings,drawing]);


  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const downloadResponse = await api.get(`/upload/download-url/${drawing?.name}`);
        setImageUrl(downloadResponse.data);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (drawing) {
      fetchImageUrl();
    }
    console.log('url',imageUrl);
    console.log('url',drawing);

  }, [drawing]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 800;
      canvas.height = 600;
      ctxRef.current = canvas.getContext('2d');
      if (imageUrl) {
        const img = new Image();
        img.onerror = () => {
          console.error("Failed to load image:", imageUrl);
          showSnackbar(`שגיאה בטעינת התמונה`, 'error');
        };
        img.crossOrigin = "anonymous";
        img.src = imageUrl;
        img.onload = () => {
          if (ctxRef.current && canvasRef.current) {
            ctxRef.current.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
          }
        };
      }
    }
  }, [imageUrl,drawings,drawing]);

  useEffect(() => {
    if (drawings.length === 0) {
      dispatch(fetchAllDrawings());
    }
  }, [dispatch, drawings,drawing]);

  useEffect(() => {
    if (drawings.length === 0) {
      dispatch(fetchPaintedDrawingsByUserId(userId));
    }
  }, [dispatch, drawings,drawing]);
  
  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    ctxRef.current?.beginPath();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = isEraseMode ? '#f0f3f7' : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    // const canvas = canvasRef.current;
    // const ctx = ctxRef.current;
    // if (canvas && ctx) {
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   if (imageUrl) {
    //     const img = new Image();
    //     img.src = imageUrl;
    //     img.onload = () => {
    //       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //     };
    //   }
    // }
    window.location.reload();
  };

  const printCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const printWindow = window.open('', '', 'height=500,width=500');
    printWindow?.document.write('<img src="' + dataUrl + '" />');
    printWindow?.document.close();
    printWindow?.print();
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'canvas-image.png';
    link.click();
  };

  const handleUpload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      try {
        const fileName = `${Date.now() || 'painted_drawing'}.png`;
        const title = (drawing as Drawing).title || 'Painted Drawing';
        const description = (drawing as Drawing).description || 'A painted drawing';
        const category = (drawing as Drawing).category || 'Uncategorized';

        // Get Presigned URL
        const response = await api.get('/upload/presigned-url', {
          params: {
            fileName: fileName,
            title: title,
            description: description,
            category: category
          }
        });

        const presignedUrl = response.data.url;

        // Upload to S3
        await axios.put(presignedUrl, blob, {
          headers: {
            'Content-Type': 'image/png',
          }
        });

        // Get download URL
        const downloadResponse = await api.get(`/upload/download-url/${fileName}`);
        const downloadUrl = downloadResponse.data;

        // Update Redux
        const newDrawing = {
          drawingId: drawing?.id || 0,
          userId: user?.id || 0,
          imageUrl: downloadUrl as string,
          name: fileName
        };

        dispatch(addPaintedDrawing(newDrawing));
        showSnackbar('הציור הצבוע הועלה בהצלחה!');
      } catch (error) {
        console.error('Error uploading painted drawing:', error);
        showSnackbar('שגיאה בהעלאת הציור הצבוע', 'error');
      }
    }, 'image/png');
  };

  const updatePaintedDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !drawing || !user) return;
    console.log('drawings',drawings);
     const originalDrawing = drawings.find(x => x.id === (drawing as PaintedDrawing).drawingId);
    console.log("originalDrawing",originalDrawing);
    
    canvas.toBlob(async (blob) => {
      if (!blob) return;

      try {
        const fileName = `${drawing.name || 'painted_drawing.png'}`;
        const title = (originalDrawing as Drawing).title || 'Painted Drawing';
        const description = (originalDrawing as Drawing).description || 'A painted drawing';
        const category = (originalDrawing as Drawing).category || 'Uncategorized';

        
        // Get Presigned URL
        const response = await api.get('/upload/presigned-url', {
          params: {
            fileName: fileName,
            title: title,
            description: description,
            category: category
          }
        });

        const presignedUrl = response.data.url;

        // Upload to S3
        await axios.put(presignedUrl, blob, {
          headers: {
            'Content-Type': 'image/png',
          }
        });

        // Get download URL
        const downloadResponse = await api.get(`/upload/download-url/${fileName}`);
        const downloadUrl = downloadResponse.data;

        // Update Painted Drawing
        const updatedPaintedDrawing = {
          drawingId: (drawing as PaintedDrawing).drawingId,
          userId: user.id,
          imageUrl: downloadUrl as string,
          name: fileName
        };

        await api.put(`/PaintedDrawing/${drawing.id}`, updatedPaintedDrawing);
        showSnackbar('הציור הצבוע עודכן בהצלחה!');
      } catch (error) {
        console.error('Error updating painted drawing:', error);
        showSnackbar('שגיאה בעדכון הציור הצבוע', 'error');
      }
    }, 'image/png');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        p: 2,
        backgroundColor: '#f0f3f7',
        borderRadius: 2
      }}
    >
      {/* Tools Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          backgroundColor: 'white',
          p: 2,
          borderRadius: 2,
          boxShadow: 1
        }}
      >
        {/* Color Picker */}
        <Tooltip title="בחר צבע">
          <IconButton>
            <Palette />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
              }}
            />
          </IconButton>
        </Tooltip>

        {/* Brush Mode */}
        <Tooltip title="מצב צביעה">
          <IconButton
            color={!isEraseMode ? 'primary' : 'default'}
            onClick={() => setIsEraseMode(false)}
          >
            <Brush />
          </IconButton>
        </Tooltip>

        {/* Eraser Mode */}
        <Tooltip title="מחק">
          <IconButton
            color={isEraseMode ? 'primary' : 'default'}
            onClick={() => setIsEraseMode(true)}
          >
            <Delete />
          </IconButton>
        </Tooltip>

        {/* Brush Size */}
        <Box sx={{ width: 150 }}>
          <Slider
            value={brushSize}
            min={1}
            max={50}
            onChange={(_e, newValue) => setBrushSize(newValue as number)}
          />
          <Typography variant="caption">גודל מכחול: {brushSize}</Typography>
        </Box>
      </Box>

      {/* Color Palette */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 1,
          backgroundColor: 'white',
          p: 2,
          borderRadius: 2,
          boxShadow: 1
        }}
      >
        {colorPalette.map((colorOption) => (
          <Tooltip key={colorOption} title={`בחר צבע ${colorOption}`}>
            <IconButton
              onClick={() => setColor(colorOption)}
              sx={{
                backgroundColor: colorOption,
                width: 40,
                height: 40,
                '&:hover': { opacity: 0.8 }
              }}
            />
          </Tooltip>
        ))}
      </Box>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{
          border: '2px solid #2c3e50',
          borderRadius: '8px',
          cursor: isEraseMode ? 'url(/eraser-cursor.png), auto' : 'crosshair',
          backgroundColor: '#ecf0f1',
          maxWidth: '100%',
          height: 'auto'
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          backgroundColor: 'white',
          p: 2,
          borderRadius: 2,
          boxShadow: 1
        }}
      >
        <Tooltip title="הדפס">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Print />}
            onClick={printCanvas}
          >
            הדפס
          </Button>
        </Tooltip>

        <Tooltip title="הורד">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Download />}
            onClick={downloadCanvas}
          >
            הורד
          </Button>
        </Tooltip>

        <Tooltip title="נקה">
          <Button
            variant="contained"
            color="error"
            startIcon={<Clear />}
            onClick={clearCanvas}
          >
            נקה
          </Button>
        </Tooltip>

        <Tooltip title="שמור באזור האישי">
          <Button
            variant="contained"
            color="success"
            startIcon={<Save />}
            onClick={() => {
              if (isPainted) {
                updatePaintedDrawing();
              } else {
                handleUpload();
              }
            }}
          >
            שמור באזור האישי
          </Button>
        </Tooltip>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbar-root': {
            top: '50%',
            transform: 'translateY(-50%)',
          }
        }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ 
            width: '400px', 
            fontSize: '1.2rem', 
            justifyContent: 'center', 
            textAlign: 'center' 
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaintCanvas;