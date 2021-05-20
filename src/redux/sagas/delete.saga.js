import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* deleteItem(action) {
    try{
        console.log('action payload', action.payload);
        
        yield axios.delete(`/api/shelf/${action.payload}`);
        yield put({ type: 'GET_SHELF'});
    } catch (error) {
        console.log('error in Delete', error);
    }
}

function* deleteSaga() {
    yield takeLatest('DELETE_ITEM', deleteItem);
  }

export default deleteSaga;