import {ACTION_CHANGE_AVAILABILITY_FOOD, ACTION_EDIT_CELL_ITEM_END, ACTION_EDIT_CELL_ITEM_START} from "../index";
import {ACTION_CLEAR_AVAILABILITY_FOOD} from "../index";
import {ACTION_CLEAR_FOOD_ITEM} from "../index";
import {ACTION_CHANGE_CELL_ITEM} from "../index";


let nextItemId = 0;

nextItemId = JSON.parse(localStorage.getItem('nextItemId'))

localStorage.setItem('nextItemId', JSON.stringify(nextItemId))


export const changeAvailabilityFood = (payload) => {
    return {type: ACTION_CHANGE_AVAILABILITY_FOOD, id: nextItemId++, payload}
}

export const clearAvailabilityFood = (payload) => {
    return {type: ACTION_CLEAR_AVAILABILITY_FOOD}
}

export const clearAvailabilityFoodItem = (payload) => {
    return {type: ACTION_CLEAR_FOOD_ITEM, payload}
}

export const changeCellItem = (event, obj, field) => {
    return {type: ACTION_CHANGE_CELL_ITEM,
        event: event,
        id: obj,
        field: field}
}

export const editCellItemStart = (id, field) => {
    return {type: ACTION_EDIT_CELL_ITEM_START,
        id: id,
        field: field}
}

export const editCellItemSEnd = (id, field) => {
    return {type: ACTION_EDIT_CELL_ITEM_END,
        id: id,
        field: field}
}



