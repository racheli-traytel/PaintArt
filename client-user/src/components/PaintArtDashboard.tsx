import { useState, useEffect } from 'react';
import {
    Box,
    CardContent,
    Typography,
    Grid,
    Button,
    IconButton,
    Divider,
    Paper,
    
} from '@mui/material';

// Added icons imports
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PaletteIcon from '@mui/icons-material/Palette';
import ImageIcon from '@mui/icons-material/Image';
import HistoryIcon from '@mui/icons-material/History';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from './redux/Store';
import { fetchDrawingsByUser } from './redux/DrawingSlice';
import { fetchPaintedDrawingsByUserId } from './redux/PaintedDrawingsSlice';
import { Bubble, CrayonCharacter, DashboardCard, DashboardWrapper, HistoryItem, IconWrapper, StyledAvatar, WhiteContainer } from './Designs/DashBoard';
import { useNavigate } from 'react-router-dom';

const PersonalDashboard = () => {
    const user = JSON.parse(sessionStorage.getItem("user") || JSON.stringify({
        firstName: "דניאל",
        lastName: "כהן",
        avatar: "https://i.pravatar.cc/150?img=32"
    }));

    const [date, setDate] = useState("");

    useEffect(() => {
        const today = new Date();
        const options: Intl.DateTimeFormatOptions = { 
            weekday: "long", 
            year: "numeric", 
            month: "long", 
            day: "numeric" 
        };
        setDate(today.toLocaleDateString("he-IL", options));
    }, []);

    const dispatch = useDispatch<AppDispatch>();
    const { userDrawings } = useSelector((state: RootStore) => state.drawings);
    const { paintedDrawings } = useSelector((state: RootStore) => state.paintedDrawings);

    useEffect(() => {
        dispatch(fetchDrawingsByUser(user.id));
        dispatch(fetchPaintedDrawingsByUserId(user.id))
    }, [dispatch]);

    const recentActivities = [...userDrawings]  // יצירת העתק של המערך
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())  // מיון לפי תאריך (מהחדש לישן)
    .slice(0, 3);  

    const navigate = useNavigate();

    
    return (
        <DashboardWrapper>
            {/* Decorative background bubbles - more subtle */}
            <Bubble size={120} x={10} y={20} delay={1} />
            <Bubble size={80} x={80} y={60} delay={2} />
            <Bubble size={150} x={70} y={25} delay={0} />
            <Bubble size={60} x={20} y={70} delay={3} />
            <Bubble size={100} x={40} y={80} delay={2} />

            <WhiteContainer elevation={6}>
                {/* Header with user info */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 4,
                    gap: 3,
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <StyledAvatar
                            src={user.avatar}
                            alt={`${user.firstName} ${user.lastName}`}
                        />
                        <Box>
                            <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                                שלום {user.firstName} {user.lastName}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {date} • הסטודיו האישי שלך מחכה לך
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton
                        size="large"
                        sx={{
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' }
                        }}
                    >
                        <NotificationsIcon />
                    </IconButton>
                </Box>

                {/* Main stats cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={4}>
                        <DashboardCard bgColor="linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)">
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                color: 'white',
                                pb: '16px !important'
                            }}>
                                <IconWrapper color="#4158D0">
                                    <PaletteIcon />
                                </IconWrapper>
                                <Typography variant="h3" fontWeight="bold" sx={{ mb: 0.5 }}>
                                    {paintedDrawings.length}
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                    ציורים צבועים
                                </Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <Button
                                onClick={()=>navigate('painted-drawings')}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<ArrowForwardIcon />}
                                    sx={{
                                        mt: 2,
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                                    }}
                                >
                                    צפייה בגלריה
                                </Button>
                            </CardContent>
                        </DashboardCard>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <DashboardCard bgColor="linear-gradient(to right, #FF8008, #FFC837)">
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                color: 'white',
                                pb: '16px !important'
                            }}>
                                <IconWrapper color="#FF8008">
                                    <AddCircleIcon />
                                </IconWrapper>
                                <Typography variant="h3" fontWeight="bold" sx={{ mb: 0.5 }}>
                                    15
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                    ציורי AI
                                </Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <Button
                                    variant="contained"
                                    color="warning"
                                    startIcon={<ArrowForwardIcon />}
                                    sx={{
                                        mt: 2,
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                                    }}
                                >
                                    יצירה חדשה
                                </Button>
                            </CardContent>
                        </DashboardCard>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <DashboardCard bgColor="linear-gradient(135deg, #00b09b, #96c93d)">
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                color: 'white',
                                pb: '16px !important'
                            }}>
                                <IconWrapper color="#00b09b">
                                    <ImageIcon />
                                </IconWrapper>
                                <Typography variant="h3" fontWeight="bold" sx={{ mb: 0.5 }}>
                                    {userDrawings.length}
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                    ציורים ששיתפת
                                </Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <Button
                                onClick={()=>navigate('upload')}
                                    variant="contained"
                                    color="success"
                                    startIcon={<ArrowForwardIcon />}
                                    sx={{
                                        mt: 2,
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                                    }}
                                >
                                    שיתוף ציור
                                </Button>
                            </CardContent>
                        </DashboardCard>
                    </Grid>
                </Grid>

                {/* Recent activities and recommendations */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                bgcolor: 'rgba(245, 247, 250, 0.7)',
                                height: '100%'
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 2,
                                justifyContent: 'space-between'
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <HistoryIcon color="primary" />
                                    <Typography variant="h6" fontWeight="bold" color="text.primary">
                                        פעילות אחרונה
                                    </Typography>
                                </Box>
                                <Button
                                    color="primary"
                                    sx={{ textTransform: 'none' }}
                                >
                                    צפייה בהכל
                                </Button>
                            </Box>

                            <Divider sx={{ mb: 2 }} />

                            {recentActivities.map(activity => (
                                <HistoryItem key={activity.id}>
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 2,
                                            bgcolor: 'primary.light',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        <PaletteIcon fontSize="small" />
                                    </Box>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="body1" fontWeight="bold">{activity.title}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(activity.createdAt).toLocaleDateString('he-IL')}
                                        </Typography>                
                                      </Box>
                                    <IconButton size="small" sx={{ color: 'rgba(0,0,0,0.4)' }}>
                                        <FavoriteIcon fontSize="small" />
                                    </IconButton>
                                </HistoryItem>
                            ))}

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mt: 2,
                                    pt: 2,
                                    borderTop: '1px dashed rgba(0,0,0,0.1)'
                                }}
                            >
                          
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                background: 'linear-gradient(135deg, #b6d0ff 0%, #cce5fc 100%)', // Lighter blue gradient
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative', // For positioning the character
                                overflow: 'visible', // Allow character to overflow
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold" color="#444" sx={{ mb: 2 }}>
                                ציורים מומלצים לשיתוף
                            </Typography>

                            <Paper
                                elevation={3}
                                sx={{
                                    p: 2.5,
                                    borderRadius: 3,
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginRight: '70px', // Make space for the character
                                }}
                            >
                                <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                                    שדה חמניות בשקיעה
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    הציור האחרון שלך זכה להרבה תגובות חיוביות. נשמח אם תשתף ציורים נוספים בסגנון הזה!
                                </Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                    <Button
                                       onClick={()=>navigate('upload')}

                                        variant="contained"
                                        sx={{ flexGrow: 1, borderRadius: 2 }}
                                    >
                                        שתף עכשיו
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{ borderRadius: 2 }}
                                    >
                                        צפה
                                    </Button>
                                </Box>
                            </Paper>

                            {/* Crayon Character */}
                            <CrayonCharacter>
                                <img
                                    src="/pictures/peri-left.png"
                                    alt="Crayon Character"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                            </CrayonCharacter>
                        </Paper>
                    </Grid>
                </Grid>
            </WhiteContainer>
        </DashboardWrapper>
    );
};

export default PersonalDashboard;