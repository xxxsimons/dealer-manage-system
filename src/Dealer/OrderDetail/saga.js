import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'request';
import axios from 'axios';
import qs from 'qs';
import async from './actions';
import { Modal } from 'antd';

const { info } = Modal;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const { fetchOrderDetail, updateDetailOrderStatus } = async;

function* doFetchOrderDetail(action) {
  try {
    const { data } = yield call(request.get, `/orders/${action.payload.id}`);
    // if (data.expressNumber) {
    //   const { data: expressData } = yield call(axios,
    //       {
    //         method: 'post',
    //         url: 'http://api.shujuzhihui.cn/api/sjzhApi/searchExpress',
    //         data: qs.stringify({
    //           appKey: '1b4e55f6371b4e92adbaaf154bf17f0c',
    //           expressNo: data.expressNumber,
    //         }),
    //         headers: {
    //           'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //       },
    //     );
    //   yield put(fetchOrderDetail.success({ order: data, express: expressData }));
    // } else yield put(fetchOrderDetail.success({ order: data }));
    // delete next line
    yield put(fetchOrderDetail.success({ order: data }));
  } catch (err) {
    yield put(fetchOrderDetail.failure(err));
  }
}

function* doUpdateOrderStatus(action) {
  try {
    const { data } = yield call(request, {
      method: 'patch',
      url: `/orders/${action.payload.id}`,
      data: { status: action.payload.status },
    });
    yield put(updateDetailOrderStatus.success({ isSuccess: data.msg }));
    info({
      title: data.msg,
    });
  } catch (err) {
    yield put(updateDetailOrderStatus.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchOrderDetail.TYPE, doFetchOrderDetail);
  yield takeEvery(updateDetailOrderStatus.TYPE, doUpdateOrderStatus);
}
