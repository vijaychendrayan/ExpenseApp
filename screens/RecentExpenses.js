import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import {ExpensesContext} from '../store/expenses-context'
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpenses(){
    // const expensesCtx = useContext(ExpensesContext);
    const [fetchedExpenses, setFetchedExpenses] = useState([]);
    useEffect(()=> {
        async function getExpenses(){
            const expenses= await fetchExpenses();
            setFetchedExpenses(expenses);
        }
        getExpenses();
    },[])
    const recentExpenses = fetchedExpenses.filter((expense)=> {
        const today = new Date()
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
    })
    return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText={"No expenses found"}/>

}

export default RecentExpenses;