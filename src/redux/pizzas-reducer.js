import axios from "axios";

const SET_PIZZAS = 'REACT_PIZZA/SET_PIZZAS'
const IS_LOADED = 'REACT_PIZZA/IS_LOADED'

const initialState = {
    items: [],
    isLoaded: false,
    categories: ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'],
    sort: [
        {name: 'популярности', type: 'rating', order: 'desc'},
        {name: 'цене', type: 'price', order: 'desc'},
        {name: 'алфавиту', type: 'name', order: 'asc'}
    ]
}

const pizzasReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PIZZAS:
            return {
                ...state,
                items: action.payload,
                isLoaded: true
            }
        case IS_LOADED:
            return {
                ...state,
                isLoaded: action.isFetching
            }

        default:
            return state
    }
}

export default pizzasReducer;

export const setPizzas = (items) => ({type: SET_PIZZAS, payload: items})
export const isLoaded = (isFetching) => ({type: IS_LOADED, isFetching})

export const fetchPizzas = (category, sortBy) => async (dispatch) => {
    dispatch( isLoaded( false ) )
    await axios.get( `/pizzas` + (category === null ? `?_sort=${ sortBy.type }&_order=${ sortBy.order }`
                                                    : `?category=${ category }&_sort=${ sortBy.type }&_order=${ sortBy.order }`) )
        .then( response => {
            dispatch( setPizzas( response.data ) )
            dispatch( isLoaded( true ) )
        } )
}