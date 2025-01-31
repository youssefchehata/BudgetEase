import React, { useState, useEffect } from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 1000); // Simulate progress increasing every second

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ width: '100%', padding: 3 }}>
      <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
        Loading...
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
        {progress}% completed
      </Typography>
    </Box>
  );
};

export default Loading;
