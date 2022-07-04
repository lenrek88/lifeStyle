import {useDispatch, useSelector} from "react-redux";
import {
    changeAvailabilityFood,
    changeCellItem,
    clearAvailabilityFood,
    clearAvailabilityFoodItem, editCellItemSEnd, editCellItemStart
} from "../store/action";
import {useEffect, useState} from "react";
import React from "react";

const SERVER_URL = 'https://ru.openfoodfacts.org/api/v2/product/';


export function Food() {
    const dispatch = useDispatch();
    const addFood = (pr) => dispatch(changeAvailabilityFood(pr));
    const clearFood = (pr) => dispatch(clearAvailabilityFood(pr));
    // const clearFoodItem = (pr) => dispatch(clearAvailabilityFoodItem(pr));
    const food = useSelector(state => state.food);
    const [value, setValue] = useState('');


    useEffect(() => {
        localStorage.setItem('state_food', JSON.stringify(food));
    }, [food])

    function changeValue(e) {
        setValue(e.target.value)
    }

    function addToFood(e) {
        e.preventDefault();
        if (value !== '') {
            const url = `${SERVER_URL}${value}`
            fetch(url)
                .then(responce => responce.json())
                .then((result) => {
                    let productName = result.product.product_name
                    let proteins = result.product.nutriments.proteins
                    let fat =  result.product.nutriments.fat
                    let carbohydrates = result.product.nutriments.carbohydrates
                    let img = result.product.image_front_thumb_url
                    console.log(productName)
                    console.log(carbohydrates)
                    let paylaod = [productName, proteins, fat, carbohydrates, img]
                    addFood(paylaod);
                    setValue('');
                })
        } else
        {
            alert('Введите номер штрих-кода!')
        }

    }

    function clearToFood(e) {
        e.preventDefault();
        clearFood();

    }


    console.log(food)

    const rows = food.map(obj => {
        const cells = obj.rows.map(field => {
            let elem;
            if (!field.isEdit) {
                elem = <span className='listItems' onClick={() => dispatch(editCellItemStart(obj.id, field.field))}>
                    <img src={field.item}></img>
                     </span>
            } else {
                elem = <input
                    autoFocus
                    type='text'
                    value={field.item}
                    onChange={(event) => dispatch(changeCellItem(event.target.value, obj.id, field.field))}
                    onBlur={() => dispatch(editCellItemSEnd(obj.id, field.field))}
                />;
            }
            return <td key={field.field}>{elem}</td>

        })
        return <tr key={obj.id}>{cells}<button onClick={() => dispatch(clearAvailabilityFoodItem(obj.id))} className="btnFoodItemClear">X</button></tr>
    });
    return (<div>
        <form className='addFood'>
            <input className='inpFood' type='text' value={value} onChange={changeValue}/>
            <button className='btnFoodAdd' onClick={addToFood}>Добавить еду</button>
            <button className='btnFoodClear' onClick={clearToFood}>Очистить еду</button>
        </form>
        <h3>Продукты в наличии:</h3>
        <div className='ulFood'>
            <tr>
                <th>Наименование:</th>
                <th>Изображение:</th>
                <th>Количество:</th>
                <th>Белки:</th>
                <th>Жиры:</th>
                <th>Углеводы:</th>
            </tr>
            {rows}
        </div>
    </div>)
}