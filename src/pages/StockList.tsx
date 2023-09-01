import { Banner, Layout } from '../components/ui';
import { StockListTable } from '../components/stockList';

import styled from 'styled-components';

const StockList = () => {
   return (
      <Layout>
         <StockListContainer>
            <Banner />
            <StockListTable />
         </StockListContainer>
      </Layout>
   );
};

export default StockList;

// Styles
const StockListContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   min-height: 100vh;
`;
