import React, { Component } from 'react';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Loader from '../../components/UI/Loader/Loader';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

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
        ingredients : null,
        totalPrice: 4,
        purchasable: false,
        showOrder: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        this.setState({loading: true});

        //alert('Order Made!!');
        axios.get('ingredients.json')
            .then(response => {
                const sIngredients = response.data;
                this.setState({ingredients: sIngredients});
            })
            .catch(error => {
                this.setState({error: true});
            });
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
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Alexu Trinhadad',
                address: {
                    street: '123 Fake St',
                    suburb: 'Fakeville',
                    state: 'Tokyo-ku',
                    country: 'Japan',
                    postcode: '711-3322'
                },
                email: 'test@demo.com'
            }
        }
        //alert('Order Made!!');
        axios.post('orders.json',order)
            .then(response => {
                this.setState({loading: false, showOrder: false});
            })
            .catch(error => {
                this.setState({loading: false, showOrder: false});
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
            //console.log(disabledInfo);
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients could not be loaded</p> : <Loader />;


        if (this.state.ingredients) {
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                cancelOrder={this.cancelOrderHandler}
                contOrder={this.makeOrderHandler}
                totalPrice={(this.state.totalPrice).toFixed(2)} />;

            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                            addIng={this.addIngredientHandler} 
                            removeIng={this.removeIngredientHandler} 
                            disabled={disabledInfo} 
                            purchasable={this.state.purchasable}
                            orderNow={this.orderNowHandler} />
                </>            
            );
        }

        if (this.state.loading) {
            orderSummary = <Loader />
        }

        return (
            <>
                <Modal show={this.state.showOrder} 
                        modalClosed={this.cancelOrderHandler}>
                    {orderSummary}   
                </Modal>
                
                <div style={{textAlign: "center", fontWeight: '600'}}>Price : {(this.state.totalPrice).toFixed(2)}</div>
                
                {burger}

            </>
        );
    }
}

export default WithErrorHandler(BurgerBuilder, axios);