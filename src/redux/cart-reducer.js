const ADD_PIZZA_CART = 'ADD_PIZZA_CART';
const CLEAR_CART = 'CLEAR_CART';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
const PLUS_CART_ITEM = 'PLUS_CART_ITEM';
const MINUS_CART_ITEM = 'MINUS_CART_ITEM';

const initialState = {
    items: {},
    totalCount: 0,
    totalPrice: 0
}

const getTotalPrice = (arr) => arr.reduce( (sum, obj) => obj.price + sum, 0 )

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PIZZA_CART: {
            const currentPizzaItems = !state.items[action.payload.id]
                                      ? [action.payload]
                                      : [...state.items[action.payload.id].items, action.payload]

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice( currentPizzaItems )
                }
            }

            const totalCount = Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0)
            const totalPrice = Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0)

            return {
                items: newItems,
                totalCount,
                totalPrice
            }
        }

        case REMOVE_CART_ITEM: {
            const newCartItem = {
                ...state.items
            }

            const currentTotalPrice = newCartItem[action.payload].totalPrice
            const currentTotalCount = newCartItem[action.payload].items.length
            delete newCartItem[action.payload]

            return {
                ...state,
                items: newCartItem,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount
            }
        }

        case CLEAR_CART:
            return {
                items: {},
                totalCount: 0,
                totalPrice: 0
            }

        case PLUS_CART_ITEM: {
            const newObjectItems = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ]

            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjectItems,
                    totalPrice: getTotalPrice( newObjectItems )
                }
            }

            const totalCount = Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0)
            const totalPrice = Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0)

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            }
        }

        case MINUS_CART_ITEM: {
            const oldItems = state.items[action.payload].items
            const newObjectItems = oldItems.length > 1 ? state.items[action.payload].items.slice( 1 ) : oldItems

            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjectItems,
                    totalPrice: getTotalPrice( newObjectItems )
                }
            }

            const totalCount = Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0)
            const totalPrice = Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0)

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            }
        }
        default:
            return state
    }
}

export default cartReducer;

export const addPizzaCart = (pizzaObj) => ({type: ADD_PIZZA_CART, payload: pizzaObj})
export const clearCart = () => ({type: CLEAR_CART})
export const removeCartItem = (id) => ({type: REMOVE_CART_ITEM, payload: id})
export const plusCartItem = (id) => ({type: PLUS_CART_ITEM, payload: id})
export const minusCartItem = (id) => ({type: MINUS_CART_ITEM, payload: id})