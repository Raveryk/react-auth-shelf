import {put} from 'redux-saga/effects';
import axios from 'axios';

function* addItem(action){
    try {
        yield axios.post('/auth_shelf', action.payload);
        yield put({type: 'GET_SHELF'});
    } catch(error){
        console.log('Error with adding an item', error);
    }
}

export default addItem;