import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({ label, onClick }) {
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="outlined"
        onClick={onClick}
        sx={{
          color: 'var(--textColor)',
          borderColor: 'var(--secondaryColor)',
          backgroundColor: 'var(--mainColor)',
          fontFamily: 'inherit', // 👈 match website font
          textTransform: 'none', // optional: keep label casing as-is
          '&:hover': {
            borderColor: 'var(--textColor)',
            backgroundColor: 'var(--mainColorLight)',
            color: 'var(--secondaryColor)',
          },
          '&:active': {
            backgroundColor: 'var(--mainColorLight)',
            color: 'var(--secondaryColor)',
          },
          '&:focus': {
            outline: 'none',
            borderColor: 'var(--secondaryColor)',
          },
        }}
      >
        {label}
      </Button>
    </Stack>
  );
}
