import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields({ label, width, name }) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: {width} },
        '& .MuiInputBase-root': {
          color: 'var(--textColor)',
          backgroundColor: 'var(--mainColor)',
          fontFamily: 'inherit',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'var(--secondaryColor)',
          },
          '&:hover fieldset': {
            borderColor: 'var(--textColor)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--secondaryColor)',
          },
        },
        '& .MuiInputLabel-root': {
          color: 'var(--textColor)',
          fontFamily: 'inherit',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'var(--secondaryColor)',
        },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-static"
          label={label}
          multiline
          name={name}
          rows={5}
        />
      </div>
    </Box>
  );
}
