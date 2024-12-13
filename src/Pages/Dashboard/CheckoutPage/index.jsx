import { useLocation } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

const Index = () => {
    const location = useLocation();
    const { state } = location || {};
    const { plan, price, features } = state || {};

    if (!plan) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box>
            <Typography variant="h4">{plan} Plan</Typography>
            <Typography variant="h5">Price: ${price}</Typography>
            <Typography>Features:</Typography>
            <ul>
                {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </Box>
    );
};

export default Index;







// ------------------ Stripe Custom Maded Checkout Page ------------------

// import { useLocation } from 'react-router-dom';
// import { axiosInstance } from '../../../api/axiosInstance';
// // import Stripe from 'stripe';
// import { loadStripe } from '@stripe/stripe-js';

// // const stripe = Stripe("sk_test_51QSBs2F1BVeaeMn2zhPaHbSmtv7cnQWXGXlMooMPGizgDTMmEgcTLQ9j9mHavfF4M7BsOG6WKNX6M3tUGOVHoQlW00uESxXwlO");
// const stripePromise = loadStripe("sk_test_51QSBs2F1BVeaeMn2zhPaHbSmtv7cnQWXGXlMooMPGizgDTMmEgcTLQ9j9mHavfF4M7BsOG6WKNX6M3tUGOVHoQlW00uESxXwlO");

// export default function Index() {
//     const location = useLocation();
//     const { plan, price, features } = location.state;

//     const handleClick = async () => {
//         try {
//             const stripe = await stripePromise; // Load Stripe
//             const res = await axiosInstance.post('/user/create-subs', { plan, price, features });

//             // Redirect to Stripe Checkout
//             const sessionId = res.data.id;
//             const result = await stripe.redirectToCheckout({ sessionId });

//             if (result.error) {
//                 console.error('Error redirecting to Stripe Checkout:', result.error.message);
//             }
//         } catch (error) {
//             console.error('Error creating subscription:', error);
//         }
//     };

//     return (
//         <div>
//             <p>You have selected the {plan} plan for ${price}/month.</p>
//             <button onClick={handleClick}>Proceed to Checkout</button>
//         </div>
//     );
// }









// import { useLocation } from 'react-router-dom';
// import { axiosInstance } from '../../../api/axiosInstance';
// // import Stripe from 'stripe';
// import { loadStripe } from '@stripe/stripe-js';

// // const stripe = Stripe("sk_test_51QSBs2F1BVeaeMn2zhPaHbSmtv7cnQWXGXlMooMPGizgDTMmEgcTLQ9j9mHavfF4M7BsOG6WKNX6M3tUGOVHoQlW00uESxXwlO");
// const stripePromise = loadStripe("sk_test_51QSBs2F1BVeaeMn2zhPaHbSmtv7cnQWXGXlMooMPGizgDTMmEgcTLQ9j9mHavfF4M7BsOG6WKNX6M3tUGOVHoQlW00uESxXwlO");

// export default function Index() {
//     const location = useLocation();
//     const { plan, price, features } = location.state;

//     const handleClick = async () => {
//         try {
//             const res = await axiosInstance.post('/user/create-subs', { plan, price, features });
//             // window.location.href = result.data.url; // Redirect to Stripe Checkout
//             const session = await res.json();
//             const result = stripe.redirectToCheckout({
//                 sessionId: session.id
//             })

//             if (result.error) {
//                 console.log("Error from the result Stripe Frontend (Checkout)")
//             }

//         } catch (error) {
//             console.error('Error creating subscription:', error);
//         }
//     };

//     return (
//         <div>
//             <p>You have selected the {plan} plan for ${price}/month.</p>
//             <button onClick={handleClick}>Proceed to Checkout</button>
//         </div>
//     );
// }
