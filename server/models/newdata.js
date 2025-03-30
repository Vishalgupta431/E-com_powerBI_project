const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    RowID: { type: Number, unique: true },
    Segment: { type: String,  },
    Country: { type: String,  },
    City: { type: String, required: true },
    State: { type: String, required: true },
    Region: { type: String, required: true },
    Category: { type: String, required: true },
    SubCategory: { type: String, required: true },
    Sales: { type: Number, required: true },
    Quantity: { type: Number, required: true },
    Profit: { type: Number, required: true },
    Returns: { type: String, default: "N/A" },
    AverageDelivery: { type: Number, required: true },
    ShipMode: { type: String, required: true },
    ShipDate: { type: String, required: true },
    OrderID: { type: String, required: true, unique: true },
    OrderDate: { type: String, required: true },
    CustomerID: { type: String,  },
    CustomerName: { type: String, required: true },
    ProductID: { type: String, },
    ProductName: { type: String,  },
    PaymentMode: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
