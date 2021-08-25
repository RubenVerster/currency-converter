import { useState } from 'react';
import { BsArrowUpDown } from 'react-icons/bs';

const Converter = ({ options, setHistory, rates }: any) => {
  const [selectedFromCurrencyConversion, setSelectedFromCurrencyConversion] =
    useState('EUR');
  const [selectedToCurrencyConversion, setSelectedToCurrencyConversion] =
    useState('USD');
  const [convertAmount, setConvertAmount] = useState<any>(1);

  const handleInputChange = (e: any) => {
    setConvertAmount(e.target.value);
  };
  const handleFromChange = (e: any) => {
    setSelectedFromCurrencyConversion(e.target.value);
  };
  const handleToChange = (e: any) => {
    setSelectedToCurrencyConversion(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    calculateConversion();
  };

  const handleSwop = () => {
    let temp_storage = selectedToCurrencyConversion;
    setSelectedToCurrencyConversion(selectedFromCurrencyConversion);
    setSelectedFromCurrencyConversion(temp_storage);
  };

  const calculateConversion = () => {
    let exchangeFrom = rates[selectedFromCurrencyConversion];
    let exchangeTo = rates[selectedToCurrencyConversion];
    let converted = ((exchangeTo / exchangeFrom) * convertAmount).toFixed(2);

    setHistory((prevState: any) => [
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
