import React, { useState } from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/Store';
import { addRating } from './redux/DrawingSlice';

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  drawingId: number;
  drawingTitle: string;
}

const RatingModal: React.FC<RatingModalProps> = ({ open, onClose, drawingId, drawingTitle }) => {
    const dispatch = useDispatch<AppDispatch>();

  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // אימוג'ים ומשפטים לפי דירוג
  const emojis = ['😞','😕','😊','😃','🤩'];
  const ratingTexts = [
    'מצטערים לשמוע. אנא ספרו לנו איך נוכל להשתפר.',
    'יש מקום לשיפור. תודה על המשוב.',
    'תודה על הדירוג החיובי!',
    'נהדר! שמחים שנהניתם.',
    'מושלם! אנחנו שמחים שאהבתם!'
  ];

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmitRating =async () => {
   await dispatch(addRating({ drawingId, value: rating }));
    // כאן יש להוסיף את הלוגיקה לשליחת הדירוג לשרת
    console.log(`Submitting rating ${rating} for drawing ID ${drawingId}`);
    setIsSubmitted(true);
    
    // לאחר 2 שניות סוגרים את המודל
    setTimeout(() => {
      handleReset();
      onClose();
    }, 2000);
  };

  const handleReset = () => {
    setRating(0);
    setHoveredRating(0);
    setIsSubmitted(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        if (!isSubmitted) {
          handleReset();
          onClose();
        }
      }}
      aria-labelledby="rating-modal-title"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 450 },
        maxWidth: '95vw',
        bgcolor: 'background.paper',
        borderRadius: 4,
        boxShadow: 24,
        overflow: 'hidden',
        animation: 'float 6s ease-in-out infinite, fadeIn 0.7s ease-out',
        '@keyframes float': {
          '0%': { transform: 'translate(-50%, -50%)' },
          '50%': { transform: 'translate(-50%, -53%)' },
          '100%': { transform: 'translate(-50%, -50%)' }
        },
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translate(-50%, -40%)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%)' }
        }
      }}>
        {isSubmitted ? (
          // תצוגת הצלחה
          <Box sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <Box sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              mb: 2,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.05)' },
                '100%': { transform: 'scale(1)' }
              }
            }}>
              <CheckCircleIcon fontSize="large" />
            </Box>
            <Typography variant="h5" component="h2" fontWeight="bold" mb={1}>
              תודה על המשוב שלך!
            </Typography>
            <Typography color="text.secondary">
              המשוב שלך התקבל בהצלחה.<br />אנו מעריכים את הזמן שהקדשת לנו.
            </Typography>
          </Box>
        ) : (
          <>
            {/* כותרת */}
            <Box sx={{
              p: 3,
              background: 'linear-gradient(135deg, #5e60ce, #6930c3)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <IconButton
                onClick={() => {
                  handleReset();
                  onClose();
                }}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'white'
                }}
              >
              </IconButton>
              
              {/* אפקט ריפל */}
              {[1, 2, 3].map((i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    width: i === 1 ? 200 : i === 2 ? 150 : 100,
                    height: i === 1 ? 200 : i === 2 ? 150 : 100,
                    right: i === 1 ? -100 : i === 2 ? 50 : 'auto',
                    left: i === 3 ? -50 : 'auto',
                    top: i === 1 ? -100 : i === 3 ? 10 : 'auto',
                    bottom: i === 2 ? -70 : 'auto',
                    animation: `ripple 2s linear infinite ${0.5 * (i - 1)}s`,
                    '@keyframes ripple': {
                      '0%': { transform: 'scale(0.8)', opacity: 1 },
                      '100%': { transform: 'scale(1.5)', opacity: 0 }
                    }
                  }}
                />
              ))}
              
              <Typography variant="h5" component="h2" fontWeight="bold" textAlign="center">
                דרגו את הציור
              </Typography>
              <Typography textAlign="center" fontSize="1rem" mt={1}>
                {drawingTitle}
              </Typography>
            </Box>
            
            {/* תוכן */}
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography sx={{ mb: 3, fontWeight: 500, fontSize: '1.1rem' }}>
                כמה אהבתם את הציור?
              </Typography>
              
              {/* כוכבים לדירוג */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1.5,
                my: 3
              }}>
                {[1, 2, 3, 4, 5].map((index) => (
                  <Box
                    key={index}
                    onClick={() => handleRatingChange(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Box sx={{
                      position: 'absolute',
                      width: 55,
                      height: 55,
                      borderRadius: '50%',
                      bgcolor: 'white',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      opacity: hoveredRating >= index || rating >= index ? 1 : 0,
                      transform: hoveredRating >= index || rating >= index ? 'scale(1)' : 'scale(0.7)',
                      transition: 'all 0.3s'
                    }} />
                    <StarIcon 
                      fontSize="large"
                      sx={{
                        color: hoveredRating >= index || rating >= index ? '#FFD700' : '#e0e0e0',
                        zIndex: 2,
                        transition: 'color 0.3s'
                      }}
                    />
                  </Box>
                ))}
              </Box>
              
              {/* אימוג'י ומשפט */}
              <Box sx={{ minHeight: 80, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {rating > 0 && (
                  <>
                    <Typography sx={{
                      fontSize: '2.5rem',
                      mt: 1,
                      mb: 1,
                      animation: 'fadeIn 0.3s'
                    }}>
                      {emojis[rating - 1]}
                    </Typography>
                    <Typography sx={{
                      color: 'primary.main',
                      fontWeight: 500,
                      animation: 'fadeIn 0.3s'
                    }}>
                      {ratingTexts[rating - 1]}
                    </Typography>
                  </>
                )}
              </Box>
              
              {/* כפתורים */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 4
              }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleReset();
                    onClose();
                  }}
                  sx={{
                    borderRadius: 50,
                    px: 3,
                    py: 1,
                    color: '#777',
                    borderColor: '#ddd',
                    '&:hover': {
                      bgcolor: '#f5f5f5',
                      borderColor: '#ddd'
                    }
                  }}
                >
                  סגור
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmitRating}
                  disabled={rating === 0}
                  sx={{
                    borderRadius: 50,
                    px: 3,
                    py: 1,
                    background: 'linear-gradient(135deg, #5e60ce, #6930c3)',
                    boxShadow: '0 5px 15px rgba(94, 96, 206, 0.3)',
                    '&:hover': 
                    {
                      background: 'linear-gradient(135deg, #5e60ce, #6930c3)',
                      boxShadow: '0 8px 25px rgba(94, 96, 206, 0.4)',
                      transform: 'translateY(-3px)'
                    },
                    '&:disabled': {
                      background: 'linear-gradient(135deg, #9d9fc7, #a594d2)',
                      boxShadow: 'none'
                    },
                    transition: 'all 0.4s'
                  }}
                >
                  שלח דירוג
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default RatingModal;

