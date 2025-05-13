const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51Q6XooRtZ7r4ujFNwwEx6CIqScYBGy3NlhkRuSgvdpGIoCCzfZQF5xr9u48Ua76447tTDtyEpFG2EE9fKU8gP5WD003laUmncW');

router.post('/intents', async (req, res) => {
    try {
        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'inr',
            automatic_payment_methods: {
                enabled: true
            }
        });
        // Return the client secret
        res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (e) {
        res.status(400).json({
            error: e.message,
        });
    }
});

module.exports = router;
