import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2023-01-01')
    },
    {
        id: 'e2',
        description: 'A pair of Socks',
        amount: 9.99,
        date: new Date('2023-01-02')
    },
    {
        id: 'e3',
        description: 'A pair of Shirts',
        amount: 159.99,
        date: new Date('2023-01-03')
    },
    {
        id: 'e4',
        description: 'A pair of spoon',
        amount: 5.99,
        date: new Date('2023-01-04')
    },
    {
        id: 'e5',
        description: 'A pair of plate',
        amount: 25.99,
        date: new Date('2023-01-05')
    },
    {
        id: 'e6',
        description: 'A pair of plate',
        amount: 25.99,
        date: new Date('2023-05-12')
    },
]


export const ExpensesContext = createContext({
    expenses: [ ],
    addExpense: ({description, amout, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amout, date}) => {},
});

function expensesReducer(state, action){
    switch(action.type){
        case 'ADD': 
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id},...state]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense)=> expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex]
            const updatedItem = {...updatableExpense, ...action.payload.data}
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            // console.log(state)
            // console.log('expense-context.js : Expense Reducer -> DELETE -> action.payload.id : ', action.payload)
            // return state.filter((expense) => expense.id !== action.payload.id)
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;
    }
}

function ExpensesContextProvider({children}){
    const [expensesState, dispatch]=useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData})

    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id})
    }

    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload:{id: id, data: expenseData}})
    }

    const value={
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    }
    return (
        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;