import {yellow} from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
export  const useStyles = makeStyles((theme) => ({
    select: {
        textOverflow:'unset',
        minWidth: '50px',
        background: 'white',
        color: yellow[500],
        fontWeight:200,
        fontSize:'10px',
        borderStyle:'none',
        borderWidth: 2,
        borderRadius: '32px',
        paddingLeft: 1,
        paddingTop: 1,
        paddingBottom: 5,
        boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
        "&:focus":{
            color: yellow[100],
            borderRadius: 12,
            background: 'white',
            borderColor: yellow[100]
        },
    },
    icon:{
        color: yellow[700],
        right: '4px',
        position: 'absolute',
        userSelect: 'none',
        pointerEvents: 'none',
        width: '25%'
    },
    paper: {
        textOverflow:'unset',
        borderRadius: 12,
        marginTop: 8
    },
    list: {
        textOverflow:'unset',
        paddingTop:0,
        paddingBottom:0,
        background:'white',
        "& li":{
            fontWeight:200,
            paddingTop:12,
            paddingBottom:12,
        },
        "& li:hover":{
            background: yellow[100]
        },
        "& li.Mui-selected":{
            color:'white',
            background: yellow[400]
        },
        "& li.Mui-selected:hover":{
            background: yellow[500]
        }
    },
    typcart : {
        fontWeight: 'bold',
        fontFamily: 'Sawarabi Gothic, sans-serif',
        marginTop:'120px',
        marginBottom:'10px',
        marginLeft: '85px'
    },
    box:{
        marginBottom:'20px',
        marginLeft: '85px',
        width: '70%',
        backgroundColor: yellow[600],
        height: '2px'
    },
}));