import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export type ProfileModel = {
	id: string;
	fullName: string;
	email: string;
	avatar: string;
};

export type UseAuthProps =
	| {
			isLoggedIn: true;
			user: ProfileModel;
			supabase: SupabaseClient;
	  }
	| {
			isLoggedIn: false;
			user: null;
			supabase: SupabaseClient;
	  };

/**
 * Utility hook to check if the user is logged in or not
 *
 * It works **only Server Side**
 * @returns {UseAuthProps} Auth object {@link UseAuthProps}
 */
export const getAuth = async (): Promise<UseAuthProps> => {
	const cookie = cookies();
	const supabase = createClient(cookie);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		const userModel: ProfileModel = {
			id: user.id,
			fullName: user.user_metadata?.name ?? user.user_metadata?.user_name,
			email: user.email || "",
			avatar: user.user_metadata.avatar_url || "",
		};

		return { isLoggedIn: true, user: userModel, supabase };
	} else {
		return { isLoggedIn: false, user: null, supabase };
	}
};
