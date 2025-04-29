import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, Dialog, DialogTitle, 
  DialogContent, DialogContentText, DialogActions, Button, Checkbox, Paper, Avatar, Divider
} from '@mui/material';
import { RestoreFromTrash as RestoreIcon, DeleteForever as DeleteForeverIcon, Recycling as RecyclingIcon } from '@mui/icons-material';
import { AppDispatch, RootStore } from './redux/Store';
import { deletePaintedDrawing, fetchDeletedPaintedDrawingsByUserId, recoverPaintedDrawing } from './redux/DeletedPaintedDrawingsSlice';

const RecyclingBinPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userJson = sessionStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  const userId = user?.id;
  const { deletedPaintedDrawings, status } = useSelector((state: RootStore) => state.deletedPaintedDrawings);

  const [selectedDrawings, setSelectedDrawings] = React.useState<number[]>([]);
  const [openPermanentDeleteDialog, setOpenPermanentDeleteDialog] = React.useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchDeletedPaintedDrawingsByUserId(userId));
    }
  }, [dispatch, userId]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedDrawings(deletedPaintedDrawings.map(drawing => drawing.id));
    } else {
      setSelectedDrawings([]);
    }
  };

  const handleSelectDrawing = (id: number) => {
    setSelectedDrawings(prev => 
      prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
    );
  };

  const handleRestore = (ids: number[]) => {
    ids.forEach(id => dispatch(recoverPaintedDrawing(id)));
    setSelectedDrawings([]);
  };

  const handlePermanentDeleteConfirm = () => {
    selectedDrawings.forEach(id => dispatch(deletePaintedDrawing(id)));
    setSelectedDrawings([]);
    setOpenPermanentDeleteDialog(false);
  };

  return (
    <Box sx={{ padding: 4, minHeight: '100vh', marginLeft: { xs: 0, md: '100px' } }}>
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 3, 
          marginBottom: 3, 
          backgroundColor: 'white',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <RecyclingIcon sx={{ color: '#3e8e41', fontSize: 32 }} />
            <Typography 
              variant="h4" 
              sx={{ 
                color: '#2c3e50', 
                fontWeight: 'bold',
                textShadow: '1px 1px 1px rgba(0,0,0,0.1)',
                letterSpacing: '0.5px'
              }}
            >
              סל מיחזור הציורים
            </Typography>
          </Box>
          <Box>
            <Checkbox
              indeterminate={selectedDrawings.length > 0 && selectedDrawings.length < deletedPaintedDrawings.length}
              checked={deletedPaintedDrawings.length > 0 && selectedDrawings.length === deletedPaintedDrawings.length}
              onChange={handleSelectAll}
            />
            {selectedDrawings.length > 0 && (
              <>
                <IconButton color="primary" onClick={() => handleRestore(selectedDrawings)}>
                  <RestoreIcon />
                </IconButton>
                <IconButton color="error" onClick={() => setOpenPermanentDeleteDialog(true)}>
                  <DeleteForeverIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
      </Paper>

      {status === 'loading' ? (
        <Typography variant="h6" color="textSecondary" align="center">טוען...</Typography>
      ) : deletedPaintedDrawings.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <Typography variant="h6" color="textSecondary">סל המיחזור ריק</Typography>
        </Box>
      ) : (
        <Paper elevation={2}>
          <List>
            {deletedPaintedDrawings.map((drawing, index) => (
              <React.Fragment key={drawing.id}>
                <ListItem secondaryAction={
                  <Box>
                    <IconButton edge="end" color="primary" onClick={() => handleRestore([drawing.id])}>
                      <RestoreIcon />
                    </IconButton>
                    <IconButton edge="end" color="error" onClick={() => {
                      setSelectedDrawings([drawing.id]);
                      setOpenPermanentDeleteDialog(true);
                    }}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </Box>
                }>
                  <Checkbox checked={selectedDrawings.includes(drawing.id)} onChange={() => handleSelectDrawing(drawing.id)} />
                  <ListItemIcon>
                    <Avatar 
                      variant="rounded" 
                      src={drawing.imageUrl} 
                      sx={{ 
                        width: 60, 
                        height: 60,
                        border: '1px solid #eee',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                      alt={drawing.name}
                    >
                      {drawing.name?.charAt(0) || '?'}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={drawing.name}
                    sx={{ marginLeft: 2 }}
                  />
                </ListItem>
                {index < deletedPaintedDrawings.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      <Dialog open={openPermanentDeleteDialog} onClose={() => setOpenPermanentDeleteDialog(false)}>
        <DialogTitle>מחיקה לצמיתות</DialogTitle>
        <DialogContent>
          <DialogContentText>האם אתה בטוח שברצונך למחוק {selectedDrawings.length} קבצים לצמיתות? פעולה זו אינה ניתנת לביטול.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPermanentDeleteDialog(false)} color="primary">ביטול</Button>
          <Button onClick={handlePermanentDeleteConfirm} color="error" autoFocus>מחק לצמיתות</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RecyclingBinPage;
