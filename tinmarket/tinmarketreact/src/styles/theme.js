import {createTheme} from '@mui/material/styles';
import {yellow} from '@material-ui/core/colors';

export const theme = createTheme({
    // palette: {
    //     type: 'dark',
    //     primary: {
    //         main: yellow[500],
    //         darker: yellow[600]
    //         light: yellow[400]
    //     },
    //     secondary: {
    //         main: yellow[400],
    //     }
    // },
    palette: {
        type: 'dark',
        primary: {
            main: '#ffe500',
        },
        secondary: {
            main: '#fff176',
        },
        error: {
            main: '#900b00',
        },
        info: {
            main: '#f57f17',
        },
    },
});