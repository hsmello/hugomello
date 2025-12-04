import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

/* types: success, info, warning, error */
export default function Alert({ label, type }) {
  return (
    <Stack
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9999,
        width: 'auto',
        maxWidth: 400,
      }}
      spacing={2}
    >
      <MuiAlert
        severity={type}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          fontFamily: 'inherit',
        }}
      >
        {label}
      </MuiAlert>
    </Stack>
  );
}
