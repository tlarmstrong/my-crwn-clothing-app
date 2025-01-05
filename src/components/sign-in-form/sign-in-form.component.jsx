import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { 
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword  
} from '../../utils/firebase/firebase.utils';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async (event) => {
    event.preventDefault();
    const { user } = await signInWithGooglePopup();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch(error) {
      switch(error.code) {
        case 'auth/invalid-credential':
          alert('Credentials invalid!');
          break;
        default:
          console.log(error);
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={ handleSubmit } >
        <FormInput 
          label='Email'
          inputOptions = {{
            type: 'email',
            required: true,
            onChange: handleChange,
            name: 'email',
            value: email 
          }} 
        />
        <FormInput
          label='Password'
          inputOptions = {{
            type: 'password',
            required: true,
            onChange: handleChange,
            name: 'password',
            value: password 
          }} 
        />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button 
            type='button' 
            onClick={ signInWithGoogle } 
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Use Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}

export default SignInForm;
