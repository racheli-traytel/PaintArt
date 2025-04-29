import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress, 
  IconButton,
  Paper,
  Slide,
  Fade,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import PaletteIcon from '@mui/icons-material/Palette';
import PersonIcon from '@mui/icons-material/Person';
import { RootStore } from './redux/Store';
import { addUserMessage, sendChatMessage } from './redux/ChatSlice';

interface ChatBoxProps {
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch<any>();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const { messages, status } = useSelector((state: RootStore) => state.chat);

  // נושאים מוצעים לשיחות על אמנות
  const suggestedTopics = [
    "תרגיל ציור חדש",
    "המלצות אמנים",
    "טכניקות ציור",
    "היסטוריה של אמנות",
    "סגנונות ציור"
  ];

  // הרחבת הצ'אט לאחר השלמת האנימציה
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // גלילה לתחתית כאשר ההודעות משתנות
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    dispatch(addUserMessage(input));
    dispatch(sendChatMessage(input));
    setInput('');
  };

  const handleTopicClick = (topic: string) => {
    dispatch(addUserMessage(topic));
    dispatch(sendChatMessage(topic));
  };

  // טיפול בסגירת הצ'אט
  const handleClose = () => {
    setIsExpanded(false);
    // הוספת השהייה קצרה לאפשר לאנימציה להסתיים לפני סגירה מלאה
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
     <Paper
  elevation={8}
  sx={{
    position: 'fixed',
    bottom: 20,
    left: 20, 
    width: 350,
    height: isExpanded ? 450 : 0,
    borderRadius: 3,
    overflow: 'hidden',
    transition: 'height 0.3s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: '#ffffff',
    direction: 'rtl', 
    zIndex: 1000,
  }}
>
        {/* כותרת הצ'אט */}
        <Box 
          sx={{ 
            p: 2, 
            bgcolor: '#3f51b5',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PaletteIcon sx={{ color: '#ffffff', ml: 1 }} />
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              שיחה עם מיכל
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: '#ffffff', ml: 1 }}>
              מומחית אמנות
            </Typography>
            <IconButton onClick={handleClose} size="small" sx={{ color: '#ffffff' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* הודעות הצ'אט */}
        <Fade in={isExpanded}>
          <Box 
            sx={{ 
              flexGrow: 1, 
              p: 2, 
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              bgcolor: '#f5f5f5',
            }}
          >
            {messages.length === 0 ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
              }}>
                <Box sx={{
                  bgcolor: '#ffffff',
                  p: 3,
                  borderRadius: 2,
                  width: '100%',
                  mb: 2,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <Typography variant="body1" align="center" sx={{ color: '#303f9f', mb: 2 }}>
                    שלום! אני מיכל, מומחית האמנות שלך.
                  </Typography>
                  <Typography variant="body2" align="center" sx={{ color: '#666', mb: 3 }}>
                    שאל/י אותי כל שאלה על אמנות וציור או נסה/י אחד מהנושאים האלה:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                    {suggestedTopics.map((topic, index) => (
                      <Chip
                        key={index}
                        label={topic}
                        onClick={() => handleTopicClick(topic)}
                        sx={{
                          bgcolor: '#3f51b5',
                          color: '#fff',
                          '&:hover': { bgcolor: '#303f9f' },
                          fontSize: '0.75rem',
                          mb: 1
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            ) : (
              messages.map((msg, index) => (
                <Box 
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-start' : 'flex-end', 
                    mb: 1,
                  }}
                >
                  {msg.sender === 'user' && ( 
                    <Box 
                      sx={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: '50%', 
                        bgcolor: '#90caf9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ml: 1
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 16, color: '#fff' }} />
                    </Box>
                  )}
                  
                  <Box
                    sx={{
                      maxWidth: '75%',
                      p: 1.5,
                      bgcolor: msg.sender === 'user' ? '#e3f2fd' : '#3f51b5',
                      color: msg.sender === 'user' ? '#333' : '#fff',
                      borderRadius: msg.sender === 'user' 
                        ? '18px 18px 18px 4px' 
                        : '18px 18px 4px 18px', 
                      position: 'relative',
                    }}
                  >
                    {msg.sender !== 'user' && (
                      <Typography variant="caption" sx={{ color: '#e0e0e0', fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                        מיכל
                      </Typography>
                    )}
                    <Typography variant="body2">{msg.text}</Typography>
                  </Box>
                  
                  {msg.sender !== 'user' && ( // הפוך לעברית
                    <Box 
                      sx={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: '50%', 
                        bgcolor: '#3f51b5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1
                      }}
                    >
                      <PaletteIcon sx={{ fontSize: 16, color: '#fff' }} />
                    </Box>
                  )}
                </Box>
              ))
            )}
            
            {status === 'loading' && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}> {/* הפוך לעברית */}
                <Box 
                  sx={{ 
                    width: 28, 
                    height: 28, 
                    borderRadius: '50%', 
                    bgcolor: '#3f51b5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1
                  }}
                >
                  <PaletteIcon sx={{ fontSize: 16, color: '#fff' }} />
                </Box>
                <Box 
                  sx={{ 
                    p: 2, 
                    bgcolor: '#3f51b5', 
                    borderRadius: '18px 18px 4px 18px', 
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <CircularProgress size={20} sx={{ color: '#fff' }} />
                </Box>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>
        </Fade>

        {/* אזור הקלט */}
        <Box 
          sx={{ 
            display: 'flex', 
            p: 2, 
            borderTop: '1px solid #e0e0e0',
            bgcolor: '#3f51b5'
          }}
        >
          <Button 
            variant="contained" 
            onClick={handleSend} 
            sx={{ 
              mr: 1, 
              minWidth: 'unset', 
              width: 40, 
              height: 40, 
              borderRadius: '50%',
              bgcolor: '#ffffff',
              color: '#3f51b5',
              '&:hover': {
                bgcolor: '#e0e0e0',
              }
            }}
          >
            <SendIcon fontSize="small" />
          </Button>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="הקלד/י הודעה..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 5,
                backgroundColor: '#ffffff',
                color: '#333',
                '& fieldset': {
                  borderColor: '#c5cae9',
                },
                '&:hover fieldset': {
                  borderColor: '#7986cb',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
              '& .MuiInputBase-input': {
                '&::placeholder': {
                  color: '#9fa8da',
                  opacity: 1,
                },
              },
            }}
            inputProps={{
              style: { color: '#333', textAlign: 'right' }
            }}
          />
        </Box>
      </Paper>
    </Slide>
  );
};

export default ChatBox;