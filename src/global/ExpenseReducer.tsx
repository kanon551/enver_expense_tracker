import { createSlice } from '@reduxjs/toolkit';

const InitialExpenses = [
  {
    id: 1,
    amount: -200,
    description: "Movie",
    date: '2022-04-17',
    category: 'Fun',
  },
  {
    id: 2,
    amount: -50,
    description: "Milk",
    date: '2022-04-18',
    category: 'Groceries',
  },
  {
    id: 3,
    amount: -1000,
    description: "Rent payment",
    date: '2022-04-19',
    category: 'Rent',
  },
  {
    id: 4,
    amount: 5000,
    description: "Salary",
    date: '2022-04-20',
    category: 'Salary',
  },
  {
    id: 5,
    amount: -30,
    description: "Snacks",
    date: '2022-04-21',
    category: 'Groceries',
  },
  {
    id: 6,
    amount: -150,
    description: "Concert tickets",
    date: '2022-04-22',
    category: 'Fun',
  },
  {
    id: 7,
    amount: -800,
    description: "Monthly rent",
    date: '2022-04-23',
    category: 'Rent',
  },
  {
    id: 8,
    amount: 4000,
    description: "Bonus",
    date: '2022-04-24',
    category: 'Salary',
  },
  {
    id: 9,
    amount: -70,
    description: "Cooking Items",
    date: '2022-04-25',
    category: 'Groceries',
  },
  {
    id: 10,
    amount: -80,
    description: "Fun activity",
    date: '2022-04-26',
    category: 'Fun',
  },
];

export interface ExpenseProperty {
  id: number;
  amount: number;
  description: string;
  date: string;
  category: "Salary" | "Groceries" | "Fun" | "Rent";
  image?: string;
}



const ExpenseSlice = createSlice({
  name: "Expenses Tracker",
  initialState: InitialExpenses,
  reducers: {
    addExpense: (state, action) => {
      state.push({
        amount: action.payload.amount,
        description: action.payload.description,
        date: action.payload.date,
        category: action.payload.category,
        id: action.payload.id,
      });
    },
    updateExpense: (state, action) => {
      const { id, amount, description, date, category } = action.payload;
      const updateExp = state.find((exp) => exp.id == id);
      if (updateExp) {
        updateExp.amount = amount;
        updateExp.description = description;
        updateExp.date = date;
        updateExp.category = category;
      }
    },
    deleteExpense: (state, action) => {
      const { id } = action.payload;
      const deleteExp = state.find((exp) => exp.id == id);
      if (deleteExp) {
        return state.filter(obj => obj.id !== id);
      }
    }
  },
});

export const { addExpense, updateExpense, deleteExpense } = ExpenseSlice.actions;
export default ExpenseSlice.reducer;