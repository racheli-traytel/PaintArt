import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchDrawings } from './redux/DrawingSlice';
import { AppDispatch } from './redux/Store';
import { Box, InputBase, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchDrawings: React.FC<{ setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>> }> = ({ setSelectedCategory }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [_isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        dispatch(searchDrawings(searchTerm));
        setSelectedCategory(null); 
        setIsTyping(false); 
      }
    }, 300); 

    return () => {
      clearTimeout(timer);
      setIsTyping(true); 
    };
  }, [dispatch, searchTerm, setSelectedCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginTop: '20px' }}>
      <Paper sx={{ 
        display: 'flex', 
        alignItems: 'center',
        width: '100%',
        maxWidth: '800px',
        borderRadius: '30px',
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
        pl: 1,
        boxShadow: 'none'
      }}>
        <IconButton 
          type="button" 
          sx={{ 
            backgroundColor: '#6a5acd', 
            borderRadius: '12px',
            mr: 1,
            p: '10px',
            '&:hover': { backgroundColor: '#5a4abf' }
          }}
        >
          <SearchIcon sx={{ color: 'white' }}/>
        </IconButton>
        <InputBase
          placeholder="חפש ציור יצירה..."
          sx={{ 
            ml: 1, 
            flex: 1,
            '& input': {
              textAlign: 'left',
              direction: 'ltr'
            }
          }}
          value={searchTerm}
          onChange={handleChange}
        />
      </Paper>
    </Box>
  );
};

export default SearchDrawings;
