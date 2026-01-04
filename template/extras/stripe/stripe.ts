import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

const getStripe = () => {
	if (!stripeInstance) {
		if (!process.env.STRIPE_SECRET_KEY) {
			throw new Error("STRIPE_SECRET_KEY is not set");
		}
		stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
			typescript: true,
		});
	}
	return stripeInstance;
};

export const stripe = getStripe;
