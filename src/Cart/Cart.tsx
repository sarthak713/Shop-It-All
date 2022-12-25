import CartItem from "../CartItem/CartItem";
// styles
import { Wrapper } from "./Cart.styles";
// types
import { CartItemType } from "../App";

type Props = {
    className: string;
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ className, cartItems, addToCart, removeFromCart }) => {

    const calculateTotal = (items: CartItemType[]) => {
        return items.reduce((total: number, item) => total + item.amount * item.price, 0);
    }

    return (
        <Wrapper className={className}>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No items in cart</p> : null}
            {cartItems.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart;