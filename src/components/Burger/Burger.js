import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map( igKey => {
            //console.log('Ingredients Name',igKey);
            //console.log('No of Ingredients',props.ingredients[igKey]);
            return [...Array(props.ingredients[igKey])]
                .map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        .reduce((arr,el) => {
            // console.log('reduced array: ', arr);
            // console.log('array to add to reduced array: ', el);

            return arr.concat(el)
        }, []);
    
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }  


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;