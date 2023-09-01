import { FC } from 'react';

import styled from 'styled-components';
import { theme } from '../../styles';

interface Props {
   timeInterval: string;
   setTimeInterval: (value: string) => void;
}

export const TimeIntervalSelector: FC<Props> = ({ timeInterval, setTimeInterval }) => {
   return (
      <IntervalSelector>
         <label>Intervalo</label>
         <select onChange={(e) => setTimeInterval(e.target.value)} value={timeInterval}>
            <option value='1min'>1 min</option>
            <option value='5min'>5 min</option>
            <option value='15min'>15 min</option>
         </select>
      </IntervalSelector>
   );
};

// Styled Components
const IntervalSelector = styled.div`
   width: 100%;
   margin: 1rem auto;
   display: flex;
   flex-direction: column;

   label {
      font-size: 1rem;
      margin-bottom: 0.5rem;
      font-weight: bold;
   }

   select {
      width: 100%;
      padding: 0.5rem;
      margin: 0.3rem 0;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: #fff;
      color: ${theme.text};
      font-size: 1rem;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
   }
`;
