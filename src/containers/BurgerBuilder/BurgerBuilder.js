import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {  };
    // }

    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    
addIngredientHandler = (type) => {
    console.log(type + ' added!');
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = {
        ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;

    console.log(updatedIngredients);

    this.setState({ingredients: updatedIngredients});

    
}

removeIngredientHandler = (type) => {

}

    render() {
        return (
            <>
                <Burger ingredients={this.state.ingredients}/>
                <div>Price</div>
                <BuildControls addIng={this.addIngredientHandler} removeIng={this.removeIngredientHandler}  />
            </>
        );
    }
}

export default BurgerBuilder;