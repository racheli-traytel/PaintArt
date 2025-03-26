import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, Outlet, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import UserAvatar from './Avatar';
import Footeri from './Footeri';

const Layout: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const location = useLocation();
  const isPersonalArea = location.pathname.includes('personal-area');
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
                {isPersonalArea ? (<>
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

                </>):
            (<>
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
            </>)
            }

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
          </div>
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              color: 'white',
              direction: 'rtl',
            }}
          >
            PlayArt
            <HomeIcon sx={{ ml: 1 }} />
          </Typography>
        </Toolbar>
      </AppBar>

      {/* הוספת מרווח כלפי מעלה כך שהתוכן לא יוסתר תחת ה-Header */}
      <div style={{ marginTop: '80px', width: '100%' }}>
        <Outlet />
        <Footeri />
      </div>
    </div>
  );
};

export default Layout;