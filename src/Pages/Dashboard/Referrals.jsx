import PropTypes from 'prop-types';
// import { loadStripe } from '@stripe/stripe-js';

import { Outlet, useLocation } from 'react-router-dom';
import { axiosInstance } from '../../api/axiosInstance';
import {
  Box, Card,
  CardContent, Typography,
  Button, Grid
} from '@mui/material';


// const stripePromise = loadStripe('pk_test_51QSBs2F1BVeaeMn2OftmykQ5IdzOi5NQGqGmzX77qr8B55mifdGgFZzZMtI1JXAh9VdXR6r2ZcKFrjpbZ5PtVtb100vAGNz02n'); // Replace with your Stripe Publishable Key
const PlanCard = ({ plan, price, features, buttonLabel, highlighted }) => {

  const handlePlanSelection = async () => {
    try {
      const { data } = await axiosInstance.post('/user/create-checkout-session', {
        plan,
        price,
      });

      // Redirect to Stripe payment page
      // const stripe = await stripePromise;
      // await stripe.redirectToCheckout({ sessionId: data.sessionId });
      console.log("This is the stripe", data)
      window.location.href = data.url;
    } catch (error) {
      console.error('Error redirecting to Stripe:', error);
    }
  };


  return (
    <Card
      sx={{
        borderRadius: '12px',
        boxShadow: highlighted ? '0px 4px 10px rgba(0, 123, 255, 0.3)' : '0px 2px 10px rgba(0, 0, 0, 0.1)',
        transform: highlighted ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        border: highlighted ? '1px solid #007BFF' : '1px solid #e0e0e0',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 4px 10px rgba(54, 69, 79, 0.2)',
        },
      }}>

      <CardContent>
        <Typography variant="h5" align="center" fontWeight="semiBold" gutterBottom>
          {plan}
        </Typography>

        <Typography variant="h3" align="center" color="primary" fontWeight="bold">
          ${price}
        </Typography>

        <Typography variant="subtitle2" align="center" color="textSecondary" gutterBottom>
          per month
        </Typography>

        <Box sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Typography key={index} variant="body1" align="center" sx={{ mb: 1, color: 'gray' }}>
              • {feature}
            </Typography>
          ))}
        </Box>

        <Box textAlign="center" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color={highlighted ? 'primary' : 'secondary'}
            size="large"
            sx={{ borderRadius: '20px', px: 4, textTransform: 'capitalize' }}
            onClick={handlePlanSelection}>
            {buttonLabel}
          </Button>
        </Box>

      </CardContent>
    </Card>
  );
};

const Referrals = () => {
  const location = useLocation();
  const isReferralsRoot = location.pathname === '/referrals';

  return (
    <Box sx={{ flexGrow: 1, px: 2 }}>
      {isReferralsRoot ? (
        <>
          <Typography
            variant="h4"
            align="start"
            gutterBottom
            mb={5}
            mt={2}
            color="rgb(56, 56, 56)">Choose Your Plan</Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <PlanCard
                plan="Basic"
                price={9}
                features={[
                  'Access to basic features',
                  'Email support',
                  'Limited storage space',
                ]}
                buttonLabel="Choose Basic"
                highlighted={false} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <PlanCard
                plan="Standard"
                price={19}
                features={[
                  'Access to all features',
                  'Priority email support',
                  'Increased storage capacity',
                  'Monthly usage reports',
                ]}
                buttonLabel="Choose Standard"
                highlighted={true} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <PlanCard
                plan="Premium"
                price={29}
                features={[
                  'Access to premium features',
                  '24/7 phone support',
                  'Unlimited storage',
                  'Advanced analytics',
                  'Custom integrations',
                ]}
                buttonLabel="Choose Premium"
                highlighted={false} />
            </Grid>

          </Grid>
        </>
      ) : (<Outlet />)
      }

    </Box>
  );
};

export default Referrals;



PlanCard.propTypes = {
  plan: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  features: PropTypes.array.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  highlighted: PropTypes.bool.isRequired,
}








// --------------- Plain Code Without Stripe Implementation ---------------

// import PropTypes from 'prop-types';
// // import { RouteNames } from "../../Constants/route";
// import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';


// const PlanCard = ({ plan, price, features, buttonLabel, highlighted }) => {

//   const navigate = useNavigate();
//   const handlePlanSelection = () => {
//     navigate('/referrals/checkout', {
//       state: { plan, price, features }
//     })
//   }

//   return (
//     <Card
//       sx={{
//         borderRadius: '12px',
//         boxShadow: highlighted ? '0px 4px 10px rgba(0, 123, 255, 0.3)' : '0px 2px 10px rgba(0, 0, 0, 0.1)',
//         transform: highlighted ? 'scale(1.05)' : 'scale(1)',
//         transition: 'transform 0.3s, box-shadow 0.3s',
//         border: highlighted ? '1px solid #007BFF' : '1px solid #e0e0e0',
//         '&:hover': {
//           transform: 'scale(1.05)',
//           boxShadow: '0px 4px 10px rgba(54, 69, 79, 0.2)',
//         },
//       }}
//     >
//       <CardContent>
//         <Typography variant="h5" align="center" fontWeight="semiBold" gutterBottom>
//           {plan}
//         </Typography>
//         <Typography variant="h3" align="center" color="primary" fontWeight="bold">
//           ${price}
//         </Typography>
//         <Typography variant="subtitle2" align="center" color="textSecondary" gutterBottom>
//           per month
//         </Typography>
//         <Box sx={{ mt: 2 }}>
//           {features.map((feature, index) => (
//             <Typography key={index} variant="body1" align="center" sx={{ mb: 1, color: 'gray' }}>
//               • {feature}
//             </Typography>
//           ))}
//         </Box>
//         <Box textAlign="center" sx={{ mt: 3 }}>
//           <Button
//             variant="contained"
//             color={highlighted ? 'primary' : 'secondary'}
//             size="large"
//             sx={{ borderRadius: '20px', px: 4, textTransform: 'capitalize' }}
//             onClick={handlePlanSelection}
//           >
//             {buttonLabel}
//           </Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };