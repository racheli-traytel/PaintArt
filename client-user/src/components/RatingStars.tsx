// RatingStars.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

interface RatingStarsProps {
  rating: number;
  count?: number;
  showCount?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, count, showCount = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5;
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={i} sx={{ color: '#FFD700', fontSize: '1.5rem' }} />
      ))}
      {hasHalfStar && <StarHalfIcon sx={{ color: '#FFD700', fontSize: '1.5rem' }} />}
      {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <StarBorderIcon key={`empty-${i}`} sx={{ color: '#FFD700', fontSize: '1.5rem' }} />
      ))}
      {showCount && count !== undefined && (
        <Typography variant="body2" sx={{ ml: 0.5, color: '#666', fontSize: '0.9rem' }}>
          ({count})
        </Typography>
      )}
    </Box>
  );
};

export default RatingStars;
