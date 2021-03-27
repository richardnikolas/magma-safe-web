import typography from './typography';

export default {
    direction: 'ltr',
    sizes: {
        header: 90,
        nav: 300,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
    },
    typography,
    overrides: {
        MuiInput: {
            underline: {
                '&:hover:not($disabled):not($focused):not($error):before': {
                borderBottomColor: '#949494',
                },
            },
                colorSecondary: {
                '&$focused::after': {
                borderBottomColor: '#595959',
                },
                '&.MuiInput-underline::after': {
                borderBottomColor: '#595959',
            },
        },
        },
    },
};