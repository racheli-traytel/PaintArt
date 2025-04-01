import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from './redux/Store';

// MUI imports
import { 
  Box, Typography, TextField, Button, MenuItem, LinearProgress, Paper, Grid, IconButton, Avatar,
  InputAdornment, FormControl, InputLabel, Select, Alert, styled
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircularProgress from '@mui/material/CircularProgress';
import PaletteIcon from '@mui/icons-material/Palette';

// RTL setup
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { fetchCategories } from './redux/CategorySlice';
import { addDrawing } from './redux/DrawingSlice';
import api from './api';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [ rtlPlugin],
});

// צבעים צבעוניים יותר
const colorPalette = {
  primary: '#5038BC',         // Rich purple-blue (main blue)
  secondary: '#FF8C38',       // Vibrant orange
  accent1: '#7A5FEC',         // Lighter purple-blue
  accent2: '#FF6B00',         // Darker orange
  accent3: '#3A2A96',         // Deep blue
  accent4: '#FFB27A',         // Light orange
  background: '#f8f9fa',      // Light background
  cardBg: '#ffffff',          // Card background
  success: '#4BB543',         // Success green
  warning: '#FFC107',         // Warning yellow
  uploadBtn: 'linear-gradient(45deg, #5038BC 30%, #7A5FEC 90%)', // Blue gradient
  uploadBtnHover: 'linear-gradient(45deg, #3A2A96 30%, #5038BC 90%)',
  imageBorder: 'linear-gradient(135deg, #FF8C38, #FF6B00, #5038BC, #7A5FEC)',
};

