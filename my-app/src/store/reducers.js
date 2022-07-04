import {
    ACTION_CHANGE_AVAILABILITY_FOOD,
    ACTION_CHANGE_CELL_ITEM,
    ACTION_EDIT_CELL_ITEM_END,
    ACTION_EDIT_CELL_ITEM_START
} from "../index";
import {ACTION_CLEAR_AVAILABILITY_FOOD} from "../index";
import {ACTION_CLEAR_FOOD_ITEM} from "../index";


const initalState = {
    food: JSON.parse(localStorage.getItem('state_food'))
};


//
// Представление стейта:
//
//  food: [
//      {id: 0, item: 'Молоко'},
//      {id: 1, item: 'Хлеб'},
//      ...
//      {id: 24, item: 'Томатная паста'}
//  ];
//

// Представление стейта New:
//
//  food: [
//      {id: 0,
//      rows: [
//      {isEdit: false, field: 'name', item: 'Молоко'},
//      {isEdit: false, field: 'quantity', item: '1'},
//      {isEdit: false, field: 'b', item: '12'},
//      {isEdit: false, field: 'z', item: '40'},
//      {isEdit: false, field: 'u', item: '120'},
//      ]
//      },
//      {id: 1, item: 'Хлеб'},
//      ...
//      {id: 24, item: 'Томатная паста'}
//  ];
//

export const rootReducer = (state = initalState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_AVAILABILITY_FOOD:
            return {
                ...state, food: [...state.food,
                    {
                        id: action.id,
                        rows: [
                            {isEdit: false, field: 'name', item: action.payload[0]},
                            {isEdit: false, field: 'img', item: action.payload[4]},
                            {isEdit: false, field: 'quantity', item: 1},
                            {isEdit: false, field: 'b', item: action.payload[1]},
                            {isEdit: false, field: 'z', item: action.payload[2]},
                            {isEdit: false, field: 'u', item: action.payload[3]},
                        ]
                    }
                ]
            }

        case ACTION_CLEAR_AVAILABILITY_FOOD:
            return {...state, food: []}
        case ACTION_CLEAR_FOOD_ITEM:
            return {...state, food: [...state.food.filter(item => item.id !== action.payload)]}
        case ACTION_CHANGE_CELL_ITEM:
            let newState = state.food.map(obj => {
                if (obj.id === action.id) {
                    const rows = obj.rows.map(field => {
                        if (field.field === action.field) {

                            return {...field, item: action.event}
                        } else {
                            return field;
                        }
                    });
                    return {...obj, rows};
                } else {
                    return obj;
                }
            });
            return {...state, food: newState}
        case ACTION_EDIT_CELL_ITEM_START:
            let newState2 = state.food.map(obj => {
                if (obj.id === action.id) {
                    const rows = obj.rows.map(field => {
                        if (field.field === action.field) {
                            console.log('Сработала)')
                            return {...field, isEdit: true}
                        } else {
                            console.log('Не сработала(')

                            return field;
                        }
                    });
                    return {...obj, rows};
                } else {
                    return obj;
                }
            })
            return {...state, food:newState2}
        case ACTION_EDIT_CELL_ITEM_END:
            let newState3 = state.food.map(obj => {
                if (obj.id === action.id) {
                    const rows = obj.rows.map(field => {
                        if (field.field === action.field) {
                            console.log('Сработала END)')
                            return {...field, isEdit: false}
                        } else {
                            console.log('Не сработала( END')
                            return field;
                        }
                    });
                    return {...obj, rows};
                } else {
                    return obj;
                }
            })
            return {...state, food:newState3}
        default:
            return state;
    }
};





