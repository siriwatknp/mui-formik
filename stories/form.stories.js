import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { boolean } from '@storybook/addon-knobs';

import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';
import LanguageForm from './forms/LanguageForm';
import ProfileForm from './forms/ProfileForm';
import ArrayForm from './forms/ArrayForm';

storiesOf('Form', module)
  .add('Login form', () => <LoginForm />)
  .add('Sign Up Form', () => <SignUpForm />)
  .add('Language Form', () => <LanguageForm />)
  .add('Profile Form', () => <ProfileForm />)
  .add('Array Form', () => <ArrayForm />)

// import { Button, Welcome } from '@storybook/react/demo';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
//
// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));
