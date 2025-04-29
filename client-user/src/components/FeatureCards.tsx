import React from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardActions,
  styled,
  SvgIcon
} from '@mui/material';
import { useNavigate } from 'react-router-dom';  // הוספת ה-hook של ניווט

// Styled components
const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  backgroundColor: 'white',
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: '#f5f6fa',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const FeatureCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  textAlign: 'right',
  direction: 'rtl',
}));

const FeatureCardActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(2, 3, 3),
  justifyContent: 'center',
}));

const FeatureButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff9f43',
  color: 'white',
  borderRadius: theme.spacing(5),
  padding: theme.spacing(1, 3),
  '&:hover': {
    backgroundColor: '#f39200',
  },
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1.5),
}));

// Star Icon Component
const StarIcon = (props:any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </SvgIcon>
);

// Robot Icon Component
const RobotIcon = (props:any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M22 14h-1c0-3.87-3.13-7-7-7h-1V5.73c1.16-.41 2-1.52 2-2.83 0-1.66-1.34-3-3-3S9 1.34 9 3c0 1.3.84 2.41 2 2.83V7H8c-3.87 0-7 3.13-7 7H0v2h1v.15c0 .33.02.82.66 1.39.73.64 1.97 1.06 3.69 1.06 1.36 0 2.72-.28 4.01-.83l.09-.03c1.28-.55 2.56-.83 3.92-.84l.63-.01c1.31 0 2.63.28 3.92.84l.09.03c1.28.55 2.65.83 4.01.83 1.72 0 2.96-.42 3.69-1.06.64-.57.66-1.06.66-1.39V16h1v-2zm-18-3.62c.11-.25.26-.5.44-.73.18-.24.38-.45.59-.65.2-.2.42-.38.65-.55.76-.55 1.62-.87 2.56-.99.31-.08.62-.13.93-.13h.06c.31 0 .63.05.94.13.94.12 1.79.44 2.55.99.21.16.42.33.61.51.19.19.37.4.52.62.16.22.29.45.4.69H4zm5.03 4.6c-.57.28-1.05.44-1.44.54-.39.1-.76.15-1.14.15-.43 0-.84-.05-1.23-.14-.39-.1-.75-.24-1.1-.42-.33-.17-.67-.38-1.03-.61.1-.46.37-.89.92-1.27.52-.36 1.28-.7 2.23-.9.31-.06.65-.1.99-.1s.77.04 1.18.14c.38.09.77.22 1.18.4.38.17.72.36 1.03.58.34.24.37.38.39.44.01.06.01.13.01.19-.04.2-.08.42-.18.55-.1.15-.19.27-.27.35-.08.07-.22.14-.39.19-.17.04-.31.06-.42.07-.11.01-.29.01-.53-.01-.24-.02-.44-.06-.6-.08-.16-.02-.37-.07-.6-.17zm9.06.96c-.41.09-.82.14-1.25.14-.39 0-.76-.05-1.14-.15-.4-.1-.87-.26-1.44-.54-.24-.11-.45-.17-.61-.19-.16-.02-.36-.06-.6-.08-.24-.02-.42-.02-.53-.01-.11.01-.25.03-.42.07-.17.05-.31.12-.4.19-.08.08-.17.2-.27.35-.01.01-.06.05-.1.13-.04.07-.06.15-.08.22 0 .04-.01.08-.01.12-.01.04-.01.07-.01.09 0 .07 0 .13.01.19-.36.23-.69.43-1.03.61-.34.18-.71.32-1.1.42-.39.09-.8.14-1.24.14-.38 0-.73-.05-1.12-.15-.39-.1-.88-.27-1.45-.54-.52-.25-.99-.55-1.44-.88.1-.04.18-.07.25-.09.2-.05.47-.05.75.03.23.06.49.19.74.4.21.18.58.35 1.07.46.47.1.91.1 1.32.05.18-.02.38-.07.58-.13.21-.07.38-.12.53-.14.16-.02.34-.04.51-.04.18 0 .37.01.57.03.19.02.36.02.51.02.15 0 .33-.01.52-.04.19-.03.33-.07.48-.12.15-.05.3-.1.46-.13.16-.03.35-.05.57-.05s.4.02.56.05c.16.03.32.08.47.13.15.05.29.09.48.12.19.03.37.04.52.04.15 0 .31 0 .5-.02.2-.02.39-.03.58-.03.17 0 .34.02.51.04s.33.07.53.14c.21.06.4.11.58.13.07.01.14.02.21.02.37.03.78.01 1.19-.07.47-.12.83-.28 1.07-.46.25-.21.51-.34.74-.4.28-.08.54-.08.75-.03.07.02.15.05.25.09-.45.33-.92.63-1.44.88z" />
  </SvgIcon>
);

