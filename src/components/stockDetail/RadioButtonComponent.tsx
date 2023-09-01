import { FC } from 'react';

import styled from 'styled-components';

interface Props {
   realTime: boolean;
   setRealTime: (value: boolean) => void;
}

export const RadioButtonComponent: FC<Props> = ({ realTime, setRealTime }) => {
   return (
      <RadioButtonGroup>
         <label>
            <input
               type='radio'
               value='false'
               checked={!realTime}
               onChange={() => setRealTime(false)}
            />
            Histórico
         </label>
         <label>
            <input
               type='radio'
               value='true'
               checked={realTime}
               onChange={() => setRealTime(true)}
            />
            Tiempo Real
         </label>
      </RadioButtonGroup>
   );
};

// Styled Components
const RadioButtonGroup = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-start;
   width: 100%;
   margin: 2rem 0 1rem;

   label {
      margin-right: 2rem;
      font-size: 1rem;
      cursor: pointer;
   }
`;
