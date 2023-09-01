import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IStockExchanges, IStockList } from '../../interfaces';

import { SearchStocks } from './SearchStocks';
import { getStockExchanges, getStockList } from '../../api';
import { Pagination } from './';

import styled from 'styled-components';
import { theme } from '../../styles';

export const StockListTable: FC = () => {
   const [isLoading, setIsLoading] = useState(false);

   const [stocks, setStocks] = useState<IStockList[]>([]);
   const [exchanges, setExchanges] = useState<IStockExchanges[]>([]);
   const [selectedExchange, setSelectedExchange] = useState('');

   const [searchName, setSearchName] = useState('');
   const [searchSymbol, setSearchSymbol] = useState('');

   const [currentPage, setCurrentPage] = useState(1);

   const itemsPerPage = 10;

   useEffect(() => {
      const fetchExchanges = async () => {
         const exchangesData = await getStockExchanges();
         setExchanges(exchangesData);
      };

      fetchExchanges();
   }, []);

   useEffect(() => {
      if (selectedExchange) {
         const fetchStocks = async () => {
            setIsLoading(true);

            const stocksData = await getStockList(selectedExchange);
            setStocks(stocksData);

            setIsLoading(false);
         };

         fetchStocks();
      }
   }, [selectedExchange]);

   useEffect(() => {
      setCurrentPage(1);
   }, [searchName, searchSymbol, selectedExchange]);

   const filteredStocks = stocks.filter(
      (stock) =>
         stock.name.toLowerCase().includes(searchName.toLowerCase()) &&
         stock.symbol.toLowerCase().includes(searchSymbol.toLowerCase()) &&
         (selectedExchange ? stock.exchange === selectedExchange : true),
   );

   const stocksOnCurrentPage = filteredStocks.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
   );

   const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);

   return (
      <StockListContainer>
         <ExchangeSelect
            onChange={(e) => setSelectedExchange(e.target.value)}
            value={selectedExchange}>
            <option value=''>Selecciona un Exchange</option>
            {exchanges.map((exchange, index) => (
               <option key={index} value={exchange.name}>
                  {exchange.name}
               </option>
            ))}
         </ExchangeSelect>
         <Card>
            <CardHeader>
               <CardTitle>Stocks</CardTitle>
               <SearchStocks
                  searchName={searchName}
                  searchSymbol={searchSymbol}
                  setSearchName={setSearchName}
                  setSearchSymbol={setSearchSymbol}
               />
            </CardHeader>
            {isLoading ? (
               <div>Cargando...</div>
            ) : (
               <Table>
                  <thead>
                     <TableRow>
                        <TableHeaderSymbol>Símbolo</TableHeaderSymbol>
                        <TableHeaderName>Nombre</TableHeaderName>
                        <TableHeaderCurrency>Moneda</TableHeaderCurrency>
                        <TableHeaderType>Tipo</TableHeaderType>
                     </TableRow>
                  </thead>
                  <tbody>
                     {stocksOnCurrentPage &&
                        stocksOnCurrentPage.map((stock: IStockList) => (
                           <TableRow key={stock.symbol}>
                              <TableCell>
                                 <StyledLink to={`/stock/${stock.symbol}/${stock.exchange}`}>
                                    {stock.symbol}
                                 </StyledLink>
                              </TableCell>
                              <TableCell>
                                 {stock.name.length > 45
                                    ? `${stock.name.substring(0, 45)}...`
                                    : stock.name}
                              </TableCell>
                              <TableCell>{stock.currency}</TableCell>
                              <TableCell>{stock.type}</TableCell>
                           </TableRow>
                        ))}
                  </tbody>
               </Table>
            )}
            <Pagination
               totalPages={totalPages}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
            />
         </Card>
      </StockListContainer>
   );
};

// Styled Components
const StockListContainer = styled.div`
   max-width: 1050px;
   width: 100%;
   margin: 1rem auto;
`;

const ExchangeSelect = styled.select`
   max-width: 240px;
   width: 100%;
   padding: 0.5rem;
   margin: 1rem 0;
   border: 1px solid #ccc;
   border-radius: 4px;
   background-color: #fff;
   color: ${theme.text};
   font-size: 1rem;
   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Card = styled.div`
   height: 780px;
   padding: 2rem;
   margin: 1rem 0;
   background-color: #fff;
   border-radius: 12px;
   box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
   position: relative;
`;

const CardHeader = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

const CardTitle = styled.h2`
   font-size: 2rem;
   margin-bottom: 2rem;
   color: ${theme.text};
`;

const Table = styled.table`
   min-width: 640px;
   width: 100%;
   margin: 1rem 0;
   border-collapse: collapse;
`;

const TableRow = styled.tr`
   &:nth-child(even) {
      background-color: #f8f8f8;
   }
`;

const TableHeaderSymbol = styled.th`
   padding: 1rem 1rem 1rem 0;
   text-align: left;
   color: #333;
   font-weight: 600;
   width: 15%;
`;

const TableHeaderName = styled.th`
   padding: 1rem 1rem 1rem 0;
   text-align: left;
   color: #333;
   font-weight: 600;
   width: 40%;
`;

const TableHeaderCurrency = styled.th`
   padding: 1rem 1rem 1rem 0;
   text-align: left;
   color: #333;
   font-weight: 600;
   width: 10%;
`;

const TableHeaderType = styled.th`
   padding: 1rem 1rem 1rem 0;
   text-align: left;
   color: #333;
   font-weight: 600;
   width: 35%;
`;

const TableCell = styled.td`
   padding: 1rem 0.2rem;
   color: #7a7a7a;
`;

const StyledLink = styled(Link)`
   color: #666;
   font-weight: 600;
   &:hover {
      text-decoration: underline;
   }
`;
