import { instanceApi } from './';
import { IStockDetail, IStockExchanges, IStockList, IStockPriceData } from '../interfaces';

export const getStockExchanges = async (): Promise<IStockExchanges[]> => {
   const { data: resp } = await instanceApi.get('/exchanges');

   // Remove duplicates
   const uniqueExchanges = resp.data.reduce((acc: IStockExchanges[], current: IStockExchanges) => {
      const x = acc.find((item) => item.name === current.name);
      if (!x) {
         return acc.concat([current]);
      } else {
         return acc;
      }
   }, []);

   // Sort the exchanges
   const sortedExchanges = uniqueExchanges.sort((a: IStockExchanges, b: IStockExchanges) => {
      return a.name.localeCompare(b.name);
   });

   return sortedExchanges;
};

export const getStockList = async (exchange: string): Promise<IStockList[]> => {
   const { data: resp } = await instanceApi.get('/stocks', { params: { exchange } });
   return resp.data;
};

export const getStockDetail = async (symbol: string, exchange: string): Promise<IStockDetail> => {
   const { data: resp } = await instanceApi.get(`/stocks`, {
      params: { symbol, exchange },
   });
   return resp.data[0];
};

export const getStockPrice = async (
   symbol: string,
   start_date: string,
   end_date: string,
   interval: string,
): Promise<IStockPriceData> => {
   const { data: resp } = await instanceApi.get(`/time_series`, {
      params: {
         symbol,
         start_date,
         end_date,
         interval,
         apikey: process.env.REACT_APP_TWELVEDATA_API_KEY,
      },
   });

   return resp;
};
