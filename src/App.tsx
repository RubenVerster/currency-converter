import './css/main.css';
import axios from 'axios';
import Header from './components/Header';
import Converter from './components/Converter';
import { useState, useEffect } from 'react';
import ConversionHistory from './components/ConversionHistory';
import HistoricalData from './components/HistoricalData';

const BASE_URL =
  'http://api.exchangeratesapi.io/v1/latest?access_key=d3b5401b496524bf3dc6143b8cc358b9';

const App = () => {
  const retrieveCurrencies = async () => {
    try {
      const response = await axios.get(BASE_URL);
      const currencies = await Object.keys(response.data.rates);
      if (currencies.length > 1) {
        await setCurrencyListOptions(currencies);
        await setExchangeRates(response.data.rates);
      }
    } catch (error) {
      alert(
        'Error Retrieving Data From API. Might be that I used all my requests for the month... fuck...'
      );
    }
  };

  const [exchangeRates, setExchangeRates] = useState([]);
  const [currencyListOptions, setCurrencyListOptions] = useState<any>([]);
  const [conversionHistory, setConversionHistory] = useState([]);

  useEffect(() => {
    retrieveCurrencies();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto justify-center flex flex-col md:flex-row">
        <Converter
          rates={exchangeRates}
          options={currencyListOptions}
          setHistory={setConversionHistory}
        />

        <HistoricalData />

        <ConversionHistory historyItems={conversionHistory} />
      </div>
    </>
  );
};

export default App;
