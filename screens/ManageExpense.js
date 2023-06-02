import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({route, navigation}){
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState();
    const expensesCtx = useContext(ExpensesContext)
    const editedExpenseID = route.params?.expenseId;
    const isEditing = !!editedExpenseID;
    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseID)

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    },[navigation, isEditing]);

    async function deleteExpenseHandler(){
        // console.log('ManageExpenses.js : editedExpenseID : ',editedExpenseID)
        setIsSubmitting(true)
        try{
            await deleteExpense(editedExpenseID)
            expensesCtx.deleteExpense(editedExpenseID)
            navigation.goBack();
        }catch(error){
            setError('Could not delete expense - pls try again later!')
            setIsSubmitting(false)
        }

    }

    function cancelHandler(){
        navigation.goBack();

    }
     
    async function confirmHandler(expenseData){
        setIsSubmitting(true);
        try{

            if(isEditing){
                expensesCtx.updateExpense(editedExpenseID,expenseData);
                await updateExpense(editedExpenseID,expenseData);
            }else{
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({...expenseData, id: id});
            }
            navigation.goBack();
        }catch(error){
            setError('Could not save expense - pls try again later!')
            setIsSubmitting(false)

        }
    }

    function errorHandler(){
        setError(null)
    }

    if( error && !isSubmitting){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }
    if (isSubmitting){

        return <LoadingOverlay />
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