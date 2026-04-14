const Bill = require('../models/Bill');

exports.generateBill = async (req, res) => {
    try {
        // We now accept 'discountAmount' from the website
        const { sourceProject, customerName, customerEmail, cartItems, taxRate = 0, discountAmount = 0 } = req.body;

        // 1. Calculate the raw SubTotal
        let calculatedSubTotal = 0;
        const processedItems = cartItems.map(item => {
            const itemTotal = item.quantity * item.unitPrice;
            calculatedSubTotal += itemTotal;
            return {
                name: item.name, quantity: item.quantity, unitPrice: item.unitPrice, totalPrice: itemTotal
            };
        });

        // 2. Apply the Discount (Ensure total doesn't go below 0)
        let discountedSubTotal = calculatedSubTotal - discountAmount;
        if (discountedSubTotal < 0) discountedSubTotal = 0;

        // 3. Calculate Tax on the new discounted amount
        const tax = discountedSubTotal * (taxRate / 100); 
        const finalAmount = discountedSubTotal + tax;

        // 4. Create the Bill
        const newBill = new Bill({
            sourceProject: sourceProject || 'CaspianRow',
            customerName,
            customerEmail,
            items: processedItems,
            subTotal: calculatedSubTotal,
            discountAmount: Number(discountAmount.toFixed(2)),
            taxAmount: Number(tax.toFixed(2)),
            finalTotal: Number(finalAmount.toFixed(2))
        });

        const savedBill = await newBill.save();

        res.status(201).json({
            success: true, message: "Bill generated successfully!", billId: savedBill._id, totalToPay: savedBill.finalTotal
        });

    } catch (error) {
        console.error("Billing Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};