import {ACTION_CHANGE_AVAILABILITY_FOOD} from "../index";
import {ACTION_CLEAR_AVAILABILITY_FOOD} from "../index";
import {ACTION_CLEAR_FOOD_ITEM} from "../index";


const initalState = {
    food: JSON.parse(localStorage.getItem('state'))
};


export const rootReducer = (state = initalState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_AVAILABILITY_FOOD:
            return {...state, food:[...state.food,
                    {
                        id: action.id,
                        item: action.payload
                    }
                ]}

        case ACTION_CLEAR_AVAILABILITY_FOOD:
            return {...state, food:[]}
        case ACTION_CLEAR_FOOD_ITEM:
            return {...state, food:[...state.food.filter(item => item.id !== action.payload)]}
        default:
            return state;
    }
};





