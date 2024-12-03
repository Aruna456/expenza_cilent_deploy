import React from 'react';
import 'boxicons';
import { default as api } from '../store/apiSlice';

const typeColors = {
  'Expense': 'rgb(255,99,132)',
  'Savings': '#f9c74f',
  'Investment': 'rgb(54,162,235)',
};

export default function List() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();

  let Transactions;

  const handlerClick = (e) => {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    deleteTransaction({ _id: id });
  };

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    console.log("Transaction data:", data); // Debug statement
    Transactions = data.map((v, i) => (
      <Transaction key={i} category={{ ...v, color: typeColors[v.type] || '#000000' }} handler={handlerClick} />
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">History</h1>
      {Transactions}
    </div>
  );
}

function Transaction({ category, handler }) {
  if (!category) return null;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? "#32a8a8"}` }}
    >
      <button className="px-3" data-id={category._id ?? ''} onClick={handler}>
        <box-icon
          color={category.color ?? "#32a8a8"}
          size="15px"
          name="trash"
        ></box-icon>
      </button>
      <span className="block w-full">{category.name ?? ''}</span>
    </div>
  );
}
