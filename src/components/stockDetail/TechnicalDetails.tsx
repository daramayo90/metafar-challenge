import { FC } from 'react';

import { IStockDetail, IStockPriceData } from '../../interfaces';

import styled from 'styled-components';

interface Props {
   stockDetail: IStockDetail | null;
   stockData: IStockPriceData | null;
}

export const TechnicalDetails: FC<Props> = ({ stockDetail, stockData }) => {
   if (!stockDetail || !stockData) return <></>;

   return (
      <TechnicalDetailsContainer>
         <Title>Información Técnica</Title>
         <DataContainer>
            <span>Símbolo</span>
            <span>{stockDetail.symbol}</span>
         </DataContainer>
         <DataContainer>
            <span>País</span>
            <span>{stockDetail.country}</span>
         </DataContainer>
         <DataContainer>
            <span>Último Cierre</span>
            <span>{parseFloat(stockData.values[0].close).toFixed(2)}</span>
         </DataContainer>
         <DataContainer>
            <span>Apertura</span>
            <span>{parseFloat(stockData.values[0].open).toFixed(2)}</span>
         </DataContainer>
         <DataContainer>
            <span>Máximo</span>
            <span>{parseFloat(stockData.values[0].high).toFixed(2)}</span>
         </DataContainer>
         <DataContainer>
            <span>Mínimo</span>
            <span>{parseFloat(stockData.values[0].low).toFixed(2)}</span>
         </DataContainer>
         <DataContainer>
            <span>Volumen</span>
            <span>{parseFloat(stockData.values[0].volume).toFixed(0)}</span>
         </DataContainer>
      </TechnicalDetailsContainer>
   );
};

// Styled Components
const TechnicalDetailsContainer = styled.div`
   border-left: 1px solid #ccc;
   padding: 0 1rem;
`;

const Title = styled.h2`
   font-size: 1.5rem;
   margin: 1%.5 0;
`;

const DataContainer = styled.div`
   display: flex;
   justify-content: space-between;
   border-bottom: 1px solid #ccc;
   padding: 0.6rem 0;
`;
