import { createContext, useState } from 'react';

declare interface IContextState {
  currencyList: any;
  setCurrencyList: any;
  selectedFromCurrencyConversion: any;
  setSelectedFromCurrencyConversion: any;
  selectedToCurrencyConversion: any;
  setSelectedToCurrencyConversion: any;
  searchHistory: any;
  setSearchHistory: any;
}

declare interface ISelectedMovie {
  title: string | null;
  id: number | null;
  director: string | null;
  releaseDate: string | null;
}

export const CurrencyContext = createContext<IContextState | null>(
  {} as IContextState
);

export const CurrencyProvider = ({ children }: any) => {
  const [currencyList, setCurrencyList] = useState({});
  const [selectedFromCurrencyConversion, setSelectedFromCurrencyConversion] =
    useState<ISelectedMovie[]>([]);
  const [selectedToCurrencyConversion, setSelectedToCurrencyConversion] =
    useState<ISelectedMovie[]>([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const value: any = [
    currencyList,
    setCurrencyList,
    selectedFromCurrencyConversion,
    setSelectedFromCurrencyConversion,
    selectedToCurrencyConversion,
    setSelectedToCurrencyConversion,
    searchHistory,
    setSearchHistory,
  ];

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
