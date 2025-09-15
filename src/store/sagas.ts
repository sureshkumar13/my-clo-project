import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchContentSaga(): Generator<any, void, any> {
  try {
    const response = yield call(fetch, 'https://closet-recruiting-api.azurewebsites.net/api/data');
    if (!response.ok) throw new Error('Network error');
    const data = yield response.json();
    yield put({ type: 'content/fetchSuccess', payload: data });
  } catch (error: any) {
    yield put({ type: 'content/fetchFailure', payload: error.message });
  }
}

export function* watchFetchContent() {
  yield takeLatest('content/fetchRequest', fetchContentSaga);
}

export default function* rootSaga() {
  yield watchFetchContent();
}
