import styled from 'styled-components';

export const AuthenticationContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  margin: 30px auto;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    width: 100%;
  }
`;

