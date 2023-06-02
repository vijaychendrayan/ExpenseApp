import axios from "axios";

BACKEND_URL = 'https://expensetracker-a454b-default-rtdb.asia-southeast1.firebasedatabase.app'

export async function storeExpense(expenseData){
    const response = await axios.post(BACKEND_URL+'/expenses.json', expenseData);
    const id  = response.data.name;
    return id;
}

export  async function fetchExpenses(){
    console.log('Fetching data.... start');
    const response = await axios.get(BACKEND_URL + '/expenses.json')
                            .catch(error => console.log(error));
   
    
    const expenses = []
    for ( const key in response.data){
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        expenses.push(expenseObj);
    }
    console.log('Fetching data.... end');
   return expenses;

}

export  function updateExpense(id, expenseData){
    return axios.put(BACKEND_URL+ `/expenses/${id}.json`, expenseData)
}

export  function deleteExpense(id){
    return axios.delete(BACKEND_URL+ `/expenses/${id}.json`)
    
}