// Create RTL theme with updated colors
const rtlTheme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Rubik, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: colorPalette.primary,
    },
    secondary: {
      main: colorPalette.secondary,
    },
    success: {
      main: colorPalette.success,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: colorPalette.accent1,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

// Styled components
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FileInfo = styled(Box)(({ theme }) => ({
  backgroundColor: '#e6f7ff',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  border: `1px solid ${colorPalette.accent1}`,
}));

const ImagePreviewBox = styled(Box)(({ theme }) => ({
  border: '2px dashed #d1d5db',
  borderRadius: theme.shape.borderRadius,
  height: 320,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  backgroundImage: 'linear-gradient(45deg, #f6f8fb 25%, transparent 25%, transparent 50%, #f6f8fb 50%, #f6f8fb 75%, transparent 75%, transparent)',
  backgroundSize: '20px 20px',
  '&:hover': {
    borderImage: colorPalette.imageBorder,
    borderImageSlice: 1,
    borderWidth: '2px',
    borderStyle: 'dashed',
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -10,
    right: 0,
    width: '100%',
    height: '4px',
    background: colorPalette.imageBorder,
    borderRadius: '2px',
  },
}));

const ColorfulAvatar = styled(Avatar)(({  }) => ({
  background: `linear-gradient(135deg, ${colorPalette.accent2}, ${colorPalette.accent3})`,
  width: 60,
  height: 60,
}));

const GradientButton = styled(Button)(({  }) => ({
  background: colorPalette.uploadBtn,
  color: 'white',
  '&:hover': {
    background: colorPalette.uploadBtnHover,
  },
}));

const ArtUploader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const { items } = useSelector((state: RootStore) => state.categories);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileSize((selectedFile.size / (1024 * 1024)).toFixed(2)); // Convert to MB
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
    
  const handleRemoveImage = () => {
    setFile(null);
    setImagePreview(null);
    setFileName('');
    setFileSize('');
  };

  const handleClearForm = () => {
    setFile(null);
    setImagePreview(null);
    setTitle('');
    setDescription('');
    setCategory(0);
    setProgress(0);
    setFileName('');
    setFileSize('');
  };

  const handleUpload = async () => {
    console.log("name", fileName);
    
    if (!file || !title || !category) {
      alert('נא למלא את כל השדות החובה (קובץ, כותרת וקטגוריה)');
      return;
    }
  
    setIsUploading(true);
    setProgress(0);
  
    try {
      // שלב 1: קבלת Presigned URL מהשרת
      const response = await api.get('/upload/presigned-url', {
        params:
        { 
          fileName: file.name,
          title: title,
          description: description,
          category: category
        },
      });
  
      const presignedUrl = response.data.url;
  
      // שלב 2: העלאת הקובץ ישירות ל-S3
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      });
  
      // שלב 3: קבלת URL להורדה לאחר ההעלאה
      const downloadResponse = await api.get(`/upload/download-url/${file.name}`);
      const downloadUrl = downloadResponse.data;
      console.log('Download URL:', downloadUrl);
  
      setUploadComplete(true);
      const newDrawing = {
        name: fileName,
        title: title,
        description: description,
        category: category,
        imageUrl: downloadUrl,
        userId: user?.id || 1,
        isGeneratedByAI: false,
      };
      console.log("newDrawing", newDrawing);

      dispatch(addDrawing(newDrawing))
      setTimeout(() => {
        setUploadComplete(false);
        setFile(null);
        setImagePreview(null);
        setTitle('');
        setDescription('');
        setCategory(0);
        setProgress(0);
        setFileName('');
        setFileSize('');
      }, 3000);
    } catch (error) {
      console.error('שגיאה בהעלאה:', error);
      alert('שגיאה בהעלאת הקובץ');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={rtlTheme}>
        <Paper 
          elevation={3} 
          sx={{ 
            maxWidth: 1000, 
            mx: 'auto', 
            p: 13, 
            my: 13, 
            background: `linear-gradient(to bottom, ${colorPalette.cardBg} 0%, ${colorPalette.background} 100%)`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
        >
          {/* Header */}
          <HeaderBox>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ 
                ml: 2, 
                background: `linear-gradient(45deg, ${colorPalette.accent3}, ${colorPalette.primary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              העלאת יצירת אמנות
            </Typography>
            <ColorfulAvatar>
              <PaletteIcon sx={{ color: 'white', fontSize: 32 }} />
            </ColorfulAvatar>
          </HeaderBox>
          
          <Grid container spacing={4}>
            {/* Image Upload Area */}
            <Grid item xs={12} md={6}>
              <ImagePreviewBox>
                {imagePreview ? (
                  <>
                    <Box 
                      component="img" 
                      src={imagePreview} 
                      alt="תצוגה מקדימה" 
                      sx={{ 
                        maxHeight: '100%', 
                        maxWidth: '100%', 
                        objectFit: 'contain',
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      }} 
                    />
                    <IconButton
                      onClick={handleRemoveImage}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: colorPalette.secondary,
                        color: 'white',
                        '&:hover': { bgcolor: '#e05555' },
                      }}
                      size="small"
                    >
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <ImageIcon sx={{ fontSize: 64, color: '#ced4da', mb: 1 }} />
                    <Typography 
                      sx={{ 
                        color: '#6c757d',
                        fontSize: '0.9rem',
                        borderTop: `2px dashed ${colorPalette.accent1}`,
                        borderBottom: `2px dashed ${colorPalette.accent1}`,
                        py: 1,
                        px: 3,
                        mt: 2,
                        borderRadius: 1
                      }}
                    >
                      תצוגה מקדימה
                    </Typography>
                  </>
                )}
              </ImagePreviewBox>
            </Grid>
            
            {/* Form Fields */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                id="title"
                label="כותרת היצירה"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ 
                  mb: 3, 
                  direction: 'rtl', 
                  '& label': { right: 14, left: 'unset' },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: colorPalette.accent2,
                    },
                  }
                }}
                InputProps={{ 
                  sx: { textAlign: 'right' },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ 
                        width: 10, 
                        height: 10, 
                        borderRadius: '50%', 
                        backgroundColor: colorPalette.accent2 
                      }} />
                    </InputAdornment>
                  ) 
                }}
              />
              
              <FormControl fullWidth required sx={{ mb: 3 }}>
                <InputLabel id="category-label" sx={{ right: 14, left: 'unset' }}>קטגוריה</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as number)}
                  sx={{ 
                    textAlign: 'right',
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: colorPalette.accent3,
                    },
                  }}
                  IconComponent={KeyboardArrowDownIcon}
                >
                  <MenuItem value={0} disabled>בחר קטגוריה</MenuItem>
                  {items.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                id="description"
                label="תיאור היצירה"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                minRows={4}
                sx={{ 
                  mb: 3, 
                  direction: 'rtl', 
                  '& label': { right: 14, left: 'unset' },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: colorPalette.accent4,
                    },
                  }
                }}
                InputProps={{ sx: { textAlign: 'right' } }}
              />
              
              <Button
                component="label"
                fullWidth
                variant="outlined"
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  textAlign: 'right',
                  py: 1.5,
                  mb: 2,
                  borderWidth: 2,
                  borderColor: colorPalette.accent1,
                  color: colorPalette.accent1,
                  '&:hover': {
                    borderColor: colorPalette.primary,
                    borderWidth: 2,
                    backgroundColor: 'rgba(67, 97, 238, 0.05)',
                  }
                }}
              >
                <CloudUploadIcon />
                <span>בחר קובץ להעלאה *</span>
                <VisuallyHiddenInput type="file" onChange={handleFileChange} accept="image/*" />
              </Button>
            </Grid>
          </Grid>
          
          {/* File Info */}
          {fileName && (
            <FileInfo>
              <Typography variant="body2" sx={{ color: colorPalette.accent4, fontWeight: 'bold' }}>
                {fileSize} MB :גודל
              </Typography>
              <Typography variant="body2" sx={{ color: colorPalette.primary, fontWeight: 'bold' }}>
                {fileName} :קובץ
              </Typography>
            </FileInfo>
          )}
          
          {/* Progress Bar */}
          <Box sx={{ mt: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ color: colorPalette.accent3, fontWeight: 'bold' }}>
                {progress}%
              </Typography>
              <Typography variant="body2" color="text.secondary">...מעלה קובץ</Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                bgcolor: 'rgba(76, 201, 240, 0.1)',
                '& .MuiLinearProgress-bar': {
                  background: colorPalette.uploadBtn,
                }
              }} 
            />
          </Box>
          
          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              sx={{ 
                px: 4,
                borderColor: colorPalette.secondary,
                color: colorPalette.secondary,
                '&:hover': {
                  borderColor: colorPalette.secondary,
                  backgroundColor: 'rgba(255, 107, 107, 0.05)',
                }
              }}
              onClick={handleClearForm}
            >
              נקה טופס
            </Button>
            <GradientButton
              variant="contained"
              disabled={isUploading || !file}
              onClick={handleUpload}
              startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
              sx={{ 
                px: 4,
                '&.Mui-disabled': {
                  background: '#e0e0e0',
                }
              }} 
            >
              {isUploading ? '...מעלה' : 'העלאה'}
            </GradientButton>
          </Box>
          
          {/* Success Message */}
          {uploadComplete && (
            <Alert 
              severity="success" 
              sx={{ 
                mt: 2,
                border: `1px solid ${colorPalette.success}`,
                '& .MuiAlert-icon': {
                  color: colorPalette.success
                }
              }}
            >
              היצירה הועלתה בהצלחה!
            </Alert>
          )}
        </Paper>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ArtUploader;