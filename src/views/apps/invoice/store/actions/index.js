import axios from 'axios'

// Get data
export const getData = params => {
  return async dispatch => {
    await axios.get('/apps/invoice/invoices', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        allData: response.data.allData,
        data: response.data.invoices,
        totalPages: response.data.total,
        params
      })
    })
  }
}

// ** ADD Task
export const addCustomer = customer => {
  return (dispatch, getState) => {
    axios
      .post('/apps/todo/add-customer', { customer })
      .then(res => {
        dispatch({
          type: 'ADD_CUSTOMER',
          customer: res.data
        })
      })
      .then(dispatch(getData(getState().todo.params)))
  }
}
