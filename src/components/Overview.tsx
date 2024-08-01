import { useState } from "react";

interface AddTransactionProps {
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  addTransactionValue: (payload: any) => void;
}

const AddTransaction = ({ total, setTotal, toggle, addTransactionValue }: AddTransactionProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [desc, setDesc] = useState<string>("");
  const [type, setType] = useState<string>("expense");

  const addTransaction_ = (e: React.FormEvent) => {
    e.preventDefault();
    const newTotal = type === "expense" ? total - amount : total + amount;
    setTotal(newTotal);
    toggle((prev) => !prev);
    addTransactionValue({ id: Date.now(), amount, desc, type });
  };

  return (
    <div className="mt-2 p-2 w-[200px] sm:w-full overflow-contain sm:overflow-auto border rounded-lg">
      <form className="flex gap-2 flex-col" onSubmit={addTransaction_}>
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-24">
          <div className="flex gap-2">
            <input
              checked={type === "expense"}
              type="radio"
              onClick={() => { setType("expense"); }}
              name="inp"
              id="expense"
              value="expense"
            />
            <label htmlFor="expense">Expense</label>
          </div>
          <div className="flex gap-2">
            <input
              checked={type === "income"}
              type="radio"
              onClick={() => { setType("income"); }}
              name="inp"
              id="income"
              value="income"
            />
            <label htmlFor="income">Income</label>
          </div>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            value={desc}
            onChange={(e) => { setDesc(e.target.value); }}
            type="text"
            className="mt-1 block w-full p-1 border rounded-md"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            value={amount}
            onChange={(e) => { setAmount(Number(e.target.value)); }}
            type="number"
            className="mt-1 block w-full p-1 border rounded-md"
          />
        </div>
        <button type="submit" className="mt-2 w-full bg-green-900 text-white p-1 rounded-md">Add Transaction</button>
      </form>
    </div>
  );
};

const Overview = ({ addTransactionValue }: { addTransactionValue: (payload: any) => void }) => {
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  const handleClick = () => {
    setIsAdd(!isAdd);
  };

  const updateTotals = (transaction: { amount: number; type: string }) => {
    if (transaction.type === "expense") {
      setTotalExpense((prev) => prev + transaction.amount);
      setTotalIncome((prev) => Math.max(prev - transaction.amount, 0));
    } else {
      setTotalIncome((prev) => prev + transaction.amount);
      setTotalExpense((prev) => Math.max(prev - transaction.amount, 0));
    }
  };

  return (
    <div className="flex flex-col w-[200px] md:w-[360px] m-1">
      <div className="flex flex-col items-center justify-between p-2 sm:flex-row">
        <span className="pt-[0.6px] font-bold">Balance: {totalAmount} Rs.</span>
        <button
          className="border rounded-md bg-green-600 w-[70px] text-wrap py-1 cursor-pointer text-sm text-white"
          onClick={handleClick}
        >
          {isAdd ? "CANCEL" : "ADD"}
        </button>
      </div>
      {isAdd && <AddTransaction total={totalAmount} setTotal={setTotalAmount} toggle={setIsAdd} addTransactionValue={(transaction) => { addTransactionValue(transaction); updateTotals(transaction); }} />}
      <div className="flex flex-col justify-center">
        <h2 className="font-lg text-center font-serif text-2xl">Status</h2>
        <div className="flex gap-2 md:justify-between">
          <div className="w-[80px] bg-red-400 md:w-[140px] md:h-[140px] text-center rounded-md border-emerald-800 border-2 h-[80px]">
            Expense <br /> {totalExpense} Rs.
          </div>
          <div className="w-[80px] bg-blue-400 md:w-[140px] md:h-[140px] rounded-md text-center border-emerald-800 border-2 h-[80px]">
            Income <br /> {totalIncome} Rs.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
