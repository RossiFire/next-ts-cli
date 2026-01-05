"use client";
import { createAuthClient } from "better-auth/react";

if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not set");
}

export const authClient =  createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    // other configurations here
})