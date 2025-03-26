import React, { useState } from 'react';
import CategoriesButtons from './CategoriesButtons';
import DrawingsDisplay from './DrawingByCategory';
import SearchDrawings from './SearchDrawing';
import { Box, Container, Typography } from '@mui/material';
import FeatureCards from './FeatureCards';

const SearchAndCategory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, _setSearchTerm] = useState<string>('');
  
  return (
    <>
      <Box sx={{ 
        pt: 10, 
        pb: 5, 
        background: 'linear-gradient(135deg, #ffd700 0%, #ffa500 100%)',
        width: '100%',
        mt: 0,
        textAlign: 'center'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ 
            fontWeight: 'bold', 
            color: '#333',
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
          <DrawingsDisplay selectedCategory={selectedCategory} searchTerm={searchTerm} />
         <FeatureCards/> 
    </>
  );
};

export default SearchAndCategory;