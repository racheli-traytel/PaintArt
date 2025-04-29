import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from './redux/CategorySlice';
import { AppDispatch, RootStore } from './redux/Store';
import {  Stack, Typography, Box, Chip } from '@mui/material';

interface CategoryProps {
  id: number;
  name: string;
}

const CategoriesButtons: React.FC<{ setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>> }> = ({ setSelectedCategory }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { items, status, error } = useSelector((state: RootStore) => state.categories);
  const [activeCategory, setActiveCategory] = React.useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = React.useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId: number) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
      setSelectedCategory(null);
    } else {
      setActiveCategory(categoryId);
      setSelectedCategory(categoryId);
    }
  };

  // מדמה קטגוריות לפי התמונה שהוצגה
  const sampleCategories = [
    { id: 1, name: 'חיות' },
    { id: 2, name: 'דמויות מצוירות' },
    { id: 3, name: 'טבע' },
    { id: 4, name: 'רכבים' },
    { id: 5, name: 'פנטזיה' },
    { id: 6, name: 'ספורט' },
    { id: 7, name: 'דינוזאורים' },
    { id: 8, name: 'חגים' },
    { id: 9, name: 'מזון' },
    { id: 10, name: 'נופים' },
    { id: 11, name: 'כלי תחבורה' },
    { id: 12, name: 'גיבורי על' }
  ];

  const categoriesToUse = items.length > 0 ? items : sampleCategories;

  if (status === 'loading') {
    return (
      <Typography sx={{ textAlign: 'center', my: 2 }}>טוען קטגוריות...</Typography>
    );
  }

  if (status === 'failed') {
    return (
      <Typography color="error" sx={{ textAlign: 'center', my: 2 }}>
        שגיאה בהעלאת הקטגוריות: {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ my: 3, textAlign: 'left', px: 2 }}>
      <Typography variant="h6" sx={{ 
        mb: 2, 
        fontWeight: 'bold', 
        color: '#333', 
        direction: 'ltr',
        textAlign: 'left' 
      }}>
        קטגוריות פופולריות:
      </Typography>
      <Box
        sx={{
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c7c7c7',
            borderRadius: '6px',
            '&:hover': {
              backgroundColor: '#a0a0a0',
            },
          }
        }}
      >
        <Stack 
          direction="row"
          spacing={1}
          sx={{ 
            py: 1,
            flexWrap: 'nowrap',
            minWidth: 'max-content',
            pl: 2,
          }}
        >
          {categoriesToUse.map((category: CategoryProps) => (
            <Chip
              key={category.id}
              label={category.name}
              onClick={() => handleCategoryClick(category.id)}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              sx={{ 
                borderRadius: '20px',
                backgroundColor: activeCategory === category.id ? '#6a5acd' : 
                                hoveredCategory === category.id ? '#e0e0e0' : '#f0f0f0',
                color: activeCategory === category.id ? 'white' : '#333',
                fontWeight: activeCategory === category.id ? 'bold' : 'normal',
                px: 2,
                py: 2.5,
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
                '&:hover': { 
                  backgroundColor: activeCategory === category.id ? '#5a4abf' : '#e0e0e0',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                }
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );

};

export default CategoriesButtons;