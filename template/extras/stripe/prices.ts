"use server";

import type { Stripe } from "stripe";
import { stripe } from "./stripe";

/* List all prices */
async function getPrices(
	options: Stripe.PriceListParams = {},
): Promise<Stripe.Price[]> {
	try {
		const params: Stripe.PriceListParams = {
			limit: options.limit ?? 100,
		};

		if (options.active !== undefined) {
			params.active = options.active;
		}

		if (options.product) {
			params.product = options.product;
		}

		if (options.starting_after) {
			params.starting_after = options.starting_after;
		}

		if (options.ending_before) {
			params.ending_before = options.ending_before;
		}

		const prices = await stripe().prices.list(params);

		return prices.data;
	} catch (error) {
		console.error("Error fetching Stripe prices:", error);
		throw new Error("Failed to fetch prices");
	}
}

/**
 * Get a single price by ID
 */
async function getPrice(priceId: string): Promise<Stripe.Price> {
	try {
		const price = await stripe().prices.retrieve(priceId);
		return price;
	} catch (error) {
		console.error("Error fetching Stripe price:", error);
		throw new Error(`Failed to fetch price: ${priceId}`);
	}
}

/**
 * Get prices for a specific product
 */
async function getPricesByProduct(
	productId: string,
	active?: boolean,
): Promise<Stripe.Price[]> {
	return getPrices({
		product: productId,
		active,
	});
}

/* List all products */
async function getProducts(
	options: Stripe.ProductListParams = {},
): Promise<Stripe.Product[]> {
	try {
		const products = await stripe().products.list(options);
		return products.data;
	} catch (error) {
		console.error("Error fetching Stripe products:", error);
		throw new Error("Failed to fetch products");
	}
}

export { getPrices, getPrice, getPricesByProduct, getProducts };
