import {useDispatch, useSelector} from "react-redux";
import {changeAvailabilityFood, clearAvailabilityFood, clearAvailabilityFoodItem} from "../store/action";
import {useEffect, useState} from "react";
import React from "react";



export function Food() {
    const dispatch = useDispatch();
    const addFood = (pr) => dispatch(changeAvailabilityFood(pr));
    const clearFood = (pr) => dispatch(clearAvailabilityFood(pr));
    const clearFoodItem = (pr) => dispatch(clearAvailabilityFoodItem(pr));
    const food = useSelector(state => state.food);
    const [value,setValue] = useState('');


    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(food));
    }, [food])

    function changeValue(e) {
        setValue(e.target.value)
    }

    function addToFood(e) {
        e.preventDefault();
        if(value !==''){
            addFood(value);
            setValue('');
        }
    }

    function clearToFood(e) {
        e.preventDefault();
        clearFood();
    }




    const listItems = food.map(food =>
        <div className='listItems' key={food.id}>
            <li>{food.item}</li>
            <button onClick={() => clearFoodItem(food.id) } className="btnFoodItemClear">X</button>
        </div>
    );

    return (
        <div>
        <form>
                <input className='inpFood' type='text' value={value} onChange={changeValue}/>
            <button className='btnFoodAdd' onClick={addToFood}>Добавить еду</button>
            <button className='btnFoodClear' onClick={clearToFood}>Очистить еду</button>
        </form>
            <h3>Продукты в наличии:</h3>
            <ul className='ulFood'>{listItems}</ul>
        </div>
    )
}