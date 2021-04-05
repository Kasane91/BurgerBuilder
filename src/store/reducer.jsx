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

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 1,
  meat: 1.5,
  cheese: 0.75,
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
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    };
  }
  if (action.type === actionTypes.REMOVE_INGREDIENT) {
    const ingredientAmount = state.ingredients[action.ingredientName];
    if (ingredientAmount >= 1) {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    } else {
      return state;
    }
  }

  return state;
};

export default Reducer;
