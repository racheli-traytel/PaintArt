import React, { useState } from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  IconButton, 
} from '@mui/material';
import { 
  AccountCircle, 
  Palette, 
  FileUpload, 
  ExitToApp, 
  Recycling, 
  Home,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/Store';
import { logout } from './redux/AuthSlice';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const sidebarWidth = open ? 250 : 70;

  const SidebarItem = ({ 
    icon, 
    text, 
    to, 
    onClick,
    itemKey 
  }: { 
    icon: React.ReactNode, 
    text: string, 
    to?: string, 
    onClick?: () => void,
    itemKey: string 
  }) => {
    const gradients = {
      profile: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
      drawings: 'linear-gradient(135deg, #845ec2, #ff6f91)',
      home: 'linear-gradient(135deg, #ff9671, #ffc75f)',
      upload: 'linear-gradient(135deg, #00d2fc, #7a54ff)',
      ratings: 'linear-gradient(135deg, #ff8066, #ffbf37)',
      recycling: 'linear-gradient(135deg, #2ecc71, #3498db)',
      logout: 'linear-gradient(135deg, #e74c3c, #8e44ad)'
    };

    const content = (
      <ListItem 
        onMouseEnter={() => setHoveredItem(itemKey)}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={onClick}
        sx={{
          borderRadius: '10px',
          margin: '8px 4px',
          padding: open ? '8px 16px' : '8px',
          transition: 'all 0.3s ease',
          background: hoveredItem === itemKey 
            ? gradients[itemKey as keyof typeof gradients]
            : 'transparent',
          color: hoveredItem === itemKey ? 'white' : 'inherit',
          transform: hoveredItem === itemKey ? 'scale(1.05)' : 'scale(1)',
          boxShadow: hoveredItem === itemKey 
            ? '0 4px 6px rgba(0,0,0,0.1)' 
            : 'none',
          '&:hover': { 
            background: gradients[itemKey as keyof typeof gradients],
            color: 'white',
            transform: 'scale(1.05)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }
        }}
      >
        <IconButton color="inherit" sx={{ padding: 0, marginRight: open ? 2 : 0 }}>
          {icon}
        </IconButton>
        {open && <ListItemText primary={text} />}
      </ListItem>
    );

    return to ? (
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        {content}
      </Link>
    ) : content;
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 80,
        left: 0,
        height: '100vh',
        zIndex: 50,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Drawer
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarWidth,
            boxSizing: 'border-box',
            position: 'fixed',
            left: 0,
            height: 'calc(100% - 300px)',
            top: 150,
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
            backgroundColor: '#f5f5f5',
            borderRight: '1px solid rgba(0,0,0,0.12)',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
          },
        }}
        variant="permanent"
        anchor="left"
        open={open}
      >
        <List   sx={{ 
    padding: '16px 8px', 
    display: 'flex', 
    flexDirection: 'column', 
    height: '100%', 
    justifyContent: 'center', 
    marginTop: '-7px' // מרים מעט את הכפתורים כלפי מעלה
  }}>
          <SidebarItem 
            icon={<AccountCircle />} 
            text="פרופיל אישי" 
            to="/profile" 
            itemKey="profile"
          />
           <SidebarItem 
            icon={<Home />} 
            text=" לעמוד הראשי" 
            to="/personal-area" 
            itemKey="home"
          />
          <SidebarItem 
            icon={<Palette />} 
            text="הציורים שלי" 
            to="/personal-area/painted-drawings" 
            itemKey="drawings"
          />
          <SidebarItem 
            icon={<FileUpload />} 
            text="שיתוף ציור" 
            to="/personal-area/upload" 
            itemKey="upload"
          />

          <SidebarItem 
            icon={<Recycling />} 
            text="סל מיחזור" 
            to="/personal-area/RecyclingBinPage" 
            itemKey="recycling"
          />
          <SidebarItem 
            icon={<ExitToApp />} 
            text="התנתקות" 
            onClick={handleLogout} 
            to='/'
            itemKey="logout"
          />
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;