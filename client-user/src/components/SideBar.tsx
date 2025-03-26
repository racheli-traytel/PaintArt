import  { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import { AccountCircle, Palette, FileUpload, RateReview, ExitToApp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/Store';
import { logout } from './redux/AuthSlice';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // אפשר לשנות את הנתיב לעמוד אחר אם צריך
  };
  return (
    <Box sx={{ display: 'flex' }} 
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
      {/* כפתורים עגולים בצד ימין */}
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          right: open ? '0' : '-70px', // אם הסיידבר פתוח, יזוז ימינה
          transform: 'translateY(-50%)',
          transition: 'right 0.3s ease', // אפקט מעבר
          zIndex: 1000,
          flexDirection: 'column', // הכפתורים יהיו אחד מתחת לשני
          alignItems: 'center', // ממרכז את הכפתורים
        }}
      >
        {[...Array(3)].map((_, index) => (
          <IconButton
            key={index}
            sx={{
              borderRadius: '50%',
              backgroundColor: 'black',
              padding: '20px',
              marginBottom: '10px',
              '&:hover': { backgroundColor: 'darkred' },
            }}
          />
        ))}
      </Box>

      {/* תפריט סיידבר */}
      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="right" // התפריט יהיה בצד ימין
        open={open}
      >
        <List>

          <ListItem component="div" sx={{  '&:hover': { backgroundColor: 'darkred' } }}>
            <AccountCircle />
            <ListItemText primary="פרופיל אישי" />
          </ListItem>
          <ListItem  component={Link} to="/personal-area/painted-drawings" sx={{ '&:hover': { backgroundColor: 'darkred' } }}>
            <Palette />
            <ListItemText primary="הציורים שלי" />
          </ListItem>
          <ListItem component="div" sx={{  '&:hover': { backgroundColor: 'darkred' } }}>
            <FileUpload />
            <ListItemText primary="לשיתוף ציור " />
          </ListItem>
          <ListItem component={Link} to="/personal-area/upload"  sx={{  '&:hover': { backgroundColor: 'darkred' } }}>
            <FileUpload />
            <ListItemText primary="שיתוף ציור" />
          </ListItem>
          <ListItem  sx={{ '&:hover': { backgroundColor: 'darkred' } }}>
            <RateReview />
            <ListItemText primary="דירוגים והמלצות" />
          </ListItem>
          <ListItem  sx={{'&:hover': { backgroundColor: 'darkred' }}} onClick={handleLogout}>
            <ExitToApp />
            <ListItemText primary="התנתקות" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;