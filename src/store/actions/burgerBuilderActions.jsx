import * as actionTypes from "../actions/actionTypes";
import axios from "../../axious-orders";

export const addIngredient = (ingredient) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingredient,
  };
};

export const removeIngredient = (ingredient) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredient,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const initIngredients = () => {
  return {
    type: actionTypes.FETCH_INITIAL_INGREDIENTS,
  };
};

export const fetchedIngredientsFailed = () => {
  return {
    type: actionTypes.SET_ERROR,
  };
};
