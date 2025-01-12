// selectors are where the data is transformed into the final shape we want
// this is where the logic should live

export const selectCategoriesMap = (state) => {
  console.log('selecting categories and transforming into map');
  return state.categories.categories.reduce((acc, category) => {
    // acc = accumulator
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
};
