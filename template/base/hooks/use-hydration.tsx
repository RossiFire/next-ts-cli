"use client";
import { useEffect, useState } from "react";

/**
 * To check if our component is mounted, so we can use client-side functions
 * @returns {boolean} isMounted
 */
export const useHydration = (): boolean => {
	const [isMounted, setIsMounded] = useState(false);

	useEffect(() => {
		setIsMounded(true);
	}, []);

	return isMounted;
};
