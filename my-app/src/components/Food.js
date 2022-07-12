import {useDispatch, useSelector} from "react-redux";
import {
    changeAvailabilityFood,
    changeCellItem,
    clearAvailabilityFood,
    clearAvailabilityFoodItem, editCellItemSEnd, editCellItemStart, addFavorite
} from "../store/action";
import {useEffect, useState} from "react";
import React from "react";
import Favorites from "./Favorites";

const SERVER_URL = 'https://ru.openfoodfacts.org/api/v2/product/';


export function Food() {
    const dispatch = useDispatch();
    const addFood = (pr) => dispatch(changeAvailabilityFood(pr));
    const clearFood = (pr) => dispatch(clearAvailabilityFood(pr));
    // const clearFoodItem = (pr) => dispatch(clearAvailabilityFoodItem(pr));
    const food = useSelector(state => state.food);
    const favorite = useSelector(state => state.favorite);
    const [value, setValue] = useState('');
    const [favorites, setFavorites] = useState(false);



    useEffect(() => {
        localStorage.setItem('state_food', JSON.stringify(food));
        localStorage.setItem('state_favorite', JSON.stringify(favorite));
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
                    let fat = result.product.nutriments.fat
                    let carbohydrates = result.product.nutriments.carbohydrates
                    let img = result.product.image_front_thumb_url
                    let paylaod = [productName, proteins, fat, carbohydrates, img]
                    addFood(paylaod);
                    setValue('');
                })
        } else {
            alert('Введите номер штрих-кода!')
        }

    }

    function clearToFood(e) {
        e.preventDefault();
        clearFood();

    }



    const rows = food.map(obj => {
        const cells = obj.rows.map(field => {
            let elem;
            if (!field.isEdit) {
                if (field.field === 'img') {
                    elem = <span className='listItems'>
                    <img alt='Здесь должно было быть изображение продукта' src={field.item}></img>
                     </span>
                } else {
                    elem = <span className='listItems' onClick={() => dispatch(editCellItemStart(obj.id, field.field))}>
                        {field.item}
                            </span>
                }

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

        if (obj.favorite) {
            return <tr key={obj.id}>{cells}
                <button onClick={() => dispatch(clearAvailabilityFoodItem(obj.id))} className="btnFoodItemClear">X
                </button>
                <button onClick={() => dispatch(addFavorite(obj.id))} className="addedFavorite"></button>
            </tr>
        } else {
            return <tr key={obj.id}>{cells}
                <button onClick={() => dispatch(clearAvailabilityFoodItem(obj.id))} className="btnFoodItemClear">X
                </button>
                <button onClick={() => dispatch(addFavorite(obj.id))} className="addFavorite"></button>
            </tr>
        }

    });
    return (<div>
        <form className='addFood'>
            <input className='inpFood' type='text' value={value} onChange={changeValue}/>
            <button className='btnFoodAdd' onClick={addToFood}>Добавить еду</button>
            <button className='btnFoodClear' onClick={clearToFood}>Очистить еду</button>
            <button className='btnFoodAdd' onClick={(e) => {e.preventDefault(); setFavorites(true)}}>Избранное</button>
        </form>
        <Favorites active={favorites} setActive={setFavorites}/>
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