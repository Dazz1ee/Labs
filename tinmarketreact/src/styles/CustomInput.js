import InputLabel from '@mui/material/InputLabel';
import {yellow} from '@material-ui/core/colors';
import { styled } from '@mui/material/styles'
import Typography from '@material-ui/core/Typography'

export const CustomInput = styled(InputLabel)(({ theme }) => ({
    border: "none",
    fontWeight: 'bold',
    fontFamily: 'arial,sans-serif',
    letterSpacing: '0px',
    fontSize:'10px',
    top:'-2px',
    left: '-3px',
    transformOrigin: 'top left',
    textOverflow:'unset',
}));

export const CustomTypography= styled(InputLabel)(({ theme }) => ({
    fontWeight: 'bold',
    marginTop:'5px',
    fontFamily: 'arial,sans-serif',
    letterSpacing: '0px',
    fontSize:'10px',
    color: yellow[600],
    '&:hover' : {
        color: yellow[900],
    }
}));

