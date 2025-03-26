import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

const PersonalArea = () => {
  
    return(<>
    <Sidebar/>
    <Outlet/>
    </>) ;
  };
  
  export default PersonalArea;
// import React, { useState } from 'react';
// import { 
//   Box, 
//   Drawer, 
//   List, 
//   ListItem, 
//   ListItemIcon, 
//   ListItemText, 
//   Typography, 
//   Avatar, 
//   Grid, 
//   Paper, 
//   Container,
//   IconButton
// } from '@mui/material';
// import { 
//   Dashboard as DashboardIcon, 
//   Palette as PaletteIcon, 
//   AutoFixHigh as AIIcon, 
//   Book as CourseIcon, 
//   Settings as SettingsIcon 
// } from '@mui/icons-material';

// const PersonalArea = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [activeSection, setActiveSection] = useState('dashboard');

//   const userStats = {
//     name: "אלון כהן",
//     totalPaintings: 42,
//     aiGeneratedPaintings: 15,
//     completedCourses: 3,
//     lastPaintingDate: "15 במרץ 2024"
//   };

//   const sidebarItems = [
//     { 
//       id: 'dashboard', 
//       icon: <DashboardIcon />, 
//       label: "לוח בקרה" 
//     },
//     { 
//       id: 'myPaintings', 
//       icon: <PaletteIcon />, 
//       label: "הציורים שלי" 
//     },
//     { 
//       id: 'aiGenerated', 
//       icon: <AIIcon />, 
//       label: "יצירות AI" 
//     },
//     { 
//       id: 'courses', 
//       icon: <CourseIcon />, 
//       label: "קורסים" 
//     },
//     { 
//       id: 'settings', 
//       icon: <SettingsIcon />, 
//       label: "הגדרות" 
//     }
//   ];

//   return (
//     <Box sx={{ 
//       display: 'flex', 
//       minHeight: '100vh', 
//       background: 'linear-gradient(to bottom right, #E3F2FD, #FFF3E0)' 
//     }}>
//       <Drawer
//         variant="permanent"
//         open={isHovered}
//         sx={{
//           width: isHovered ? 240 : 72,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: isHovered ? 240 : 72,
//             boxSizing: 'border-box',
//             transition: 'width 0.3s',
//             overflowX: 'hidden',
//             backgroundColor: 'transparent',
//             border: 'none',
//             boxShadow: 'none'
//           },
//         }}
//         PaperProps={{
//           onMouseEnter: () => setIsHovered(true),
//           onMouseLeave: () => setIsHovered(false)
//         }}
//       >
//         <List sx={{ pt: 0 }}>
//           {sidebarItems.map((item) => (
//             <ListItem 
//               key={item.id}
//               onClick={() => setActiveSection(item.id)}
//               selected={activeSection === item.id}
//               sx={{
//                 justifyContent: 'center',
//                 px: 2,
//                 '&.Mui-selected': {
//                   backgroundColor: 'rgba(33, 150, 243, 0.1)'
//                 },
//                 '&:hover': {
//                   backgroundColor: 'rgba(33, 150, 243, 0.05)'
//                 }
//               }}
//             >
//               <ListItemIcon sx={{ 
//                 minWidth: 'auto', 
//                 justifyContent: 'center', 
//                 color: activeSection === item.id ? 'primary.main' : 'inherit' 
//               }}>
//                 {item.icon}
//               </ListItemIcon>
//               {isHovered && (
//                 <ListItemText 
//                   primary={item.label} 
//                   primaryTypographyProps={{ 
//                     sx: { 
//                       ml: 2,
//                       fontWeight: activeSection === item.id ? 'bold' : 'normal'
//                     } 
//                   }} 
//                 />
//               )}
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         {activeSection === 'dashboard' && (
//           <Container maxWidth="lg">
//             <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
//                 <Avatar 
//                   sx={{ 
//                     width: 64, 
//                     height: 64, 
//                     background: 'linear-gradient(45deg, #2196F3, #FF9800)', 
//                     mr: 2 
//                   }}
//                 >
//                   {userStats.name[0]}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h4" color="primary" fontWeight="bold">
//                     שלום, {userStats.name}!
//                   </Typography>
//                   <Typography color="secondary">
//                     הסטודיו האישי שלך מחכה לך
//                   </Typography>
//                 </Box>
//               </Box>

//               <Grid container spacing={3}>
//                 <Grid item xs={12} sm={4}>
//                   <Paper 
//                     elevation={2}
//                     sx={{ 
//                       p: 3, 
//                       textAlign: 'center', 
//                       backgroundColor: 'primary.light' 
//                     }}
//                   >
//                     <DashboardIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
//                     <Typography variant="h6" color="primary">
//                       ציורים צבועים
//                     </Typography>
//                     <Typography variant="h3" color="primary.dark">
//                       {userStats.totalPaintings}
//                     </Typography>
//                   </Paper>
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <Paper 
//                     elevation={2}
//                     sx={{ 
//                       p: 3, 
//                       textAlign: 'center', 
//                       backgroundColor: 'secondary.light' 
//                     }}
//                   >
//                     <AIIcon color="secondary" sx={{ fontSize: 48, mb: 2 }} />
//                     <Typography variant="h6" color="secondary">
//                       ציורי AI
//                     </Typography>
//                     <Typography variant="h3" color="secondary.dark">
//                       {userStats.aiGeneratedPaintings}
//                     </Typography>
//                   </Paper>
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <Paper 
//                     elevation={2}
//                     sx={{ 
//                       p: 3, 
//                       textAlign: 'center', 
//                       backgroundColor: 'info.light' 
//                     }}
//                   >
//                     <CourseIcon color="info" sx={{ fontSize: 48, mb: 2 }} />
//                     <Typography variant="h6" color="info">
//                       קורסים שהושלמו
//                     </Typography>
//                     <Typography variant="h3" color="info.dark">
//                       {userStats.completedCourses}
//                     </Typography>
//                   </Paper>
//                 </Grid>
//               </Grid>

//               <Box textAlign="center" mt={4}>
//                 <Typography color="primary">
//                   הציור האחרון שלך צוייר ב-{userStats.lastPaintingDate}
//                 </Typography>
//               </Box>
//             </Paper>
//           </Container>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default PersonalArea;