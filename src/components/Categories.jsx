import React from "react";

const Categories = React.memo(({categories, onSetCategories, category}) => {

    const onSelectItem = (index) => {
        onSetCategories( index )
    }

    return (
        <div className="categories">
            <ul>
                <li className={ category === null ? 'active' : '' }
                    onClick={ () => onSetCategories( null ) }
                >Все
                </li>
                { categories.map( (name, index) => {
                    return <li key={ `${ name }_${ index }` }
                               className={ category === index ? 'active' : '' }
                               onClick={ () => onSelectItem( index ) }
                    >{ name }</li>
                } ) }
            </ul>
        </div>
    )
})

export default Categories;