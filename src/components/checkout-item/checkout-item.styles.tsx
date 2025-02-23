import styled from 'styled-components';

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: medium;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    font-size: smaller;
  }
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const Name = styled.div`
  width: 25%;

  @media screen and (max-width: 800px) {
    width: 23%;
  }
`;

export const Quantity = styled.div`
  width: 23%;
  display: flex;

  @media screen and (max-width: 800px) {
    width: auto;
    margin-right: auto;
    margin-left: auto;
  }
`;

export const Price = styled.div`
  width: 23%;
`;

export const Arrow = styled.span`
  cursor: pointer;
`;

export const Value = styled.span`
  margin: 0 10px;
`;

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;

