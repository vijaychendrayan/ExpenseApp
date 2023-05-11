import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

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
]

function ExpensesOutput({expenses, expensesPeriod}){
    return( 
        <View style={styles.container}> 
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    )
    
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
})