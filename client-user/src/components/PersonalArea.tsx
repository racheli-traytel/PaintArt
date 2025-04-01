import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import { Box, styled } from "@mui/material";

// Create a background div that doesn't affect layout
const Background = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(135deg, #a6c0fe 0%, #c2e9fb 50%, #bdeaee 100%)',
  backgroundSize: '400% 400%',
  animation: 'gradientBG 15s ease infinite',
  zIndex: -10,
  pointerEvents: 'none',
  '@keyframes gradientBG': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' }
  }
});

const PersonalArea = () => {
  return (
    <>
      {/* Background element that doesn't affect layout */}
      <Background />
      
      {/* Original structure unchanged */}
      <Sidebar />
      <Outlet />
    </>
  );
};

export default PersonalArea;