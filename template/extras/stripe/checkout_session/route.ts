import { NextResponse } from "next/server";
/* Here imports are set up for the final project structure, so it's fine  */
import { stripe } from "@/lib/stripe";


const TRIAL_PERIOD_DAYS = 3;


export async function GET(req: Request) {
	try {
		
        // Usually you would check for authentication first
        const fakeUser = {
            id: "123",
            email: "test@test.com",
        }

		const url = new URL(req.url);
		const priceId = url.searchParams.get("priceId");

		if (!priceId) {
			return new NextResponse("Price ID is required", { status: 400 });
		}

        // Set subscription data with trial period, remove if not wanted
		const subscriptionData: {
			trial_period_days?: number;
		} = {
			trial_period_days: TRIAL_PERIOD_DAYS,
		};

		// Create Stripe checkout session
		const checkoutSession = await stripe().checkout.sessions.create({
			mode: "subscription",
			payment_method_types: ["card", "paypal"],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
            subscription_data: subscriptionData,
            // Metadata will be used to identify the user in the webhook
			metadata: {
				userId: fakeUser.id,
			},
			customer_email: fakeUser.email,
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
		});

		if (!checkoutSession.url) {
			return new NextResponse("Checkout session URL is missing", { status: 500 });
		}

		return NextResponse.json({ url: checkoutSession.url });
	} catch (_) {
		return new NextResponse("Internal Error", { status: 500 });
	}
}
