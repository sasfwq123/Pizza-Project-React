const SET_SORT_BY = 'REACT_PIZZA/SET_SORT_BY'
const SET_CATEGORY = 'REACT_PIZZA/SET_CATEGORY'

const initialState = {
    category: null,
    sortBy: {
        type: 'rating',
        order: 'desc'
    }
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload
            }
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }

        default:
            return state
    }
}

export default filterReducer;

export const setSortBy = ({type, order}) => ({type: SET_SORT_BY, payload: {type, order}})
export const setCategory = (indexCategory) => ({type: SET_CATEGORY, payload: indexCategory})