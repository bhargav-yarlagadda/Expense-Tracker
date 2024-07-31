import { useState } from "react";

interface AddtransactionProps {
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Addtransaction = ({ total, setTotal, toggle }: AddtransactionProps) => {
    const [amount, setAmount] = useState<number>(0);
    const [desc, setDesc] = useState<string>("");
    const [type, setType] = useState<string>("expense");

    const addTransaction_ = (e: React.FormEvent) => {
        e.preventDefault();
        const newTotal = type === "expense" ? total - amount : total + amount;
        setTotal(newTotal);
        toggle((prev) => !prev);
    };

    return (
        <div className="mt-2 p-2 w-[200px] sm:w-full overflow-contain sm:overflow-auto border rounded-lg">
            <form className="flex gap-2 flex-col" onSubmit={addTransaction_}>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-24">
                    <div className="flex gap-2">
                        <input
                            checked={type === "expense"}
                            type="radio"
                            onClick={() => { setType("expense") }}
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
                            onClick={() => { setType("income") }}
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
                        onChange={(e) => { setDesc(e.target.value) }}
                        type="text"
                        className="mt-1 block w-full p-1 border rounded-md"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        value={amount}
                        onChange={(e) => { setAmount(Number(e.target.value)) }}
                        type="number"
                        className="mt-1 block w-full p-1 border rounded-md"
                    />
                </div>
                <button type="submit" className="mt-2 w-full bg-green-900 text-white p-1 rounded-md">Add Transaction</button>
            </form>
        </div>
    );
}

const Overview = () => {
    const [isAdd, setIsAdd] = useState<boolean>(false);
    const [totalAmount, setTotalAmount] = useState<number>(0); 

    const handleClick = () => {
        setIsAdd(!isAdd);
    };

    return (
        <div className="flex flex-col w-auto md:w-[360px] m-1">
            <div className="flex flex-col items-center justify-between p-2 sm:flex-row">
                <span className="pt-[0.6px] font-bold">Balance: {totalAmount} Rs.</span>
                <button
                    className="border rounded-md bg-green-600 w-[70px] text-wrap py-1 cursor-pointer text-sm text-white"
                    onClick={handleClick}
                >
                    {isAdd ? "CANCEL" : "ADD"}
                </button>
            </div>
            {isAdd && <Addtransaction total={totalAmount} setTotal={setTotalAmount} toggle={setIsAdd} />}
        </div>
    );
}

export default Overview;
