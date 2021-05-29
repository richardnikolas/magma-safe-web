import { merge } from 'lodash';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { DEFAULT_THEME } from 'src/shared/constants';
import MuiBaseConfig from './MuiBaseConfig';

export const createTheme = (color = DEFAULT_THEME) => {
  const config = {
    name: color.id,
    palette: {
      primary: {
        main: color.primary,
        salmon: '#FF6E64',
        gray: '#F0EDED',
        yellow: '#FFF1BE',
        orange: '#FC8C4E',
        darkGray: '#454141',
        grayReddish: '#F8EBEB',
        darkRedBrown: '#170909',
        darkBlue: '#132540'
      },
      secondary: {
        main: color.secondary
      },
      text: {
        primary: '#0F0801'
      },
      error: {
        main: '#D11F1F'
      },
      success: {
        main: '#0F6200'
      },
      disabled: {
        main: '#AAAAAA'
      }
    }
  };

  const theme = createMuiTheme(merge({}, MuiBaseConfig, config));

  return responsiveFontSizes(theme);
};

export default createTheme;