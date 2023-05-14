import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({route, navigation}){
    const expensesCtx = useContext(ExpensesContext)
    const editedExpenseID = route.params?.expenseId;
    const isEditing = !!editedExpenseID;
    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseID)

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    },[navigation, isEditing]);

    function deleteExpenseHandler(){
        // console.log('ManageExpenses.js : editedExpenseID : ',editedExpenseID)
        expensesCtx.deleteExpense(editedExpenseID)
        navigation.goBack();

    }

    function cancelHandler(){
        navigation.goBack();

    }
     
    function confirmHandler(expenseData){
        if(isEditing){
            expensesCtx.updateExpense(editedExpenseID,expenseData);
        }else{
            expensesCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm    onCancel={cancelHandler} 
                            onSubmit={confirmHandler}
                            submitButtonLabel={isEditing ? 'Update':'Add'}
                            defaultValues={selectedExpense}
            />                     
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
                </View>
                )
            }

        </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        minWidth: 120,
        marginHorizontal:8,
    },
    deleteContainer:{
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})