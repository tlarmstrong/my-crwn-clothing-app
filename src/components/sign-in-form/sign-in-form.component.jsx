import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { 
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword  
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const signInWithGoogle = async (event) => {
    event.preventDefault();
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInUserWithEmailAndPassword(email, password);
      console.log(response);
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
    <div className='sign-in-container'>
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
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' onClick={ signInWithGoogle } buttonType='google'>Use Google</Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
