import styled from 'styled-components';

import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin-right: auto;
  margin-left: auto;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const FormContainer = styled.form`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;

  @media screen and (max-width: 800px) {
    margin-left: 0;
    width: 100%;
  }
`;
