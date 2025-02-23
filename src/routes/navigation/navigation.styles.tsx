import styled from 'styled-components';
import { Link } from 'react-router';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

export const LogoContainer = styled(Link) `
  padding: 25px;

  @media screen and (max-width: 800px) {
    padding: 0;
  }
`;
export const NavLinksContainer = styled.div `
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
    width: 75%;
  }
`;
export const NavLink = styled(Link) `
  padding: 10px 15px;
  cursor: pointer;
`;

