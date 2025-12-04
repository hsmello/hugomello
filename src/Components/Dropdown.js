import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown({
  label,
  options = [],
  value,
  onChange,
  fullWidth = true,
  minWidth = 120,
}) {
  return (
    <Box sx={{ minWidth }}>
      <FormControl fullWidth={fullWidth}  
      >
        <InputLabel
          sx={{
            color: 'inherit', // default color
            '&.Mui-focused': {
              color: 'inherit', // color when dropdown is focused
            },
          }}
          
        >
          {label}
        </InputLabel>
        <Select
          value={value}
          label={label}
          onChange={onChange}
          sx={{
            color: 'inherit', // text color
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'inherit', // outline color
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'inherit', // hover outline
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'inherit', // focused outline
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
