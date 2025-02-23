import styled from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-left: 30px;
  border-left: 1px solid gray;

  h2 {
    margin: 10px 0;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    margin-top: 30px;
    border: none;
    padding: 0;
  }
`;

