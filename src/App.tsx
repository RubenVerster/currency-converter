import './css/main.css';
import axios from 'axios';
import Header from './components/Header';
import Converter from './components/Converter';
import { useState, useEffect } from 'react';
import ConversionHistory from './components/ConversionHistory';
import HistoricalData from './components/HistoricalData';

require('dotenv').config();
const { REACT_APP_ACCESS_KEY } = process.env;
console.log(process.env);
//the base url for the API call
const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${REACT_APP_ACCESS_KEY}`;
console.log(BASE_URL);

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
        'Error Retrieving Data From API, please check your Internet connection. Might also be that my API call limit has been reached for the month... fuck... Please refer to the README.md file realted to this repo for the fix :)'
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
