import styled from 'styled-components';

import {
  BaseButton,
  InvertedButton
} from '../button/button.styles';

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
  }

  ${ BaseButton },
  ${ InvertedButton }  {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 75%;
    display: none;
  }

  &:hover {
    img {
      opacity: 0.8;
    }

    ${ BaseButton },
    ${ InvertedButton }  {
      opacity: 0.85;
      display: flex;
    }
  }

  @media screen and (max-width: 800px) {
    margin-bottom: 30px;

    ${ BaseButton },
    ${ InvertedButton } {
      display: flex;
      opacity: 0.9;
      min-width: unset;
      padding: 0 10px;
    }
    &:hover {
      img {
        opacity: unset;
      }
      ${ BaseButton },
      ${ InvertedButton } {
        opacity: unset;
      }
    }
  }
`;

export const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: medium;

  @media screen and (max-width: 400px) {
    font-size: larger;
  }
`;

export const Name = styled.span`
  max-width: 80%;
`;

export const Price = styled.span`
  margin-left: auto
`;
