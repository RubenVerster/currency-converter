import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

interface IdataUnit {
  date: string;
  rates: {
    currencyKey: string | object;
  };
}

/**
 * This component manages the returning the UI for the exchange rates from Euro for the past 7 days
 * */
const HistoricalData = () => {
  const { REACT_APP_ACCESS_KEY } = process.env;
  /**
   * This is a React hook that is used to store the data for the data related to the exchange rates for the past 7 days
   */
  const [historicalData, setHistoricalData] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState<string>(
    'Loading historical exchange rates...'
  );
  const [error, setError] = useState<boolean>(false);

  /**
   * This hook runs when this component first mount
   * It does an API call for each day in the past 7 days
   */
  useEffect(() => {
    dates.forEach(async (date: string) => await searchHistoricalData(date));
  }, []);

  //This stores the dates that we need for each API call
  const dates: string[] = [];

  //This loop runs 7 times and generates the array for each day we need to use in the API call
  for (let index = 0; index < 7; index++) {
    dates.push(dayjs().add(-index, 'day').format('YYYY-MM-DD'));
  }

  /**This function is used to do seperate API calls for the eschange rates of each day
   * @param date when we iterate through the dates array, this is the function that is use3d to do a single exchange rate for the day
   */
  const searchHistoricalData = async (date: string) => {
    try {
      const response = await axios.get(
        `http://api.exchangeratesapi.io/v1/${date}?access_key=777${REACT_APP_ACCESS_KEY}&symbols=USD,AUD,CAD,PLN,MXN`
      );

      //@ts-ignore
      //Fixes error date object not being able to accepted into a prevState hook
      await setHistoricalData((prevState) => [
        {
          rates: response.data.rates,
          date: response.data.date,
        },
        ...prevState,
      ]);
    } catch (error) {
      setError(true);
      setLoadingMessage('Error Loading Historical Exchange Rates');
    }
  };

  /**
   * Function used to render the UI for the past 7 days of exchange rates
   * @param historicalData the data  from exchange rates that have been saved for the past 7 days
   */
  const renderHistoricalData = (historicalData: IdataUnit[]) => {
    //this if only runs when all 7 days have been enterd into the
    if (historicalData.length > 6) {
      //this sorts thhe data by date in the historicalData array
      historicalData.sort(function (a: IdataUnit, b: IdataUnit) {
        //variable that saves the odlest date to be used in the sort method
        let youngestDate: any = new Date(a.date);
        //variable that saves the earliest date to be used in the sort method
        let eldestDate: any = new Date(b.date);
        //sorts the dates in Decending  order
        return eldestDate - youngestDate;
      });

      /**Function used to generate the UI for the list of the exchanges for the past 7 days
       * @param dataUnit single object in the in the array of exchanges for 7 days
       * each dataUnit contains the exchange rates for the day and the date
       */
      return historicalData.map((dataUnit: IdataUnit) => {
        //extracts the seperate currency keys into an array
        const unitCurrencyKeys = Object.keys(dataUnit.rates);

        //this .map is used to generate the UI for each day's exchange in a Card format
        return (
          <div key={dataUnit.date} className="text-center border-2 m-2">
            <h1 className="text-lg font-bold">{dataUnit.date}</h1>
            {/* nested .map to generete the text for each day's currency exchanges */}
            {unitCurrencyKeys.map((currencyKey: string | object) => {
              return (
                <p key={`${currencyKey}`}>
                  {/* here we return the currency and it's rate for the day to two decimal places*/}
                  {/* error fixed used for key in Interface */}
                  {/* @ts-ignore */}
                  {currencyKey} {dataUnit.rates[currencyKey].toFixed(2)}
                </p>
              );
            })}
          </div>
        );
      });
    } else {
      //if the exchange rates for the week have not been loaded yet, we return a UI that says the data is being loaded
      //could be replaced with a spinner instead, like a MoonLoader
      return (
        <div
          className={`${
            error && `text-red-700 font-bold`
          } w-6/12 py-3 mx-auto text-center`}
        >
          {loadingMessage}
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-sm border-2 border-blue-300 pt-2 m-6  md:w-3/12">
      <h2 className="text-center text-xl mt-0 font-bold">
        7d Exchange Rate (€)
      </h2>
      <div className="history">{renderHistoricalData(historicalData)}</div>
    </div>
  );
};

export default HistoricalData;
