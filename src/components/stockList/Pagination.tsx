import { FC } from 'react';

import styled from 'styled-components';

interface Props {
   totalPages: number;
   currentPage: number;
   setCurrentPage: (page: number) => void;
}

export const Pagination: FC<Props> = ({ totalPages, currentPage, setCurrentPage }) => {
   const previousPage = () => {
      setCurrentPage(currentPage - 1);
   };

   const nextPage = () => {
      setCurrentPage(currentPage + 1);
   };

   return (
      <PaginationContainer>
         <PaginationButton
            $isDisabled={currentPage === 1}
            disabled={currentPage === 1}
            onClick={previousPage}>
            Anterior
         </PaginationButton>
         <PaginationButton
            $isDisabled={currentPage === totalPages}
            disabled={currentPage === totalPages}
            onClick={nextPage}>
            Siguiente
         </PaginationButton>
      </PaginationContainer>
   );
};

// Styles
const PaginationContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   position: absolute;
   bottom: 0;
   left: 0;
   width: 100%;
   padding: 1rem 0;
   margin-top: 1rem;
   border-radius: 0.5rem;
`;

const PaginationButton = styled.button<{ $isDisabled: boolean }>`
   width: 30%;
   padding: 0.9rem 1rem;
   margin: 0 0.5rem;
   font-size: 18px;
   border: none;
   border-radius: 12px;
   color: #fff;
   background-color: ${({ $isDisabled }) => ($isDisabled ? '#dfdfdf' : '#5a2439')};
   transition: background-color 0.2s ease-in-out;

   &:hover {
      background-color: ${({ $isDisabled }) => ($isDisabled ? '#dfdfdf' : '#4d2536')};
   }
`;
