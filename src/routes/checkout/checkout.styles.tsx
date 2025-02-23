import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  width: 85%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;

  @media screen and (max-width: 800px) {
    width: 100%;
    margin-top: 20px;
  }
`;

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;

  @media screen and (max-width: 800px) {
    font-size: smaller;
    
    div:first-child {
      display: block;
      width: 18%;
    }

    div:nth-child(2) {
      display: block;
      width: 23%;
    }
  }
`;

export const HeaderBlock = styled.div`
  text-transform: capitalize;
`;

export const Total = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: x-large;
`;
