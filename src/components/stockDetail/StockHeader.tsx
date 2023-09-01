import { FC } from 'react';

import { IStockDetail, IStockPriceData } from '../../interfaces';

import styled from 'styled-components';
import { theme } from '../../styles';

interface Props {
   stockDetail: IStockDetail | null;
   stockData: IStockPriceData | null;
}

export const StockHeaderComponent: FC<Props> = ({ stockDetail, stockData }) => {
   if (!stockDetail || !stockData) return <></>;

   return (
      <StockHeader>
         <StockName>{stockDetail?.name}</StockName>
         <StockMeta>
            <Exchange style={{ color: 'gray' }}>{stockDetail?.exchange}</Exchange>
            <Currency>
               Valores en <strong>{stockDetail?.currency}</strong>
            </Currency>
         </StockMeta>
         {stockData && (
            <>
               <StockPrice>{parseFloat(stockData.values[0].open).toFixed(2)}</StockPrice>
               <StockRealTime>
                  Info en tiempo real: {stockData.values[0].datetime} EST
               </StockRealTime>
            </>
         )}
      </StockHeader>
   );
};

// Styled Components
const StockHeader = styled.div`
   text-align: left;
`;

const StockName = styled.h1`
   font-size: 2.5rem;
   margin: 0.5rem 0;
   color: ${theme.text};
`;

const StockMeta = styled.div`
   display: flex;
   justify-content: flex-start;
   align-items: center;
`;

const Exchange = styled.span`
   /* margin: 0.5rem 0; */
`;

const Currency = styled.span`
   margin: 0 1rem;
   font-size: 0.9rem;
`;

const StockPrice = styled.div`
   margin: 0.8rem 0;
   font-size: 3rem;
   font-weight: bold;
   color: ${theme.text};
`;

const StockRealTime = styled.div`
   margin: -0.5rem 0;
   font-size: 0.8rem;
   color: ${theme.text};
`;
