// src/components/UI/Loading.tsx
import { CircularProgress, Box } from '@mui/material';

const Loading = ({ fullScreen = false }) => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center"
    minHeight={fullScreen ? '100vh' : 'auto'}
  >
    <CircularProgress size={80} thickness={4} />
  </Box>
);

export default Loading;