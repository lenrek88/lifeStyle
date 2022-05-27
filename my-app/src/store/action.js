import {ACTION_CHANGE_AVAILABILITY_FOOD} from "../index";
import {ACTION_CLEAR_AVAILABILITY_FOOD} from "../index";
import {ACTION_CLEAR_FOOD_ITEM} from "../index";

let nextItemId = 0;

nextItemId = JSON.parse(localStorage.getItem('nextItemId'))

localStorage.setItem('nextItemId', JSON.stringify(nextItemId))


export const changeAvailabilityFood = (payload) => { return {type: ACTION_CHANGE_AVAILABILITY_FOOD, id: nextItemId++, payload} }
export const clearAvailabilityFood = (payload) => { return {type: ACTION_CLEAR_AVAILABILITY_FOOD} }
export const clearAvailabilityFoodItem = (payload) => { return {type: ACTION_CLEAR_FOOD_ITEM, payload} }

