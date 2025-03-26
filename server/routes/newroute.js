const express = require("express");
const router = express.Router();
const Order = require("../models/newdata");

router.post("/", async (req, res) => {
    try {
        const {
            OrderID,
            OrderDate,
            ShipDate,
            ShipMode,
            CustomerID,
            CustomerName,
            Address,
            City,
            State,
            PaymentMode,
            TotalAmount,
            Items, // This should be an array of items
        } = req.body;

        // Check if Items array exists and has at least one item
        if (!Items || !Array.isArray(Items) || Items.length === 0) {
            return res.status(400).json({ message: "Items array is required and cannot be empty." });
        }

        // Create new order with multiple items
        const newOrder = new Order({
            OrderID,
            OrderDate,
            ShipDate,
            ShipMode,
            CustomerID,
            CustomerName,
            Address,
            City,
            State,
            PaymentMode,
            TotalAmount,
            Items, // Store the array of items
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: newOrder });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
