import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Demo = ({ type, demos, getItemProps, ...props }) => (
  <>
    {type === 'vertical' && (
      <Box maxWidth={500} mx={'auto'} p={2} bgcolor={'common.white'} {...props}>
        {demos.map(([name, element, boxProps]) => (
          <React.Fragment key={name}>
            <Typography variant={'subtitle2'} gutterBottom>
              {name}
            </Typography>
            <Box position={'relative'} {...getItemProps(name)} {...boxProps}>
              {element}
            </Box>
            <br />
          </React.Fragment>
        ))}
      </Box>
    )}
    {type === 'grid' && (
      <Box p={2} bgcolor={'common.white'} {...props}>
        <Grid container spacing={2}>
          {demos.map(([name, element, boxProps]) => (
            <Grid key={name} item xs={12} sm={6} md={4}>
              <Typography variant={'subtitle2'} gutterBottom>
                {name}
              </Typography>
              <Box position={'relative'} {...getItemProps(name)} {...boxProps}>
                {element}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    )}
  </>
);

Demo.propTypes = {
  type: PropTypes.oneOf(['vertical', 'grid']),
};
Demo.defaultProps = {
  type: 'vertical',
  demos: [],
  getItemProps: () => {},
};

export default Demo;
