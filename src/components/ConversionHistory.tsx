const ConversionHistory = ({ historyItems }: any) => {
  const renderHistoryList = (historyItems: any) => {
    if (historyItems.length < 1) {
      return (
        <div className="pt-2 flex items-center content-center">
          <p className="text-gray-400 text-center p-6 h-full">
            All your previous conversions will be saved here
          </p>
        </div>
      );
    } else {
      return (
        <div className="text-center my-3">
          {historyItems.map((item: any) => {
            return (
              <p key={item}>
                {item.amount}
                <span className="font-bold px-1">{item.from}</span>
                <span className="pr-1">=</span>
                {item.converted}
                <span className="font-bold px-1">{item.to}</span>
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
