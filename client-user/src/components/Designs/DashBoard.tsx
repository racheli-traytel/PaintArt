import { styled } from '@mui/material/styles';
import {
    Box,
    Card,
    Avatar,
    Button,
    Paper,
} from '@mui/material';

interface BubbleProps {
    size?: number;
    x?: number;
    y?: number;
    delay?: number;
}

interface DashboardCardProps {
    bgColor?: string;
}

// interface IconWrapperProps {
//     theme: any;
//     color?: string;
// }

export const DashboardWrapper = styled(Box)({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #a6c0fe 0%, #c2e9fb 50%, #bdeaee 100%)',
    backgroundSize: '400% 400%',
    animation: 'gradientBG 15s ease infinite',
    overflow: 'hidden',
    position: 'relative',
    padding: '32px 16px',
    '@keyframes gradientBG': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' }
    }
});

export const Bubble = styled(Box)<BubbleProps>(({ size = 50, x = 0, y = 0, delay = 0 }) => ({
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.25)',
    animation: `float 10s ${delay}s infinite ease-in-out`,
    top: `${y}%`,
    left: `${x}%`,
    '@keyframes float': {
        '0%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-40px)' },
        '100%': { transform: 'translateY(0px)' }
    }
}));

export const WhiteContainer = styled(Paper)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(10px)',
    borderRadius: 24,
    padding: theme.spacing(5),
    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
    width: '95%',
    maxWidth: 900,
    position: 'relative',
    zIndex: 10,
    overflow: 'hidden',
}));

export const StyledAvatar = styled(Avatar)({
    width: 80,
    height: 80,
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    border: '3px solid white',
});

export const DashboardCard = styled(Card)<DashboardCardProps>(({ theme, bgColor }) => ({
    borderRadius: 16,
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    background: bgColor || 'white',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '30%',
        height: '100%',
        background: 'linear-gradient(to left, rgba(255,255,255,0.2), transparent)',
        transform: 'skewX(-15deg) translateX(100%)',
        transition: 'transform 0.5s ease',
    },
    '&:hover::after': {
        transform: 'skewX(-15deg) translateX(-180%)',
    }
}));

export const IconWrapper = styled(Box)<{ color?: string }>(({ theme= {} as any, color }) => ({
    backgroundColor: color || theme.palette.primary.main,
    color: 'white',
    borderRadius: '50%',
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
    boxShadow: `0 4px 8px ${color ? color + '80' : 'rgba(0,0,0,0.1)'}`,
}));

export const ActionButton = styled(Button)({
    borderRadius: 12,
    padding: '10px 16px',
    textTransform: 'none',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
    }
});

export const HistoryItem = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1.5),
    borderRadius: 10,
    backgroundColor: 'rgba(247, 250, 255, 0.8)',
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: 'rgba(237, 242, 255, 1)',
        transform: 'translateX(-5px)',
    }
}));

export const CrayonCharacter = styled(Box)({
    position: 'absolute',
    bottom: '-10px',
    right: '20px',
    width: '180px',
    height: '220px',
    zIndex: 20,
    transition: 'all 0.3s ease',
    transform: 'rotate(5deg)',
    '&:hover': {
        transform: 'rotate(8deg) translateY(-10px)',
    }
});
