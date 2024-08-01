interface TransactionProps {
  transactionValue: { id:any,amount: number; desc: string; type: string }[];
}

const Transaction = ({ transactionValue }: TransactionProps) => {
  return (
    <div className="flex flex-col min-w-[200px] p-6 items-center m-4">
      {transactionValue.length === 0 ? (
        <p>No transactions available</p>
      ) : (
        <div className="flex flex-col gap-3" >
          <span className="mx-auto font-serif font-medium" > Transactions</span>
          {transactionValue.map((transaction, index) => (
            <div  key={index} className="border gap-3 text-sm rounded-xl flex p-2 w-full">
              <div>Desc: {transaction.desc? transaction.desc:"N/A"}</div>
              <div>Amount: {transaction.amount} Rs</div>
              <div>Type: {transaction.type}</div>
              
            </div>
          ))}
        </div>
      )}
    </div>  
  );
};

export default Transaction;
