import React from 'react';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <strong style={{textTransform: 'capitalize'}}>{igKey}</strong> : 
                    &nbsp;{props.ingredients[igKey]}
                </li>
        })
        ;

    return (
        <>
            <h3>Your Order</h3>
            <p>
                A delicious burger with the following ingredients: 
            </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>
                <strong> Total Price: {props.totalPrice}</strong>
            </p>
            <p>
                Continue to Checkout?
            </p>
            <button className="red" onClick={props.cancelOrder}>CANCEL</button>
            <button onClick={props.contOrder}>CONTINUE</button>
        </>
    );
}

export default orderSummary;