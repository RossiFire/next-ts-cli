import type {
	WithContext,
	Thing,
	Person,
	Organization,
	Product,
	WebSite,
	Article,
	LocalBusiness,
	Book,
	Event,
	CreativeWork,
	AboutPage,
	ContactPage,
	ProfilePage,
	CheckoutPage,
	SearchResultsPage,
	WebPage,
} from "schema-dts";

export type SchemaTypeMap = {
	Person: Person;
	Organization: Organization;
	Product: Product;
	WebSite: WebSite;
	Article: Article;
	LocalBusiness: LocalBusiness;
	Book: Book;
	Event: Event;
	CreativeWork: CreativeWork;
	AboutPage: AboutPage;
	ContactPage: ContactPage;
	ProfilePage: ProfilePage;
	CheckoutPage: CheckoutPage;
	SearchResultsPage: SearchResultsPage;
	WebPage: WebPage;
	Thing: Thing;
};

export type SchemaType = keyof SchemaTypeMap;

export const microdata = <T extends SchemaType>(
	type: T,
	data: Omit<SchemaTypeMap[T], "@type" | "@context">
): WithContext<SchemaTypeMap[T]> => {
	return {
		"@context": "https://schema.org",
		"@type": type,
		...data,
	} as unknown as WithContext<SchemaTypeMap[T]>;
};
