/* ==============================
Utility functions for Supabase storage.
======================================
 */

import { createClient } from "./client";

export interface UploadResult {
	url: string;
	path: string;
}

export interface DeleteResult {
	success: boolean;
	error?: string;
}

/**
 * Upload a file to Supabase storage.
 * @param bucket - The name of the bucket to upload the file to.
 * @param file - The file to upload.
 * @param fileName - The name of the file to upload.
 * @returns The URL of the uploaded file and the path of the file.
 * @throws An error if the file could not be uploaded.
 * @example
 * const result = await uploadFile("my-bucket", "my-file.txt", "my-file.txt");
 * if (result.url) {
 *   console.log("File uploaded successfully");
 * } else {
 *   console.error(result.error);
 * }
 */
export const uploadFile = async (
	bucket: string,
	file: File,
	fileName: string
): Promise<{ url: string; path: string } | { error: string }> => {
	try {
		const supabase = createClient();

		// Upload file to Supabase storage
		const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
			cacheControl: "3600",
			upsert: false,
		});

		if (error) {
			return { error: error.message };
		}

		const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);

		return { url: urlData.publicUrl, path: fileName };
	} catch (error) {
		return { error: error instanceof Error ? error.message : "Unknown error" };
	}
};

/**
 * Delete a file from Supabase storage.
 * @param bucket - The name of the bucket to delete the file from.
 * @param fileName - The name of the file to delete.
 * @returns True if the file was deleted successfully, false otherwise.
 * @throws An error if the file could not be deleted.
 * @example
 * const result = await deleteFile("my-bucket", "my-file.txt");
 * if (result.success) {
 *   console.log("File deleted successfully");
 * } else {
 *   console.error(result.error);
 * }
 */
export const deleteFile = async (
	bucket: string,
	fileName: string
): Promise<{ success: boolean } | { error: string }> => {
	try {
		const supabase = createClient();

		const { error } = await supabase.storage.from(bucket).remove([fileName]);

		if (error) {
			return { error: error.message };
		}

		return { success: true };
	} catch (error) {
		return { error: error instanceof Error ? error.message : "Unknown error" };
	}
};
