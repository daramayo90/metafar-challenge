import { FC, ReactNode } from 'react';
import { Navbar } from '.';

import styled from 'styled-components';
import { theme } from '../../styles';

interface Props {
   children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
   return (
      <LayoutContainer>
         <Navbar />
         {children}
      </LayoutContainer>
   );
};

const LayoutContainer = styled.section`
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: ${theme.light};
   min-height: 100vh;
`;
