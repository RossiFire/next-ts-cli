/* =============================================================================================

This page is a minimal boilerplate for managing the Stripe subscription system with your website.

If you need a non-subscription based system, the webhook configuration will be differnt, 
so check the Stripe documentation for more information.

================================================================================================ */
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

export async function POST(req: Request) {
	const body = await req.text();
	const headersList = await headers();
	const signature = headersList.get("Stripe-Signature") as string;

	let event: Stripe.Event;

	try {
		event = stripe().webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET as string
		);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
	}

	try {
		switch (event.type) {
			// When a customer completes checkout
			case "checkout.session.completed": {
				try {
					// Do something
				} catch (e) {
					return new NextResponse(`Error: ${e}`, { status: 500 });
				}
				break;
			}

			// When a new subscription is created
			case "customer.subscription.created": {
				const subscription = event.data.object as Stripe.Subscription;
                // Do something, usually create record in DB
				break;
			}

			// When a subscription is updated
			case "customer.subscription.updated": {
				const subscription = event.data.object as Stripe.Subscription;
                // Do something, usually update record in DB, when subscription is renewed/stopped, etc.
				break;
			}

			// When a subscription is specifically cancelled/deleted
			case "customer.subscription.deleted": {
				const subscription = event.data.object as Stripe.Subscription;
                // Do something, usually delete record in DB, when subscription is cancelled/deleted, etc.
				break;
			}

			// When a trial is about to end (3 days before)
			case "customer.subscription.trial_will_end": {
				const subscription = event.data.object as Stripe.Subscription;
                // Do something, usually warn the user via mail or something else
				break;
			}

			// Invoice events for payment tracking
			case "invoice.payment_succeeded": {
				// Do something, usually log invoices info somewhere
				break;
			}

            // When a payment fails
			case "invoice.payment_failed": {
				// Do something, usually warn the user via mail or something else
				break;
			}
		}

		return new NextResponse(null, { status: 200 });
	} catch (_) {
		return new NextResponse("Webhook handler error", { status: 500 });
	}
}
