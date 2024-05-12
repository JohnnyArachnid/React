import React, {useState} from 'react'

function MyComponent(){

    const [name, setName] = useState("Default");
    const [quantity, setQuantity] = useState(0);
    const [comment, setComment] = useState("");
    const [payment, setPayment] = useState("");
    const [shipping, setShipping] = useState("Delivery");

    function handleNameChange(event){
        setName(event.target.value);
    }

    function handleQuantityChange(event){
        setQuantity(event.target.value);
    }

    function handleCommentChange(event){
        setComment(event.target.value);
    }

    function handlePaymentChange(event){
        setPayment(event.target.value);
    }

    function handleShippingChange(event){
        setShipping(event.target.value);
    }

    return(

        <div>
            <input value={name} onChange={handleNameChange}/>
            <p>Name: {name}</p>
            <input value={quantity} onChange={(event) => handleQuantityChange(event)} type="number" />
            <p>Quantity: {quantity}</p>
            <textarea placeholder='Leave info for comment' onChange={handleCommentChange}></textarea>
            <p>Comment: {comment}</p>
            <select value={payment} onChange={handlePaymentChange} defaultValue="">
                <option value="">Select Value</option>
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="Giftcard">Giftcard</option>
            </select>
            <p>Payment: {payment}</p>
            <label>
                <input type="radio" value="Pick up" checked={shipping === "Pick up"} onChange={handleShippingChange}/>
                Pick up
                </label>
                <label>
                <input type="radio" value="Delivery" checked={shipping === "Delivery"} onChange={handleShippingChange}/>
                Delivery
                </label>
            <p>Shipping: {shipping}</p>
            
        </div>


    );

}

export default MyComponent