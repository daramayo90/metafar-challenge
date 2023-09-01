import { FC } from 'react';

import { theme } from '../../styles';
import styled from 'styled-components';

interface Props {
   startDate: string;
   endDate: string;
   setStartDate: (value: string) => void;
   setEndDate: (value: string) => void;
}

export const DateTimeRangePicker: FC<Props> = ({
   startDate,
   endDate,
   setStartDate,
   setEndDate,
}) => {
   return (
      <DateTimeContainer>
         <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
         <input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </DateTimeContainer>
   );
};

// Styled Components
const DateTimeContainer = styled.div`
   width: 100%;
   margin: 0.5rem 0 1rem;
   display: flex;
   justify-content: flex-start;

   input[type='date'] {
      max-width: 110px;
      width: 100%;
      padding: 0.5rem;
      margin-right: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: #fff;
      color: ${theme.text};
      font-size: 0.85rem;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
   }
`;
