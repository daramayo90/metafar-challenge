import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IStockDetail, IStockPriceData } from '../interfaces';
import { getStockDetail, getStockPrice } from '../api';

import { Layout } from '../components/ui';
import {
   StockHeaderComponent,
   RadioButtonComponent,
   DateTimeRangePicker,
   TimeIntervalSelector,
   StockChart,
   TechnicalDetails,
} from '../components/stockDetail';

import styled from 'styled-components';
import { theme } from '../styles';

const StockDetailPage: FC = () => {
   const { symbol, exchange } = useParams<{ symbol: string; exchange: string }>();

   const [stockDetail, setStockDetail] = useState<IStockDetail | null>(null);
   const [stockData, setStockData] = useState<IStockPriceData | null>(null);

   const [realTime, setRealTime] = useState(false);
   const [timeInterval, setTimeInterval] = useState('1min');

   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');

   useEffect(() => {
      let intervalId: NodeJS.Timeout;

      async function fetchData() {
         const detail = await getStockDetail(symbol!, exchange!);
         setStockDetail(detail);

         let startDateParam = startDate;
         let endDateParam = endDate;

         if (realTime) {
            startDateParam = '';
            endDateParam = '';
         }

         const priceData = await getStockPrice(symbol!, startDateParam, endDateParam, timeInterval);
         setStockData(priceData);
      }

      fetchData();

      // Fetch data every 60/300/900 seconds (1/5/15 min)
      if (realTime) {
         const intervalInMilliseconds = Number(timeInterval.split('m')[0]) * 60000;
         intervalId = setInterval(fetchData, intervalInMilliseconds);
      }

      return () => {
         if (intervalId) {
            clearInterval(intervalId); // Clear the interval to prevent memory leak
         }
      };
   }, [symbol, startDate, endDate, exchange, timeInterval, realTime]);

   return (
      <Layout>
         <StockDetailCard>
            <StockDetailContainer>
               <LeftSide>
                  <StockHeaderComponent stockDetail={stockDetail} stockData={stockData} />
                  <RadioButtonComponent realTime={realTime} setRealTime={setRealTime} />

                  {!realTime && (
                     <DateTimeRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                     />
                  )}

                  <TimeIntervalSelector
                     timeInterval={timeInterval}
                     setTimeInterval={setTimeInterval}
                  />
               </LeftSide>
               <RigthSide>
                  <TechnicalDetails stockDetail={stockDetail} stockData={stockData} />
               </RigthSide>
            </StockDetailContainer>
            <StockChart stockDetail={stockDetail} stockData={stockData} />
         </StockDetailCard>
      </Layout>
   );
};

export default StockDetailPage;

// Styled Components
const StockDetailCard = styled.div`
   max-width: 1000px;
   width: 100%;
   margin: 2rem auto;
   padding: 1rem;
   background: ${theme.light};
   border-radius: 12px;
   box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
`;

const StockDetailContainer = styled.div`
   display: flex;
   align-items: flex-start;
   justify-content: space-between;
   width: 95%;
   margin: 0 auto;
`;

const LeftSide = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: space-between;
`;

const RigthSide = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: space-between;
`;
