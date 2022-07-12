import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import React from "react";
import {
    addFavorite,
    changeCellItem,
    editCellItemSEnd,
    editCellItemStart,
    clearFavorite, addFoodFromFavorite
} from "../store/action";

export default function Favorites({active, setActive, children}) {
    const dispatch = useDispatch();
    const favorite = useSelector(state => state.favorite);

        const rows = favorite.map(obj => {
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
                    <button onClick={() => dispatch(addFavorite(obj.id))} className="addedFavorite"></button>
                    <button onClick={() => dispatch(addFoodFromFavorite(obj))}>+</button>
                </tr>
            } else {

                return <tr key={obj.id}>{cells}
                    <button onClick={() => dispatch(addFavorite(obj.id))} className="addFavorite"></button>
                    <button onClick={() => dispatch(addFoodFromFavorite(obj))}>+</button>
                </tr>
            }

        });
        return (
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                {children}
                <button className='btnFoodClear' onClick={(pr) => dispatch(clearFavorite(pr))}>Очистить избранное</button>
            <h3>Продукты в Избранном:</h3>
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
            </div>
        </div>)

}