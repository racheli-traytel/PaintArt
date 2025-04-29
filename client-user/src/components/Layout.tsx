import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, Outlet, useLocation } from 'react-router-dom';
import UserAvatar from './Avatar';
import Footeri from './Footeri';
import ChatBox from './ChatBox';
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from '@mui/material/Tooltip';

const Layout: React.FC = () => {
  const user = JSON.parse(sessionStorage.getItem('user') || 'null');
  const location = useLocation();
  const isPersonalArea = location.pathname.includes('personal-area');
  
  // מצב לשליטה בהצגת הצ'אט
  const [isChatOpen, setIsChatOpen] = useState(false);

  // פונקציה לפתיחת הצ'אט
  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  // פונקציה לסגירת הצ'אט
  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div style={{ width: '100%' }}>
      <AppBar
        position="fixed"
        sx={{
          background: '#6a5acd',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {user && user.id ? (
              <>
                <UserAvatar />
                {isPersonalArea ? (
                  <>
                    <Button
                      component={Link}
                      to="/"
                      variant="outlined"
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        borderRadius: '20px',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                      }}
                    >
                      ליציאה
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      component={Link}
                      to="/personal-area"
                      variant="outlined"
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        borderRadius: '20px',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                      }}
                    >
                      לאזור האישי
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  sx={{
                    backgroundColor: '#ff8c00',
                    color: 'white',
                    borderRadius: '20px',
                    marginRight: '10px',
                    '&:hover': { backgroundColor: '#e67e00' },
                  }}
                >
                  הרשמה
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    borderRadius: '20px',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  התחברות
                </Button>
              </>
            )}

            {/* כפתור צ'אט מעוצב בגוון כתום */}
            <Tooltip title="פתח צ'אט עם מיכל - מומחית האמנות" placement="bottom">
              <Button
                onClick={handleOpenChat}
                startIcon={<ChatIcon />}
                variant="contained"
                sx={{
                  background: 'linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)',
                  color: 'white',
                  borderRadius: '25px',
                  padding: '8px 20px',
                  marginRight: '10px',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 4px 10px rgba(255,140,0,0.3)',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  textTransform: 'none', // אותיות לא גדולות
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FFA500 30%, #FF8C00 90%)',
                    boxShadow: '0 6px 15px rgba(255,140,0,0.5)',
                    transform: 'translateY(-2px)',
                  },
                  '&:active': {
                    transform: 'translateY(1px)',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  },
                  // רספונסיביות - במסכים קטנים מראה רק אייקון
                  '@media (max-width: 600px)': {
                    minWidth: '48px',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    '& .MuiButton-startIcon': {
                      margin: 0
                    },
                    '& .MuiButton-startIcon + span': {
                      display: 'none'
                    }
                  }
                }}
              >
                 צאט עם מיכל
              </Button>
            </Tooltip>
          </div>
          <img src={`/pictures/LogoPaintArt.png?${Date.now()}`} style={{ width: "75px" }} />
        </Toolbar>
      </AppBar>

      {/* הוספת מרווח כלפי מעלה כך שהתוכן לא יוסתר תחת ה-Header */}
      <div style={{ marginTop: '80px', width: '100%' }}>
        <Outlet />
        {/* הצגת הצ'אט רק כאשר isChatOpen הוא true */}
        {isChatOpen && <ChatBox onClose={handleCloseChat} />}
        <Footeri />
      </div>
    </div>
  );
};

export default Layout;