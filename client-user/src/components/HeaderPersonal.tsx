import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AVatar from './Avatar';
import { Link } from 'react-router-dom';

const HeaderPersonal = () => {
  return (
    <AppBar position="fixed" sx={{ width: '100%',backgroundColor:'white' }}>
      <AVatar/>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 ,color:'black'}}>
          אזור אישי
        </Typography>
        <Button sx={{ backgroundColor:'black'}}
          color="inherit" 
          startIcon={<ExitToAppIcon />} 
             component={Link}
          to="/"
        >
          יציאה
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderPersonal;