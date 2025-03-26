import React, { useRef, useState, useEffect } from 'react';
import { Button, Slider, Grid, Typography, Box } from '@mui/material';
import { Print, Palette } from '@mui/icons-material';
import Drawing from '../types/drawing';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from './redux/store';
import axios from 'axios';
import { addPaintedDrawing } from './redux/PaintedDrawingsSlice';
import PaintedDrawing from '../types/PaintedDrawing';
import { fetchAllDrawings } from './redux/DrawingSlice';
//
//
const PaintCanvas = ({ isPainted }: { isPainted: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { drawings } = useSelector((state: RootStore) => state.drawings);
  const { paintedDrawings } = useSelector((state: RootStore) => state.paintedDrawings);
  const drawingList = isPainted ? paintedDrawings : drawings;
  const drawing = drawingList.find(x => x.id === (id ? parseInt(id, 10) : undefined));

  const { user } = useSelector((state: RootStore) => state.auth)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState<string>('#000000');
  const [brushSize, setBrushSize] = useState<number>(5);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isEraseMode, setIsEraseMode] = useState<boolean>(false);
  const imageUrl = drawing?.imageUrl
  console.log("imageUrl", paintedDrawings);

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
          alert(` שגיאה בטעינת התמונה ${imageUrl}`);
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
  }, [imageUrl]);

  useEffect(() => {
    if (drawings.length === 0) {
      dispatch(fetchAllDrawings());
    }
  }, [dispatch, drawings.length]);

  const uploadPaintedDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ממיר את הציור ל-Blob
    canvas.toBlob(async (blob) => {
      if (!blob) return;


      try {
        const fileName = `${Date.now() || 'painted_drawing'}.png`;
        const title = (drawing as Drawing).title || 'Painted Drawing';
        const description = (drawing as Drawing).description || 'A painted drawing';
        const category = (drawing as Drawing).category || 'Uncategorized';
        console.log(fileName);
        // שלב 1: קבלת Presigned URL מהשרת
        const response = await axios.get('https://localhost:7004/api/upload/presigned-url', {
          params: {
            fileName: fileName,
            title: title,
            description: description,
            category: category
          }
        });

        const presignedUrl = response.data.url;
        console.log("presignedUrl ", presignedUrl);
console.log("blob",blob);

        // שלב 2: העלאת הקובץ ישירות ל-S3
        await axios.put(presignedUrl, blob, {
          headers: {
            'Content-Type': 'image/png',
          }
        });

        // שלב 3: קבלת URL להורדה לאחר ההעלאה
        const downloadResponse = await axios.get(`https://localhost:7004/api/upload/download-url/${fileName}`);
        const downloadUrl = downloadResponse.data;
        alert(downloadUrl);

        // שלב 4: עדכון ה-Redux עם הציור החדש
        const newDrawing = {
          drawingId: drawing?.id || 0,
          userId: user?.id || 0,
          imageUrl: downloadUrl as string,
          name:fileName
        };

        console.log("newDrawing", newDrawing);
        dispatch(addPaintedDrawing(newDrawing));
        alert(`הציור הצבוע הועלה בהצלחה! ניתן לצפות בו כאן: ${downloadUrl}`);

      } catch (error) {
        console.error('Error uploading painted drawing:', error);
        alert('שגיאה בהעלאת הציור הצבוע');
      }
    }, 'image/png');
  };

  const updatePaintedDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !drawing || !user) return;
    console.log('drawing',drawing);
    
    const originalDrawing = drawings.find(x => x.id === (drawing as PaintedDrawing).drawingId);
    // ממיר את הציור ל-Blob
    console.log("originalDrawing",originalDrawing);
    
    canvas.toBlob(async (blob) => {
      if (!blob) return;

     console.log(drawing,drawing);


      try {
        const fileName = `${drawing.name || 'painted_drawing.png'}`;
        const title = (originalDrawing as Drawing).title || 'Painted Drawing';
        const description = (originalDrawing as Drawing).description || 'A painted drawing';
        const category = (originalDrawing as Drawing).category || 'Uncategorized';


        console.log("fileName",fileName);
        
        // שלב 1: קבלת Presigned URL מהשרת
        const response = await axios.get('https://localhost:7004/api/upload/presigned-url', {
          params: {
            fileName: fileName,
            title: title,
            description: description,
            category: category
          }
        });

        const presignedUrl = response.data.url;
        console.log("presignedUrl ", presignedUrl);

        // שלב 2: העלאת הקובץ המעודכן ל-S3
        await axios.put(presignedUrl, blob, {
          headers: {
            'Content-Type': 'image/png',
          }
        });

        // שלב 3: קבלת URL להורדה לאחר ההעלאה
        const downloadResponse = await axios.get(`https://localhost:7004/api/upload/download-url/${fileName}`);
        const downloadUrl = downloadResponse.data;
        alert(downloadUrl);

        // שלב 4: שליחת עדכון לשרת
        const updatedPaintedDrawing = {
          drawingId: (drawing as PaintedDrawing).drawingId,
          userId: user.id,
          imageUrl: downloadUrl as string,
          name:fileName
        };

        await axios.put(`https://localhost:7004/api/PaintedDrawing/${drawing.id}`, updatedPaintedDrawing);
        alert('הציור הצבוע עודכן בהצלחה!');

      } catch (error) {
        console.error('Error updating painted drawing:', error);
        alert('שגיאה בעדכון הציור הצבוע');
      }
    }, 'image/png');
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

    ctx.strokeStyle = isEraseMode ? '#ffffff' : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (imageUrl) {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  };

  const toggleEraseMode = () => {
    setIsEraseMode(!isEraseMode);
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '16px' }}>
      {/* Edit Colors Section with Icon */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="8px"
        style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '8px', width: '200px' }}
      >
        <Typography variant="body2" color="textPrimary" style={{ display: 'flex', alignItems: 'center' }}>
          <Palette style={{ marginRight: '8px' }} /> ערוך צבעים
        </Typography>
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <Button
              style={{
                backgroundColor: color,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              }}
              onClick={() => setColor(color)}
            />
          </Grid>
          <Grid item>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Colors Picker */}
      <Grid container spacing={1} justifyContent="center">
        {[
          '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF',
          '#FFA500', '#800080', '#008000', '#FFD700', '#A52A2A', '#D2691E', '#C71585', '#B0C4DE'
        ].map((colorOption) => (
          <Grid item key={colorOption}>
            <Button
              style={{
                backgroundColor: colorOption,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              }}
              onClick={() => setColor(colorOption)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Brush Size Slider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Slider
          value={brushSize}
          min={1}
          max={50}
          onChange={(e, newValue) => setBrushSize(newValue as number)}
          style={{ width: '200px' }}
        />
        <span>Brush size: {brushSize}</span>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{
          border: '1px solid #000',
          borderRadius: '8px',
          cursor: isEraseMode ? 'url(/eraser-cursor.png), auto' : 'crosshair',
          backgroundColor: '#f0f0f0',
          maxWidth: '100%', // מונע מתיחה מעבר לרוחב ההורה
          height: 'auto'   // שומר על היחס המקורי של הרוחב-גובה
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      ></canvas>

      {/* Clear Button */}
      <Button variant="contained" color="error" onClick={clearCanvas}>
        Clear
      </Button>

      {/* Print and Download Buttons in a row */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={printCanvas}
          startIcon={<Print />}
        >
          Print
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (!isPainted) { downloadCanvas() }
            else {

            }

          }}
          startIcon={<Print />}
        >
          Download
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            if (isPainted) {
              updatePaintedDrawing();
            }
            else {
              uploadPaintedDrawing();
            }
          }
          }
          style={{ marginTop: "8px" }}
        >
          שמירה באזור האישי    
      </Button>
      </div>
    </div>
  );
};

export default PaintCanvas;




