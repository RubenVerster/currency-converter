import './css/main.css';
import axios from 'axios';
import Header from './components/Header';
import Converter from './components/Converter';
import { useState, useEffect } from 'react';
import ConversionHistory from './components/ConversionHistory';
import HistoricalData from './components/HistoricalData';

const ACCESS_KEY = 'd3b5401b496524bf3dc6143b8cc358b9';
//the base url for the API call
const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${ACCESS_KEY}`;

/**
 *Component that nests all other components and passes the relative API data to child components
 */
const App = () => {
  //function that fetches the conversion rates data from the API
  const retrieveCurrencies = async () => {
    //here we try to do the API call
    try {
      const response = await axios.get(BASE_URL);
      const currencies = await Object.keys(response.data.rates);
      if (currencies.length > 1) {
        await setCurrencyListOptions(currencies);
        await setExchangeRates(response.data.rates);
      }
      //if the call fails, we display an error message
    } catch (error) {
      alert(
        'Error Retrieving Data From API. Might be that I used all my requests for the month... fuck...'
      );
    }
  };

  //state hook that stores the exchange rates results from the API call
  const [exchangeRates, setExchangeRates] = useState<[]>([]);
  //state hook that stores the different currency names for the select dropdown
  const [currencyListOptions, setCurrencyListOptions] = useState<string[]>([]);
  //state hook that manages the history of the user's currency conversions
  const [conversionHistory, setConversionHistory] = useState([]);

  //when this component mounts, we call the function to retrieve the exchange rates
  useEffect(() => {
    retrieveCurrencies();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto justify-center flex flex-col md:flex-row">
        <Converter
          //TS error fix used because I don't know how to type the key of an object yet...
          //@ts-ignore
          rates={exchangeRates}
          options={currencyListOptions}
          setHistory={setConversionHistory}
        />
        <ConversionHistory historyItems={conversionHistory} />
        <HistoricalData />
      </div>
    </>
  );
};

export default App;
