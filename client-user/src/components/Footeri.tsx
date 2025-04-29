import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Divider,
  styled,
  List,
  ListItem,
  SvgIcon
} from '@mui/material';

// Styled components
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#6c5ce7', // Purple color similar to the image
  color: 'white',
  padding: theme.spacing(3, 0),
  marginTop: 'auto',
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  color: 'white',
  textAlign: 'right',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
  display: 'block',
  marginBottom: theme.spacing(1),
  textAlign: 'right',
}));

const CrayonsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: theme.spacing(2, 0, 4),
  }));
  
  const CrayonsImage = styled('img')(({  }) => ({
    width: '100%', // פריסת התמונה על כל הרוחב
    maxHeight: '200px', // הגדלת הגובה
    objectFit: 'cover', // כדי שהתמונה תכסה את השטח בצורה טובה
  }));

const FooterListItem = styled(ListItem)({
  padding: '4px 0',
  justifyContent: 'flex-end',
});

const PlayArtLogo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '2rem',
  marginBottom: theme.spacing(2),
}));

const SocialIcon = styled(Box)(({  }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: '#e1e1e1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  }
}));

// Facebook Icon Component
const FacebookIcon = (props:any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
  </SvgIcon>
);

// Instagram Icon Component
const InstagramIcon = (props:any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M12 2a10 10 0 0 0-3.16.5 5.24 5.24 0 0 0-3 3A10 10 0 0 0 5.5 8.84v6.32a10 10 0 0 0 .5 3.16 5.24 5.24 0 0 0 3 3 10 10 0 0 0 3.16.5h6.32a10 10 0 0 0 3.16-.5 5.24 5.24 0 0 0 3-3 10 10 0 0 0 .5-3.16V8.84a10 10 0 0 0-.5-3.16 5.24 5.24 0 0 0-3-3A10 10 0 0 0 18.16 2H12zm0 2h6.16a7.9 7.9 0 0 1 2.52.4 3.25 3.25 0 0 1 1.92 1.92 7.9 7.9 0 0 1 .4 2.52v6.32a7.9 7.9 0 0 1-.4 2.52 3.25 3.25 0 0 1-1.92 1.92 7.9 7.9 0 0 1-2.52.4H8.84a7.9 7.9 0 0 1-2.52-.4 3.25 3.25 0 0 1-1.92-1.92 7.9 7.9 0 0 1-.4-2.52V8.84a7.9 7.9 0 0 1 .4-2.52 3.25 3.25 0 0 1 1.92-1.92A7.9 7.9 0 0 1 8.84 4H12zm0 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm5.5-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
  </SvgIcon>
);

// YouTube Icon Component
const YouTubeIcon = (props:any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </SvgIcon>
);

// TikTok Icon Component
const TikTokIcon = (props:any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6s1.12-2.6 2.6-2.6h.26v-3.1h-.26a5.76 5.76 0 0 0 0 11.52 5.715 5.715 0 0 0 5.76-5.8V7.71a7.615 7.615 0 0 0 4.4 1.2V5.82a4.59 4.59 0 0 1-3.42-2.09z" />
  </SvgIcon>
);

// Footer component
const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4} direction="row-reverse">
          {/* Help & Support Column */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h6">עזרה ותמיכה</FooterTitle>
            <List disablePadding>
              <FooterListItem>
                <FooterLink href="#">צור קשר</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">שאלות נפוצות</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">תנאי שימוש</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">מדיניות פרטיות</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">אודות</FooterLink>
              </FooterListItem>
            </List>
          </Grid>

          {/* Personal Area Column */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h6">אזור אישי</FooterTitle>
            <List disablePadding>
              <FooterListItem>
                <FooterLink href="/login">התחברות</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="/register">הרשמה</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">היצירות שלי</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">המועדפים</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">שיתוף יצירות</FooterLink>
              </FooterListItem>
            </List>
          </Grid>

          {/* Quick Navigation Column */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h6">ניווט מהיר</FooterTitle>
            <List disablePadding>
              <FooterListItem>
                <FooterLink href="/">דף הבית</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="/">ציורים חדשים</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="/popular">הפופולריים ביותר</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="/">לפי קטגוריות</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">יצירה עם AI</FooterLink>
              </FooterListItem>
            </List>
          </Grid>

          {/* PlayArt Column */}
          <Grid item xs={12} sm={6} md={3}>
            <PlayArtLogo variant="h4">PaintArt</PlayArtLogo>
            <Typography variant="body2" sx={{ mb: 2, textAlign: 'right' }}>
              האתר המוביל ליצירת צביעה לילדים עם מגוון עצום של דפי צביעה, משחקי צביעה אונליין ופעילויות יצירה להנאה ולמידה
            </Typography>
            
            {/* Social Media Icons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Link href="#" aria-label="TikTok">
                <SocialIcon>
                  <TikTokIcon sx={{ color: '#555' }} />
                </SocialIcon>
              </Link>
              <Link href="#" aria-label="YouTube">
                <SocialIcon>
                  <YouTubeIcon sx={{ color: '#555' }} />
                </SocialIcon>
              </Link>
              <Link href="#" aria-label="Instagram">
                <SocialIcon>
                  <InstagramIcon sx={{ color: '#555' }} />
                </SocialIcon>
              </Link>
              <Link href="#" aria-label="Facebook">
                <SocialIcon>
                  <FacebookIcon sx={{ color: '#555' }} />
                </SocialIcon>
              </Link>
            </Box>
          </Grid>
        </Grid>
        
        {/* Centered Crayons */}
        <CrayonsContainer>
          <CrayonsImage 
            src="/pictures/footer.png" 
            alt="צבעים מציירים" 
          />
        </CrayonsContainer>

        <Divider sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.2)' }} />
        
        <Typography variant="body2" align="center" sx={{ pt: 2 }}>
          © {new Date().getFullYear()} PaintArt. כל הזכויות שמורות.
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;