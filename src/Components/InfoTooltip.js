import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

const InheritedFontTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 300,
    fontFamily: 'inherit', // Inherit font from parent (e.g. index.css)
    fontSize: 'inherit',   // Optional: inherit size too if you want consistency
    color: 'inherit',      // Optional: inherit color if your global text color fits
  },
});

export default function InfoTooltip({ text }) {
  return (
    <div>
      <InheritedFontTooltip title={text}>
        <InfoOutlineIcon />
      </InheritedFontTooltip>
    </div>
  );
}
