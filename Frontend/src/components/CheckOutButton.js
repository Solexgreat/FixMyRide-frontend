import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { API_BASE_URL } from '../constant'
import { toast } from 'react-toastify'

const stripePromise = loadStripe('pk_test_51Q1UKkCrN7PD1eLWWdsZbfXZdfUEs3dxljUwOlSQDIFLW3JXcxfD1jczcP8WV8PuH6W1lWOkLd81CEnOAtFD88AQ00yz5UzDh5');

function CheckOutButton({price, description}) {

    const handleCheckout = async () => {
        try{
            const response = await fetch(`${API_BASE_URL}/payment/checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    price,
                    description
                }),
            })

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.error);
            }

            const session = await response.json();

            if (session.error) {
                console.log(session.error);
                toast.error(session.error);
                return
            }

            // Redirect to Checkout
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({'sessionId': session.id});
        } catch (error) {
            toast.error();
        }
    }
    return (
        <button className='px-2 py-2 text-white rounded border
        bg-[#002B5B] hover:bg-white hover:text-[#333333] hover:border-[#333333]'
         onClick={handleCheckout}>
            Book and pay now
        </button>
    )
}

export default CheckOutButton;