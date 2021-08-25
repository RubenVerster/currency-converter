interface IHistoryItem {
  amount: number;
  from: string;
  to: string;
  converted: number;
}

/**
 * component that manages rendering the UI for the user's currency conversion history
 * @param historyItems props received from App.tsx
 */
//TS error fixed used for array that contains IHistoryItem array
//@ts-ignore
const ConversionHistory = ({ historyItems }) => {
  const renderHistoryList = (historyItems: IHistoryItem[]) => {
    if (historyItems.length < 1) {
      //if the user does not have any currency conversions in his history, we display a placeholder message instead
      return (
        <div className="pt-2 flex items-center content-center">
          <p className="text-gray-400 text-center p-6 h-full">
            All your previous conversions will be saved here
          </p>
        </div>
      );
    } else {
      //if a user has a currency conversion in their history, map over the history array and generate a UI for each conversion's details
      return (
        <div className="text-center my-3">
          {historyItems.map(({ amount, from, to, converted }: IHistoryItem) => {
            return (
              <p key={Math.random()}>
                {amount}
                <span className="font-bold px-1">{from}</span>
                <span className="pr-1">=</span>
                {converted}
                <span className="font-bold px-1">{to}</span>
              </p>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className=" bg-white rounded-sm border-2 border-blue-300 py-6 pt-2 m-6  md:w-3/12">
      <h2 className="text-center text-xl mt-0 font-bold">
        Previous Conversions
      </h2>
      <div className="conversions">{renderHistoryList(historyItems)}</div>
    </div>
  );
};

export default ConversionHistory;
