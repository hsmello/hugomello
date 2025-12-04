import * as React from 'react';
import Box from '@mui/material/Box';

export default function BoxSx({ width, height, children, bgColor }) {
  const defaultColor = '#1b2537';

  return (
    <Box
      sx={{
        width: width,
        height: height,
        borderRadius: 1,
        bgcolor: bgColor || defaultColor, // fallback to default
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {children}
    </Box>
  );
}
