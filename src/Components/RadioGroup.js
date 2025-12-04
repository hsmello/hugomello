import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const StyledFormControl = styled(FormControl)(() => ({
  fontFamily: 'inherit',
  color: 'inherit',
  '& .MuiFormLabel-root': {
    fontFamily: 'inherit',
    color: 'inherit',
    fontSize: 'inherit',
  },
  '& .MuiFormControlLabel-label': {
    fontFamily: 'inherit',
    color: 'inherit',
    fontSize: 'inherit',
  },
  '&.Mui-focused': {
    color: 'inherit',
  },
}));

const StyledRadio = styled(Radio)(() => ({
  color: 'var(--textColor)', // default (unselected) color
  '&.Mui-checked': {
    color: 'var(--accentColor)', // selected color, customize this variable
  },
  '&:hover': {
    backgroundColor: 'rgba(221, 12, 12, 0.08)', // subtle hover effect
  },
  marginBottom: '-2px',     // shorten space below the group label
  transform: 'scale(0.8)',  // radio button smaller (80%)
}));


export default function RadioButtonsGroup({ label, options = [], value, onChange }) {
  return (
    <StyledFormControl component="fieldset">
      {label && 
        <FormLabel 
          component="legend" 
          sx={{ marginBottom: '8px',
            color: 'inherit', // default color
            '&.Mui-focused': {
              color: 'inherit', // color when dropdown is focused
            },
          }}>
        {label}
        </FormLabel>
      }
      <RadioGroup
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<StyledRadio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </StyledFormControl>
  );
}
