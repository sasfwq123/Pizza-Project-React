import React, {useEffect} from "react";
import {Categories, SortPopup, PizzaBlock, LoadingBlock} from '../components/index'
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setSortBy} from "../redux/filter-reducer";
import {fetchPizzas} from "../redux/pizzas-reducer";
import {addPizzaCart} from "../redux/cart-reducer";
import {getItems} from "../redux/cart-selectors";

const Home = React.memo(() => {
    const {items, isLoaded, categories, sort} = useSelector( ({pizzas}) => pizzas )
    const {category, sortBy} = useSelector( ({filter}) => filter )
    const cartItems = useSelector(getItems)

    const dispatch = useDispatch()

    const onSetCategories = (index) => {
        dispatch( setCategory( index ) )
    }

    const onSetSortBy = (obj) => {
        dispatch( setSortBy( obj ) )
    }

    useEffect( () => {
        dispatch( fetchPizzas( category, sortBy ) )
    }, [dispatch, category, sortBy] )

    const handleAddPizzaToCart = (pizzaObj) => {
        dispatch(addPizzaCart(pizzaObj))
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories categories={ categories }
                            onSetCategories={ onSetCategories }
                            category={ category }
                />
                <SortPopup
                    items={ sort }
                    sortBy={ sortBy.type }
                    onSetSortBy={ onSetSortBy }
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                { isLoaded ? items && items.map( (obj, index) => {
                    return <PizzaBlock key={ `${ obj.id }_${ index }` }
                                       { ...obj }
                                       handleAddPizzaToCart={ handleAddPizzaToCart }
                                       addedCount={ cartItems[obj.id] && cartItems[obj.id].items.length }
                    />
                } )
                           : Array( 10 ).fill( 0 ).map( ((_, index) => <LoadingBlock key={ index } />) )
                }
            </div>
        </div>
    )
})

export default Home;