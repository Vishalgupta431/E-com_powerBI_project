import { Fragment, useContext, useState } from "react";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import CartCard from "./CartCard/CartCard";
import "./Cart.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

// Cart Modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "350px",
  width: "45%",
  bgcolor: "background.paper",
  border: "5px solid #FFE26E",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const { items, setCartItems, totalAmount } = useContext(CartItemsContext);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "Aligarh",
    state: "Uttar Pradesh",
    paymentMode: "Online",
  });
  let userEmail=localStorage.getItem("email");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFormOpen = () => {
    setOpen(false);
    setOpenFormModal(true);
  };
  const handleFormClose = () => setOpenFormModal(false);
  const handleCheckoutClose = () => setOpenCheckoutModal(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async () => {
    if (!items || items.length === 0) {
      console.log("Cart is empty, cannot proceed to checkout.");
      return;
    }

    const orderData = {
      OrderID: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      OrderDate: new Date().toDateString(),
      ShipDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
      ShipMode: "Standard",
      CustomerID: userEmail,
      CustomerName: formData.name,
      Address: formData.address,
      City: formData.city,
      State: formData.state,
      PaymentMode: formData.paymentMode,
      TotalAmount: totalAmount,
      Items: items.map(item => ({
        ProductID: item.productId || "Unknown",
        ProductName: item.name || "Unknown",
        Quantity: item.quantity || 1,
        Category: item.category || "General",
        Subcategory: item.subcategory || "Others",
      })),
    };
    console.log(orderData);

    try {
      await axios.post("http://localhost:5000/api/orders2", orderData);
      console.log("Order placed successfully!");
      setCartItems([]); 
    setOpenFormModal(false);
    setOpenCheckoutModal(true);
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
    }
  };

  return (
    <Fragment>
      <Badge badgeContent={items.length} color="error">
        <ShoppingCartIcon color="black" onClick={handleOpen} sx={{ width: "35px", cursor: "pointer" }} />
      </Badge>

      {/* Cart Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="cart__header">
            <h2>Your Cart</h2>
          </div>
          <div className="cart__items__container">
            <div className="cartItems">
              {items.length === 0 ? (
                <div className="cart__empty">Empty cart!</div>
              ) : (
                <div className="shop__cart__items">
                  {items.map((item) => (
                    <CartCard key={item._id} item={item} />
                  ))}
                </div>
              )}
              {items.length > 0 && (
                <div className="options">
                  <div className="total__amount">
                    <div className="total__amount__label">Total Amount:</div>
                    <div className="total__amount__value">${totalAmount}.00</div>
                  </div>
                  <div className="checkout">
                    <Button variant="outlined" onClick={handleFormOpen}>
                      Checkout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Modal>

      {/* Checkout Form Modal */}
      <Modal open={openFormModal} onClose={handleFormClose}>
        <Box sx={style}>
          <h2>Checkout Details</h2>
          
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="State"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Payment Mode"
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleInputChange}
            margin="normal"
          >
            <MenuItem value="Online">Online</MenuItem>
            <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
            <MenuItem value="Credit/Debit Card">Credit/Debit Card</MenuItem>
          </TextField>
          <div className="checkout-buttons">
            <Button variant="contained" color="primary" onClick={handleOrderSubmit}>
              Place Order
            </Button>
            <Button variant="outlined" onClick={handleFormClose} sx={{ marginLeft: 2 }}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Order Success Modal */}
      <Modal open={openCheckoutModal} onClose={handleCheckoutClose}>
        <Box sx={style}>
          <div className="d-flex w-100 h-100 justify-content-center align-items-center">
            <h2>Your checkout was successful!</h2>
          </div>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default Cart;
