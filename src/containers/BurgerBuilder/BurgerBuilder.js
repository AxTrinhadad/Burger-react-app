import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

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
        },
        totalPrice: 4,
        purchasable: false,
        showOrder: false
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum, el) => {
                        return sum + el;
                    },0);

        this.setState({ purchasable: sum > 0 })        
    }


    addIngredientHandler = (type) => {
        console.log(type + ' added!');
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAdd = INGREDIENT_PRICES[type];
        const oldTotal = this.state.totalPrice;

        const newTotalPrice = oldTotal + priceAdd;

        this.setState({ingredients: updatedIngredients, totalPrice: newTotalPrice});

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0 ) {
            return;
        }
        
        console.log(type + ' removed!!!!');

        const updatedCount = oldCount - 1;
            

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceReduce = INGREDIENT_PRICES[type];
        const oldTotal = this.state.totalPrice;

        const newTotalPrice = oldTotal - priceReduce;
        
        this.setState({ingredients: updatedIngredients, totalPrice: newTotalPrice});

        this.updatePurchaseState(updatedIngredients);
    }

    orderNowHandler = () => {
        //console.log('Burger Ordered!',this.state.showOrder.toString());
        this.setState({ showOrder: true });
    }

    cancelOrderHandler = () => {
        this.setState({ showOrder: false });
    }

    makeOrderHandler = () => {
        alert('Order Made!!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
            console.log(disabledInfo);
        }

        return (
            <>
                <Modal show={this.state.showOrder} modalClosed={this.cancelOrderHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        cancelOrder={this.cancelOrderHandler}
                        contOrder={this.makeOrderHandler}
                        totalPrice={(this.state.totalPrice).toFixed(2)} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <div style={{textAlign: "center", fontWeight: '600'}}>Price : {(this.state.totalPrice).toFixed(2)}</div>
                <BuildControls 
                    addIng={this.addIngredientHandler} 
                    removeIng={this.removeIngredientHandler} 
                    disabled={disabledInfo} 
                    purchasable={this.state.purchasable}
                    orderNow={this.orderNowHandler} />


            </>
        );
    }
}

export default BurgerBuilder;