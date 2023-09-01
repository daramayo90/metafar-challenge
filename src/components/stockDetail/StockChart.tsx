import { FC } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import AccessibilityModule from 'highcharts/modules/accessibility'; // Importing accessibility

import { IStockDetail, IStockPriceData } from '../../interfaces';

// Initialize the accessibility module
AccessibilityModule(Highcharts);

interface Props {
   stockDetail: IStockDetail | null;
   stockData: IStockPriceData | null;
}

export const StockChart: FC<Props> = ({ stockDetail, stockData }) => {
   if (!stockDetail || !stockData) return <></>;

   return (
      <HighchartsReact
         highcharts={Highcharts}
         options={{
            title: {
               text: `${stockDetail?.name}`,
            },
            series: [
               {
                  name: stockDetail?.name,
                  data: stockData!.values.map(({ open }) => parseFloat(open)),
                  type: 'line',
               },
            ],
            xAxis: {
               reversed: true,
               categories: stockData!.values.map(({ datetime }) => {
                  const time = datetime.split(' ')[1].substring(0, 5);
                  return time;
               }),
            },
         }}
      />
   );
};
