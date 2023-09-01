import { FC } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { theme } from '../../styles';

export const Navbar: FC = () => {
   return (
      <Nav>
         <NavbarContainer>
            <Link to={'/'}>
               <Brand>Metafar</Brand>
            </Link>
         </NavbarContainer>
      </Nav>
   );
};

export default Navbar;

const gradientStart = '#5a2439';
const gradientEnd = '#244d5a';

const Nav = styled.nav`
   width: 100%;
   text-align: left;
   background: linear-gradient(to right, ${gradientStart}, ${gradientEnd});
   box-shadow: ${theme.shadow};
`;

const NavbarContainer = styled.div`
   max-width: 1100px;
   width: 90%;
   margin: 0 auto;
   padding: 2rem 0;
`;

const Brand = styled.div`
   color: ${theme.light};
   font-size: 1.5rem;
   font-weight: bold;
   display: inline-block;
   padding: 0.5rem 2.5rem;
`;
