import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import pizzas from "./pizzas-reducer";
import filter from "./filter-reducer";
import thunk from 'redux-thunk';
import cart from "./cart-reducer";

const reducers = combineReducers( {
    pizzas,
    filter,
    cart
} )

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore( reducers, composeEnhancers(
    applyMiddleware(thunk)
) )