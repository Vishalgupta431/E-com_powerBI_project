const express = require("express");
const router = express.Router();
const Order = require("../models/newdata");

router.post("/", async (req, res) => {
    try {
        const {
            RowID,
            Segment,
            Country,
            City,
            State,
            Region,
            Category,
            SubCategory,
            Sales,
            Quantity,
            Profit,
            Returns,
            AverageDelivery,
            ShipMode,
            ShipDate,
            OrderID,
            OrderDate,
            CustomerID,
            CustomerName,
            ProductID,
            ProductName,
            PaymentMode,
        } = req.body;

        // Create new order
        const newOrder = new Order({
            RowID,
            Segment,
            Country,
            City,
            State,
            Region,
            Category,
            SubCategory,
            Sales,
            Quantity,
            Profit,
            Returns,
            AverageDelivery,
            ShipMode,
            ShipDate,
            OrderID,
            OrderDate,
            CustomerID,
            CustomerName,
            ProductID,
            ProductName,
            PaymentMode,
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: newOrder });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
