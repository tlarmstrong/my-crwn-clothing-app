import { FC, InputHTMLAttributes } from 'react';

import {
  FormInputLabel,
  Input,
  Group 
} from './form-input.styles';

export type FormInputProps =  { label: string; } & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({ label, inputOptions }) => {
  return (
    <Group>
      <Input { ...inputOptions } />
      { label && (
        <FormInputLabel shrink={ Boolean(
          inputOptions.value && 
          typeof inputOptions.value === 'string' && 
          inputOptions.value.length
        )}>
          { label }
        </FormInputLabel>
      )}
    </Group>
  );
}

export default FormInput;
