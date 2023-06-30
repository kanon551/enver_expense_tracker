import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExpenseProperty, deleteExpense } from '../global/ExpenseReducer';
import ExpenseCard from './ExpenseCard';


interface ExpensesListProps {
    onEditClick: (index: number, expenseObj: ExpenseProperty) => void;
    keyword: any;
    categoryFilter: any
}

const ExpensesList = ({ onEditClick, keyword, categoryFilter }: ExpensesListProps) => {

    const dispatch = useDispatch();
    const allExpenses = useSelector((state: any) => state.expenses);

    const deleteOnClick = (id: number) => {
        dispatch(deleteExpense({ id: id }))
    }

    const filteredArray = allExpenses.filter((item: ExpenseProperty) => {
        if (keyword && keyword.trim() !== '') {
            const isMatchedKeyword = item.description.toLowerCase().includes(keyword.toLowerCase());
            if (!isMatchedKeyword) {
                return false;
            }
        }

        if (categoryFilter.length > 0) {
            const isMatchedCategory = categoryFilter.includes(item.category);
            if (!isMatchedCategory) {
                return false;
            }
        }

        return true;
    });


    return (
        <div>
            {
                filteredArray.length === 0 && "Search Matches Not Found"

            }
            {
                filteredArray.length !== 0 && filteredArray.map((expenseObj: ExpenseProperty, index: number) => (
                    <div key={expenseObj.id}>
                        <ExpenseCard object={expenseObj}
                            editExpense={() => onEditClick(index, expenseObj)}
                            deleteExpense={() => deleteOnClick(expenseObj.id)} />
                    </div>
                ))
            }
        </div>
    )
}

export default ExpensesList
