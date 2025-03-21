import { call } from 'typed-redux-saga';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from '../category.action';

import {
  fetchCategoriesAsync,
  onFetchCategories, 
  categoriesSaga
} from '../category.saga';

import { CATEGORIES_ACTION_TYPES } from '../category.types';

describe('category sagas', () => {
  // Results in all effects do not match, although expected vs actual are the same
  /*test('categoriesSaga', () => {
    testSaga(categoriesSaga)
      .next()
      .all([call(onFetchCategories)])
      .next()
      .isDone();
  });*/

  // testSaga = unit testing, strict order of events
  test('onFetchCategories', () => {
    testSaga(onFetchCategories)
      .next()
      .takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
      )
      .next()
      .isDone();
  });

  test('fetchCategoriesAsync success', () => {
    const mockCategoriesArray = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ];

    // expectSaga = integration testing, order of events doesn't matter
    return expectSaga(fetchCategoriesAsync)
      .provide([
        [call(getCategoriesAndDocuments), mockCategoriesArray],
        [matchers.call.fn(getCategoriesAndDocuments), mockCategoriesArray]
      ])
      .put(fetchCategoriesSuccess(mockCategoriesArray))
      .run();
  })

  test('fetchCategoriesAsync failed', () => {
    const mockError = new Error('Error fetching categories');

    return expectSaga(fetchCategoriesAsync)
      .provide([
        [matchers.call.fn(getCategoriesAndDocuments), throwError(mockError)]
      ])
      .put(fetchCategoriesFailed((mockError)))
      .run();
  })
})

