import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as Core from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { withKnobs } from '@storybook/addon-knobs';
// import { setConsoleOptions, withConsole } from '@storybook/addon-console';

// setConsoleOptions({
//   panelExclude: [],
// });
const baseTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1890ff',
    },
  },
});
const ThemeDecorator = storyFn => (
  <>
    <CssBaseline />
    <ThemeProvider theme={baseTheme}>{storyFn()}</ThemeProvider>
  </>
);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  addDecorator(ThemeDecorator);
  addDecorator(withKnobs);
  req.keys().forEach(filename => req(filename));
}

// addDecorator((storyFn, context) => withConsole()(storyFn)(context));
configure(loadStories, module);
