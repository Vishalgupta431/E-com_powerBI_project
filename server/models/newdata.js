const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    OrderID: { type: String, required: true, unique: true },  
    OrderDate: { type: String, required: true },  
    ShipDate: { type: String }, 
    ShipMode: { type: String, default: "Standard" },  
    CustomerID: { type: String, required: true },  
    CustomerName: { type: String, required: true }, 
    Address: { type: String, required: true },  
    City: { type: String }, 
    State: { type: String },
    PaymentMode: { type: String, default: "Online" },
    TotalAmount: { type: Number, required: true },  

    // Array to store multiple items in one order
    Items: [
        {
            ProductID: { type: String },
            ProductName: { type: String },
            Quantity: { type: Number },
            Category: { type: String },
            Subcategory: { type: String },
        }
    ]
});

module.exports = mongoose.model("Order", orderSchema);