// Palette Icon Component
const PaletteIcon = (props:any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67-.08-.1-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm5.5 11c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-3-4c-.83 0-1.5-.67-1.5-1.5S13.67 6 14.5 6s1.5.67 1.5 1.5S15.33 9 14.5 9zM9.5 9C8.67 9 8 8.33 8 7.5S8.67 6 9.5 6s1.5.67 1.5 1.5S10.33 9 9.5 9zm-3 3c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12z" />
  </SvgIcon>
);

// Feature Cards Component
const FeatureCards: React.FC = () => {
    const navigate = useNavigate();  // יצירת הפונקציה לניווט

    const handlePopularDrawingsClick = () => {
      navigate('/popular');  // ניווט לדף הציורים הפופולריים
    };
  return (
    <Box sx={{ py: 8, backgroundColor: '#f5f7fa' }}>
      <Container maxWidth="lg">
      <Typography variant="h1" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 5 }}>
          מה אפשר לעשות ב-PaintArt?
        </Typography>
        <Grid container spacing={4}>
          {/* Rating Pictures Card */}
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <IconContainer>
                <StarIcon sx={{ color: '#ffc107', fontSize: 40 }} />
              </IconContainer>
              <FeatureCardContent>
                <FeatureTitle variant="h5" sx={{ textAlign: 'left' }}>
                  דירוג ציורים
                </FeatureTitle>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                  דרגו את הציורים האהובים עליכם, שתפו עם חברים ומשפחה וגלו את הציורים הפופולריים ביותר
                </Typography>
              </FeatureCardContent>
              <FeatureCardActions>
                <FeatureButton onClick={handlePopularDrawingsClick}>
                  לציורים הפופולריים
                </FeatureButton>
              </FeatureCardActions>
            </FeatureCard>
          </Grid>

          {/* AI Drawing Card */}
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <IconContainer>
                <RobotIcon sx={{ color: '#3f51b5', fontSize: 40 }} />
              </IconContainer>
              <FeatureCardContent>
                <FeatureTitle variant="h5" sx={{ textAlign: 'left' }}>
                  AI יצירת ציור ב
                </FeatureTitle>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                  כתבו מה תרצו לייצר וביינה מלאכותית תייצר עבורכם ציור מותאם אישית מוכן לצביעה
                </Typography>
              </FeatureCardContent>
              <FeatureCardActions>
                <FeatureButton>
                 התחברות ליצירה עם AI
                </FeatureButton>
              </FeatureCardActions>
            </FeatureCard>
          </Grid>

          {/* Coloring Pictures Card */}
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <IconContainer>
                <PaletteIcon sx={{ color: '#e91e63', fontSize: 40 }} />
              </IconContainer>
              <FeatureCardContent>
                <FeatureTitle variant="h5" sx={{ textAlign: 'left' }}>
                  צביעת ציורים ושמירה
                </FeatureTitle>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                  בחרו ציור, צבעו אותו באונליין עם מגוון צבעים ואפקטים, ושמרו את היצירות שלכם כאוסף אישי
                </Typography>
              </FeatureCardContent>
              <FeatureCardActions>
                <FeatureButton >
                  התחברות לצביעה
                </FeatureButton>
              </FeatureCardActions>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureCards;