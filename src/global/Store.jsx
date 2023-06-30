import { configureStore } from '@reduxjs/toolkit';
import ExpenseReducer from './ExpenseReducer';

export default configureStore({
    reducer: {
        expenses: ExpenseReducer,
    },
});