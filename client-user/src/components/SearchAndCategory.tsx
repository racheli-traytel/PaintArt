import React, { useState } from 'react';
import CategoriesButtons from './CategoriesButtons';
import SearchDrawings from './SearchDrawing';
import { Box, Container, Typography } from '@mui/material';
import FeatureCards from './FeatureCards';
import DrawingList from './DrawingList';

const SearchAndCategory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, _setSearchTerm] = useState<string>('');
  
  return (
    <>
      <Box sx={{ 
        pt: 10, 
        pb: 5, 
        background: 'linear-gradient(135deg, #FFD700, #FF8C69, #90EE90, #FFB14C, #FFF700)',
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 8s ease infinite',
        width: '100%',
        mt: 0,
        textAlign: 'center',
        '@keyframes gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ 
            fontWeight: 'bold', 
            color: '#333',
            textShadow: '1px 1px 2px rgba(255,255,255,0.5)',
            mb: 1,
            direction: 'rtl',
            fontSize: { xs: '1.8rem', sm: '2.3rem', md: '2.5rem' }
          }}>
            ציורי צביעה מהנים לילדים
          </Typography>
          <Typography variant="body1" sx={{ 
            color: '#333',
            maxWidth: '800px',
            mx: 'auto',
            px: 2,
            direction: 'rtl',
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}>
            גלו מגוון רחב של דפי צביעה מקוריים, מודפסים ומהנים לילדים בכל הגילאים
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        <Box sx={{ 
          backgroundColor: 'white', 
          maxWidth: '100%', 
          mx: 'auto', 
          borderRadius: '20px',
          boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
          mb: 5,
          mt: -2,
          overflow: 'hidden'
        }}>
          <SearchDrawings setSelectedCategory={setSelectedCategory} />
          <CategoriesButtons setSelectedCategory={setSelectedCategory} />
        </Box>
      </Container>
      <DrawingList selectedCategory={selectedCategory} searchTerm={searchTerm} />
      <FeatureCards/> 
    </>
  );
};

export default SearchAndCategory;