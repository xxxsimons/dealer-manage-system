import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import { async } from './actions';

const { fetchOrders } = async;
// const dealerId = 'dealer01';
function* doFetchOrders(action) {
  try {
    const { data } = yield call(request.get, `/orders/undone/${action.payload.dealerId}`);
    yield put(fetchOrders.success({ orders: data }));
  } catch (err) {
    yield put(fetchOrders.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchOrders.TYPE, doFetchOrders);
}
