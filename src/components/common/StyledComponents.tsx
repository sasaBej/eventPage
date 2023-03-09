import { Card, DialogContentText, Grid, Tab, Typography } from '@mui/material';
import { Box, Button, styled, TextField } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { TypographyWithError } from '../../types/CustomStyledComponentsProps';
import { TabList } from '@mui/lab';
import bgImage from '../../assets/img/concertBeach.png';

const SELECTED_TAB_COLOR = 'white';

export const StyledCard = styled(Card)(() => ({
  backgroundColor: '#459995',
  boxShadow: 'none'
}));

export const StyledIcon = styled(InfoIcon)({
  margin: '40px 0 0 10px',
  color: 'white',
  cursor: 'pointer'
});

export const StyledButton = styled(Button)(() => ({
  backgroundColor: '#FF7070',
  margin: '20px auto',
  width: '246px',
  height: '48px',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#FF5C5C'
  },
  '&.Mui-disabled': {
    backgroundColor: '#FF9999'
  }
}));
export const StyledButtonNavBar = styled(StyledButton)(() => ({
  width: '120px'
}));

export const StyledTextField = styled(TextField)({
  borderRadius: '4px',
  '& .MuiInputBase-input': {
    color: '#000',
    fontWeight: 500,
    backgroundColor: 'white',
    borderRadius: '4px',
    '&::placeholder': {
      color: '#000'
    }
  },
  '& .MuiFormLabel-root': {
    color: '#1a1a1a',
    fontWeight: 500,
    borderWidth: 3
  },
  '& label.Mui-focused': {
    color: '#8B98A7'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#8B98A7',
      borderWidth: 2
    },
    '&:hover fieldset': {
      borderColor: '#000',
      borderWidth: 3
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000'
    }
  }
});

export const StyledFieldRegToEventDisable = styled(StyledTextField)({
  width: '320px',
  '& .MuiInputBase-input': {
    color: '#8B98A7'
  }
});

export const StyledFieldRegToEventEnable = styled(StyledTextField)({
  width: '320px'
});

export const StyledDialogContentText = styled(DialogContentText)({
  marginBottom: '40px',
  color: '#000',
  display: 'inline-flex',
  flexWrap: 'nowrap',
  maxWidth: '450px'
});

export const StyledDialogRegToEvent = styled(StyledDialogContentText)({
  marginBottom: '0'
});

export const StyledBox = styled(Box)({
  margin: '0 auto',
  padding: '20px 0',
  backgroundColor: '#87D4D0',
  borderRadius: '8px',
  maxWidth: '800px',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& .MuiTextField-root': { width: '484px', margin: '25px auto' }
});

export const StyledBoxFlex = styled(Box)({
  display: 'flex'
});

export const StyledTypography = styled(Typography)({
  lineHeight: '48px',
  fontSize: '40px',
  padding: '60px 0 30px',
  letterSpacing: '0',
  color: '#000',
  fontWeight: 'bold',
  textAlign: 'center'
});

export const StyledTypographyUploadButton = styled(Typography)<TypographyWithError>(({ theme, hasError }) => ({
  padding: '5px 0 30px',
  letterSpacing: '0',
  color: hasError ? theme.palette.error.main : theme.palette.success.main,
  textAlign: 'center'
}));

export const StyledFileUploadHintIcon = styled(StyledIcon)({
  margin: '0 0 0 10px'
});

export const StyledTypographyUserName = styled(Typography)({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: '1.3rem',
  marginRight: '4px'
});

export const StyledTypographyCardEvents = styled(Typography)({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: '1.3rem',
  fontWeight: '600'
});
export const StyledTypographyTitleEvent = styled(Typography)({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
});

export const StyledGridItemUserName = styled(Grid)({
  display: 'flex',
  flexWrap: 'nowrap',
  maxWidth: '300px'
});
export const StyledEventTitle = styled(StyledGridItemUserName)({
  maxWidth: '700px'
});

export const StyledCardTitleEvent = styled(StyledGridItemUserName)({
  maxWidth: '400px'
});
export const StyledCardEventDetails = styled(StyledGridItemUserName)({
  maxWidth: '125px'
});

export const StyledTypographyEvent = styled(Typography)({
  color: 'green',
  marginBottom: '5px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
});

export const StyledBoxComponentWithNavbar = styled(Box)(() => ({
  maxHeight: 'calc(100% - 88px)',
  overflowY: 'auto'
}));

export const StyledContainer = styled(Box)({
  position: 'relative',
  minHeight: '100%',
  backgroundImage: `url(${bgImage})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  ':after': { position: 'absolute', content: '""', top: 0, height: '100%', width: '100%', background: 'black', opacity: 0.4 },
  '& > *': {
    position: 'relative',
    zIndex: '10'
  }
});

export const StyledTab = styled(Tab)({
  '&.Mui-selected': {
    color: SELECTED_TAB_COLOR
  }
});

export const StyledTabsList = styled(TabList)({
  '& .MuiTabs-indicator': {
    background: SELECTED_TAB_COLOR
  }
});