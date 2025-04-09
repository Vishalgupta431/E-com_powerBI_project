import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext, useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './CartCard.css';
import { CartItemsContext } from '../../../../Context/CartItemsContext';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const CartCard = ({ item }) => {
  const { cartItems, quantity, removeItem } = useContext(CartItemsContext);
  const [size, setSize] = useState(item.size[0]);

  const handleQuantityIncrement = () => {
    quantity(item.id, 'INC');
  };

  const handleQuantityDecrement = () => {
    if (item.itemQuantity > 1) {
      quantity(item.id, 'DEC');
    }
  };

  const handleRemoveItem = () => {
    removeItem(item);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  return (
    <div className="cart__item__card">
      <div className="cart__item__detail">
        <div className="cart__item__image">
          <img
            src={`https://shema-ecommerce.herokuapp.com/${item.category}/${item.image[0].filename}`}
            alt="item"
            className="item__image"
          />
        </div>
        <div className="cart__item__name">{item.name}</div>
      </div>
      <div className="cart__item__quantity">
        <IconButton onClick={handleQuantityIncrement}>
          <AddCircleIcon />
        </IconButton>
        <div className="quantity__input">{item.itemQuantity}</div>
        <IconButton onClick={handleQuantityDecrement}>
          <RemoveCircleIcon fontSize="medium" />
        </IconButton>
      </div>
      <div className="product size">
        <Box sx={{ minWidth: 80 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Size</InputLabel>
            <Select value={size} label="size" onChange={handleSizeChange}>
              {item.size.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="cart__item__price">${item.price}</div>
      <div className="remove__item__icon">
        <IconButton onClick={handleRemoveItem}>
          <HighlightOffIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CartCard;
