import { createContext, useState } from "react";

export const CartItemsContext = createContext();

const CartItemsProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    return (
        <CartItemsContext.Provider value={{ cartItems, setCartItems, totalAmount, setTotalAmount }}>
            {children}
        </CartItemsContext.Provider>
    );
};

export default CartItemsProvider;
