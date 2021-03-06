import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 1,
  meat: 1.5,
  cheese: 0.75,
};

const Reducer = (state = initialState, action) => {
  if (action.type === actionTypes.ADD_INGREDIENT) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      },
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      building: true,
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
  if (action.type === actionTypes.SET_ERROR) {
    return { ...state, error: true };
  }

  if (action.type === actionTypes.SET_INGREDIENTS) {
    return {
      ...state,
      ingredients: action.ingredients,
      error: false,
      totalPrice: 4,
      building: false,
    };
  }

  return state;
};

export default Reducer;

// const addIngredientHandler = (type) => {
//   const oldValue = burger.ingredients[type];
//   const newValue = oldValue + 1;
//   const updatedIngredients = { ...burger };
//   updatedIngredients.ingredients[type] = newValue;
//   setBurger(updatedIngredients);

//   setTotalPrice((prevValue) => {
//     return prevValue + INGREDIENT_PRICES[type];
//   });

//   updatePurchaseStatus(updatedIngredients.ingredients);
// };

// const removeIngredientHandler = (type) => {
//   const oldValue = burger.ingredients[type];
//   if (oldValue >= 1) {
//     const newValue = oldValue - 1;
//     const updatedIngredients = { ...burger };
//     updatedIngredients.ingredients[type] = newValue;
//     setBurger(updatedIngredients);

//     setTotalPrice((prevValue) => {
//       return prevValue - INGREDIENT_PRICES[type];
//     });
//     updatePurchaseStatus(updatedIngredients.ingredients);
//   }
// };
