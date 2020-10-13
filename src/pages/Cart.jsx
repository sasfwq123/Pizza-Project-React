import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {clearCart, minusCartItem, plusCartItem, removeCartItem} from "../redux/cart-reducer";
import emptyCart from '../assets/img/empty-cart.png'
import CartItem from "../components/CartItem";
import Button from "../components/Button";

const Cart = () => {
    const {items, totalCount, totalPrice} = useSelector( ({cart}) => cart )
    const addedPizzas = Object.keys( items ).map( (key) => items[key].items[0] )
    const dispatch = useDispatch()

    const onClearCart = () => {
        if (window.confirm( 'Вы действительно хотите очистить корзину?' )) {
            dispatch( clearCart() )
        }
    }

    const onRemoveItem = (id) => {
        if (window.confirm( 'Вы действитель хотите удалить пиццу?' )) {
            dispatch( removeCartItem( id ) )
        }
    }

    const onPlusItem = (id) => {
        dispatch( plusCartItem( id ) )
    }

    const onMinusItem = (id) => {
        dispatch( minusCartItem( id ) )
    }

    const onClickOrder = () => {
        console.log('ВАШ ЗАКАЗ: ', items)
    }

    return (
        <div className="wrapper">
            <div className="content">
                { totalCount ? (
                                 <div className="container container--cart">
                                     <div className="cart">
                                         <div className="cart__top">
                                             <h2 className="content__title">Корзина</h2>
                                             <div className="cart__clear">
                                                 <span onClick={ onClearCart }>Очистить корзину</span>
                                             </div>
                                         </div>
                                         <div>
                                             { addedPizzas.map( (obj, index) => <CartItem
                                                 key={ `${ obj.id }_${ index }` }
                                                 totalCount={ items[obj.id].items.length }
                                                 totalPrice={ items[obj.id].totalPrice }
                                                 onRemove={ onRemoveItem }
                                                 onPlus={ onPlusItem }
                                                 onMinus={ onMinusItem }
                                                 id={ obj.id }
                                                 { ...obj }
                                             /> ) }
                                         </div>
                                         <div className="cart__bottom">
                                             <div className="cart__bottom-details">
                                                 <span> Всего пицц: <b>{ totalCount } шт.</b> </span>
                                                 <span> Сумма заказа: <b>{ totalPrice } ₽</b> </span>
                                             </div>
                                             <div className="cart__bottom-buttons">
                                                 <NavLink to="/" className="button button--outline button--add go-back-btn">
                                                     <span>Вернуться назад</span>
                                                 </NavLink>
                                                 <Button onClick={onClickOrder} className="pay-btn">
                                                     <span>Оплатить сейчас</span>
                                                 </Button>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             )
                             : (
                      <div className="cart cart--empty">
                          <h2>Корзина пустая <span role={ 'img' } aria-label={ '' }>😕</span></h2>
                          <p>
                              Вероятней всего, вы не заказывали ещё пиццу.<br/>
                              Для того, чтобы заказать пиццу, перейди на главную страницу.
                          </p>
                          <img src={ emptyCart } alt="Empty cart"/>
                          <NavLink to="/" className="button button--black">
                              <span>Вернуться назад</span>
                          </NavLink>
                      </div>
                  )
                }
            </div>
        </div>
    )
}

export default Cart;