import { makeStyles } from '@material-ui/core/styles';

const baseStyles = makeStyles(theme => ({
  pageContainer: {
    backgroundColor: theme.palette.primary.darkRedBrown,
    minHeight: '100%',
    alignItems: 'center',
    padding: '65px 0 0 75px',
    [theme.breakpoints.down('xs')]: {
      padding: '60px 0 50px 0'
    }
  },
  boldText: {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.h3.fontFamily,
    fontWeight: 700
  },
  title: {
    fontWeight: 800,
    fontSize: '2em',
    color: theme.palette.primary.darkBlue
  },
  highlightedInfo: {
    fontWeight: 700,
    color: theme.palette.primary.main
  },
  mt10: { marginTop: 10 },
  mt15: { marginTop: 15 },
  mt25: { marginTop: 25 },
  mt30: { marginTop: 30 },
  mt40: { marginTop: 40 },
  mt50: { marginTop: 50 },
  mt100: { marginTop: 100 },
  ml50: { marginLeft: 50 },
  textCenter: {
    textAlign: 'center'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center'
  },
  flexAlignCenter: {
    display: 'flex',
    alignItems: 'center'
  },
  flexTrueCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexEvenly: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  btn: {
    borderRadius: 22,
    padding: 12,
    textTransform: 'uppercase'
  },
  primaryBtn: {
    padding: '10px 20px',
    borderRadius: 15,
    fontWeight: 600,
    textTransform: 'capitalize',
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    },
    '&:disabled': {
      backgroundColor: theme.palette.primary.gray
    }
  },
  secondaryBtn: {
    padding: '10px 20px',
    borderRadius: 15,
    fontWeight: 600,
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    border: `1px solid #FFFFFF`,
    marginRight: 20,
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      border: `1px solid ${theme.palette.primary.main}`
    },
    '&:disabled': {
      backgroundColor: theme.palette.primary.gray
    }
  }
}));

export default baseStyles;
