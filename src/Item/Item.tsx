import Button from '@mui/material/Button';
// types
import { CartItemType } from '../App';
// styles
import { Wrapper } from './Item.styles';

type Props = {
    className: string;
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

// React.FC is to specify type of React Functional Component
const Item: React.FC<Props> = ({ className, item, handleAddToCart }) => (
    <Wrapper className={className}>
        <img src={item.image} alt={item.title} />
        <div>
            <h3 className='max-title'>{item.title}</h3>
            <p className='max-lines'>{item.description}...</p>
            <h3>${item.price}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
)

export default Item;