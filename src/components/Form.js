import React from 'react';
import { useForm } from 'react-hook-form';
import List from './List';
import { useAddTransactionMutation } from '../store/apiSlice';

export default function Form() {
  const { register, handleSubmit, reset } = useForm();
  const [addTransaction, { isLoading, isError, error }] = useAddTransactionMutation();

  const onSubmit = async (data) => {
    console.log("Form Data:", data); // Debug statement
    if (!data) return;
    try {
      const response = await addTransaction(data).unwrap();
      console.log("API Response:", response); // Log the API response
      reset(); // Reset the entire form after successful submission
      console.log("Transaction added successfully!"); // Success message
    } catch (error) {
      console.error("Error adding transaction:", error); // Error handling
    }
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transaction</h1>
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              {...register('name', { required: true })}
              placeholder="Salary, House Rent, SIP"
              className="form-input"
            />
          </div>
          <select className="form-input" {...register('type', { required: true })}>
            <option value="">Select type</option>
            <option value="Investment">Investment</option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group">
            <input
              type="number"
              {...register('amount', { required: true })}
              placeholder="Amount"
              className="form-input"
            />
          </div>
          <div className="submit-btn">
            <button type="submit" className="border py-2 text-white bg-indigo-500 w-full">
              {isLoading ? 'Submitting...' : 'Make Transaction'}
            </button>
          </div>
        </div>
      </form>
      {isError && <p className="error">Error: {error.message}</p>}
      <List />
    </div>
  );
}
