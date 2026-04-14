const Bill = require('../models/Bill');

exports.generateBill = async (req, res) => {
    try {
        const { sourceProject, customerName, customerEmail, cartItems } = req.body;

        // 1. Calculate the math securely
        let calculatedSubTotal = 0;
        const processedItems = cartItems.map(item => {
            const itemTotal = item.quantity * item.unitPrice;
            calculatedSubTotal += itemTotal;
            return {
                name: item.name,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: itemTotal
            };
        });

        // 2. Add 18% Tax (GST)
        const tax = calculatedSubTotal * 0.18; 
        const finalAmount = calculatedSubTotal + tax;

        // 3. Create the Bill
        const newBill = new Bill({
            sourceProject: sourceProject || 'CaspianRow',
            customerName,
            customerEmail,
            items: processedItems,
            subTotal: calculatedSubTotal,
            taxAmount: Number(tax.toFixed(2)),
            finalTotal: Number(finalAmount.toFixed(2))
        });

        const savedBill = await newBill.save();

        // 4. Send success response back to the website
        res.status(201).json({
            success: true,
            message: "Bill generated successfully!",
            billId: savedBill._id,
            totalToPay: savedBill.finalTotal
        });

    } catch (error) {
        console.error("Billing Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};