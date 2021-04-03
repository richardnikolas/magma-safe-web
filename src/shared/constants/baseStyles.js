import { makeStyles } from '@material-ui/core/styles';

const baseStyles = makeStyles(theme => ({
  boldText: {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.h3.fontFamily,
    fontWeight: 700
  },
  mt15: { marginTop: 15 },
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
  flexTrueCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    borderRadius: 22,
    padding: 12,
    textTransform: 'uppercase'
  }
}));

export default baseStyles;
