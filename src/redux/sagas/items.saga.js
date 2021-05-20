import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getItems() {
    try{
        const items = yield axios.get('/api/shelf');
        console.log('Get all items:', items.data);
        yield put({type: 'SET_SHELF', payload: items.data})
    } catch (error) {
        console.log('Error getting items for shelf.', error);
    }
}

function* itemsSaga() {
    yield takeLatest('GET_SHELF', getItems);
}

export default itemsSaga;