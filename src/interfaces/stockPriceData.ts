export interface IStockPriceData {
   meta: {
      symbol: string;
      interval: string;
      exchange: string;
      exchange_timezone: string;
   };

   values: [
      {
         datetime: string;
         open: string;
         high: string;
         low: string;
         close: string;
         volume: string;
      },
   ];
}
