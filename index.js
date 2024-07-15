import 'dotenv/config';
import express from 'express';
import initApp from './src/app.router.js';
const app = express();
const PORT = process.env.PORT || 3000;
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51P70rq09ytaQUOywcS9L6a3wXe2zxx5BJKBDc8EKCUl8dfD1KtCBcqs32Xo05LVAFCvuu2Hz8X7rwinONFDXbyRk000TaWGZ0c');
app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
    event = stripe.webhooks.constructEvent(request.body, sig, "whsec_JBjyFzB0Un6i4Qx0fFPwVoHqO10ZWEdb");
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    
    }
    if(event.type === 'checkoutSessionCompleted'){
        //creart ordar
        console.log('creat order ....');
        const checkoutSessionCompleted = event.data.object;

    }else{
        console.log(`unknown event type', ${event.type}`);
    }

    response.send();
});
// const app = express();
app.listen(4242, () => console.log('Running on port 4242'));
// const app = express();
initApp(app, express);
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})