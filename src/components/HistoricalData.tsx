import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

const HistoricalData = () => {
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    dates.forEach(async (date: string) => await searchHistoricalData(date));
  }, []);

  const dates: string[] = [];

  for (let index = 0; index < 7; index++) {
    dates.push(dayjs().add(-index, 'day').format('YYYY-MM-DD'));
  }

  const searchHistoricalData = async (date: string) => {
    const response = await axios.get(
      `http://api.exchangeratesapi.io/v1/${date}?access_key=d3b5401b496524bf3dc6143b8cc358b9&symbols=USD,AUD,CAD,PLN,MXN`
    );

    //@ts-ignore
    await setHistoricalData((prevState) => [
      {
        rates: response.data.rates,
        date: response.data.date,
      },
      ...prevState,
    ]);
  };

  const renderHistoricalData = (historicalData: any) => {
    if (historicalData.length > 6) {
      const sortedData = historicalData.sort(function (a: any, b: any) {
        //@ts-expect-error date type error
        return new Date(a.date) - new Date(b.date);
      });

      return historicalData.map((dataUnit: any) => {
        const unitCurrencyKeys = Object.keys(dataUnit.rates);

        return (
          <div className="text-center border-2 m-2">
            <h1 className="text-lg font-bold">{dataUnit.date}</h1>
            {unitCurrencyKeys.map((currencyKey: any) => {
              return (
                <p>
                  {currencyKey} {dataUnit.rates[currencyKey].toFixed(2)}
                </p>
              );
            })}
          </div>
        );
      });
    } else {
      return (
        <div className="text-center">Loading historical exchange rates...</div>
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
