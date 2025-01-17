// selectors are where the data is transformed into the final shape we want
// this is where the logic should live

import { createSelector } from 'reselect';

const selectCategoriesReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer], // input
  (categoriesSlice) => categoriesSlice.categories // output
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => 
    categories.reduce((acc, category) => {
      const { title, items } = category;
      // acc = accumulator
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
