import typography from './typography';

export default {
    direction: 'ltr',
    sizes: {
        header: 90,
        nav: 300
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8
    },
    typography,
    overrides: {
        MuiInput: {
            underline: {
                '&:hover:not($disabled):not($focused):not($error):before': {
                borderBottomColor: '#949494'
                }
            },
            colorSecondary: {
                '&$focused::after': {
                    borderBottomColor: '#595959'
                },
                '&.MuiInput-underline::after': {
                    borderBottomColor: '#595959'
                }
            }
        },
        MuiTableSortLabel: {
            icon: {
                color: '#FFFFFF !important'
            }
        },
        MUIDataTableToolbar: {
            root: {
                paddingLeft: 5,
                paddingBottom: 5
            },
            titleText: {
                fontSize: '1.6rem'
            },
            actions: {
                padding: '5px 0 5px 0'
            }
        },
        MUIDataTable: {
            paper: {
                padding: '5px 20px',
                borderRadius: 20
            }
        },
        MUIDataTableBodyRow: {
            root: {
                '&:nth-child(even)': {
                    backgroundColor: '#F0EDED'
                },
                '&:hover': {
                    backgroundColor: '#FFF1BE !important'
                }
            }
        },
        MUIDataTableHeadCell: {
            root: {
                textAlign: 'center'
            },
            data: {
                fontWeight: 700,
                color: '#FFFFFF'
            },
            fixedHeader: {
                backgroundColor: '#454141'                
            },
            toolButton: {
                marginLeft: 0,
                marginRight: 0
            },
            contentWrapper: {
                justifyContent: 'center'
            },
            sortActive: {
                color: '#FFFFFF'
            }
        },
        MUIDataTableBodyCell: {
            // root: {
            //     backgroundColor: "#000"
            // }
        }
    }
};