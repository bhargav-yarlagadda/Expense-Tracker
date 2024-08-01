import { useState } from "react";
import Overview from "./Overview";
import Transaction from "./Transaction";

const Content = () => {
  const [transactionValue, setTransactionValue] = useState<any[]>([]);

  const addTransactionValue = (payload: any) => {
    setTransactionValue((prevTransactions) => [payload, ...prevTransactions]);
  };

  return (
    <div className="flex flex-col items-center m-4">
      <Overview addTransactionValue={addTransactionValue} />
      <Transaction transactionValue={transactionValue} />
    </div>
  );
};

export default Content;
