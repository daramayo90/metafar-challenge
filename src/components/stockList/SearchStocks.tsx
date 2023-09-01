import { FC } from 'react';

import styled from 'styled-components';
import { theme } from '../../styles';

interface Props {
   searchName: string;
   searchSymbol: string;
   setSearchName: (name: string) => void;
   setSearchSymbol: (symbol: string) => void;
}

export const SearchStocks: FC<Props> = ({
   searchName,
   searchSymbol,
   setSearchName,
   setSearchSymbol,
}) => {
   return (
      <SearchContainer>
         <SearchInput
            type='text'
            placeholder='Buscar por nombre...'
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
         />
         <SearchInput
            type='text'
            placeholder='Buscar por símbolo...'
            value={searchSymbol}
            onChange={(e) => setSearchSymbol(e.target.value)}
         />
      </SearchContainer>
   );
};

// Styles
const SearchContainer = styled.div`
   display: flex;
   justify-content: space-between;
   padding: 1.5rem;
   border-radius: 12px;
   width: 60%;
`;

const SearchInput = styled.input`
   width: 40%;
   padding: 0.9rem 1rem;
   border: none;
   border-radius: 12px;
   background-color: ${theme.light};
   box-shadow: ${theme.shadow};
   transition: box-shadow 0.3s ease-in-out;
   font-size: 16px;

   &::placeholder {
      color: #a3a3a3;
   }

   &:focus {
      outline: none;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
   }

   &:hover {
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
   }
`;
