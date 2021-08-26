import { ReactEventHandler, useState } from 'react';
import { BsArrowUpDown } from 'react-icons/bs';

type IRates = {
  //error fix used to ignore the object key type (don't know that much TS)
  //@ts-ignore
  [x: string | number]: number;
};

interface IConverterProps {
  options: string[];
  setHistory: any;
  rates: {
    currency: IRates[];
  };
}

/**
 * Component used to display the UI for the component that manages currency conversions
 * @param options props received from App.tsx that provides the individual currency symbols for the dropdown list
 * @param setHistory hook from App.tsx that allows you to update the search history of currency exchanges from the user
 *
 * @param rates object from App.tsx that provides the currency key and the exchange rate for that currency
 */
const Converter = ({ options, setHistory, rates }: IConverterProps) => {
  //state hook used to save the currency that the user want to convert from
  const [selectedFromCurrencyConversion, setSelectedFromCurrencyConversion] =
    useState<string>('EUR');
  //state hook used to save the currency that the user want to convert to
  const [selectedToCurrencyConversion, setSelectedToCurrencyConversion] =
    useState<string>('USD');
  //state hook used to manage the number that a user wants to convert from
  const [convertAmount, setConvertAmount] = useState<number | string | any>(1);

  //function that is used to set the number amount that the user wants to convert
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let RegEx = /^(\+)|[^\d\n]/;
    const cleanedInput = e.currentTarget.value.replace(RegEx, '');

    setConvertAmount(cleanedInput);
  };
  //function that is used to set the currency that a user wants to convert from
  const handleFromChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedFromCurrencyConversion(e.currentTarget.value);
  };
  //function that is used to set the currency that a user wants to convert to
  const handleToChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedToCurrencyConversion(e.currentTarget.value);
  };

  //function used to handle the logic when a user submits the form by clicking the Calculate button
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateConversion();
  };

  //function that switches the convert from and to currencies
  const handleSwop = () => {
    //temporily stores one of the currencies
    let temp_storage = selectedToCurrencyConversion;
    //sets the To convert currency with the From currency
    setSelectedToCurrencyConversion(selectedFromCurrencyConversion);
    //sets the From currency one with the temporary To currency we saved
    setSelectedFromCurrencyConversion(temp_storage);
  };

  const calculateConversion = () => {
    // error fixes used to fix the key value of the exchange rate per currency
    //@ts-ignore
    let exchangeFrom = rates[selectedFromCurrencyConversion];
    //@ts-ignore
    let exchangeTo = rates[selectedToCurrencyConversion];
    let converted = ((exchangeTo / exchangeFrom) * convertAmount).toFixed(2);

    //hook that updates the details of the user's currency convertion to the state hook that stores the user currency conversion history
    //adds the latest conversion to the front of the conversion history array and spreads the previous state after it
    //error fix used because this is currently out of my scope in TS...
    //@ts-ignore
    setHistory((prevState) => [
      {
        from: selectedFromCurrencyConversion,
        amount: convertAmount,
        to: selectedToCurrencyConversion,
        converted: converted,
      },
      ...prevState,
    ]);
  };

  return (
    <div className="md:w-6/12 w-full ">
      <form
        className="flex flex-col border-2 border-blue-300 bg-white m-6 p-4 rounded-sm"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <label
            htmlFor="from"
            className="block text-sm font-medium text-gray-700"
          >
            Convert From
          </label>
          <div className="mt-1 relative rounded-md shadow-sm border-2">
            <input
              type="text"
              name="from"
              id="from"
              className="h-12 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder={convertAmount}
              value={convertAmount}
              onChange={(e) => handleInputChange(e)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="currencyFrom" className="sr-only">
                Currency
              </label>
              <select
                id="currencyFrom"
                name="currencyFrom"
                onChange={(e) => handleFromChange(e)}
                value={selectedFromCurrencyConversion}
                className="h-full py-0 pl-2 pr-7 w-32 border-l-2 bg-transparent text-gray-500 sm:text-sm rounded-r-md"
              >
                {options.map((option: string) => {
                  return (
                    <option key={option} className="text-sm">
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-4 relative rounded-md shadow-sm">
            <label
              htmlFor="from"
              className="block text-sm font-medium text-gray-700"
            >
              Convert To
            </label>
            <div className="flex justify-between items-center border-2 bg-white rounded-md w-full">
              <select
                id="currencyTo"
                name="currencyTo"
                onChange={(e) => handleToChange(e)}
                className="w-full h-12 py-2 pl-2 pr-7 border-transparent  text-gray-500 sm:text-sm rounded-md"
                value={selectedToCurrencyConversion}
              >
                {options.map((option: string) => {
                  return <option key={option}>{option}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between h-18">
          <button
            className="mt-4 hover:bg-blue-700 bg-gray-700 rounded-md p-3 text-white w-8/12"
            type="submit"
          >
            Calculate
          </button>
          <button
            className="mt-4 w-4/12 ml-2 p-3 bg-white border-2 rounded-md flex justify-center md:justify-between  items-center text-center text-gray-700 hover:bg-gray-700 hover:text-white"
            onClick={() => handleSwop()}
          >
            <span className="hidden md:block text-md ">Swop Currencies</span>
            <div className="text-2xl">
              <BsArrowUpDown />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Converter;
