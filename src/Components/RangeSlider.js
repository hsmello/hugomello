import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import PropTypes from 'prop-types';

export default function RangeSlider({ value, onChange, min, max, step = 1, width, valueLabelFormat, marks }) {
  const handleChange = (event, newValue) => {
    if (Array.isArray(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ width }}>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={valueLabelFormat}
        getAriaLabel={() => 'Range slider'}
        disableSwap={false}
        marks={marks}
        sx={{
          color: 'inherit', // track & thumb color
          '& .MuiSlider-thumb': {
            borderColor: 'currentColor', // thumb border
          },
          '& .MuiSlider-valueLabel': {
            color: 'inherit', // value label text
          },
          '& .MuiSlider-mark': {
            backgroundColor: 'currentColor', // marks
          },
          '& .MuiSlider-track': {
            color: 'currentColor',
          },
          '& .MuiSlider-rail': {
            color: 'currentColor',
          },
          '& .MuiSlider-mark': {
            backgroundColor: 'currentColor', // inherit mark color
            height: 6,
            width: 2,
          },
          '& .MuiSlider-markLabel': {
            color: 'inherit',
            font: 'inherit',
            fontSize: '14px'
          },
        }}
      />
    </Box>
  );
}

RangeSlider.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  width: PropTypes.number,
  valueLabelFormat: PropTypes.func,
};
