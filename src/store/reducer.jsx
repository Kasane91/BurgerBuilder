import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const Reducer = (state = initialState, action) => {
  if (action.type === "TEST") {
    console.log(action.value);
    return state;
  }

  if (action.type === actionTypes.ADD_INGREDIENT) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      },
    };
  }
  if (action.type === actionTypes.REMOVE_INGREDIENT) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      },
    };
  }

  return state;
};

export default Reducer;
