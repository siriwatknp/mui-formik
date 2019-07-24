import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
// import { setConsoleOptions, withConsole } from '@storybook/addon-console';

// setConsoleOptions({
//   panelExclude: [],
// });

const baseTheme = createMuiTheme();
const ThemeDecorator = storyFn => (
  <>
    <CssBaseline />
    <ThemeProvider theme={baseTheme}>
      {storyFn()}
    </ThemeProvider>
  </>
);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  addDecorator(ThemeDecorator);
  req.keys().forEach(filename => req(filename));
}

// addDecorator((storyFn, context) => withConsole()(storyFn)(context));
configure(loadStories, module);
